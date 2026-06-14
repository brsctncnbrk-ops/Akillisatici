// Araç linklerini tek bir mantıkla çözer.
// Kural:
//  - affiliateUrl doluysa onu kullan → rel="sponsored nofollow ..." (ortaklık linki).
//  - affiliateUrl null/boş ise officialUrl'e düş → rel="nofollow ..." (ortaklık DEĞİL).
//  - Her iki durumda da yeni sekmede açılır; güvenlik için noopener noreferrer eklenir.
//  - Hiçbir URL yoksa null döner (buton gösterilmez).
// Böylece ileride affiliateUrl doldurulduğunda link otomatik olarak affiliate'e geçer;
// başka kod değişikliği gerekmez.

const BASE_REL = 'noopener noreferrer';

export interface ToolLinkInput {
  officialUrl?: string | null;
  affiliateUrl?: string | null;
}

export interface ResolvedToolLink {
  href: string;
  rel: string;
  /** affiliate (ortaklık) linki mi? Görünür ifşa rozeti için kullanılır. */
  isAffiliate: boolean;
}

export function resolveToolLink({ officialUrl, affiliateUrl }: ToolLinkInput): ResolvedToolLink | null {
  if (affiliateUrl) {
    return { href: affiliateUrl, rel: `sponsored nofollow ${BASE_REL}`, isAffiliate: true };
  }
  if (officialUrl) {
    return { href: officialUrl, rel: `nofollow ${BASE_REL}`, isAffiliate: false };
  }
  return null;
}
