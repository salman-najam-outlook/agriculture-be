"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CropRecommendationModuleAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CropRecommendation, {
        foreignKey: "id",
        targetKey: "moduleAttrId",
        as: "cropRecommendation",
      });

      this.belongsTo(models.ScaleRecommendation, {
        foreignKey: "id",
        targetKey: "moduleAttrId",
        as: "scaleRecommendation",
      });
    }
  }
  CropRecommendationModuleAttribute.init(
    {
      moduleId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.ENUM("none", "scale", "pest"),
      ddName: DataTypes.STRING,
      category: DataTypes.STRING,
      dataIndex: DataTypes.JSON,
      attributeNum: DataTypes.STRING,
      moduleNum: DataTypes.STRING,
      hindi: {
        type: DataTypes.STRING,
      },
      marathi: {
        type: DataTypes.STRING,
      },
      nepali: {
        type: DataTypes.STRING,
      },
      spanish: {
        type: DataTypes.STRING,
      },
      indonesian: {
        type: DataTypes.STRING,
      },
      arabic: {
        type: DataTypes.STRING,
      },
      portugese: {
        type: DataTypes.STRING,
      },
      french: {
        type: DataTypes.STRING,
      },
      swahili: {
        type: DataTypes.STRING,
      },
      bengali: {
        type: DataTypes.STRING,
      },
      oromo: {
        type: DataTypes.STRING,
      },
      somali: {
        type: DataTypes.STRING,
      },
      amharic: {
        type: DataTypes.STRING,
      },
      vietnamese: {
        type: DataTypes.STRING,
      },
      turkish: {
        type: DataTypes.STRING,
      },
      greek: {
        type: DataTypes.STRING,
      },
      dutch: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CropRecommendationModuleAttribute",
      paranoid: true,
    }
  );
  return CropRecommendationModuleAttribute;
};
