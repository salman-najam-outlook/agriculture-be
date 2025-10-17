"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'app_type', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "connected_farmer",

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'app_type');
  },
};
