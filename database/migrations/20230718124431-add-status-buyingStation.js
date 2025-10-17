'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BuyingStationOrders', 'status', {
      type: Sequelize.ENUM('global', 'local', 'merged', 'new_user'),
      allowNull: true,
      defaultValue: null,
    })  
  }, 
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BuyingStationOrders', 'status');
  },
};
