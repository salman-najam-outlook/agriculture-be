'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "carbon_credit_crop_growing_crops",
      "fk_carbon_credit_crop_growing_crops_crop_variety"
    );

    await queryInterface.removeColumn('carbon_credit_crop_growing_crops', 'crop_variety_id');
  },

  down: async (queryInterface, Sequelize) => {
  }
};