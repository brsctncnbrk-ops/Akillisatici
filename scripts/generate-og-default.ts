// Varsayılan OG görseli (public/og-default.png) üreticisi.
// Yazıya özgü olmayan sayfalar (ana sayfa, araçlar, hakkında vb.) bu görseli
// sosyal paylaşımda kullanır. Yazı kapaklarıyla aynı satori+resvg hattı ve
// font/renk dilini kullanır. Çalıştırma: `npm run og:default`.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MARKA_ADI } from '../src/data/site';

const font = (dosya: string) => readFileSync(join(process.cwd(), 'src/assets/fonts', dosya));
const fonts = [
  { name: 'Jakarta', data: font('jakarta-400.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Jakarta', data: font('jakarta-700.ttf'), weight: 700 as const, style: 'normal' as const },
  { name: 'Jakarta', data: font('jakarta-800.ttf'), weight: 800 as const, style: 'normal' as const },
];

const ACCENT = '#fb923c'; // marka turuncusu

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
      backgroundImage: 'linear-gradient(135deg, #7c2d12, #0f172a)',
      fontFamily: 'Jakarta',
      color: '#ffffff',
    },
    children: [
      // Marka
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', fontSize: '36px', fontWeight: 700 },
          children: [
            { type: 'div', props: { style: { width: '24px', height: '24px', borderRadius: '7px', backgroundColor: ACCENT, marginRight: '16px' }, children: '' } },
            MARKA_ADI,
          ],
        },
      },
      // Slogan (dikey ortalı)
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'block', fontWeight: 800, fontSize: '60px', lineHeight: 1.15, letterSpacing: '-1px' },
                children: 'Online satıcılar için yapay zeka araçları',
              },
            },
            {
              type: 'div',
              props: {
                style: { display: 'flex', marginTop: '24px', fontSize: '30px', fontWeight: 400, color: '#cbd5e1' },
                children: 'Bağımsız incelemeler · karşılaştırmalar · rehberler',
              },
            },
          ],
        },
      },
      // CTA
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', fontSize: '28px', fontWeight: 700, color: ACCENT },
          children: 'saticikutusu.com →',
        },
      },
    ],
  },
};

const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
const png = new Resvg(svg).render().asPng();
writeFileSync(join(process.cwd(), 'public/og-default.png'), png);
console.log('public/og-default.png üretildi (%d bayt)', png.length);
