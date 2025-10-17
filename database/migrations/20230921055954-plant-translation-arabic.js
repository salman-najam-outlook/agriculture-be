'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Leaves",
        arabic: "أوراق",
      },
      {
        english: "Stem",
        arabic: "ينبع",
      },
      {
        english: "Grain",
        arabic: "قمح",
      },
      {
        english: "Tuber",
        arabic: "درنة",
      },
      {
        english: "Bulb",
        arabic: "مصباح",
      },
      {
        english: "Fruit",
        arabic: "فاكهة",
      },
      {
        english: "Roots",
        arabic: "الجذور",
      },
      {
        english: "Flowers",
        arabic: "زهور",
      },
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
