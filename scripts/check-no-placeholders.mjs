#!/usr/bin/env node
// Publish gate: dist/ içinde yasaklı yer tutucu ifadeler varsa build'i durdurur.
// "npm run postbuild" ile otomatik çalışır.

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const FORBIDDEN = [
  'TBD',
  'yakında',
  'doğrulanmalı',
  'AdSense onay sonrası',
  'Reklam alanı',
  'affiliate linki: TBD',
  'İncele (affiliate linki',
  'Yazar biyografisi: TBD',
  'Sağlayıcı entegrasyonu',
];

const DIST_DIR = new URL('../dist', import.meta.url).pathname;

function walkFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full));
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

let found = 0;

try {
  statSync(DIST_DIR);
} catch {
  console.error('Hata: dist/ klasörü bulunamadı. Önce "npm run build" çalıştırın.');
  process.exit(1);
}

const files = walkFiles(DIST_DIR);

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const phrase of FORBIDDEN) {
      if (lines[i].includes(phrase)) {
        console.error(`HATA: "${phrase}" — ${file}:${i + 1}`);
        found++;
      }
    }
  }
}

if (found > 0) {
  console.error(`\nPublish gate BAŞARISIZ: ${found} yasaklı ifade bulundu.`);
  process.exit(1);
} else {
  console.log(`Publish gate: OK — ${files.length} dosya tarandı, yasaklı ifade bulunamadı.`);
}
