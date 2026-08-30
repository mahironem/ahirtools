// Sunucu belleğinde harita verisini tutar
let cachedMapText = null;
let lastFetchTime = 0;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { x, y } = req.query;
  if (x === undefined || y === undefined) {
    return res.status(400).json({ error: "X ve Y koordinatı zorunludur." });
  }

  const targetX = parseInt(x, 10);
  const targetY = parseInt(y, 10);

  if (isNaN(targetX) || isNaN(targetY)) {
    return res.status(400).json({ error: "Geçersiz koordinat." });
  }

  try {
    const now = Date.now();
    // 1 saatte bir Travian'dan güncel map.sql dosyasını indirir
    if (!cachedMapText || (now - lastFetchTime) > 3600000) {
      const mapRes = await fetch("https://ts11.x1.europe.travian.com/map.sql");
      if (!mapRes.ok) {
        throw new Error("Travian sunucusundan map.sql çekilemedi.");
      }
      cachedMapText = await mapRes.text();
      lastFetchTime = now;
    }

    // Hedef koordinatı harita metni içinde anında arar
    const regex = new RegExp(
      `\\((\\d+),\\s*${targetX},\\s*${targetY},\\s*(\\d+),\\s*(\\d+),\\s*'((?:[^'\\\\]|\\\\.)*)',\\s*(\\d+),\\s*'((?:[^'\\\\]|\\\\.)*)',\\s*(\\d+),\\s*'((?:[^'\\\\]|\\\\.)*)',\\s*(\\d+)`
    );

    const match = regex.exec(cachedMapText);

    if (!match) {
      return res.status(200).json({ found: false, message: "Köy bulunamadı." });
    }

    const IRK_KODLARI = { 1: "Roma", 2: "Cermen", 3: "Galya", 4: "Doğa", 5: "Natar", 6: "Hun", 7: "Mısır" };
    const tid = parseInt(match[2], 10);

    return res.status(200).json({
      found: true,
      id: parseInt(match[1], 10),
      x: targetX,
      y: targetY,
      irk: IRK_KODLARI[tid] || "Roma",
      koy_adi: match[4].replace(/\\'/g, "'"),
      oyuncu_id: parseInt(match[5], 10),
      oyuncu_adi: match[6].replace(/\\'/g, "'"),
      birlik_id: parseInt(match[7], 10),
      birlik_adi: match[8].replace(/\\'/g, "'"),
      nufus: parseInt(match[9], 10)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
