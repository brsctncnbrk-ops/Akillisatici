# DECISIONS — Karar Günlüğü (ADR)

> Son güncelleme: 2026-06-15
> Her büyük karar: tarih, gerekçe, alternatifler, sonuç.

## ADR-001 — Framework: Astro
- **Tarih:** 2026-06-14
- **Karar:** İçerik ağırlıklı blog için Astro (SSG) kullanılacak.
- **Gerekçe:** Mükemmel SEO, hız (minimal JS), Content Collections ile tip güvenli Markdown/MDX. Kullanıcı spec'inde belirtildi.
- **Alternatifler:** Next.js (daha ağır, gereksiz runtime), Hugo (TS/şema ekosistemi zayıf), WordPress (bakım/güvenlik yükü).
- **Sonuç:** Astro seçildi.

## ADR-002 — İçerik depolama: Dosya tabanlı (Markdown/JSON)
- **Tarih:** 2026-06-14
- **Karar:** Faz 1'de veritabanı yok; içerik dosya tabanlı.
- **Gerekçe:** Düşük karmaşıklık, git ile versiyonlama, kolay editöryel onay. Spec gereği.
- **Alternatifler:** SQLite/Turso (erken karmaşıklık), Headless CMS (maliyet/bağımlılık).
- **Sonuç:** Dosya tabanlı; hacim büyürse SQLite/Turso yeniden değerlendirilecek.

## ADR-003 — Dil politikası
- **Tarih:** 2026-06-14
- **Karar:** Kod tanımlayıcıları İngilizce; yorum ve dokümantasyon Türkçe; içerik Türkçe.
- **Gerekçe:** Proje ve hedef kitle Türkçe; kod standardı İngilizce kalır (taşınabilirlik). Kullanıcı onayı alındı.
- **Sonuç:** Uygulandı.

