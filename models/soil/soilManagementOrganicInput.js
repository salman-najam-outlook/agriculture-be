'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoilManagementOrganicInput extends Model {
    static associate(models) {
      this.belongsTo(models.SoilManagement, {
        as: 'soilManagement',
        foreignKey: 'soilManagementId',
      });

      this.belongsTo(models.Option, {
        as: 'organicInput',
        foreignKey: 'organicInputId',
      });
      this.belongsTo(models.OrganicInputs, {
        as: 'organicInputName',
        foreignKey: 'organicInputId',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'applicationFrequency',
        as: 'applicationFrequencyData',
      });

      this.belongsTo(models.UnitsList, {
        as: 'applicationRateUnitData',
        foreignKey: 'applicationRateUnit',
      });
      this.belongsTo(models.UnitsList, {
        as: 'totalPoultryLitterAmountUnitData',
        foreignKey: 'totalPoultryLitterAmountUnit',
      });

      this.belongsToMany(models.Option, {
        through: 'SoilManagementApplicationMethod',
        foreignKey: 'organicInputId',
        otherKey: 'applicationMethodId',
        as: 'applicationMethods',
      });
    }
  };

  SoilManagementOrganicInput.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      organicInputId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      soilManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalPoultryLitterAmount: {
        type: DataTypes.DOUBLE,
      },
      totalPoultryLitterAmountUnit: {
        type: DataTypes.STRING,
      },
      applicationRate: {
        type: DataTypes.DOUBLE,
      },
      applicationRateUnit: {
        type: DataTypes.STRING,
      },
      applicationMethod: {
        type: DataTypes.JSON,
      },
      applicationFrequency: {
        type: DataTypes.INTEGER,
      },
      requestIdOrganicInputs: {
        type: DataTypes.STRING,
      },
      requestStatusOrganicInputs: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      tableName: 'soil_management_organic_inputs',
      modelName: 'SoilManagementOrganicInput',
    }
  );

  return SoilManagementOrganicInput;
};
