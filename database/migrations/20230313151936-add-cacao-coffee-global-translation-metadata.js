"use strict";

const moment = require("moment");

const langaugeObjects = [
  {
    english: "Coffee Overview",
    spanish: "Datos del Café",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Cacao Overview",
    spanish: "Datos del Cacao",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const row of langaugeObjects) {
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
            id: global_trans?.map(item => item.id)
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
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    for (const obj of langaugeObjects) {
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        { english: langaugeObjects[obj].english },
        {},
        {}
      );
    }
  },
};
