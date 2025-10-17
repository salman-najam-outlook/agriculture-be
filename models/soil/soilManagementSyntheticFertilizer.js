'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoilManagementSyntheticFertilizer extends Model {
    static associate(models) {
      this.belongsTo(models.SoilManagement, {
        as: 'soilManagement',
        foreignKey: 'soilManagementId',
      });

      this.belongsTo(models.Option, {
        as: 'syntheticFertilizer',
        foreignKey: 'syntheticFertilizerId',
      });
      this.belongsTo(models.SyntheticFertilizers, {
        as: 'syntheticFertilizerName',
        foreignKey: 'syntheticFertilizerId',
      });
      this.belongsTo(models.UnitsList, {
        as: 'nitrogenContentUnitData',
        foreignKey: 'nitrogenContentUnit',
      });

      this.belongsTo(models.UnitsList, {
        as: 'npkApplicationRateUnitData',
        foreignKey: 'npkApplicationRateUnit',
      });

      this.belongsTo(models.UnitsList, {
        as: 'phosphorusContentUnitData',
        foreignKey: 'phosphorusContentUnit',
      });

      this.belongsTo(models.UnitsList, {
        as: 'potassiumContentUnitData',
        foreignKey: 'potassiumContentUnit',
      });

      this.belongsTo(models.UnitsList, {
        as: 'totalNPKAmountUnitData',
        foreignKey: 'totalNPKAmountUnit',
      });
      this.belongsToMany(models.Option, {
        through: 'SoilManagementApplicationMethod',
        foreignKey: 'syntheticFertilizerId',
        otherKey: 'applicationMethodId',
        as: 'applicationMethods',
      });
    }
  };

  SoilManagementSyntheticFertilizer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      soilManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      syntheticFertilizerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalNPKAmount: {
        type: DataTypes.DOUBLE,
      },
      totalNPKAmountUnit: {
        type: DataTypes.STRING,
      },
      npkApplicationRate: {
        type: DataTypes.DOUBLE,
      },
      npkApplicationRateUnit: {
        type: DataTypes.STRING,
      },
      nitrogenContent: {
        type: DataTypes.DOUBLE,
      },
      nitrogenContentUnit: {
        type: DataTypes.STRING,
      },
      phosphorusContent: {
        type: DataTypes.DOUBLE,
      },
      phosphorusContentUnit: {
        type: DataTypes.STRING,
      },
      potassiumContent: {
        type: DataTypes.DOUBLE,
      },
      potassiumContentUnit: {
        type: DataTypes.STRING,
      },
      applicationMethod: {
        type: DataTypes.JSON,
      },
      requestIdSyntheticFertilizer: {
        type: DataTypes.STRING,
      },
      requestStatusSyntheticFertilizer: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      tableName: 'soil_management_synthetic_fertilizers',
      modelName: 'SoilManagementSyntheticFertilizer',
    }
  );

  return SoilManagementSyntheticFertilizer;
};
