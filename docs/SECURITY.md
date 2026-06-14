# SECURITY

> Son güncelleme: 2026-06-14

## Gizli Bilgi Yönetimi
- Gizli anahtarlar (API key, token, parola) yalnızca `.env` içinde; `.gitignore` ile dışlanır.
- Koda, log'a veya dokümana ASLA gizli değer yazılmaz (AI ajan kuralı #18).
- İstemciye yalnızca `PUBLIC_` önekli değişkenler sızabilir (Astro kuralı). Hassas değer `PUBLIC_` ile başlatılmaz.
- `.env.example` yalnızca değişken İSİMLERİNİ içerir.

## Web Güvenliği
- Affiliate ve dış linkler: `rel="sponsored nofollow"` + `target="_blank"` ile `rel` içinde `noopener noreferrer`.
- Kullanıcı girdisi (bülten formu): istemci + sağlayıcı tarafında doğrulama; ham girdi DOM'a güvensiz enjekte edilmez.
- Statik site olduğu için sunucu saldırı yüzeyi minimaldir; dinamik endpoint eklenirse input validation + parametreli sorgu zorunlu.

## Bağımlılık Güvenliği
- Yeni paket eklemeden önce gerekçe; minimum bağımlılık.
- Düzenli `npm audit`; kritik açıklar öncelikli.
- GitHub secret scanning / Dependabot (öneri) etkin tutulur.

## İçerik & Yasal
- Affiliate ilişkisi her ilgili yerde görünür ifşa edilir (yasal gereklilik).
- Kişisel veri (bülten e-postası) KVKK/GDPR uyumlu işlenir: açık rıza + gizlilik politikası. Hukuki metin: TBD.

## Olay Müdahalesi
- Sızan anahtar derhal iptal/rotate edilir; geçmiş commit'lerden temizlenir (gerekirse).
- Yıkıcı işlemler (force push, geçmiş temizliği) yalnızca kullanıcı onayıyla.
