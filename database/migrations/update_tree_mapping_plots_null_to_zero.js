'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update existing NULL values to 0 for slope, aspect, and no_of_trees
    await queryInterface.sequelize.query(`
      UPDATE tree_mapping_plots 
      SET 
        slope = COALESCE(slope, 0),
        aspect = COALESCE(aspect, 0),
        no_of_trees = COALESCE(no_of_trees, 0)
      WHERE slope IS NULL OR aspect IS NULL OR no_of_trees IS NULL;
    `);

    // Modify columns to NOT NULL with DEFAULT 0
    await queryInterface.changeColumn('tree_mapping_plots', 'slope', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.changeColumn('tree_mapping_plots', 'aspect', {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.changeColumn('tree_mapping_plots', 'no_of_trees', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert columns back to allow NULL
    await queryInterface.changeColumn('tree_mapping_plots', 'slope', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: null
    });

    await queryInterface.changeColumn('tree_mapping_plots', 'aspect', {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: true,
      defaultValue: null
    });

    await queryInterface.changeColumn('tree_mapping_plots', 'no_of_trees', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    });
  }
};