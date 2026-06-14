// Claude API ile, seçilen bir trend konusundan yazı TASLAĞI üretir.
// Çıktı yalnızca taslaktır (durumu: taslak); yayın kararı insandadır.

import Anthropic from '@anthropic-ai/sdk';
import type { DraftContent, ScoredCandidate } from './types';

// Skill yönergesi: aksi açıkça istenmedikçe en yetenekli model.
const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-opus-4-8';

const SYSTEM_PROMPT = `Sen "Satıcı Kutusu" adlı Türkçe niş blogun editöryel içerik asistanısın.
Niş: online satıcılar (Shopify, Etsy, Amazon, Trendyol, Hepsiburada) için yapay zeka araçları.

GÖREVİN: Verilen trend/haberden ESİNLENEREK özgün, değer katan bir Türkçe blog yazısı TASLAĞI üret.

KATI KURALLAR:
- Dil: Türkçe. Akıcı, sade, abartısız; reklam dili YOK.
- Özgün değer: Haberi kopyalama; Türkiye'deki online satıcılar için pratik, uygulanabilir bir açıyla yeniden çerçevele.
- ASLA uydurma: Fiyat, komisyon oranı, kesin istatistik veya doğrulanmamış özellik yazma. Bilinmiyorsa metinde açıkça "TBD (doğrulanmalı)" yaz.
- Yapı: Giriş + en az 3 alt başlık (## ) + "Nasıl yapılır?" tarzı pratik adımlar + kısa sonuç.
- E-E-A-T: Deneyime dayalı, dürüst ton. Aşırı vaat yok.
- Uzunluk: 600-1000 kelime. Markdown gövdesi (frontmatter EKLEME).
- "yapay zeka" ve "AI" terimlerini dengeli kullan.

ÇIKTI BİÇİMİ: Yalnızca tek bir JSON nesnesi döndür. Markdown kod bloğu, açıklama veya başka metin EKLEME.
JSON alanları:
{
  "baslik": "ilgi çekici Türkçe başlık",
  "ozet": "1-2 cümlelik özet (max 160 karakter)",
  "seoBaslik": "SEO başlığı (max 60 karakter)",
  "seoAciklama": "meta açıklama (max 155 karakter)",
  "anahtarKelime": "tek odak anahtar kelime",
  "etiketler": ["3-5", "kısa", "etiket"],
  "govde": "Markdown gövde (## alt başlıklar, liste, gerekirse tablo). Frontmatter YOK."
}`;

function buildUserPrompt(secim: ScoredCandidate): string {
  const { aday, kategori } = secim;
  return `TREND/HABER:
Başlık: ${aday.baslik}
Özet: ${aday.ozet || '(özet yok)'}
Kaynak: ${aday.kaynak}

Bu konuyu "${kategori}" kategorisinde, Türkiye'deki online satıcılara yönelik özgün bir yazıya dönüştür.
Yanıtı yalnızca belirtilen JSON biçiminde ver.`;
}

// Yanıt metninden ilk JSON nesnesini ayıklar (model fazladan metin koyarsa).
function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

function coerceDraft(parsed: Record<string, unknown>, fallbackKategori: string): DraftContent {
  const str = (v: unknown, def = ''): string => (typeof v === 'string' ? v : def);
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
  return {
    baslik: str(parsed.baslik),
    ozet: str(parsed.ozet),
    seoBaslik: str(parsed.seoBaslik, str(parsed.baslik)),
    seoAciklama: str(parsed.seoAciklama, str(parsed.ozet)),
    anahtarKelime: str(parsed.anahtarKelime),
    kategori: fallbackKategori,
    etiketler: arr(parsed.etiketler),
    govde: str(parsed.govde),
  };
}

export async function generateDraft(secim: ScoredCandidate): Promise<DraftContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY tanımlı değil.');

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(secim) }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Modelden metin yanıtı alınamadı.');
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(extractJson(textBlock.text)) as Record<string, unknown>;
  } catch {
    throw new Error('Model yanıtı geçerli JSON değil.');
  }

  const draft = coerceDraft(parsed, secim.kategori);
  if (!draft.baslik || !draft.govde) {
    throw new Error('Taslak eksik (baslik/govde boş).');
  }
  return draft;
}
