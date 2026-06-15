# DISTRIBUTION_KIT — Dağıtım Kiti (ilk ziyaretçiyi "tohumlama")

> Son güncelleme: 2026-06-15
> Amaç: Yeni yayınlanan her yazı için **kopyala-yapıştır**, değer-önce paylaşım metinleri.
> SEO meyvesini aylar içinde verir; dağıtım ilk ziyaretçiyi, ilk sinyali ve ilk backlink'i getirir.
> İlke: **Önce değer, sonra link.** Saf tanıtım çoğu toplulukta yasaktır ve markayı yakar.

İlgili: kanal stratejisi `docs/TRAFFIC_PLAYBOOK.md` §5; her yazıda artık site içi
**paylaşım butonları** var (`src/components/ShareButtons.astro`) → okuyucu da dağıtıma katılır.

---

## 0. Altın kurallar (her paylaşımdan önce oku)

1. **Önce değer ver.** Soruyu/sorunu metnin içinde gerçekten çöz; link "daha fazlası" olsun.
2. **Spam yapma.** Aynı linki 5 gruba arka arkaya atma. Gruba önce katıl, birkaç gün katkı ver.
3. **Topluluk kuralını oku.** Çoğu Facebook/Reddit grubunda "self-promo" sınırı var (ör. haftada 1, ya da 9:1 değer:link oranı).
4. **Doğal dil.** Robotik "İşte size harika bir yazı 🚀" yerine kişisel deneyim tonu.
5. **TBD uydurma.** Metinde fiyat/oran/istatistik geçiyorsa yazıdaki gerçek ifadeye sadık kal (CLAUDE.md kuralı 6).
6. **UTM ekle (opsiyonel ama önerilir).** Hangi kanal getiriyor görmek için: `?utm_source=pinterest&utm_medium=social`.

---

## 1. Kanal kısa kılavuzu

| Kanal                          | Güç                                        | İlk aksiyon                       | Ritim                         |
| ------------------------------ | ------------------------------------------ | --------------------------------- | ----------------------------- |
| **Pinterest**                  | TR e-ticaret görsel arama; uzun ömürlü pin | İşletme hesabı + alan adı doğrula | Her yazı → 1-2 pin            |
| **WhatsApp/Telegram grupları** | TR'de en yüksek erişim                     | İlgili satıcı gruplarına gir      | Sorular geldikçe yanıt + link |
| **Facebook grupları**          | Niş satıcı toplulukları                    | 3-4 gruba katıl, önce katkı       | Haftada 1, değerle            |
| **Reddit**                     | Backlink + nitelikli trafik                | r/girisimcilik, r/eticaret        | Soruya tam cevap + kaynak     |
| **LinkedIn**                   | B2B/SaaS satıcı kitlesi                    | Kişisel profil "ipucu" gönderisi  | Haftada 1-2                   |
| **Ekşi/forum**                 | Long-tail + otorite                        | İlgili başlıklara doğal katkı     | Bağlam çıktıkça               |

### Pinterest panoları (öneri)

`Etsy satıcı ipuçları` · `Shopify mağaza` · `Trendyol & Hepsiburada satıcı` ·
`E-ticaret yapay zeka` · `Ürün fotoğrafı & görsel` · `Müşteri desteği otomasyonu`

### Facebook/Topluluk araması için anahtarlar

"Etsy Türkiye satıcıları", "Shopify Türkiye", "Trendyol Satıcıları", "Hepsiburada Satıcı",
"E-ihracat", "Dropshipping Türkiye", "Amazon Türkiye satıcı".

---

## 2. Her yazı için tekrar eden iş akışı (kontrol listesi)

Yeni bir yazı `durumu: yayinda` olduğunda:

- [ ] **Pinterest:** dikey pin görseli (`/pin/<slug>.png`, 1000×1500, otomatik üretilir) ile 1 pin. En kolayı: yazı altındaki Pinterest butonu (görsel + açıklama önceden dolu gelir).
- [ ] **LinkedIn:** 2-3 cümlelik ipucu + link.
- [ ] **1-2 ilgili grup/forum:** yalnızca o an konuyla ilgili bir soru/tartışma varsa, değerle.
- [ ] **Telegram/WhatsApp:** kendi listene/uygun gruba kısa not + link.
- [ ] (Opsiyonel) **Reddit:** uygun subreddit'te soru-cevap bağlamı varsa.

> Hız > mükemmellik. Yayın günü en az Pinterest + LinkedIn yapılırsa "tohumlama" tamamdır.

---

## 3. Kopyala-yapıştır şablonlar (kanal bazlı)

`<BAŞLIK>`, `<URL>`, `<TEK_CÜMLE_DEĞER>` yerlerini doldur. URL formatı:
`https://saticikutusu.com/posts/<slug>/`

### Pinterest (pin açıklaması, ~200-400 karakter, hashtag'li)

```
<BAŞLIK>
<TEK_CÜMLE_DEĞER> Adım adım, Türkiye pazarına özel örneklerle.
👉 saticikutusu.com
#eticaret #yapayzeka #etsy #shopify #trendyol #onlinesatış
```

### LinkedIn (kişisel, ipucu önce)

```
Online satış yapanların çoğu <SORUN> ile çok vakit kaybediyor.

Denediğim yaklaşım: <TEK_CÜMLE_DEĞER>

Hangi aracın hangi işe yaradığını, artı/eksilerini ve Türkiye'ye özel
notları derledim 👇
<URL>
```

### Facebook / WhatsApp grubu (yalnızca ilgili bir soruya yanıt olarak)

