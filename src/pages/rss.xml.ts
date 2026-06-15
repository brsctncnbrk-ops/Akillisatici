import type { APIRoute } from 'astro';
import { getYayindaPosts } from '../lib/content';
import { MARKA_ADI } from '../data/site';

// RSS beslemesi (ek dış bağımlılık olmadan elle üretilir).
// XML özel karakterlerini güvenli hale getirir.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://saticikutusu.com/').replace(/\/$/, '');
  const posts = await getYayindaPosts();

  const items = posts
    .map((post) => {
      const url = `${base}/posts/${post.id}/`;
      return `    <item>
      <title>${esc(post.data.baslik)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${post.data.tarih.toUTCString()}</pubDate>
      <category>${esc(post.data.kategori)}</category>
      <description>${esc(post.data.ozet)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(MARKA_ADI)}</title>
    <link>${base}/</link>
    <description>Online satıcılar için yapay zeka araçları: incelemeler, karşılaştırmalar ve rehberler.</description>
    <language>tr-TR</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
