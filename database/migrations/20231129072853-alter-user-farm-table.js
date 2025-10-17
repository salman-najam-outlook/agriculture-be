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

    await queryInterface.addColumn('user_farms','farmGeofenceName',{
      type:Sequelize.STRING,
      allowNull:true,
    })

    await queryInterface.addColumn('user_farms','farmGeofenceCategory',{
      type:Sequelize.STRING,
      allowNull:true,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('user_farms','farmGeofenceName');

    await queryInterface.removeColumn('user_farms','farmGeofenceCategory');
  }
};
