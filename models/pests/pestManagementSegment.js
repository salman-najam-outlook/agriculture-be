'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestManagementSegment extends Model {
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
      this.belongsTo(models.PestManagement, {
        foreignKey: 'pestManagementId',
        as: 'pestManagement',
      });
    }
  }
  PestManagementSegment.init(
    {
      pestManagementId: DataTypes.INTEGER,
      segmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'pest_management_segments',
      modelName: 'PestManagementSegment',
    }
  );
  return PestManagementSegment;
};
