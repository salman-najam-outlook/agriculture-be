"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permissions.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
      tableName: "permissions",
      modelName: "Permissions",
    }
  );
  return Permissions;
};
