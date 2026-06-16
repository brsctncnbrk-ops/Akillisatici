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

const ACCENT = '#f97316'; // marka turuncusu

// Sol turuncu panel + sağ beyaz içerik: küçük thumbnail'de de anında tanınır.
const tree = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      width: '1200px',
      height: '630px',
      fontFamily: 'Jakarta',
    },
    children: [
      // Sol panel — turuncu marka alanı
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 56px',
            width: '340px',
            height: '630px',
            backgroundColor: ACCENT,
          },
          children: [
            // Logo kare
            { type: 'div', props: { style: { width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '36px' }, children: '' } },
            // Marka adı — satır 1
            { type: 'div', props: { style: { display: 'block', fontSize: '50px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-2px' }, children: 'Satıcı' } },
            // Marka adı — satır 2
            { type: 'div', props: { style: { display: 'block', fontSize: '50px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '28px' }, children: 'Kutusu' } },
            // Ayraç
            { type: 'div', props: { style: { width: '44px', height: '4px', backgroundColor: 'rgba(255,255,255,0.5)', marginBottom: '28px' }, children: '' } },
            // Alt açıklama
            { type: 'div', props: { style: { display: 'block', fontSize: '21px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }, children: 'Yapay Zeka' } },
            { type: 'div', props: { style: { display: 'block', fontSize: '21px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }, children: 'Araçları Blogu' } },
          ],
        },
      },
      // Sağ panel — beyaz içerik
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '64px 72px',
            backgroundColor: '#ffffff',
            justifyContent: 'space-between',
          },
          children: [
            // Üst etiket
            { type: 'div', props: { style: { fontSize: '20px', fontWeight: 700, color: ACCENT, letterSpacing: '2px' }, children: 'BAĞIMSIZ İNCELEME & REHBERLİK' } },
            // Ana başlık
            { type: 'div', props: { style: { display: 'block', fontSize: '56px', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-1px' }, children: 'Online satıcılar için yapay zeka araçları' } },
            // Platformlar + URL
            {
              type: 'div',
              props: {
                style: { display: 'flex', flexDirection: 'column' },
                children: [
                  { type: 'div', props: { style: { fontSize: '22px', color: '#64748b', fontWeight: 400, marginBottom: '10px' }, children: 'Shopify · Etsy · Amazon · Trendyol · Hepsiburada' } },
                  { type: 'div', props: { style: { fontSize: '26px', fontWeight: 700, color: ACCENT }, children: 'saticikutusu.com' } },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
const png = new Resvg(svg).render().asPng();
writeFileSync(join(process.cwd(), 'public/og-default.png'), png);
console.log('public/og-default.png üretildi (%d bayt)', png.length);
