"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCurrencySettings extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Currency, {
        foreignKey: 'currencyId',
        sourceKey: 'id',
        as: 'currencyModel',
      });
    }
  }
  UserCurrencySettings.init(
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
      currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Currencies',
          key: 'id',
        },
      },
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
      modelName: 'UserCurrencySettings',
      tableName: 'user_currency_settings',
    }
  );
  return UserCurrencySettings;
};
