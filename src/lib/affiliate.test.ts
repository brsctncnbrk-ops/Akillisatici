import { describe, it, expect } from 'vitest';
import { resolveAffiliate, hasAffiliate, AFFILIATE_REL } from './affiliate';

describe('affiliate', () => {
  it('rel değeri her zaman "sponsored nofollow"', () => {
    expect(AFFILIATE_REL).toBe('sponsored nofollow');
  });

  it('bilinmeyen anahtar için undefined döner', () => {
    expect(resolveAffiliate('boyle-bir-arac-yok')).toBeUndefined();
  });

  it('bilinen anahtar için bir kayıt döner', () => {
    const entry = resolveAffiliate('jasper');
    expect(entry).toBeDefined();
    expect(entry).toHaveProperty('url');
    expect(entry).toHaveProperty('komisyonNotu');
  });

  it('URL değeri "TBD" olan kayıt kullanılabilir affiliate sayılmaz', () => {
    expect(hasAffiliate('jasper')).toBe(false);
  });

  it('var olmayan anahtar kullanılabilir affiliate sayılmaz', () => {
    expect(hasAffiliate('boyle-bir-arac-yok')).toBe(false);
  });
});
