'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PestAndDiseaseRecommendations', {
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
      },
      pestId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_pest_infestation',
          key: 'id',
        },
      },
      diseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_disease',
          key: 'id',
        },
      },
      symptoms: {
        type: Sequelize.JSON,
      },
      prevention: {
        type: Sequelize.JSON,
      },
      treatment: {
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
    await queryInterface.dropTable('PestAndDiseaseRecommendations');
  },
};
