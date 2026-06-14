# API

> Son güncelleme: 2026-06-14

Faz 1'de **harici REST/GraphQL API yoktur**. "API" burada içerik veri sözleşmesini
(Content Collections şeması) ifade eder. Harici entegrasyonlar Faz 2/3'te eklenecek (TBD).

## İç Veri Sözleşmesi — `src/content/config.ts`

### Koleksiyon: `posts` (Markdown/MDX)
Frontmatter alanları (spec'e göre):

| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `baslik` | string | Evet | |
| `ozet` | string | Evet | Liste/SEO açıklaması için |
| `tarih` | date | Evet | Yayın tarihi |
| `guncellenme` | date | Hayır | |
| `yazar` | string | Evet | E-E-A-T |
| `kategori` | enum | Evet | İçerik üretimi / Ürün görseli / Müşteri desteği / SEO & reklam / Stok & operasyon |
| `etiketler` | string[] | Hayır | |
| `kapakGorsel` | string | Hayır | Yol/URL |
| `seoBaslik` | string | Hayır | Yoksa `baslik` |
| `seoAciklama` | string | Hayır | Yoksa `ozet` |
| `anahtarKelime` | string | Hayır | Kanonik hedef |
| `incelenenAraclar` | string[] | Hayır | `tools`/affiliate anahtarları |
| `durumu` | enum | Evet | `taslak` \| `onaylandi` \| `yayinda` |

### Koleksiyon: `tools` (JSON)
| Alan | Tip | Zorunlu | Not |
|------|-----|---------|-----|
| `ad` | string | Evet | |
| `kategori` | enum | Evet | posts ile aynı kategori kümesi |
| `fiyat` | string | Hayır | Doğrulanmamışsa `TBD` |
| `artilar` | string[] | Hayır | |
| `eksiler` | string[] | Hayır | |
| `affiliateAnahtar` | string | Hayır | `affiliate.config.ts` anahtarı |
| `aciklama` | string | Hayır | |

## Harici Kaynaklar (Faz 2 — ajan, TBD)
Google Trends, Google News RSS, Product Hunt, Reddit. Erişim yöntemleri ve
hız limitleri ajan tasarımında belgelenecek.
