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
    await queryInterface.removeColumn('cacao_drying_process', 'typeOfDrying')
    await queryInterface.removeColumn('cacao_drying_process', 'status')
    await queryInterface.addColumn('cacao_drying_process', 'typeOfDrying', {
      allowNull: true,
      type: Sequelize.ENUM('Drying trays', 'Elbas (movable dryers)', 'Drying Tunnels', 'Cement'),
      after: 'dryingTime'
    });
    await queryInterface.addColumn('cacao_drying_process', 'status', {
      allowNull: false,
      defaultValue: 'Incomplete',
      type: Sequelize.ENUM('Incomplete', 'Complete'),
      after: 'numberOfBags'
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
