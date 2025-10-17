'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'userType', {
      type: Sequelize.ENUM('owner', 'breeder', 'offline', 'online'),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'userType', {
      type: Sequelize.ENUM('owner', 'breeder'),
      allowNull: true
    });
  },
};
