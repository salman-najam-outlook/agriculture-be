'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementCropVariety extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: "diseaseManagement",
        foreignKey: "diseaseManagementId",
      });
    }
  }

  DiseaseManagementCropVariety.init(
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
      cropVarietyId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'disease_management_crop_varieties',
      modelName: 'DiseaseManagementCropVariety',
    }
  );

  return DiseaseManagementCropVariety;
}
