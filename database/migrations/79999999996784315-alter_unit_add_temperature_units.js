'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('BuyingStationProcessingBatches', 'temperatureUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    });


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('BuyingStationProcessingBatches', 'temperatureUnitId');
  },
};
