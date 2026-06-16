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

// Kategoriye göre palet; canlı renk → koyu ton (siyaha gitmiyor → thumbnail'de ayırt edilebilir).
const RENKLER: Record<string, KapakRenk> = {
  'İçerik üretimi': { accent: '#93c5fd', from: '#1d4ed8', to: '#1e3a8a' },
  'Ürün görseli': { accent: '#c4b5fd', from: '#6d28d9', to: '#3b0764' },
  'Müşteri desteği': { accent: '#6ee7b7', from: '#059669', to: '#064e3b' },
  'SEO & reklam': { accent: '#fdba74', from: '#ea580c', to: '#7c2d12' },
  'Stok & operasyon': { accent: '#67e8f9', from: '#0891b2', to: '#164e63' },
};

// Kategori eşleşmezse marka turuncusuyla canlı degrade.
const VARSAYILAN: KapakRenk = { accent: '#fdba74', from: '#ea580c', to: '#7c2d12' };

export function kapakRenk(kategori: string): KapakRenk {
  return RENKLER[kategori] ?? VARSAYILAN;
}
