# AI_AGENT_RULES

> Son güncelleme: 2026-06-14
> Bu projede çalışan tüm AI ajanları aşağıdaki kurallara uyar.

1. Her oturuma `CLAUDE.md` ve `docs/PROJECT_CONTEXT.md` okuyarak başla; ardından `HANDOFF.md`'den (ve `TASKS.md` işaretinden) kaldığın yeri al.
2. Mimariye aykırı işlem yapma; gerekiyorsa önce `DECISIONS.md`'e öneri yaz ve onay al.
3. Büyük kararları `DECISIONS.md`'e yaz (tarih, gerekçe, alternatifler, sonuç).
4. Anlamlı değişiklik sonrası `CHANGELOG.md` güncelle (her küçük düzenlemede değil).
5. Tamamlanan görevleri `TASKS.md`'de işaretle — yalnızca testler geçtikten sonra.
6. Bir görevi bitirmeden yenisine başlama.
7. Teknik borç oluşturma; kaçınılmazsa `TASKS.md`'e "tech-debt" etiketiyle kaydet.
8. Güvenlik standartlarını (`SECURITY.md`) ihlal etme.
9. Gereksiz bağımlılık ekleme; yeni paket öncesi gerekçeyi belirt.
10. Dosya yapısını bozma; yeni klasör gerekiyorsa `ARCHITECTURE.md`'i güncelle.
11. Her işlem sonunda kısa ilerleme raporu ver (yapılan, kalan, sonraki adım).
12. Hata oluşursa kök neden analizi yap; semptomu değil nedeni düzelt.
13. **Takılma kuralı:** Aynı hatada 3 denemeden fazlasını yapma. Dur, denenenleri ve kök neden hipotezini raporla, yön iste.
14. Varsayımları açıkça dokümante et (`PROJECT_CONTEXT.md` → Varsayımlar).
15. Yeni özellik öncesi kapsam kontrolü; kapsam dışıysa "Gelecek Özellikler"e yaz.
16. Yıkıcı işlemler (silme, sıfırlama, migration, force push) için önce kullanıcı onayı al.
17. Mevcut çalışan kodu, görevle ilgisi yoksa yeniden yazma (gereksiz refactor yapma).
18. Gizli bilgileri (API key, şifre, token) asla koda, log'a veya dokümana yazma.
19. **Oturum devri:** Her oturum sonunda `HANDOFF.md`'e tarihli kısa kayıt ekle (ne tamamlandı, ne yarım kaldı, sonraki adım). Yalnızca son 5 oturum detaylı; daha eski kayıtlar tek paragraflık "Geçmiş Özeti"ne sıkıştırılır.

## Projeye Özel Ek Kurallar
- **Otomatik yayın YASAK.** İçerik önce `durumu: taslak`; yalnızca insan onayıyla `yayinda`. Ajan ASLA doğrudan `src/content/posts/`'a yayınlamaz; yalnızca `drafts/`'a yazar.
- **Bilgi dürüstlüğü:** Fiyat/komisyon/özellik gibi doğrulanmamış değer uydurma → `TBD`.
- Affiliate linkleri yalnızca `affiliate.config.ts` üzerinden, `rel="sponsored nofollow"` + görünür ifşa ile.
- Anahtar kelime başına tek kanonik yazı; ince/çakışan içerik üretme.
