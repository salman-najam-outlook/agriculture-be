'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileAuthenticationSettings extends Model {
    static associate(models) {
    }
  }
  ProfileAuthenticationSettings.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      org_id: DataTypes.INTEGER,
      auto_log_off_value: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      auto_log_off_value_type: {
        type: DataTypes.ENUM({
          values: ["mins", "hours"],
        })
      },
      unsuccessful_login_attempts_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unsuccessful_login_attempts_value_type: {
        type: DataTypes.ENUM({
          values: ["per_hour", "per_day", 'customized'],
        })
      },
      unsuccessful_login_lockout_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unsuccessful_login_lockout_value_type: {
        type: DataTypes.ENUM({
          values: ["mins", "hours", 'days'],
        })
      },
      password_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number_of_unique_passwords: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maximum_password_age_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maximum_password_age_value_type: {
        type: DataTypes.ENUM({
          values: ["days", "weeks", 'months'],
        })
      },
      password_acceptable_characters: {
        type: DataTypes.JSON
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'ProfileAuthenticationSettings',
      tableName: 'profile_authentication_settings',
    }
  );
  return ProfileAuthenticationSettings;
};
