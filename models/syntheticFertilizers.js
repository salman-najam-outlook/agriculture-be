'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SyntheticFertilizers extends Model {
    static associate() {}
  }
  SyntheticFertilizers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      n: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      k: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'synthetic_fertilizers',
      modelName: 'SyntheticFertilizers',
    }
  );
  return SyntheticFertilizers;
};
