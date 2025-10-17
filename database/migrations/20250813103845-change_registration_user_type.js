'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Change column registrationUserType from ENUM to STRING and allow nulls
    await queryInterface.changeColumn('users', 'registrationUserType', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Drop existing enum type (replace enum type name accordingly)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('users', 'registrationUserType', {
      type: Sequelize.ENUM("ekspor", "koperasi","keduanya"), // replace with original enum values
      allowNull: true,
    });
  }
};
