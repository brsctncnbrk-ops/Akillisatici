# 📊 Trafik Analiz Raporu — Mayıs/Haziran 2026

> **Dönem:** 24 Mayıs 2026 → 22 Haziran 2026 (30 gün)
> **Kaynak:** GA4 (elle çekilen rapor) · **Hazırlayan:** otomatik analiz · **Tarih:** 2026-06-22

---

## 1. Yönetici Özeti (TL;DR)

Site **mevcut anlamda 14 Haziran'da trafik almaya başladı** — dönemin ilk ~20 günü (24 Mayıs–13 Haziran) neredeyse sıfır. Tüm 465 sayfa görüntülemenin tamamı son 9 güne sıkışmış. İyi haber: ilk kıvılcım var ve içerik sayfaları tıklanıyor. Kötü haber: trafiğin profili hedef kitleyle **uyuşmuyor** ve daha şimdiden **düşüş trendine** girmiş.

**En kritik 3 bulgu:**
1. **Coğrafya uyumsuzluğu** — Türkçe bir blog için ziyaretçilerin %51'i ABD'den (61 kullanıcı), Türkiye yalnızca 9 kullanıcı. Gerçek hedef kitle (Türk e-ticaret satıcıları) trafiğin küçük bir dilimi.
2. **%81 Direct trafik** — UTM etiketi olmayan/izlenemeyen kaynaklar. Organik arama yalnızca %18 (29 oturum). Bot + kendi ziyaretlerin + etiketsiz paylaşımlar bu kovaya düşüyor.
3. **Düşüş trendi** — Zirve 15–16 Haziran (174 + 125 görüntüleme), ardından her gün düşüş; 22 Haziran'da 5 kullanıcı / 5 görüntülemeye kadar indi.

---

## 2. Genel Metrikler

| Metrik | Değer | Yorum |
|---|---:|---|
| 👥 Aktif kullanıcı | 119 | Çok yeni site için beklenen aralıkta |
| 🆕 Yeni kullanıcı | 123 | Aktiften **fazla** → geri dönen ziyaretçi ~0, sadakat yok |
| 🔁 Oturum | 160 | — |
| 👁 Sayfa görüntüleme | 465 | %100'ü son 9 günde |
| 📄 Oturum başına sayfa | **2.9** | Fena değil; homepage'den içeriğe geçiş var |
| 💡 Etkileşim oranı | %27.5 | **Düşük** — oturumların %72.5'i etkileşimsiz (bot/düşük kalite işareti) |
| ⏱ Ort. oturum süresi | 3dk 36sn | Yüzeyde iyi; ama etkileşim oranıyla çelişiyor (birkaç uzun oturum ortalamayı şişiriyor olabilir) |

> ⚠️ **Yeni kullanıcı (123) > Aktif kullanıcı (119)** olması, dönemde geri dönen ziyaretçinin neredeyse hiç olmadığını gösterir. Tekrar gelen okuyucu kazanmak (e-bülten, RSS) öncelikli olmalı.

---

## 3. Günlük Kırılım — "9 Günlük Pencere"

```
14.06  ███               👥 6    🔁 6    👁 31
15.06  ████████████████  👥 12   🔁 22   👁 174   ← zirve (görüntüleme)
16.06  ████████████      👥 26   🔁 37   👁 125   ← zirve (kullanıcı/oturum)
17.06  █████             👥 29   🔁 31   👁 47
18.06  ███               👥 13   🔁 18   👁 30
19.06  █                 👥 7    🔁 9    👁 14
20.06  ██                👥 8    🔁 12   👁 16
21.06  ██                👥 21   🔁 21   👁 23
22.06  ▌                 👥 5    🔁 5    👁 5     ← dip
```

