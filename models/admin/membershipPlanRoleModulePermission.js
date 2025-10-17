'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoleMembershipPermissions extends Model {
    static associate(models) {

      this.belongsTo(models.UserRole, {
        foreignKey: 'user_role_id',
        targetKey: 'id',
      });
      this.belongsTo(models.Membership, {
        foreignKey: 'membership_plan_id',
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
  UserRoleMembershipPermissions.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
   
      user_role_id: {
        type: DataTypes.STRING,
        references: {
          model: 'user_role',
          key: 'id',
        },
        allowNull: false,
      },
      module_id: {
        type: DataTypes.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: false,
      },
      membership_plan_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_membership',
          key: 'id',
        },
        allowNull: false,
      },
      permission_id: {
        type: DataTypes.STRING,
        references: {
          model: 'permissions',
          key: 'id',
        },
        allowNull: false,
      },
      permitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isdeleted: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,

      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,

      },
    },
    {
      sequelize,
      modelName: 'UserRoleMembershipPermissions',
      tableName: 'user_role_membership_module_permission',
    }
  );
  return UserRoleMembershipPermissions;
};
