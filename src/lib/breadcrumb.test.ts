import { describe, it, expect } from 'vitest';
import { buildBreadcrumbLd } from './breadcrumb';

const SITE = 'https://saticikutusu.com';

describe('buildBreadcrumbLd', () => {
  it('kırıntıları sırayla 1 tabanlı position ile numaralandırır', () => {
    const ld = buildBreadcrumbLd(SITE, [
      { name: 'Ana sayfa', path: '/' },
      { name: 'SEO & reklam', path: '/kategori/seo-reklam/' },
    ]);
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });

  it('path değerini site kökü ile birleştirip mutlak `item` üretir', () => {
    const ld = buildBreadcrumbLd(SITE, [{ name: 'Ana sayfa', path: '/' }]);
    expect(ld.itemListElement[0].item).toBe('https://saticikutusu.com/');
  });

  it('boş listede boş itemListElement döner', () => {
    const ld = buildBreadcrumbLd(SITE, []);
    expect(ld.itemListElement).toEqual([]);
  });
});
