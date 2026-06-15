# HANDOFF — Oturum Devri

> **Birincil oturum devri dosyası.** Her oturum sonunda burayı güncelle: ne yapıldı,
> sırada ne var, açık sorular. `docs/TASKS.md` "Oturum Günlüğü" bu dosyaya yönlendirir.
> (Bu önceliklendirme `docs/DECISIONS.md` ADR-004'te gerekçelendirildi.)

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
- ~~Bülten sağlayıcısı~~ → **Çözüldü (2026-06-15):** Kit (ConvertKit) ücretsiz; sunucusuz embed POST (ADR-009). Analytics sağlayıcısı hâlâ TBD.
- AdSense yayıncı kimliği (script onay sonrası kullanıcı tarafından aktive edilecek)

---

## Oturum: 2026-06-15 — Bülten sağlayıcısı (Kit / ücretsiz)

### Yapıldı
- Bülten için **Kit (ConvertKit)** ücretsiz katmanı seçildi (ADR-009; kullanıcı "tamamen ücretsiz" istedi).
- `src/components/NewsletterSignup.astro` yeniden yazıldı: yapılandırılmışsa form doğrudan Kit'in
  genel embed uç noktasına (`https://app.kit.com/forms/<ID>/subscriptions`, alan `email_address`) POST eder;
  değişken yoksa eski "yakında" devre dışı durumu render edilir. Üçüncü taraf JS yok, secret yok.
- `.env.example`: eski `NEWSLETTER_*` yerine `PUBLIC_KIT_FORM_ID` / `PUBLIC_KIT_FORM_ACTION` (PUBLIC, secret değil).
- `docs/DEPLOYMENT.md`: Kit kurulum + Vercel env adımları. `docs/DECISIONS.md`: ADR-009.
- Kalite kapısı yeşil: lint 0 hata · test 27/27 · build 20 sayfa. Aktif yol da doğrulandı (form ID'li build çıktısı).

### Kullanıcı aksiyonu gerekli
1. https://kit.com → ücretsiz hesap → form oluştur, **double opt-in açık** (KVKK/GDPR).
2. Form ID'sini Vercel → Settings → Environment Variables → `PUBLIC_KIT_FORM_ID` olarak ekle → redeploy.
   (Boş bırakılırsa form "yakında" görünmeye devam eder; build kırılmaz.)
