'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('weed', 'herbicideType')
    await queryInterface.removeColumn('weed', 'herbicideUsed')
    await queryInterface.removeColumn('weed', 'herbicideUsedUnitId')
    await queryInterface.removeColumn('weed', 'herbicideRate')
    await queryInterface.removeColumn('weed', 'herbicideRateUnitId')
    await queryInterface.dropTable('weeddata_application_methods')

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
