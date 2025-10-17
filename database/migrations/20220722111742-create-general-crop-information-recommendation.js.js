'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GeneralCropInformationRecommendations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropVarietyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
      region: {
        type: Sequelize.STRING(1000),
      },
      season: {
        type: Sequelize.STRING(1000),
      },
      requiredDaysForCropMature: {
        type: Sequelize.STRING(1000),
      },
      potentialYield: {
        type: Sequelize.STRING(1000),
      },
      storability: {
        type: Sequelize.STRING(1000),
      },
      maturityIndices: {
        type: Sequelize.STRING(1000),
      },
      uniqueFactorOfVariety: {
        type: Sequelize.STRING(1000),
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
    await queryInterface.dropTable('GeneralCropInformationRecommendations');
  },
};
