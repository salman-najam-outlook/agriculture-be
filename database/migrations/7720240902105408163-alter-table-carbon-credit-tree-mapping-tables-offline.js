"use strict";

const treeMappingTables = [
  "tree_mapping_plots",
  "tree_mapping_requests",
  "tree_details",
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for await (const ccTable of treeMappingTables) {
      await queryInterface.addColumn(ccTable, "recordId", {
        type: Sequelize.STRING(200),
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    for await (const ccTable of treeMappingTables) {
      await queryInterface.removeColumn(ccTable, "recordId");
    }
  }
};

