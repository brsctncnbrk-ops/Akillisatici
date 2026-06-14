# scripts/

Faz 2'de **trend keşif ajanı** ve yardımcı scriptler buraya gelecek.

Planlanan ajan akışı (bkz. `docs/ROADMAP.md` Faz 2):

1. Kaynakları tara (Google Trends, Google News RSS, Product Hunt, Reddit).
2. Alaka filtresi: yalnızca "online satıcılar için AI" + Türkiye pazarı.
3. Skorlama: talep ↑, rekabet ↓, gelir potansiyeli (affiliate var mı) → 0-100.
4. En yüksek skorlu konular için yapılandırılmış brief üret.
5. Brief'leri `drafts/` altına `durumu: taslak` olarak yaz.
6. GitHub Actions ile günlük/haftalık cron.

**Kritik kural:** Ajan doğrudan yayın YAPMAZ; yalnızca taslak üretir.
