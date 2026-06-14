// Taslak içeriği, content şemasına (src/content.config.ts) BİREBİR uyan bir
// Markdown dosyasına çevirir. KRİTİK: `durumu` daima 'taslak' — otomatik yayın YASAK.

import { KATEGORI_ADLARI } from '../../src/lib/categories';
import { slugify } from '../../src/lib/slug';
import type { DraftContent } from './types';

// Tek satırlık YAML string değerini güvenli biçimde tırnaklar.
function yamlStr(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

function yamlListe(items: string[]): string {
  return `[${items.map((i) => yamlStr(i)).join(', ')}]`;
}

export interface BuildDraftOptions {
  // Kaynak şeffaflığı için taslağın altına eklenir.
  kaynakLink?: string;
  kaynakAdi?: string;
  tarih?: Date;
}

// Taslak dosya adı: YYYY-AA-GG-slug.md
export function draftFileName(draft: DraftContent, tarih = new Date()): string {
  const gun = tarih.toISOString().slice(0, 10);
  return `${gun}-${slugify(draft.baslik)}.md`;
}

export function buildDraftMarkdown(draft: DraftContent, opts: BuildDraftOptions = {}): string {
  // Kategori şema enum'una uymuyorsa hata ver (uydurma kategori engellenir).
  if (!KATEGORI_ADLARI.includes(draft.kategori)) {
    throw new Error(
      `Geçersiz kategori: "${draft.kategori}". İzinli: ${KATEGORI_ADLARI.join(', ')}`,
    );
  }
  const tarih = opts.tarih ?? new Date();
  const gun = tarih.toISOString().slice(0, 10);

  const fm: string[] = [
    '---',
    `baslik: ${yamlStr(draft.baslik)}`,
    `ozet: ${yamlStr(draft.ozet)}`,
    `tarih: ${gun}`,
    `yazar: ${yamlStr('Barış ÇETİN')}`,
    `kategori: ${yamlStr(draft.kategori)}`,
    `etiketler: ${yamlListe(draft.etiketler)}`,
    `seoBaslik: ${yamlStr(draft.seoBaslik)}`,
    `seoAciklama: ${yamlStr(draft.seoAciklama)}`,
    `anahtarKelime: ${yamlStr(draft.anahtarKelime)}`,
    'incelenenAraclar: []',
    // Editöryel kapı — insan onayı şart.
    `durumu: ${yamlStr('taslak')}`,
    '---',
    '',
  ];

  const altBilgi: string[] = ['', '---', ''];
  if (opts.kaynakLink) {
    altBilgi.push(
      `*Bu taslak trend keşif ajanı tarafından üretildi (esin kaynağı: ${opts.kaynakAdi ?? 'RSS'} — ${opts.kaynakLink}). Yayımlamadan önce bir editör tarafından gözden geçirilmeli; fiyat/komisyon gibi doğrulanmamış veriler TBD bırakılmalıdır.*`,
    );
  } else {
    altBilgi.push(
      '*Bu taslak trend keşif ajanı tarafından üretildi. Yayımlamadan önce bir editör tarafından gözden geçirilmelidir.*',
    );
  }

  return `${fm.join('\n')}${draft.govde.trim()}\n${altBilgi.join('\n')}\n`;
}
