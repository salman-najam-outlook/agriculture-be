'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Modify the column to allow NULL values
    await queryInterface.changeColumn('disease_management_chemical_type', 'applicationMethodId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // Modify the column back to disallow NULL values
    await queryInterface.changeColumn('disease_management_chemical_type', 'applicationMethodId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
