'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // First, add a temporary column with boolean type
    await queryInterface.addColumn('sowing', 'plantation_status_temp', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    });

    // Update the temporary column with converted values
    await queryInterface.sequelize.query(`
      UPDATE sowing 
      SET plantation_status_temp = CASE 
        WHEN plantation_status = 'active' THEN true
        ELSE false
      END
    `);

    // Remove the old column
    await queryInterface.removeColumn('sowing', 'plantation_status');

    // Rename the temporary column to the original name
    await queryInterface.renameColumn('sowing', 'plantation_status_temp', 'plantation_status');

    // Update the column to have proper constraints
    await queryInterface.changeColumn('sowing', 'plantation_status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Plantation status - true for active, false for inactive'
    });
  },

  async down (queryInterface, Sequelize) {
    // First, add a temporary column with ENUM type
    await queryInterface.addColumn('sowing', 'plantation_status_temp', {
      type: Sequelize.ENUM('active', 'inactive', 'fully_harvested'),
      allowNull: true
    });

    // Update the temporary column with converted values
    await queryInterface.sequelize.query(`
      UPDATE sowing 
      SET plantation_status_temp = CASE 
        WHEN plantation_status = true THEN 'active'
        ELSE 'inactive'
      END
    `);

    // Remove the old column
    await queryInterface.removeColumn('sowing', 'plantation_status');

    // Rename the temporary column to the original name
    await queryInterface.renameColumn('sowing', 'plantation_status_temp', 'plantation_status');

    // Update the column to have proper constraints
    await queryInterface.changeColumn('sowing', 'plantation_status', {
      type: Sequelize.ENUM('active', 'inactive', 'fully_harvested'),
      allowNull: false,
      defaultValue: 'active',
      comment: 'Plantation status - active, inactive, or fully_harvested'
    });
  }
};
