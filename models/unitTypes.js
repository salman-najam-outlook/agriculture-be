'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitTypes extends Model {
    static associate(models) {
      this.hasMany(models.UnitsList, {
        foreignKey: 'unitType',
        as: 'units',
      });
      this.hasMany(models.UserUnitConfiguration, {
        foreignKey: 'unitType',
        as: 'units_user',
      });
      this.hasOne(models.UserUnitConfiguration, {
        foreignKey: 'unitType',
        as: 'userSelectedUnit',
      });
    }
  }
  UnitTypes.init(
    {
      id: {
        primaryKey: true,
        type: "INTEGER",
        autoIncrement:true
    },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    },
    {
      sequelize,
      modelName: 'UnitTypes',
      tableName: 'unit_types',
    }
  );
  return UnitTypes;
};
