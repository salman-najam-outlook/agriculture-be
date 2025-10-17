'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'BuyingStationProcessingBatches',
      'buyingStationId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        after: 'id',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'BuyingStationProcessingBatches',
      'buyingStationId'
    );
  },
};
