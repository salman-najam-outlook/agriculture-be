'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseControlTypeOptions extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseControlTypes, {
        foreignKey: 'diseaseControlTypeId',
        as: 'diseaseControlTypeOptions',
      });
    }
  }

  DiseaseControlTypeOptions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      diseaseControlTypeId: DataTypes.INTEGER,

    },
    {
      sequelize,
      tableName: 'disease_control_type_options',
      modelName: 'DiseaseControlTypeOptions',
    }
  );

  return DiseaseControlTypeOptions;
}
