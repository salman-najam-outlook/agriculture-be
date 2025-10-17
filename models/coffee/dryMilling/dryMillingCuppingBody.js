'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DryMillingCuppingBody extends Model {
  }

  DryMillingCuppingBody.init(
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
      tableName: 'dry_milling_cupping_body',
      modelName: 'DryMillingCuppingBody',
    }
  );
  return DryMillingCuppingBody;
};
