# HANDOFF — Oturum Devri

> **Birincil oturum devri dosyası.** Her oturum sonunda burayı güncelle: ne yapıldı,
> sırada ne var, açık sorular. `docs/TASKS.md` "Oturum Günlüğü" bu dosyaya yönlendirir.
> (Bu önceliklendirme `docs/DECISIONS.md` ADR-004'te gerekçelendirildi.)

---

## Oturum: 2026-06-15 — Adım 6: Dağıtım (ilk ziyaretçiyi "tohumlama")

### Yapıldı
- **Kod — sosyal paylaşım butonları:** `src/components/ShareButtons.astro` (WhatsApp, Pinterest
  görselli, X, Facebook, LinkedIn + "linki kopyala"). Yazı sayfasında içerik sonrası, yazar
  kutusundan önce render olur (`src/pages/posts/[...slug].astro`). Statik; yalnızca kopyala için
  küçük inline script. Her okuyucu potansiyel dağıtıcı → organik amplifikasyon.
- **İçerik/rehber — dağıtım kiti:** `docs/DISTRIBUTION_KIT.md` — değer-önce kurallar, kanal
  kılavuzu (Pinterest/FB/Reddit/LinkedIn/WhatsApp), her yazı için tekrar eden kontrol listesi,
  kanal bazlı kopyala-yapıştır şablonlar ve yayındaki 6 ana yazı için hazır metinler (uydurma
  rakam yok). Haftalık ritim eklendi.
- `docs/TRAFFIC_PLAYBOOK.md` durum tablosu + §5 güncellendi (kit + butonlara referans).
- **Pinterest doğrulama (canlı):** `PINTEREST_DOMAIN_VERIFY` meta etiketi (`site.ts` + `BaseHead`).
  Kullanıcı alan adını Pinterest'te doğruladı ✓. GSC zaten doğruluydu (tekrar gerekmez).
- **Dikey Pinterest görseli (canlı):** `src/pages/pin/[slug].png.ts` → her yazı için otomatik
  1000×1500 PNG (marka + kategori + başlık + özet + CTA; içerik gerçek frontmatter'dan).
  `ShareButtons` Pinterest butonu artık dikey `/pin/<slug>.png` görselini kullanır (yatay OG
  diğer kanallarda kalır). Kit + playbook bu görsele yönlendirildi.
- **Keşfedilebilirlik (canlı):** `src/pages/rehberler.astro` → tüm yazıları tek sayfada listeleyen,
  **anında istemci-tarafı aramalı** (başlık+özet+kategori+anahtar kelime+etiket) + kategori çipli
  "Rehberler" sayfası (ek bağımlılık yok). Header'a (masaüstü + mobil) "Rehberler" linki, ana sayfa
  "En yeni yazılar" başlığına "Tüm yazılar →" linki eklendi. (Kullanıcı geri bildirimi: yazıları
  bulmak zordu → çözüldü.)
- Kalite kapısı yeşil: **build 34 (+22 pin görseli +Rehberler) · lint 0/0 · test 27/27.** main'e merge + canlı.
- **Süreç kuralı (CLAUDE.md #8):** oturum kapanışında ("bitti"/`/clear`/`/compact` öncesi)
  önce HANDOFF güncellenip commit edilir → bağlam kaybolmadan ucuz oturum sıfırlama.

### Sırada / Kullanıcı aksiyonu
1. Pinterest: panoları aç + ilk pinler (`/pin/<slug>.png` + kit §4 metinleri). En kolayı yazı altı buton.
2. 2-3 ilgili Facebook/Reddit grubuna değerle katıl (kit §1 anahtarlar).
3. (Tamam) GSC + Pinterest doğrulama bitti; Bing Webmaster GSC'den içe aktarılabilir.

---

## Oturum: 2026-06-15 — Ücretsiz trafik büyütme (teknik SEO + içerik + rehber)

### Yapıldı
- **Teknik SEO/CTR (kod):**
  - Yazılara opsiyonel `sss` alanı → görünür FAQ bölümü + FAQPage JSON-LD (long-tail / sesli arama / AI cevap motoru).
  - IndexNow entegrasyonu: `public/<key>.txt` + `scripts/ping-indexnow.ts` + `.github/workflows/indexnow.yml` (main push'ta otomatik, secret gerektirmez).
  - Yazı sayfasında "incelenen araçlar" kutusu (`incelenenAraclar` → çapraz linkleme + affiliate görünürlüğü).
  - BaseHead'e opsiyonel `google-site-verification` meta (`GOOGLE_SITE_VERIFICATION`, boşken render olmaz).
- **İçerik:**
  - Pillar/hub taslağı `e-ticaret-yapay-zeka-araclari-rehberi.md` (`durumu: taslak`, onay bekliyor) — geniş anahtar kelime + tüm siteye iç link.
  - Etsy / Shopify görsel / pazaryeri destek yazılarına SSS eklendi.
- **Rehber:** `docs/TRAFFIC_PLAYBOOK.md` — ücretsiz trafik oyun kitabı (GSC, Bing, IndexNow, içerik, dağıtım + öncelikli aksiyon listesi).
- Kalite kapısı yeşil: build 32 sayfa · lint 0/0 · test 27/27.

### Sırada / Kullanıcı aksiyonu (detay: `docs/TRAFFIC_PLAYBOOK.md`)
1. Google Search Console doğrula + sitemap gönder (en kritik).
2. Bing Webmaster'a GSC'den içe aktar.
3. `ANTHROPIC_API_KEY` secret'ı ekle (trend ajanı haftalık cron'da, taslak üretimi için).
4. Pillar taslağını incele → `durumu: yayinda` yap.
5. Pinterest + Facebook/Reddit grupları ile dağıtım.

---

## Oturum: 2026-06-14 — Proje başlatma + Faz 1 iskelet

### Yapıldı
- Tam dokümantasyon seti oluşturuldu (CLAUDE.md, /docs/* 12 dosya, README, .gitignore, .env.example).
- Faz 1 Astro + Tailwind çekirdek site iskeleti kuruldu:
  - Content Collections (posts + tools) zod şemaları
  - Layout'lar, bileşenler (Header, Footer, PostCard, ToolCard, BaseHead/SEO, AffiliateDisclosure, AdSlot, NewsletterSignup)
  - Sayfalar: ana sayfa, yazı detay, kategori, araç dizini, hakkında, gizlilik, affiliate açıklama, robots.txt
  - `affiliate.config.ts` (tek kaynak), `rel="sponsored nofollow"` + ifşa
  - SEO: meta/OG/canonical/JSON-LD Article, otomatik sitemap
- TASK-001: build + lint + test altyapısı + 1 geçen örnek test + CI workflow.
- 3 örnek yazı (Etsy açıklama AI / Shopify ürün fotoğrafı AI / Trendyol-Hepsiburada müşteri desteği AI) — doğrulanmamış figürler TBD.

### Deploy — TAMAMLANDI (2026-06-14)
- Vercel + Git Integration ile yayına alındı (ADR-007). **Site canlı:** saticikutusu.com (kullanıcı doğruladı).
- `main` dalı oluşturuldu ve push edildi (production branch). Geliştirme `claude/project-initialization-system-4xz843` dalında sürüyor.
- CLI yolu bu ortamın ağ egress politikası (`api.vercel.com` allowlist dışı) nedeniyle kullanılamadı; Git Integration tercih edildi.

### Faz 2 — Trend keşif ajanı KURULDU (2026-06-14, ADR-008)
- `scripts/lib/*` (config, score, trends/RSS parse, existing, frontmatter, drafter, discover) + iki giriş noktası (`agent:discover`, `agent:drafts`).
- Claude API ile taslak üretimi (model varsayılanı `claude-opus-4-8`); çıktı `drafts/*.md` `durumu: taslak`.
- `.github/workflows/trend-discovery.yml`: haftalık cron + elle tetik → PR açar (insan onayı).
- Kalite kapısı yeşil: test 29/29 (19 yeni) · lint 0/0 · build 13 sayfa. Script tsx ile uçtan uca çalışır (RSS bu ortamda egress ile engelli; CI'da erişilebilir).
- **Kullanıcı aksiyonu gerekli:** GitHub repo → Settings → Secrets → Actions → `ANTHROPIC_API_KEY` ekle (taslak üretimi için).

### Sırada (Sonraki adım)
- İlk gerçek çalıştırma: secret eklenince workflow'u elle tetikle (workflow_dispatch) → üretilen taslakları PR'da incele/onayla.
- Kullanıcıdan açık TBD'lerin yanıtları beklenir (aşağıya bkz.).

### Açık Sorular / TBD
- ~~Marka adı + domain~~ → **Çözüldü (2026-06-14):** "Satıcı Kutusu" / saticikutusu.com (ADR-006). `site` URL güncellendi.
- Marka rengi (Tailwind teması şu an nötr)
- Gerçek yazar kimliği + biyografi (E-E-A-T)
- Araç fiyatları & affiliate komisyon oranları (uydurulmadı, TBD)
- Bülten sağlayıcısı + Analytics sağlayıcısı
- AdSense yayıncı kimliği (script onay sonrası kullanıcı tarafından aktive edilecek)
