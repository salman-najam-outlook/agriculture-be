"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Start date",
        arabic: "تاريخ البدء",
      },
      {
        english: "End date",
        arabic: "تاريخ الانتهاء",
      },
      {
        english: "Our recommendation",
        arabic: "توصياتنا",
      },
      {
        english: "Your soil pH",
        arabic: "درجة حموضة التربة لديك",
      },
      {
        english: "Your soil organic carbon",
        arabic: "الكربون العضوي في تربتك",
      },
      {
        english: "Your soil nitrogen",
        arabic: "نيتروجين التربة الخاص بك",
      },
      {
        english: "Your soil phosphorus",
        arabic: "فوسفور التربة الخاص بك",
      },
      {
        english: "Your soil potassium",
        arabic: "البوتاسيوم التربة الخاصة بك",
      },
      {
        english: "Your soil sulfur",
        arabic: "كبريت تربتك",
      },
      {
        english: "Your date of irrigation",
        arabic: "تاريخ الري الخاص بك",
      },
      {
        english: "Your water volume",
        arabic: "حجم الماء الخاص بك",
      },
      {
        english: "Weeding date",
        arabic: "تاريخ إزالة الأعشاب الضارة",
      },
      {
        english: "Days after sowing",
        arabic: "بعد أيام من البذر",
      },
      {
        english: "Weeding Method",
        arabic: "طريقة إزالة الأعشاب الضارة",
      },
      {
        english: "Your yield (tonnes/ha)",
        arabic: "العائد الخاص بك (طن / هكتار)",
      },
      {
        english: "Your harvesting date",
        arabic: "موعد الحصاد الخاص بك",
      },
      {
        english: "Days after sowing",
        arabic: "بعد أيام من البذر",
      },
      {
        english: "Yield losses",
        arabic: "خسائر العائد",
      },
      {
        english: "Reason",
        arabic: "سبب",
      },
    ];
    for (const row of data) {
      let sql =
        "SELECT * FROM global_translation_metadata WHERE english = :english";
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
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
