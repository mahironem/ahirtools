/* AhirTools Portal: centralized menu and page definitions */
window.AHIR_PORTAL = {
  "sections": [
    {
      "title": "Birlik Yönetimi",
      "slug": "birlik",
      "icon": "shield",
      "path": "/portal/birlik/",
      "description": "Bireysel veya ekip tabanlı saldırı ve savunma yönetimi.",
      "subgroups": [
        {
          "title": "Bireysel Yönetim",
          "path": "/portal/birlik/bireysel/",
          "icon": "user-round",
          "items": [
            {
              "id": "p-bireysel-ordular",
              "path": "/portal/birlik/bireysel/ordular/",
              "title": "Ordular",
              "icon": "shield",
              "status": "existing"
            },
            {
              "id": "p-bireysel-ordu-arsivi",
              "path": "/portal/birlik/bireysel/ordu-arsivi/",
              "title": "Ordu Arşivi",
              "icon": "archive",
              "status": "existing"
            },
            {
              "id": "p-bireysel-rakipler",
              "path": "/portal/birlik/bireysel/rakipler/",
              "title": "Rakipler",
              "icon": "crosshair",
              "status": "existing"
            },
            {
              "id": "p-bireysel-operasyon-kurgu",
              "path": "/portal/birlik/bireysel/operasyon-kurgu/",
              "title": "Operasyon Kurgu",
              "icon": "flame",
              "status": "existing"
            },
            {
              "id": "p-bireysel-savunma-ordulari",
              "path": "/portal/birlik/bireysel/savunma-ordulari/",
              "title": "Savunma Orduları",
              "icon": "shield-plus",
              "status": "planned"
            },
            {
              "id": "p-bireysel-savunma-ordu-arsivi",
              "path": "/portal/birlik/bireysel/savunma-ordu-arsivi/",
              "title": "Savunma Ordu Arşivi",
              "icon": "folders",
              "status": "planned"
            },
            {
              "id": "p-bireysel-savunma-organize",
              "path": "/portal/birlik/bireysel/savunma-organize/",
              "title": "Savunma Organize",
              "icon": "network",
              "status": "planned"
            },
            {
              "id": "p-bireysel-tilsim-yonetimi",
              "path": "/portal/birlik/bireysel/tilsim-yonetimi/",
              "title": "Tılsım Yönetimi",
              "icon": "gem",
              "status": "planned"
            }
          ]
        },
        {
          "title": "Ekip Ruhu",
          "path": "/portal/birlik/ekip-ruhu/",
          "icon": "users-round",
          "items": [
            {
              "id": "p-ekip-ruhu-panelim",
              "path": "/portal/birlik/ekip-ruhu/panelim/",
              "title": "Panelim",
              "icon": "layout-dashboard",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-ordu-ekle",
              "path": "/portal/birlik/ekip-ruhu/ordu-ekle/",
              "title": "Ordu Ekle",
              "icon": "circle-plus",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-ordularim",
              "path": "/portal/birlik/ekip-ruhu/ordularim/",
              "title": "Ordularım",
              "icon": "swords",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-gorevlerim",
              "path": "/portal/birlik/ekip-ruhu/gorevlerim/",
              "title": "Görevlerim",
              "icon": "list-checks",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-birlik-uyeleri",
              "path": "/portal/birlik/ekip-ruhu/birlik-uyeleri/",
              "title": "Birlik Üyeleri",
              "icon": "users",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-ordular",
              "path": "/portal/birlik/ekip-ruhu/ordular/",
              "title": "Ordular (Yetkili)",
              "icon": "shield-check",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-ordu-arsivi",
              "path": "/portal/birlik/ekip-ruhu/ordu-arsivi/",
              "title": "Ordu Arşivi (Yetkili)",
              "icon": "archive",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-rakipler",
              "path": "/portal/birlik/ekip-ruhu/rakipler/",
              "title": "Rakipler (Yetkili)",
              "icon": "crosshair",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-operasyon-kurgu",
              "path": "/portal/birlik/ekip-ruhu/operasyon-kurgu/",
              "title": "Operasyon Kurgu (Yetkili)",
              "icon": "flame",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-savunma-ordulari",
              "path": "/portal/birlik/ekip-ruhu/savunma-ordulari/",
              "title": "Savunma Orduları (Yetkili)",
              "icon": "shield-plus",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-savunma-ordu-arsivi",
              "path": "/portal/birlik/ekip-ruhu/savunma-ordu-arsivi/",
              "title": "Savunma Ordu Arşivi (Yetkili)",
              "icon": "folders",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-savunma-organize",
              "path": "/portal/birlik/ekip-ruhu/savunma-organize/",
              "title": "Savunma Organize (Yetkili)",
              "icon": "network",
              "status": "planned"
            },
            {
              "id": "p-ekip-ruhu-tilsim-yonetimi",
              "path": "/portal/birlik/ekip-ruhu/tilsim-yonetimi/",
              "title": "Tılsım Yönetimi (Yetkili)",
              "icon": "gem",
              "status": "planned"
            }
          ]
        }
      ],
      "items": []
    },
    {
      "title": "Yağma",
      "slug": "yagma",
      "icon": "coins",
      "path": "/portal/yagma/",
      "description": "Pasif oyuncuları bul, yağma verimliliğini artır.",
      "subgroups": [],
      "items": [
        {
          "id": "p-yagma-pasif-oyuncu-ara",
          "path": "/portal/yagma/pasif-oyuncu-ara/",
          "title": "Pasif Oyuncu Ara",
          "icon": "search",
          "status": "planned"
        },
        {
          "id": "p-yagma-yagma-listesi",
          "path": "/portal/yagma/yagma-listesi/",
          "title": "Yağma Listesi",
          "icon": "list",
          "status": "planned"
        },
        {
          "id": "p-yagma-kac-asker-gerekli",
          "path": "/portal/yagma/kac-asker-gerekli/",
          "title": "Kaç Asker Gerekli?",
          "icon": "calculator",
          "status": "planned"
        },
        {
          "id": "p-yagma-yagma-verimliligi",
          "path": "/portal/yagma/yagma-verimliligi/",
          "title": "Yağma Listesi Verimliliği",
          "icon": "chart-no-axes-combined",
          "status": "planned"
        },
        {
          "id": "p-yagma-yagma-raporlari",
          "path": "/portal/yagma/yagma-raporlari/",
          "title": "Yağma Raporları",
          "icon": "file-chart-column",
          "status": "planned"
        }
      ]
    },
    {
      "title": "Harita & İstihbarat",
      "slug": "harita",
      "icon": "map",
      "path": "/portal/harita/",
      "description": "Oyun dünyasının yerleşimlerini ve değişimlerini keşfet.",
      "subgroups": [],
      "items": [
        {
          "id": "p-harita-dunya-haritasi",
          "path": "/portal/harita/dunya-haritasi/",
          "title": "Dünya Haritası",
          "icon": "map-pinned",
          "status": "planned"
        },
        {
          "id": "p-harita-oyuncu-ara",
          "path": "/portal/harita/oyuncu-ara/",
          "title": "Oyuncu Ara",
          "icon": "search",
          "status": "planned"
        },
        {
          "id": "p-harita-birlik-ara",
          "path": "/portal/harita/birlik-ara/",
          "title": "Birlik Ara",
          "icon": "users",
          "status": "planned"
        },
        {
          "id": "p-harita-koy-tarla-bulucu",
          "path": "/portal/harita/koy-tarla-bulucu/",
          "title": "Köy / Tarla Bulucu",
          "icon": "wheat",
          "status": "planned"
        },
        {
          "id": "p-harita-aktivite-analizi",
          "path": "/portal/harita/aktivite-analizi/",
          "title": "Aktivite Analizi",
          "icon": "activity",
          "status": "planned"
        },
        {
          "id": "p-harita-rakip-takibi",
          "path": "/portal/harita/rakip-takibi/",
          "title": "Rakip Takibi",
          "icon": "radar",
          "status": "planned"
        }
      ]
    },
    {
      "title": "Hesaplayıcılar",
      "slug": "hesaplayicilar",
      "icon": "calculator",
      "path": "/portal/hesaplayicilar/",
      "description": "Savaş, mesafe, kaynak ve gelişim hesaplayıcıları.",
      "subgroups": [],
      "items": [
        {
          "id": "p-hesaplayicilar-saldiri-ordusu",
          "path": "/portal/hesaplayicilar/saldiri-ordusu/",
          "title": "Saldırı Ordusu",
          "icon": "swords",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-savunma-ordusu",
          "path": "/portal/hesaplayicilar/savunma-ordusu/",
          "title": "Savunma Ordusu",
          "icon": "shield",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-savas-simulatoru",
          "path": "/portal/hesaplayicilar/savas-simulatoru/",
          "title": "Savaş Simülatörü",
          "icon": "scale",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-mesafe-varis",
          "path": "/portal/hesaplayicilar/mesafe-varis/",
          "title": "Mesafe / Varış",
          "icon": "route",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-reisleme",
          "path": "/portal/hesaplayicilar/reisleme/",
          "title": "Reisleme",
          "icon": "flag",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-asker-kilitleme",
          "path": "/portal/hesaplayicilar/asker-kilitleme/",
          "title": "Asker Kilitleme",
          "icon": "lock",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-asker-egitim-suresi",
          "path": "/portal/hesaplayicilar/asker-egitim-suresi/",
          "title": "Asker Eğitim Süresi",
          "icon": "clock",
          "status": "planned"
        },
        {
          "id": "p-hesaplayicilar-kaynak-uretimi",
          "path": "/portal/hesaplayicilar/kaynak-uretimi/",
          "title": "Kaynak Üretimi",
          "icon": "sprout",
          "status": "planned"
        }
      ]
    },
    {
      "title": "Strateji & Lojistik",
      "slug": "strateji",
      "icon": "compass",
      "path": "/portal/strateji/",
      "description": "Birlik operasyonlarının lojistik ihtiyaçlarını planla.",
      "subgroups": [],
      "items": [
        {
          "id": "p-strateji-tilsim-operasyonlari",
          "path": "/portal/strateji/tilsim-operasyonlari/",
          "title": "Tılsım Operasyonları",
          "icon": "gem",
          "status": "planned"
        },
        {
          "id": "p-strateji-dunya-harikasi",
          "path": "/portal/strateji/dunya-harikasi/",
          "title": "Dünya Harikası Desteği",
          "icon": "landmark",
          "status": "planned"
        },
        {
          "id": "p-strateji-kaynak-sevkiyati",
          "path": "/portal/strateji/kaynak-sevkiyati/",
          "title": "Kaynak Sevkiyatı",
          "icon": "truck",
          "status": "planned"
        },
        {
          "id": "p-strateji-koy-gelisim-plani",
          "path": "/portal/strateji/koy-gelisim-plani/",
          "title": "Köy Gelişim Planı",
          "icon": "building-2",
          "status": "planned"
        },
        {
          "id": "p-strateji-kultur-puani",
          "path": "/portal/strateji/kultur-puani/",
          "title": "Kültür Puanı Planlayıcı",
          "icon": "graduation-cap",
          "status": "planned"
        }
      ]
    },
    {
      "title": "Raporlar & Analiz",
      "slug": "raporlar",
      "icon": "chart-column",
      "path": "/portal/raporlar/",
      "description": "Birlik ve oyuncu performansına dair veriler.",
      "subgroups": [],
      "items": [
        {
          "id": "p-raporlar-savas-raporlari",
          "path": "/portal/raporlar/savas-raporlari/",
          "title": "Savaş Raporları",
          "icon": "file-text",
          "status": "planned"
        },
        {
          "id": "p-raporlar-oyuncu-istatistikleri",
          "path": "/portal/raporlar/oyuncu-istatistikleri/",
          "title": "Oyuncu İstatistikleri",
          "icon": "user-round",
          "status": "planned"
        },
        {
          "id": "p-raporlar-birlik-istatistikleri",
          "path": "/portal/raporlar/birlik-istatistikleri/",
          "title": "Birlik İstatistikleri",
          "icon": "users",
          "status": "planned"
        },
        {
          "id": "p-raporlar-kayip-analizi",
          "path": "/portal/raporlar/kayip-analizi/",
          "title": "Kayıp Analizi",
          "icon": "chart-no-axes-combined",
          "status": "planned"
        },
        {
          "id": "p-raporlar-operasyon-gecmisi",
          "path": "/portal/raporlar/operasyon-gecmisi/",
          "title": "Operasyon Geçmişi",
          "icon": "history",
          "status": "planned"
        }
      ]
    },
    {
      "title": "Tablolar",
      "slug": "tablolar",
      "icon": "book-open",
      "path": "/portal/tablolar/",
      "description": "Travian birimleri ve oyun mekanikleri için rehber.",
      "subgroups": [],
      "items": [
        {
          "id": "p-tablolar-binalar",
          "path": "/portal/tablolar/binalar/",
          "title": "Binalar",
          "icon": "building",
          "status": "available"
        },
        {
          "id": "p-tablolar-askerler",
          "path": "/portal/tablolar/askerler/",
          "title": "Askerler",
          "icon": "swords",
          "status": "planned"
        },
        {
          "id": "p-tablolar-demirci",
          "path": "/portal/tablolar/demirci/",
          "title": "Demirci Geliştirmeleri",
          "icon": "hammer",
          "status": "planned"
        },
        {
          "id": "p-tablolar-tilsimlar",
          "path": "/portal/tablolar/tilsimlar/",
          "title": "Tılsımlar",
          "icon": "gem",
          "status": "planned"
        },
        {
          "id": "p-tablolar-kahraman-esyalari",
          "path": "/portal/tablolar/kahraman-esyalari/",
          "title": "Kahraman Eşyaları",
          "icon": "crown",
          "status": "planned"
        },
        {
          "id": "p-tablolar-kabileler",
          "path": "/portal/tablolar/kabileler/",
          "title": "Kabileler",
          "icon": "flag",
          "status": "planned"
        },
        {
          "id": "p-tablolar-vahalar",
          "path": "/portal/tablolar/vahalar/",
          "title": "Vahalar",
          "icon": "trees",
          "status": "planned"
        },
        {
          "id": "p-tablolar-kultur-puanlari",
          "path": "/portal/tablolar/kultur-puanlari/",
          "title": "Kültür Puanları",
          "icon": "scroll-text",
          "status": "planned"
        }
      ]
    },
    {
      "title": "Hesap & Ayarlar",
      "slug": "hesap",
      "icon": "settings",
      "path": "/portal/hesap/",
      "description": "Profil, oyun dünyaları ve erişim tercihleri.",
      "subgroups": [],
      "items": [
        {
          "id": "p-hesap-profilim",
          "path": "/portal/hesap/profilim/",
          "title": "Profilim",
          "icon": "user-circle",
          "status": "planned"
        },
        {
          "id": "p-hesap-oyun-dunyalarim",
          "path": "/portal/hesap/oyun-dunyalarim/",
          "title": "Oyun Dünyalarım",
          "icon": "globe",
          "status": "planned"
        },
        {
          "id": "p-hesap-birlik-ayarlari",
          "path": "/portal/hesap/birlik-ayarlari/",
          "title": "Birlik Ayarları",
          "icon": "sliders-horizontal",
          "status": "planned"
        },
        {
          "id": "p-hesap-kullanici-yetkileri",
          "path": "/portal/hesap/kullanici-yetkileri/",
          "title": "Kullanıcı Yetkileri",
          "icon": "shield-check",
          "status": "planned"
        },
        {
          "id": "p-hesap-bildirimler",
          "path": "/portal/hesap/bildirimler/",
          "title": "Bildirimler",
          "icon": "bell",
          "status": "planned"
        },
        {
          "id": "p-hesap-yardim",
          "path": "/portal/hesap/yardim/",
          "title": "Yardım",
          "icon": "life-buoy",
          "status": "planned"
        }
      ]
    }
  ],
  "pages": [
    {
      "id": "home",
      "path": "/portal/",
      "title": "Genel Bakış",
      "description": "Travian yönetimini tek merkezde topla.",
      "icon": "layout-dashboard",
      "kind": "home",
      "status": "preview"
    },
    {
      "id": "sec-birlik",
      "path": "/portal/birlik/",
      "title": "Birlik Yönetimi",
      "description": "Bireysel veya ekip tabanlı saldırı ve savunma yönetimi.",
      "icon": "shield",
      "kind": "section",
      "status": "preview",
      "section": "Birlik Yönetimi"
    },
    {
      "id": "group-bireysel",
      "path": "/portal/birlik/bireysel/",
      "title": "Bireysel Yönetim",
      "description": "Bireysel veya ekip tabanlı saldırı ve savunma yönetimi.",
      "icon": "user-round",
      "kind": "subgroup",
      "status": "preview",
      "section": "Birlik Yönetimi"
    },
    {
      "id": "p-bireysel-ordular",
      "path": "/portal/birlik/bireysel/ordular/",
      "title": "Ordular",
      "description": "Saldırı ordularını ve çıkış köylerini yönet.",
      "icon": "shield",
      "kind": "page",
      "status": "existing",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-ordu-arsivi",
      "path": "/portal/birlik/bireysel/ordu-arsivi/",
      "title": "Ordu Arşivi",
      "description": "Kayıtlı orduları ve asker güncellemelerini görüntüle.",
      "icon": "archive",
      "kind": "page",
      "status": "existing",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-rakipler",
      "path": "/portal/birlik/bireysel/rakipler/",
      "title": "Rakipler",
      "description": "Hedef köyleri ve istihbarat kayıtlarını takip et.",
      "icon": "crosshair",
      "kind": "page",
      "status": "existing",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-operasyon-kurgu",
      "path": "/portal/birlik/bireysel/operasyon-kurgu/",
      "title": "Operasyon Kurgu",
      "description": "Saldırı planla, varış ve çıkış saatlerini hesapla.",
      "icon": "flame",
      "kind": "page",
      "status": "existing",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-savunma-ordulari",
      "path": "/portal/birlik/bireysel/savunma-ordulari/",
      "title": "Savunma Orduları",
      "description": "Savunma birliklerini köy bazında kaydet.",
      "icon": "shield-plus",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-savunma-ordu-arsivi",
      "path": "/portal/birlik/bireysel/savunma-ordu-arsivi/",
      "title": "Savunma Ordu Arşivi",
      "description": "Savunma envanterini geçmiş kayıtlarla karşılaştır.",
      "icon": "folders",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-savunma-organize",
      "path": "/portal/birlik/bireysel/savunma-organize/",
      "title": "Savunma Organize",
      "description": "Gelen saldırılara destek, görev ve varış planı oluştur.",
      "icon": "network",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "p-bireysel-tilsim-yonetimi",
      "path": "/portal/birlik/bireysel/tilsim-yonetimi/",
      "title": "Tılsım Yönetimi",
      "description": "Tılsımların konumunu, sahibini ve aktarımını izle.",
      "icon": "gem",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Bireysel Yönetim"
    },
    {
      "id": "group-ekip-ruhu",
      "path": "/portal/birlik/ekip-ruhu/",
      "title": "Ekip Ruhu",
      "description": "Bireysel veya ekip tabanlı saldırı ve savunma yönetimi.",
      "icon": "users-round",
      "kind": "subgroup",
      "status": "preview",
      "section": "Birlik Yönetimi"
    },
    {
      "id": "p-ekip-ruhu-panelim",
      "path": "/portal/birlik/ekip-ruhu/panelim/",
      "title": "Panelim",
      "description": "Kendi hesap ve görev bilgilerini takip et.",
      "icon": "layout-dashboard",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-ordu-ekle",
      "path": "/portal/birlik/ekip-ruhu/ordu-ekle/",
      "title": "Ordu Ekle",
      "description": "Oyuncuların kendi ordularını sisteme bildirmesi.",
      "icon": "circle-plus",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-ordularim",
      "path": "/portal/birlik/ekip-ruhu/ordularim/",
      "title": "Ordularım",
      "description": "Kişisel orduları ve güncelleme durumunu gör.",
      "icon": "swords",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-gorevlerim",
      "path": "/portal/birlik/ekip-ruhu/gorevlerim/",
      "title": "Görevlerim",
      "description": "Sana atanan görevleri ve durumlarını gör.",
      "icon": "list-checks",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-birlik-uyeleri",
      "path": "/portal/birlik/ekip-ruhu/birlik-uyeleri/",
      "title": "Birlik Üyeleri",
      "description": "Üye davetleri, kadro ve yetkiler.",
      "icon": "users",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-ordular",
      "path": "/portal/birlik/ekip-ruhu/ordular/",
      "title": "Ordular (Yetkili)",
      "description": "Birlik ordularını yalnızca yetkililer görüntüler.",
      "icon": "shield-check",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-ordu-arsivi",
      "path": "/portal/birlik/ekip-ruhu/ordu-arsivi/",
      "title": "Ordu Arşivi (Yetkili)",
      "description": "Birlik ordu arşivinin özel görünümü.",
      "icon": "archive",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-rakipler",
      "path": "/portal/birlik/ekip-ruhu/rakipler/",
      "title": "Rakipler (Yetkili)",
      "description": "Birlik istihbaratının kontrollü paylaşımı.",
      "icon": "crosshair",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-operasyon-kurgu",
      "path": "/portal/birlik/ekip-ruhu/operasyon-kurgu/",
      "title": "Operasyon Kurgu (Yetkili)",
      "description": "Görevleri oyuncu panellerine dağıtan planlama.",
      "icon": "flame",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-savunma-ordulari",
      "path": "/portal/birlik/ekip-ruhu/savunma-ordulari/",
      "title": "Savunma Orduları (Yetkili)",
      "description": "Yetkiye göre erişilen savunma envanteri.",
      "icon": "shield-plus",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-savunma-ordu-arsivi",
      "path": "/portal/birlik/ekip-ruhu/savunma-ordu-arsivi/",
      "title": "Savunma Ordu Arşivi (Yetkili)",
      "description": "Savunma geçmişi ve yetkili görünümü.",
      "icon": "folders",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-savunma-organize",
      "path": "/portal/birlik/ekip-ruhu/savunma-organize/",
      "title": "Savunma Organize (Yetkili)",
      "description": "Savunma desteğini oyunculara dağıt.",
      "icon": "network",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "p-ekip-ruhu-tilsim-yonetimi",
      "path": "/portal/birlik/ekip-ruhu/tilsim-yonetimi/",
      "title": "Tılsım Yönetimi (Yetkili)",
      "description": "Tılsım görevleri ve aktarım takvimi.",
      "icon": "gem",
      "kind": "page",
      "status": "planned",
      "section": "Birlik Yönetimi",
      "subsection": "Ekip Ruhu"
    },
    {
      "id": "sec-yagma",
      "path": "/portal/yagma/",
      "title": "Yağma",
      "description": "Pasif oyuncuları bul, yağma verimliliğini artır.",
      "icon": "coins",
      "kind": "section",
      "status": "preview",
      "section": "Yağma"
    },
    {
      "id": "p-yagma-pasif-oyuncu-ara",
      "path": "/portal/yagma/pasif-oyuncu-ara/",
      "title": "Pasif Oyuncu Ara",
      "description": "Son 7–8 günün nüfus değişimlerini karşılaştır.",
      "icon": "search",
      "kind": "page",
      "status": "planned",
      "section": "Yağma"
    },
    {
      "id": "p-yagma-yagma-listesi",
      "path": "/portal/yagma/yagma-listesi/",
      "title": "Yağma Listesi",
      "description": "Yağma hedeflerini ve rotalarını düzenle.",
      "icon": "list",
      "kind": "page",
      "status": "planned",
      "section": "Yağma"
    },
    {
      "id": "p-yagma-kac-asker-gerekli",
      "path": "/portal/yagma/kac-asker-gerekli/",
      "title": "Kaç Asker Gerekli?",
      "description": "Liste, TY ve yağma aralığına göre asker ihtiyacı.",
      "icon": "calculator",
      "kind": "page",
      "status": "planned",
      "section": "Yağma"
    },
    {
      "id": "p-yagma-yagma-verimliligi",
      "path": "/portal/yagma/yagma-verimliligi/",
      "title": "Yağma Listesi Verimliliği",
      "description": "Kaynak getirisi ve zaman maliyetini karşılaştır.",
      "icon": "chart-no-axes-combined",
      "kind": "page",
      "status": "planned",
      "section": "Yağma"
    },
    {
      "id": "p-yagma-yagma-raporlari",
      "path": "/portal/yagma/yagma-raporlari/",
      "title": "Yağma Raporları",
      "description": "Yağma sonuçlarını dönemsel değerlendir.",
      "icon": "file-chart-column",
      "kind": "page",
      "status": "planned",
      "section": "Yağma"
    },
    {
      "id": "sec-harita",
      "path": "/portal/harita/",
      "title": "Harita & İstihbarat",
      "description": "Oyun dünyasının yerleşimlerini ve değişimlerini keşfet.",
      "icon": "map",
      "kind": "section",
      "status": "preview",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "p-harita-dunya-haritasi",
      "path": "/portal/harita/dunya-haritasi/",
      "title": "Dünya Haritası",
      "description": "Koordinatlar, köyler ve birlikler.",
      "icon": "map-pinned",
      "kind": "page",
      "status": "planned",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "p-harita-oyuncu-ara",
      "path": "/portal/harita/oyuncu-ara/",
      "title": "Oyuncu Ara",
      "description": "Oyuncu, köy ve koordinat araması.",
      "icon": "search",
      "kind": "page",
      "status": "planned",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "p-harita-birlik-ara",
      "path": "/portal/harita/birlik-ara/",
      "title": "Birlik Ara",
      "description": "Birliklerin harita üzerindeki dağılımı.",
      "icon": "users",
      "kind": "page",
      "status": "planned",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "p-harita-koy-tarla-bulucu",
      "path": "/portal/harita/koy-tarla-bulucu/",
      "title": "Köy / Tarla Bulucu",
      "description": "Yerleşime uygun köy alanlarını araştır.",
      "icon": "wheat",
      "kind": "page",
      "status": "planned",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "p-harita-aktivite-analizi",
      "path": "/portal/harita/aktivite-analizi/",
      "title": "Aktivite Analizi",
      "description": "Günlük nüfus karşılaştırmaları.",
      "icon": "activity",
      "kind": "page",
      "status": "planned",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "p-harita-rakip-takibi",
      "path": "/portal/harita/rakip-takibi/",
      "title": "Rakip Takibi",
      "description": "Rakip gözlem listeleri ve değişim geçmişi.",
      "icon": "radar",
      "kind": "page",
      "status": "planned",
      "section": "Harita & İstihbarat"
    },
    {
      "id": "sec-hesaplayicilar",
      "path": "/portal/hesaplayicilar/",
      "title": "Hesaplayıcılar",
      "description": "Savaş, mesafe, kaynak ve gelişim hesaplayıcıları.",
      "icon": "calculator",
      "kind": "section",
      "status": "preview",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-saldiri-ordusu",
      "path": "/portal/hesaplayicilar/saldiri-ordusu/",
      "title": "Saldırı Ordusu",
      "description": "Kabile ve birimlere göre saldırı gücü.",
      "icon": "swords",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-savunma-ordusu",
      "path": "/portal/hesaplayicilar/savunma-ordusu/",
      "title": "Savunma Ordusu",
      "description": "Piyade ve süvari savunma gücü.",
      "icon": "shield",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-savas-simulatoru",
      "path": "/portal/hesaplayicilar/savas-simulatoru/",
      "title": "Savaş Simülatörü",
      "description": "Asker bileşimleri ve olası savaş sonuçları.",
      "icon": "scale",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-mesafe-varis",
      "path": "/portal/hesaplayicilar/mesafe-varis/",
      "title": "Mesafe / Varış",
      "description": "Süre, hız ve çıkış zamanı.",
      "icon": "route",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-reisleme",
      "path": "/portal/hesaplayicilar/reisleme/",
      "title": "Reisleme",
      "description": "Bağlılık ve reis dalgası planlama.",
      "icon": "flag",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-asker-kilitleme",
      "path": "/portal/hesaplayicilar/asker-kilitleme/",
      "title": "Asker Kilitleme",
      "description": "Asker hareket planları.",
      "icon": "lock",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-asker-egitim-suresi",
      "path": "/portal/hesaplayicilar/asker-egitim-suresi/",
      "title": "Asker Eğitim Süresi",
      "description": "Eğitim binalarına göre süreler.",
      "icon": "clock",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "p-hesaplayicilar-kaynak-uretimi",
      "path": "/portal/hesaplayicilar/kaynak-uretimi/",
      "title": "Kaynak Üretimi",
      "description": "Üretim ve bonus tahminleri.",
      "icon": "sprout",
      "kind": "page",
      "status": "planned",
      "section": "Hesaplayıcılar"
    },
    {
      "id": "sec-strateji",
      "path": "/portal/strateji/",
      "title": "Strateji & Lojistik",
      "description": "Birlik operasyonlarının lojistik ihtiyaçlarını planla.",
      "icon": "compass",
      "kind": "section",
      "status": "preview",
      "section": "Strateji & Lojistik"
    },
    {
      "id": "p-strateji-tilsim-operasyonlari",
      "path": "/portal/strateji/tilsim-operasyonlari/",
      "title": "Tılsım Operasyonları",
      "description": "Ele geçirme ve teslim operasyonları.",
      "icon": "gem",
      "kind": "page",
      "status": "planned",
      "section": "Strateji & Lojistik"
    },
    {
      "id": "p-strateji-dunya-harikasi",
      "path": "/portal/strateji/dunya-harikasi/",
      "title": "Dünya Harikası Desteği",
      "description": "Destek, savunma ve ikmal planları.",
      "icon": "landmark",
      "kind": "page",
      "status": "planned",
      "section": "Strateji & Lojistik"
    },
    {
      "id": "p-strateji-kaynak-sevkiyati",
      "path": "/portal/strateji/kaynak-sevkiyati/",
      "title": "Kaynak Sevkiyatı",
      "description": "Tüccar ve kaynak taşımaları.",
      "icon": "truck",
      "kind": "page",
      "status": "planned",
      "section": "Strateji & Lojistik"
    },
    {
      "id": "p-strateji-koy-gelisim-plani",
      "path": "/portal/strateji/koy-gelisim-plani/",
      "title": "Köy Gelişim Planı",
      "description": "Yapı geliştirme ve kaynak planları.",
      "icon": "building-2",
      "kind": "page",
      "status": "planned",
      "section": "Strateji & Lojistik"
    },
    {
      "id": "p-strateji-kultur-puani",
      "path": "/portal/strateji/kultur-puani/",
      "title": "Kültür Puanı Planlayıcı",
      "description": "Yeni köy kurma takvimi ve kültür puanları.",
      "icon": "graduation-cap",
      "kind": "page",
      "status": "planned",
      "section": "Strateji & Lojistik"
    },
    {
      "id": "sec-raporlar",
      "path": "/portal/raporlar/",
      "title": "Raporlar & Analiz",
      "description": "Birlik ve oyuncu performansına dair veriler.",
      "icon": "chart-column",
      "kind": "section",
      "status": "preview",
      "section": "Raporlar & Analiz"
    },
    {
      "id": "p-raporlar-savas-raporlari",
      "path": "/portal/raporlar/savas-raporlari/",
      "title": "Savaş Raporları",
      "description": "Savaş raporlarının karşılaştırılması.",
      "icon": "file-text",
      "kind": "page",
      "status": "planned",
      "section": "Raporlar & Analiz"
    },
    {
      "id": "p-raporlar-oyuncu-istatistikleri",
      "path": "/portal/raporlar/oyuncu-istatistikleri/",
      "title": "Oyuncu İstatistikleri",
      "description": "Oyuncu gelişimi ve değişimi.",
      "icon": "user-round",
      "kind": "page",
      "status": "planned",
      "section": "Raporlar & Analiz"
    },
    {
      "id": "p-raporlar-birlik-istatistikleri",
      "path": "/portal/raporlar/birlik-istatistikleri/",
      "title": "Birlik İstatistikleri",
      "description": "Birlik seviyesinde toplam güç ve güncellik.",
      "icon": "users",
      "kind": "page",
      "status": "planned",
      "section": "Raporlar & Analiz"
    },
    {
      "id": "p-raporlar-kayip-analizi",
      "path": "/portal/raporlar/kayip-analizi/",
      "title": "Kayıp Analizi",
      "description": "Asker kaybı ve toparlanma.",
      "icon": "chart-no-axes-combined",
      "kind": "page",
      "status": "planned",
      "section": "Raporlar & Analiz"
    },
    {
      "id": "p-raporlar-operasyon-gecmisi",
      "path": "/portal/raporlar/operasyon-gecmisi/",
      "title": "Operasyon Geçmişi",
      "description": "Geçmiş görev ve operasyonlar.",
      "icon": "history",
      "kind": "page",
      "status": "planned",
      "section": "Raporlar & Analiz"
    },
    {
      "id": "sec-tablolar",
      "path": "/portal/tablolar/",
      "title": "Tablolar",
      "description": "Travian birimleri ve oyun mekanikleri için rehber.",
      "icon": "book-open",
      "kind": "section",
      "status": "preview",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-binalar",
      "path": "/portal/tablolar/binalar/",
      "title": "Binalar",
      "description": "Seviye, maliyet, şart ve getiriler.",
      "icon": "building",
      "kind": "page",
      "status": "available",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-askerler",
      "path": "/portal/tablolar/askerler/",
      "title": "Askerler",
      "description": "Kabilelere göre hız ve birlik özellikleri.",
      "icon": "swords",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-demirci",
      "path": "/portal/tablolar/demirci/",
      "title": "Demirci Geliştirmeleri",
      "description": "Ekipman geliştirmelerinin etkileri.",
      "icon": "hammer",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-tilsimlar",
      "path": "/portal/tablolar/tilsimlar/",
      "title": "Tılsımlar",
      "description": "Tılsım türleri ve etkileri.",
      "icon": "gem",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-kahraman-esyalari",
      "path": "/portal/tablolar/kahraman-esyalari/",
      "title": "Kahraman Eşyaları",
      "description": "Eşya etkileri ve bonuslar.",
      "icon": "crown",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-kabileler",
      "path": "/portal/tablolar/kabileler/",
      "title": "Kabileler",
      "description": "Kabile özellikleri ve karşılaştırmalar.",
      "icon": "flag",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-vahalar",
      "path": "/portal/tablolar/vahalar/",
      "title": "Vahalar",
      "description": "Vaha türleri ve bonuslar.",
      "icon": "trees",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "p-tablolar-kultur-puanlari",
      "path": "/portal/tablolar/kultur-puanlari/",
      "title": "Kültür Puanları",
      "description": "Kaynaklara göre kültür puanları.",
      "icon": "scroll-text",
      "kind": "page",
      "status": "planned",
      "section": "Tablolar"
    },
    {
      "id": "sec-hesap",
      "path": "/portal/hesap/",
      "title": "Hesap & Ayarlar",
      "description": "Profil, oyun dünyaları ve erişim tercihleri.",
      "icon": "settings",
      "kind": "section",
      "status": "preview",
      "section": "Hesap & Ayarlar"
    },
    {
      "id": "p-hesap-profilim",
      "path": "/portal/hesap/profilim/",
      "title": "Profilim",
      "description": "Kişisel bilgiler ve tercihler.",
      "icon": "user-circle",
      "kind": "page",
      "status": "planned",
      "section": "Hesap & Ayarlar"
    },
    {
      "id": "p-hesap-oyun-dunyalarim",
      "path": "/portal/hesap/oyun-dunyalarim/",
      "title": "Oyun Dünyalarım",
      "description": "Sunucu seçimi; verilerin sunucuya göre ayrılması.",
      "icon": "globe",
      "kind": "page",
      "status": "planned",
      "section": "Hesap & Ayarlar"
    },
    {
      "id": "p-hesap-birlik-ayarlari",
      "path": "/portal/hesap/birlik-ayarlari/",
      "title": "Birlik Ayarları",
      "description": "Birlik yönetimi tercihleri.",
      "icon": "sliders-horizontal",
      "kind": "page",
      "status": "planned",
      "section": "Hesap & Ayarlar"
    },
    {
      "id": "p-hesap-kullanici-yetkileri",
      "path": "/portal/hesap/kullanici-yetkileri/",
      "title": "Kullanıcı Yetkileri",
      "description": "Ekip üyelerinin erişim kuralları.",
      "icon": "shield-check",
      "kind": "page",
      "status": "planned",
      "section": "Hesap & Ayarlar"
    },
    {
      "id": "p-hesap-bildirimler",
      "path": "/portal/hesap/bildirimler/",
      "title": "Bildirimler",
      "description": "Görev ve operasyon uyarıları.",
      "icon": "bell",
      "kind": "page",
      "status": "planned",
      "section": "Hesap & Ayarlar"
    },
    {
      "id": "p-hesap-yardim",
      "path": "/portal/hesap/yardim/",
      "title": "Yardım",
      "description": "Kullanım rehberi ve geri bildirim.",
      "icon": "life-buoy",
      "kind": "page",
      "status": "planned",
      "section": "Hesap & Ayarlar"
    }
  ]
};
