'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Pache Comum",
        arabic: "باشي كوموم"
      },
      {
        english: "Pink Bourbon",
        arabic: "بنك بوربون"
      },
      {
        english: "Pluma Hidalgo",
        arabic: "بلوما هيدالغو"
      },
      {
        english: "Pop3303/21",
        arabic: "بوب3303/21"
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
      },
      {
        english: "San Bernardo Aka Pache",
        arabic: "سان بيرناردو المعروفة أيضًا باسم باشي"
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
        arabic: "سيمبرفلورينز"
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
        arabic: "إس إل 14"
      },
      {
        english: "Sl28",
        arabic: "إس إل 28"
      },
      {
        english: "Sl34",
        arabic: "إس إل 34"
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
        arabic: "سومطرة لينتونج"
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
        arabic: "توركيزا"
      },
      {
        english: "Typica",
        arabic: "تيبيكا"
      },
      {
        english: "Usda762",
        arabic: "أوسدا 762"
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
        arabic: "فيلا لوبوس"
      },
      {
        english: "Walichu/ Wolisho",
        arabic: "واليتشو/ ووليشو"
      },
      {
        english: "Yellow Bourbon",
        arabic: "إفريز"
      },
      {
        english: "Yirgacheffe",
        arabic: "يرجاشيف"
      },
      {
        english: "Brs 1216",
        arabic: "بي آر إس 1216"
      },
      {
        english: "Brs 2336",
        arabic: "بي آر إس 2336"
      },
      {
        english: "Brs 3210",
        arabic: "بي آر إس 3210"
      },
      {
        english: "Brs 3213",
        arabic: "بي آر إس 3213"
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
        arabic: "كابينج الاميد"
      },
      {
        english: "Kopi Luwak",
        arabic: "قهوة كوبي لواك"
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
        arabic: "الاختيار 1ر"
      },
      {
        english: "Selection 2r",
        arabic: "الاختيار 2ر"
      },
      {
        english: "Selection 3r",
        arabic: "الاختيار 3ر"
      },
      {
        english: "Sln 270",
        arabic: "إس إل إن 270"
      },
      {
        english: "Sln 274",
        arabic: "إس إل إن 274"
      },
      {
        english: "TR4",
        arabic: "تي آر 4"
      },
      {
        english: "TR5",
        arabic: "تي آر 5"
      },
      {
        english: "TR6",
        arabic: "تي آر 6"
      },
      {
        english: "TR7",
        arabic: "تي آر 7"
      },
      {
        english: "TR8",
        arabic: "تي آر 8"
      },
      {
        english: "BP42",
        arabic: "بي بي 42"
      },
      {
        english: "BP234",
        arabic: "بي بي 234"
      },
      {
        english: "BP288",
        arabic: "بي بي 288"
      },
      {
        english: "BP358",
        arabic: "بي بي 358"
      },
      {
        english: "BP409",
        arabic: "بي بي 409"
      },
      {
        english: "SA237",
        arabic: "إس إيه 237"
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
        arabic: "ليبريكا"
      },
      {
        english: "Sln288",
        arabic: "إس إل إن 288"
      },
      {
        english: "Sln10",
        arabic: "إس إل إن 10"
      },
      {
        english: "Abyssinia 3",
        arabic: "أبيسينيا 3"
      },
      {
        english: "Anacafe 14",
        arabic: "أناكافي 14"
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
