'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestControlType extends Model {
    static associate(models) {
      this.hasMany(models.PestControlTypeOptions, {
        sourceKey: 'id',
        foreignKey: 'pestControlTypeId',
        as: 'options',
      });
    }
  }

  PestControlType.init(
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
      tableName: 'pest_control_types',
      modelName: 'PestControlType',
    }
  );

  return PestControlType;
}
