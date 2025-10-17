'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {

      this.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        targetKey: 'id',
      });

      this.belongsTo(models.Modules, {
        foreignKey: 'module_id',
        targetKey: 'id',
      });

      this.belongsTo(models.Permissions, {
        foreignKey: 'permission_id',
        targetKey: 'id',
      });

      
    }
  }
  UserRoles.init(
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
            allowNull: false,
            onDelete: 'CASCADE'
          },
          module_id: {
            type: DataTypes.STRING,
            references: {
              model: 'modules',
              key: 'id',
            },
            allowNull: false,
            onDelete: 'CASCADE'
          },
          permission_id: {
            type: DataTypes.STRING,
            references: {
              model: 'permissions',
              key: 'id',
            },
            allowNull: false,
            onDelete: 'CASCADE'
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
      modelName: 'RolesModulesPermissions',
      tableName: 'roles_modules_permissions',
    }
  );
  return UserRoles;
};
