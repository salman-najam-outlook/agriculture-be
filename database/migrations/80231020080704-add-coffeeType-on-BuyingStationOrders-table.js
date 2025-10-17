'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'BuyingStationOrders',
      {
        purchasedAt: Sequelize.col('createdAt'),
      },
      {
        purchasedAt: '0000-00-00',
      },
    );
    await queryInterface.addColumn('BuyingStationOrders', 'coffeeTypeId', {
      type: Sequelize.INTEGER({ unsigned: true }),
      allowNull: true,
      references: {
        model: 'coffee_types',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('BuyingStationOrders', 'coffeeTypeId');
  },
};
