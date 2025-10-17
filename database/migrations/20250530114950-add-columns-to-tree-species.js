'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('tree_species', 'symbol', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('tree_species', 'species', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('tree_species', 'symbol'),
      queryInterface.removeColumn('tree_species', 'species')
    ]);
  }
};
