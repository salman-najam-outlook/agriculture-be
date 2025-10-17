'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
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
        arabic: "راب C15"
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
        arabic: "سارشيمور"
      },
      {
        english: "Sigarar Utang",
        arabic: "سيغارار أوتانج"
      },
      {
        english: "Starmaya",
        arabic: "ستارمايا"
      },
      {
        english: "T5175",
        arabic: "T5175"
      },
      {
        english: "T5296",
        arabic: "T5296"
      },
      {
        english: "T8667",
        arabic: "T8667"
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
      },
      {
        english: "Typica (Bergandal, Sidikalang - Sumatera).",
        arabic: "تيبيكا (برجاندال، سيديكالانج - سومطرة)"
      },
      {
        english: "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
        arabic: "هجيبريدو دي تيمور (HDT، هجين عربي-روبوستا؛ تيم-تيم، آتشه)"
      },
      {
        english: "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
        arabic: "لينيه إس (S-288، S-795، أندونجساري، كوماستي؛ آتشه، فلوريس)"
      },
      {
        english: "Catimor (hybrid of Caturra x Timor)",
        arabic: "كاتيمور (هجين من كاتورا وتيمور)"
      },
      {
        english: "Jawa (Java Coffee, 1700 AD)",
        arabic: "جاوة (قهوة جاوية، 1700 م)"
      },
      {
        english: "Ethiopian lines (Rambung Abyssina, USDA)",
        arabic: "سلالات إثيوبية (رامبونج أبيسينا، USDA)"
      },
      {
        english: "Cattura Cultivars (mutasi Bourbon; originated in Brazil)",
        arabic: "أصناف كاتورا (متحورة من بوربون؛ نشأت في البرازيل)"
      },
      {
        english: "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
        arabic: "موندو نوفا (سيلاج تيبيكا-بوربون، من البرازيل)"
      },
      {
        english: "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
        arabic: "أرابوستا (HDT؛ هجين من العربيكا الخاملة والروبوستا)"
      },
      {
        english: "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta).",
        arabic: "سلالات كاتيمور (أندونجساري، أتينج، جالوك، كارتيكا/كاتواي/كاتاي - هجين من العربيكا والروبوستا)."
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
        arabic: "أرابيجو"
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
        arabic: "بنجويت"
      },
      {
        english: "Bergendal",
        arabic: "برجندال"
      },
      {
        english: "Bergundal Aka Garundang",
        arabic: "برجوندال معروف أيضاً بجاروندانج"
      },
      {
        english: "Bernardina",
        arabic: "برناردينا"
      },
      {
        english: "Blawan Paumah",
        arabic: "بلاوان بوماه"
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
        arabic: "بوربون ماياغيز 71"
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
        arabic: "بوربون ماياغيز 139"
      },
      {
        english: "Bourbon Mayaguez 71",
        arabic: "بوربون ماياغيز 71"
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
        arabic: "كوفيري"
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
        arabic: "تشيكومالجور"
      },
      {
        english: "Coorgs",
        arabic: "كورجز"
      },
      {
        english: "Criollo",
        arabic: "كريولو"
      },
      {
        english: "Culi Arabica",
        arabic: "كولي عربيكا"
      },
      {
        english: "Djimma",
        arabic: "جيما"
      },
      {
        english: "Emerald",
        arabic: "إميرالد"
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
        arabic: "آيابار 59"
      },
      {
        english: "Ibairi",
        arabic: "إيبايري"
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
        arabic: "جيمبر/إس 795"
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
        arabic: "كنت"
      },
      {
        english: "Kona",
        arabic: "كونا"
      },
      {
        english: "Kp423",
        arabic: "Kp423"
      },
      {
        english: "Laurina",
        arabic: "لاورينا"
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
        arabic: "ماراغوجيبي"
      },
      {
        english: "Maragogype",
        arabic: "ماراغوجايب"
      },
      {
        english: "Mayaguez",
        arabic: "ماياغيز"
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
        arabic: "باشي"
      },
      {
        english: "Pache Colis",
        arabic: "باشي كوليس"
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
