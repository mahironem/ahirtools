const MAP_URL = "https://ts11.x1.europe.travian.com/map.sql";

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  try {
    const response = await fetch(MAP_URL);
    if (!response.ok) {
      return res.status(500).json({ error: "Travian map.sql indirilemedi." });
    }
    const sqlText = await response.text();

    const IRK_KODLARI = { 1: "Roma", 2: "Cermen", 3: "Galya", 4: "Doğa", 5: "Natar", 6: "Hun", 7: "Mısır" };
    const regex = /\((\d+),\s*(-?\d+),\s*(-?\d+),\s*(\d+),\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+)/g;

    const harita = {};
    let match;
    let count = 0;

    while ((match = regex.exec(sqlText)) !== null) {
      const x = match[2];
      const y = match[3];
      const tid = parseInt(match[4], 10);
      const koy = match[6].replace(/\\'/g, "'").replace(/&#39;/g, "'");
      const oyuncu = match[8].replace(/\\'/g, "'").replace(/&#39;/g, "'");
      const birlik = match[10].replace(/\\'/g, "'").replace(/&#39;/g, "'");
      const irk = IRK_KODLARI[tid] || "Roma";
      const nufus = parseInt(match[11], 10);

      harita[`${x}|${y}`] = [koy, oyuncu, irk, birlik, nufus];
      count++;
    }

    return res.status(200).json({
      success: true,
      count: count,
      updated: new Date().toISOString(),
      harita: harita
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
