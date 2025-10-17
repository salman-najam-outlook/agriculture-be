"use strict";

const data = [
  { english: "CacaoBuyingStation", dutch: "CacaoKoopStation" },
  { english: "CacaoOfflineFarmerList", dutch: "CacaoOfflineBoerenLijst" },
  { english: "Deforestation", dutch: "Ontbossing" },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Dutch translations into the 'dutch' column
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

  down: async (queryInterface, Sequelize) => {
    // Remove 'dutch' column
    await queryInterface.removeColumn("global_translation_metadata", "dutch");
  },
};
