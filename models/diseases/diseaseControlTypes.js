'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseControlTypes extends Model {
    static associate(models) {
      this.hasMany(models.DiseaseControlTypeOptions, {
        sourceKey: 'id',
        foreignKey: 'diseaseControlTypeId',
        as: 'options',
      });
    }
  }

  DiseaseControlTypes.init(
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
      hasOptions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      sequelize,
      tableName: 'disease_control_types',
      modelName: 'DiseaseControlTypes',
    }
  );

  return DiseaseControlTypes;
}
