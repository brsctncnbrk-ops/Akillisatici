// GA4 trafik raporu — belirtilen tarih aralığı için site verisini konsola basar.
// Amaç: çıktıyı kopyalayıp analiz/öneri için paylaşmak (Telegram'a GÖNDERMEZ).
//
// Kullanım:
//   npm run agent:traffic:report                       # son 7 gün (düne kadar)
//   npm run agent:traffic:report -- --from=2026-06-01 --to=2026-06-21
//   npm run agent:traffic:report -- --days=30          # son 30 gün
//
// Gerekli env (notify-traffic.ts ile aynı):
//   GA4_PROPERTY_ID         — GA4 mülk (property) numarası
//   GA_SERVICE_ACCOUNT_JSON — GA mülküne "Görüntüleyici" yetkili service account JSON'u

import { getAccessToken, parseServiceAccount, runReport, type MetricRow } from './lib/ga';

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const SA_JSON = process.env.GA_SERVICE_ACCOUNT_JSON;

const TZ = 'Europe/Istanbul';

// --- Tarih yardımcıları ----------------------------------------------------

// Türkiye saatiyle gün ofseti için YYYY-MM-DD (0=bugün, 1=dün).
function ymd(offsetDays: number): string {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - offsetDays);
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
}

function isYmd(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function readable(isoYmd: string): string {
  const [y, m, d] = isoYmd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('tr-TR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// CLI argümanlarından tarih aralığını çözer.
function resolveRange(): { from: string; to: string } {
  const args = process.argv.slice(2);
  const get = (key: string): string | undefined =>
    args.find((a) => a.startsWith(`--${key}=`))?.split('=')[1];

  const from = get('from');
  const to = get('to');
  if (from && to) {
    if (!isYmd(from) || !isYmd(to)) {
      throw new Error('--from ve --to YYYY-MM-DD biçiminde olmalı.');
    }
    return { from, to };
  }

  const days = Number(get('days') ?? 7);
  if (!Number.isFinite(days) || days < 1) throw new Error('--days pozitif bir sayı olmalı.');
  // Düne kadar son `days` gün (dün dahil).
  return { from: ymd(days), to: ymd(1) };
}

// --- Biçimlendirme ---------------------------------------------------------

const nf = new Intl.NumberFormat('tr-TR');

function pct(fraction: number): string {
  return `%${(fraction * 100).toFixed(1)}`;
}

function duration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}dk ${s}sn` : `${s}sn`;
}

const num = (row: MetricRow, i = 0): number => Number(row.metricValues?.[i]?.value ?? 0);
const dim = (row: MetricRow, i = 0): string => row.dimensionValues?.[i]?.value ?? '(yok)';

// --- Sorgular --------------------------------------------------------------

async function summary(token: string, from: string, to: string): Promise<string[]> {
  const rows = await runReport(PROPERTY_ID!, token, {
    dateRanges: [{ startDate: from, endDate: to }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
  });
  const r = rows[0];
  if (!r) return ['  (veri yok)'];
  return [
    `  👥 Aktif kullanıcı:      ${nf.format(num(r, 0))}`,
    `  🆕 Yeni kullanıcı:       ${nf.format(num(r, 1))}`,
    `  🔁 Oturum:               ${nf.format(num(r, 2))}`,
    `  👁 Sayfa görüntüleme:    ${nf.format(num(r, 3))}`,
    `  💡 Etkileşim oranı:      ${pct(num(r, 4))}`,
    `  ⏱ Ort. oturum süresi:   ${duration(num(r, 5))}`,
  ];
}

async function topPages(token: string, from: string, to: string): Promise<string[]> {
  const rows = await runReport(PROPERTY_ID!, token, {
    dateRanges: [{ startDate: from, endDate: to }],
    dimensions: [{ name: 'pageTitle' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 10,
  });
  if (rows.length === 0) return ['  (veri yok)'];
  return rows.map((r, i) => `  ${String(i + 1).padStart(2)}. ${dim(r)} — ${nf.format(num(r))}`);
}

async function channels(token: string, from: string, to: string): Promise<string[]> {
  const rows = await runReport(PROPERTY_ID!, token, {
    dateRanges: [{ startDate: from, endDate: to }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  });
  if (rows.length === 0) return ['  (veri yok)'];
  return rows.map((r) => `  • ${dim(r)} — ${nf.format(num(r))} oturum`);
}

async function countries(token: string, from: string, to: string): Promise<string[]> {
  const rows = await runReport(PROPERTY_ID!, token, {
    dateRanges: [{ startDate: from, endDate: to }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    limit: 5,
  });
  if (rows.length === 0) return ['  (veri yok)'];
  return rows.map((r) => `  • ${dim(r)} — ${nf.format(num(r))} kullanıcı`);
}

async function daily(token: string, from: string, to: string): Promise<string[]> {
  const rows = await runReport(PROPERTY_ID!, token, {
    dateRanges: [{ startDate: from, endDate: to }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  });
  if (rows.length === 0) return ['  (veri yok)'];
  return rows.map((r) => {
    const d = dim(r); // YYYYMMDD
    const label = `${d.slice(6, 8)}.${d.slice(4, 6)}`;
    return `  ${label} → 👥 ${nf.format(num(r, 0))}  🔁 ${nf.format(num(r, 1))}  👁 ${nf.format(num(r, 2))}`;
  });
}

// --- Ana akış --------------------------------------------------------------

async function main(): Promise<void> {
  if (!PROPERTY_ID || !SA_JSON) {
    console.error('[report] GA4_PROPERTY_ID veya GA_SERVICE_ACCOUNT_JSON eksik. Çıkılıyor.');
    process.exit(1);
  }
  const sa = parseServiceAccount(SA_JSON);
  if (!sa) {
    console.error('[report] GA_SERVICE_ACCOUNT_JSON geçerli JSON değil. Çıkılıyor.');
    process.exit(1);
  }

  const { from, to } = resolveRange();
  const token = await getAccessToken(sa);

  const [sum, pages, chan, ctry, days] = await Promise.all([
    summary(token, from, to),
    topPages(token, from, to),
    channels(token, from, to),
    countries(token, from, to),
    daily(token, from, to),
  ]);

  const out = [
    '════════════════════════════════════════',
    `📊 GA4 TRAFİK RAPORU`,
    `🗓 ${readable(from)} → ${readable(to)}`,
    '════════════════════════════════════════',
    '',
    '📈 ÖZET',
    ...sum,
    '',
    '📅 GÜNLÜK KIRILIM',
    ...days,
    '',
    '🔝 EN ÇOK GÖRÜNTÜLENEN SAYFALAR',
    ...pages,
    '',
    '🚪 TRAFİK KANALLARI',
    ...chan,
    '',
    '🌍 ÜLKELER (ilk 5)',
    ...ctry,
    '════════════════════════════════════════',
  ].join('\n');

  console.log(out);
}

main().catch((err) => {
  console.error('[report] hata:', err instanceof Error ? err.message : err);
  process.exit(1);
});
