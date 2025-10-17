'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Fumigation",
        arabic: "تبخير"
      },
      {
        english: "Other",
        arabic: "آخر"
      },
      {
        english: "Increasing The Yields",
        arabic: "زيادة العائدات"
      },
      {
        english: "Optimize The Use Of Synthetic",
        arabic: "تحسين استخدام المركبات الاصطناعية"
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
