'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_crop_goal_farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seasonId: {
        type: Sequelize.INTEGER,
        references: { model: 'user_crop_goal_seasons', key: 'id' },
        unique: true,
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
      cropTypeId: {
        type: Sequelize.INTEGER,
        references: { model: 'options', key: 'id' },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_crop_goal_farms');
  },
};
