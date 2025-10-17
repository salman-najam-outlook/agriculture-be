"use strict";

const moment = require("moment");

const languageObjects = [
  {
    english: "Profile",
    hindi: "प्रोफ़ाइल",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Producers",
    hindi: "निर्माता",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Buy Sell Overview",
    portugese: "Visão Geral Compra Venda",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Due Diligence Guide",
    portugese: "Guia de Diligência Prévia",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Farm Activities",
    portugese: "Atividades da Fazenda",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
 ];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const row of languageObjects) {
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
            const language = key.toLowerCase().trim();
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
            const language = key.toLowerCase().trim();
            item[language] = row[key] != null ? row[key] : ''; // Default to an empty string
          }
          await queryInterface.bulkInsert("global_translation_metadata", [item]);
        }
      }
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    for (const obj of languageObjects) {
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        { english: obj.english },
        {},
        {}
      );
    }
  },
};