# PROJECT_CONTEXT — Single Source of Truth

> Son güncelleme: 2026-06-14
> Bu dosya projenin stabil hafızasıdır. Sık değişen içerik (görev durumu, oturum) buraya YAZILMAZ → bkz. `TASKS.md` / `HANDOFF.md`. 500 satırı geçerse özetlenip detaylar ilgili `/docs` dosyalarına taşınır.

## Proje Özeti
Türkçe niş blog. Niş: online satıcılar (Shopify, Etsy, Amazon, Trendyol, Hepsiburada) için yapay zeka araçları. İçerik türleri: araç incelemeleri, karşılaştırmalar, kullanım rehberleri, sektör trend/haberleri.

## İş Hedefleri
- Nitelikli, özgün içerikle organik (SEO) trafik büyütmek.
- Trafiği AdSense (reklam) ve affiliate (özellikle tekrarlayan SaaS komisyonu) ile gelire çevirmek.
- Niş otoritesi (E-E-A-T) inşa etmek.

## Başarı Metrikleri
- Lighthouse mobil skoru ≥ 90 (Performans/SEO/Erişilebilirlik).
- Organik tıklama/oturum büyümesi (hedef değerler: TBD).
- Affiliate dönüşüm oranı, AdSense RPM (hedef değerler: TBD).
- Google "scaled content abuse" cezası ALMAMAK (sıfır toleranslı kısıt).

## Hedef Kitle
Türkiye'de e-ticaret yapan online satıcılar; pazaryeri (Trendyol, Hepsiburada, Amazon) ve kendi mağaza (Shopify, Etsy) satıcıları. İşini AI ile hızlandırmak isteyen, teknik olmayan kullanıcılar.

## Kullanıcı Problemleri
- Hangi AI aracının kendi iş akışına (ürün açıklaması, görsel, müşteri desteği, SEO/reklam, stok) uygun olduğunu bilmemek.
- Araçların fiyat/özellik karşılaştırmasının Türkçe ve Türkiye pazarına özel olmaması.
- Pratik "nasıl kullanılır" rehberi eksikliği.

