import { describe, it, expect } from 'vitest';
import { slugify } from './slug';
import { KATEGORILER, kategoriBySlug, slugByKategori } from './categories';

describe('slugify', () => {
  it('Türkçe karakterleri ASCII karşılıklarına çevirir', () => {
    expect(slugify('İçerik Üretimi')).toBe('icerik-uretimi');
    expect(slugify('Ürün Görseli & Şablon')).toBe('urun-gorseli-sablon');
  });

  it('boşlukları tireye çevirir ve baştaki/sondaki tireleri temizler', () => {
    expect(slugify('  Stok ve Operasyon  ')).toBe('stok-ve-operasyon');
  });

  it('özel karakterleri atar', () => {
    expect(slugify('SEO / Reklam!?')).toBe('seo-reklam');
  });
});

describe('categories', () => {
  it('her kategori için ad↔slug çift yönlü çözümlenir', () => {
    for (const k of KATEGORILER) {
      expect(kategoriBySlug(k.slug)?.ad).toBe(k.ad);
      expect(slugByKategori(k.ad)).toBe(k.slug);
    }
  });

  it('bilinmeyen slug undefined döner', () => {
    expect(kategoriBySlug('yok-boyle-kategori')).toBeUndefined();
  });
});
