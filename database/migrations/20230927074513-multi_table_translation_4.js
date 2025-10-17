'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Grape Thrips",
        arabic: "ذبابة العنب"
      },
      {
        english: "Grape Leaf Miner Flies",
        arabic: "ذباب العنب المنقرض"
      },
      {
        english: "Grape Mealy Bugs",
        arabic: "قمل الميالي في العنب"
      },
      {
        english: "Grape Stem borer",
        arabic: "حفار سيقان العنب"
      },
      {
        english: "Red pumpkin beetle",
        arabic: "خنفساء اليقطين الحمراء"
      },
      {
        english: "Thrips",
        arabic: "ذبابة العنب"
      },
      {
        english: "Aphids",
        arabic: "قمل النبات"
      },
      {
        english: "Whitefly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Leaf eating caterpillar",
        arabic: "يرقة الأوراق المأكولة"
      },
      {
        english: "Serpentine Leaf Miner",
        arabic: "منقرض الأوراق المتعرج"
      },
      {
        english: "Red Spider Mite",
        arabic: "عثة العنكبوت الحمراء"
      },
      {
        english: "Cutworms",
        arabic: "الدودة القاطعة"
      },
      {
        english: "Cucumber Beetle",
        arabic: "خنفساء الخيار"
      },
      {
        english: "Some Pest",
        arabic: "بعض الآفات"
      },
      {
        english: "Mites",
        arabic: "الفايديات"
      },
      {
        english: "Blueberry flea beetle",
        arabic: "خنفساء العليقة الزرقاء"
      },
      {
        english: "Sharpnosed leafhopper",
        arabic: "ذبابة الورق شديدة الأنف"
      },
      {
        english: "Thrips",
        arabic: "ذبابة العنكبوت"
      },
      {
        english: "Aphid",
        arabic: "قمل النبات"
      },
      {
        english: "Cutworm",
        arabic: "الدودة القاطعة"
      },
      {
        english: "Diamondback moth",
        arabic: "عثة ظهر الماس"
      },
      {
        english: "Butterfly",
        arabic: "فراشة"
      },
      {
        english: "False codling moth",
        arabic: "عثة الترميمة الزائفة"
      },
      {
        english: "Thrips",
        arabic: "ذبابة العنكبوت"
      },
      {
        english: "Scales",
        arabic: "حشرات الحرشف"
      },
      {
        english: "Fruit fly",
        arabic: "ذبابة الفاكهة"
      },
      {
        english: "Mealy bug",
        arabic: "قمل الميالي"
      },
      {
        english: "Nematodes",
        arabic: "النيماتودا"
      },
      {
        english: "Butterfly larvae",
        arabic: "يرقات الفراشة"
      },
      {
        english: "Rodents",
        arabic: "القوارض"
      },
      {
        english: "Shoot borer",
        arabic: "حفار الساق"
      },
      {
        english: "Leaf roller",
        arabic: "لفافة الأوراق"
      },
      {
        english: "Thrips",
        arabic: "ذبابة العنكبوت"
      },
      {
        english: "Rhizome scales",
        arabic: "حشرات الدرنات"
      },
      {
        english: "Aphid",
        arabic: "قمل النبات"
      },
      {
        english: "Cyyclamen Mite",
        arabic: "عثة الزنبق"
      },
      {
        english: "Potato Leafhoppre",
        arabic: "عثة ورقة البطاطا"
      },
      {
        english: "Root Weevil",
        arabic: "خنفساء الجذر"
      },
      {
        english: "Slugs",
        arabic: "البوصليات"
      },
      {
        english: "Spittle Bugs",
        arabic: "حشرات البصاق"
      },
      {
        english: "SrawberryClipper (Bud) Weevil",
        arabic: "خنفساء الفراولة (برعم) الجذر"
      },
      {
        english: "Tarnished Plant Bug",
        arabic: "حشرة النبات المتعرج"
      },
      {
        english: "Two - Spotted Mite",
        arabic: "عثة ذات نقطتين"
      },
      {
        english: "Western Flower Thrips",
        arabic: "ذبابة الزهور الغربية"
      },
      {
        english: "White Grubs (Japanese Beetle)",
        arabic: "اليرقات البيضاء (خنفساء يابانية)"
      },
      {
        english: "Leaf Roller",
        arabic: "لفافة الأوراق"
      },
      {
        english: "Cutworms and Armyworms",
        arabic: "الدود القاطعة ودود الجيش"
      },
      {
        english: "New Pest",
        arabic: "آفة جديدة"
      },
      {
        english: "New Pest 2",
        arabic: "آفة جديدة 2"
      },
      {
        english: "Pea Aphids",
        arabic: "قمل البازلاء"
      },
      {
        english: "Leaf Miner",
        arabic: "منقرض الأوراق"
      },
      {
        english: "Pea Stem fly",
        arabic: "ذبابة ساق البازلاء"
      },
      {
        english: "Pod Borer",
        arabic: "حفار القرون"
      },
      {
        english: "Pea Moth",
        arabic: "عثة البازلاء"
      },
      {
        english: "Pea Weevil/ bruchid",
        arabic: "خنفساء البازلاء / القرنفل"
      },
      {
        english: "Pea Thrips",
        arabic: "ذبابة البازلاء"
      },
      {
        english: "Cutworms",
        arabic: "الدودة القاطعة"
      },
      {
        english: "African Armyworm",
        arabic: "دودة الجيش الإفريقية"
      },
      {
        english: "Bean Aphid",
        arabic: "قمل البقول"
      },
      {
        english: "Crown and Root Aphids",
        arabic: "قمل الجذر والتاج"
      },
      {
        english: "Weevil",
        arabic: "خنفساء"
      },
      {
        english: "Tuber moth",
        arabic: "عثة الدرنات"
      },
      {
        english: "Aphids",
        arabic: "قمل النبات"
      },
      {
        english: "Whitefly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Aphids",
        arabic: "قمل النبات"
      },
      {
        english: "Curculios beetle",
        arabic: "خنفساء الجذع"
      },
      {
        english: "Rose scale insects",
        arabic: "حشرات القشرة الوردية"
      },
      {
        english: "Rose chaffer beetle",
        arabic: "خنفساء الوردة الدراجة"
      },
      {
        english: "Pod borers",
        arabic: "حفار القرون"
      },
      {
        english: "Armyworms",
        arabic: "دودة الجيش"
      },
      {
        english: "Root knot nematodes",
        arabic: "النيماتودا عقدة الجذر"
      },
      {
        english: "Flower thrips",
        arabic: "ذبابة الزهور"
      },
      {
        english: "Gram pod borer",
        arabic: "حفار القرون في الحمص"
      },
      {
        english: "Spotted Pod Borer",
        arabic: "حفار القرون المنقط"
      },
      {
        english: "Leaf Webber",
        arabic: "حشرة الورق"
      },
      {
        english: "Pod Fly",
        arabic: "ذبابة القرون"
      },
      {
        english: "Plume Moth",
        arabic: "عثة الريشة"
      },
      {
        english: "Blister Beetle",
        arabic: "خنفساء المكروهات"
      },
      {
        english: "Aphids",
        arabic: "المن ذوات الجناحين"
      },
      {
        english: "Honey",
        arabic: "عسل"
      },
      {
        english: "Natural (Dry)",
        arabic: "طبيعي (جاف)"
      },
      {
        english: "Wine",
        arabic: "نبيذ"
      },
      {
        english: "Semi-Washed",
        arabic: "شبه مُغسول"
      },
      {
        english: "Full-Washed",
        arabic: "مُغسول بالكامل"
      },
      {
        english: "Sandy loam soil",
        arabic: "تربة رملية"
      },
      {
        english: "Clay loam soil",
        arabic: "تربة صلبة رملية"
      },
      {
        english: "Silt loam soil",
        arabic: "تربة طينية رملية"
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
