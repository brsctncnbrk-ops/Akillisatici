# Telegram Günlük Trafik Raporu

> Son güncelleme: 2026-06-16

Trend keşif ajanıyla **aynı Telegram botu** her sabah dünün site trafiğini özetleyip
sana mesaj atar. Veri kaynağı: **Google Analytics 4** (sitede zaten kurulu — `G-7TYLWS8G6S`).

- Script: `scripts/notify-traffic.ts` (`npm run agent:traffic`)
- Zamanlama: `.github/workflows/daily-traffic.yml` — her gün **~04:19 UTC ≈ 07:19 TR** + elle tetik
  (saat başından kasıtlı kaçınıldı: GitHub'ın zamanlanmış işleri saat başı yoğunlukta gecikir/atlanır)
- Ek bağımlılık yok: GA4 Data API çağrısı `node:crypto` ile imzalanan service-account JWT akışı kullanır.

## Rapor içeriği

- 👥 Ziyaretçi, 🔁 Oturum, 👁 Sayfa görüntüleme (dün)
- Her metrik için önceki güne göre yüzde değişim (🔺/🔻/➖)
- 🔝 En çok okunan ilk 3 sayfa

## Kurulum (tek seferlik — senin yapman gereken)

GA4 Data API service account ile okunur. `G-7TYLWS8G6S` ölçüm kimliği **değil**,
sayısal **property ID** ve bir **service account** gerekir.

1. **Property ID'yi al:** analytics.google.com → Admin (⚙️) → Property Settings →
   "Property ID" (ör. `123456789`).
2. **Service account oluştur:** [Google Cloud Console](https://console.cloud.google.com/) →
   bir proje seç/oluştur → "APIs & Services" → **Google Analytics Data API**'yi etkinleştir →
   "IAM & Admin → Service Accounts" → **Create service account** → oluştuktan sonra
   "Keys → Add key → JSON" ile anahtar JSON'unu indir.
3. **Service account'a GA erişimi ver:** GA Admin → Property → **Property Access Management** →
   service account e-postasını (`...@...iam.gserviceaccount.com`) **Görüntüleyici (Viewer)**
   rolüyle ekle.
4. **GitHub secret'larını ekle:** Repo → Settings → Secrets and variables → Actions:
   - `GA4_PROPERTY_ID` → adım 1'deki sayı
   - `GA_SERVICE_ACCOUNT_JSON` → adım 2'de inen JSON dosyasının **tam içeriği**
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` → trend ajanı için zaten ekliyse tekrar gerekmez
5. **Test et:** Actions → "Günlük Trafik Raporu" → **Run workflow** (workflow_dispatch).
   Telegram'a rapor düşmeli. Düşmezse Actions loglarına bak (eksik secret nazikçe atlanır,
   hata mesajı loglanır).

## Güvenlik notları

- `GA_SERVICE_ACCOUNT_JSON` özel anahtar içerir → **yalnızca** GitHub secret olarak tut,
  asla commit'leme (CLAUDE.md kuralı 5). `.env.example` yalnızca isimleri listeler.
- Service account'a sadece **Viewer** ver — yazma/silme yetkisi gereksiz.
- Workflow `permissions: contents: read` ile çalışır; depoya yazmaz.
