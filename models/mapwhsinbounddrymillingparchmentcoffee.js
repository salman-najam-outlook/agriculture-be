'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapWHSInboundDryMillingParchmentCoffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapWHSInboundDryMillingParchmentCoffee.init(
    {
      userId: DataTypes.INTEGER,
      warehouseInboundId: DataTypes.INTEGER,
      dryMillingParchmentCoffeeId: DataTypes.INTEGER,
      parchment: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'MapWHSInboundDryMillingParchmentCoffee',
      tableName: 'map_warehouse_inbound_dry_milling_parchment_coffees',
    }
  );
  return MapWHSInboundDryMillingParchmentCoffee;
};
