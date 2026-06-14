# TESTING

> Son güncelleme: 2026-06-14

## Strateji
- **Birim testleri (Vitest):** Saf mantık içeren yardımcılar — affiliate link çözümleme, içerik/şema yardımcıları, slug/biçim fonksiyonları.
- **Tip kontrolü:** `astro check` (lint adımının parçası) — içerik şeması ve `.astro` tip güvenliği.
- **Build doğrulaması:** `astro build` — geçersiz frontmatter (zod) build'i durdurur; bu de facto bir içerik testidir.
- **Manuel/görsel:** `npm run dev` ile sayfaların render'ı, SEO etiketleri, affiliate `rel`, sitemap/robots.

## Kalite Kapısı (her commit öncesi)
`npm run build` **ve** `npm run lint` **ve** `npm run test` → üçü birden geçmeli.
(İstisna: TASK-001 tamamlanana kadar kapı askıdaydı; tamamlandıktan sonra istisnasız uygulanır.)

## Test Yazma Kuralları
- Test edilebilir mantık içeren her görev için test yazılır.
- Test gerektirmeyen görevler (saf dokümantasyon, config, görsel/şablon) görevin "Test Gereksinimi" alanında gerekçesiyle belirtilir.
- Geçmeyen test silinmez/skip edilmez; assertion zayıflatılmaz. Önce kodun mu testin mi hatalı olduğu analiz edilir.

## Komutlar
```bash
npm run test          # tek seferlik
npm run test -- --watch   # izleme modu
```

## Faz 1 Kapsamı
- `src/lib/affiliate.ts` çözümleme testi (TASK-001/005).
- İçerik şema doğrulama testi (TASK-002) — geçerli/geçersiz frontmatter senaryoları.

## Gelecek
- Faz 2 ajan skorlama mantığı için birim testleri.
- (Opsiyonel) Playwright ile uçtan uca smoke testleri.