**Okuma:**
- **24 Mayıs–13 Haziran:** kayda değer trafik yok. Demek ki site/içerik bu pencerede yeni indekslendi veya ilk kez paylaşıldı.
- **15–16 Haziran patlaması:** 174 görüntüleme/22 oturum = oturum başına ~8 sayfa. Bu, bir kampanya/paylaşım veya bir tarayıcının (crawler) çok sayfa gezmesiyle uyumlu. Tek seferlik bir olay gibi duruyor — kalıcı değil.
- **17 Haziran'dan itibaren istikrarlı düşüş.** İlk dalga söndü; sürdürülebilir bir akış henüz kurulmamış.

---

## 4. En Çok Görüntülenen Sayfalar

| # | Sayfa | Görüntüleme | Pay |
|---|---|---:|---:|
| 1 | **Satıcı Kutusu (Ana sayfa)** | 250 | **%54** |
| 2 | AI Araçları Dizini | 37 | %8 |
| 3 | Etsy Ürün Açıklamaları İçin En İyi AI Araçları (2026) | 26 | %6 |
| 4 | İçerik üretimi (kategori) | 16 | %3 |
| 5 | AI ile Ürün Görsellerini Yenileme Rehberi | 15 | %3 |
| 6 | Shopify İçin AI Ürün Fotoğrafı Karşılaştırması (2026) | 13 | %3 |
| 7 | Hakkında | 11 | %2 |
| 8 | Ürün görseli (kategori) | 11 | %2 |
| 9 | Müşteri desteği (kategori) | 9 | %2 |
| 10 | E-ticaret İçin Yapay Zeka Araçları Rehberi (2026) | 7 | %2 |

**Okuma:**
- **Ana sayfa tek başına trafiğin yarısından fazlası (%54).** İçerik sayfalarına akış zayıf — huni sızdırıyor. Ana sayfadan yazılara giden iç linkleme güçlendirilmeli.
- En iyi performans gösteren **içerik** yazısı: **Etsy ürün açıklamaları** (26). Bunu, **Görsel Yenileme** (15) ve **Shopify foto karşılaştırması** (13) izliyor. Üçü de "yapılacak iş" (how-to / karşılaştırma) niyetli — niş için doğru damar.
- Uzun kuyruk yazılar (E-ticaret rehberi 7) henüz organikten beslenmiyor.

---

## 5. Trafik Kanalları

| Kanal | Oturum | Pay |
|---|---:|---:|
| Direct | 129 | **%81** |
| Organic Search | 29 | %18 |
| Unassigned | 2 | %1 |

**Okuma:**
- **%81 Direct = en büyük uyarı işareti.** Yeni bir nişte bu kadar yüksek direct genelde şunların karışımıdır: (a) kendi ziyaretlerin, (b) UTM'siz Telegram/WhatsApp/sosyal paylaşım tıklamaları, (c) bot/datacenter trafiği. Gerçek "doğrudan adres yazan" okuyucu bu aşamada çok az olur.
- **Organik arama 29 oturum** — SEO motoru henüz emekleme aşamasında ama **çalışıyor**. Asıl büyütülecek kanal bu.
- Sosyal/Referral neredeyse yok — dağıtım kanalı kurulmamış.

---

## 6. Coğrafya

| Ülke | Kullanıcı | Pay |
|---|---:|---:|
| 🇺🇸 United States | 61 | **%51** |
| 🇳🇱 Netherlands | 10 | %8 |
| 🇹🇷 Türkiye | 9 | %8 |
| 🇫🇷 France | 6 | %5 |
| 🇨🇦 Canada | 5 | %4 |

**Okuma — bu rapordaki en önemli bulgu:**
- Site **Türkçe** ve hedef kitle **Türk online satıcılar**. Ama ziyaretçilerin yarıdan fazlası ABD'den, Türkiye yalnızca **9 kullanıcı**.
- ABD %51 + Hollanda %8 deseni, çoğu zaman **bot / tarayıcı / datacenter** trafiğine işaret eder (Hollanda büyük veri merkezlerinin barındığı tipik bir kaynaktır). Bu, düşük etkileşim oranını (%27.5) ve yüksek Direct payını da açıklar.
- **Sonuç:** Toplam 119 kullanıcının önemli bir kısmı muhtemelen **hedef kitle değil**. Gerçek, niteliklilebilir Türk okuyucu sayısı tek haneli görünüyor.

