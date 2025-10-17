'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await Promise.all([
      queryInterface.addColumn('tree_species', 'genus', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('tree_species', 'genus'),
    ]);
  }
};
