"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tree_images", "timestamp", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("tree_images", "timestamp");
  },
};
