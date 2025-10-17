'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMembershipModulesPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.Membership, {
        foreignKey: 'userMembershipId',
        targetKey: 'id',
      });

      this.belongsTo(models.Modules, {
        foreignKey: 'moduleId',
        targetKey: 'id',
      });

      this.belongsTo(models.Permissions, {
        foreignKey: 'permissionId',
        targetKey: 'id',
      });

    }
  }
  UserMembershipModulesPermission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userMembershipId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_membership',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      moduleId: {
        type: DataTypes.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      permissionId: {
        type: DataTypes.STRING,
        references: {
          model: 'permissions',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      permitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
      tableName: 'usermembership_modules_permissions',
      modelName: 'UserMembershipModulesPermission',
    }
  );
  return UserMembershipModulesPermission;
};
