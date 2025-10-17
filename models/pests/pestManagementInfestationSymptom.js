'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PestManagementInfestationSymptom extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagement, {
        as: 'pestManagement',
        foreignKey: 'pestManagementId',
      });
      this.belongsTo(models.PestInfestationSymptom, {
        as: 'pestInfestationSymptom',
        foreignKey: 'pestInfestationSymptomId',
      });
    }
  };

  PestManagementInfestationSymptom.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestInfestationSymptomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pestManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'pest_management_infestation_symptoms',
      modelName: 'PestManagementInfestationSymptom',
    }
  );

  return PestManagementInfestationSymptom;
};
