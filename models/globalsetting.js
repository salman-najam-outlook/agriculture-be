"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GlobalSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Currency, {
        sourceKey: "currencyId",
        foreignKey: "id",
        as: "currency",
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: "areaUnitId",
        as: "areaUnit",
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: "weightUnitId",
        as: "weightUnit",
      });
      this.hasOne(models.FarmSizeRange, {
        foreignKey: "id",
        sourceKey: "smallFarmId",
        as: "smallFarm",
      });
      this.hasOne(models.FarmSizeRange, {
        foreignKey: "id",
        sourceKey: "mediumFarmId",
        as: "mediumFarm",
      });
    }
  }
  GlobalSetting.init(
    {
      currencyId: DataTypes.INTEGER,
      org_id: DataTypes.INTEGER,
      areaUnitId: DataTypes.INTEGER,
      weightUnitId: DataTypes.INTEGER,
      codeActivationTimeQty: DataTypes.INTEGER,
      codeActivationTimeUom: DataTypes.ENUM("hours", "days", "weeks"),
      largeFarm: DataTypes.INTEGER,
      smallFarmId: DataTypes.INTEGER,
      mediumFarmId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GlobalSetting",
    }
  );
  return GlobalSetting;
};
