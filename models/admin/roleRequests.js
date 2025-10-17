"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user_assoc'
      });

      // this.belongsTo(models.UserRole, {
      //   foreignKey: 'role_assigned',
      //   targetKey: 'id',
      //   as: 'assigned'
      // });

      this.belongsTo(models.UserRole, {
        foreignKey: 'role_requested',
        targetKey: 'id',
        as: 'requested'
      });
   
    }
  }
  RoleRequests.init(
    {
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: false,
          },
          org_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'organization',
              key: 'id',
            },
            allowNull: false,
          },
         role_requested: {
          type: DataTypes.STRING,
          references: {
            model: 'user_role',
            key: 'id',
          },
          allowNull: false,
         },
          status: {
            type: DataTypes.ENUM(["pending", "approved", "rejected"]),
            defaultValue: "pending"
          },
          rejection_reason: {
            type: DataTypes.STRING,
            allowNull: true
          },
    
          is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
      tableName: "role_requests",
      modelName: "RoleRequests",
    }
  );
  return RoleRequests;
};