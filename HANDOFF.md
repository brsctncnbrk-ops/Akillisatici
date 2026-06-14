# HANDOFF — Oturum Devri

> **Birincil oturum devri dosyası.** Her oturum sonunda burayı güncelle: ne yapıldı,
> sırada ne var, açık sorular. `docs/TASKS.md` "Oturum Günlüğü" bu dosyaya yönlendirir.
> (Bu önceliklendirme `docs/DECISIONS.md` ADR-004'te gerekçelendirildi.)

---

## Oturum: 2026-06-14 — Proje başlatma + Faz 1 iskelet

### Yapıldı
- Tam dokümantasyon seti oluşturuldu (CLAUDE.md, /docs/* 12 dosya, README, .gitignore, .env.example).
- Faz 1 Astro + Tailwind çekirdek site iskeleti kuruldu:
  - Content Collections (posts + tools) zod şemaları
  - Layout'lar, bileşenler (Header, Footer, PostCard, ToolCard, BaseHead/SEO, AffiliateDisclosure, AdSlot, NewsletterSignup)
  - Sayfalar: ana sayfa, yazı detay, kategori, araç dizini, hakkında, gizlilik, affiliate açıklama, robots.txt
  - `affiliate.config.ts` (tek kaynak), `rel="sponsored nofollow"` + ifşa
  - SEO: meta/OG/canonical/JSON-LD Article, otomatik sitemap
- TASK-001: build + lint + test altyapısı + 1 geçen örnek test + CI workflow.
- 3 örnek yazı (Etsy açıklama AI / Shopify ürün fotoğrafı AI / Trendyol-Hepsiburada müşteri desteği AI) — doğrulanmamış figürler TBD.

### Sırada (Sonraki adım)
- **Deploy (devam ediyor):** Vercel + Git Integration seçildi (ADR-007). Kullanıcı panelden repo'yu import edecek; adımlar `docs/DEPLOYMENT.md`. CLI yolu ağ egress politikası (`api.vercel.com` allowlist dışı) nedeniyle bu ortamda çalışmıyor.
  - Production branch kararı bekliyor: feature branch'i `main`'e merge (önerilen) **veya** Vercel'de production branch = feature branch.
  - Domain `saticikutusu.com` Vercel Domains'ten bağlanacak (DNS kayıtları).
- Kullanıcıdan açık TBD'lerin yanıtları beklenir (aşağıya bkz.).
- Faz 2: Trend keşif ajanı (`scripts/`) + `/drafts/` skorlama + editöryel onay komutu + GitHub Actions cron.

### Açık Sorular / TBD
- ~~Marka adı + domain~~ → **Çözüldü (2026-06-14):** "Satıcı Kutusu" / saticikutusu.com (ADR-006). `site` URL güncellendi.
- Marka rengi (Tailwind teması şu an nötr)
- Gerçek yazar kimliği + biyografi (E-E-A-T)
- Araç fiyatları & affiliate komisyon oranları (uydurulmadı, TBD)
- Bülten sağlayıcısı + Analytics sağlayıcısı
- AdSense yayıncı kimliği (script onay sonrası kullanıcı tarafından aktive edilecek)
