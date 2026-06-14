// Faz 2 ajanı genelinde paylaşılan tipler.

// RSS kaynağından çıkarılan ham trend adayı.
export interface Candidate {
  baslik: string;
  ozet: string;
  link: string;
  kaynak: string;
  // ISO 8601 yayın tarihi; ayrıştırılamazsa null.
  yayinTarihi: string | null;
}

// Skorlanmış aday (kategori + gerekçe ile).
export interface ScoredCandidate {
  aday: Candidate;
  skor: number;
  kategori: string;
  // Skorun nasıl oluştuğunu açıklayan kırılım (şeffaflık + hata ayıklama).
  kirilim: {
    alaka: number;
    guncellik: number;
    cesitlilik: number;
  };
}

// Mevcut yayınların dedup için özeti.
export interface ExistingContent {
  sluglar: string[];
  anahtarKelimeler: string[];
}

// Claude'un ürettiği taslak içeriği (frontmatter şemasına eşlenir).
export interface DraftContent {
  baslik: string;
  ozet: string;
  seoBaslik: string;
  seoAciklama: string;
  anahtarKelime: string;
  kategori: string;
  etiketler: string[];
  govde: string;
}
