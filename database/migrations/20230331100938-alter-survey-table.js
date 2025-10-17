'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('surveys_list', 'parentId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      after: 'description'
    })
    await queryInterface.addColumn('surveys_list', 'scheduledEndDate', {
      allowNull: true,
      type: Sequelize.DATE,
      after: 'scheduledDate'
    })
    await queryInterface.addColumn('surveys_list', 'organization', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'organization',
        key: 'id'
      },
      after: 'userId'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('surveys_list', 'parentId')
    await queryInterface.removeColumn('surveys_list', 'scheduledEndDate')
    await queryInterface.removeColumn('surveys_list', 'organization')

  }
};
