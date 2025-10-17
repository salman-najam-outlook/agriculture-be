'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the unique constraint from plantation_id field in sowing table
    try {
      // First, check if the constraint exists and drop it
      await queryInterface.removeIndex('sowing', 'plantation_id');
    } catch (error) {
      console.log('Unique index on plantation_id may not exist, continuing...');
    }
    
    try {
      // Also try removing any unique constraint that might exist with a different name
      await queryInterface.removeConstraint('sowing', 'sowing_plantation_id_unique');
    } catch (error) {
      console.log('Named unique constraint may not exist, continuing...');
    }
    
    try {
      // Try removing constraint with default naming convention
      await queryInterface.removeConstraint('sowing', 'plantation_id');
    } catch (error) {
      console.log('Constraint with plantation_id name may not exist, continuing...');
    }

    // Ensure the column exists without unique constraint
    await queryInterface.changeColumn('sowing', 'plantation_id', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    });
  },

  async down(queryInterface, Sequelize) {
    // Add back the unique constraint (if we ever need to rollback)
    await queryInterface.changeColumn('sowing', 'plantation_id', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  }
};
