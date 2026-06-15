import { describe, it, expect } from 'vitest';
import { buildBreadcrumbLd } from './breadcrumb';

describe('buildBreadcrumbLd', () => {
  const site = 'https://saticikutusu.com';

  it('kırıntıları sırayla 1-tabanlı position ile numaralandırır', () => {
    const ld = buildBreadcrumbLd(site, [
      { name: 'Ana sayfa', path: '/' },
      { name: 'SEO & reklam', path: '/kategori/seo-reklam/' },
    ]);
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement).toHaveLength(2);
    expect(ld.itemListElement[0]).toMatchObject({ position: 1, name: 'Ana sayfa' });
    expect(ld.itemListElement[1].position).toBe(2);
  });

  it('item alanini site koku + yol olarak mutlak URL uretir', () => {
    const ld = buildBreadcrumbLd(site, [{ name: 'Ana sayfa', path: '/' }]);
    expect(ld.itemListElement[0].item).toBe('https://saticikutusu.com/');
  });

  it('boş listede boş itemListElement döner', () => {
    const ld = buildBreadcrumbLd(site, []);
    expect(ld.itemListElement).toEqual([]);
  });
});
