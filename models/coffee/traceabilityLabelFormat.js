'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LabelFormat extends Model {

    static associate(models) {

    }
  }
  LabelFormat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: 'label_formats',
      modelName: 'LabelFormat'
    }
  );
  return LabelFormat;
};
