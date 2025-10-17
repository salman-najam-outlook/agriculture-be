'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 await queryInterface.createTable('csv_upload_jobs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      job_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      csv_url: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      sales_manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      progress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      s3_key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },
      createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),
        },
    },   
  );
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.dropTable('csv_upload_jobs');
  }
};
