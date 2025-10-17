'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tree_mapping_plot_attachments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      plot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tree_mapping_plots',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Original name of the uploaded file',
      },
      file_type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Type of file (e.g., image/jpeg, application/pdf)',
      },
      s3_url: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'URL to the file in S3',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tree_mapping_plot_attachments');
  },
};