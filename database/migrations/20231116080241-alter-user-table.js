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

    await queryInterface.addColumn('users','gender',{
      type:Sequelize.STRING(10),
      allowNull:true,
      after:"lastName",
    })

    await queryInterface.addColumn("users", "id_number", {
      type: Sequelize.STRING(40),
      allowNull: true,
      after:"gender"
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users','gender');
    await queryInterface.dropTable('users','id_number');
  }
};
