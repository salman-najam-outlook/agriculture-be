'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementFarm extends Model {
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
      this.belongsTo(models.DiseaseManagement, {
        foreignKey: 'diseaseManagementId',
        as: 'diseaseManagement',
      });
    }
  }
  DiseaseManagementFarm.init(
    {
      farmId: DataTypes.INTEGER,
      diseaseManagementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'disease_management_farms',
      modelName: 'DiseaseManagementFarm',
    }
  );
  return DiseaseManagementFarm;
};

