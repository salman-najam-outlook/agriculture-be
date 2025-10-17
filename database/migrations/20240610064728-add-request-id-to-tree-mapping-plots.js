'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tree_mapping_plots', 'tree_mapping_request_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'tree_mapping_requests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tree_mapping_plots', 'tree_mapping_request_id');
  }
};