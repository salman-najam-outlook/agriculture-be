'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestAndDiseaseRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PestImage, {
        sourceKey: 'pestId',
        foreignKey: 'pestId',
        as: 'pestImages',
      });
      this.hasMany(models.DiseaseImage, {
        sourceKey: 'diseaseId',
        foreignKey: 'diseaseId',
        as: 'diseaseImages',
      });
      this.hasOne(models.CropObservationPestInfestation, {
        sourceKey: 'pestId',
        foreignKey: 'id',
        as: 'pests'
      });
      this.hasOne(models.CropObservationDisease, {
        sourceKey: 'diseaseId',
        foreignKey: 'id',
        as: 'diseases'
      });
  
    }
  }
  PestAndDiseaseRecommendation.init(
    {
      cropTypeId: DataTypes.INTEGER,
      cropVarietyId: DataTypes.INTEGER,
      pestId: DataTypes.INTEGER,
      diseaseId: DataTypes.INTEGER,
      symptoms: DataTypes.JSON,
      prevention: DataTypes.JSON,
      treatment: DataTypes.JSON,
      language: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PestAndDiseaseRecommendation',
    }
  );
  return PestAndDiseaseRecommendation;
};
