'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tickets', 'country', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('tickets', 'state', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('tickets', 'countryCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tickets', 'country');
    await queryInterface.removeColumn('tickets', 'state');
    await queryInterface.removeColumn('tickets', 'countryCode');
  }
};