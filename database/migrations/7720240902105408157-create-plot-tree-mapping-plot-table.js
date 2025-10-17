'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tree_mapping_plots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plot_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false
      },
      radius: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slope: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      aspect: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true
      },
      no_of_trees: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('pending', 'partially_submitted', 'submitted'),
        allowNull: false,
        defaultValue: 'pending'
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

    await queryInterface.addIndex('tree_mapping_plots', ['plot_no']);
    await queryInterface.addIndex('tree_mapping_plots', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tree_mapping_plots');
  }
};