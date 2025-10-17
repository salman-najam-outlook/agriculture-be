'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('plantations', 'plantationStatus', {
      type: Sequelize.ENUM('pending', 'active'),
      defaultValue: 'pending',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('plantations', 'plantationStatus');
  },
};
