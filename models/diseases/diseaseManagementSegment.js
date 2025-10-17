'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementSegment extends Model {
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
      this.belongsTo(models.DiseaseManagement, {
        foreignKey: 'diseaseManagementId',
        as: 'diseaseManagement',
      });
    }
  }
  DiseaseManagementSegment.init(
    {
      diseaseManagementId: DataTypes.INTEGER,
      segmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'disease_management_segments',
      modelName: 'DiseaseManagementSegment',
    }
  );
  return DiseaseManagementSegment;
};
