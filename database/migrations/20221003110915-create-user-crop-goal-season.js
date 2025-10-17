'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'user_crop_goal_seasons',
      {
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
        seasonName: {
          type: Sequelize.STRING,
        },
        seasonStartDate: {
          type: Sequelize.DATEONLY,
        },
        seasonEndDate: {
          type: Sequelize.DATEONLY,
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
          uniq_SeasonName_User: {
            fields: ['userId', 'seasonName'],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_crop_goal_seasons');
  },
};
