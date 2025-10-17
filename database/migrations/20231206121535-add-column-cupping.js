'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cupping', 'balance', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('cupping', 'balance_qualities', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cupping', 'balance');
    await queryInterface.removeColumn('cupping', 'balance_qualities');
  },
};
