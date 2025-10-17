'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoilManagementFarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        as: 'farm',
      });
      this.belongsTo(models.SoilManagement, {
        foreignKey: 'soilManagementId',
        as: 'soilManagement',
      });
    }
  }
  SoilManagementFarm.init(
    {
      farmId: DataTypes.INTEGER,
      soilManagementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'soil_management_farms',
      modelName: 'SoilManagementFarm',
    }
  );
  return SoilManagementFarm;
};

