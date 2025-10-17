'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "litres/second",
        portugese: "Litros/segundos",
      },
      {
        english: "Manual (hand) harvesting",
        portugese: "Colheita Manual",
      },
      {
        english: "Cassava (Brazil)",
        portugese: "Mandioca (Brasil)",
      },
      {
        english: "Oil palm (Brazil)",
        portugese: "Palheiro (Brasil)",
      },
      {
        english: "Mungbean",
        portugese: "Feijão",
      },
      {
        english: "Papaya (Brazil)",
        portugese: "Mamão (Brasil)",
      },
      {
        english: "Blueberry",
        portugese: "Mirtilo",
      },
      {
        english: "Grape",
        portugese: "Uva",
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

    queryInterface.bulkDelete('soil_prep_activity', {
      name: 'Nivelación'
    })

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