---

## 7. Yorum: Trafiğin "Kalitesi"

Sinyaller bir arada okunduğunda tablo netleşiyor:

- Düşük etkileşim oranı (%27.5) **+** %81 Direct **+** %51 ABD **+** geri dönen ziyaretçi ~0 → trafiğin **ölçülebilir bir bölümü organik/insan hedef kitle değil** (bot, kendi ziyaretler, etiketsiz paylaşımlar).
- Buna karşılık **29 organik oturum** ve **içerik sayfalarına gelen gerçek tıklar** (Etsy, Görsel, Shopify) → **gerçek ve değerli çekirdek** burada. Küçük ama doğru.

Kısacası: **toplam sayıların peşinden gitme; organik + Türkiye + içerik sayfası üçlüsünü büyüt.** Asıl KPI bu.

---

## 8. Öneriler (Öncelik Sırasına Göre)

### 🔴 Yüksek öncelik
1. **Veriyi temizle / doğrula.** GA4'te (a) bilinen bot filtrelemesini aç, (b) iç trafiği (kendi IP'in) hariç tut, (c) "Türkiye" segmenti oluşturup gerçek hedef kitleyi ayrı izle. Önümüzdeki ay kararları **bu temiz segmentle** ver.
2. **UTM etiketlemesi kur.** Telegram/sosyal/bülten paylaşımlarına UTM ekle ki "Direct" kovası boşalsın ve hangi kanalın çalıştığını gör.
3. **Coğrafi hedefi düzelt.** İçerik dağıtımını Türk e-ticaret topluluklarına (Shopify/Etsy/Trendyol satıcı grupları, ilgili forumlar, LinkedIn TR) yönelt. ABD botu peşinde koşma.

### 🟡 Orta öncelik
4. **İç linkleme.** Ana sayfa görüntülemelerin %54'ü. Ana sayfadan ve kategori sayfalarından öne çıkan 3 yazıya (Etsy, Görsel Yenileme, Shopify foto) belirgin linkler ver — huni sızıntısını kapat.
5. **Kazananları besle.** Etsy / Görsel Yenileme / Shopify foto yazıları tutuyor. Bunların etrafında küme (cluster) içerik üret: "Etsy SEO açıklama şablonları", "Trendyol için ürün görseli", "Hepsiburada açıklama AI" gibi.
6. **SEO'yu büyüt.** 29 organik oturum tek büyütülebilir gerçek kanal. Türkçe anahtar kelime araştırması yap, mevcut yazılara başlık/meta/H2 optimizasyonu uygula.

### 🟢 Düşük öncelik / sürekli
7. **Geri dönen ziyaretçi yakala.** Sadakat ~0. Mevcut `NewsletterSignup` bileşenini öne çıkar; e-bülten ile ikinci ziyareti tetikle.
8. **Zirveyi analiz et.** 15–16 Haziran patlamasının kaynağını bul (hangi referrer/sayfa?). Eğer gerçek bir paylaşımsa tekrarlanabilir; bot ise filtrele.

---

## 9. Bir Sonraki Ay İçin İzlenecek KPI'lar

Toplam sayılar yerine **kalite metriklerini** takip et:

- **Organik oturum** (29 → hedef ↑)
- **Türkiye kullanıcı** (9 → hedef ↑)
- **İçerik sayfası görüntüleme payı** (şu an ana sayfa dışı ~%46 → ↑)
- **Geri dönen kullanıcı oranı** (~%0 → ↑)
- **Etkileşim oranı** (%27.5 → bot temizliği sonrası gerçek değeri ölç)

---

*Not: Bu rapor elle çekilen GA4 özetine dayanır. Günlük kırılım yalnızca 14–22 Haziran arasını içerdiğinden, 24 Mayıs–13 Haziran dönemi "trafik yok" varsayılmıştır. Bot/iç trafik filtrelemesi yapılmadan üretildiği için mutlak sayılar gerçek hedef kitleyi olduğundan yüksek gösterebilir.*
