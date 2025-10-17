'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AdminUserRoles extends Model {
    static associate(models) {
      this.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        targetKey: 'id',
        as: 'roles'
      })
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user_role'
      })
    }
  }
  AdminUserRoles.init(
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
      modelName: 'AdminUserRoles',
      tableName: 'admin_user_roles',
    }
  )
  return AdminUserRoles
}
