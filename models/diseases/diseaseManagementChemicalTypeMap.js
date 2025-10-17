'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementChemicalTypeMap extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: 'diseaseManagement',
        foreignKey: 'diseaseManagementId',
      });
      this.belongsTo(models.DiseaseManagementChemicalType, {
        as: 'diseaseManagementChemicalType',
        foreignKey: 'chemicalTypeId',
      });
    }
  }

  DiseaseManagementChemicalTypeMap.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      diseaseManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      chemicalTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'disease_management_chemical_type_map',
      modelName: 'DiseaseManagementChemicalTypeMap',
    }
  );

  return DiseaseManagementChemicalTypeMap;
};
