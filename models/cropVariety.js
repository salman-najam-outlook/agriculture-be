'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CropVariety extends Model {
    static associate(models) {
      // this.hasMany(models.Weed, { foreignKey: 'cropVarietyId'});
      this.belongsTo(models.Crop, { foreignKey: 'cropId'});
    }
  }
  CropVariety.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cropId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'crops', key: 'id' },
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      tableName: 'crop_variety',
      modelName: 'CropVariety'
    }
  );
  return CropVariety;
};
