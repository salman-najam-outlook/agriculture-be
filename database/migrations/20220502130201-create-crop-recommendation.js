'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CropRecommendations', {
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
    await queryInterface.dropTable('CropRecommendations');
  },
};
