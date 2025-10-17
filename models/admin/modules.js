"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ParentModules, {
        foreignKey: 'parent_module_id',
        targetKey: 'id',
      });
      this.hasMany(models.RolesModulesPermissions, {
        foreignKey: 'module_id',
        as: 'role_modules_permissions',
      });
      this.hasMany(models.AdminUsersRolesModulesPermissions, {
        foreignKey: 'module_id',
        as: 'admin_users_roles_modules_permissions',
      });
      this.hasMany(models.UserMembershipModulesPermission, {
        foreignKey: 'moduleId',
        as: 'usermembership_modules_permissions',
      });
      this.hasMany(models.UserRoleMembershipPermissions, {
        foreignKey: 'module_id',
        as: 'userrole_membership_permissions',
      });
    }
  }
  Modules.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      id_name: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_module_id: {
        type: DataTypes.STRING,
        references: {
          model: 'parent_modules',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
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
      tableName: "modules",
      modelName: "Modules",
    }
  );
  return Modules;
};
