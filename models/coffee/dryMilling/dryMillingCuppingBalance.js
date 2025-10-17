'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DryMillingCuppingBalance extends Model {
  }

  DryMillingCuppingBalance.init(
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
      tableName: 'dry_milling_cupping_balance',
      modelName: 'DryMillingCuppingBalance',
    }
  );
  return DryMillingCuppingBalance;
};
