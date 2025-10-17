'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_weather_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      countryId: Sequelize.INTEGER,
      stateId: Sequelize.INTEGER,
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      showOnDashboard: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      displayBy: {
        type: Sequelize.ENUM(["log-in", "hourly", "daily", "weekly"]),
        allowNull: false,
        defaultValue: 'hourly'
      },
      updateFrequency: {
        type: Sequelize.ENUM(["hourly", "daily", "weekly"]),
        allowNull: false,
        defaultValue: 'hourly'
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
    await queryInterface.dropTable('user_weather_settings');

  }
};
