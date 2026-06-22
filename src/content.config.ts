import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { KATEGORI_ADLARI } from './lib/categories';

const kategoriEnum = z.enum(KATEGORI_ADLARI);

// Blog yazıları — Markdown/MDX. Frontmatter spec'e birebir uyar.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    baslik: z.string(),
    ozet: z.string(),
    tarih: z.coerce.date(),
    guncellenme: z.coerce.date().optional(),
    yazar: z.string(),
    kategori: kategoriEnum,
    etiketler: z.array(z.string()).default([]),
    kapakGorsel: z.string().optional(),
    seoBaslik: z.string().optional(),
    seoAciklama: z.string().optional(),
    anahtarKelime: z.string().optional(),
    incelenenAraclar: z.array(z.string()).default([]),
    // Ana sayfa vitrini: işaretli yazı "öne çıkan" olur (yoksa en yeni yazıya düşülür).
    oneCikan: z.boolean().default(false),
    // Vitrindeki yazı için hero butonu metni (alıcı-niyetli kısa CTA).
    vitrinCta: z.string().optional(),
    // Sık sorulan sorular: hem görünür SSS bölümü hem FAQPage yapısal verisi.
    // "İnsanlar şunu da soruyor" / sesli arama / AI cevap motoru hedefleme.
    sss: z
      .array(z.object({ soru: z.string(), cevap: z.string() }))
      .default([]),
    // Editöryel kapı: yalnızca 'yayinda' olanlar listelenir/build'e girer.
    durumu: z.enum(['taslak', 'onaylandi', 'yayinda']),
  }),
});

// AI araçları dizini — JSON veri.
const tools = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tools' }),
  schema: z.object({
    ad: z.string(),
    kategori: kategoriEnum,
    // Doğrulanmamış fiyat null kalır (uydurma yok); UI null iken fiyatı gizler.
    fiyat: z.string().nullable().default(null),
    artilar: z.array(z.string()).default([]),
    eksiler: z.array(z.string()).default([]),
    // Aracın resmi sitesi (affiliate OLMAYAN). Linkler şimdilik buradan çalışır.
    officialUrl: z.string().url().optional(),
    // Affiliate (ortaklık) yönlendirme URL'i. Doldurulunca link otomatik affiliate'e geçer.
    affiliateUrl: z.string().url().nullable().default(null),
    // İleride eklenebilecek araç ekran görüntüsü (yoksa null).
    screenshot: z.string().nullable().default(null),
    // Araca özel OG görseli (yoksa site varsayılanına düşülür).
    ogImage: z.string().optional(),
    aciklama: z.string().optional(),

    // --- Araç detay sayfası (Faz 2) — hepsi opsiyonel; doldurulmadıkça ilgili bölüm render EDİLMEZ ---
    // Editöryel genel puan (0–5). GERÇEK testten gelir; uydurulmaz (CLAUDE.md #6). null → puan/Review yok.
    // Yalnızca dolu olduğunda yıldız gösterimi + Review/AggregateRating yapısal verisi eklenir.
    puan: z.number().min(0).max(5).nullable().default(null),
    // İsteğe bağlı kriter bazlı alt puanlar (Metodoloji ağırlıklarıyla aynı kriterler).
    puanlamaKriterleri: z
      .array(z.object({ ad: z.string(), puan: z.number().min(0).max(5) }))
      .default([]),
    // Detay sayfası için daha uzun editöryel değerlendirme paragrafı (kısa `aciklama`'dan ayrı).
    degerlendirme: z.string().optional(),
    // "Kimler için uygun" — hedef kullanıcı tanımı.
    kimlerIcin: z.string().optional(),
    // Alternatif araçlar (dizindeki diğer araçların id'leri = dosya adı slug'ı). Eşleşmeyen sessizce atlanır.
    alternatifler: z.array(z.string()).default([]),
    // Araca özel SSS (görünür bölüm + FAQPage yapısal verisi).
    sss: z.array(z.object({ soru: z.string(), cevap: z.string() })).default([]),
    // İncelemenin son gözden geçirme tarihi (detay sayfasında "güncellendi" olarak gösterilir).
    sonGuncelleme: z.coerce.date().optional(),
  }),
});

export const collections = { posts, tools };
