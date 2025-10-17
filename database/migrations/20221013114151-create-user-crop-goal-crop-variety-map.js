'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'user_crop_goal_crop_variety_maps',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userCropGoalSeasonId: {
          type: Sequelize.INTEGER,
          references: { model: 'user_crop_goal_seasons', key: 'id' },
        },
        cropVarietyId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'crops',
            key: 'id',
          },
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
      },
      {
        uniqueKeys: {
          uniqSeasonCropVariety: {
            fields: ['userCropGoalSeasonId', 'cropVarietyId'],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_crop_goal_crop_variety_maps');
  },
};
