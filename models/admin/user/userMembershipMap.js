'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMembershipMap extends Model {
    static associate(models) {

      this.belongsTo(models.Membership, {
        foreignKey: 'membership_id',
        targetKey: 'id',
        as: 'membership'
      });

      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user_membership'
      });
      this.hasOne(models.activationKeys, {
        foreignKey: 'membership_type',
        sourceKey: 'membership_id',
        as: 'activation',
      });
      this.hasOne(models.UserRoleMembershipMap, {
        foreignKey: 'membership_id',
        sourceKey: 'membership_id',
        as: 'mappedUserRole',
      });

    }
  }
  UserMembershipMap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      membership_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Membership',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: 'Users',
        //   key: 'id',
        // },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserMembershipMap',
      tableName: 'users_user_membership_map',
    }
  );
  return UserMembershipMap;
};
