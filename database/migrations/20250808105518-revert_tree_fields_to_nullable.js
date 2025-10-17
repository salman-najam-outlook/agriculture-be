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
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });

    // Revert tree_mapping_plots fields to nullable
    await queryInterface.changeColumn('tree_mapping_plots', 'slope', {
      type: Sequelize.DECIMAL,
      allowNull: true,
      defaultValue: null
    });
    
    await queryInterface.changeColumn('tree_mapping_plots', 'aspect', {
      type: Sequelize.DECIMAL,
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
    // Keep fields as nullable - no changes needed for rollback
    // This migration only makes fields nullable, so down function can be empty
    // or keep the same nullable state to avoid conflicts with existing data
  }
};
