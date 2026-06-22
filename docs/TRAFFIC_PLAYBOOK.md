# TRAFFIC_PLAYBOOK — Ücretsiz Trafik Büyütme Oyun Kitabı

> Son güncelleme: 2026-06-15
> Amaç: saticikutusu.com'a **0 TL reklam bütçesiyle** organik trafik kazandırmak.
> Bu dosya hem teknik altyapının (kod) durumunu hem de **senin yapman gereken aksiyonları** içerir.

---

## Durum özeti

| Kaldıraç | Durum | Aksiyon sahibi |
|----------|-------|----------------|
| Sitemap, RSS, robots, JSON-LD (Article/Breadcrumb/Org/WebSite) | ✅ Kurulu | — |
| FAQ (SSS) bölümü + FAQPage schema | ✅ Kurulu (yazıya `sss` ekleyince çalışır) | İçerik |
| Yazı↔araç çapraz linkleme | ✅ Kurulu (`incelenenAraclar` üzerinden) | — |
| Sosyal paylaşım butonları (yazı altı) | ✅ Kurulu (WhatsApp/Pinterest/X/FB/LinkedIn/kopyala) | — |
| IndexNow (Bing/Yandex anında indeksleme) | ✅ Kurulu (push'ta otomatik) | — |
| Google Search Console | ⏳ Doğrulama gerekli | **Sen** |
| Bing Webmaster Tools | ⏳ Kurulum gerekli | **Sen** |
| Trend keşif ajanı (haftalık taslak) | ✅ Cron'da; üretim için secret gerek | **Sen** (secret) |
| Sosyal dağıtım | ⏳ Manuel | **Sen** |

---

## 1. Google Search Console (EN KRİTİK — önce bunu yap)

Search Console olmadan Google'da nasıl göründüğünü göremezsin ve indeksleme yavaş olur. Ücretsiz.

1. https://search.google.com/search-console → **Mülk ekle**.
2. Doğrulama (iki seçenekten biri):
   - **DNS (önerilen, alan adı geneli):** "Alan adı" mülkü seç → verilen TXT kaydını alan adı sağlayıcının (domain registrar) DNS ayarlarına ekle.
   - **HTML etiketi (kod ile):** "URL ön eki" mülkü seç → verilen `content="..."` değerini `src/data/site.ts` içindeki `GOOGLE_SITE_VERIFICATION` sabitine yapıştır, commit + push et, deploy bitince "Doğrula"ya bas.
3. Doğrulandıktan sonra **Sitemap** sekmesi → `sitemap-index.xml` gönder.
4. Önemli sayfaları **URL İncele → Dizine eklenmesini iste** ile elle gönder (ilk indekslemeyi hızlandırır).
5. 1-2 hafta sonra **Performans** raporunu izle: hangi sorgular tıklanıyor → o sorgulara yeni içerik üret.

## 2. Bing Webmaster Tools (5 dakika, GSC'den içe aktar)

1. https://www.bing.com/webmasters → giriş yap.
2. **Import from Google Search Console** ile tek tıkla içe aktar (en kolay yol).
3. IndexNow zaten kurulu (aşağıya bak); Bing buradan da besleniyor.

## 3. IndexNow (kurulu — senden aksiyon gerekmez)

- Anahtar: `public/cc0e070a8878e76f2d4932cdb0e7445d.txt` (herkese açık, gizli değil).
- `main` dalına `src/content/posts/**` altında bir değişiklik push edilince
  `.github/workflows/indexnow.yml` otomatik çalışır ve yayında URL'leri Bing/Yandex'e bildirir.
- Elle tetiklemek için: GitHub → Actions → "IndexNow Bildirimi" → Run workflow.
- Yerelde test: `npm run indexnow` (bu ortamda egress kısıtı 403 verebilir; CI'da çalışır).

---

## 4. İçerik motoru — organik trafiğin asıl kaynağı

İçerik ne kadar çok ve nitelikliyse, o kadar çok long-tail sorgudan trafik gelir.

### a) Trend keşif ajanı (otomatik, haftalık)
- `.github/workflows/trend-discovery.yml` haftalık cron'da çalışır ve `drafts/` altına
  `durumu: taslak` taslaklar üretip PR açar. **Otomatik yayın YOK** (kritik kural 3).
- Üretim için: GitHub → Settings → Secrets → Actions → `ANTHROPIC_API_KEY` ekle.
- Ajanı **kapatma**; bırak haftalık çalışsın. Her PR'ı sen incele/düzenle/onayla.

### b) Elle içerik (taslak akışı)
- Yeni yazı `src/content/posts/*.md` içine `durumu: taslak` ile eklenir → build'e GİRMEZ.
- İncele, düzelt, `durumu: yayinda` yap → yayınlanır.
- **Bekleyen taslak:** `e-ticaret-yapay-zeka-araclari-rehberi.md` (pillar/hub yazısı) — onayını bekliyor.

### c) Her yazıya SSS ekle
Frontmatter'a `sss:` ekle → otomatik FAQ bölümü + FAQPage schema. Örnek için
`etsy-urun-aciklamalari-ai-araclari.md` dosyasına bak. SSS, "İnsanlar şunu da soruyor"
sonuçlarını ve AI cevap motorlarını (ChatGPT, Gemini, AI Overviews) hedefler.

### d) İçerik fikri öncelikleri (long-tail, yüksek niyet)
- "[Araç adı] nasıl kullanılır" rehberleri (ChatGPT ile ürün açıklaması, Canva ile afiş…)
- "[Pazaryeri] [iş] nasıl yapılır" (Trendyol ürün açıklaması nasıl yazılır…)
- "[Araç A] vs [Araç B]" karşılaştırmaları
- Pillar yazıdan (e-ticaret rehberi) yeni alt yazılara iç link ver; alt yazılardan pillar'a geri link ver.

---

## 5. Dağıtım — ücretsiz ama manuel (ilk trafiği "tohumla")

SEO meyvesini aylar içinde verir; dağıtım ilk ziyaretçiyi ve ilk backlink/sinyalleri getirir.

> **Kopyala-yapıştır metinler:** Her yazı için hazır, değer-önce paylaşım metinleri ve
> tekrar eden iş akışı → `docs/DISTRIBUTION_KIT.md`. Ayrıca her yazının altında artık
> **paylaşım butonları** var (okuyucu da dağıtıma katılır).

### Pinterest (TR e-ticaret için en güçlü ücretsiz kanal)
- İşletme hesabı aç, alan adını doğrula. (Doğrulama meta etiketi sitede kurulu — `PINTEREST_DOMAIN_VERIFY`.)
- Her yazının **dikey pin görseli** (`/pin/<slug>.png`, 1000×1500) otomatik üretilir → doğrudan pin'le.
  (Yatay `/og/<slug>.png` 1200×630 de mevcut; sosyal kart önizlemesi için kullanılır.)
- En kolayı: yazı altındaki Pinterest paylaş butonu dikey görseli + açıklamayı önceden doldurur.
- Konu panoları: "Etsy satıcı ipuçları", "Shopify görsel", "E-ticaret yapay zeka".

### Facebook satıcı grupları
- "Etsy Türkiye satıcıları", "Shopify Türkiye", "Trendyol satıcıları" gibi gruplara katıl.
- Spam YAPMA: önce soruları yanıtla, gerçekten ilgili olduğunda yazına link ver.

### Reddit / Ekşi Sözlük / forumlar
- r/girisimcilik, r/Turkey (uygun bağlamda), e-ticaret forumları.
- Değer önce: soruya tam cevap ver, kaynak olarak yazıyı göster.

### LinkedIn
- Kişisel hesaptan kısa "ipucu" gönderileri + yazıya link. B2B/satıcı kitlesi burada güçlü.

### E-posta / RSS
- `rss.xml` hazır. İleride bülten sağlayıcısı bağlanınca RSS→e-posta otomasyonu kurulabilir.

### Dağıtım ilkesi
Her yeni yazı yayınlandığında: Pinterest pin + 1-2 ilgili grup/forum paylaşımı + LinkedIn.
Önce **değer**, sonra link. Topluluk kurallarına uy; saf tanıtım çoğu yerde yasak.

---

## Öncelikli aksiyon listesi (senin yapacakların)

- [ ] **1.** Google Search Console doğrula + sitemap gönder (en kritik).
- [ ] **2.** Bing Webmaster'a GSC'den içe aktar.
- [ ] **3.** `ANTHROPIC_API_KEY` secret'ını ekle (trend ajanı taslak üretsin).
- [ ] **4.** Pillar taslağını (`e-ticaret-yapay-zeka-araclari-rehberi.md`) incele → `yayinda` yap.
- [ ] **5.** Pinterest işletme hesabı + ilk pinler.
- [ ] **6.** 2-3 ilgili Facebook/Reddit grubuna katıl, değer üreterek paylaşım yap.
- [ ] **7.** Haftalık: GSC Performans → kazanan sorgulara yeni içerik üret.

---

*Bu oyun kitabı yaşayan bir belgedir. Yapılan adımlar tiklenir; yeni kanallar denendikçe güncellenir.*
