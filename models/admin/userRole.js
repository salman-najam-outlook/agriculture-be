'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {

      this.belongsTo(models.user, {
        foreignKey: 'created_by',
        targetKey: 'id',
        as: 'creator'
      });
      this.hasMany(models.UserRoleMembershipPermissions, {
        foreignKey: 'user_role_id',
        sourceKey: 'id',
        as: 'userroleModulePermAssoc',
      });
    }
  }
  UserRole.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
   
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false
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
      modelName: 'UserRole',
      tableName: 'user_role',
    }
  );
  return UserRole;
};
