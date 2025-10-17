"use strict";
const { Model } = require("sequelize");
const { equipmentFuelTypes, equipmentLoanStatus, equipmentTypes } = require(rootPath +
  "/helpers/consts");

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models){
      this.belongsToMany(models.Soil_prep_practice, {
        through: models.Soil_prep_practice_equipments,
        foreignKey: 'equipmentId'
      });

      this.belongsTo(models.EquipmentGroup, {
        foreignKey: 'group'
      });

      this.belongsTo(models.Option, {
        foreignKey: 'fuelType',
        as:'fuel_type'
      });
      this.belongsTo(models.Option, {
        foreignKey: 'loanStatus',
        as:'loan_status'
      });
      this.belongsTo(models.Option, {
        foreignKey: 'equipmentType',
        as:'equipment_type'
      });
      this.belongsTo(models.user, {
        foreignKey: 'userID',
        as: 'user',
      });
      this.belongsTo(models.EquipmentName, {
        foreignKey: 'equipmentName',
      });
      this.belongsToMany(models.EquipmentActivity, {
        through: 'equipment_equipment_activity'
      });
      this.hasMany(models.EquipmentFuelRecord, {
        foreignKey: 'equipment_id',
        as: 'equipment_fuel_records'
      });
    }
  }
  Equipment.init(
    {
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      group: {
        type: DataTypes.INTEGER,
        references: {
          model: "equipment_group",
          key: "id",
        },
      },
      category: {
        type: DataTypes.INTEGER,
        references: {
          model: "equipment_category",
          key: "id",
        },
      },
      equipmentName: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "equipment_name",
          key: "id",
        },
      },
      identificationNumber: DataTypes.STRING,
      serialNumber: DataTypes.STRING,
      modelOrBrand: DataTypes.STRING,
      yearOfManufacture: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1990,
        },
      },
      yearOfPurchase: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1990,
        },
      },
      modeOfOperation: {
        type: DataTypes.INTEGER,
        references: {
          model: "equipment_mode_of_operation",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      fuelType: DataTypes.INTEGER,
      energyConsumption: DataTypes.DECIMAL,
      loanStatus: DataTypes.INTEGER,
      equipmentType: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "equipment",
      modelName: "Equipment",
      indexes: [
        {
          unique: true,
          fields: ["userID", "displayName"],
        },
      ],
    }
  );
  return Equipment;
};
