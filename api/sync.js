module.exports = async (req, res) => {
  try {
    const MAP_URL = "https://ts11.x1.europe.travian.com/map.sql";
    const SUPABASE_URL = "https://tsvuouufkmfikgtpuafb.supabase.co/rest/v1/harita";
    const SUPABASE_KEY = "sb_publishable_RZdSsnQJtExtKixTfKqnTQ_EUUuFs83";

    // 1. Travian sunucusundan map.sql dosyasını indir
    const response = await fetch(MAP_URL);
    if (!response.ok) {
      return res.status(500).json({ error: "Travian map.sql indirilemedi: " + response.statusText });
    }
    const sqlText = await response.text();

    const IRK_KODLARI = { 1: "Roma", 2: "Cermen", 3: "Galya", 4: "Doğa", 5: "Natar", 6: "Hun", 7: "Mısır" };
    const regex = /\((\d+),\s*(-?\d+),\s*(-?\d+),\s*(\d+),\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+)/g;

    const kayitlar = [];
    let match;
    while ((match = regex.exec(sqlText)) !== null) {
      const tid = parseInt(match[4]);
      kayitlar.push({
        id: parseInt(match[1]),
        x: parseInt(match[2]),
        y: parseInt(match[3]),
        irk_id: tid,
        irk: IRK_KODLARI[tid] || "Bilinmiyor",
        koy_adi: match[6].replace(/\\'/g, "'"),
        oyuncu_id: parseInt(match[7]),
        oyuncu_adi: match[8].replace(/\\'/g, "'"),
        birlik_id: parseInt(match[9]),
        birlik_adi: match[10].replace(/\\'/g, "'"),
        nufus: parseInt(match[11])
      });
    }

    if (kayitlar.length === 0) {
      return res.status(400).json({ error: "Harita verisi ayrıştırılamadı." });
    }

    // 2. 500'erli paketlerle doğrudan Supabase'e yaz
    const batchSize = 500;
    let basarili = 0;
    let sonHata = null;

    for (let i = 0; i < kayitlar.length; i += batchSize) {
      const batch = kayitlar.slice(i, i + batchSize);
      const postRes = await fetch(SUPABASE_URL, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(batch)
      });

      if (postRes.ok) {
        basarili += batch.length;
      } else {
        sonHata = await postRes.text();
      }
    }

    if (basarili === 0 && sonHata) {
      return res.status(500).json({ error: "Supabase kayıt hatası: " + sonHata });
    }

    return res.status(200).json({
      success: true,
      message: `${basarili} adet köy veritabanına başarıyla aktarıldı.`,
      toplam_koy: kayitlar.length,
      guncelleme: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
