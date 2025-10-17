'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tree_mapping_request_plots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      tree_mapping_request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tree_mapping_requests',
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

    await queryInterface.addIndex('tree_mapping_request_plots', 
      ['tree_mapping_plot_id', 'tree_mapping_request_id'], 
      {
        unique: true,
        name: 'unique_plot_request_mapping'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tree_mapping_request_plots');
  }
};