'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NutrientManagementSegment extends Model {
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
    }
  }
  NutrientManagementSegment.init(
    {
      segmentId: DataTypes.INTEGER,
      nutrientManagementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'nutrient_management_segment',
      modelName: 'NutrientManagementSegment',
      paranoid:true,
      deletedAt: 'deletedAt'
    }
  );
  return NutrientManagementSegment;
};