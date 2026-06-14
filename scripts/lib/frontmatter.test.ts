import { describe, it, expect } from 'vitest';
import { buildDraftMarkdown, draftFileName } from './frontmatter';
import type { DraftContent } from './types';

function draft(over: Partial<DraftContent> = {}): DraftContent {
  return {
    baslik: 'Shopify İçin AI Ürün Açıklaması',
    ozet: 'Kısa özet.',
    seoBaslik: 'Shopify AI Ürün Açıklaması',
    seoAciklama: 'Meta açıklama.',
    anahtarKelime: 'shopify ai',
    kategori: 'İçerik üretimi',
    etiketler: ['shopify', 'ai'],
    govde: '## Giriş\n\nİçerik.',
    ...over,
  };
}

describe('buildDraftMarkdown', () => {
  it('durumu DAİMA taslak olur (otomatik yayın yasak)', () => {
    const md = buildDraftMarkdown(draft());
    expect(md).toContain("durumu: 'taslak'");
    expect(md).not.toContain("durumu: 'yayinda'");
  });

  it('frontmatter ile başlar ve gövdeyi içerir', () => {
    const md = buildDraftMarkdown(draft());
    expect(md.startsWith('---\n')).toBe(true);
    expect(md).toContain('## Giriş');
    expect(md).toContain("kategori: 'İçerik üretimi'");
  });

  it('geçersiz kategori için hata fırlatır', () => {
    expect(() => buildDraftMarkdown(draft({ kategori: 'Uydurma Kategori' }))).toThrow();
  });

  it("YAML'de tek tırnağı güvenli kaçışlar", () => {
    const md = buildDraftMarkdown(draft({ baslik: "Satıcı'nın AI Rehberi" }));
    expect(md).toContain("baslik: 'Satıcı''nın AI Rehberi'");
  });
});

describe('draftFileName', () => {
  it('YYYY-AA-GG-slug.md biçiminde ad üretir', () => {
    const ad = draftFileName(draft(), new Date('2026-06-14T00:00:00Z'));
    expect(ad).toBe('2026-06-14-shopify-icin-ai-urun-aciklamasi.md');
  });
});
