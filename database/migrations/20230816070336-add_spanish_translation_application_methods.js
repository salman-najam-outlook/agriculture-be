"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Hydraulic nozzles/sprayers",
        spanish: "Boquillas/pulverizadores hidráulicos",
        portugese: "Bicos/pulverizadores hidráulicos",
        nepali: "हाइड्रोलिक नोजल/स्प्रेयरहरू",
      },
      {
        english: "Electrostatically charged sprayers",
        spanish: "Pulverizadores cargados electrostáticamente",
        portugese: "Pulverizadores carregados eletrostaticamente",
        nepali: "इलेक्ट्रोस्टेटिक चार्ज गरिएको स्प्रेयरहरू",
      },
      {
        english: "Aerial spraying",
        spanish: "Fumigación aérea",
        portugese: "Pulverização aérea",
        nepali: "एरियल स्प्रेइङ",
      },
      {
        english: "Fumigation",
        spanish: "Fumigación",
        portugese: "Fumigação",
        nepali: "फ्युमिगेशन",
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
