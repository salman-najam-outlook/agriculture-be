"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Establishment stage",
        swahili: "Hatua ya kuanzishwa",
      },
      {
        english: "Budding stage",
        swahili: "Hatua ya chipukizi",
      },
      {
        english: "Flower initiation and blooming stage",
        swahili: "Hatua ya kuanza kwa maua na maua",
      },
      {
        english: "Seed Germination",
        swahili: "Kuota kwa Mbegu",
      },
      {
        english: "Harvest",
        swahili: "Mavuno",
      },
      {
        english: "Storage root initiation stage",
        swahili: "Hatua ya uanzishaji wa mizizi ya uhifadhi",
      },
      {
        english: "Storage root bulking stage",
        swahili: "Hatua ya kuhifadhi mizizi bulking",
      },
      {
        english: "Vegetative growth stage",
        swahili: "Hatua ya ukuaji wa mimea",
      },
      {
        english: "Inflorescence  stage",
        swahili: "Hatua ya inflorescence",
      },
      {
        english: "Fruit Development stage",
        swahili: "Hatua ya Maendeleo ya Matunda",
      },
      {
        english: "Ripening  stage",
        swahili: "Hatua ya kukomaa",
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
