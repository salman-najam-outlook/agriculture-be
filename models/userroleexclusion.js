'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoleExclusion extends Model {
    static associate(models) {}
  }

  UserRoleExclusion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      range: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      deactivation_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deactivation_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deactivation_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      activation_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'UserRoleExclusion',
      tableName: 'user_role_exclusion',
      timestamps: true,
    }
  );

  return UserRoleExclusion;
};