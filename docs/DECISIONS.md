# DECISIONS — Karar Günlüğü (ADR)

> Son güncelleme: 2026-06-14
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
