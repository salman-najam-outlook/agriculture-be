'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'BuyingStationProcessingBatches',
      'usedForWarehouse',
      {
        type: Sequelize.BOOLEAN,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'BuyingStationProcessingBatches',
      'usedForWarehouse'
    );
  },
};


