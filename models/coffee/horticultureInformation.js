'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HorticultureInformation extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'created_by',
        targetKey: 'id',
        as: 'user'
      });
    }
  }
  HorticultureInformation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'horticulture_information',
      modelName: 'HorticultureInformation'
    }
  );
  return HorticultureInformation;
};
