'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_crop_goals', {
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
      farmId: {
        type: Sequelize.INTEGER,
        references: { model: 'user_farms', key: 'id' },
      },
      zoneId: {
        references: { model: 'geofences', key: 'id' },
        type: Sequelize.INTEGER,
      },
      farmSize: {
        type: Sequelize.FLOAT,
      },
      farmSizeUom: {
        type: Sequelize.JSON,
      },
      seasonId: {
        type: Sequelize.INTEGER,
        references: { model: 'user_crop_goal_seasons', key: 'id' },
        unique: true,
      },
      cropVarietyId: {
        type: Sequelize.INTEGER,
        references: { model: 'crops', key: 'id' },
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        references: { model: 'options', key: 'id' },
      },
      note: {
        type: Sequelize.TEXT,
      },
      harvestedYieldTarget: {
        type: Sequelize.FLOAT,
      },
      harvestedYieldTargetUom: {
        type: Sequelize.JSON,
      },
      incomeTarget: {
        type: Sequelize.FLOAT,
      },
      incomeTargetUom: {
        type: Sequelize.JSON,
      },
      syntheticFertilizerUsageTarget: {
        type: Sequelize.FLOAT,
      },
      syntheticFertilizerUsageTargetUom: {
        type: Sequelize.JSON,
      },
      goalStatus: {
        type: Sequelize.ENUM('ongoing', 'complete'),
        defaultValue: 'ongoing',
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
    await queryInterface.dropTable('user_crop_goals');
  },
};
