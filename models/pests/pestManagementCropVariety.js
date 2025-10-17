'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestManagementCropVariety extends Model {
    static associate(models) {
    }
  }

  PestManagementCropVariety.init(
    {
      cropVarietyId: {
        type: DataTypes.INTEGER,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestManagementId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'pest_management_crop_varieties',
      modelName: 'PestManagementCropVariety',
    }
  );

  return PestManagementCropVariety;
}
