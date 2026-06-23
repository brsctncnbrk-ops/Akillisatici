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

// Microsoft Clarity proje kimliği (clarity.microsoft.com → Proje oluştur → Proje ID).
// Isı haritası ve seans kaydı için. Boş bırakılırsa script render EDİLMEZ.
export const CLARITY_PROJECT_ID = '';

// Pinterest alan adı doğrulama kodu (meta etiketi yöntemi).
// Pinterest → Ayarlar → Claim → Website → "Add HTML tag" → content="..." değerini buraya yapıştır.
// Doğrulandıktan sonra pinlerde marka adı + analitik açılır. Boş bırakılırsa etiket render EDİLMEZ.
export const PINTEREST_DOMAIN_VERIFY = '81b9a8ac86d547a7203c781b673b1b1c';

// İletişim e-postası (footer + yasal sayfalar tek kaynağı).
export const ILETISIM_EPOSTA = 'info@saticikutusu.com';

// Kurumsal/ticari kimlik. TÜRKİYE: ticari ileti ve şeffaflık için işletme bilgisi.
// Değer BOŞ ('') bırakılırsa ilgili satır footer'da RENDER EDİLMEZ (uydurma yok — CLAUDE.md #6).
// Gerçek değerler kullanıcıdan alınınca doldurulur.
export const ISLETME = {
  /** Tam ticari ünvan (ör. "Ad Soyad" şahıs ya da şirket ünvanı). TBD. */
  unvan: '',
  /** Açık adres. TBD. */
  adres: '',
  /** Vergi dairesi / no veya MERSİS (varsa). TBD. */
  vergi: '',
};

// İYS (İleti Yönetim Sistemi, 6563 sayılı kanun) kaydı durumu.
// Ticari e-posta gönderimi başlayacaksa true yapılır; footer'da bilgilendirme notu çıkar.
export const IYS_KAYITLI = false;

// Sosyal medya hesapları. Boş dizi → footer'da sosyal bölüm render EDİLMEZ.
// Örnek: [{ ad: 'X', url: 'https://x.com/...' }, { ad: 'Instagram', url: '...' }]
export const SOSYAL: { ad: string; url: string }[] = [];

// Pillar (hub) rehber yazısı — küme yazılarından buraya geri link verilir (iç linkleme/SEO).
// `id`, yazının dosya adı slug'ıdır. Bu yazının kendisinde callout gösterilmez.
export const PILLAR_REHBER = {
  id: 'e-ticaret-yapay-zeka-araclari-rehberi',
  baslik: 'E-ticaret İçin Yapay Zeka Araçları: Online Satıcının 2026 Yol Haritası',
};
