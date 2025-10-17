'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGeneralSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserGeneralSetting.init(
    {
      userId: DataTypes.INTEGER,
      preferredMapView: DataTypes.ENUM('Default', 'Satellite', 'Terrain'),
      preferredCountry: DataTypes.STRING,
      preferredState: DataTypes.STRING,
      preferredDistrict: DataTypes.STRING,
      preferredCity: DataTypes.STRING,
      preferredCountryIsoCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserGeneralSetting',
      tableName: 'user_general_settings',
    }
  );
  return UserGeneralSetting;
};
