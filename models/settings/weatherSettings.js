"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserWeatherSettings extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserWeatherSettings.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      countryId: DataTypes.INTEGER,
      stateId: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      showOnDashboard: DataTypes.BOOLEAN,
      displayBy: { type: DataTypes.ENUM(["log-in", "hourly", "daily", "weekly"]), defaultValue: "hourly" },
      updateFrequency: { type: DataTypes.ENUM(["hourly", "daily", "weekly"]), defaultValue: "hourly" },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'UserWeatherSettings',
      tableName: 'user_weather_settings',
    }
  );
  return UserWeatherSettings;
};
