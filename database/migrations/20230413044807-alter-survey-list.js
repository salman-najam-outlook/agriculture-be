'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('surveys_list', 'scheduledEndDate')
    await queryInterface.addColumn('surveys_list', 'scheduledEndDate', {
      allowNull: true,
      type: Sequelize.STRING(100),
      after: 'scheduledDate'
    })


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
