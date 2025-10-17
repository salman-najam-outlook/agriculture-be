'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementControlOtherDate extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: "diseaseManagement",
        foreignKey: "diseaseManagementId",
      });
    }
  }
  DiseaseManagementControlOtherDate.init(
    {
      diseaseManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DiseaseManagementControlOtherDate',
      tableName: 'disease_management_other_control_date',
    }
  );
  return DiseaseManagementControlOtherDate;
};
