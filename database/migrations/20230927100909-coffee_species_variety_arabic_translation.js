'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Arabica",
        arabic: "أرابيكا"
      },
      {
        english: "Robusta",
        arabic: "روبوستا"
      },
      {
        english: "Liberica",
        arabic: "ليبيريكا"
      },
      {
        english: "Typica",
        arabic: "تيبيكا"
      },
      {
        english: "Bourbon",
        arabic: "بوربون"
      },
      {
        english: "Pacamara",
        arabic: "باكامارا"
      },
      {
        english: "Hybrid",
        arabic: "هجين"
      },
      {
        english: "Arabica",
        arabic: "أرابيكا"
      },
      {
        english: "Robusta",
        arabic: "روبوستا"
      },
      {
        english: "Liberica",
        arabic: "ليبيريكا"
      },
      {
        english: "Typica",
        arabic: "تيبيكا"
      },
      {
        english: "Bourbon",
        arabic: "بوربون"
      },
      {
        english: "Pacamara",
        arabic: "باكامارا"
      },
      {
        english: "Hybrid",
        arabic: "هجين"
      },
      {
        english: "Typica (Bergandal, Sidikalang - Sumatera)",
        arabic: "تيبيكا (برغاندال، سيديكالانج - سومطرة)"
      },
      {
        english: "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
        arabic: "هجين تيمور (هجين عربيكا-روبوستا؛ تيم تيم، آتشيه)"
      },
      {
        english: "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
        arabic: "ليني إس (S-288، S-795، أندونجساري، كوماستي؛ آتشيه، فلوريس)"
      },
      {
        english: "Catimor (hybrid of Caturra x Timor)",
        arabic: "كاتيمور (هجين من كاتورا وتيمور)"
      },
      {
        english: "Jawa (Java Coffee, 1700AD)",
        arabic: "جاوا (قهوة جاوا، 1700 م)"
      },
      {
        english: "Ethiopian lines (Rambung Abyssina, USDA)",
        arabic: "خطوط إثيوبية (رامبونج أبيسينا، إدارة الزراعة الأمريكية)"
      },
      {
        english: "Cattura Cultivars (mutasi Bourbon; originated in Brazil)",
        arabic: "سلالات كاتورا (ميوتاسي بوربون؛ نشأت في البرازيل)"
      },
      {
        english: "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
        arabic: "موندو نوفا (سيلانج تيبيكا-بوربون، من البرازيل)"
      },
      {
        english: "Arabusta (HDT; Hybrid of sterile Arabica and C. Robusta)",
        arabic: "أرابوستا (هجين من أرابيكا غير خصبة وروبوستا)"
      },
      {
        english: "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta)",
        arabic: "خطوط كاتيمور (أندونجساري، أتنج، جالوك، كارتيكا/كاتواي/كاتاي - هجين من أرابيكا وروبوستا)"
      },
      {
        english: "Acaia",
        arabic: "أكايا"
      },
      {
        english: "Agata",
        arabic: "أجاتا"
      },
      {
        english: "Amarello De Botucatu",
        arabic: "أماريلو دي بوتوكاتو"
      },
      {
        english: "Arabigo",
        arabic: "أرابيغو"
      },
      {
        english: "Arusha",
        arabic: "أروشا"
      },
      {
        english: "Batian",
        arabic: "باتيان"
      },
      {
        english: "Benguet",
        arabic: "بينغويت"
      },
      {
        english: "Bergendal",
        arabic: "برجندال"
      },
      {
        english: "Bergundal Aka Garundang",
        arabic: "برجندال أيضًا جاروندانج"
      },
      {
        english: "Bernardina",
        arabic: "برناردينا"
      },
      {
        english: "Blawan Paumah",
        arabic: "بلاوان باوماه"
      },
      {
        english: "Blue Mountain",
        arabic: "الجبل الأزرق"
      },
      {
        english: "Bmj",
        arabic: "بي إم جي"
      },
      {
        english: "Bonifieur",
        arabic: "بونيفيور"
      },
      {
        english: "Boubon Mayaguez 71",
        arabic: "بوربون ماياغويز 71"
      },
      {
        english: "Bourbon",
        arabic: "بوربون"
      },
      {
        english: "Bourbon Chocol",
        arabic: "بوربون شوكول"
      },
      {
        english: "Bourbon Mayaguez 139",
        arabic: "بوربون ماياغويز 139"
      },
      {
        english: "Bourbon Mayaguez 71",
        arabic: "بوربون ماياغويز 71"
      },
      {
        english: "Catuai",
        arabic: "كاتواي"
      },
      {
        english: "Caturra",
        arabic: "كاتورا"
      },
      {
        english: "Cauvery",
        arabic: "كافيري"
      },
      {
        english: "Cera",
        arabic: "سيرا"
      },
      {
        english: "Chandragiri",
        arabic: "تشاندراجيري"
      },
      {
        english: "Chickumalgur",
        arabic: "تشيكومالغور"
      },
      {
        english: "Coorgs",
        arabic: "كورجس"
      },
      {
        english: "Criollo",
        arabic: "كريولو"
      },
      {
        english: "Culi Arabica",
        arabic: "كولي أرابيكا"
      },
      {
        english: "Djimma",
        arabic: "جيما"
      },
      {
        english: "Emerald",
        arabic: "الزمرد"
      },
      {
        english: "French Mission",
        arabic: "المهمة الفرنسية"
      },
      {
        english: "Gesha",
        arabic: "جيشا"
      },
      {
        english: "Guatemala",
        arabic: "غواتيمالا"
      },
      {
        english: "Harrar",
        arabic: "هرار"
      },
      {
        english: "Harrar",
        arabic: "هرار"
      },
      {
        english: "Iapar59",
        arabic: "آيبار59"
      },
      {
        english: "Ibairi",
        arabic: "إيبيري"
      },
      {
        english: "Jackson",
        arabic: "جاكسون"
      },
      {
        english: "Jackson 2/1257",
        arabic: "جاكسون 2/1257"
      },
      {
        english: "Jember/S795",
        arabic: "جيمبير/S795"
      },
      {
        english: "K20",
        arabic: "K20"
      },
      {
        english: "K7",
        arabic: "K7"
      },
      {
        english: "Kalossi",
        arabic: "كالوسي"
      },
      {
        english: "Kent",
        arabic: "كينت"
      },
      {
        english: "Kona",
        arabic: "كونا"
      },
      {
        english: "Kp423",
        arabic: "KP423"
      },
      {
        english: "Laurina",
        arabic: "لورينا"
      },
      {
        english: "Lekempti",
        arabic: "ليكمبتي"
      },
      {
        english: "Lintong",
        arabic: "لينتونغ"
      },
      {
        english: "Maracaturra",
        arabic: "ماراكاتورا"
      },
      {
        english: "Maragogipe",
        arabic: "ماراغوجيب"
      },
      {
        english: "Maragogype",
        arabic: "ماراغوجيب"
      },
      {
        english: "Mayaguez",
        arabic: "ماياغويز"
      },
      {
        english: "Mibirizi",
        arabic: "ميبيريزي"
      },
      {
        english: "Mocha/Mokka",
        arabic: "موكا/موكا"
      },
      {
        english: "Mundo Novo",
        arabic: "موندو نوفو"
      },
      {
        english: "Nyasaland",
        arabic: "نياسالاند"
      },
      {
        english: "Old Chiks",
        arabic: "أولد تشيكس"
      },
      {
        english: "Onix",
        arabic: "أونيكس"
      },
      {
        english: "Orange Bourbon",
        arabic: "أورانج بوربون"
      },
      {
        english: "Ouro Bronze",
        arabic: "أورو برونز"
      },
      {
        english: "Ouro Verde",
        arabic: "أورو فيردي"
      },
      {
        english: "Pacamara",
        arabic: "باكامارا"
      },
      {
        english: "Pacas",
        arabic: "باكاس"
      },
      {
        english: "Pache",
        arabic: "باتشي"
      },
      {
        english: "Pache Colis",
        arabic: "باتشي كوليس"
      },
      {
        english: "Pache Comum",
        arabic: "باتشي كوموم"
      },
      {
        english: "Pink Bourbon",
        arabic: "بينك بوربون"
      },
      {
        english: "Pluma Hidalgo",
        arabic: "بلوما هيدالغو"
      },
      {
        english: "Pop3303/21",
        arabic: "بوب 3303/21"
      },
      {
        english: "Red Bourbon",
        arabic: "ريد بوربون"
      },
      {
        english: "Rosa Morena",
        arabic: "روزا مورينا"
      },
      {
        english: "Rubi",
        arabic: "روبي"
      },
      {
        english: "Ruiru 11",
        arabic: "رويرو 11"
      },
      {
        english: "Safira",
        arabic: "صفيرا"
      },
      {
        english: "Sagada",
        arabic: "ساجادا"
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
