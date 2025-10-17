'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HarvestAlert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UnitsList, {
        foreignKey: 'id',
        sourceKey: 'unitId',
        as: 'unit',
      });
      this.hasOne(models.Option, {
        foreignKey: 'id',
        sourceKey: 'cropId',
        as: 'crop',
      });
    }
  }
  HarvestAlert.init(
    {
      cropId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'options',
          key: 'id' 
        },
      },
      country: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      alertAdmin: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      alertFarmer: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      maxAllowed: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      unitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { 
          model: 'units_list', 
          key: 'id' 
        }
      },
      organization: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { 
          model: 'organization', 
          key: 'id' 
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      tableName: 'harvest_alert_info',
      modelName: 'HarvestAlert',
    }
  );
  return HarvestAlert;
};
