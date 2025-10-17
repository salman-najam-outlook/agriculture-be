'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppUserModuleRecommMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.CropRecommendationModuleAttribute, {
        sourceKey: 'attributeNum',
        foreignKey: 'attributeNum',
        as: 'cropModuleAttribute',
      });
    }
  }
  AppUserModuleRecommMap.init(
    {
      moduleId: DataTypes.STRING,
      attributeNum: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AppUserModuleRecommMap',
      tableName: 'app_user_module_recomm_maps',
    }
  );
  return AppUserModuleRecommMap;
};