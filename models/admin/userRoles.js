'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {

      this.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        targetKey: 'id',
        as: 'roles'
      });

      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user_role'
      });

    }
  }
  UserRoles.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.STRING,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
            model: 'Users',
            key: 'id',
          },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserRoles',
      tableName: 'user_roles',
    }
  );
  return UserRoles;
};
