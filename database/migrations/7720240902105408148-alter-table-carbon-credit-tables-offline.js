"use strict";

const carbonCreditTables = [
  "carbon_credit_projects",
  "carbon_credit_sdgs",
  "carbon_credit_projects_sdgs",
  "carbon_credit_project_vintages",
  "carbon_credit_project_farm",
  "carbon_credit_project_attachments",
  "carbon_credit_crop_growing",
  "carbon_credit_crop_growing_equipments",
  "carbon_credit_crop_growing_crops",
  "carbon_credit_crop_growing_crop_varieties",
  "carbon_credit_crop_growing_crops_sowings",
  "carbon_credit_crop_growing_crops_seedlings",
  "carbon_credit_crop_growing_crops_fertilizers"
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for await (const ccTable of carbonCreditTables) {
      await queryInterface.addColumn(ccTable, "recordId", {
        type: Sequelize.STRING(200),
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    for await (const ccTable of carbonCreditTables) {
      await queryInterface.removeColumn(ccTable, "recordId");
    }
  }
};

