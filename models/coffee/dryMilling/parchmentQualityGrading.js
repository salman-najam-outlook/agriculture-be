'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParchmentQualityGrading extends Model {
    static associate(models) {
        this.belongsTo(models.ParchmentCoffee, {
            as: 'parchmentCoffee',
            foreignKey: 'parchmentCoffeeId',
            targetKey: 'id',
        });
        this.hasMany(models.ParchmentCupping, {
            as: 'gradingCuppings',
            foreignKey: 'parchmentQualityGradingId',
            sourceKey: 'uniqueIdentifier',
        });
        this.hasMany(models.Cupping, {
            as: 'gradingCuppingData',
            foreignKey: 'quality_grading_id',
            sourceKey: 'uniqueIdentifier',
        });
    }
  }
  ParchmentQualityGrading.init(
    {
        parchmentCoffeeId: {
            type: DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uniqueIdentifier: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        qualityTitle: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        quantity: {
          allowNull: false,
          type: DataTypes.FLOAT,
        },
        quantityUnit: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        qualityScore: {
          allowNull: false,
          type: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'),
        },
        label: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        unitSize: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        unitSizeUnit: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        isdeleted: {
          type: DataTypes.DATE,
        },
    },
    {
      sequelize,
      tableName: 'parchment_quality_gradings',
      modelName: 'ParchmentQualityGrading',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return ParchmentQualityGrading;
};
