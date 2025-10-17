'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarehouseProductName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WarehouseProductName.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      recordId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'WarehouseProductName',
      tableName: 'warehouse_product_names',
    }
  );
  return WarehouseProductName;
};
