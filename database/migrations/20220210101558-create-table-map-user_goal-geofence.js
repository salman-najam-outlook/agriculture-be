'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_user_goal_geofences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      geofenceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'geofences', key: 'id' },
        onDelete: 'CASCADE'
      },
      userGoalId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'user_goals', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('map_user_goal_geofences');
  }
};
