'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_crop_goal_outcomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      userCropGoalSeasonId: {
        type: Sequelize.INTEGER,
        references: { model: 'user_crop_goal_seasons', key: 'id' },
        unique: true,
      },
      yieldHarvested: {
        type: Sequelize.FLOAT,
      },
      yieldHarvestedUom: {
        type: Sequelize.JSON,
      },
      marketValue: {
        type: Sequelize.FLOAT,
      },
      marketValueUom: {
        type: Sequelize.JSON,
      },
      syntheticFertilizerUsed: {
        type: Sequelize.FLOAT,
      },
      syntheticFertilizerUsedUom: {
        type: Sequelize.JSON,
      },
      maximizingYieldNote: {
        type: Sequelize.TEXT,
      },
      maximizingIncomeNote: {
        type: Sequelize.TEXT,
      },
      syntheticFertilizerUsedNote: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('user_crop_goal_outcomes');
  },
};
