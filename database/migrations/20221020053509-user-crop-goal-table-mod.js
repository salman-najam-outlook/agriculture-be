'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_crop_goals', 'farmId');
    await queryInterface.removeColumn('user_crop_goals', 'zoneId');
    await queryInterface.removeColumn('user_crop_goals', 'farmSizeUom');
    await queryInterface.removeColumn('user_crop_goals', 'cropTypeId');
    await queryInterface.removeColumn('user_crop_goals', 'farmSize');
    await queryInterface.removeColumn('user_crop_goals', 'cropVarietyId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_crop_goals', 'farmId', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('user_crop_goals', 'zoneId', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('user_crop_goals', 'farmSizeUom', {
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn('user_crop_goals', 'cropTypeId', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('user_crop_goals', 'farmSize', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('user_crop_goals', 'cropVarietyId', {
      type: Sequelize.INTEGER,
    });
  },
};