## ADR-004 — Oturum devri: HANDOFF.md birincil
- **Tarih:** 2026-06-14
- **Karar:** Oturum günlüğü birincil olarak `HANDOFF.md`'de tutulur; `TASKS.md` "Oturum Günlüğü" buraya yönlendirir.
- **Gerekçe:** Init sistemi (TASKS.md) ile blog spec'i (HANDOFF.md) çelişiyordu. Çelişki hiyerarşisi gereği kullanıcının güncel spec'i (HANDOFF.md) üst sırada. Kullanıcıya bildirildi.
- **Alternatifler:** Yalnızca TASKS.md (spec'e aykırı), iki yerde tekrar (senkron riski).
- **Sonuç:** HANDOFF.md birincil, TASKS.md işaret tutar.

## ADR-005 — Editöryel kapı: build zamanı `durumu` filtresi
- **Tarih:** 2026-06-14
- **Karar:** Yalnızca `durumu: yayinda` içerik build'e girer; otomatik yayın yok.
- **Gerekçe:** Google scaled-content-abuse cezasından kaçınma; insan onayı zorunlu (en kritik kısıt).
- **Sonuç:** `src/content/config.ts` şemasına `durumu` eklendi; sayfalar filtreler.

## ADR-006 — Marka adı ve domain
- **Tarih:** 2026-06-14
- **Karar:** Marka adı **"Satıcı Kutusu"**, domain **saticikutusu.com**.
- **Gerekçe:** Kullanıcı `saticikutusu.com` domainini aldı; marka adı domainden türetildi. Önceki placeholder ("Akıllı Satıcı") ve `https://example.com` kaldırıldı.
- **Sonuç:** `astro.config.mjs` `site` değeri, `robots.txt` fallback, tüm `markaAdi` placeholder'ları ve `package.json` adı güncellendi.

## ADR-007 — Deploy: Vercel + Git Integration
- **Tarih:** 2026-06-14
- **Karar:** Yayınlama Vercel üzerinde **Git Integration** ile yapılacak (panelden repo import; her push'ta otomatik build+deploy).
- **Gerekçe:** Claude Code web oturumunun ağ egress politikası `api.vercel.com`'a erişimi engelliyor ("Host not in allowlist"), bu yüzden container'dan `vercel` CLI ile deploy yapılamadı. Git Integration'da build Vercel sunucusunda çalışır ve bu kısıttan etkilenmez; ayrıca otomatik CI/CD + PR önizlemeleri sağlar.
- **Alternatifler:** CLI ile token bazlı deploy (ağ politikası nedeniyle bu ortamda çalışmıyor); egress allowlist'e Vercel host'ları ekleyip CLI (ortam yapılandırması değişikliği gerektirir).
- **Sonuç:** Adımlar `DEPLOYMENT.md`'de. Production branch ve domain bağlama notları eklendi.

## ADR-008 — Faz 2: Trend keşif ajanı mimarisi
- **Tarih:** 2026-06-14
- **Karar:** TypeScript + `tsx` ile çalışan iki aşamalı hat: (1) RSS keşfi + saf skorlama (LLM yok), (2) Claude API ile taslak üretimi. Çıktı yalnızca `drafts/` altına `durumu: taslak`. GitHub Actions cron + `peter-evans/create-pull-request` ile PR tabanlı insan onayı.
- **Gerekçe:** Saf skorlama/ayrıştırma birim testlenebilir ve secret gerektirmez; LLM yalnızca metin üretimi için. PR akışı "otomatik yayın YASAK" kuralını (CLAUDE.md #3) yapısal olarak garanti eder — site yalnızca `durumu: yayinda` build eder. Model varsayılanı `claude-opus-4-8` (`ANTHROPIC_MODEL` ile override).
- **Alternatifler:** Managed Agents (fazla ağır, kalıcı altyapı gerektirir); doğrudan `src/content`'a yazma (yayın kontrolünü kırar — reddedildi).
- **Sonuç:** `scripts/lib/*` + iki giriş noktası + `.github/workflows/trend-discovery.yml`. Skorlama/frontmatter/RSS-parse için 19 birim testi. `ANTHROPIC_API_KEY` GitHub secret olarak verilmeli.

## ADR-009 — Bülten sağlayıcısı: Kit (ConvertKit), sunucusuz embed POST
- **Tarih:** 2026-06-15
- **Karar:** Bülten için **Kit (ConvertKit)** ücretsiz katmanı kullanılacak. `NewsletterSignup.astro` formu, statik site olduğu için doğrudan Kit'in genel embed uç noktasına (`https://app.kit.com/forms/<ID>/subscriptions`, alan adı `email_address`) POST eder. Uç nokta `PUBLIC_KIT_FORM_ID` (veya tam `PUBLIC_KIT_FORM_ACTION`) ile verilir; değişken boşsa form "yakında" devre dışı durumuna düşer.
- **Gerekçe:** Kullanıcı tamamen ücretsiz çözüm istedi. Kit ücretsiz katmanı 10.000 aboneye kadar ve sınırsız gönderim sunar — en cömert seçenek. Site statik (Vercel, sunucu fonksiyonu yok) olduğundan serverless proxy gerektirmeyen native embed POST en az karmaşık ve en sağlam yol; üçüncü taraf JS yüklenmez (Lighthouse/gizlilik korunur). Form ID herkese açık olduğundan `PUBLIC_*` env güvenli, **API anahtarı/secret commit'lenmez** (CLAUDE.md #5). KVKK/GDPR için Kit "çift opt-in" açık tutulur.
- **Alternatifler:** MailerLite (1.000 abone ücretsiz), Brevo (300 e-posta/gün), Buttondown (100 abone) — hepsi değerlendirildi; Kit en yüksek ücretsiz abone limiti nedeniyle seçildi. Serverless fonksiyon + gizli API (gereksiz altyapı/secret — reddedildi); üçüncü taraf JS embed (performans/gizlilik maliyeti — reddedildi).
- **Sonuç:** `NewsletterSignup.astro` koşullu aktif/yakında render eder. `.env.example` + `DEPLOYMENT.md` güncellendi. Kalite kapısı yeşil: lint 0 · test 27/27 · build 20 sayfa. Kullanıcı aksiyonu: Kit hesabı + form → Vercel'e `PUBLIC_KIT_FORM_ID` ekle.
