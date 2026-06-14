// Giriş noktası: trendleri keşfeder ve en iyi N konu için Claude ile TASLAK üretir.
// Çıktı: drafts/*.md (durumu: taslak). Kullanım: npm run agent:drafts
// Gerekli: ANTHROPIC_API_KEY ortam değişkeni.

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { discover } from './lib/discover';
import { generateDraft } from './lib/drafter';
import { buildDraftMarkdown, draftFileName } from './lib/frontmatter';

const DRAFTS_DIR = resolve(process.cwd(), 'drafts');
const ADET = Math.max(1, Math.min(10, Number(process.env.DRAFT_COUNT ?? '2') || 2));

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY tanımlı değil — taslak üretimi için gerekli.');
  }

  const sonuc = await discover();
  if (sonuc.siralanan.length === 0) {
    console.log('[drafts] Uygun niş-içi konu bulunamadı; taslak üretilmedi.');
    return;
  }

  mkdirSync(DRAFTS_DIR, { recursive: true });
  const secilenler = sonuc.siralanan.slice(0, ADET);
  const uretilen: string[] = [];

  for (const secim of secilenler) {
    try {
      console.log(`[drafts] Üretiliyor: ${secim.aday.baslik}`);
      const draft = await generateDraft(secim);
      const dosyaAdi = draftFileName(draft);
      const yol = resolve(DRAFTS_DIR, dosyaAdi);
      if (existsSync(yol)) {
        console.log(`[drafts] Atlandı (zaten var): ${dosyaAdi}`);
        continue;
      }
      const md = buildDraftMarkdown(draft, {
        kaynakLink: secim.aday.link,
        kaynakAdi: secim.aday.kaynak,
      });
      writeFileSync(yol, md, 'utf-8');
      uretilen.push(dosyaAdi);
      console.log(`[drafts] Yazıldı: drafts/${dosyaAdi}`);
    } catch (err) {
      console.error(`[drafts] Taslak üretilemedi (${secim.aday.baslik}):`, err);
    }
  }

  console.log(`\n[drafts] Tamamlandı. ${uretilen.length} taslak üretildi.`);
  if (uretilen.length > 0) {
    console.log('İnceleme için bekleyen taslaklar (durumu: taslak):');
    for (const d of uretilen) console.log(`  - drafts/${d}`);
  }
}

main().catch((err) => {
  console.error('[drafts] hata:', err);
  process.exit(1);
});
