'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'CropRecommendationModuleAttributes',
      'type',
      {
        type: Sequelize.ENUM('scale', 'pest', 'info', 'disease'),
        allowNull: 'info',
      }
    );
    await queryInterface.addColumn(
      'CropRecommendationModuleAttributes',
      'ddName',
      {
        type: Sequelize.STRING(300),
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'CropRecommendationModuleAttributes',
      'category',
      {
        type: Sequelize.STRING(300),
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'CropRecommendationModuleAttributes',
      'ddName'
    );
    await queryInterface.removeColumn(
      'CropRecommendationModuleAttributes',
      'category'
    );
  },
};
