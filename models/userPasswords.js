'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPasswords extends Model {
    static associate(models) {
    }
  }
  UserPasswords.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserPasswords',
      tableName: 'user_passwords',
    }
  );
  return UserPasswords;
};