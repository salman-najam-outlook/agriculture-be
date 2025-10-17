'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScaleRecommendations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
      },
      cropVarietyId: {
        type: Sequelize.INTEGER,
      },
      moduleId: {
        type: Sequelize.INTEGER,
        references: { model: 'CropRecommendationModules', key: 'id' },
      },
      moduleAttrId: {
        type: Sequelize.INTEGER,
        references: { model: 'CropRecommendationModuleAttributes', key: 'id' },
      },
      start: {
        type: Sequelize.FLOAT,
      },
      startOpr: {
        type: Sequelize.STRING(2),
      },
      end: {
        type: Sequelize.FLOAT,
      },
      endOpr: {
        type: Sequelize.STRING(2),
      },
      unit: {
        type: Sequelize.STRING,
      },
      recommendation: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ScaleRecommendations');
  },
};
