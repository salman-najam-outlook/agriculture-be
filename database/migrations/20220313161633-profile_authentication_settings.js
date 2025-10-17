'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profile_authentication_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      auto_log_off_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      auto_log_off_value_type: {
        type: Sequelize.ENUM({
          values: ["mins", "hours"],
        })
      },
      unsuccessful_login_attempts_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unsuccessful_login_attempts_value_type: {
        type: Sequelize.ENUM({
          values: ["per_hour", "per_day", 'customized'],
        })
      },
      unsuccessful_login_lockout_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unsuccessful_login_lockout_value_type: {
        type: Sequelize.ENUM({
          values: ["mins", "hours", 'days'],
        })
      },
      password_length: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number_of_unique_passwords: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maximum_password_age_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maximum_password_age_value_type: {
        type: Sequelize.ENUM({
          values: ["days", "weeks", 'months'],
        })
      },
      password_acceptable_characters: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profile_authentication_settings');
  }
};
