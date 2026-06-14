# ARCHITECTURE

> Son güncelleme: 2026-06-14

## Genel Bakış
Astro tabanlı statik site (SSG). İçerik dosya tabanlı (Markdown/MDX + JSON), build zamanında derlenir. Çalışma zamanında sunucu yok; CDN'den statik servis. Faz 2'de ayrık bir Node.js ajanı (CI cron) yalnızca taslak üretir — siteye yayın yapmaz.

## Sistem Mimarisi

```mermaid
flowchart TD
    subgraph Icerik[Icerik Kaynagi]
        MD[src/content/posts/*.md]
        TOOLS[src/content/tools/*.json]
        AFF[affiliate.config.ts]
    end
    subgraph Build[Astro Build]
        CC[Content Collections + zod sema]
        PAGES[Sayfalar + Bilesenler]
    end
    DIST[dist/ statik cikti]
    CDN[Vercel / Netlify CDN]
    USER[Ziyaretci]

    MD --> CC
    TOOLS --> CC
    AFF --> PAGES
    CC --> PAGES
    PAGES --> DIST
    DIST --> CDN
    CDN --> USER

    subgraph Faz2[Faz 2 - Trend Kesif Ajani]
        AGENT[scripts/ ajan]
        DRAFTS[drafts/ taslaklar]
    end
    AGENT --> DRAFTS
    DRAFTS -. insan onayi .-> MD
```

## Editöryel Veri Akışı

```mermaid
flowchart LR
    A[Ajan/Yazar taslak uretir] --> B[drafts/ veya durumu: taslak]
    B --> C{Insan onayi}
    C -- onayla --> D[durumu: yayinda + src/content/posts/]
    C -- reddet --> E[duzelt / sil]
    D --> F[Build'e dahil]
```
**Kural:** Yalnızca `durumu: yayinda` olan içerik listelenir/build'e girer. Otomatik yayın yoktur.

## Servisler / Bileşenler
- **Layout'lar:** `BaseLayout` (head/SEO, header, footer), `PostLayout` (yazı şablonu).
- **Bileşenler:** `BaseHead` (meta/OG/canonical/JSON-LD), `Header`, `Footer`, `PostCard`, `ToolCard`, `AffiliateLink` (+ `rel`), `AffiliateDisclosure`, `AdSlot` (placeholder), `NewsletterSignup` (placeholder).
- **İçerik:** `src/content/config.ts` — `posts` ve `tools` koleksiyonları (zod şema).
- **Affiliate:** `affiliate.config.ts` — araç anahtarı → `{ url, komisyonNotu }`.

## Veri Akışı (API)
Faz 1'de harici çağrı yok. İç akış: Markdown frontmatter → zod doğrulama → tipli içerik → sayfa render. Şema detayı `API.md`.

## Yetkilendirme Modeli
Faz 1: yok (kamuya açık statik site, kullanıcı hesabı yok). Editöryel onay = depo yazma yetkisi olan insan (git). Faz 2 ajanı yalnızca `drafts/` yazma kapsamında.

## Güvenlik Modeli
Gizli anahtarlar env'de; statik çıktıya yalnızca `PUBLIC_` öneki sızar. Affiliate `rel="sponsored nofollow"`. Form girdisi doğrulama. Detay `SECURITY.md`.

## Hata Yönetimi & Loglama
Build zamanı: zod şema hatası build'i durdurur (sessiz hatalı içerik engellenir). Runtime statik olduğu için minimal. Faz 2 ajanı yapılandırılmış log + başarısız kaynak için graceful skip.

## Ölçeklenebilirlik Planı
İçerik büyürse: artımlı build, görsel CDN, gerekirse içerik DB'si (SQLite/Turso). CDN dağıtımı yatay ölçeği sağlar.

## Klasör Yapısı
```
/src
  /content/config.ts        # koleksiyon şemaları
  /content/posts/*.md       # yayınlanmış yazılar
  /content/tools/*.json     # araç dizini verisi
  /components/*.astro
  /layouts/*.astro
  /pages
    index.astro
    posts/[...slug].astro
    kategori/[category].astro
    araclar.astro
    hakkinda.astro
    gizlilik.astro
    affiliate-aciklama.astro
    robots.txt.ts
  /lib                      # yardımcılar (affiliate çözümleme vb.) + testler
/drafts                     # Faz 2 ajan taslakları
/scripts                    # Faz 2 ajan
/.github/workflows          # CI + (Faz 2) cron
affiliate.config.ts
```
Yeni klasör gerektiğinde bu dosya güncellenir (AI ajan kuralı #10).
