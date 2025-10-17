'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'userType', {
      type: Sequelize.ENUM('owner', 'breeder', 'offline', 'online', 'offline_technician', 'final_product_buyer', 'purchase_confirm_farmer'),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'userType', {
      type: Sequelize.ENUM('owner', 'breeder', 'offline', 'online', 'offline_technician'),
      allowNull: true
    });
  },
};
