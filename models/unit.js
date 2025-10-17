"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Sowing, {
        as: 'seedingunit',
        foreignKey: 'seedingUnitId'
      });

      this.hasMany(models.Sowing, {
        as: 'rowspacing',
        foreignKey: 'rowSpacingUnitId'
      });

      this.hasMany(models.Sowing, {
        as: 'inrowspacing',
        foreignKey: 'inRowSpacingUnitId'
      });

      this.hasMany(models.Sowing, {
        as: 'depthspacing',
        foreignKey: 'depthUnitId'
      });
    }
  }
  Unit.init(
    {
      country_id: DataTypes.INTEGER,
      field: DataTypes.STRING,
      unit_category_id: DataTypes.INTEGER,
      unit_subCategory_id: DataTypes.INTEGER,
      abbreviation: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "units",
      modelName: "Unit",
    }
  );
  return Unit;
};
