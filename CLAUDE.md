# CLAUDE.md

> Bu dosya her oturumda otomatik okunur. KISA tutulur (≤1 sayfa). Detaylar `/docs` altındadır.

## Proje Özeti
Türkçe niş blog: **online satıcılar (Shopify, Etsy, Amazon, Trendyol, Hepsiburada) için yapay zeka araçları.** İçerik: AI araç incelemeleri, karşılaştırmalar, kullanım rehberleri ve trend haberleri. İş modeli: organik trafik → AdSense + affiliate gelir.

## Komutlar
- Kurulum: `npm install`
- Geliştirme sunucusu: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Format: `npm run format`

## Teknoloji Yığını
Astro (statik, SEO) + Content Collections (Markdown/MDX), Tailwind CSS, TypeScript. Test: Vitest. Barındırma: Vercel veya Netlify. Otomasyon (Faz 2): Node.js + GitHub Actions. Sürümler için bkz. `package.json`.

## Dosya Yapısı
- `src/content/posts` — yayınlanmış yazılar · `src/content/tools` — araç dizini verisi
- `src/components`, `src/layouts`, `src/pages` — UI
- `drafts/` — ajanın ürettiği onay bekleyen taslaklar (Faz 2)
- `scripts/` — trend keşif ajanı (Faz 2) · `.github/workflows` — CI + zamanlama
- Araç verisi (`src/content/tools/*.json`) — `officialUrl`/`affiliateUrl` link kaynağı
- `src/data/authors.ts` — yazar (E-E-A-T) tek kaynağı · `docs/` — tüm dokümanlar

## Kodlama Standartları
- Kod dili (değişken/fonksiyon/dosya): **İngilizce**
- Yorum & dokümantasyon dili: **Türkçe**
- İsimlendirme: camelCase (TS/JS), kebab-case (dosya/slug)
- Formatter/Linter: Prettier (+ prettier-plugin-astro) + ESLint (+ eslint-plugin-astro)

## Zorunlu Dokümanlar
- Detaylı bağlam: `docs/PROJECT_CONTEXT.md` · Mimari: `docs/ARCHITECTURE.md`
- Görevler/durum: `docs/TASKS.md` · Kararlar: `docs/DECISIONS.md`
- Ajan kuralları: `docs/AI_AGENT_RULES.md` · Oturum devri: `HANDOFF.md`

## Kritik Kurallar
1. Her oturuma `docs/PROJECT_CONTEXT.md`, `docs/TASKS.md` ve `HANDOFF.md` okuyarak başla.
2. Görev bitmeden build + lint + test çalıştır ve geçtiğini doğrula (kalite kapısı).
3. **Otomatik yayın YASAK.** İçerik önce `durumu: taslak`; insan onayından sonra yayınlanır.
4. Yıkıcı işlemler (silme, sıfırlama, migration, force push) için önce kullanıcı onayı al.
5. `.env`, API key, token asla commit'lenmez / koda gömülmez. Affiliate linkleri `rel="sponsored nofollow"` + görünür ifşa.
6. Bilmediğin bilgiyi (fiyat, komisyon, özellik) uydurma; `TBD` yaz ve sor.
7. Aynı hatada 3 başarısız denemeden sonra dur ve kullanıcıya raporla.