```
Bunu ben de araştırmıştım. Kısaca: <TEK_CÜMLE_DEĞER>.
Araçları karşılaştırıp artı/eksilerini yazdığım bir derleme var,
işine yarayabilir: <URL>
```

### Reddit (yorum, değer önce — başlık atımı değil)

```
<3-5 cümlelik gerçek, faydalı cevap. Soruyu doğrudan çöz.>

Daha ayrıntılı karşılaştırma derlemiştim, istersen: <URL>
```

### X / Telegram (kısa)

```
<BAŞLIK> — <TEK_CÜMLE_DEĞER>
<URL>
```

---

## 4. Yayındaki ana yazılar için hazır metinler

> Aşağıdaki metinler yazının kendi özetine dayanır; rakam/istatistik uydurulmamıştır.
> URL: `https://saticikutusu.com/posts/<slug>/`

### 🧭 Pillar — E-ticaret İçin Yapay Zeka Araçları: 2026 Yol Haritası

`/posts/e-ticaret-yapay-zeka-araclari-rehberi/`

- **Pinterest:** "E-ticaret için yapay zeka araçları — 2026 yol haritası. Ürün açıklaması, görsel, müşteri desteği, reklam ve stok: hangi araç hangi işe yarar, nereden başlanır? 👉 saticikutusu.com #eticaret #yapayzeka #onlinesatış"
- **LinkedIn:** "Online satışta yapay zekayı nereden kullanmaya başlamalı? Ürün açıklamasından stok yönetimine kadar tüm iş akışını tek bir yol haritasında topladım — hangi araç hangi işe yarar, nereden başlanır: <URL>"
- **Grup (soru gelince):** "Bence önce en çok vakit aldığın işi otomatikleştir. Araçları işe göre derlediğim bir yol haritası var: <URL>"

### Etsy Ürün Açıklamaları İçin AI Araçları

`/posts/etsy-urun-aciklamalari-ai-araclari/`

- **Pinterest:** "Etsy ürün açıklaması yazmak saatler alıyorsa: AI araçlarını gerçek iş akışı, SEO etkisi ve Türkiye pazarı açısından karşılaştırdım. Hangisi gerçekten değer katıyor? 👉 saticikutusu.com #etsy #eticaret #yapayzeka"
- **LinkedIn:** "Etsy satıcıları için ürün açıklaması yazan AI araçlarını karşılaştırdım: hangisi SEO'ya gerçekten yardım ediyor, hangisi sadece dolgu üretiyor? Artı/eksi + pratik kullanım: <URL>"

### Shopify İçin AI Ürün Fotoğrafı Araçları

`/posts/shopify-urun-fotografi-ai-araclari/`

- **Pinterest:** "Stüdyo olmadan profesyonel ürün fotoğrafı: Shopify için arka plan temizleme ve sahne oluşturan AI araçlarını kalite, toplu işleme ve fiyat açısından karşılaştırdım. 👉 saticikutusu.com #shopify #ürünfotoğrafı #yapayzeka"
- **LinkedIn:** "Ürün fotoğrafı için stüdyo şart değil. Shopify satıcıları için AI görsel araçlarını (arka plan, sahne, toplu işleme) karşılaştırdım: <URL>"

### Trendyol'da Tıklanan Ürün Başlığı Nasıl Yazılır?

`/posts/trendyol-urun-basligi-ai/`

- **Pinterest:** "Trendyol'da sıralamanı artıran ürün başlığı nasıl yazılır? Algoritmaya uygun, tıklanan başlıklar için AI'dan pratik şekilde yararlanma rehberi. 👉 saticikutusu.com #trendyol #eticaret #seo"
- **Grup (soru gelince):** "Başlıkta arama yapılan kelimeyi öne almak çok işe yarıyor. AI ile pratik bir yöntem yazmıştım: <URL>"

### Canva AI ile Ürün Afişi ve Sosyal Medya Görseli

`/posts/canva-ai-urun-afisi/`

- **Pinterest:** "Canva'nın AI araçlarıyla (Magic Design, Background Remover) pazaryeri ve sosyal medya için profesyonel ürün görseli hazırlama rehberi. 👉 saticikutusu.com #canva #ürüngörseli #eticaret"
- **LinkedIn:** "Tasarımcı olmadan ürün afişi: Canva'nın AI araçlarıyla pazaryeri ve sosyal medya görseli üretme adımları: <URL>"

### Trendyol & Hepsiburada İçin AI Müşteri Desteği

`/posts/trendyol-hepsiburada-ai-musteri-destegi/`

- **Pinterest:** "Pazaryeri müşteri sorusu yağmurunu AI ile yönetmek: chatbot ve yanıt asistanı araçlarını performans, dil ve entegrasyon açısından karşılaştırdım. 👉 saticikutusu.com #trendyol #hepsiburada #müşteridesteği"
- **Grup (soru gelince):** "Soru yükünü azaltmak için yanıt asistanı + sık sorulanları otomatikleştirmek çok işe yaradı. Araçları karşılaştırdığım yazı: <URL>"

---

## 5. Haftalık ritim (15-20 dk)

- **Pazartesi:** Geçen hafta yayınlanan yazı(lar) için Pinterest + LinkedIn.
- **Çarşamba:** 1-2 grupta/forumda gerçek bir soruya değerle yanıt (+ uygunsa link).
- **Cuma:** GSC Performans raporu → tıklanan sorgulara not al (yeni içerik fikri).
- **Aylık:** En çok trafik getiren 2 kanala yüklen; getirmeyeni bırak.

---

_Bu kit yaşayan belgedir. Yeni yazı yayınlandıkça §4'e ekle; çalışan kanalı büyüt._
