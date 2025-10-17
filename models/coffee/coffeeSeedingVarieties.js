'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoffeeSeedingVarieties extends Model {
    static associate(models) {}
  }
  CoffeeSeedingVarieties.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      coffee_seeding_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'seedlings',
          key: 'id',
        },
      },
      coffee_variety_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coffee_variety',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CoffeeSeedingVarieties',
      tableName: 'coffee_seeding_varieties',
    }
  );
  return CoffeeSeedingVarieties;
};
