'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update existing NULL values to 0 for tree measurement fields
    await queryInterface.sequelize.query(`
      UPDATE tree_details 
      SET 
        diameter_at_breast_height = COALESCE(diameter_at_breast_height, 0),
        height = COALESCE(height, 0),
        crown_base_height = COALESCE(crown_base_height, 0),
        vigor = COALESCE(vigor, 0),
        defect = COALESCE(defect, 0)
      WHERE diameter_at_breast_height IS NULL 
         OR height IS NULL 
         OR crown_base_height IS NULL 
         OR vigor IS NULL 
         OR defect IS NULL;
    `);

    // Modify columns to NOT NULL with DEFAULT 0
    await queryInterface.changeColumn('tree_details', 'diameter_at_breast_height', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.changeColumn('tree_details', 'height', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.changeColumn('tree_details', 'crown_base_height', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.changeColumn('tree_details', 'vigor', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.changeColumn('tree_details', 'defect', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert columns back to allow NULL
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
  }
};