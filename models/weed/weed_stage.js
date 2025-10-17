'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeedStage extends Model {
    static associate(models) {
      // this.hasMany(models.Weed, {
      //   foreignKey: 'weedStageId'
      // });
    }
  }
  WeedStage.init(
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
      modelName: 'WeedStage',
      tableName: 'weed_stage',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return WeedStage;
};
