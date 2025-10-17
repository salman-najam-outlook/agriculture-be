'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('disease_detection_feedback', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      agree: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      diseaseDetectionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'disease_detection',
          key: 'id',
        },
      },
      imgUrl : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      diseaseId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accuracyDegree: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('disease_detection_feedback');
  },
};
