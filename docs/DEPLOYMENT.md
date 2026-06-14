# DEPLOYMENT

> Son güncelleme: 2026-06-14

Astro statik çıktısı (`dist/`) hem **Vercel** hem **Netlify** ile uyumludur.
Özel bir adapter gerekmez (saf statik). `astro.config.mjs` içindeki `site`
değeri canonical/sitemap için **gerçek domain** ile güncellenmelidir (şu an placeholder — TBD).

## Ön koşullar
- Repo bir GitHub deposunda.
- `npm run build` lokalde sorunsuz.
- Ortam değişkenleri (`.env.example`'daki isimler) ilgili platform panelinde tanımlı.

## Vercel
1. Vercel → New Project → GitHub deposu import.
2. Framework Preset: **Astro** (otomatik algılar).
3. Build Command: `npm run build` · Output: `dist`.
4. Environment Variables: `.env.example`'daki gerekli `PUBLIC_*` ve diğerlerini ekle.
5. Deploy. PR'larda otomatik önizleme dağıtımı oluşur.

## Netlify
1. Netlify → Add new site → Import from GitHub.
2. Build command: `npm run build` · Publish directory: `dist`.
3. Site settings → Environment variables: gerekli değişkenler.
4. Deploy. Deploy Preview'lar PR'larda etkin.

## Build sonrası kontrol
- `/sitemap-index.xml` ve `/robots.txt` erişilebilir.
- Yazı sayfalarında canonical + JSON-LD doğru.
- Lighthouse mobil ≥ 90 (hedef).

## Geri alma (rollback)
Her iki platform da önceki deploy'a tek tıkla geri dönüş sağlar (immutable deploys).

## Notlar
- AdSense scripti onay alınana kadar **aktive edilmez** (kullanıcı kararı).
- Domain bağlanınca `site` değeri ve env güncellenir; bu doküman revize edilir.
