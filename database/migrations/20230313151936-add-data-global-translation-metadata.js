"use strict";

const moment = require("moment");

const langaugeObjects = [
  {
    english: "Tickets",
    spanish: "Entradas",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "global_translation_metadata",
        langaugeObjects,
        {},
        {}
      );
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
