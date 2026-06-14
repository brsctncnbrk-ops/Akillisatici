// Faz 2 trend keşif ajanının niş yapılandırması.
// Anahtar kelimeler ağırlıklıdır: yüksek ağırlık = nişe daha yakın.
// Tüm değerler küçük harf + Türkçe karaktersiz (skorlamada normalize edilir).

export interface NicheKeyword {
  terim: string;
  agirlik: number;
}

// Online satıcılar için yapay zeka araçları nişi.
export const NICHE_KEYWORDS: readonly NicheKeyword[] = [
  // Platformlar (en güçlü sinyal)
  { terim: 'shopify', agirlik: 5 },
  { terim: 'etsy', agirlik: 5 },
  { terim: 'amazon seller', agirlik: 5 },
  { terim: 'trendyol', agirlik: 5 },
  { terim: 'hepsiburada', agirlik: 5 },
  { terim: 'woocommerce', agirlik: 4 },
  // AI + e-ticaret kesişimi
  { terim: 'ecommerce ai', agirlik: 5 },
  { terim: 'ai tool', agirlik: 3 },
  { terim: 'generative ai', agirlik: 2 },
  { terim: 'chatbot', agirlik: 3 },
  { terim: 'product description', agirlik: 4 },
  { terim: 'product photo', agirlik: 4 },
  { terim: 'product image', agirlik: 4 },
  { terim: 'background removal', agirlik: 3 },
  { terim: 'customer support', agirlik: 3 },
  { terim: 'seo', agirlik: 3 },
  { terim: 'ad copy', agirlik: 3 },
  { terim: 'copywriting', agirlik: 3 },
  { terim: 'dropshipping', agirlik: 3 },
  { terim: 'inventory', agirlik: 2 },
  { terim: 'online store', agirlik: 3 },
  { terim: 'marketplace', agirlik: 2 },
  { terim: 'small business', agirlik: 2 },
];

// Kategori eşlemesi: anahtar kelime → site kategorisi (categories.ts `ad` ile birebir).
// İlk eşleşen kazanır; hiçbiri eşleşmezse varsayılan kullanılır.
export const CATEGORY_HINTS: readonly { anahtarlar: string[]; kategori: string }[] = [
  { anahtarlar: ['photo', 'image', 'background', 'visual', 'gorsel'], kategori: 'Ürün görseli' },
  {
    anahtarlar: ['support', 'chatbot', 'service', 'destek', 'musteri'],
    kategori: 'Müşteri desteği',
  },
  { anahtarlar: ['seo', 'ad', 'ads', 'advertis', 'reklam', 'ranking'], kategori: 'SEO & reklam' },
  {
    anahtarlar: ['inventory', 'stock', 'fulfillment', 'logistic', 'stok', 'operasyon'],
    kategori: 'Stok & operasyon',
  },
];

export const DEFAULT_CATEGORY = 'İçerik üretimi';

// RSS kaynakları. Build Vercel/GitHub Actions tarafında çalışır; bu listeye
// yeni güvenilir kaynaklar eklenebilir. Hepsi AI veya e-ticaret odaklıdır.
export const RSS_SOURCES: readonly string[] = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://venturebeat.com/category/ai/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.feedburner.com/PracticalEcommerce',
];
