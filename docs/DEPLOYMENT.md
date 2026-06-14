# DEPLOYMENT

> Son güncelleme: 2026-06-14

Astro statik çıktısı (`dist/`) hem **Vercel** hem **Netlify** ile uyumludur.
Özel bir adapter gerekmez (saf statik). `astro.config.mjs` içindeki `site`
değeri **https://saticikutusu.com** olarak ayarlandı (canonical/sitemap).

> **Seçilen yöntem: Vercel + Git Integration** (ADR-007 / kullanıcı kararı, 2026-06-14).
> Neden CLI değil: Claude Code web oturumunun ağ egress politikası `api.vercel.com`'a
> erişimi engelliyor ("Host not in allowlist"), bu yüzden container'dan `vercel` CLI ile
> deploy yapılamıyor. Git Integration'da build Vercel sunucusunda çalışır; bu kısıt devreye girmez.

## Ön koşullar
- Repo bir GitHub deposunda: `brsctncnbrk-ops/akillisatici`.
- `npm run build` lokalde sorunsuz (doğrulandı).
- Faz 1 için zorunlu ortam değişkeni YOK (`PUBLIC_*` placeholder'ları boş; `site` koda yazılı).

## Vercel (Git Integration)
1. https://vercel.com/new → **Import Git Repository**.
2. GitHub'ı bağla/yetkilendir ve `brsctncnbrk-ops/akillisatici` deposunu seç.
3. Framework Preset: **Astro** (otomatik algılanır). Build: `npm run build` · Output: `dist` · Install: `npm install`.
4. Environment Variables: Faz 1'de gerekli değil (boş bırak). Faz 3'te AdSense/analytics/bülten eklenecek.
5. **Production Branch:** Tüm kod şu an `claude/project-initialization-system-4xz843` dalında; `main` boş.
   - Seçenek A (önerilen): bu dalı `main`'e merge et, production branch = `main` kalsın.
   - Seçenek B: Project → Settings → Git → **Production Branch** = `claude/project-initialization-system-4xz843` yapıp redeploy et.
6. **Deploy** → build bitince `*.vercel.app` URL'i oluşur. PR'larda otomatik önizleme dağıtımı.

## Domain bağlama (saticikutusu.com)
1. Project → Settings → **Domains** → `saticikutusu.com` ve `www.saticikutusu.com` ekle.
2. Vercel'in gösterdiği DNS kayıtlarını domain sağlayıcında uygula:
   - Apex (`saticikutusu.com`): A kaydı `76.76.21.21` **veya** Vercel nameserver'ları.
   - `www`: CNAME → `cname.vercel-dns.com`.
   (Kesin değerler Vercel panelinde gösterilir; oradakini esas al.)
3. SSL sertifikası Vercel tarafından otomatik sağlanır.


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
- `site` değeri `saticikutusu.com` olarak ayarlandı; farklı domain seçilirse `astro.config.mjs` güncellenir.
- Web oturumundan CLI deploy ağ politikasıyla engelli (bkz. üst not); CLI gerekiyorsa egress allowlist'e Vercel host'ları eklenmeli.
