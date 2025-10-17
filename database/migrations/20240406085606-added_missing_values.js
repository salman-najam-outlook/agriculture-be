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

    const dryingMillingTypes = [
      {
        name: 'Sun Drying'
      },
      {
        name: 'Mechanical Drying',
      }
    ]

    await queryInterface.bulkInsert('drying_type', dryingMillingTypes);
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
