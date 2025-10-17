"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementChemicalType extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: "originalDiseaseManagement",
        foreignKey: "diseaseManagementId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
      this.belongsTo(models.Option, {
        as: 'applicationMethod',
        foreignKey: 'applicationMethodId',
      });
      this.belongsTo(models.UnitsList, {
        as: 'chemicalQuantityUnit',
        foreignKey: 'chemicalQuantityUnitId',
      });
      this.belongsTo(models.UnitsList, {
        as: 'chemicalDoseRateUnit',
        foreignKey: 'chemicalDoseRateUnitId',
      });
      this.hasMany(models.DiseaseManagementChemicalMixture, {
        foreignKey: "diseaseManagementChemicalTypeId",
        as: "mixtures",
      });
      this.belongsToMany(models.DiseaseManagement, {
        through: models.DiseaseManagementChemicalTypeMap,
        as: 'diseaseManagements',
        foreignKey: 'chemicalTypeId',
      });
      this.belongsTo(models.DiseaseControlTypeOptions, {
        as: 'DiseaseControlTypeOption',
        foreignKey: 'diseaseControlTypeOptionId',
      });
    }
  }

  DiseaseManagementChemicalType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      diseaseManagementId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      diseaseControlTypeOptionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      currencyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      chemicalQuantity: {
        type: DataTypes.INTEGER,
      },
      chemicalQuantityUnitId: {
        type: DataTypes.INTEGER,
      },
      chemicalActiveIngredient: {
        type: DataTypes.STRING,
      },
      chemicalDoseRate: {
        type: DataTypes.DOUBLE,
      },
      chemicalDoseRateUnitId: {
        type: DataTypes.INTEGER,
      },
      applicationMethodId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "disease_management_chemical_type",
      modelName: "DiseaseManagementChemicalType",
    }
  );

  return DiseaseManagementChemicalType;
};
