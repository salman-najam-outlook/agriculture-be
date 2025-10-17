'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    await queryInterface.addColumn('users', 'countryIsoCode', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'countryId'
    })
    await queryInterface.addColumn('users', 'country', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'countryIsoCode'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'countryIsoCode')
    await queryInterface.removeColumn('users', 'country')
  }
};
