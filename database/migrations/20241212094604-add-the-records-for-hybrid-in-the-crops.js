"use strict";

const crop = require("../../models/crop");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const optionNames = [
      "Cacao (Panama)",
      "Cacao (Ivory Coast)",
      "Cacao (Colombia)",
      "Cacao (Peru)",
      "Cacao (Honduras)",
      "Cacao (Brazil)",
    ];

    const options = await queryInterface.sequelize.query(
      `SELECT id, name FROM options WHERE name IN (:names)`,
      {
        replacements: { names: optionNames },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Define the crops to add
    const cropsToAdd = [];

    for (const option of options) {
      const existingCrop = await queryInterface.sequelize.query(
        `SELECT id FROM crops WHERE cropTypeOptId = :cropTypeOptId AND name = 'Hybrid'`,
        {
          replacements: { cropTypeOptId: option.id },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (existingCrop.length === 0) {
        cropsToAdd.push({
          name: "Hybrid",
          cropTypeOptId: option.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    if (cropsToAdd.length > 0) {
      await queryInterface.bulkInsert("crops", cropsToAdd);
    } else {
      console.log("No new crops to add");
    }
  },

  async down(queryInterface, Sequelize) {},
};
