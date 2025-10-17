'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("equipment_fuel_records", "fuel_unit", {
      type: Sequelize.ENUM(
        "litre",
        "gallon",
        "fluid_ounce",
        "quart"
      ),
      allowNull: false,
      default: "litre"
    });

    await queryInterface.removeColumn("equipment_fuel_records", "fuel_cost");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('equipment_fuel_records', 'fuel_unit');
    await queryInterface.addColumn("equipment_fuel_records", "fuel_cost", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    
  },
};