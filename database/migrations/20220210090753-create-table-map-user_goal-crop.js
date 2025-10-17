'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_user_goals_crop', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userGoalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_goals',
          key: 'id'
        },
      },
      cropId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id',
        },
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('map_user_goals_crop');
  }
};
