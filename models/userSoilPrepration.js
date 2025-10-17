"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSoilPrepration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSoilPrepration.init(
    {
      userId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      fertilizerType: DataTypes.ENUM("liquid"),
      fertilizerQty: DataTypes.INTEGER,
      fertilizerQtyUomId: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: "user_soil_preprations",
      modelName: "UserSoilPrepration",
    }
  );
  return UserSoilPrepration;
};
