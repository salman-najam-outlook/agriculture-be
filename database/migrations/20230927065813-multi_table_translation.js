'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Sowing/Land Prepration Report",
        arabic: "تقرير الزراعة/تهيئة الأرض"
      },
      {
        english: "Pest and Disease Management Report",
        arabic: "تقرير إدارة الآفات والأمراض"
      },
      {
        english: "Stem elongation",
        arabic: "استطالة الساق"
      },
      {
        english: "Brown rice",
        arabic: "أرز بني"
      },
      {
        english: "MyIrrigationWaterSources",
        arabic: "مصادر مياه الري الخاصة بي"
      },
      {
        english: "Dolomite",
        arabic: "الدولوميت"
      },
      {
        english: "Cultural/Natural",
        arabic: "ثقافي/طبيعي"
      },
      {
        english: "None",
        arabic: "لا شيء"
      },
      {
        english: "Deep ploughing",
        arabic: "حراثة عميقة"
      },
      {
        english: "Natural enemies/parasitism",
        arabic: "أعداء طبيعيين/تطفيل"
      },
      {
        english: "Push and pull",
        arabic: "دفع وسحب"
      },
      {
        english: "Ash and chilli",
        arabic: "رماد وفلفل"
      },
      {
        english: "Plant extracts",
        arabic: "مستخلصات نباتية"
      },
      {
        english: "Weeding",
        arabic: "التخلص من الأعشاب الضارة"
      },
      {
        english: "Use of mesh",
        arabic: "استخدام الشباك"
      },
      {
        english: "Uprooting of infested plants by hand",
        arabic: "قلع النباتات المصابة يدويًا"
      },
      {
        english: "Traps and bagging",
        arabic: "استخدام الفخاخ والأكياس"
      },
      {
        english: "Bio pesticides",
        arabic: "مبيدات حيوية"
      },
      {
        english: "Bio fumigation",
        arabic: "تبخير حيوي"
      },
      {
        english: "Scarecrows",
        arabic: "أشباح"
      },
      {
        english: "Tillage",
        arabic: "الحراثة"
      },
      {
        english: "Pruning",
        arabic: "التقليم"
      },
      {
        english: "Hand picking of pests",
        arabic: "اختيار الآفات باليد"
      },
      {
        english: "Aphids",
        arabic: "المن ذو القرون"
      },
      {
        english: "Bollworm",
        arabic: "دودة القطن"
      },
      {
        english: "Fall armyworm",
        arabic: "دودة الجيش السقوط"
      },
      {
        english: "Mites",
        arabic: "العث"
      },
      {
        english: "Whitefly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Caterpillars",
        arabic: "يرقات"
      },
      {
        english: "Leafhopper",
        arabic: "منفذ الأوراق"
      },
      {
        english: "Weevils",
        arabic: "ذوات الأنوف"
      },
      {
        english: "Cutworm",
        arabic: "دودة القطع"
      },
      {
        english: "Thrips",
        arabic: "ذبابة الثريبس"
      },
      {
        english: "Locusts",
        arabic: "جراد"
      },
      {
        english: "Birds",
        arabic: "الطيور"
      },
      {
        english: "Pod borer",
        arabic: "دودة القرون"
      },
      {
        english: "Stalk borers",
        arabic: "ديدان السيقان"
      },
      {
        english: "Moth",
        arabic: "العثة"
      },
      {
        english: "Stink bugs",
        arabic: "بق الغاز"
      },
      {
        english: "Potato beetle",
        arabic: "خنفساء البطاطس"
      },
      {
        english: "Corn root worm",
        arabic: "دودة جذور الذرة"
      },
      {
        english: "Mormon crickets",
        arabic: "جراد المورمون"
      },
      {
        english: "Japanese Beetle",
        arabic: "خنفساء يابانية"
      },
      {
        english: "Fruitfly",
        arabic: "ذبابة الفاكهة"
      },
      {
        english: "Nematode",
        arabic: "النيماتودا"
      },
      {
        english: "Leaf folder",
        arabic: "مجلد الأوراق"
      },
      {
        english: "Mealy bug",
        arabic: "علة متدرجة"
      },
      {
        english: "Leaf hopper",
        arabic: "منفذ الأوراق"
      },
      {
        english: "Leaf webber",
        arabic: "ويبر الأوراق"
      },
      {
        english: "Stem fly",
        arabic: "ذبابة الساق"
      },
      {
        english: "Midge",
        arabic: "الذبابة الصغيرة"
      },
      {
        english: "San-Jose-scale",
        arabic: "حشرة مقيمة سان خوسيه"
      },
      {
        english: "Capsule borer",
        arabic: "حفار كبسولة"
      },
      {
        english: "Gall fly",
        arabic: "ذبابة الغال"
      },
      {
        english: "White grub",
        arabic: "يرقة بيضاء"
      },
      {
        english: "Aphids",
        arabic: "من ذو القرون"
      },
      {
        english: "Cut worms",
        arabic: "الديدان القاطعة"
      },
      {
        english: "Nematode",
        arabic: "النيماتودا"
      },
      {
        english: "Mealy bugs",
        arabic: "علة متدرجة"
      },
      {
        english: "Tea mosquitoe bugs",
        arabic: "بق الشاي"
      },
      {
        english: "Flatid Plant hoppers",
        arabic: "يرقات نبات الفلاتيد"
      },
      {
        english: "Aphids",
        arabic: "من ذو القرون"
      },
      {
        english: "Stem Girdler",
        arabic: "جاراف الساق"
      },
      {
        english: "European skipper",
        arabic: "مفترسة أوروبية"
      },
      {
        english: "Creal rust mite adults",
        arabic: "ذبابة الصدأ"
      },
      {
        english: "Wireworms",
        arabic: "الديدان الأسلاكية"
      },
      {
        english: "Grasshopper",
        arabic: "الجراد"
      },
      {
        english: "Mealy bug",
        arabic: "علة متدرجة"
      },
      {
        english: "Armyworm",
        arabic: "الدودة العسكرية"
      },
      {
        english: "Bihar hair caterpillar",
        arabic: "يرقة الشعر بيهار"
      },
      {
        english: "Cabbage butterfly",
        arabic: "فراشة الكرنب"
      },
      {
        english: "Mustard aphid",
        arabic: "من ذو القرون في الخردل"
      },
      {
        english: "Mustard sawfly",
        arabic: "ذبابة الخردل"
      },
      {
        english: "Painted bug",
        arabic: "البق المرسوم"
      },
      {
        english: "Bean Aphids",
        arabic: "من ذو القرون في الفاصوليا"
      },
      {
        english: "Blister beetle",
        arabic: "خنفساء الفقاعات"
      },
      {
        english: "Blue butterfly",
        arabic: "فراشة زرقاء"
      },
      {
        english: "Gram pod borer",
        arabic: "دودة قرن الغرام"
      },
      {
        english: "Grass blue butterfly",
        arabic: "فراشة زرقاء العشب"
      },
      {
        english: "Leafhopper",
        arabic: "منفذ الأوراق"
      },
      {
        english: "Lab lab bug or Stink bug",
        arabic: "بق اللاب لاب أو البق الكريه"
      },
      {
        english: "Pod bugs",
        arabic: "بق القرون"
      },
      {
        english: "Spiny pod borer",
        arabic: "دودة قرن الشوك"
      },
      {
        english: "Spotted pod borer",
        arabic: "دودة قرن المنقطة"
      },
      {
        english: "Leaf webber or roller and capsule borer",
        arabic: "منفذ الأوراق أو ملتوية وجارف الكبسولات"
      },
      {
        english: "Gall fly",
        arabic: "ذبابة الأمصال"
      },
      {
        english: "Sesame leafhopper",
        arabic: "منفذ الأوراق في السمسم"
      },
      {
        english: "Hawk moth",
        arabic: "عثة الصقر"
      },
      {
        english: "Bihar hairy caterpillar",
        arabic: "يرقة الشعر بيهار"
      },
      {
        english: "Aphids",
        arabic: "من ذو القرون"
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
