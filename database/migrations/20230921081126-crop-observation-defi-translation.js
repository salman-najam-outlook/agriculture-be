'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Chloritic leaf margins",
        arabic: "هوامش الأوراق الكلورية"
      },
      {
        english: "Chlorosis/yellowing of leaves",
        arabic: "الكلوروز/إصفرار الأوراق"
      },
      {
        english: "Curling and shedding of leaves",
        arabic: "تجعيد وتساقط الأوراق"
      },
      {
        english: "Dark, dull or blue-green leaves",
        arabic: "أوراق داكنة أو باهتة أو زرقاء اللون"
      },
      {
        english: "Early flowering",
        arabic: "الإزهار المبكر"
      },
      {
        english: "Early senescing of older leaves",
        arabic: "شيخوخة مبكرة للأوراق القديمة"
      },
      {
        english: "Leaves look burnt at the tip",
        arabic: "تبدو الأوراق محترقة في الطرف"
      },
      {
        english: "Necrosis",
        arabic: "تنخر"
      },
      {
        english: "Necrotic leaves",
        arabic: "أوراق نخرة"
      },
      {
        english: "Poor root development",
        arabic: "تطوير جذور ضعيف"
      },
      {
        english: "Purple spots on leaves",
        arabic: "بقع بنفسجية على الأوراق"
      },
      {
        english: "Purple/reddish stems",
        arabic: "أعناق بنفسجية/حمراء"
      },
      {
        english: "Purplish and red pigment on leaves",
        arabic: "صبغة بنفسجية وحمراء على الأوراق"
      },
      {
        english: "Slow growth",
        arabic: "نمو بطيء"
      },
      {
        english: "Small leaf size",
        arabic: "حجم الأوراق الصغير"
      },
      {
        english: "Stunted growth",
        arabic: "نمو متعثر"
      },
      {
        english: "Stunted growth",
        arabic: "نمو متعثر"
      },
      {
        english: "Thin/weak stems",
        arabic: "أعناق رقيقة/ضعيفة"
      },
      {
        english: "Underdeveloped roots",
        arabic: "جذور غير متطورة"
      },
      {
        english: "Weak stalks/stems",
        arabic: "سيقان/أعناق ضعيفة"
      },
      {
        english: "Wilting",
        arabic: "الذبول"
      },
      {
        english: "Yellowing and white interveinal stripping of lower leaves",
        arabic: "إصفرار وتقشير بين العروق البيضاء للأوراق السفلية"
      },
      {
        english: "Staggered",
        arabic: "متعثر"
      },
      {
        english: "Straight",
        arabic: "مستقيم"
      },
      {
        english: "Broad",
        arabic: "عريض"
      },
      {
        english: "Medium",
        arabic: "متوسط"
      },
      {
        english: "Thin",
        arabic: "رفيع"
      },
      {
        english: "Dark green/brownish stems",
        arabic: "أعناق خضراء داكنة/بنية"
      },
      {
        english: "Dark leaves",
        arabic: "أوراق داكنة"
      },
      {
        english: "Fruit deformation",
        arabic: "تشوه الثمار"
      },
      {
        english: "Interveinal chlorosis of new leaves",
        arabic: "كلوروز العروق البينية للأوراق الجديدة"
      },
      {
        english: "Shedding of leaves",
        arabic: "تساقط الأوراق"
      },
      {
        english: "Short internodes",
        arabic: "بعد الأعقاد القصير"
      },
      {
        english: "Small leaf size",
        arabic: "حجم الأوراق الصغير"
      },
      {
        english: "Stiff and weak stem",
        arabic: "سيقان صلبة وضعيفة"
      },
      {
        english: "Stunted growth",
        arabic: "نمو متعثر"
      },
      {
        english: "Underdeveloped roots",
        arabic: "جذور غير متطورة"
      },
      {
        english: "Vegetative buds instead of reproductive buds",
        arabic: "براعم نباتية بدلاً من براعم التكاثر"
      },
      {
        english: "Vigorous growth",
        arabic: "نمو قوي"
      },
      {
        english: "Weed infestation",
        arabic: "احتلال الأعشاب الضارة"
      },
      {
        english: "Organic",
        arabic: "عضوي"
      },
      {
        english: "Synthetic",
        arabic: "اصطناعي"
      },
      {
        english: "Soil",
        arabic: "تربة"
      },
      {
        english: "Foliar Fertilization",
        arabic: "تسميد الأوراق"
      },
      {
        english: "General",
        arabic: "عام"
      },
      {
        english: "Land preparation",
        arabic: "تجهيز الأرض"
      },
      {
        english: "Transportation",
        arabic: "نقل"
      },
      {
        english: "Irrigation",
        arabic: "ري"
      },
      {
        english: "Storage",
        arabic: "تخزين"
      },
      {
        english: "Castration",
        arabic: "الخصي"
      },
      {
        english: "Dehorning",
        arabic: "إزالة القرون"
      },
      {
        english: "Eartagging/Animal Identification",
        arabic: "وسم الأذن/تحديد الحيوانات"
      },
      {
        english: "Milking",
        arabic: "الحلب"
      },
      {
        english: "Transportation",
        arabic: "نقل"
      },
      {
        english: "Planting",
        arabic: "زراعة"
      },
      {
        english: "Harvesting",
        arabic: "حصاد"
      },
      {
        english: "Spraying",
        arabic: "رش"
      },
      {
        english: "Weeding",
        arabic: "قلع الأعشاب الضارة"
      },
      {
        english: "Weighing",
        arabic: "وزن"
      },
      {
        english: "Branding",
        arabic: "وسم"
      },
      {
        english: "Drying",
        arabic: "تجفيف"
      },
      {
        english: "Artificial insemination",
        arabic: "التلقيح الاصطناعي"
      },
      {
        english: "Hoof care",
        arabic: "رعاية الحوافر"
      },
      {
        english: "Processing",
        arabic: "معالجة"
      },
      {
        english: "General",
        arabic: "عام"
      },
      {
        english: "Crop production equipment",
        arabic: "معدات إنتاج المحاصيل"
      },
      {
        english: "Livestock production equipment",
        arabic: "معدات إنتاج الماشية"
      },
      {
        english: "Vehicle",
        arabic: "مركبة"
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
