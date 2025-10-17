'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DryMillingCuppingAcidity extends Model {
  }

  DryMillingCuppingAcidity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.INTEGER,
        }
    },
    {
      sequelize,
      tableName: 'dry_milling_cupping_acidity',
      modelName: 'DryMillingCuppingAcidity',
    }
  );
  return DryMillingCuppingAcidity;
};
