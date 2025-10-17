'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const data = [
      {
        english: "QA Topic",
        arabic: "موضوع الجودة"
      },
      {
        english: "My Profile",
        arabic: "ملفي الشخصي"
      },
      {
        english: "Technical Issues",
        arabic: "قضايا فنية"
      },
    ]
    const insertData = []
    for (const row of data) {
      insertData.push({
        english: row.english,
        arabic: row.arabic,
        hindi: null,
        marathi: null,
        spanish: null,
        indonesian: null,
        portugese: null,
        nepali: null,
        french: null,
        swahili: null,
        bengali: null,
        oromo: null,
        somali: null,
        vietnamese: null,
        amharic: null,
      })
    }

    for (const row of insertData) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
