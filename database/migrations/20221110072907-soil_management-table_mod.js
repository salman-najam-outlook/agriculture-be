'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('soil_management', 'testLocationLat', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('soil_management', 'testLocationLog', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('soil_management', 'testLocationAddr', {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn('soil_management', 'testLocationFarmId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'user_farms',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('soil_management', 'testLocationLat');
    await queryInterface.removeColumn('soil_management', 'testLocationLog');
    await queryInterface.removeColumn('soil_management', 'testLocationAddr');
    await queryInterface.removeColumn('soil_management', 'testLocationFarmId');
  },
};
