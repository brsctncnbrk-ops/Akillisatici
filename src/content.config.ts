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
    // SSS (FAQ) — FAQPage schema ve görsel accordion için.
    faq: z
      .array(z.object({ soru: z.string(), cevap: z.string() }))
      .optional(),
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
  }),
});

export const collections = { posts, tools };
