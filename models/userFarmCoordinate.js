"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFarmCoordinate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFarmCoordinate.init(
    {
      farmId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      lat: DataTypes.DOUBLE,
      log: DataTypes.DOUBLE,
    },
    {
      sequelize,
      tableName: "user_farm_coordinates",
      modelName: "UserFarmCoordinate",
    }
  );
  return UserFarmCoordinate;
};
