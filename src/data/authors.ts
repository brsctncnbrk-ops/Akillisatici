// Yazar verisi — tek kaynak.
// Hakkında sayfasındaki bilgiyle birebir uyumlu tutulur.
export interface Author {
  ad: string;
  /** 1-2 cümle kısa biyografi (Hakkında'dan türetildi). */
  kisaBio: string;
  /** /hakkinda/ sayfasına link. */
  hakkindaUrl: string;
}

export const AUTHORS: Record<string, Author> = {
  'Barış ÇETİN': {
    ad: 'Barış ÇETİN',
    kisaBio:
      'E-ticaret ve dijital pazarlama alanında 5 yılı aşkın deneyime sahip bağımsız içerik üreticisi. Trendyol, Hepsiburada, Etsy, Shopify ve Amazon gibi pazaryerlerinde aktif satıcı ve danışman olarak çalıştı.',
    hakkindaUrl: '/hakkinda/',
  },
};
