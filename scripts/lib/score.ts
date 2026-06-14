// Trend adaylarını niş alaka, güncellik ve çeşitlilik (dedup) üzerinden puanlar.
// Tüm fonksiyonlar SAF ve deterministiktir — `score.test.ts` ile doğrulanır.

import { NICHE_KEYWORDS, CATEGORY_HINTS, DEFAULT_CATEGORY } from './config';
import type { Candidate, ScoredCandidate, ExistingContent } from './types';

const TR_NORMALIZE: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
  â: 'a',
  î: 'i',
  û: 'u',
};

// Metni eşleştirme için sadeleştirir: küçük harf, Türkçe karaktersiz, tek boşluk.
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((c) => TR_NORMALIZE[c] ?? c)
    .join('')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Niş anahtar kelimelerin ağırlıklı toplamı (her terim en fazla bir kez sayılır).
export function relevanceScore(text: string): number {
  const norm = normalize(text);
  let toplam = 0;
  for (const { terim, agirlik } of NICHE_KEYWORDS) {
    if (norm.includes(normalize(terim))) toplam += agirlik;
  }
  return toplam;
}

// Yayın tarihine göre güncellik puanı. Yeni içerik daha değerlidir.
export function recencyScore(yayinTarihi: string | null, now: Date): number {
  if (!yayinTarihi) return 1;
  const t = Date.parse(yayinTarihi);
  if (Number.isNaN(t)) return 1;
  const gunFarki = (now.getTime() - t) / (1000 * 60 * 60 * 24);
  if (gunFarki < 0) return 1; // gelecek tarihli; nötr
  if (gunFarki <= 2) return 5;
  if (gunFarki <= 7) return 3;
  if (gunFarki <= 30) return 1;
  return 0;
}

// Anlamlı kelimelere böler (3+ harf, niş gürültüsü dışında).
function tokens(text: string): Set<string> {
  return new Set(normalize(text).split(' ').filter((w) => w.length >= 3));
}

// Mevcut içerikle örtüşme oranı [0,1]. Yüksek = muhtemelen tekrar.
export function overlapRatio(text: string, existing: ExistingContent): number {
  const t = tokens(text);
  if (t.size === 0) return 0;
  const havuz = new Set<string>();
  for (const k of existing.anahtarKelimeler) for (const w of tokens(k)) havuz.add(w);
  for (const s of existing.sluglar) for (const w of s.split('-')) if (w.length >= 3) havuz.add(w);
  let kesisim = 0;
  for (const w of t) if (havuz.has(w)) kesisim += 1;
  return kesisim / t.size;
}

// Aday metninden site kategorisini tahmin eder (categories.ts `ad` ile birebir).
export function pickCategory(text: string): string {
  const norm = normalize(text);
  for (const { anahtarlar, kategori } of CATEGORY_HINTS) {
    if (anahtarlar.some((a) => norm.includes(normalize(a)))) return kategori;
  }
  return DEFAULT_CATEGORY;
}

// Tek bir adayı puanlar. Çeşitlilik (dedup) bir cezadır: mevcut içerikle çok
// örtüşen adaylar düşük puan alır.
export function scoreCandidate(
  aday: Candidate,
  existing: ExistingContent,
  now: Date,
): ScoredCandidate {
  const metin = `${aday.baslik} ${aday.ozet}`;
  const alaka = relevanceScore(metin);
  const guncellik = recencyScore(aday.yayinTarihi, now);
  // Örtüşme [0,1] → ceza [0,-4]
  const cesitlilik = -Math.round(overlapRatio(metin, existing) * 4);
  const skor = alaka + guncellik + cesitlilik;
  return {
    aday,
    skor,
    kategori: pickCategory(metin),
    kirilim: { alaka, guncellik, cesitlilik },
  };
}

// Adayları puanlar, niş-dışı (alaka 0) olanları eler, kendi içinde benzerleri
// teker (ilk/en yüksek puanlı kazanır) ve azalan skora göre sıralar.
export function rankCandidates(
  adaylar: Candidate[],
  existing: ExistingContent,
  now: Date,
): ScoredCandidate[] {
  const puanli = adaylar
    .map((a) => scoreCandidate(a, existing, now))
    .filter((s) => s.kirilim.alaka > 0)
    .sort((a, b) => b.skor - a.skor);

  // Aday havuzu içi dedup: birbirine çok benzeyen başlıkları ele.
  const secilen: ScoredCandidate[] = [];
  for (const s of puanli) {
    const t = tokens(s.aday.baslik);
    const benzerVar = secilen.some((mevcut) => {
      const m = tokens(mevcut.aday.baslik);
      let ortak = 0;
      for (const w of t) if (m.has(w)) ortak += 1;
      const oran = t.size === 0 ? 0 : ortak / t.size;
      return oran >= 0.6;
    });
    if (!benzerVar) secilen.push(s);
  }
  return secilen;
}
