"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("equipment_fuel_records", "recordId", {
      type: Sequelize.STRING(200),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("equipment_fuel_records", "recordId");
  }
};

