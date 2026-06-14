# drafts/

Faz 2'de trend keşif ajanının ürettiği **onay bekleyen taslaklar** buraya yazılır
(`durumu: taslak`). Bu klasördeki hiçbir içerik build'e dahil edilmez.

**Editöryel akış:** İnsan onayı sonrası taslak `durumu: yayinda` yapılıp
`src/content/posts/` altına taşınır. Ajan ASLA doğrudan `src/content/`'a yayın yapmaz.

## İş akışı (Faz 2 hattı)

1. **Keşif** — `npm run agent:discover`: RSS kaynaklarından trendleri çeker, nişe
   göre puanlar, `drafts/reports/`'a rapor yazar. LLM/secret gerektirmez.
2. **Taslak üretimi** — `npm run agent:drafts`: en iyi N konu için Claude API ile
   Türkçe taslak üretip buraya `YYYY-AA-GG-slug.md` olarak yazar. `ANTHROPIC_API_KEY`
   gerektirir. Adet `DRAFT_COUNT` ile ayarlanır (varsayılan 2).
3. **Editöryel onay (insan)** — editör okur/düzenler, TBD verileri teyit eder,
   dosyayı `src/content/posts/`'a taşıyıp `durumu: yayinda` yapar ve kalite
   kapısından geçirir.

## Otomasyon

`.github/workflows/trend-discovery.yml` bu hattı zamanlanmış (cron) ve elle
tetiklenebilir biçimde çalıştırır; ürettiği taslakları **otomatik bir Pull Request**
olarak açar. Merge ve yayın kararı tamamen insandadır.

Bkz. `docs/ARCHITECTURE.md` (Editöryel Veri Akışı) ve `docs/AI_AGENT_RULES.md`.
