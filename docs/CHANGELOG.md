# Changelog

Bu projenin tüm önemli değişiklikleri bu dosyada belgelenir.

Format [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/) standardına,
sürümleme [Semantic Versioning](https://semver.org/lang/tr/) yaklaşımına dayanır.

## [Unreleased]

### Changed
- Marka adı "Satıcı Kutusu" ve domain `saticikutusu.com` olarak ayarlandı;
  `site` URL'i, robots.txt fallback'i ve placeholder marka adları güncellendi (ADR-006).

### Added
- Evrensel proje başlatma dokümantasyon seti: `CLAUDE.md`, `/docs` altında
  PROJECT_CONTEXT, ARCHITECTURE, ROADMAP, TASKS, CHANGELOG, DECISIONS, RISKS,
  API, DEPLOYMENT, SECURITY, TESTING, AI_AGENT_RULES; `README.md`, `HANDOFF.md`,
  `.gitignore`, `.env.example`.
- Faz 1 Astro + Tailwind çekirdek site iskeleti: Content Collections (posts/tools),
  layout'lar, temel bileşenler, ana sayfa, yazı detay, kategori, araç dizini,
  hakkında/gizlilik/affiliate açıklama sayfaları, robots.txt.
- SEO temelleri: meta/OG/canonical, JSON-LD Article, otomatik sitemap.
- `affiliate.config.ts` merkezi affiliate yönetimi + `rel="sponsored nofollow"` + ifşa.
- Build/lint/test kalite altyapısı (Vitest) + örnek geçen test + CI workflow (TASK-001).
- 3 örnek yüksek kaliteli yazı + örnek araç dizini verisi (doğrulanmamış figürler TBD).
