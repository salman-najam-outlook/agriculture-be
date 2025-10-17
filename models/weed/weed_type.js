'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeedType extends Model {
    static associate(models) {
      // this.hasMany(models.Weed, {
      //   foreignKey: 'weedTypeId'
      // });
    }
  }
  WeedType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'WeedType',
      tableName: 'weed_type',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return WeedType;
};
