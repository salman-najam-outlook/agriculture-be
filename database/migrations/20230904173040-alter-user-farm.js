'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_farms', 'farmerName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_farms', 'farmerId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_farms', 'isTechnician', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
