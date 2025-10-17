'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Cassava",
        portugese: "Mandioca/Macaxeira",
      },
      {
        english: "Palleiro",
        portugese: "Palheiro",
      },
      {
        english: "Mungbean",
        portugese: "Feijão",
      },
      {
        english: "Brazil",
        portugese: "Brasil",
      },
      {
        english: "Kidney Bean",
        portugese: "Feijão Vermelho/Da Terra",
      },
      {
        english: "Apple",
        portugese: "Maçã",
      },
      {
        english: "Orange",
        portugese: "Laranja",
      },
      {
        english: "Strawberry",
        portugese: "Morango",
      },
      {
        english: "Papaya",
        portugese: "Mamão",
      },
      {
        english: "Blueberry",
        portugese: "Mirtilo",
      },
      {
        english: "Grape",
        portugese: "Uva",
      },
      {
        english: "Millileter",
        portugese: "Mililitro",
      },
      {
        english: "litres/hour",
        portugese: "Litros/horas",
      },
      {
        english: "litres/second",
        portugese: "Litros/segundos",
      },
      {
        english: "Milk weed",
        portugese: "Erva Daninha Do Leite",
      },
      {
        english: "Mower",
        portugese: "Cortado/fouçado",
      },
      {
        english: "Colheita Manual (Mão)",
        portugese: "Colheita Manual",
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
