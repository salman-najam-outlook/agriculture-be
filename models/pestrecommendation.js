'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.CropObservationPestInfestation, {
        sourceKey: 'pestId',
        foreignKey: 'id',
        as: 'pest_info',
      });
      this.hasOne(models.CropObservationDisease, {
        sourceKey: 'pestId',
        foreignKey: 'id',
        as: 'disease_info',
      });
    }
  }
  PestRecommendation.init(
    {
      cropTypeId: DataTypes.INTEGER,
      cropVarietyId: DataTypes.INTEGER,
      moduleId: DataTypes.INTEGER,
      pestId: DataTypes.INTEGER,
      moduleAttrId: DataTypes.INTEGER,
      pestSymptoms: DataTypes.JSON,
      recommendedPrevention: DataTypes.JSON,
      recommendedTreatment: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'PestRecommendation',
    }
  );
  return PestRecommendation;
};
