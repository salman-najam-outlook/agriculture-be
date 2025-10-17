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
    queryInterface.addColumn('users', 'subOrganizationId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'id'
      },
      after: 'organization'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('users', 'subOrganizationId');
  }
};
