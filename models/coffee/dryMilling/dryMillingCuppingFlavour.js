'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DryMillingCuppingFlavour extends Model {
  }

  DryMillingCuppingFlavour.init(
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
      tableName: 'dry_milling_cupping_flavours',
      modelName: 'DryMillingCuppingFlavour',
    }
  );
  return DryMillingCuppingFlavour;
};
