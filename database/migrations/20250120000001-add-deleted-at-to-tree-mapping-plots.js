'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tree_mapping_plots', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });

    // Add index for soft delete queries
    await queryInterface.addIndex('tree_mapping_plots', ['deleted_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('tree_mapping_plots', ['deleted_at']);
    await queryInterface.removeColumn('tree_mapping_plots', 'deleted_at');
  }
};