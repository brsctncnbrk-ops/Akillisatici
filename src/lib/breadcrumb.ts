// BreadcrumbList JSON-LD üretimi — TEK KAYNAK.
// Hem yazı detay hem kategori sayfaları aynı mantığı kullanır (DRY); böylece
// kırıntı (breadcrumb) yapısı her sayfada elle tekrarlanmaz.

export interface Breadcrumb {
  /** Görünen ad (ör. "Ana sayfa", kategori adı, yazı başlığı). */
  name: string;
  /** Site köküne göre mutlak yol (ör. "/", "/kategori/seo-reklam/"). */
  path: string;
}

export interface BreadcrumbListLd {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * `BreadcrumbList` şeması üretir (schema.org).
 * @param site Sondaki "/" olmadan site kökü (ör. "https://saticikutusu.com").
 * @param crumbs Sıralı kırıntı listesi (kökten yaprağa).
 */
export function buildBreadcrumbLd(site: string, crumbs: Breadcrumb[]): BreadcrumbListLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site}${crumb.path}`,
    })),
  };
}
