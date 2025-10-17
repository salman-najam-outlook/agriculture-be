"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("global_translation_metadata", "japanese", {
      type: Sequelize.TEXT,
      after: "turkish",
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("global_translation_metadata", "japanese")
  }
};
