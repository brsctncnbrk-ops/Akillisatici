// Yazıya özel OG görseli (1200×630 PNG) — build sırasında üretilir.
// İçerik tamamen frontmatter'daki gerçek veriden gelir (uydurma yok):
// başlık + kategori + yazar + marka. satori (HTML/CSS → SVG) + resvg (SVG → PNG).
import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getYayindaPosts } from '../../lib/content';
import { getAuthorByName } from '../../data/authors';
import { kapakRenk } from '../../lib/postCover';
import { MARKA_ADI } from '../../data/site';

// Fontlar repoya gömülü (tam statik TTF — Türkçe glyph'leri içerir: ş, ğ, İ, vb.).
// Build/dev node'u proje kökünden çalıştığı için yolu cwd'ye sabitliyoruz
// (bundle sonrası import.meta.url dist/ altına kaydığından güvenilmez).
const font = (dosya: string) => readFileSync(join(process.cwd(), 'src/assets/fonts', dosya));

const fonts = [
  { name: 'Jakarta', data: font('jakarta-400.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Jakarta', data: font('jakarta-700.ttf'), weight: 700 as const, style: 'normal' as const },
  { name: 'Jakarta', data: font('jakarta-800.ttf'), weight: 800 as const, style: 'normal' as const },
];

export async function getStaticPaths() {
  const posts = await getYayindaPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getYayindaPosts>>[number] };
  const data = post.data;
  const renk = kapakRenk(data.kategori);
  const yazar = getAuthorByName(data.yazar);
  const tarih = data.tarih.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // satori, React benzeri eleman ağacı bekler; JSX olmadan elle kuruyoruz.
  const tree = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        padding: '72px',
        backgroundColor: '#0f172a',
        backgroundImage: `linear-gradient(135deg, ${renk.from}, ${renk.to})`,
        fontFamily: 'Jakarta',
        color: '#ffffff',
      },
      children: [
        // Üst satır: marka + kategori rozeti
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', fontSize: '34px', fontWeight: 700 },
                  children: [
                    { type: 'div', props: { style: { width: '20px', height: '20px', borderRadius: '6px', backgroundColor: renk.accent, marginRight: '14px' }, children: '' } },
                    MARKA_ADI,
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontSize: '26px', fontWeight: 700, color: renk.accent, border: `2px solid ${renk.accent}`, borderRadius: '999px', padding: '8px 24px' },
                  children: data.kategori,
                },
              },
            ],
          },
        },
        // Başlık (dikey ortalanır)
        {
          type: 'div',
          props: {
            style: { display: 'flex', flex: 1, alignItems: 'center' },
            children: {
              type: 'div',
              props: {
                style: { display: 'block', fontFamily: 'Jakarta', fontWeight: 800, fontSize: '64px', lineHeight: 1.15, letterSpacing: '-1px', lineClamp: 4 },
                children: data.baslik,
              },
            },
          },
        },
        // Alt satır: yazar + tarih
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', fontSize: '28px', color: '#cbd5e1' },
            children: [
              { type: 'div', props: { style: { fontWeight: 700, color: '#ffffff' }, children: yazar.name } },
              { type: 'div', props: { style: { margin: '0 14px' }, children: '·' } },
              { type: 'div', props: { children: tarih } },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
