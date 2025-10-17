'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tree_details', 'diameter_at_breast_height', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('tree_details', 'height', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('tree_details', 'crown_base_height', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('tree_details', 'vigor', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tree_details', 'diameter_at_breast_height');
    await queryInterface.removeColumn('tree_details', 'height');
    await queryInterface.removeColumn('tree_details', 'crown_base_height');
    await queryInterface.removeColumn('tree_details', 'vigor');
  }
};
