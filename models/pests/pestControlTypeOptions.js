'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestControlTypeOptions extends Model {
    static associate(models) {
      this.belongsTo(models.PestControlType, {
        foreignKey: 'pestControlTypeId',
        as: 'pestControlTypeOptions',
      });
    }
  }

  PestControlTypeOptions.init(
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
      pestControlTypeId: DataTypes.INTEGER,

    },
    {
      sequelize,
      tableName: 'pest_control_type_options',
      modelName: 'PestControlTypeOptions',
    }
  );

  return PestControlTypeOptions;
}
