'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeedMethod extends Model {
    static associate(models) {
      this.hasMany(models.Weed, {
        foreignKey: 'weed_method_id'
      });

      this.belongsTo(models.WeedMethod, {
        foreignKey: 'parentId'
      });
    }
  }
  WeedMethod.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'WeedMethod',
      tableName: 'weed_methods',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return WeedMethod;
};
