'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('irrigation', {
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
      area: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      cropVariety: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
      waterSource: {
        type: Sequelize.ENUM('Rainfed', 'Irrigation'),
        allowNull: false,
      },
      irrigationWaterSource: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'irrigation_water_source',
          key: 'id',
        },
      },
      irrigationWaterSourceOrigin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'irrigation_watersource_origin',
          key: 'id',
        },
      },
      irrigatedArea: {
        type: Sequelize.DOUBLE,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      irrigationStage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'irrigation_stage',
          key: 'id',
        },
      },
      irrigationSchedule: {
        type: Sequelize.ENUM(
          'daily',
          'weekly',
          'bi-weekly',
          'monthly',
          'quarterly',
          'bi-annually',
          'annually',
          'other'
        ),
        allowNull: false,
      },
      totalDays: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      irrigationType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'irrigation_type',
          key: 'id',
        },
      },
      waterVolumeUsed: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('irrigation');
  },
};
