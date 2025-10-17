'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tree_mapping_plots_tree_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tree_detail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tree_details',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tree_mapping_plot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tree_mapping_plots',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Ensuring same tree cannot be added to other plots
    await queryInterface.addIndex('tree_mapping_plots_tree_details', 
      ['tree_detail_id', 'tree_mapping_plot_id'], 
      {
        unique: true,
        name: 'unique_tree_plot_mapping'
      }
    );

    await queryInterface.addIndex('tree_mapping_plots_tree_details', ['tree_detail_id']);
    await queryInterface.addIndex('tree_mapping_plots_tree_details', ['tree_mapping_plot_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tree_mapping_plots_tree_details');
  }
};