'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Increasing The Yields",
        arabic: "زيادة العائدات"
      },
      {
        english: "Optimize The Use Of Synthetic Fertilizers",
        arabic: "تحسين استخدام الأسمدة الاصطناعية"
      },
      {
        english: "honey",
        arabic: "عسل"
      },
      {
        english: "natural (dry)",
        arabic: "جاف طبيعي"
      },
      {
        english: "wine",
        arabic: "نبيذ"
      },
      {
        english: "Placement",
        arabic: "التموضع"
      },
      {
        english: "Band placement",
        arabic: "وضع الشريط"
      },
      {
        english: "Foliar application",
        arabic: "التطبيق الورقي"
      },
      {
        english: "Injection into soil",
        arabic: "حقن في التربة"
      },
      {
        english: "Dolomite",
        arabic: "الدولوميت"
      },
      {
        english: "Hydraulic nozzles/sprayers",
        arabic: "فوهات/رشاشات هيدروليكية"
      },
      {
        english: "Electrostatically charged sprayers",
        arabic: "رشاشات مشحونة كهربائياً بالكهرباء الساكنة"
      },
      {
        english: "Aerial spraying",
        arabic: "رش جوي"
      },
      {
        english: "Crown gall",
        arabic: "تاج الجل"
      },
      {
        english: "Mulching",
        arabic: "تغطية التربة"
      },
      {
        english: "Crop rotation",
        arabic: "تناوب المحاصيل"
      },
      {
        english: "Remove diseased plant",
        arabic: "إزالة النباتات المصابة"
      },
      {
        english: "Planting resistant cultivars",
        arabic: "زراعة أصناف مقاومة"
      },
      {
        english: "Use of bio fumigants",
        arabic: "استخدام مدخنات حيوية"
      },
      {
        english: "Use of oils and soaps",
        arabic: "استخدام الزيوت والصابون"
      },
      {
        english: "Black spot",
        arabic: "بقعة سوداء"
      },
      {
        english: "Leaves",
        arabic: "الأوراق"
      },
      {
        english: "Stem",
        arabic: "الساق"
      },
      {
        english: "Grain",
        arabic: "الحبوب"
      },
      {
        english: "Tuber",
        arabic: "الدرنات"
      },
      {
        english: "Fruit",
        arabic: "الفاكهة"
      },
      {
        english: "Roots",
        arabic: "الجذور"
      },
      {
        english: "Flowers",
        arabic: "الزهور"
      },
      {
        english: "Stem elongation",
        arabic: "استطالة الساق"
      },
      {
        english: "Fumigation",
        arabic: "تبخير"
      },
      {
        english: "none",
        arabic: "لا شيء"
      },
      {
        english: "Earthing up",
        arabic: "تربية التربة حول النبات"
      },
      {
        english: "Pruning",
        arabic: "التقليم"
      },
      {
        english: "Others",
        arabic: "أخرى"
      },
      {
        english: "Manure",
        arabic: "سماد"
      },
      {
        english: "agriculture lime",
        arabic: "جير زراعي"
      },
      {
        english: "dolomite",
        arabic: "الدولوميت"
      },
      {
        english: "test fuel",
        arabic: "وقود الاختبار"
      },
      {
        english: "tesr fuel",
        arabic: "وقود تجريبي"
      },
      {
        english: "my new fuel",
        arabic: "وقود جديد"
      },
      // {
      //   english: "gg",
      //   arabic: "جيجي"
      // },
      // {
      //   english: "hh",
      //   arabic: "هه"
      // },
      // {
      //   english: "yggg",
      //   arabic: "يججج"
      // },
      // {
      //   english: "yshwuwhwhw",
      //   arabic: "وشوهوهو"
      // },
      {
        english: "test",
        arabic: "اختبار"
      },
      {
        english: "Bacterial ooze",
        arabic: "تسرب البكتيريا"
      },
      {
        english: "Bacterial streaming",
        arabic: "تيار البكتيريا"
      },
      {
        english: "Water soaked lesions",
        arabic: "تمنيج المكان المصاب بالماء"
      },
      {
        english: "Canker",
        arabic: "التقزم"
      },
      {
        english: "Leaf spot with yellow halo",
        arabic: "بقعة الأوراق مع هالة صفراء"
      },
      {
        english: "Shepherds crook ends on woody plants",
        arabic: "عصا الراعي تنتهي على النباتات الخشبية"
      },
      {
        english: "Wildfire of tobacco",
        arabic: "حريق النباتات التبغية"
      },
      {
        english: "Blight of beans",
        arabic: "مرض الفول"
      },
      {
        english: "Fire blight",
        arabic: "حريق النبات"
      },
      {
        english: "Soft rot",
        arabic: "تعفن لين"
      },
      {
        english: "Aster yellows",
        arabic: "مرض الأستر الأصفر"
      },
      {
        english: "Cultural/natural/manual",
        arabic: "ثقافي/طبيعي/يدوي"
      },
      {
        english: "Fungal",
        arabic: "فطري"
      },
      {
        english: "Viral",
        arabic: "فيروسي"
      },
      {
        english: "Bacterial",
        arabic: "بكتيري"
      },
      {
        english: "Leaf spots",
        arabic: "بقع الأوراق"
      },
      {
        english: "Bird's eye spot",
        arabic: "بقعة عين الطائر"
      },
      {
        english: "Damping off on seedlings",
        arabic: "تعفن البزور على الشتلات"
      },
      {
        english: "Apple scab",
        arabic: "عفن التفاح"
      },
      {
        english: "Fusarium Wilt",
        arabic: "ذبول الفوزاريوم"
      },
      {
        english: "Soft rot",
        arabic: "تعفن لين"
      },
      {
        english: "Club root",
        arabic: "جذر النادي"
      },
      {
        english: "Maize streak virus",
        arabic: "فيروس تراكم الذرة"
      },
      {
        english: "Yellowed leaves",
        arabic: "أوراق مصفرة"
      },
      {
        english: "Plant stunting",
        arabic: "تقزم النبات"
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
