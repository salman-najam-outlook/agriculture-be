"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PestManagementChemicalPesticidesType extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagement, {
        as: "pestManagement",
        foreignKey: "pestManagementId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
      this.belongsTo(models.Option, {
        as: "applicationMethod",
        foreignKey: "applicationMethodId",
      });
      this.belongsTo(models.UnitsList, {
        as: "pesticideQuantityUnit",
        foreignKey: "pesticideQuantityUnitId",
      });
      this.belongsTo(models.UnitsList, {
        as: "pesticideDoseRateUnit",
        foreignKey: "pesticideDoseRateUnitId",
      });
      this.hasMany(models.PestManagementChemicalMixture, {
        foreignKey: "pestManagementChemicalTypeId",
        as: "mixtures",
      });
      this.belongsToMany(models.PestManagement, {
        through: models.MapPestManagementAndChemicalPesticides,
        as: 'pestManagements',
        foreignKey: 'pestManagementChemicalPesticideInputId',
      });
      this.belongsTo(models.PestControlTypeOptions, {
        as: 'PestControlTypeOption',
        foreignKey: 'pestControlTypeOptionId',
      });
    }
  }

  PestManagementChemicalPesticidesType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pestControlTypeOptionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pesticideName: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      currencyId: {
        type: DataTypes.INTEGER,
      },
      pesticideQuantity: {
        type: DataTypes.INTEGER,
      },
      pesticideQuantityUnitId: {
        type: DataTypes.INTEGER,
      },
      pesticideActiveIngredient: {
        type: DataTypes.STRING,
      },
      pesticideDoseRate: {
        type: DataTypes.DOUBLE,
      },
      pesticideDoseRateUnitId: {
        type: DataTypes.INTEGER,
      },
      applicationMethodId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "pest_management_chemical_pesticides_type",
      modelName: "PestManagementChemicalPesticidesType",
    }
  );

  return PestManagementChemicalPesticidesType;
};
