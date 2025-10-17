"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoDryingProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.user, {
        sourceKey: 'dryRegisterUserId',
        foreignKey: 'id',
        as: 'dryMilling',
      });
      this.belongsTo(models.CacaoDryMillingFlavor, {
        foreignKey: "dryingFlavor",
        targetKey: "id",
        as: "dryMillingFlavor",
      });
      this.belongsTo(models.DryingType, {
        foreignKey: "dryingType",
        targetKey: "id",
        as: "cacaoDryingType",
      });
      this.belongsToMany(models.CacaoFermentationProcess, {
        through: "CacaoFermentationDryingProcess",
        foreignKey: "dryRegisterId",
        otherKey: "fermentationId",
        as: "fermentations",
      });
      this.belongsToMany(models.CacaoInBoundWarehouse, {
        through: "dryCacaoInboundWarehouseMap",
        foreignKey: "dryRegisterId",
        otherKey: "inboundLotId",
        as: "inboundWarehouses",

      });
      this.hasMany(models.CacaoFermentationDryingProcess, {
        foreignKey: "dryRegisterId",
        sourceKey: "id",
        as: "fermentationsDryingProcess",
      });
      this.hasMany(models.CacaoScreenedBeans, {
        foreignKey: "dryProcessId",
        sourceKey: "id",
        as: "cacaoScreenedBeans"
      });
    }
  }
  CacaoDryingProcess.init(
    {
      dryRegisterUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dryingCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dryingInitialDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      initialWeight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      preDryingTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dryingTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeOfDrying: {
        type: DataTypes.ENUM('Drying trays', 'Elbas (movable dryers)', 'Drying Tunnels', 'Cement'),
        allowNull: true,
      },
      dryingType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "DryingType",
        },
      },
      label: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dryingHumidity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dryingFlavor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "CacaoDryMillingFlavor",
        },
      },
      finalWeight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weightPerBag: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isFiltered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      numberOfBags: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      finalPercentOfFermentation: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      status: DataTypes.ENUM('Incomplete', 'Complete'),
      isdeleted: {
        type: DataTypes.DATE,
      },
      recordId: {
        type: DataTypes.STRING,
      },
      external_traceability_id: {
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "isdeleted",
      tableName: "cacao_drying_process",
      modelName: "CacaoDryingProcess",
    }
  );
  return CacaoDryingProcess;
};