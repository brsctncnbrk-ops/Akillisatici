# AUDIT_PLAN — Site Denetimi Sonrası İyileştirme Planı

> Oluşturulma: 2026-06-16 · Durum: **Faz 1-2 tamamlandı ✓ · Faz 3-5 bekliyor**
> Kaynak: harici site denetimi (içerik kanıtı, araç dizini, E-E-A-T, yasal, dönüşüm, SEO).
> Bu plan onaylanınca fazlar tek tek uygulanır; her faz sonunda kalite kapısı (build + lint + test)
> çalıştırılır. **Hiçbir içerik otomatik yayımlanmaz** (CLAUDE.md #3). Eksik veriler `TBD` ile sorulur (CLAUDE.md #6).

---

## 1. Denetim doğrulaması (kod tabanı ile karşılaştırma)

Denetim notlarının bir kısmı bayatlamış; mevcut kodda **zaten çözülmüş**:

- Araç dizini artık **5 değil 15 araç** (ChatGPT, Writesonic, Canva, Semrush, Gorgias, Freshdesk,
  AdCreative, Remove.bg, Shopify Magic, Inventory Planner dahil).
- **FAQ bölümü + FAQPage schema** var (`sss` alanı, `src/pages/posts/[...slug].astro`).
- **Article + BreadcrumbList** schema var; araçlar sayfasında **ItemList + Product** schema var.
- **Site içi arama** var (`/rehberler` — istemci tarafı anlık arama).
- OG + dikey Pinterest görsel üretimi, sosyal paylaşım butonları var.

### Gerçek ve açık eksikler (doğrulandı)

| # | Alan | Durum |
|---|------|-------|
| E1 | Araç **detay/landing sayfaları** | Yok — dizin doğrudan dışa link atıyor |
| E2 | **Review / AggregateRating** schema (editöryel puan) | Yok — şemada puan alanı yok |
| E3 | **Metodoloji** sayfası ("nasıl test/puanlıyoruz") | Yok |
| E4 | **Kullanım Şartları** (Terms) sayfası | Yok |
| E5 | **Çerez onay banner'ı** + ayrı Çerez Politikası | Banner yok; çerez tek paragraf |
| E6 | **Görsel kanıt** (ekran görüntüsü) | `screenshot: null` — hiç render edilmiyor |
| E7 | Yazar **E-E-A-T** (foto, sosyal link, "kadro" vs tekil yazar çelişkisi) | Eksik |
| E8 | Footer **sosyal/marka** + **ticari kimlik** (ünvan/adres) | Yok |
| E9 | **İYS** (6563 sayılı kanun) izi | Yok |
| E10 | Dizinde **arama + sıralama** | Sadece kategori filtresi |
| E11 | **Lead magnet** (checklist karşılığı bülten) | Kuru "kayıt ol" |
| E12 | Karşılaştırma tablolarındaki **"—" boşluklar** | İçerik eksiği |
| E13 | **ESP** (profesyonel e-posta) + welcome serisi | Yok (Google Sheets) |
| E14 | `dateModified` = `publishedTime` (hiç güncelleme görünmüyor) | İçerik/süreç |

---

## 2. Fazlı uygulama planı (öncelik sırası)

### Faz 1 — Güven & yasal omurga · *TAMAMLANDI ✓ (2026-06-16)*
> Eksikler: E3, E4, E5, E8, E9
>
> **Uygulandı:** `/metodoloji`, `/kullanim-sartlari`, `/cerez-politikasi` sayfaları;
> `CookieConsent.astro` onay bandı (BaseLayout, localStorage, flash'sız); footer'a yeni yasal
> linkler + koşullu sosyal/kurumsal kimlik/İYS notu; `site.ts`'e merkezi sabitler (`ISLETME`,
> `SOSYAL`, `IYS_KAYITLI`, `ILETISIM_EPOSTA`); gizlilik→çerez ve hakkında→metodoloji çapraz linkleri.
> Kalite kapısı: build 37 · lint 0 · test 27.
>
> **Kullanıcıdan bekleniyor (site.ts'e doldurulacak):** `ISLETME.unvan/adres/vergi`, `SOSYAL[]`
> hesaplar, `IYS_KAYITLI` (ticari ileti başlayınca). Boşken hiçbiri render edilmez.

1. **Metodoloji sayfası** (`/metodoloji`): araç seçim/test/puanlama kriterleri ve ağırlıkları.
   Footer "Kurumsal" + yazı yazar kutusundan link.
2. **Kullanım Şartları** (`/kullanim-sartlari`) + footer linki.
3. **Çerez Politikası** ayrı sayfa (`/cerez-politikasi`) + **çerez onay banner'ı**
   (`src/components/CookieConsent.astro`; localStorage, JS'siz fallback, reklam çerezleri onaya bağlı).
4. **Footer kurumsal kimlik**: işletme ünvanı/iletişim (`TBD`), İYS/ticari ileti notu, sosyal
   hesaplar. `src/data/site.ts`'e merkezi sosyal + kurumsal sabitler.

### Faz 2 — Araç detay sayfaları + Review schema · *TAMAMLANDI ✓ (2026-06-16)*
> Eksikler: E1, E2, E10
>
> **Uygulandı:** Şemaya opsiyonel alanlar (`puan`, `puanlamaKriterleri[]`, `degerlendirme`,
> `kimlerIcin`, `alternatifler[]`, `sss[]`, `sonGuncelleme`) — hepsi boşken render edilmez, puan
> uydurulmaz. `/araclar/[slug]` detay sayfası (artı/eksi, fiyat, kimler için, kriter çubukları,
> SSS, alternatifler, "hakkında yazılarımız", çift CTA + ifşa). JSON-LD: Product (+ puan varsa
> editöryel **Review**) + BreadcrumbList (+ SSS varsa FAQPage). ToolCard + dizin + yazı içi araç
> kutuları artık iç detay sayfasına yönlendiriyor (affiliate detayda toplandı). Dizine **arama +
> sıralama** (önerilen/ad/puan) eklendi; kategori filtresi korundu. Alternatifler boşsa aynı
> kategoriden otomatik (3 araç). Kalite kapısı: **build 52 (+15) · lint 0 · test 27**.
>
> **Not:** `puan` ve editöryel Review yapısal verisi, GERÇEK test sonucu girilince devreye girer
> (uydurma yasak — CLAUDE.md #6). Altyapı hazır; puanlar araç JSON'larına eklenince yıldız + Review
> snippet otomatik çıkar.

5. `src/content.config.ts` tools şemasına alan ekle: `puan`, `puanlamaKriterleri[]`,
   `alternatifler[]`, `kimlerIcin`, `sss[]`, `sonGuncelleme`.
6. **`/araclar/[slug]`** dinamik detay sayfası: artı/eksi, fiyat, "kimler için", alternatifler,
   ilgili yazılar, affiliate CTA + **Review/Product/AggregateRating + Breadcrumb JSON-LD**.
7. ToolCard/dizin → dış link yerine **iç detay sayfasına** yönlendir (affiliate detaydan çıkar).
8. Dizine **arama + sıralama** (ad/kategori/puan) — `/rehberler` desenini yeniden kullan.

### Faz 3 — İçerik kanıtı & kalite · *"gerçek test" iddiasını destekle*
> Eksikler: E6, E12, ayrıca iç linkleme

9. Karşılaştırma tablolarındaki **"—" boşlukları doldur** (gözlem yoksa "test edilmedi" + neden;
   uydurma yok).
10. **Görsel kanıt iş akışı**: `screenshot` alanını detay sayfası + ilgili yazıda render et;
    alt-metin + "kendi testimizden" etiketi. Gerçek ekran görüntüleri kullanıcıdan gelir.
11. **İç linkleme**: pillar/cluster — pillar yazısından kümelere, kümelerden pillar'a geri link.

### Faz 4 — Dönüşüm altyapısı
> Eksikler: E11, E13

12. **Lead magnet**: ücretsiz checklist/rehber (örn. "E-ticaret AI Araçları Seçim Kontrol Listesi")
    karşılığı bülten; `NewsletterSignup` varyantı.
13. (Karar gerektirir) Profesyonel **ESP** (Brevo/Mailchimp) entegrasyon planı + welcome serisi;
    mevcut Google Sheets üstüne köprü.

### Faz 5 — E-E-A-T ince ayar
> Eksikler: E7, E14

14. Yazar: gerçek foto (`authors.ts`'e `foto` + sosyal alanlar), "yazar kadromuz" → tekil yazara
    uygun dil, yazar arşiv sayfası.
15. `dateModified` stratejisi: gerçekten güncellenen yazılarda `guncellenme` işlenir; toplu
    aynı-gün sinyali zamanla azaltılır.

---

## 3. Kullanıcıdan gerekecek veriler (uydurulmaz — `TBD`)

- İşletme ünvanı / adresi (footer + iletişim).
- Sosyal medya hesapları (footer + yazar).
- İYS kaydı durumu (ticari ileti yükümlülüğü).
- ESP tercihi (Brevo / Mailchimp / devam: Google Sheets).
- Gerçek ekran görüntüleri (görsel kanıt).
- Araç editöryel puanları (test sonuçlarına dayalı; uydurma yok).

## 4. Kalite kapısı & dal

- Geliştirme dalı: `claude/review-site-audit-plan-wp26jp`.
- Her faz sonunda: `npm run build`, `npm run lint`, `npm run test` geçmeli.
- İçerik değişiklikleri `durumu: taslak` ile gelir; yayın insan onayından sonra (CLAUDE.md #3).
