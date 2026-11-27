/* AhirTools asker veri modeli; kaynaklar ve sınırlamalar sourceLinks/note içinde.
   Kirilloid'in kullanıcı arayüzü veya oyun görselleri kopyalanmamıştır. */
window.AHIR_TROOPS = {
  "version": "T4.6",
  "updated": "2026-11-27",
  "note": "İlk yedi kabilenin temel istatistikleri Kirilloid t4/t4.fs sayısal modelinden; Vikingler Travian Legends resmî 2026 tablosundan; Spartalılar resmî kıyaslama ve topluluk maliyet tablolarından derlendi. Özel sunucu denge değişiklikleri olabilir. Spartalı Ephor ve Settler kaynak dağılımları Siegewise topluluk tablosundan alınmıştır. Akademi gereksinimleri ve baz araştırma süreleri Kirilloid eski modeline dayanır.",
  "sourceLinks": [
    "https://github.com/kirilloid/travian/tree/master/src/model",
    "https://support.travian.com/en/articles/20-game-versions-and-speed",
    "https://support.travian.com/en/articles/139-vikings-in-travian-legends",
    "https://support.travian.com/en/articles/187-infantry-and-cavalry-units-comparison-table",
    "https://www.pilotrav.com/blog/travian-troop-costs-and-crop-upkeep",
    "https://siegewise.com/en/travian/units/spartans",
    "https://support.travian.com/en/articles/187-infantry-and-cavalry-units-comparison-table"
  ],
  "tribes": [
    {
      "id": "romans",
      "name": "Romalılar",
      "playable": true,
      "units": [
        {
          "id": "romans-0",
          "name": "Lejyoner",
          "type": "infantry",
          "building": "barracks",
          "a": 40,
          "di": 35,
          "dc": 50,
          "v": 6,
          "p": 50,
          "u": 1,
          "c": [
            120,
            100,
            150,
            30
          ],
          "t": 1600,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {},
          "researchTime": 0
        },
        {
          "id": "romans-1",
          "name": "Pretoryan",
          "type": "infantry",
          "building": "barracks",
          "a": 30,
          "di": 65,
          "dc": 35,
          "v": 5,
          "p": 20,
          "u": 1,
          "c": [
            100,
            130,
            160,
            70
          ],
          "t": 1760,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 1,
            "smithy": 1
          },
          "researchTime": 7080
        },
        {
          "id": "romans-2",
          "name": "Emperyan",
          "type": "infantry",
          "building": "barracks",
          "a": 70,
          "di": 40,
          "dc": 25,
          "v": 7,
          "p": 50,
          "u": 1,
          "c": [
            150,
            160,
            210,
            80
          ],
          "t": 1920,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "smithy": 1
          },
          "researchTime": 7560
        },
        {
          "id": "romans-3",
          "name": "Equites Legati",
          "type": "scout",
          "building": "stable",
          "a": 0,
          "di": 20,
          "dc": 10,
          "v": 16,
          "p": 0,
          "u": 2,
          "c": [
            140,
            160,
            20,
            40
          ],
          "t": 1360,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 1,
            "stable": 1
          },
          "researchTime": 5880
        },
        {
          "id": "romans-4",
          "name": "Equites Imperatoris",
          "type": "cavalry",
          "building": "stable",
          "a": 120,
          "di": 65,
          "dc": 50,
          "v": 14,
          "p": 100,
          "u": 3,
          "c": [
            550,
            440,
            320,
            100
          ],
          "t": 2640,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 5
          },
          "researchTime": 9720
        },
        {
          "id": "romans-5",
          "name": "Equites Caesaris",
          "type": "cavalry",
          "building": "stable",
          "a": 180,
          "di": 80,
          "dc": 105,
          "v": 10,
          "p": 70,
          "u": 4,
          "c": [
            550,
            640,
            800,
            180
          ],
          "t": 3520,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 10
          },
          "researchTime": 12360
        },
        {
          "id": "romans-6",
          "name": "Koçbaşı",
          "type": "ram",
          "building": "workshop",
          "a": 60,
          "di": 30,
          "dc": 75,
          "v": 4,
          "p": 0,
          "u": 3,
          "c": [
            900,
            360,
            500,
            70
          ],
          "t": 4600,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 10,
            "workshop": 1
          },
          "researchTime": 15600
        },
        {
          "id": "romans-7",
          "name": "Ateş Mancınığı",
          "type": "catapult",
          "building": "workshop",
          "a": 75,
          "di": 60,
          "dc": 10,
          "v": 3,
          "p": 0,
          "u": 6,
          "c": [
            950,
            1350,
            600,
            90
          ],
          "t": 9000,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "workshop": 10
          },
          "researchTime": 28800
        },
        {
          "id": "romans-8",
          "name": "Senatör",
          "type": "chief",
          "building": "residence",
          "a": 50,
          "di": 40,
          "dc": 30,
          "v": 4,
          "p": 0,
          "u": 5,
          "c": [
            30750,
            27200,
            45000,
            37500
          ],
          "t": 90700,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 20,
            "rally": 10
          },
          "researchTime": 24475
        },
        {
          "id": "romans-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 0,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "u": 1,
          "c": [
            5800,
            5300,
            7200,
            5500
          ],
          "t": 26900,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "expansion": 10
          },
          "researchTime": 0
        }
      ]
    },
    {
      "id": "teutons",
      "name": "Cermenler",
      "playable": true,
      "units": [
        {
          "id": "teutons-0",
          "name": "Tokmak Sallayan",
          "type": "infantry",
          "building": "barracks",
          "a": 40,
          "di": 20,
          "dc": 5,
          "v": 7,
          "p": 60,
          "u": 1,
          "c": [
            95,
            75,
            40,
            40
          ],
          "t": 720,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {},
          "researchTime": 0
        },
        {
          "id": "teutons-1",
          "name": "Mızrakçı",
          "type": "infantry",
          "building": "barracks",
          "a": 10,
          "di": 35,
          "dc": 60,
          "v": 7,
          "p": 40,
          "u": 1,
          "c": [
            145,
            70,
            85,
            40
          ],
          "t": 1120,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 1,
            "barracks": 3
          },
          "researchTime": 5160
        },
        {
          "id": "teutons-2",
          "name": "Balta Sallayan",
          "type": "infantry",
          "building": "barracks",
          "a": 60,
          "di": 30,
          "dc": 30,
          "v": 6,
          "p": 50,
          "u": 1,
          "c": [
            130,
            120,
            170,
            70
          ],
          "t": 1200,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 3,
            "smithy": 1
          },
          "researchTime": 5400
        },
        {
          "id": "teutons-3",
          "name": "Casus",
          "type": "scout",
          "building": "stable",
          "a": 0,
          "di": 10,
          "dc": 5,
          "v": 9,
          "p": 0,
          "u": 1,
          "c": [
            160,
            100,
            50,
            50
          ],
          "t": 1120,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 1,
            "main": 5
          },
          "researchTime": 5160
        },
        {
          "id": "teutons-4",
          "name": "Paladin",
          "type": "cavalry",
          "building": "stable",
          "a": 55,
          "di": 100,
          "dc": 40,
          "v": 10,
          "p": 110,
          "u": 2,
          "c": [
            370,
            270,
            290,
            75
          ],
          "t": 2400,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 3
          },
          "researchTime": 9000
        },
        {
          "id": "teutons-5",
          "name": "Toyton",
          "type": "cavalry",
          "building": "stable",
          "a": 150,
          "di": 50,
          "dc": 75,
          "v": 9,
          "p": 80,
          "u": 3,
          "c": [
            450,
            515,
            480,
            80
          ],
          "t": 2960,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "stable": 10
          },
          "researchTime": 10680
        },
        {
          "id": "teutons-6",
          "name": "Koçbaşı",
          "type": "ram",
          "building": "workshop",
          "a": 65,
          "di": 30,
          "dc": 80,
          "v": 4,
          "p": 0,
          "u": 3,
          "c": [
            1000,
            300,
            350,
            70
          ],
          "t": 4200,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 10,
            "workshop": 1
          },
          "researchTime": 14400
        },
        {
          "id": "teutons-7",
          "name": "Mancınık",
          "type": "catapult",
          "building": "workshop",
          "a": 50,
          "di": 60,
          "dc": 10,
          "v": 3,
          "p": 0,
          "u": 6,
          "c": [
            900,
            1200,
            600,
            60
          ],
          "t": 9000,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "workshop": 10
          },
          "researchTime": 28800
        },
        {
          "id": "teutons-8",
          "name": "Reis",
          "type": "chief",
          "building": "residence",
          "a": 40,
          "di": 60,
          "dc": 40,
          "v": 4,
          "p": 0,
          "u": 4,
          "c": [
            35500,
            26600,
            25000,
            27200
          ],
          "t": 70500,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 20,
            "rally": 5
          },
          "researchTime": 19425
        },
        {
          "id": "teutons-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 10,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "u": 1,
          "c": [
            7200,
            5500,
            5800,
            6500
          ],
          "t": 31000,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "expansion": 10
          },
          "researchTime": 0
        }
      ]
    },
    {
      "id": "gauls",
      "name": "Galyalılar",
      "playable": true,
      "units": [
        {
          "id": "gauls-0",
          "name": "Phalanx",
          "type": "infantry",
          "building": "barracks",
          "a": 15,
          "di": 40,
          "dc": 50,
          "v": 7,
          "p": 35,
          "u": 1,
          "c": [
            100,
            130,
            55,
            30
          ],
          "t": 1040,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {},
          "researchTime": 0
        },
        {
          "id": "gauls-1",
          "name": "Kılıçlı",
          "type": "infantry",
          "building": "barracks",
          "a": 65,
          "di": 35,
          "dc": 20,
          "v": 6,
          "p": 45,
          "u": 1,
          "c": [
            140,
            150,
            185,
            60
          ],
          "t": 1440,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 3,
            "smithy": 3
          },
          "researchTime": 6120
        },
        {
          "id": "gauls-2",
          "name": "Casus",
          "type": "scout",
          "building": "stable",
          "a": 0,
          "di": 20,
          "dc": 10,
          "v": 17,
          "p": 0,
          "u": 2,
          "c": [
            170,
            150,
            20,
            40
          ],
          "t": 1360,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 1
          },
          "researchTime": 5880
        },
        {
          "id": "gauls-3",
          "name": "Toytatın Şimşeği",
          "type": "cavalry",
          "building": "stable",
          "a": 100,
          "di": 25,
          "dc": 40,
          "v": 19,
          "p": 75,
          "u": 2,
          "c": [
            350,
            450,
            230,
            60
          ],
          "t": 2480,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 3
          },
          "researchTime": 9240
        },
        {
          "id": "gauls-4",
          "name": "Druyid",
          "type": "cavalry",
          "building": "stable",
          "a": 45,
          "di": 115,
          "dc": 55,
          "v": 16,
          "p": 35,
          "u": 2,
          "c": [
            360,
            330,
            280,
            120
          ],
          "t": 2560,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 5
          },
          "researchTime": 9480
        },
        {
          "id": "gauls-5",
          "name": "Heduan",
          "type": "cavalry",
          "building": "stable",
          "a": 140,
          "di": 60,
          "dc": 165,
          "v": 13,
          "p": 65,
          "u": 3,
          "c": [
            500,
            620,
            675,
            170
          ],
          "t": 3120,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "stable": 10
          },
          "researchTime": 11160
        },
        {
          "id": "gauls-6",
          "name": "Koçbaşı",
          "type": "ram",
          "building": "workshop",
          "a": 50,
          "di": 30,
          "dc": 105,
          "v": 4,
          "p": 0,
          "u": 3,
          "c": [
            950,
            555,
            330,
            75
          ],
          "t": 5000,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 10,
            "workshop": 1
          },
          "researchTime": 16800
        },
        {
          "id": "gauls-7",
          "name": "Mancınık",
          "type": "catapult",
          "building": "workshop",
          "a": 70,
          "di": 45,
          "dc": 10,
          "v": 3,
          "p": 0,
          "u": 6,
          "c": [
            960,
            1450,
            630,
            90
          ],
          "t": 9000,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "workshop": 10
          },
          "researchTime": 28800
        },
        {
          "id": "gauls-8",
          "name": "Kabile Reisi",
          "type": "chief",
          "building": "residence",
          "a": 40,
          "di": 50,
          "dc": 50,
          "v": 5,
          "p": 0,
          "u": 4,
          "c": [
            30750,
            45400,
            31000,
            37500
          ],
          "t": 90700,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "academy": 20,
            "rally": 10
          },
          "researchTime": 24475
        },
        {
          "id": "gauls-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 0,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "u": 1,
          "c": [
            5500,
            7000,
            5300,
            4900
          ],
          "t": 22700,
          "source": "kirilloid-t4",
          "trainable": true,
          "requirements": {
            "expansion": 10
          },
          "researchTime": 0
        }
      ]
    },
    {
      "id": "nature",
      "name": "Doğa",
      "playable": false,
      "units": [
        {
          "id": "nature-0",
          "name": "Fare",
          "type": "infantry",
          "building": "barracks",
          "a": 10,
          "di": 25,
          "dc": 20,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            100
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-1",
          "name": "Örümcek",
          "type": "infantry",
          "building": "barracks",
          "a": 20,
          "di": 35,
          "dc": 40,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-2",
          "name": "Yılan",
          "type": "infantry",
          "building": "barracks",
          "a": 60,
          "di": 40,
          "dc": 60,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-3",
          "name": "Yarasa",
          "type": "infantry",
          "building": "barracks",
          "a": 80,
          "di": 66,
          "dc": 50,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-4",
          "name": "Yaban Domuzu",
          "type": "infantry",
          "building": "barracks",
          "a": 50,
          "di": 70,
          "dc": 33,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-5",
          "name": "Kurt",
          "type": "infantry",
          "building": "barracks",
          "a": 100,
          "di": 80,
          "dc": 70,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-6",
          "name": "Ayı",
          "type": "infantry",
          "building": "barracks",
          "a": 250,
          "di": 140,
          "dc": 200,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-7",
          "name": "Timsah",
          "type": "infantry",
          "building": "barracks",
          "a": 450,
          "di": 380,
          "dc": 240,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-8",
          "name": "Kaplan",
          "type": "infantry",
          "building": "barracks",
          "a": 200,
          "di": 170,
          "dc": 250,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "nature-9",
          "name": "Fil",
          "type": "infantry",
          "building": "barracks",
          "a": 600,
          "di": 440,
          "dc": 520,
          "v": 20,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        }
      ]
    },
    {
      "id": "natars",
      "name": "Natarlar",
      "playable": false,
      "units": [
        {
          "id": "natars-0",
          "name": "Sipahi",
          "type": "infantry",
          "building": "barracks",
          "a": 20,
          "di": 35,
          "dc": 50,
          "v": 6,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-1",
          "name": "Kalkan Kıran",
          "type": "infantry",
          "building": "barracks",
          "a": 65,
          "di": 30,
          "dc": 10,
          "v": 7,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-2",
          "name": "Natar Muhafızı",
          "type": "infantry",
          "building": "barracks",
          "a": 100,
          "di": 90,
          "dc": 75,
          "v": 6,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-3",
          "name": "Natar Kartalı",
          "type": "scout",
          "building": "barracks",
          "a": 0,
          "di": 10,
          "dc": 10,
          "v": 25,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-4",
          "name": "Baltalı",
          "type": "infantry",
          "building": "barracks",
          "a": 155,
          "di": 80,
          "dc": 50,
          "v": 14,
          "p": 0,
          "u": 2,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-5",
          "name": "Natar Şövalyesi",
          "type": "infantry",
          "building": "barracks",
          "a": 170,
          "di": 140,
          "dc": 80,
          "v": 12,
          "p": 0,
          "u": 3,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-6",
          "name": "Savaş Fili",
          "type": "ram",
          "building": "workshop",
          "a": 250,
          "di": 120,
          "dc": 150,
          "v": 5,
          "p": 0,
          "u": 4,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-7",
          "name": "Kurşun Mancınığı",
          "type": "catapult",
          "building": "workshop",
          "a": 60,
          "di": 45,
          "dc": 10,
          "v": 3,
          "p": 0,
          "u": 5,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-8",
          "name": "Natar Prensi",
          "type": "chief",
          "building": "residence",
          "a": 80,
          "di": 50,
          "dc": 50,
          "v": 5,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        },
        {
          "id": "natars-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 30,
          "di": 40,
          "dc": 40,
          "v": 5,
          "p": 0,
          "u": 1,
          "c": [
            0,
            0,
            0,
            0
          ],
          "t": null,
          "source": "npc",
          "trainable": false
        }
      ]
    },
    {
      "id": "egyptians",
      "name": "Mısırlılar",
      "playable": true,
      "units": [
        {
          "id": "egyptians-0",
          "name": "Köle Milis",
          "type": "infantry",
          "building": "barracks",
          "a": 10,
          "di": 30,
          "dc": 20,
          "v": 7,
          "p": 15,
          "u": 1,
          "c": [
            45,
            60,
            30,
            15
          ],
          "t": 530,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {},
          "researchTime": 0
        },
        {
          "id": "egyptians-1",
          "name": "Kül Bekçisi",
          "type": "infantry",
          "building": "barracks",
          "a": 30,
          "di": 55,
          "dc": 40,
          "v": 6,
          "p": 50,
          "u": 1,
          "c": [
            115,
            100,
            145,
            60
          ],
          "t": 1320,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 3,
            "smithy": 1
          },
          "researchTime": 5760
        },
        {
          "id": "egyptians-2",
          "name": "Kopeş Savaşçısı",
          "type": "infantry",
          "building": "barracks",
          "a": 65,
          "di": 50,
          "dc": 20,
          "v": 7,
          "p": 45,
          "u": 1,
          "c": [
            170,
            180,
            220,
            80
          ],
          "t": 1440,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 1
          },
          "researchTime": 6120
        },
        {
          "id": "egyptians-3",
          "name": "Sopdu Kâşifi",
          "type": "scout",
          "building": "stable",
          "a": 0,
          "di": 20,
          "dc": 10,
          "v": 16,
          "p": 0,
          "u": 2,
          "c": [
            170,
            150,
            20,
            40
          ],
          "t": 1360,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 3
          },
          "researchTime": 5880
        },
        {
          "id": "egyptians-4",
          "name": "Anhur Bekçisi",
          "type": "cavalry",
          "building": "stable",
          "a": 50,
          "di": 110,
          "dc": 50,
          "v": 15,
          "p": 50,
          "u": 2,
          "c": [
            360,
            330,
            280,
            120
          ],
          "t": 2560,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 5
          },
          "researchTime": 9480
        },
        {
          "id": "egyptians-5",
          "name": "Savaş Arabalı Reşef",
          "type": "cavalry",
          "building": "stable",
          "a": 110,
          "di": 120,
          "dc": 150,
          "v": 10,
          "p": 70,
          "u": 3,
          "c": [
            450,
            560,
            610,
            180
          ],
          "t": 3240,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "stable": 10
          },
          "researchTime": 11520
        },
        {
          "id": "egyptians-6",
          "name": "Koçbaşı",
          "type": "ram",
          "building": "workshop",
          "a": 55,
          "di": 30,
          "dc": 95,
          "v": 4,
          "p": 0,
          "u": 3,
          "c": [
            995,
            575,
            340,
            80
          ],
          "t": 4800,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 10,
            "workshop": 1
          },
          "researchTime": 16200
        },
        {
          "id": "egyptians-7",
          "name": "Taş Mancınığı",
          "type": "catapult",
          "building": "workshop",
          "a": 65,
          "di": 55,
          "dc": 10,
          "v": 3,
          "p": 0,
          "u": 6,
          "c": [
            980,
            1510,
            660,
            100
          ],
          "t": 9000,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "workshop": 10
          },
          "researchTime": 28800
        },
        {
          "id": "egyptians-8",
          "name": "Eyalet Başkanı",
          "type": "chief",
          "building": "residence",
          "a": 40,
          "di": 50,
          "dc": 50,
          "v": 4,
          "p": 0,
          "u": 4,
          "c": [
            34000,
            50000,
            34000,
            42000
          ],
          "t": 90700,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 20,
            "rally": 10
          },
          "researchTime": 24475
        },
        {
          "id": "egyptians-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 0,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "u": 1,
          "c": [
            4560,
            5890,
            4370,
            4180
          ],
          "t": 24800,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "expansion": 10
          },
          "researchTime": 0
        }
      ]
    },
    {
      "id": "huns",
      "name": "Hunlar",
      "playable": true,
      "units": [
        {
          "id": "huns-0",
          "name": "Paralı Asker",
          "type": "infantry",
          "building": "barracks",
          "a": 35,
          "di": 40,
          "dc": 30,
          "v": 6,
          "p": 50,
          "u": 1,
          "c": [
            130,
            80,
            40,
            40
          ],
          "t": 810,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {},
          "researchTime": 0
        },
        {
          "id": "huns-1",
          "name": "Okçu",
          "type": "infantry",
          "building": "barracks",
          "a": 50,
          "di": 30,
          "dc": 10,
          "v": 6,
          "p": 30,
          "u": 1,
          "c": [
            140,
            110,
            60,
            60
          ],
          "t": 1120,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 1,
            "smithy": 1
          },
          "researchTime": 5160
        },
        {
          "id": "huns-2",
          "name": "Gözcü",
          "type": "scout",
          "building": "stable",
          "a": 0,
          "di": 20,
          "dc": 10,
          "v": 19,
          "p": 0,
          "u": 2,
          "c": [
            170,
            150,
            20,
            40
          ],
          "t": 1360,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "smithy": 1
          },
          "researchTime": 5880
        },
        {
          "id": "huns-3",
          "name": "Bozkır Atlısı",
          "type": "cavalry",
          "building": "stable",
          "a": 120,
          "di": 30,
          "dc": 15,
          "v": 16,
          "p": 115,
          "u": 2,
          "c": [
            290,
            370,
            190,
            45
          ],
          "t": 2400,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 1
          },
          "researchTime": 9000
        },
        {
          "id": "huns-4",
          "name": "Nişancı",
          "type": "cavalry",
          "building": "stable",
          "a": 110,
          "di": 80,
          "dc": 70,
          "v": 15,
          "p": 105,
          "u": 2,
          "c": [
            320,
            350,
            330,
            50
          ],
          "t": 2480,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 5
          },
          "researchTime": 9240
        },
        {
          "id": "huns-5",
          "name": "Akasir Atlısı",
          "type": "cavalry",
          "building": "stable",
          "a": 180,
          "di": 60,
          "dc": 40,
          "v": 14,
          "p": 80,
          "u": 3,
          "c": [
            450,
            560,
            610,
            140
          ],
          "t": 2990,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 5,
            "stable": 10
          },
          "researchTime": 10770
        },
        {
          "id": "huns-6",
          "name": "Koçbaşı",
          "type": "ram",
          "building": "workshop",
          "a": 65,
          "di": 30,
          "dc": 90,
          "v": 4,
          "p": 0,
          "u": 3,
          "c": [
            1060,
            330,
            360,
            70
          ],
          "t": 4400,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 10,
            "workshop": 1
          },
          "researchTime": 15000
        },
        {
          "id": "huns-7",
          "name": "Mancınık",
          "type": "catapult",
          "building": "workshop",
          "a": 45,
          "di": 55,
          "dc": 10,
          "v": 3,
          "p": 0,
          "u": 6,
          "c": [
            950,
            1280,
            620,
            60
          ],
          "t": 9000,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 15,
            "workshop": 10
          },
          "researchTime": 28800
        },
        {
          "id": "huns-8",
          "name": "Logades",
          "type": "chief",
          "building": "residence",
          "a": 50,
          "di": 40,
          "dc": 30,
          "v": 5,
          "p": 0,
          "u": 4,
          "c": [
            37200,
            27600,
            25200,
            27600
          ],
          "t": 90700,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "academy": 20,
            "rally": 10
          },
          "researchTime": 24475
        },
        {
          "id": "huns-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 0,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "u": 1,
          "c": [
            6100,
            4600,
            4800,
            5400
          ],
          "t": 28950,
          "source": "kirilloid-t4fs",
          "trainable": true,
          "requirements": {
            "expansion": 10
          },
          "researchTime": 0
        }
      ]
    },
    {
      "id": "spartans",
      "name": "Spartalılar",
      "playable": true,
      "units": [
        {
          "id": "spartans-0",
          "name": "Hoplite",
          "type": "infantry",
          "building": "barracks",
          "a": 50,
          "di": 35,
          "dc": 30,
          "v": 6,
          "p": 60,
          "c": [
            110,
            185,
            110,
            35
          ],
          "u": 1,
          "t": 1700,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-1",
          "name": "Sentinel",
          "type": "scout",
          "building": "barracks",
          "a": 0,
          "di": 40,
          "dc": 22,
          "v": 9,
          "p": 0,
          "c": [
            185,
            150,
            35,
            75
          ],
          "u": 1,
          "t": 1232,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-2",
          "name": "Shieldsman",
          "type": "infantry",
          "building": "barracks",
          "a": 40,
          "di": 85,
          "dc": 45,
          "v": 8,
          "p": 40,
          "c": [
            145,
            95,
            245,
            45
          ],
          "u": 1,
          "t": 1936,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-3",
          "name": "Twinsteel Therion",
          "type": "infantry",
          "building": "barracks",
          "a": 90,
          "di": 55,
          "dc": 40,
          "v": 6,
          "p": 50,
          "c": [
            130,
            200,
            400,
            65
          ],
          "u": 1,
          "t": 2112,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-4",
          "name": "Elpida Rider",
          "type": "cavalry",
          "building": "stable",
          "a": 55,
          "di": 120,
          "dc": 90,
          "v": 16,
          "p": 110,
          "c": [
            555,
            445,
            330,
            110
          ],
          "u": 2,
          "t": 2816,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-5",
          "name": "Corinthian Crusher",
          "type": "cavalry",
          "building": "stable",
          "a": 195,
          "di": 80,
          "dc": 75,
          "v": 9,
          "p": 80,
          "c": [
            660,
            495,
            995,
            165
          ],
          "u": 3,
          "t": 3432,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-6",
          "name": "Ram",
          "type": "ram",
          "building": "workshop",
          "a": 65,
          "di": 30,
          "dc": 80,
          "v": 4,
          "p": 0,
          "c": [
            525,
            260,
            790,
            130
          ],
          "u": 3,
          "t": 4620,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-7",
          "name": "Ballista",
          "type": "catapult",
          "building": "workshop",
          "a": 50,
          "di": 60,
          "dc": 10,
          "v": 3,
          "p": 0,
          "c": [
            550,
            1240,
            825,
            135
          ],
          "u": 6,
          "t": 9900,
          "source": "mixed-official-community",
          "trainable": true
        },
        {
          "id": "spartans-8",
          "name": "Ephor",
          "type": "chief",
          "building": "residence",
          "a": 40,
          "di": 60,
          "dc": 40,
          "v": 4,
          "p": 0,
          "c": [
            33450,
            30665,
            36240,
            13935
          ],
          "u": 4,
          "t": 28800,
          "source": "mixed-official-community",
          "trainable": true,
          "totalKnown": 114290,
          "costSource": "https://siegewise.com/en/travian/units/spartans"
        },
        {
          "id": "spartans-9",
          "name": "Settler",
          "type": "settler",
          "building": "residence",
          "a": 10,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "c": [
            5115,
            5580,
            6045,
            3255
          ],
          "u": 1,
          "t": 34100,
          "source": "mixed-official-community",
          "trainable": true,
          "totalKnown": 19995,
          "costSource": "https://siegewise.com/en/travian/units/spartans"
        }
      ]
    },
    {
      "id": "vikings",
      "name": "Vikingler",
      "playable": true,
      "units": [
        {
          "id": "vikings-0",
          "name": "Thrall",
          "type": "infantry",
          "building": "barracks",
          "a": 45,
          "di": 22,
          "dc": 5,
          "v": 7,
          "p": 55,
          "c": [
            95,
            80,
            50,
            40
          ],
          "u": 1,
          "t": 800,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-1",
          "name": "Kalkan Hizmetkârı",
          "type": "infantry",
          "building": "barracks",
          "a": 20,
          "di": 50,
          "dc": 30,
          "v": 7,
          "p": 40,
          "c": [
            125,
            70,
            85,
            40
          ],
          "u": 1,
          "t": 1080,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-2",
          "name": "Berserker",
          "type": "infantry",
          "building": "barracks",
          "a": 70,
          "di": 30,
          "dc": 25,
          "v": 5,
          "p": 75,
          "c": [
            235,
            220,
            200,
            70
          ],
          "u": 2,
          "t": 1550,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-3",
          "name": "Heimdall'ın Gözü",
          "type": "scout",
          "building": "stable",
          "a": 0,
          "di": 10,
          "dc": 5,
          "v": 9,
          "p": 0,
          "c": [
            155,
            95,
            50,
            50
          ],
          "u": 1,
          "t": 1120,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-4",
          "name": "Huskarl Atlısı",
          "type": "cavalry",
          "building": "stable",
          "a": 45,
          "di": 95,
          "dc": 100,
          "v": 12,
          "p": 110,
          "c": [
            385,
            295,
            290,
            85
          ],
          "u": 2,
          "t": 2650,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-5",
          "name": "Valkür'ün Lütfu",
          "type": "cavalry",
          "building": "stable",
          "a": 160,
          "di": 50,
          "dc": 75,
          "v": 9,
          "p": 80,
          "c": [
            475,
            535,
            515,
            100
          ],
          "u": 2,
          "t": 3060,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-6",
          "name": "Koçbaşı",
          "type": "ram",
          "building": "workshop",
          "a": 65,
          "di": 30,
          "dc": 80,
          "v": 4,
          "p": 0,
          "c": [
            950,
            325,
            375,
            70
          ],
          "u": 3,
          "t": 4200,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-7",
          "name": "Mancınık",
          "type": "catapult",
          "building": "workshop",
          "a": 50,
          "di": 60,
          "dc": 10,
          "v": 3,
          "p": 0,
          "c": [
            850,
            1225,
            625,
            60
          ],
          "u": 6,
          "t": 9000,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-8",
          "name": "Jarl",
          "type": "chief",
          "building": "residence",
          "a": 40,
          "di": 40,
          "dc": 60,
          "v": 5,
          "p": 0,
          "c": [
            35500,
            26600,
            25000,
            27200
          ],
          "u": 4,
          "t": 70500,
          "source": "travian-official",
          "trainable": true
        },
        {
          "id": "vikings-9",
          "name": "Göçmen",
          "type": "settler",
          "building": "residence",
          "a": 10,
          "di": 80,
          "dc": 80,
          "v": 5,
          "p": 3000,
          "c": [
            5800,
            4600,
            4800,
            4800
          ],
          "u": 1,
          "t": 31000,
          "source": "travian-official",
          "trainable": true
        }
      ]
    }
  ]
};
