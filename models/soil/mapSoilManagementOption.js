'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilManagementOption extends Model {
    static associate() {}
  }
  MapSoilManagementOption.init(
    {
      optionId: DataTypes.INTEGER,
      soilManagementId: DataTypes.INTEGER,
      type: DataTypes.ENUM([
        'soil_type',
        'crop_variety',
        'input_type',
        'liming_material',
        'organic_inputs',
        'synthetic_fertilizers',
        'synthetic_application_method',
        'organic_application_method',
        'application_method',
      ]),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'map_soilmanagement_options',
      modelName: 'MapSoilManagementOption',
    }
  );
  return MapSoilManagementOption;
};
