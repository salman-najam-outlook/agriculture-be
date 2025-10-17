'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoilInformationSegment extends Model {
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
      this.belongsTo(models.SoilInformation, {
        foreignKey: 'soilInformationId',
        as: 'soilInformation',
      });
    }
  }
  SoilInformationSegment.init(
    {
      segmentId: DataTypes.INTEGER,
      soilInformationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'soil_information_segment',
      modelName: 'SoilInformationSegment',
      paranoid:true,
      deletedAt: 'deletedAt'
    }
  );
  return SoilInformationSegment;
};
