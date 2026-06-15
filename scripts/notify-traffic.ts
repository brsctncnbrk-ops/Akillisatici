// Günlük site trafiği raporunu Telegram'a gönderir (trend ajanıyla AYNI bot).
// Kaynak: Google Analytics 4 (GA4) Data API — dünün özetini + önceki güne göre değişimi paylaşır.
// Kullanım: npx tsx scripts/notify-traffic.ts
//
// Gerekli env:
//   TELEGRAM_BOT_TOKEN      — mevcut bot token'ı (notify-telegram ile aynı)
//   TELEGRAM_CHAT_ID        — mesajın gideceği sohbet
//   GA4_PROPERTY_ID         — GA4 mülk (property) numarası, ör. 123456789
//   GA_SERVICE_ACCOUNT_JSON — GA mülküne "Görüntüleyici" yetkisiyle eklenmiş
//                             Google service account anahtarının TAM JSON içeriği
//
// Not: Ek bağımlılık YOK — OAuth2 service-account JWT akışı node:crypto ile imzalanır.

import { createSign } from 'node:crypto';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const SA_JSON = process.env.GA_SERVICE_ACCOUNT_JSON;

// Türkiye saatine göre tarih; GA4 sorguları ve gösterim bunun üzerinden yapılır.
const TZ = 'Europe/Istanbul';

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

interface MetricRow {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
}

interface RunReportResponse {
  rows?: MetricRow[];
  error?: { message: string };
}

// --- Tarih yardımcıları ----------------------------------------------------

// Belirli bir gün ofseti için YYYY-MM-DD (Türkiye saatiyle) döndürür. 0=bugün, 1=dün.
function ymd(offsetDays: number): string {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - offsetDays);
  // tr-CA biçimi YYYY-MM-DD verir; timeZone ile yerel güne hizalanır.
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
}

function readableDate(isoYmd: string): string {
  const [y, m, d] = isoYmd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('tr-TR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// --- Google OAuth2 (service account JWT) -----------------------------------

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signature = createSign('RSA-SHA256').update(signingInput).sign(sa.private_key);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) {
    throw new Error(`OAuth token alınamadı: ${data.error_description ?? 'bilinmeyen hata'}`);
  }
  return data.access_token;
}

// --- GA4 Data API ----------------------------------------------------------

async function runReport(token: string, body: object): Promise<RunReportResponse> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  const data = (await res.json()) as RunReportResponse;
  if (data.error) throw new Error(`GA4 API hatası: ${data.error.message}`);
  return data;
}

interface Totals {
  users: number;
  sessions: number;
  views: number;
}

// Dün + önceki gün toplamlarını tek istekte (iki dateRange) çeker.
async function fetchTotals(token: string): Promise<{ today: Totals; prev: Totals }> {
  const data = await runReport(token, {
    dateRanges: [
      { startDate: ymd(1), endDate: ymd(1), name: 'dun' },
      { startDate: ymd(2), endDate: ymd(2), name: 'onceki' },
    ],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
  });

  const empty: Totals = { users: 0, sessions: 0, views: 0 };
  const result = { today: { ...empty }, prev: { ...empty } };
  for (const row of data.rows ?? []) {
    const range = row.dimensionValues?.[0]?.value; // 'dun' | 'onceki'
    const m = row.metricValues ?? [];
    const t: Totals = {
      users: Number(m[0]?.value ?? 0),
      sessions: Number(m[1]?.value ?? 0),
      views: Number(m[2]?.value ?? 0),
    };
    if (range === 'dun') result.today = t;
    else if (range === 'onceki') result.prev = t;
  }
  return result;
}

// Dün en çok görüntülenen 3 sayfayı (başlık + görüntüleme) çeker.
async function fetchTopPages(token: string): Promise<{ title: string; views: number }[]> {
  const data = await runReport(token, {
    dateRanges: [{ startDate: ymd(1), endDate: ymd(1) }],
    dimensions: [{ name: 'pageTitle' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 3,
  });
  return (data.rows ?? []).map((row) => ({
    title: row.dimensionValues?.[0]?.value ?? '(başlıksız)',
    views: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

// --- Biçimlendirme ---------------------------------------------------------

const nf = new Intl.NumberFormat('tr-TR');

// Önceki güne göre yüzde değişim oku + işareti.
function delta(now: number, prev: number): string {
  if (prev === 0) return now > 0 ? ' 🆕' : '';
  const pct = Math.round(((now - prev) / prev) * 100);
  if (pct === 0) return ' ➖';
  const arrow = pct > 0 ? '🔺' : '🔻';
  return ` ${arrow} %${Math.abs(pct)}`;
}

// Markdown özel karakterlerini kaçır (sayfa başlıkları için).
function esc(s: string): string {
  return s.replace(/([_*[\]()`])/g, '\\$1');
}

async function sendMessage(text: string): Promise<boolean> {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: '📈 Analytics’i aç', url: 'https://analytics.google.com/' }]],
      },
    }),
  });
  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!data.ok) console.error('[traffic] Telegram API hatası:', data.description);
  return data.ok;
}

// --- Ana akış --------------------------------------------------------------

async function main(): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[traffic] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID eksik — atlandı.');
    return;
  }
  if (!PROPERTY_ID || !SA_JSON) {
    console.error('[traffic] GA4_PROPERTY_ID veya GA_SERVICE_ACCOUNT_JSON eksik — atlandı.');
    return;
  }

  let sa: ServiceAccount;
  try {
    sa = JSON.parse(SA_JSON) as ServiceAccount;
  } catch {
    console.error('[traffic] GA_SERVICE_ACCOUNT_JSON geçerli JSON değil — atlandı.');
    return;
  }

  const token = await getAccessToken(sa);
  const [{ today, prev }, topPages] = await Promise.all([fetchTotals(token), fetchTopPages(token)]);

  const gun = readableDate(ymd(1));
  const topLines =
    topPages.length > 0
      ? topPages.map((p, i) => `${i + 1}. ${esc(p.title)} — *${nf.format(p.views)}*`)
      : ['_Kayıt yok._'];

  const text = [
    `📊 *Günlük Trafik Raporu*`,
    `🗓 ${gun} (dün)`,
    ``,
    `👥 Ziyaretçi: *${nf.format(today.users)}*${delta(today.users, prev.users)}`,
    `🔁 Oturum: *${nf.format(today.sessions)}*${delta(today.sessions, prev.sessions)}`,
    `👁 Sayfa görüntüleme: *${nf.format(today.views)}*${delta(today.views, prev.views)}`,
    ``,
    `🔝 *En çok okunan*`,
    ...topLines,
    ``,
    `_Önceki güne göre değişim._`,
  ].join('\n');

  const ok = await sendMessage(text);
  console.log(`[traffic] rapor ${ok ? 'gönderildi ✓' : 'başarısız ✗'}`);
}

main().catch((err) => {
  console.error('[traffic] hata:', err instanceof Error ? err.message : err);
  process.exit(0); // CI'yi bloklamamak için 0 ile çık
});
