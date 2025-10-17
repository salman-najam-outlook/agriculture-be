"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserStorageSettings extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserStorageSettings.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      useDefaultStorage: DataTypes.BOOLEAN,
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
      modelName: 'UserStorageSettings',
      tableName: 'user_storage_settings',
    }
  );
  return UserStorageSettings;
};
