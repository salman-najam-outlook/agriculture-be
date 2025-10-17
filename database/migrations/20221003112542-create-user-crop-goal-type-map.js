'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'user_crop_goal_type_maps',
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
        cropGoalTypeId: {
          type: Sequelize.INTEGER,
          references: { model: 'options', key: 'id' },
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
          uniqCrop_goalAndGoal_type: {
            fields: ['userCropGoalSeasonId', 'cropGoalTypeId'],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_crop_goal_type_maps');
  },
};
