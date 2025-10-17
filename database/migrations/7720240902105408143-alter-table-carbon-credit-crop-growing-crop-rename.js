'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename column from crop_variety to crop_variety_id
    await queryInterface.renameColumn('carbon_credit_crop_growing_crops', 'crop_variety', 'crop_variety_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the change - rename column back to the original name
    await queryInterface.renameColumn('carbon_credit_crop_growing_crops', 'crop_variety_id', 'crop_variety');
  }
};