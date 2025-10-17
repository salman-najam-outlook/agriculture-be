'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitsList extends Model {
    static associate(models) {
      this.belongsTo(models.UnitTypes, {
        foreignKey: 'unitType',
        as: 'units_type',
      });
    }
  }
  UnitsList.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abbvr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unitType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'unit_types',
          key: 'id',
        },
      },
      factor: DataTypes.DECIMAL(20, 10),
    },
    {
      sequelize,
      modelName: 'UnitsList',
      tableName: 'units_list',
    }
  );
  return UnitsList;
};
