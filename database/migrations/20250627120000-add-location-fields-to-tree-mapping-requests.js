'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tree_mapping_requests', 'farm_location_address', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Complete address of the farm location'
    });

    await queryInterface.addColumn('tree_mapping_requests', 'country', {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: 'Country where the farm is located'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tree_mapping_requests', 'farm_location_address');
    await queryInterface.removeColumn('tree_mapping_requests', 'country');
  }
}; 