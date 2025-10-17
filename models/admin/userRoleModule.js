'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoleModule extends Model {
    static associate(models) {

      this.belongsTo(models.user, {
        foreignKey: 'user_role_id',
        targetKey: 'id',
        as: 'user_role'
      });

      
      this.belongsTo(models.Modules, {
        foreignKey: 'module_id',
        targetKey: 'id',
        as: 'module'
      });

    }
  }
  UserRoleModule.init(
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
      organization_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'organization',
          key: 'id',
        },
        allowNull: true,
      },
      default_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: 'UserRoleModule',
      tableName: 'user_role_modules',
    }
  );
  return UserRoleModule;
};
