'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoilManagementSegment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Geofence, {
        foreignKey: 'segmentId',
        as: 'segment',
      });
      this.belongsTo(models.SoilManagement, {
        foreignKey: 'soilManagementId',
        as: 'soilManagement',
      });
    }
  }
  SoilManagementSegment.init(
    {
      segmentId: DataTypes.INTEGER,
      soilManagementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'soil_management_segments',
      modelName: 'SoilManagementSegment',
    }
  );
  return SoilManagementSegment;
};
