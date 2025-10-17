'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CropRecommendation.init({
    cropTypeId: DataTypes.INTEGER,
    cropVarietyId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
    moduleAttrId: DataTypes.INTEGER,
    moduleNum: DataTypes.STRING,
    attributeNum: DataTypes.STRING,
    recommendation: DataTypes.JSON,
    hindi: {
      type: DataTypes.JSON,
    },
    marathi: {
      type: DataTypes.JSON,
    },
    nepali: {
      type: DataTypes.JSON,
    },
    spanish: {
      type: DataTypes.JSON,
    },
    indonesian: {
      type: DataTypes.JSON,
    },
    arabic: {
      type: DataTypes.JSON,
    },
    portugese: {
      type: DataTypes.JSON,
    },
    french: {
      type: DataTypes.JSON,
    },
    swahili: {
      type: DataTypes.JSON,
    },
    bengali: {
      type: DataTypes.JSON,
    },
    oromo: {
      type: DataTypes.JSON,
    },
    somali: {
      type: DataTypes.JSON,
    },
    amharic: {
      type: DataTypes.JSON,
    },
    vietnamese: {
      type: DataTypes.JSON,
    },
    turkish: {
      type: DataTypes.JSON,
    },
    greek: {
      type: DataTypes.JSON,
    },
    dutch: {
      type: DataTypes.JSON,
    }
  }, {
    sequelize,
    modelName: 'CropRecommendation',
  });
  return CropRecommendation;
};