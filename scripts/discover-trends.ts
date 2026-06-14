// Giriş noktası: trendleri keşfedip puanlar ve bir rapor yazar (LLM YOK, secret YOK).
// Kullanım: npm run agent:discover

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { discover } from './lib/discover';

async function main(): Promise<void> {
  const sonuc = await discover();
  const gun = sonuc.uretimTarihi.slice(0, 10);

  const raporDizin = resolve(process.cwd(), 'drafts/reports');
  mkdirSync(raporDizin, { recursive: true });
  const raporYol = resolve(raporDizin, `trends-${gun}.json`);
  writeFileSync(raporYol, JSON.stringify(sonuc, null, 2), 'utf-8');

  console.log(`[discover] ${sonuc.toplamAday} aday tarandı, ${sonuc.siralanan.length} niş-içi aday.`);
  console.log(`[discover] Rapor: ${raporYol}\n`);
  console.log('En iyi 10 konu önerisi:');
  for (const [i, s] of sonuc.siralanan.slice(0, 10).entries()) {
    console.log(
      `${i + 1}. (skor ${s.skor} | ${s.kategori}) ${s.aday.baslik}\n   ${s.aday.kaynak}`,
    );
  }
}

main().catch((err) => {
  console.error('[discover] hata:', err);
  process.exit(1);
});