## Çözüm Tanımı
Özgün açı içeren (gerçek karşılaştırma tablosu, artı/eksi, fiyatlandırma, Türkiye'ye özel yorum, pratik kullanım) yazılar + filtrelenebilir AI araçları dizini. Her yazı insan onayından geçer.

## Kullanıcı Akışları
- Arama/sosyal → yazı detay → ilgili araç (affiliate) → kayıt/satın alma.
- Ana sayfa → kategori → yazı.
- Araç dizini → filtre → araç detay/affiliate.
- Bülten kaydı (e-posta toplama).
Detay: `ARCHITECTURE.md`.

## Fonksiyonel Gereksinimler
- Ana sayfa (öne çıkan + en yeni), yazı detay (SEO meta, yazar kutusu, affiliate ifşa, ilgili yazılar), kategori sayfaları, AI araçları dizini (filtrelenebilir), hakkında/yazar, gizlilik & affiliate açıklama sayfaları, bülten bileşeni.
- İçerik modeli frontmatter: `baslik, ozet, tarih, guncellenme, yazar, kategori, etiketler, kapakGorsel, seoBaslik, seoAciklama, anahtarKelime, incelenenAraclar[], durumu(taslak|onaylandi|yayinda)`.
- Editöryel kapı: yalnızca `durumu: yayinda` build'e girer.
- Affiliate linkleri tek config'ten (`affiliate.config.ts`), `rel="sponsored nofollow"` + ifşa.

## Fonksiyonel Olmayan Gereksinimler
- Performans: Lighthouse mobil 90+, hızlı statik sayfalar.
- SEO: doğru meta/OG/canonical, JSON-LD, sitemap, robots, temiz Türkçe slug.
- Erişilebilirlik: anlamsal HTML, mobil öncelikli.
- Bakım: minimum bağımlılık, dosya tabanlı içerik.

## Teknik Mimari
Statik site (Astro) + Content Collections. Build zamanı içerik filtreleme. Faz 2'de zamanlanmış Node.js ajanı taslak üretir (yayın yok). Detay: `ARCHITECTURE.md`.

## Kullanılacak Teknolojiler
Astro, Tailwind CSS, TypeScript, MDX, @astrojs/sitemap. Test: Vitest. CI: GitHub Actions. Barındırma: Vercel/Netlify. Sürümler: `package.json`. Veritabanı: yok (gerekirse SQLite/Turso — Faz 1'de değil).

## Sistem Bileşenleri
- Frontend/SSG: Astro sayfaları + bileşenler.
- İçerik deposu: Markdown/JSON (dosya tabanlı).
- Affiliate yönetimi: `affiliate.config.ts`.
- (Faz 2) Trend keşif ajanı: `scripts/`.
- (Faz 2) Otomasyon: `.github/workflows`.

## Entegrasyonlar
- (Faz 2 ajan) Google Trends, Google News RSS, Product Hunt, Reddit. TBD: erişim yöntemleri.
- (Faz 3) AdSense, affiliate ağları, bülten sağlayıcısı, analytics. Tümü TBD.

## API Gereksinimleri
Faz 1'de harici API yok; iç "API" = Content Collections şeması (`src/content/config.ts`). Detay/şema: `API.md`.

## Veritabanı Gereksinimleri
Faz 1: yok (dosya tabanlı). İçerik/araç hacmi büyürse SQLite/Turso değerlendirilecek (karar: `DECISIONS.md`).

## Güvenlik Gereksinimleri
Gizli anahtarlar yalnızca env'de, asla repoda. Affiliate linkleri `rel="sponsored nofollow"`. Kullanıcı girdisi (bülten formu) doğrulanır. Detay: `SECURITY.md`.

## Performans Gereksinimleri
Statik üretim, görsel optimizasyonu (lazy load, modern format), minimum JS. Lighthouse mobil ≥ 90.

## Ölçeklenebilirlik Gereksinimleri
İçerik arttıkça build süresi yönetimi; gerekirse artımlı build / DB'ye geçiş. CDN üzerinden statik dağıtım.

## SEO Gereksinimleri
Sayfa başına title/meta/description, OG, canonical; JSON-LD Article (+ uygunsa Product/Review); otomatik sitemap.xml + robots.txt; anahtar kelime başına tek kanonik yazı; ince/çakışan içerik üretme.

## Test Stratejisi
Vitest birim testleri (affiliate çözümleme, içerik şema doğrulama, yardımcılar). `astro check` tip kontrolü. Detay: `TESTING.md`.

## Yayınlama Stratejisi
Git push → Vercel/Netlify otomatik build & deploy. Önizleme dağıtımları PR'larda. Detay: `DEPLOYMENT.md`.

## Risk Analizi
Özet burada; detay `RISKS.md`. En kritik: Google scaled-content-abuse cezası → insan editöryel kapı zorunlu.

## Karar Günlüğü
Bkz. `DECISIONS.md` (Astro seçimi, dosya tabanlı içerik, dil, HANDOFF/TASKS önceliği).

## Kapsam Dışı (Out of Scope)
- Faz 1'de: trend ajanı, monetizasyon scriptleri, veritabanı, dijital ürün satışı, kullanıcı hesapları.
- Otomatik yayın (her zaman kapsam dışı — yasak).

## Gelecek Özellikler
- Dijital ürün (rehber/şablon) satış altyapısı.
- Gelişmiş admin onay paneli.
- Çoklu yazar yönetimi.

## Varsayımlar
- (V1) Marka adı "Akıllı Satıcı" olabilir (dizin adı iması) — kullanıcı onayı bekleniyor, şimdilik TBD.
- (V2) Barındırma hem Vercel hem Netlify uyumlu olacak şekilde nötr tutuldu.
- (V3) Faz 1 içerik hacmi dosya tabanlı yapı için yeterince küçük.

## AI Ajan Kuralları
Bkz. `AI_AGENT_RULES.md`.
