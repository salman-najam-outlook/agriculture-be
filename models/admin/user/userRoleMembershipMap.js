'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoleMembershipMap extends Model {
    static associate(models) {

      this.belongsTo(models.Membership, {
        foreignKey: 'membership_id',
        targetKey: 'id',
        as: 'membership'
      });

      this.belongsTo(models.UserRole, {
        foreignKey: 'user_role_id',
        targetKey: 'id',
        as: 'user_role'
      });

    }
  }
  UserRoleMembershipMap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      membership_id: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex',
        references: {
          model: 'Membership',
          key: 'id',
        },
      },
      user_role_id: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        references: {
          model: 'UserRole',
          key: 'id',
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserRoleMembershipMap',
      tableName: 'user_role_membership_map',
    }
  );
  return UserRoleMembershipMap;
};
