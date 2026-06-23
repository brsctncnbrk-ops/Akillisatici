// Site genelinde kullanılan kategoriler. `ad` içerik şemasındaki enum ile birebir,
// `slug` ise kategori sayfası URL'leri için kullanılır.
export interface Kategori {
  ad: string;
  slug: string;
}

export const KATEGORILER: readonly Kategori[] = [
  { ad: 'İçerik üretimi', slug: 'icerik-uretimi' },
  { ad: 'Ürün görseli', slug: 'urun-gorseli' },
  { ad: 'Müşteri desteği', slug: 'musteri-destegi' },
  { ad: 'SEO & reklam', slug: 'seo-reklam' },
  { ad: 'Stok & operasyon', slug: 'stok-operasyon' },
  { ad: 'Pazaryeri rehberleri', slug: 'pazaryeri-rehberleri' },
] as const;

// İçerik şemasında `z.enum(...)` için kategori adları dizisi.
export const KATEGORI_ADLARI = KATEGORILER.map((k) => k.ad) as [string, ...string[]];

export function kategoriBySlug(slug: string): Kategori | undefined {
  return KATEGORILER.find((k) => k.slug === slug);
}

export function slugByKategori(ad: string): string | undefined {
  return KATEGORILER.find((k) => k.ad === ad)?.slug;
}
