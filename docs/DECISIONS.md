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

## ADR-009 — PR #6 (claude/google-analytics) merge edilmeden kapatıldı
- **Tarih:** 2026-06-15
- **Karar:** PR #6 merge edilmedi; kapatıldı. İçeriği (GA4, marka rengi, yazar bio, iletişim e-postası) `main` dalında zaten — ve daha iyi biçimde — mevcut.
- **Gerekçe:** PR #6'nın base'i eski `claude/project-initialization-system-4xz843` dalıydı ve `main` o noktayı geçmişti. Merge etmek **regresyon** yaratırdı: (a) marka rengi PR'daki eski `accent:#1e3a5f`'e dönerdi (main'de evrilmiş `#f97316` + `dark`/`light` + `ink` palet var); (b) yazar bio PR'da `hakkinda.astro` içine gömülüydü, main ise `src/data/authors.ts` **tek kaynağından** besliyor (Hakkında + yazı kutusu + Person/ProfilePage JSON-LD tutarlı). GA4 zaten main'de.
- **Alternatifler:** Merge (regresyon — reddedildi); açık bırakmak (kafa karışıklığı — reddedildi).
- **Sonuç:** Kullanıcı onayıyla kapatıldı. Kalan işler ayrı feature branch'te (`claude/saticikutusu-remaining-work-g4xltl`) sürdürüldü.

## ADR-010 — Kategori sayfalarına BreadcrumbList JSON-LD + paylaşılan kırıntı yardımcısı
- **Tarih:** 2026-06-15
- **Karar:** `BreadcrumbList` yapısal verisi tek kaynaktan (`src/lib/breadcrumb.ts` → `buildBreadcrumbLd`) üretilir. Yazı detay sayfasındaki satır içi (inline) kırıntı mantığı bu yardımcıya taşındı; kategori sayfalarına (daha önce yalnızca görsel kırıntı vardı) `BreadcrumbList` JSON-LD eklendi.
- **Gerekçe:** SEO için kategori sayfalarında da yapısal kırıntı gerekiyordu; DRY ilkesi gereği mantık tek yerde tutulmalı (görsel kırıntı ile JSON-LD'nin uyumsuz kalma riskini düşürür). Site geneli `Organization`/`WebSite` zaten `BaseHead.astro`'da merkezîdir; `Article`/`ItemList` ise sayfaya özgü kalır.
- **Alternatifler:** Kırıntıyı her sayfada elle yazmak (tekrar/uyumsuzluk riski — reddedildi).
- **Sonuç:** `src/lib/breadcrumb.ts` (+ 3 birim testi); `posts/[...slug].astro` ve `kategori/[category].astro` güncellendi. Test 30/30, build 20 sayfa yeşil.

## ADR-011 — Monetizasyon/entegrasyon alanları TBD bırakıldı (bilgi dürüstlüğü)
- **Tarih:** 2026-06-15
- **Karar:** Bülten sağlayıcısı, gerçek affiliate URL'leri ve AdSense aktivasyonu bu oturumda **TBD** bırakıldı (kullanıcı kararı: 2026-06-15).
- **Gerekçe:** Doğrulanmamış sağlayıcı/URL/publisher ID uydurmak yasak (CLAUDE.md #6). Mevcut yapı zaten dürüst "boş ama hazır" durumda: bülten formu erişilebilir disabled "yakında" (KVKK notlu, sahte gönderim yok); affiliate linkleri `tools/*.json` + `resolveToolLink` merkezinden çözülür (`affiliateUrl: null` → `officialUrl`'e `nofollow` fallback, sahte "İncele" yok); AdSense `PUBLIC_ADS_ENABLED` flag'i arkasında (kapalıyken hiçbir reklam render edilmez).
- **Açık kalan girdiler:** Bülten sağlayıcısı + API anahtarı; gerçek affiliate program URL'leri; AdSense publisher ID (`ca-pub-…`) + onay durumu.
- **Sonuç:** Sağlayıcı/anahtar/onay geldiğinde tek noktadan doldurulabilir; kod değişikliği minimaldir.
