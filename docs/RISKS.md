# RISKS — Risk Analizi

> Son güncelleme: 2026-06-14
> Olasılık/Etki: Düşük / Orta / Yüksek.

## Teknik Riskler
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| İçerik hacmi büyüdükçe build süresi artışı | Orta | Orta | Artımlı build; gerekirse içerik DB'si (ADR-002 yeniden değerlendir). |
| Bağımlılık şişmesi / bakım yükü | Orta | Orta | Her paket gerekçelendirilir; minimum tutulur (AI ajan kuralı #9). |
| Astro/entegrasyon kırıcı sürüm güncellemeleri | Düşük | Orta | Sürümler pinlenir; CI'da build kontrolü. |

## Operasyonel Riskler
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| Düzenli nitelikli içerik üretiminin sürdürülememesi | Orta | Yüksek | Faz 2 ajan taslak üretir (yayın değil); editöryel takvim. |
| Editöryel kapının atlanması (yanlış otomatik yayın) | Düşük | Yüksek | Build yalnızca `durumu: yayinda` alır; kod incelemesi. |

## Finansal Riskler
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| AdSense onayının gecikmesi/reddi | Orta | Orta | Önce yeterli nitelikli içerik; script onay sonrası aktive. |
| Affiliate gelirinin düşük olması | Orta | Orta | Tekrarlayan komisyonlu SaaS odaklı seçim; A/B (Faz 3). |

## Güvenlik Riskleri
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| Gizli anahtar sızıntısı (commit) | Düşük | Yüksek | `.gitignore` + `.env`; yalnızca `PUBLIC_` istemciye; secret scanning. |
| Affiliate/dış link kötüye kullanımı | Düşük | Orta | `rel="sponsored nofollow"`; güvenilir kaynak. |
| Bülten formu kötüye kullanımı (spam/XSS) | Orta | Orta | Girdi doğrulama; sağlayıcı tarafı koruma (Faz 3). |

## Ölçeklenebilirlik Riskleri
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| Trafik artışında dağıtım darboğazı | Düşük | Düşük | Statik + CDN (Vercel/Netlify) yatay ölçek. |

## Bakım Riskleri
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| Doküman-kod senkron kaybı | Orta | Orta | Aşama 10 sürekli dokümantasyon; ilgili doküman güncellenir. |
| Affiliate linklerin kırılması | Orta | Orta | Tek kaynak `affiliate.config.ts`; periyodik kontrol. |

## Yasal Riskler (KVKK / GDPR)
| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| **Google scaled content abuse cezası** | Orta | **Yüksek** | **Her yazı özgün değer + insan onayı; otomatik yayın yasak.** |
| Bülten ile kişisel veri (e-posta) işleme | Orta | Yüksek | Açık rıza, gizlilik politikası, sağlayıcı sözleşmesi (KVKK/GDPR). TBD: hukuki metin. |
| Affiliate ilişkisinin ifşa edilmemesi | Düşük | Orta | Görünür ifşa + `affiliate-aciklama` sayfası. |
