'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Revert tree_details fields to nullable
    await queryInterface.changeColumn('tree_details', 'diameter_at_breast_height', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_details', 'height', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_details', 'crown_base_height', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_details', 'vigor', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_details', 'defect', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    });

    // Revert tree_mapping_plots fields to nullable
    await queryInterface.changeColumn('tree_mapping_plots', 'slope', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_mapping_plots', 'aspect', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_mapping_plots', 'no_of_trees', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    });
  },

  async down (queryInterface, Sequelize) {
    // Empty down function to avoid migration issues
    // Fields will remain nullable to prevent data loss
  }
};