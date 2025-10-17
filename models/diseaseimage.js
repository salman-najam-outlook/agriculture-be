'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiseaseImage.init(
    {
      diseaseId: DataTypes.INTEGER,
      cropTypeId: DataTypes.INTEGER,
      fileId: DataTypes.STRING,
      s3Key: DataTypes.STRING,
      s3Location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DiseaseImage',
    }
  );
  return DiseaseImage;
};
