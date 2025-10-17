'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_farms', 'farmerRegistrationId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_farms', 'farmRegistrationId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
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
