"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFarmingGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFarmingGoal.init(
    {
      farmId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      farmingGoalOptId: DataTypes.INTEGER,
      farmingGoal: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "user_farming_goals",
      modelName: "UserFarmingGoal",
    }
  );
  return UserFarmingGoal;
};
