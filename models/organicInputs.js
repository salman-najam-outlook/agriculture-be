'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganicInputs extends Model {
    static associate() {

    }
  }
  OrganicInputs.init(
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: 'organic_inputs',
      modelName: 'OrganicInputs',
    }
  );
  return OrganicInputs;
};
