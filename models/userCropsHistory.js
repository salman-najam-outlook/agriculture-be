"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCropsHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCropsHistory.init(
    {
      userId: DataTypes.INTEGER,
      goalId: DataTypes.INTEGER,
      harvestedOn: DataTypes.STRING,
      farmingArea: DataTypes.STRING,
      farmingAreaUomId: DataTypes.INTEGER,
      yieldHarvested: DataTypes.STRING,
      yieldHarvestedUomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "user_crops_history",
      modelName: "UserCropsHistory",
    }
  );
  return UserCropsHistory;
};
