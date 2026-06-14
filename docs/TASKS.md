# TASKS

> Son güncelleme: 2026-06-14
> Yaşayan görev günlüğü. Tamamlanan görev yalnızca testler geçtikten sonra işaretlenir.

---

### TASK-001
- **Görev:** Proje iskeleti + build, lint ve test altyapısının kurulması ve örnek bir testin geçmesi.
- **Öncelik:** Yüksek
- **Bağımlılıklar:** —
- **Etkilenen Dosyalar:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `.prettierrc`, `eslint` config, `vitest.config.ts`, `src/lib/*` + test, `.github/workflows/ci.yml`
- **Tamamlanma Kriteri:** `npm run build`, `npm run lint`, `npm run test` üçü de geçer; en az 1 anlamlı test yeşil.
- **Test Gereksinimi:** Var (affiliate çözümleme / yardımcı testi).
- **Durum:** Test Ediliyor

### TASK-002
- **Görev:** İçerik modeli — Content Collections (`posts` + `tools`) zod şeması (spec frontmatter'ına birebir).
- **Öncelik:** Yüksek
- **Bağımlılıklar:** TASK-001
- **Etkilenen Dosyalar:** `src/content/config.ts`, `src/lib/content.ts`
- **Tamamlanma Kriteri:** Geçersiz frontmatter build'i durdurur; geçerli içerik tiplenir.
- **Test Gereksinimi:** Var (şema doğrulama testi).
- **Durum:** Devam Ediyor

### TASK-003
- **Görev:** Layout + temel bileşenler (BaseLayout, PostLayout, BaseHead/SEO, Header, Footer).
- **Öncelik:** Yüksek
- **Bağımlılıklar:** TASK-001
- **Etkilenen Dosyalar:** `src/layouts/*`, `src/components/BaseHead.astro`, `Header.astro`, `Footer.astro`
- **Tamamlanma Kriteri:** Tüm sayfalarda title/meta/OG/canonical render olur.
- **Test Gereksinimi:** Yok (saf sunum/şablon; build doğrulaması yeterli).
- **Durum:** Devam Ediyor

### TASK-004
- **Görev:** Sayfalar — ana sayfa, yazı detay, kategori, araç dizini, hakkında, gizlilik, affiliate açıklama, robots.txt.
- **Öncelik:** Yüksek
- **Bağımlılıklar:** TASK-002, TASK-003
- **Etkilenen Dosyalar:** `src/pages/*`
- **Tamamlanma Kriteri:** Tüm sayfalar build olur ve render edilir; yalnızca `yayinda` yazılar listelenir.
- **Test Gereksinimi:** Yok (build + manuel doğrulama).
- **Durum:** Devam Ediyor

### TASK-005
- **Görev:** Affiliate altyapısı — `affiliate.config.ts` + `AffiliateLink`/`AffiliateDisclosure` (`rel="sponsored nofollow"`).
- **Öncelik:** Orta
- **Bağımlılıklar:** TASK-003
- **Etkilenen Dosyalar:** `affiliate.config.ts`, `src/components/AffiliateLink.astro`, `AffiliateDisclosure.astro`, `src/lib/affiliate.ts`
- **Tamamlanma Kriteri:** Linkler config'ten çözülür; çıktıda doğru `rel`; ifşa görünür.
- **Test Gereksinimi:** Var (affiliate çözümleme testi — TASK-001 ile ortak).
- **Durum:** Devam Ediyor

### TASK-006
- **Görev:** SEO — JSON-LD Article, sitemap (@astrojs/sitemap), canonical, Türkçe slug.
- **Öncelik:** Orta
- **Bağımlılıklar:** TASK-003, TASK-004
- **Etkilenen Dosyalar:** `astro.config.mjs`, `src/components/BaseHead.astro`, `src/pages/posts/[...slug].astro`
- **Tamamlanma Kriteri:** Sitemap üretilir; yazı sayfasında geçerli JSON-LD.
- **Test Gereksinimi:** Yok (build + manuel doğrulama).
- **Durum:** Devam Ediyor

### TASK-007
- **Görev:** 3 örnek yüksek kaliteli yazı + araç dizini örnek verisi (figürler TBD).
- **Öncelik:** Orta
- **Bağımlılıklar:** TASK-002, TASK-004
- **Etkilenen Dosyalar:** `src/content/posts/*.md`, `src/content/tools/*.json`
- **Tamamlanma Kriteri:** 3 yazı `durumu: yayinda`, özgün değer içerir; uydurma figür yok (TBD).
- **Test Gereksinimi:** Yok (içerik).
- **Durum:** Devam Ediyor

### TASK-008 (Faz 2)
- **Görev:** Trend keşif ajanı + `drafts/` skorlama + editöryel onay + cron.
- **Öncelik:** Orta · **Bağımlılıklar:** Faz 1 tamam · **Durum:** Bekliyor

---

## Oturum Günlüğü
> Detaylı oturum devri **`HANDOFF.md`** dosyasındadır (bkz. DECISIONS ADR-004). Burada yalnızca işaret tutulur.

- **2026-06-14:** Proje başlatıldı; dokümantasyon seti + Faz 1 iskelet kuruluyor. Detay → `HANDOFF.md`.
