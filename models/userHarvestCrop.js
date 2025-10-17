"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserHarvestCrop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHarvestCrop.init(
    {
      userId: DataTypes.INTEGER,
      plantedCropId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      plantName: DataTypes.STRING,
      plantedQty: DataTypes.INTEGER,
      plantedQtyUomId: DataTypes.INTEGER,
      harvestedQty: DataTypes.INTEGER,
      harvestedQtyUomId: DataTypes.INTEGER,
      storageCondition: DataTypes.STRING
    },
    {
      sequelize,
      tableName: "user_harvest_crops",
      modelName: "UserHarvestCrop",
    }
  );
  return UserHarvestCrop;
};
