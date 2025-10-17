'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Arabusta",
        arabic: "آرابوستا"
      },
      {
        english: "Arla",
        arabic: "آرلا"
      },
      {
        english: "Ateng",
        arabic: "أتينج"
      },
      {
        english: "Batian",
        arabic: "باتيان"
      },
      {
        english: "Bogor Prada",
        arabic: "بوجور برادا"
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
        arabic: "كاستيلو إل روزاريو"
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
        arabic: "كاستيلو باراغويسيتو"
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
        arabic: "كاتيغا إم جي 2"
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
        arabic: "كاتيمور إف 6"
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
        arabic: "كوستاريكا 95 المعروفة أيضًا باسم سي آر - 95"
      },
      {
        english: "Cr (Costa Rica) 95",
        arabic: "سي آر (كوستاريكا) 95"
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
        arabic: "جايو ساتو"
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
        arabic: "آيكافي 95"
      },
      {
        english: "IHcafe 90",
        arabic: "آي إتش كافي 90"
      },
      {
        english: "Ipar 103",
        arabic: "آيبار 103"
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
      },
      {
        english: "Maracatu",
        arabic: "ماراكاتو"
      },
      {
        english: "Marsellesa",
        arabic: "مارسيليزا"
      },
      {
        english: "Milenio",
        arabic: "ميلينيو"
      },
      {
        english: "Mundo Maya",
        arabic: "موندو مايا"
      },
      {
        english: "Nayarita",
        arabic: "ناياريتا"
      },
      {
        english: "Nemaya",
        arabic: "نيمايا"
      },
      {
        english: "Obata",
        arabic: "أوباتا"
      },
      {
        english: "Obata Rojo",
        arabic: "أوباتا روخو"
      },
      {
        english: "Oro Azteca",
        arabic: "أورو أزتيكا"
      },
      {
        english: "Parainema",
        arabic: "باراينيما"
      },
      {
        english: "Paraiso",
        arabic: "بارايسو"
      },
      {
        english: "Rab C15",
        arabic: "راب سي 15"
      },
      {
        english: "Rambung",
        arabic: "رامبونج"
      },
      {
        english: "Rasuna",
        arabic: "راسونا"
      },
      {
        english: "S.12 Kaffa",
        arabic: "S.12 كافا"
      },
      {
        english: "Sarchimor",
        arabic: "سارتشيمور"
      },
      {
        english: "Sigarar Utang",
        arabic: "سيجارار أوتانج"
      },
      {
        english: "Starmaya",
        arabic: "ستارمايا"
      },
      {
        english: "T5175",
        arabic: "تي 5175"
      },
      {
        english: "T5296",
        arabic: "تي 5296"
      },
      {
        english: "T8667",
        arabic: "تي 8667"
      },
      {
        english: "Tabi",
        arabic: "تابي"
      },
      {
        english: "Timor",
        arabic: "تيمور"
      },
      {
        english: "Tupi",
        arabic: "توبي"
      },
      {
        english: "Variedad Colombia",
        arabic: "فارييداد كولومبيا"
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
