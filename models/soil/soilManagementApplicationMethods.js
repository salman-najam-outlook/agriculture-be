'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoilManagementApplicationMethod extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        as: 'applicationMethod',
        foreignKey: 'applicationMethodId',
      });
      this.belongsTo(models.SoilManagement, {
        as: 'soilManagement',
        foreignKey: 'soilManagementId',
      });
      this.belongsTo(models.SoilManagementOrganicInput, {
        as: 'organicInput',
        foreignKey: 'organicInputId',
      });
      this.belongsTo(models.SoilManagementSyntheticFertilizer, {
        as: 'syntheticFertilizer',
        foreignKey: 'syntheticFertilizerId',
      });
    }
  };

  SoilManagementApplicationMethod.init(
    {
      applicationMethodId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      organicInputId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      soilManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      syntheticFertilizerId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'soil_management_application_methods',
      timestamps: false,
      modelName: 'SoilManagementApplicationMethod',
    }
  );

  return SoilManagementApplicationMethod;
};
