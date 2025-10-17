"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("surveys_list", "isDeleted", {
      type: Sequelize.BOOLEAN,
      after: "linkedWithFarms",
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("surveys_list", "isDeleted")
  }
};
