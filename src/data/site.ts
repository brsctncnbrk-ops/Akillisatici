// Site geneli sabitler (marka adı, varsayılan görsel vb.) tek kaynaktan.

export const MARKA_ADI = 'Satıcı Kutusu';

// Sayfaya özel görsel yoksa kullanılacak varsayılan OG görseli (public/ altında).
// 1200×630 PNG; sosyal platformlarda (Facebook, X, LinkedIn, WhatsApp) önizleme kartı olarak çıkar.
export const VARSAYILAN_OG_GORSEL = '/og-default.png';

// Kanonik site URL'i (IndexNow ve diğer scriptlerin tek kaynağı; astro.config `site` ile aynı).
export const SITE_URL = 'https://saticikutusu.com';

// IndexNow anahtarı: Bing/Yandex'e anında indeksleme bildirimi için.
// Doğrulama dosyası public/<key>.txt aynı değeri içerir. Gizli DEĞİLDİR (herkese açık).
export const INDEXNOW_KEY = 'cc0e070a8878e76f2d4932cdb0e7445d';

// Google Search Console doğrulama kodu (meta etiketi yöntemi).
// Search Console → Mülk ekle → HTML etiketi → content="..." değerini buraya yapıştır.
// Boş bırakılırsa etiket render EDİLMEZ. (DNS doğrulaması tercih edenler bunu boş bırakabilir.)
export const GOOGLE_SITE_VERIFICATION = '';
