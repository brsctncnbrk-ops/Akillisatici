// Yazı kapağı renk paleti. Hem görünür kapak bannerı (PostCover.astro) hem de
// otomatik üretilen OG görseli (/og/[slug].png) buradan beslenir; böylece
// sayfadaki kapak ile sosyal paylaşım görseli görsel olarak tutarlı kalır.

export interface KapakRenk {
  /** Vurgu rengi (rozet, marka işareti, dekoratif motif). */
  accent: string;
  /** Degrade başlangıç rengi. */
  from: string;
  /** Degrade bitiş rengi (ink zeminine yaklaşır). */
  to: string;
}

// Kategoriye göre palet; ink (#0f172a) zemine doğru koyulaşan degrade + vurgu.
const RENKLER: Record<string, KapakRenk> = {
  'İçerik üretimi': { accent: '#60a5fa', from: '#1e3a8a', to: '#0f172a' },
  'Ürün görseli': { accent: '#c084fc', from: '#5b21b6', to: '#0f172a' },
  'Müşteri desteği': { accent: '#34d399', from: '#065f46', to: '#0f172a' },
  'SEO & reklam': { accent: '#fb923c', from: '#9a3412', to: '#0f172a' },
  'Stok & operasyon': { accent: '#22d3ee', from: '#155e75', to: '#0f172a' },
};

// Kategori eşleşmezse marka turuncusuyla nötr degrade.
const VARSAYILAN: KapakRenk = { accent: '#fb923c', from: '#1e293b', to: '#0f172a' };

export function kapakRenk(kategori: string): KapakRenk {
  return RENKLER[kategori] ?? VARSAYILAN;
}
