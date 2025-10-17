'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_farms', 'farmerLastName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_farms', 'farmerMiddleName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.renameColumn('user_farms', 'farmerName', 'farmerFirstName');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
