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
        name: 'Earthy'
      },
      {
        name: 'Slightly nutty,',
      },
      {
        name: 'Fruity,',
      }
    ]

    await queryInterface.bulkInsert('cacao_dryMilling_flavors', dryingMillingTypes);
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
