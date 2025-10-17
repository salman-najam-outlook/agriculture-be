'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        await queryInterface.addColumn('csv_upload_jobs', 'data_type', {
          type: Sequelize.ENUM(['user_uploaded', 'system_generated', 'key_assign_progress']),
          allowNull: false,
          defaultValue: 'user_uploaded'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.removeColumn('csv_upload_jobs', 'data_type');
  }
};
