// Yazar bilgisi TEK KAYNAĞI (E-E-A-T tutarlılığı).
// Hem "Hakkında" sayfası hem de her yazının altındaki yazar kutusu buradan beslenir.
// Yeni bir yazar eklendiğinde yalnızca bu dosya güncellenir.

export interface Author {
  /** URL/eşleştirme için kısa kimlik (kebab-case). */
  id: string;
  /** Görünen tam ad. Yazı frontmatter'ındaki `yazar` alanı ile birebir eşleşir. */
  name: string;
  /** Kısa rol/uzmanlık ifadesi. */
  rol: string;
  /** Yazı altı kutusu için 1-2 cümlelik kısa biyografi. */
  kisaBio: string;
  /** "Hakkında" sayfası için tam biyografi (paragraf paragraf). */
  tamBio: string[];
  /** İletişim e-postası. */
  email: string;
  /** Yazarın profil/arşiv sayfasına giden yol. */
  hakkindaYolu: string;
  /** Yazar fotoğrafı yolu (public altında, ör. /authors/baris-cetin.jpg). Boşsa baş harf avatarı kullanılır. */
  foto?: string;
  /** Yazarın doğrulanabilir sosyal/profesyonel profilleri (E-E-A-T sameAs). Boşsa render edilmez. */
  sosyal?: { ad: string; url: string }[];
}

export const YAZARLAR: Record<string, Author> = {
  'baris-cetin': {
    id: 'baris-cetin',
    name: 'Barış ÇETİN',
    rol: 'E-ticaret ve dijital pazarlama içerik üreticisi',
    kisaBio:
      "Barış ÇETİN, e-ticaret ve dijital pazarlama alanında 5 yılı aşkın deneyime sahip bağımsız bir içerik üreticisi; Trendyol, Hepsiburada, Etsy, Shopify ve Amazon'da hem satıcı hem danışman olarak çalıştı.",
    tamBio: [
      "Barış ÇETİN, e-ticaret ve dijital pazarlama alanında 5 yılı aşkın deneyime sahip bağımsız bir içerik üreticisi ve araştırmacısıdır. Trendyol, Hepsiburada, Etsy, Shopify ve Amazon gibi önde gelen pazaryerlerinde hem aktif satıcı hem de danışman olarak çalışmıştır.",
      'Bu pratik deneyimi sayesinde Barış, online satıcıların günlük iş akışlarında karşılaştığı sorunları birinci elden bilmektedir: ürün açıklaması yazmak, müşteri sorularını yanıtlamak, ürün fotoğraflarını hazırlamak ve reklam metni üretmek. Satıcı Kutusu’nda paylaştığı içerikler, bu süreçleri hızlandırmak ve kalitesini artırmak için test ettiği yapay zeka araçlarının gerçek değerlendirmelerine dayanır.',
      "Satıcı Kutusu’nu, Türkiye’deki online satıcıların yapay zeka araçlarına güvenilir, bağımsız ve Türkiye pazarına özel bir kaynaktan ulaşabilmesi için kurdu. Sitedeki hiçbir bilgi doğrulanmadan yayımlanmaz; araç incelemeleri bizzat test ve karşılaştırmaya dayalıdır.",
    ],
    email: 'info@saticikutusu.com',
    hakkindaYolu: '/yazar/baris-cetin/',
    // Gerçek foto/sosyal eklenince doldurulur; boşken baş harf avatarı + foto/sosyal bölümü gizli.
    foto: '',
    sosyal: [],
  },
};

// Frontmatter eşleşmesi bulunamazsa kullanılacak varsayılan yazar.
export const VARSAYILAN_YAZAR: Author = YAZARLAR['baris-cetin'];

// Görünen ada göre yazarı döner; eşleşme yoksa varsayılana düşer.
export function getAuthorByName(name: string): Author {
  return Object.values(YAZARLAR).find((a) => a.name === name) ?? VARSAYILAN_YAZAR;
}
