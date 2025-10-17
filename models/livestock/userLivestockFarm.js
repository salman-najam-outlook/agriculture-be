"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userLiveStockFarm extends Model {
    static associate(models) {
      // define association here
    }
  }
  userLiveStockFarm.init(
    {
      farm: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_farm",
          key: "id",
        },
      },
      userLiveStock: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_livestock",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "userLiveStockFarm",
      tableName: "userlivestock_farm",
      indexes: [
        {
          unique: true,
          fields: ["farm", "userLiveStock"],
        },
      ],
    }
  );
  return userLiveStockFarm;
};
