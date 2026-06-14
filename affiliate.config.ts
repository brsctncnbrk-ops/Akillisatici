// Affiliate link tek kaynağı (Single Source of Truth).
// Bir aracın linki değiştiğinde yalnızca burayı güncelle.
// ÖNEMLİ: Doğrulanmamış link/komisyon değeri UYDURULMAZ → 'TBD' bırakılır.
// Tüm affiliate linkleri render edilirken rel="sponsored nofollow" + görünür ifşa kullanılır.

export interface AffiliateEntry {
  /** Affiliate yönlendirme URL'i. Doğrulanmadıysa 'TBD'. */
  url: string;
  /** Komisyon notu (ör. "%30 tekrarlayan"). Doğrulanmadıysa 'TBD'. */
  komisyonNotu: string;
}

export const affiliateConfig: Record<string, AffiliateEntry> = {
  // Örnek girişler — gerçek affiliate linkleri ve komisyon oranları TBD.
  jasper: { url: 'TBD', komisyonNotu: 'TBD' },
  copyai: { url: 'TBD', komisyonNotu: 'TBD' },
  photoroom: { url: 'TBD', komisyonNotu: 'TBD' },
  pebblely: { url: 'TBD', komisyonNotu: 'TBD' },
  tidio: { url: 'TBD', komisyonNotu: 'TBD' },
};
