# AhirTools / Tablolar → Askerler (T4.6)

Bu araç `/portal/tablolar/askerler/` adresinde, çalışan diğer modüllerden ayrı bir sayfadır.
Supabase'e veya kullanıcı hesaplarına bağlanmaz; yalnızca yerel istemci tarafı hesaplar üretir.

## Kapsam (24 Kasım 2026)
- 9 kabile, her biri 10 birlik: Roma, Cermen, Galya, Doğa, Natarlar, Mısır, Hun, Sparta ve Vikingler.
- Sabit veriler: saldırı, piyade/süvari savunması, hız, taşıma, maliyetler ve tahıl tüketimi.
- T4.6 1x / 2x / 3x / 5x / 10x seçenekleri.
- Seçilen birimin demirci seviyesi 0–20 için saldırı/savunma tablosu.
- Eğitim binası 1–20; piyade ve süvari miğferleri %10 / %15 / %20; birlik eğitim bonusu %2–%10; hızlı eğitim tılsımı 1/2 veya 3/4.
- Ayrı metalürji birlik bonusu %2–%10; dinamik paylaşılabilir URL.

## Hesaplama kuralları

- Hareket hızı çarpanı: 1x → 1, 2x → 2, 3x → 2, 5x → 2, 10x → 4.
- Eğitim süresi (milli saniye değil, saniye): `birim.t × 0.9^(eğitim_binası_seviyesi-1) / dünya_hızı × (1 - geçerli_miğfer/100) × (1 - eğitim_birlik_bonusu/100) × eğitim_tılsımı`.
- Eğitim miğferleri yalnızca ilgili piyade veya süvari eğitim binasındaki birimleri etkiler. Eğitim tılsımı ve birlik eğitimi bonusu piyade, süvari, kuşatma üretimini etkiler. Köşk/Saray için uygulanmaz.
- Demirci: `taban + (taban + 300 × tahıl_tüketimi/7) × (1.007^demirci_seviyesi - 1)`. Metalürji bundan sonra çarpan `1+metalurji/100` olarak eklenir.
- NPC doğa/Natar, reis ve göçmen birliklerine demirci bonusu uygulanmaz.
- T4.6 modeline göre örnek: Galyalı Phalanx, Kışla 7, 1x dünya, %10 eğitim bonusu, miğfersiz → 8:17. 2x → 4:09.

## Veri kaynakları

1. Kirilloid sayısal T4 ve T4.fs verileri: https://github.com/kirilloid/travian/tree/master/src/model
2. Travian Legends resmî dünya hızı: https://support.travian.com/en/articles/20-game-versions-and-speed
3. Travian Legends resmî Viking tablosu: https://support.travian.com/en/articles/139-vikings-in-travian-legends
4. Travian Legends birim karşılaştırması: https://support.travian.com/en/articles/187-infantry-and-cavalry-units-comparison-table
5. Travian Legends demirci: https://support.travian.com/en/articles/40-troop-upgrades-and-smithy
6. Travian Legends kahraman miğferleri: https://support.travian.com/en/articles/93-hero-armour-items
7. Travian Legends tılsımlar: https://support.travian.com/en/articles/102-artefact-effects
8. Travian Legends birlik bonusları: https://support.travian.com/en/articles/88-alliance-bonuses
9. Sparta birim maliyetleri çapraz kontrol: https://www.pilotrav.com/blog/travian-troop-costs-and-crop-upkeep
10. Demirci matematiği açıklaması: https://unofficialtravian.com/2025/01/game-secrets-smithy-and-total-strength-of-an-army/

## Dikkat edilmesi gerekenler

- Bazı özel oyun dünyalarında birim istatistikleri, eğitim sistemi ve özel binalar değişebilir; bu sayfa genel T4.6 referansını temel alır.
- Kirilloid'in kamuya açık modelinde Sparta/Viking verileri yoktur; ayrıca resmî/topluluk kaynaklarından derlendi.
- Sparta Efor ve Göçmenin **dört ayrı kaynak miktarı** güvenilir biçimde doğrulanamadığı için `—` gösterilir; toplam maliyet gösterilir.
- Doğa ve Natar birlikleri eğitilemez; eğitim maliyeti ve süre hesabı gösterilmez.
- **Demirci yükseltme araştırma maliyeti/süresi** ilk sürüme dahil değildir: tablo savaş istatistiklerini gösterir. Formül/veri doğrulamadan sayı üretmeyin.
- Başka bir oyun sürümüne geçilirse `troops-data.js` içine sürüm bazlı kayıt eklenmeli; bu değerleri varsayılan T4.6 üstüne sessizce yazmayın.
