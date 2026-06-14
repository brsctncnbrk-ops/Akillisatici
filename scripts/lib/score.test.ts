import { describe, it, expect } from 'vitest';
import {
  normalize,
  relevanceScore,
  recencyScore,
  overlapRatio,
  pickCategory,
  rankCandidates,
} from './score';
import type { Candidate, ExistingContent } from './types';

const bos: ExistingContent = { sluglar: [], anahtarKelimeler: [] };
const NOW = new Date('2026-06-14T12:00:00Z');

function aday(over: Partial<Candidate> = {}): Candidate {
  return {
    baslik: 'Test',
    ozet: '',
    link: 'https://x.test/a',
    kaynak: 'https://x.test/feed',
    yayinTarihi: null,
    ...over,
  };
}

describe('normalize', () => {
  it('Türkçe karakterleri sadeleştirir ve gürültüyü temizler', () => {
    expect(normalize('Şahane Ürün & Görsel!')).toBe('sahane urun gorsel');
  });
});

describe('relevanceScore', () => {
  it('niş anahtar kelimeleri ağırlıklı sayar', () => {
    expect(relevanceScore('New Shopify AI tool for product description')).toBeGreaterThan(0);
  });
  it('alakasız metne 0 verir', () => {
    expect(relevanceScore('Local football match results')).toBe(0);
  });
});

describe('recencyScore', () => {
  it('çok yeni içeriğe en yüksek puanı verir', () => {
    expect(recencyScore('2026-06-13T12:00:00Z', NOW)).toBe(5);
  });
  it('eski içeriğe 0 verir', () => {
    expect(recencyScore('2026-01-01T00:00:00Z', NOW)).toBe(0);
  });
  it('tarih yoksa nötr (1) döner', () => {
    expect(recencyScore(null, NOW)).toBe(1);
  });
});

describe('overlapRatio', () => {
  it('mevcut içerikle örtüşmeyi yakalar', () => {
    const existing: ExistingContent = {
      sluglar: ['shopify-urun-fotografi-ai'],
      anahtarKelimeler: ['shopify ürün fotoğrafı ai'],
    };
    expect(overlapRatio('Shopify product fotografi ai guide', existing)).toBeGreaterThan(0);
  });
});

describe('pickCategory', () => {
  it('görsel/foto içeriğini Ürün görseli kategorisine atar', () => {
    expect(pickCategory('AI product photo background removal')).toBe('Ürün görseli');
  });
  it('eşleşme yoksa varsayılan kategoriyi verir', () => {
    expect(pickCategory('Shopify copywriting assistant')).toBe('İçerik üretimi');
  });
});

describe('rankCandidates', () => {
  it('alakasızları eler ve skora göre sıralar', () => {
    const adaylar = [
      aday({ baslik: 'Local weather update', ozet: '' }),
      aday({ baslik: 'New Shopify AI product description tool', yayinTarihi: '2026-06-13T12:00:00Z' }),
      aday({ baslik: 'Etsy seller chatbot for customer support', yayinTarihi: '2026-06-10T12:00:00Z' }),
    ];
    const sirali = rankCandidates(adaylar, bos, NOW);
    expect(sirali.length).toBe(2); // hava durumu elendi
    expect(sirali[0].skor).toBeGreaterThanOrEqual(sirali[1].skor);
  });

  it('aday havuzu içindeki neredeyse aynı başlıkları teker', () => {
    const adaylar = [
      aday({ baslik: 'New Shopify AI product description tool launched' }),
      aday({ baslik: 'New Shopify AI product description tool launched today' }),
    ];
    const sirali = rankCandidates(adaylar, bos, NOW);
    expect(sirali.length).toBe(1);
  });
});
