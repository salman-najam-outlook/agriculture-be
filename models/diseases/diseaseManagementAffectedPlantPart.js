'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementAffectedPlantPart extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: 'diseaseManagement',
        foreignKey: 'diseaseManagementId',
      });
      this.belongsTo(models.PlantPart, {
        as: 'plantPart',
        foreignKey: 'plantPartId',
      });
    }
  };

  DiseaseManagementAffectedPlantPart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      diseaseManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      plantPartId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'disease_management_affected_plant_parts',
      modelName: 'DiseaseManagementAffectedPlantPart',
    }
  );

  return DiseaseManagementAffectedPlantPart;
};
