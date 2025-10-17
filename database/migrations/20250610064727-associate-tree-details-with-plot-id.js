'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tree_details', 'tree_mapping_plot_id', {
      type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tree_mapping_plots',
          key: 'id'
        },
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('tree_details', 'tree_mapping_plot_id');
  }
};
