# ROADMAP

> Son güncelleme: 2026-06-14

## Faz 1 — Çekirdek Site (MEVCUT)
Astro + Tailwind iskeleti, içerik modeli, ana sayfa, yazı şablonu, kategori sayfaları, araç dizini, hakkında/yazar, gizlilik & affiliate açıklama, SEO temelleri (meta/OG/canonical/JSON-LD/sitemap/robots), 2-3 yüksek kaliteli örnek yazı. Deploy edilebilir durumda. Kalite kapısı (build+lint+test) kurulu.
**Durum:** Devam ediyor.

## Faz 2 — Trend Keşif Ajanı
`scripts/` altında ajan: Google Trends / Google News RSS / Product Hunt / Reddit tarama → alaka filtresi → skorlama (talep, rekabet, gelir potansiyeli; 0-100) → yapılandırılmış brief → `drafts/` (`durumu: taslak`). GitHub Actions ile günlük/haftalık cron. Editöryel onay akışı (taslakları listele → onayla → `yayinda` + `src/content/posts/`). Ajan ASLA doğrudan yayınlamaz.
**Durum:** Planlandı.

## Faz 3 — Monetizasyon & Büyüme
AdSense yerleşimleri (onay sonrası aktive), `affiliate.config` genişletme, bülten sağlayıcı entegrasyonu, analytics, JSON-LD zenginleştirme (Product/Review), performans ince ayarı.
**Durum:** Planlandı.

## Gelecek (kapsam dışı, sonra)
Dijital ürün satışı, gelişmiş admin paneli, çoklu yazar yönetimi.
