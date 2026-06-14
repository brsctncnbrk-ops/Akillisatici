// Trend keşif orkestrasyonu: kaynakları çek → mevcut içerikle karşılaştır → puanla → sırala.

import { resolve } from 'node:path';
import { fetchAllSources } from './trends';
import { readExistingContent } from './existing';
import { rankCandidates } from './score';
import type { ScoredCandidate } from './types';

const POSTS_DIR = resolve(process.cwd(), 'src/content/posts');
const DRAFTS_DIR = resolve(process.cwd(), 'drafts');

export interface DiscoverResult {
  uretimTarihi: string;
  toplamAday: number;
  siralanan: ScoredCandidate[];
}

export async function discover(now: Date = new Date()): Promise<DiscoverResult> {
  const adaylar = await fetchAllSources();
  // Mevcut yayınlar + üretilmiş taslaklar dedup havuzuna girer.
  const mevcut = readExistingContent(POSTS_DIR, DRAFTS_DIR);
  const siralanan = rankCandidates(adaylar, mevcut, now);
  return {
    uretimTarihi: now.toISOString(),
    toplamAday: adaylar.length,
    siralanan,
  };
}
