'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "San Bernardo Aka Pache",
        arabic: "سان برناردو المعروف أيضاً بباتشي"
      },
      {
        english: "San Ramon",
        arabic: "سان رامون"
      },
      {
        english: "Santos",
        arabic: "سانتوس"
      },
      {
        english: "Selection 9",
        arabic: "الاختيار 9"
      },
      {
        english: "Semperflorens",
        arabic: "سيمبرفلورنس"
      },
      {
        english: "Sidamo",
        arabic: "سيدامو"
      },
      {
        english: "Sidikalang",
        arabic: "سيديكالانج"
      },
      {
        english: "Sl14",
        arabic: "SL14"
      },
      {
        english: "Sl28",
        arabic: "SL28"
      },
      {
        english: "Sl34",
        arabic: "SL34"
      },
      {
        english: "Sulawesi",
        arabic: "سولاويسي"
      },
      {
        english: "Sumatra",
        arabic: "سومطرة"
      },
      {
        english: "Sumatra Lintong",
        arabic: "سومطرة لينتونغ"
      },
      {
        english: "Tekisic",
        arabic: "تيكيسيك"
      },
      {
        english: "Topazio",
        arabic: "توبازيو"
      },
      {
        english: "Toraja",
        arabic: "توراجا"
      },
      {
        english: "Turmalina",
        arabic: "تورمالينا"
      },
      {
        english: "Turquesa",
        arabic: "توركيز"
      },
      {
        english: "Typica",
        arabic: "تيبيكا"
      },
      {
        english: "Usda762",
        arabic: "USDA762"
      },
      {
        english: "Venecia",
        arabic: "فينيسيا"
      },
      {
        english: "Villa Sarchi",
        arabic: "فيلا سارتشي"
      },
      {
        english: "Villalobos",
        arabic: "فيلالوبوس"
      },
      {
        english: "Walichu/ Wolisho",
        arabic: "واليتشو / ووليشو"
      },
      {
        english: "Yellow Bourbon",
        arabic: "بوربون أصفر"
      },
      {
        english: "Yirgacheffe",
        arabic: "يرغاتشيف"
      },
      {
        english: "Brs 1216",
        arabic: "BRS 1216"
      },
      {
        english: "Brs 2336",
        arabic: "BRS 2336"
      },
      {
        english: "Brs 3210",
        arabic: "BRS 3210"
      },
      {
        english: "Brs 3213",
        arabic: "BRS 3213"
      },
      {
        english: "Culi Robusta",
        arabic: "كولي روبوستا"
      },
      {
        english: "Erecta",
        arabic: "إيريكتا"
      },
      {
        english: "Icatu",
        arabic: "إيكاتو"
      },
      {
        english: "Jasli",
        arabic: "جاسلي"
      },
      {
        english: "Kapeng Alamid",
        arabic: "قهوة اللواحم"
      },
      {
        english: "Kopi Luwak",
        arabic: "قهوة اللواحم (كوبي لواك)"
      },
      {
        english: "Nemaya",
        arabic: "نيمايا"
      },
      {
        english: "Nganda",
        arabic: "نجاندا"
      },
      {
        english: "Pandi",
        arabic: "باندي"
      },
      {
        english: "Pawi",
        arabic: "باوي"
      },
      {
        english: "Rakimin",
        arabic: "راكيمين"
      },
      {
        english: "Selection 1r",
        arabic: "الاختيار 1R"
      },
      {
        english: "Selection 2r",
        arabic: "الاختيار 2R"
      },
      {
        english: "Selection 3r",
        arabic: "الاختيار 3R"
      },
      {
        english: "Sln 270",
        arabic: "SLN 270"
      },
      {
        english: "Sln 274",
        arabic: "SLN 274"
      },
      {
        english: "TR4",
        arabic: "TR4"
      },
      {
        english: "TR5",
        arabic: "TR5"
      },
      {
        english: "TR6",
        arabic: "TR6"
      },
      {
        english: "TR7",
        arabic: "TR7"
      },
      {
        english: "TR8",
        arabic: "TR8"
      },
      {
        english: "BP42",
        arabic: "BP42"
      },
      {
        english: "BP234",
        arabic: "BP234"
      },
      {
        english: "BP288",
        arabic: "BP288"
      },
      {
        english: "BP358",
        arabic: "BP358"
      },
      {
        english: "BP409",
        arabic: "BP409"
      },
      {
        english: "SA237",
        arabic: "SA237"
      },
      {
        english: "Wayanaad",
        arabic: "واياناد"
      },
      {
        english: "Exelsa",
        arabic: "إكسيلسا"
      },
      {
        english: "Kape Barako",
        arabic: "كابي باراكو"
      },
      {
        english: "Liberica",
        arabic: "ليبيريكا"
      },
      {
        english: "Sln288",
        arabic: "SLN 288"
      },
      {
        english: "Sln10",
        arabic: "SLN 10"
      },
      {
        english: "Abyssinia 3",
        arabic: "أبيسينيا 3"
      },
      {
        english: "Anacafe 14",
        arabic: "أناكافيه 14"
      },
      {
        english: "Arabusta",
        arabic: "أرابوستا"
      },
      {
        english: "Arla",
        arabic: "أرلا"
      },
      {
        english: "Ateng",
        arabic: "أتينغ"
      },
      {
        english: "Batian",
        arabic: "باتيان"
      },
      {
        english: "Bogor Prada",
        arabic: "بوغور برادا"
      },
      {
        english: "Casiopea",
        arabic: "كاسيوبيا"
      },
      {
        english: "Castillo",
        arabic: "كاستيلو"
      },
      {
        english: "Castillo El Rosario",
        arabic: "كاستيلو إل روساريو"
      },
      {
        english: "Castillo El Tambo",
        arabic: "كاستيلو إل تامبو"
      },
      {
        english: "Castillo La Trinidad",
        arabic: "كاستيلو لا ترينيداد"
      },
      {
        english: "Castillo Naranjal",
        arabic: "كاستيلو نارانخال"
      },
      {
        english: "Castillo Paraguaicito",
        arabic: "كاستيلو باراغوايسيتو"
      },
      {
        english: "Castillo Pueblo Bello",
        arabic: "كاستيلو بويبلو بيلو"
      },
      {
        english: "Castillo Santa Barbara",
        arabic: "كاستيلو سانتا باربرا"
      },
      {
        english: "Catiga Mg2",
        arabic: "كاتيجا إم جي 2"
      },
      {
        english: "Catigua",
        arabic: "كاتيغوا"
      },
      {
        english: "Catimor",
        arabic: "كاتيمور"
      },
      {
        english: "Catimor 129",
        arabic: "كاتيمور 129"
      },
      {
        english: "Catimor F6.",
        arabic: "كاتيمور إف 6."
      },
      {
        english: "Catrenic",
        arabic: "كاترينيك"
      },
      {
        english: "Catucai",
        arabic: "كاتوكاي"
      },
      {
        english: "Centroamericano",
        arabic: "سنتروأميريكانو"
      },
      {
        english: "Colombia",
        arabic: "كولومبيا"
      },
      {
        english: "Costa Rica 95 Aka Cr-95",
        arabic: "كوستا ريكا 95 المعروف أيضاً بـ CR-95"
      },
      {
        english: "Cr (Costa Rica) 95",
        arabic: "كوستا ريكا 95 (CR)"
      },
      {
        english: "Cuscatleco",
        arabic: "كوسكاتليكو"
      },
      {
        english: "Devamachy",
        arabic: "ديفاماتشي"
      },
      {
        english: "Evaluna",
        arabic: "إيفالونا"
      },
      {
        english: "Fronton",
        arabic: "فرونتون"
      },
      {
        english: "Gayo Satu",
        arabic: "غايو ساتو"
      },
      {
        english: "Hibrido De Timor",
        arabic: "هجيبريدو دي تيمور"
      },
      {
        english: "Iapar 59",
        arabic: "آيابار 59"
      },
      {
        english: "Icafe 95",
        arabic: "إيكافيه 95"
      },
      {
        english: "IHcafe 90",
        arabic: "آي إتش كافيه 90"
      },
      {
        english: "Ipar 103",
        arabic: "إيبار 103"
      },
      {
        english: "Java",
        arabic: "جاوة"
      },
      {
        english: "Komasti",
        arabic: "كوماستي"
      },
      {
        english: "Lempira",
        arabic: "ليمبيرا"
      },
      {
        english: "Limani",
        arabic: "ليماني"
      }
    ]
    


    for (const row of data) {
      let sql = "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.english },
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate("global_translation_metadata", item, {
          id: global_trans?.map((item) => item.id),
        });
      } else {
        // Insert Case
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
      }

    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
