'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestManagementFarm extends Model {
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
      this.belongsTo(models.PestManagement, {
        foreignKey: 'pestManagementId',
        as: 'pestManagement',
      });
    }
  }
  PestManagementFarm.init(
    {
      farmId: DataTypes.INTEGER,
      pestManagementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'pest_management_farms',
      modelName: 'PestManagementFarm',
    }
  );
  return PestManagementFarm;
};

