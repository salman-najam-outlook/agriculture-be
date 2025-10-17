'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AdminUsersRolesModulesPermissions extends Model {
    static associate(models) {
      this.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        targetKey: 'id',
      })
      this.belongsTo(models.Modules, {
        foreignKey: 'module_id',
        targetKey: 'id',
      })
      this.belongsTo(models.Permissions, {
        foreignKey: 'permission_id',
        targetKey: 'id',
      })
    }
  }
  AdminUsersRolesModulesPermissions.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      role_id: {
        type: DataTypes.STRING,
        references: {
          model: 'roles',
          key: 'id',
        },
        allowNull: false
      },
      module_id: {
        type: DataTypes.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: false
      },
      permission_id: {
        type: DataTypes.STRING,
        references: {
          model: 'permissions',
          key: 'id',
        },
        allowNull: false
      },
      permitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
      modelName: 'AdminUsersRolesModulesPermissions',
      tableName: 'admin_users_roles_modules_permissions',
    }
  )
  return AdminUsersRolesModulesPermissions
}
