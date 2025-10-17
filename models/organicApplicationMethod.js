'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganicApplicationMethod extends Model {
    static associate() {

    }
  }
  OrganicApplicationMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'organic_application_method',
      modelName: 'OrganicApplicationMethod',
    }
  );
  return OrganicApplicationMethod;
};
