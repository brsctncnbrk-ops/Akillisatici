// RSS/Atom beslemelerinden trend adayları çıkarır.
// `parseFeed` SAFtır (test edilir); `fetchAllSources` ağ erişimi yapar
// (GitHub Actions tarafında çalışır, bu repo'nun çalıştığı ortamda değil).

import { RSS_SOURCES } from './config';
import type { Candidate } from './types';

// Birkaç yaygın HTML/XML varlığını çözer ve etiketleri/CDATA'yı temizler.
function temizle(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8230;|&hellip;/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

// Bir etiketin ilk içeriğini döndürür (CDATA dahil).
function tagIcerik(blok: string, tag: string): string | null {
  const m = blok.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? m[1] : null;
}

// RSS <link>...</link> veya Atom <link href="..."/> destekler.
function linkCikar(blok: string): string {
  const rss = tagIcerik(blok, 'link');
  if (rss && rss.trim()) return temizle(rss);
  const atom = blok.match(/<link[^>]*href=["']([^"']+)["']/i);
  return atom ? atom[1] : '';
}

// Bir RSS/Atom XML metnini adaylara çevirir. SAF fonksiyon.
export function parseFeed(xml: string, kaynak: string): Candidate[] {
  const adaylar: Candidate[] = [];
  // Hem RSS <item> hem Atom <entry>.
  const bloklar = xml.match(/<(item|entry)[\s\S]*?<\/(item|entry)>/gi) ?? [];
  for (const blok of bloklar) {
    const baslikHam = tagIcerik(blok, 'title');
    if (!baslikHam) continue;
    const ozetHam =
      tagIcerik(blok, 'description') ??
      tagIcerik(blok, 'summary') ??
      tagIcerik(blok, 'content') ??
      '';
    const tarihHam =
      tagIcerik(blok, 'pubDate') ??
      tagIcerik(blok, 'published') ??
      tagIcerik(blok, 'updated') ??
      null;
    const tarih = tarihHam ? new Date(temizle(tarihHam)) : null;
    adaylar.push({
      baslik: temizle(baslikHam),
      ozet: temizle(ozetHam).slice(0, 500),
      link: linkCikar(blok),
      kaynak,
      yayinTarihi: tarih && !Number.isNaN(tarih.getTime()) ? tarih.toISOString() : null,
    });
  }
  return adaylar;
}

// Tüm kaynaklardan paralel çeker; başarısız kaynakları atlar (uyarı basar).
export async function fetchAllSources(
  kaynaklar: readonly string[] = RSS_SOURCES,
): Promise<Candidate[]> {
  const sonuclar = await Promise.allSettled(
    kaynaklar.map(async (url) => {
      const resp = await fetch(url, {
        headers: { 'user-agent': 'saticikutusu-trend-agent/1.0' },
        signal: AbortSignal.timeout(20000),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status} — ${url}`);
      return parseFeed(await resp.text(), url);
    }),
  );

  const adaylar: Candidate[] = [];
  for (const r of sonuclar) {
    if (r.status === 'fulfilled') adaylar.push(...r.value);
    else console.warn(`[trends] kaynak atlandı: ${r.reason}`);
  }
  return adaylar;
}
