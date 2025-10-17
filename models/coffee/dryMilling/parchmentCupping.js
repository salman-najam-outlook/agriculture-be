'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParchmentCupping extends Model {
    static associate(models) {
        this.belongsTo(models.ParchmentCoffee, {
            as: 'parchmentCoffee',
            foreignKey: 'parchmentCoffeeId',
            sourceKey: 'id',
        });
        this.belongsTo(models.ParchmentQualityGrading, {
            as: 'parchmentQualityGrading',
            foreignKey: 'parchmentQualityGradingId',
            sourceKey: 'uniqueIdentifier',
        });
        this.belongsTo(models.DryMillingCuppingAcidity, {
            foreignKey: 'cuppingAcidity',
            as: 'cupping_acidity',
        });
        this.belongsTo(models.DryMillingCuppingBody, {
            foreignKey: 'cuppingBody',
            as: 'cupping_body',
        });
        this.belongsTo(models.DryMillingCuppingBalance, {
            foreignKey: 'cuppingBalance',
            as: 'cupping_balance',
        });
        this.belongsTo(models.DryMillingCuppingFlavour, {
            foreignKey: 'cuppingFlavour',
            as: 'cupping_flavour',
        });
    }
  }
  ParchmentCupping.init(
    {
        parchmentCoffeeId: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        parchmentQualityGradingId: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cuppingTime: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        cupperName: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingFragrance: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingAromas: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingFlavour: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingAcidity: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingAcidityRange: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingBody: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingBodyRange: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingAfterTaste: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingBalance: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingBalanceRange: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingNote: {
          allowNull: true,
          type: DataTypes.TEXT('long'),
        },
        finalScore: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        cuppingFile: {
          allowNull: true,
          type: DataTypes.JSON,
        },
        isdeleted: {
          type: DataTypes.DATE,
        },
    },
    {
      sequelize,
      tableName: 'parchment_cuppings',
      modelName: 'ParchmentCupping',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return ParchmentCupping;
};
