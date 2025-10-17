'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new values to the ENUM type for role_type
    await queryInterface.changeColumn('roles', 'role_type', {
      type: Sequelize.ENUM('admin', 'app_user', 'support_admin', 'manager'),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert ENUM to original values
    await queryInterface.changeColumn('roles', 'role_type', {
      type: Sequelize.ENUM('admin', 'app_user'),
      allowNull: false,
    });
  }
};