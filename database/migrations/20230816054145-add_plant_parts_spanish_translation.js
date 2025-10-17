'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Leaves",
        spanish: "Hojas",
        portugese: "Folhas",
        nepali: "पातहरू",
        indonesian: "Daun-daun"
      },
      {
        english: "Stem",
        spanish: "Provenir",
        portugese: "Tronco",
        nepali: "स्टेम",
        indonesian: "Tangkai"
      },
      {
        english: "Grain",
        spanish: "Grano",
        portugese: "Grão",
        nepali: "अन्न",
        indonesian: "Bulir"
      },
      {
        english: "Tuber",
        spanish: "Tubérculo",
        portugese: "Tubérculo",
        nepali: "टबर",
        indonesian: "Umbi"
      },
      {
        english: "Bulb",
        spanish: "Bulbo",
        portugese: "Lâmpada",
        nepali: "बल्ब",
        indonesian: "Bohlam"
      },
      {
        english: "Fruit",
        spanish: "Fruta",
        portugese: "Fruta",
        nepali: "फल",
        indonesian: "Buah"
      },
      {
        english: "Roots",
        spanish: "Raíces",
        portugese: "Raízes",
        nepali: "जराहरू",
        indonesian: "Akar"
      },
      {
        english: "Flowers",
        spanish: "flores",
        portugese: "flores",
        nepali: "फूलहरू",
        indonesian: "Bunga-bunga"
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
