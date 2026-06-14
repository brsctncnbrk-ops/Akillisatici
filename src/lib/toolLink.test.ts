import { describe, it, expect } from 'vitest';
import { resolveToolLink } from './toolLink';

describe('resolveToolLink', () => {
  it('affiliateUrl doluysa onu kullanır ve rel="sponsored nofollow ..." verir', () => {
    const link = resolveToolLink({
      officialUrl: 'https://example.com',
      affiliateUrl: 'https://aff.example.com/ref',
    });
    expect(link).not.toBeNull();
    expect(link!.href).toBe('https://aff.example.com/ref');
    expect(link!.isAffiliate).toBe(true);
    expect(link!.rel).toContain('sponsored');
    expect(link!.rel).toContain('nofollow');
    expect(link!.rel).toContain('noopener');
    expect(link!.rel).toContain('noreferrer');
  });

  it('affiliateUrl null ise officialUrl kullanılır ve rel sponsored İÇERMEZ', () => {
    const link = resolveToolLink({ officialUrl: 'https://example.com', affiliateUrl: null });
    expect(link).not.toBeNull();
    expect(link!.href).toBe('https://example.com');
    expect(link!.isAffiliate).toBe(false);
    expect(link!.rel).toContain('nofollow');
    expect(link!.rel).not.toContain('sponsored');
    expect(link!.rel).toContain('noopener');
  });

  it('hiçbir URL yoksa null döner', () => {
    expect(resolveToolLink({ officialUrl: null, affiliateUrl: null })).toBeNull();
    expect(resolveToolLink({})).toBeNull();
  });
});
