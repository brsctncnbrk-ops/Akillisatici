// Araç verisi — tek kaynak (single source of truth).
// src/content/tools/*.json ile tutarlı tutulur.
// Bilinmeyen alan null; tablolarda "—" gösterilir, asla "TBD" yazılmaz.
export interface ToolData {
  slug: string;
  name: string;
  category: string;
  /** Aylık/yıllık fiyat dizesi. Doğrulanmamışsa null. */
  price: string | null;
  /** Gerçek affiliate yönlendirme URL'i. Yoksa null; officialUrl kullanılır. */
  affiliateUrl: string | null;
  /** Her zaman dolu — araçların resmi adresi. */
  officialUrl: string;
  pros: string[];
  cons: string[];
  /** Bizzat test + karşılaştırma ile doğrulandıysa true. */
  verified: boolean;
}

export const TOOLS: ToolData[] = [
  {
    slug: 'jasper',
    name: 'Jasper',
    category: 'İçerik üretimi',
    price: '$39/ay (yıllık)',
    affiliateUrl: null,
    officialUrl: 'https://www.jasper.ai',
    pros: ['Güçlü marka sesi tanımlama', 'Uzun içerikte tutarlılık', 'Workflow ile toplu üretim'],
    cons: ['Öğrenme eğrisi var', 'Ücretli plan gerekli'],
    verified: false,
  },
  {
    slug: 'copyai',
    name: 'Copy.ai',
    category: 'İçerik üretimi',
    price: 'Ücretsiz plan var; Pro $36/ay (yıllık)',
    affiliateUrl: null,
    officialUrl: 'https://www.copy.ai',
    pros: ['Ücretsiz plan ile başlanabilir', 'Hızlı şablonlar', 'Basit arayüz'],
    cons: ['Uzun/özgün içerikte derinlik sınırı'],
    verified: false,
  },
  {
    slug: 'photoroom',
    name: 'Photoroom',
    category: 'Ürün görseli',
    price: 'Ücretsiz plan var; Pro ~$10/ay',
    affiliateUrl: null,
    officialUrl: 'https://www.photoroom.com',
    pros: ['Hızlı arka plan temizleme', 'Mobil uygulaması mevcut', 'Toplu işleme'],
    cons: ['Ücretsiz planda filigran', 'Çok yaratıcı sahnelerde sınır var'],
    verified: false,
  },
  {
    slug: 'pebblely',
    name: 'Pebblely',
    category: 'Ürün görseli',
    price: '$19/ay',
    affiliateUrl: null,
    officialUrl: 'https://pebblely.com',
    pros: ['Yaratıcı AI sahne üretimi', 'Ürünü farklı ortamlara yerleştirme'],
    cons: ['Ücretsiz plan yok', 'Toplu işleme sınırlı'],
    verified: false,
  },
  {
    slug: 'tidio',
    name: 'Tidio',
    category: 'Müşteri desteği',
    price: 'Ücretsiz plan var; Starter $29/ay',
    affiliateUrl: null,
    officialUrl: 'https://www.tidio.com',
    pros: ['Kendi sitede hızlı kurulan chatbot', 'Hazır yanıt akışları', 'Ücretsiz başlanabilir'],
    cons: ['Pazaryeri panellerine doğrudan bağlanmaz', 'Türkçe dil desteği sınırlı'],
    verified: false,
  },
];

export function getToolBySlug(slug: string): ToolData | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
