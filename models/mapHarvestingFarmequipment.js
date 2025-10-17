"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MapHarvestingFarmequipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapHarvestingFarmequipment.init(
    {
      harvestingId: DataTypes.INTEGER,
      userFarmEquipmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "map_harvesting_farmequipment",
      modelName: "MapHarvestingFarmequipment",
    }
  );
  return MapHarvestingFarmequipment;
};
