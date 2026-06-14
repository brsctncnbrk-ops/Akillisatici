import { affiliateConfig, type AffiliateEntry } from '../../affiliate.config';

// Tüm affiliate linklerinde kullanılacak zorunlu rel değeri.
export const AFFILIATE_REL = 'sponsored nofollow';

// Verilen anahtar için affiliate kaydını döner (yoksa undefined).
export function resolveAffiliate(key: string): AffiliateEntry | undefined {
  return affiliateConfig[key];
}

// Anahtarın kullanılabilir (gerçek URL içeren) bir affiliate linki var mı?
// 'TBD' veya boş URL'ler kullanılabilir sayılmaz.
export function hasAffiliate(key: string): boolean {
  const entry = affiliateConfig[key];
  return Boolean(entry && entry.url && entry.url !== 'TBD');
}
