# CONTENT_EVIDENCE — İçerik Kanıtı ve "Gerçek Test" İş Akışı

> Amaç: "bizzat test ve karşılaştırmaya dayalı" iddiasını **görünür kanıtla** desteklemek
> (E-E-A-T). Bu doküman, ekran görüntüsü ve test kanıtı ekleme kurallarını tanımlar.
> Kural: **uydurma yok** (CLAUDE.md #6). Yalnızca gerçekten yapılan test belgelenir.

---

## 1. Karşılaştırma tablosu etiket konvansiyonu

Tablolarda boş hücre için belirsiz `—` KULLANILMAZ. Bunun yerine:

- **`Test edilmedi`** — Bu aracı, ilgili boyutta (ör. Türkçe çıktı kalitesi) **bizzat denemedik.**
- **`Doğrulanmadı`** — Fiyat/özellik/komisyon gibi bir olgu **resmi kaynaktan henüz teyit edilmedi.**

Her tablonun altına kısa bir **"Tablo notu"** eklenir ve bu iki etiket açıklanır. Bir hücreye gerçek
bir gözlem/değer girilince etiket onunla değiştirilir (ör. `Test edilmedi` → `İyi (Türkçe metinde güçlü)`).
Gözlem, yazının test senaryosuna dayanmalıdır; gövdedeki iddiayla tablo çelişmemelidir.

## 2. Araç ekran görüntüsü ekleme (araç detay sayfası)

Araç detay sayfası (`/araclar/<slug>`) `screenshot` alanı doluysa otomatik olarak görseli,
**"Kendi testimizden"** rozeti ve alt yazısıyla render eder. Boşken hiçbir şey gösterilmez.

Adımlar:
1. Görseli `public/screenshots/` altına koy: `public/screenshots/<arac-slug>.png`
   (ör. `public/screenshots/jasper.png`). Tercihen genişlik ≤ 1600px, sıkıştırılmış.
2. İlgili araç JSON'ında (`src/content/tools/<slug>.json`) alanı ayarla:
   ```json
   "screenshot": "/screenshots/jasper.png"
   ```
3. Görsel **gerçek** olmalı: aracın arayüzünden veya senin ürettiğin çıktıdan alınmış olmalı.
   Stok/temsili görsel "kendi testimizden" etiketiyle KULLANILMAZ.
4. Kişisel veri / API anahtarı / fatura bilgisi görselde görünmemeli (kırp veya maskele).

## 3. Yazı içinde görsel kanıt (Markdown)

Yazılar `.md` olduğundan görseller standart Markdown ile eklenir:

```markdown
![Jasper ile üretilen Türkçe ürün açıklaması çıktısı](/screenshots/jasper-tr-cikti.png)
*Kendi testimizden: Jasper'ın ürettiği taslak (16.06.2026).*
```

- **Alt metin** betimleyici olmalı (ekran görüntüsünün ne gösterdiği), anahtar kelime doldurma değil.
- Hemen altına italik bir **alt yazı** + tarih ekle; "Kendi testimizden" ibaresini koru.
- Before/after görsellerinde iki ayrı görsel + tek alt yazı kullan.

## 4. İç linkleme (pillar/cluster)

- **Pillar (hub):** `e-ticaret-yapay-zeka-araclari-rehberi` — her kategoriye ve ana kümelere link verir.
- **Cluster → pillar geri linki:** Pillar dışındaki tüm yazılarda, içerik başında otomatik bir
  callout pillar rehberine geri link verir (`src/pages/posts/[...slug].astro`, `PILLAR_REHBER`).
  Yeni bir hub yazısı eklenirse `src/data/site.ts` içindeki `PILLAR_REHBER` güncellenir.
- Yeni yazı eklerken: ilgili 1–2 kardeş yazıya gövde içinde bağlam linki ver; araç adı geçtiğinde
  `/araclar/<slug>/` detay sayfasına link ver.

## 4b. Güncelleme tarihi (dateModified) stratejisi

- Yeni yazıda `guncellenme` alanı **boş bırakılır** → byline'da "Güncellendi" görünmez ve
  `dateModified` yayın tarihine eşit kalır. Toplu sahte güncelleme tarihi GİRİLMEZ.
- Bir yazıyı **gerçekten** elden geçirdiğinde (fiyat teyidi, yeni araç, düzeltme) `guncellenme`
  alanını o günün tarihine ayarla → byline'da "Güncellendi" + JSON-LD `dateModified` otomatik güncellenir.
- Böylece "güncellendi" sinyali dürüst kalır; arama motorlarına gerçek tazelik bilgisi verilir.

## 5. Kontrol listesi (her inceleme yayını öncesi)

- [ ] Tabloda `—` yok; `Test edilmedi` / `Doğrulanmadı` etiketleri ve "Tablo notu" var.
- [ ] En az bir gerçek ekran görüntüsü/çıktı (varsa) doğru alt metin + "kendi testimizden" ile eklendi.
- [ ] Görselde kişisel/gizli veri yok.
- [ ] Pillar geri linki callout'u görünüyor (pillar yazısı hariç).
- [ ] Araç adları detay sayfasına linkli.
