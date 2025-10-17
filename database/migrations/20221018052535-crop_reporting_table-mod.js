'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // -----table=> CropRecommendationModules
    await queryInterface.addColumn('CropRecommendationModules', 'ddName', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('CropRecommendationModules', 'moduleNum', {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.addColumn('CropRecommendationModules', 'deletedAt', {
      type: Sequelize.DATE,
    });
    // -----table=> CropRecommendationModuleAttributes
    await queryInterface.addColumn(
      'CropRecommendationModuleAttributes',
      'dataIndex',
      {
        type: Sequelize.JSON,
      }
    );
    await queryInterface.addColumn(
      'CropRecommendationModuleAttributes',
      'attributeNum',
      {
        type: Sequelize.STRING,
        unique: true,
      }
    );
    await queryInterface.addColumn(
      'CropRecommendationModuleAttributes',
      'moduleNum',
      {
        type: Sequelize.STRING,
        unique: true,
        references: {
          model: 'CropRecommendationModules',
          key: 'moduleNum',
        },
      }
    );
    await queryInterface.addColumn(
      'CropRecommendationModuleAttributes',
      'deletedAt',
      {
        type: Sequelize.DATE,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // -----table=> CropRecommendationModules
    await queryInterface.removeColumn('CropRecommendationModules', 'ddName');
    await queryInterface.removeColumn('CropRecommendationModules', 'moduleNum');
    await queryInterface.removeColumn('CropRecommendationModules', 'deletedAt');
    // -----table=> CropRecommendationModuleAttributes
    await queryInterface.removeColumn(
      'CropRecommendationModuleAttributes',
      'dataIndex'
    );
    await queryInterface.removeColumn(
      'CropRecommendationModuleAttributes',
      'attributeNum'
    );
    await queryInterface.removeColumn(
      'CropRecommendationModuleAttributes',
      'moduleNum'
    );
    await queryInterface.removeColumn(
      'CropRecommendationModuleAttributes',
      'deletedAt'
    );
  },
};
