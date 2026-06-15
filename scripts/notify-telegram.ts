// GitHub Action içinden çağrılır: yeni taslakları Telegram'a bildirir.
// Kullanım: npx tsx scripts/notify-telegram.ts drafts/dosya1.md drafts/dosya2.md
// Gerekli env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const draftPaths = process.argv.slice(2);

if (!BOT_TOKEN || !CHAT_ID) {
  console.error('[telegram] TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID eksik — bildirim atlandı.');
  process.exit(0); // CI'yi bloklamamak için 0 ile çık
}

if (draftPaths.length === 0) {
  console.log('[telegram] Bildirilecek dosya yok.');
  process.exit(0);
}

// YAML single-quote değerini ayıklar: 'değer' → değer
function yamlValue(s: string): string {
  return s.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'");
}

function parseFrontmatter(content: string): Record<string, string> {
  const fm: Record<string, string> = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return fm;
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (key && val) fm[key] = yamlValue(val);
  }
  return fm;
}

async function sendMessage(text: string, inlineKeyboard: object[][]): Promise<boolean> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: inlineKeyboard },
    }),
  });
  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!data.ok) console.error('[telegram] API hatası:', data.description);
  return data.ok;
}

async function main(): Promise<void> {
  for (const draftPath of draftPaths) {
    const filename = basename(draftPath); // sadece dosya adı, dizin olmadan
    const absPath = resolve(process.cwd(), draftPath);

    let fm: Record<string, string> = {};
    try {
      fm = parseFrontmatter(readFileSync(absPath, 'utf-8'));
    } catch {
      console.error(`[telegram] Dosya okunamadı: ${draftPath}`);
      continue;
    }

    const rawContent = readFileSync(absPath, 'utf-8');
    const tdbCount = (rawContent.match(/\bTBD\b/g) ?? []).length;
    const tdbUyari = tdbCount > 0 ? `\n⚠️ *${tdbCount} TBD* — onaylamadan önce kontrol et!` : '';

    // Mesaj metni — "📁 dosyaadi.md" satırı webhook tarafından parse edilir.
    const text = [
      `📝 *Yeni Taslak Hazır*`,
      ``,
      `*Başlık:* ${fm.baslik || filename}`,
      `*Özet:* ${fm.ozet || '—'}`,
      `*Kategori:* ${fm.kategori || '—'}`,
      tdbUyari,
      ``,
      `📁 ${filename}`,
    ]
      .filter((s) => s !== '')
      .join('\n');

    const githubUrl = `https://github.com/brsctncnbrk-ops/akillisatici/blob/main/drafts/${filename}`;

    const ok = await sendMessage(text, [
      [
        { text: '✅ Yayınla', callback_data: 'approve' },
        { text: '❌ Reddet', callback_data: 'reject' },
      ],
      [{ text: '📖 Tam İçeriği Gör', url: githubUrl }],
    ]);

    console.log(`[telegram] ${filename}: ${ok ? 'bildirim gönderildi ✓' : 'başarısız ✗'}`);
  }
}

main().catch((err) => {
  console.error('[telegram] hata:', err);
  process.exit(0); // CI'yi bloklamamak için 0 ile çık
});
