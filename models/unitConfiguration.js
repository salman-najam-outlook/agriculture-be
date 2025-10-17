"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UnitConfiguration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UnitConfiguration.init(
    {
      userId: DataTypes.INTEGER,
      unit_category_id: DataTypes.INTEGER,
      unit_subCategory_id: DataTypes.INTEGER,
      unit_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "unit_configuration",
      modelName: "UnitConfiguration",
    }
  );
  return UnitConfiguration;
};
