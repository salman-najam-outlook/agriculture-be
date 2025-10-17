'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_observation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      areaPlanted: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      cropType: {
        type: Sequelize.INTEGER,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropSeason: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      dateOfObservation: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      growthStage: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_growth_stage',
          key: 'id',
        },
      },
      germinationRate: {
        type: Sequelize.DOUBLE,
      },
      leafColor: {
        type: Sequelize.STRING,
      },
      leafSize: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_leaf_size',
          key: 'id',
        },
      },
      stemColor: {
        type: Sequelize.STRING,
      },
      stemThickness: {
        type: Sequelize.DOUBLE,
      },
      plantHeight: {
        type: Sequelize.DOUBLE,
      },
      tillerNumber: {
        type: Sequelize.DOUBLE,
      },
      appreanceOfFlower: {
        type: Sequelize.STRING,
      },
      jointType: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_joint_type',
          key: 'id',
        },
      },
      notes: {
        type: Sequelize.TEXT,
      },
      doc: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation');
  },
};
