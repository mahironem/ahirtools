# AhirTools yeni portal — ilk aşama
Bu klasör, **/portal/** altında bağımsız yeni platform önizlemesidir.

## Güvenli geçiş
- Mevcut kök **/index.html** ve çalışan Ordular / Ordu Arşivi / Rakipler / Operasyon Kurgu modülleri değiştirilmedi.
- /portal/ yalnızca yeni menü, ana sayfa, tema ve paylaşılabilir bağlantıları gösterir; Supabase'e bağlanmaz.
- Menü sayfaları fiziksel **dizin/index.html** dosyalarıdır, dolayısıyla doğrudan açılabilir ve paylaşılabilir.
- **assets/nav.js** menü yapısı, **assets/app.js** ortak arayüz davranışı, **assets/styles.css** tema / düzen.
- Bu ilk sürümde "mevcut çalışan araç" bağlantıları eski kök panele gider. Modüller yeni adreslerine sonraki adımlarda gerçek anlamda taşınacak.
- Yeni portalın varsayılan teması koyu; açık tema denemesi çalışır, tarayıcıya kaydedilir.

## İleride
1. Sunucu seçimi: dünya kimliğiyle ayrılmış kayıtlar, sunucu bazında yetki ve veri saklama.
2. Harita geçmişi: son 7–8 günlük map.sql nüfus anlık görüntüsü; pasif oyuncu bulucu. Henüz veri toplamıyoruz.
3. Ekip Ruhu: Supabase Auth, gerçek roller/RLS ve güvenli oyuncu görevleri kurulmadan canlı veriler kullanılmayacak.
4. Eski index.html'deki modülleri kademeli olarak ayrı dosyalara ve doğrudan açılabilir URL'lere taşı.
5. Veri migrasyonlarından önce test ortamının ayrıca yedeği alınacak.

Son başarılı kaynak kopyası: `backup/test-2026-11-23-menu-oncesi`.
