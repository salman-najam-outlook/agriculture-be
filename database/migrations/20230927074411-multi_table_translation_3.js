'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Fruit fly",
        arabic: "ذبابة الفاكهة"
      },
      {
        english: "Moth",
        arabic: "عثة"
      },
      {
        english: "Black scale",
        arabic: "قشرة سوداء"
      },
      {
        english: "Mites",
        arabic: "الفاكهة"
      },
      {
        english: "Diamondback moth",
        arabic: "عثة ظهر الماس"
      },
      {
        english: "Leaf webber",
        arabic: "نساج الأوراق"
      },
      {
        english: "Borer",
        arabic: "الثاقب"
      },
      {
        english: "Cauliflower butterfly",
        arabic: "فراشة القرنبيط"
      },
      {
        english: "Aphid",
        arabic: "من ثنى"
      },
      {
        english: "Gram Pod Borer/ Capsule Borer",
        arabic: "دودة القرنبيط / دودة الكبسولة"
      },
      {
        english: "Caterpillar",
        arabic: "يرقة"
      },
      {
        english: "Bud Fly/Capsule Fly",
        arabic: "ذبابة البرعم / ذبابة الكبسولة"
      },
      {
        english: "Berry Borer",
        arabic: "دودة العنب"
      },
      {
        english: "White Stem Borer",
        arabic: "دودة الساق البيضاء"
      },
      {
        english: "Shot Hole Borer",
        arabic: "دودة ثقب الرصاص"
      },
      {
        english: "Red Borer",
        arabic: "دودة حمراء"
      },
      {
        english: "American Boll Worm",
        arabic: "دودة كرة أمريكية"
      },
      {
        english: "Spotted Boll Worm",
        arabic: "دودة الكرة المنقطة"
      },
      {
        english: "Pink Boll Worm",
        arabic: "دودة الكرة الوردية"
      },
      {
        english: "Jassid",
        arabic: "جاسيد"
      },
      {
        english: "Mexican Bean Beetle",
        arabic: "خنفساء الفاصوليا المكسيكية"
      },
      {
        english: "Leafminers",
        arabic: "منقي الأوراق"
      },
      {
        english: "Corn Earworm",
        arabic: "دودة الذرة"
      },
      {
        english: "Stinkbugs",
        arabic: "بق الكريهة"
      },
      {
        english: "Gram Pod Borer",
        arabic: "دودة القرنبيط"
      },
      {
        english: "Leaf Eating Caterpillar",
        arabic: "يرقة الأكل الأخضر"
      },
      {
        english: "Whitefly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Serpentine Leaf Miner",
        arabic: "منقي الأوراق المتعرج"
      },
      {
        english: "Thrips",
        arabic: "ذبابة الثريبس"
      },
      {
        english: "Pinworm",
        arabic: "دودة السيخ"
      },
      {
        english: "Red Spider Mite",
        arabic: "عثة العنكبوت الحمراء"
      },
      {
        english: "Anthracnose",
        arabic: "الفطريات"
      },
      {
        english: "Top Shoot Borer",
        arabic: "دودة الساق العليا"
      },
      {
        english: "Leaf Gall Thrips",
        arabic: "ذبابة غال الأوراق"
      },
      {
        english: "Scale Insects",
        arabic: "حشرات الحشرات"
      },
      {
        english: "Black Scale",
        arabic: "قشرة سوداء"
      },
      {
        english: "White Scale",
        arabic: "قشرة بيضاء"
      },
      {
        english: "Shield Scale",
        arabic: "قشرة الدرع"
      },
      {
        english: "Leaf Beetle",
        arabic: "خنفساء الأوراق"
      },
      {
        english: "Capitulum Borer",
        arabic: "دودة السياق"
      },
      {
        english: "Tobacco Caterpillar",
        arabic: "يرقة التبغ"
      },
      {
        english: "Leaf Hopper",
        arabic: "ذبابة الأوراق"
      },
      {
        english: "Sunflower Beetle",
        arabic: "خنفساء عباد الشمس"
      },
      {
        english: "Woolly Aphids",
        arabic: "من ثنى وبري"
      },
      {
        english: "San Jose Scale",
        arabic: "قشرة سان خوسيه"
      },
      {
        english: "Codling Moth",
        arabic: "دودة التفاح"
      },
      {
        english: "European Red Mite",
        arabic: "عثة الأوراق الحمراء الأوروبية"
      },
      {
        english: "Mango Hopper",
        arabic: "منقي المانجو"
      },
      {
        english: "Mango Mealy Bug",
        arabic: "دودة القطن المانجو"
      },
      {
        english: "Mango Bark Eating Caterpillar",
        arabic: "يرقة الأشجار"
      },
      {
        english: "Mango Fruit Fly",
        arabic: "ذبابة الفاكهة المانجو"
      },
      {
        english: "Inflorescence Midge",
        arabic: "ذبابة الزهر"
      },
      {
        english: "Mango Stem Borer",
        arabic: "دودة ساق المانجو"
      },
      {
        english: "Mango Seed Weevil",
        arabic: "دودة بذور المانجو"
      },
      {
        english: "Mango Leaf Webber",
        arabic: "نساج أوراق المانجو"
      },
      {
        english: "Mango Shoot Gall Psylla",
        arabic: "الجزر المنجلي"
      },
      {
        english: "Quinoa Moth",
        arabic: "دودة الكينوا"
      },
      {
        english: "Aphids",
        arabic: "من ثنى"
      },
      {
        english: "Leaf Miner Flies",
        arabic: "منقي الأوراق"
      },
      {
        english: "Shoot and Capsule Bore",
        arabic: "دودة الساق والكبسولة"
      },
      {
        english: "Aphids",
        arabic: "من ثنى"
      },
      {
        english: "Shoot Fly",
        arabic: "ذبابة الساق"
      },
      {
        english: "Green Mite",
        arabic: "العث الأخضر"
      },
      {
        english: "Mealy Bug",
        arabic: "المن"
      },
      {
        english: "Whitefly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Variegated Cricket",
        arabic: "الجراد المتعدد الألوان"
      },
      {
        english: "Earhead Bug",
        arabic: "سوسة رأس السنبلة"
      },
      {
        english: "Ear Head Caterpillar",
        arabic: "يرقة رأس السنبلة"
      },
      {
        english: "Pink Stem Borer",
        arabic: "حفار الساق الوردية"
      },
      {
        english: "Plant Lice (Aphids)",
        arabic: "قمل النبات (الخنافس)"
      },
      {
        english: "Shoot Bug",
        arabic: "حشرة الساق"
      },
      {
        english: "Shootfly",
        arabic: "ذبابة الساق"
      },
      {
        english: "Sorghum Cutworm",
        arabic: "دودة قصب الذرة"
      },
      {
        english: "Sorghum Midge",
        arabic: "دغبوس الذرة السورغومية"
      },
      {
        english: "Stem Borer",
        arabic: "حفار الساق"
      },
      {
        english: "Tobacco Caterpillar",
        arabic: "يرقة تبغ"
      },
      {
        english: "Stem Borer",
        arabic: "حفار الساق"
      },
      {
        english: "Whitefly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Green Peach Aphid",
        arabic: "قمل الخوخ الأخضر"
      },
      {
        english: "Capsule Borer",
        arabic: "حفار الكبسولة"
      },
      {
        english: "Ground Beetles",
        arabic: "خنافس الأرض"
      },
      {
        english: "Root Knot Nematode",
        arabic: "النيماتودا عقدة الجذر"
      },
      {
        english: "Shoot borer",
        arabic: "حفار الساق"
      },
      {
        english: "Rhizome flies",
        arabic: "ذباب الدرنات"
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
        english: "Mealy bug",
        arabic: "قمل الميالي"
      },
      {
        english: "Aphids",
        arabic: "قمل النبات"
      },
      {
        english: "Fruit fly",
        arabic: "ذبابة الفاكهة"
      },
      {
        english: "Grasshopper",
        arabic: "جرادة"
      },
      {
        english: "Grape Berry Moth",
        arabic: "عثة عنب الزبيب"
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
