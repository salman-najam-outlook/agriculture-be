'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PestManagementAffectedPlantPart extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagement, {
        as: 'pestManagement',
        foreignKey: 'pestManagementId',
      });
      this.belongsTo(models.PlantPart, {
        as: 'plantPart',
        foreignKey: 'plantPartId',
      });
    }
  };

  PestManagementAffectedPlantPart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      plantPartId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'pest_management_affected_plant_parts',
      modelName: 'PestManagementAffectedPlantPart',
    }
  );

  return PestManagementAffectedPlantPart;
};
