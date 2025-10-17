'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'BuyingStationOrders',
      'farmId',
      {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    );
    await queryInterface.addColumn(
      'BuyingStationOrders',
      'plantationId',
      {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    );
    await queryInterface.addColumn(
      'BuyingStationOrders',
      'speciesId',
      {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    );
    await queryInterface.addColumn(
      'BuyingStationOrders',
      'varietyId',
      {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'BuyingStationOrders',
      'farmId'
    );
    await queryInterface.removeColumn(
      'BuyingStationOrders',
      'plantationId'
    );
    await queryInterface.removeColumn(
      'BuyingStationOrders',
      'speciesId'
    );
    await queryInterface.removeColumn(
      'BuyingStationOrders',
      'varietyId'
    );
  },
};
