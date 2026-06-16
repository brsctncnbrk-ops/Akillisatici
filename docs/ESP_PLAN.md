# ESP_PLAN — Profesyonel E-posta Altyapısı ve Welcome Serisi Planı

> Durum: **Plan (kullanıcı kararı bekliyor)** · Oluşturulma: 2026-06-16
> Mevcut altyapı: Google Sheets + Apps Script (çift onaylı). Çalışıyor ama ölçeklenince
> teslim edilebilirlik (deliverability), otomasyon ve İYS uyumu sınırlı kalır.

## 1. Neden geçiş?

Mevcut Apps Script akışı kayıt toplar, ama:
- **Teslim edilebilirlik:** Gmail'den toplu gönderim spam'e düşme riski taşır; SPF/DKIM/DMARC ve
  ısınmış (warmed-up) gönderim IP'si yok.
- **Otomasyon yok:** Welcome (hoş geldin) serisi, segmentasyon, tetiklenen e-posta yok.
- **İYS/ticari ileti:** 6563 sayılı kanun kapsamında ticari ileti gönderiyorsan onay kanıtı +
  abonelikten çıkma + (gerekiyorsa) İYS entegrasyonu gerekir; profesyonel ESP bunu kolaylaştırır.

## 2. Seçenekler

| ESP | Ücretsiz katman | Artılar | Eksiler |
|-----|-----------------|---------|---------|
| **Brevo** (önerilen) | ~300 e-posta/gün, sınırsız kişi | Türkiye'de yaygın, çift onay + otomasyon ücretsiz katmanda, SMTP+API, KVKK uyumlu AB barındırma | Günlük gönderim limiti |
| Mailchimp | ~500 kişi / 1.000 gönderim | Olgun otomasyon, geniş entegrasyon | Ücretsiz katman kısıtlı, görece pahalı, AB dışı |
| MailerLite | ~1.000 kişi / 12.000 gönderim/ay | Sade arayüz, cömert ücretsiz katman | Otomasyon ücretsizde sınırlı |
| Devam: Google Sheets | — | Sıfır maliyet, kurulu | Welcome serisi/teslimat yok |

**Öneri: Brevo** — ücretsiz katmanda çift onay + welcome otomasyonu + AB barındırma (KVKK/GDPR
açısından avantaj). Hacim büyüyene kadar maliyetsiz.

## 3. Welcome (hoş geldin) serisi taslağı

Çift onay (doğrulama) tamamlandıktan sonra tetiklenir:

1. **E-posta 1 — anında:** Hoş geldin + lead magnet teslimi (AI Araç Seçim Kontrol Listesi linki/PDF).
   Beklenti: "haftada ~1 e-posta, yalnızca işine yarayan araç ve rehberler."
2. **E-posta 2 — +2 gün:** En çok okunan 3 rehbere kürasyon (ürün açıklaması, görsel, müşteri desteği).
3. **E-posta 3 — +5 gün:** Metodoloji + "araçları nasıl test ediyoruz" → güven inşası, araç dizinine yönlendirme.
4. **E-posta 4 — +9 gün:** Tek bir pratik kazanç (ör. ChatGPT prompt şablonu) + geri bildirim sorusu (yanıt = etkileşim sinyali).

Her e-postada: görünür **abonelikten çık** linki + gönderen kimliği (ticari ileti gerekliliği).

## 4. Teknik entegrasyon (Brevo seçilirse)

Kod tarafı zaten hazır — `NewsletterSignup.astro` uç noktayı `PUBLIC_NEWSLETTER_ENDPOINT`
ortam değişkeninden okur. Geçiş adımları:

1. Brevo hesabı aç; gönderen alan adını doğrula (SPF/DKIM/DMARC kayıtları DNS'e eklenir).
2. Çift onay (double opt-in) formu/otomasyonu kur; onay sayfası + teşekkür sayfası tanımla.
3. **Tercih A (kolay):** Brevo'nun kendi form `action` URL'ini `PUBLIC_NEWSLETTER_ENDPOINT`
   olarak ayarla → kod değişmeden çalışır (alan adları `email`, `consent`, `source` eşlenir).
   **Tercih B (esnek):** Küçük bir Vercel serverless route (`api/subscribe.ts`) yaz → Brevo
   API'sine `BREVO_API_KEY` (gizli, env) ile kayıt at; CORS'u kendin yönet, hata mesajını kullanıcıya göster.
4. Welcome serisini Brevo "Automation" ile kur (yukarıdaki 4 e-posta).
5. Lead magnet'i E-posta 1'e ekle; site içi anında erişim (mevcut başarı düğmesi) korunur.
6. İYS: ticari ileti hacmi başlayınca İYS kaydı + onay kayıtlarının saklanması; `site.ts`
   `IYS_KAYITLI = true` yapılır (footer notu otomatik çıkar).

## 5. Karar gereken noktalar (kullanıcı)

- [ ] ESP seçimi: **Brevo** (öneri) / Mailchimp / MailerLite / şimdilik Google Sheets'te kal.
- [ ] Gönderen alan adı (ör. `bulten@saticikutusu.com`) + DNS erişimi.
- [ ] Entegrasyon tercihi: A (Brevo formu) / B (serverless route + API anahtarı).

> Bu plan onaylanınca kod entegrasyonu (Tercih A veya B) ve welcome serisi içerikleri ayrı bir
> adımda uygulanır. Şu ana kadar yapılan lead magnet altyapısı ESP'den bağımsız çalışır.
