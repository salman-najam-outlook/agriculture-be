'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('options', 'region', {
      type: Sequelize.STRING,
      after: 'groupName',
      allowNull: true,
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('options', 'region')
  }
};
