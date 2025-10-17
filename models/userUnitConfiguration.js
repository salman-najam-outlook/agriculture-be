'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserUnitConfiguration extends Model {
    static associate(models) {
      this.belongsTo(models.UnitTypes, {
        foreignKey: 'unitType',
        as: 'user_config_unitType',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'unitId',
        as: 'user_config_unit',
      });
    }
  }
  UserUnitConfiguration.init(
    {
      unitType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'unit_types',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserUnitConfiguration',
      tableName: 'user_unit_configurations',
      indexes: [
        {
          unique: true,
          fields: ['unitType', 'userId'],
        },
      ],
    }
  );
  return UserUnitConfiguration;
};
