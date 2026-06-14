# Satıcı Kutusu

> Domain: **saticikutusu.com**


Online satıcılar (Shopify, Etsy, Amazon, Trendyol, Hepsiburada) için yapay zeka araçlarını inceleyen, karşılaştıran ve rehberler sunan Türkçe niş blog.

> İş modeli: nitelikli içerik → organik trafik → AdSense + affiliate gelir.
> **Önemli:** Bu bir otomatik içerik fabrikası değildir. Her yazı insan onayından geçer; otomatik yayın yoktur.

## Gereksinimler
- Node.js 20+
- npm 10+

## Kurulum
```bash
npm install
cp .env.example .env   # gerekli değerleri doldur (gizli anahtarlar commit'lenmez)
```

## Komutlar
| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (http://localhost:4321) |
| `npm run build` | Statik site üretir (`dist/`) |
| `npm run preview` | Build çıktısını önizler |
| `npm run lint` | ESLint + `astro check` |
| `npm run format` | Prettier ile biçimlendirme |
| `npm run test` | Vitest |

## Proje Yapısı
Bkz. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Tüm proje bağlamı için
[`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md).

## İçerik ekleme
Yeni yazı `src/content/posts/<slug>.md` olarak eklenir; frontmatter şeması
`src/content/config.ts` içindedir. `durumu` alanı `taslak | onaylandi | yayinda`
olabilir; yalnızca `yayinda` olanlar listelenir.

## Deploy
Vercel veya Netlify. Adımlar: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Katkı / AI ajan kuralları
Bkz. [`docs/AI_AGENT_RULES.md`](docs/AI_AGENT_RULES.md) ve oturum devri için
[`HANDOFF.md`](HANDOFF.md).
