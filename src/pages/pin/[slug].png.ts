// Yazıya özel DİKEY Pinterest görseli (1000×1500 PNG, 2:3) — build sırasında üretilir.
// Pinterest dikey pinleri yatay OG'ye göre belirgin biçimde daha iyi performans verir.
// İçerik tamamen frontmatter'daki gerçek veriden gelir (uydurma yok):
// başlık + özet + kategori + marka + CTA. satori (HTML/CSS → SVG) + resvg (SVG → PNG).
import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getYayindaPosts } from '../../lib/content';
import { kapakRenk } from '../../lib/postCover';
import { MARKA_ADI } from '../../data/site';

// Fontlar repoya gömülü (tam statik TTF — Türkçe glyph'leri içerir: ş, ğ, İ, vb.).
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

  // satori, React benzeri eleman ağacı bekler; JSX olmadan elle kuruyoruz.
  const tree = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1000px',
        height: '1500px',
        padding: '90px 80px',
        backgroundColor: '#0f172a',
        backgroundImage: `linear-gradient(160deg, ${renk.from}, ${renk.to})`,
        fontFamily: 'Jakarta',
        color: '#ffffff',
      },
      children: [
        // Üst: marka
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', fontSize: '40px', fontWeight: 700 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    backgroundColor: renk.accent,
                    marginRight: '18px',
                  },
                  children: '',
                },
              },
              MARKA_ADI,
            ],
          },
        },
        // Orta blok: kategori rozeti + başlık + özet (dikeyde yukarı-orta hizalı)
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignSelf: 'flex-start',
                    fontSize: '30px',
                    fontWeight: 700,
                    color: renk.accent,
                    border: `2px solid ${renk.accent}`,
                    borderRadius: '999px',
                    padding: '10px 30px',
                    marginBottom: '44px',
                  },
                  children: data.kategori,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'block',
                    fontWeight: 800,
                    fontSize: '82px',
                    lineHeight: 1.12,
                    letterSpacing: '-1.5px',
                    lineClamp: 6,
                  },
                  children: data.baslik,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'block',
                    marginTop: '40px',
                    fontSize: '36px',
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: '#e2e8f0',
                    lineClamp: 4,
                  },
                  children: data.ozet,
                },
              },
            ],
          },
        },
        // Alt: CTA şeridi
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid rgba(255,255,255,0.25)',
              paddingTop: '40px',
              fontSize: '34px',
            },
            children: [
              {
                type: 'div',
                props: { style: { fontWeight: 700, color: '#ffffff' }, children: 'saticikutusu.com' },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontWeight: 700,
                    color: '#0f172a',
                    backgroundColor: renk.accent,
                    borderRadius: '999px',
                    padding: '14px 36px',
                  },
                  children: 'Rehberi oku →',
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1000,
    height: 1500,
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
