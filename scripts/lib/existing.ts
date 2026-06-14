// Mevcut yayın/taslakları okuyup dedup için özet çıkarır.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ExistingContent } from './types';

// Basit frontmatter alanı çekici (YAML ayrıştırıcısına ihtiyaç yok).
function alan(frontmatter: string, ad: string): string {
  const m = frontmatter.match(new RegExp(`^${ad}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

// Bir dizindeki .md dosyalarından slug + anahtar kelime/başlık toplar.
export function readExistingContent(...dizinler: string[]): ExistingContent {
  const sluglar: string[] = [];
  const anahtarKelimeler: string[] = [];

  for (const dizin of dizinler) {
    if (!existsSync(dizin)) continue;
    for (const dosya of readdirSync(dizin)) {
      if (!dosya.endsWith('.md') && !dosya.endsWith('.mdx')) continue;
      sluglar.push(dosya.replace(/\.(md|mdx)$/, ''));
      const icerik = readFileSync(join(dizin, dosya), 'utf-8');
      const fm = icerik.match(/^---\n([\s\S]*?)\n---/);
      if (!fm) continue;
      const blok = fm[1];
      const baslik = alan(blok, 'baslik');
      const anahtar = alan(blok, 'anahtarKelime');
      if (baslik) anahtarKelimeler.push(baslik);
      if (anahtar) anahtarKelimeler.push(anahtar);
    }
  }
  return { sluglar, anahtarKelimeler };
}
