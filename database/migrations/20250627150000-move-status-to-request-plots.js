'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add status column to tree_mapping_request_plots
    await queryInterface.addColumn('tree_mapping_request_plots', 'status', {
      type: Sequelize.ENUM('pending', 'partially_submitted', 'submitted'),
      allowNull: false,
      defaultValue: 'pending'
    });

    // Step 2: Migrate existing status data from tree_mapping_plots to tree_mapping_request_plots
    // This query will set the status in request_plots based on the current plot status
    await queryInterface.sequelize.query(`
      UPDATE tree_mapping_request_plots trp
      JOIN tree_mapping_plots tmp ON trp.tree_mapping_plot_id = tmp.id
      SET trp.status = tmp.status
    `);

    // Step 3: Remove status column from tree_mapping_plots
    await queryInterface.removeColumn('tree_mapping_plots', 'status');
  },

  async down(queryInterface, Sequelize) {
    // Step 1: Add status column back to tree_mapping_plots
    await queryInterface.addColumn('tree_mapping_plots', 'status', {
      type: Sequelize.ENUM('pending', 'partially_submitted', 'submitted'),
      allowNull: false,
      defaultValue: 'pending'
    });

    // Step 2: Migrate status data back from tree_mapping_request_plots to tree_mapping_plots
    // This will use the first status found for each plot (might lose data if plot has different statuses)
    await queryInterface.sequelize.query(`
      UPDATE tree_mapping_plots tmp
      SET tmp.status = (
        SELECT trp.status
        FROM tree_mapping_request_plots trp
        WHERE trp.tree_mapping_plot_id = tmp.id
        LIMIT 1
      )
    `);

    // Step 3: Remove status column from tree_mapping_request_plots
    await queryInterface.removeColumn('tree_mapping_request_plots', 'status');
  }
}; 