// IndexNow: yayınlanan içerik URL'lerini Bing/Yandex'e anında indeksleme için bildirir.
// Ücretsiz, anahtar tabanlı protokol — doğrulama dosyası public/<key>.txt.
// Kullanım: npx tsx scripts/ping-indexnow.ts
//
// Tipik kullanım: main dalına push sonrası GitHub Actions ile çalışır (bkz.
// .github/workflows/indexnow.yml). Yalnızca yayında (durumu: yayinda) yazılar bildirilir.
//
// Not: Ek bağımlılık YOK; Node fetch kullanılır. Hata CI'yi bloklamaz (exit 0).

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_URL, INDEXNOW_KEY } from '../src/data/site';

const POSTS_DIR = 'src/content/posts';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Statik (içerikten bağımsız) önemli sayfalar.
const STATIC_PATHS = [
  '/',
  '/araclar/',
  '/hakkinda/',
  '/affiliate-aciklama/',
  '/gizlilik/',
];

// Bir frontmatter bloğundan tek satırlık alanı çeker (YAML ayrıştırıcısına gerek yok).
function alan(frontmatter: string, ad: string): string {
  const m = frontmatter.match(new RegExp(`^${ad}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

// Yayında olan yazıların kanonik URL'lerini toplar (editöryel kapı: durumu === 'yayinda').
function collectPostUrls(): string[] {
  const urls: string[] = [];
  for (const dosya of readdirSync(POSTS_DIR)) {
    if (!dosya.endsWith('.md') && !dosya.endsWith('.mdx')) continue;
    const icerik = readFileSync(join(POSTS_DIR, dosya), 'utf-8');
    const fm = icerik.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    if (alan(fm[1], 'durumu') !== 'yayinda') continue;
    const slug = dosya.replace(/\.(md|mdx)$/, '');
    urls.push(`${SITE_URL}/posts/${slug}/`);
  }
  return urls;
}

async function main(): Promise<void> {
  const host = new URL(SITE_URL).host;
  const urlList = [...STATIC_PATHS.map((p) => `${SITE_URL}${p}`), ...collectPostUrls()];

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // IndexNow başarıda 200/202 döner; gövde genelde boştur.
  if (res.ok) {
    console.log(`[indexnow] ${urlList.length} URL bildirildi ✓ (HTTP ${res.status})`);
  } else {
    const text = await res.text().catch(() => '');
    console.error(`[indexnow] başarısız ✗ (HTTP ${res.status}) ${text}`);
  }
}

main().catch((err) => {
  console.error('[indexnow] hata:', err instanceof Error ? err.message : err);
  process.exit(0); // CI'yi bloklamamak için 0 ile çık
});
