'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScaleRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ScaleRecommendation.init(
    {
      cropTypeId: DataTypes.INTEGER,
      cropVarietyId: DataTypes.INTEGER,
      moduleId: DataTypes.INTEGER,
      moduleAttrId: DataTypes.INTEGER,
      moduleNum: DataTypes.STRING,
      attributeNum: DataTypes.STRING,
      start: DataTypes.FLOAT,
      startOpr: DataTypes.STRING,
      end: DataTypes.FLOAT,
      endOpr: DataTypes.STRING,
      unit: DataTypes.STRING,
      recommendation: DataTypes.JSON,
      note: DataTypes.JSON,
      language: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ScaleRecommendation',
    }
  );
  return ScaleRecommendation;
};
