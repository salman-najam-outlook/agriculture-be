"use strict";
const moment = require("moment");
const _ = require("lodash");
const { v4: uuid } = require('uuid');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoPurchaseOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.user, {
        sourceKey: "farmerId",
        foreignKey: "id",
        as: "farmer",
      });

      this.belongsTo(models.user_farm, {
        foreignKey: "farmId",
        targetKey: "id",
        as: "userFarms",
      });

      this.belongsTo(models.Geofence, {
        foreignKey: "zoneId",
        targetKey: "id",
        as: "segments",
      });

      this.belongsTo(models.CacaoPlantations, {
        foreignKey: "cacao_plantation",
        targetKey: "id",
        as: "cacaoPlantations",
      });

      this.belongsTo(models.CacaoSpecies, {
        foreignKey: "cacao_species",
        targetKey: "id",
        as: "cacaoSpecies",
      });

      this.belongsTo(models.CacaoDeliveryMethod, {
        foreignKey: "cacao_delivery_method_id",
        targetKey: "id",
        as: "cacaoDeliveryMethods",
      });

      this.belongsTo(models.UnitsList, {
        foreignKey: "cacao_weight_unit_id",
        targetKey: "id",
        as: "cacaoWeightUnit",
      });

      this.belongsToMany(models.CacaoPurchaseOrder, {
        through: "CacaoFermentationAndPurchaseOrder",
        foreignKey: "purchaseOrderId",
        otherKey: "fermentationId",
        as: "fermentationProcess",
      });

      this.hasOne(models.user, {
        sourceKey: "buyingStationId",
        foreignKey: "id",
        as: "buyingStation",
      });


      this.hasOne(models.CacaoCoffeePurchaseBuyer, {
        sourceKey: "buyer",
        foreignKey: "id",
        as: "cacaoPurchaseBuyer",
      });


      // this.hasOne(models.Currency, {
      //   sourceKey: 'currencyCode',
      //   foreignKey: 'currencyCode',
      //   as: 'currency',
      // });
      

      this.hasMany(models.CacaoBuyingStationLandImages, {
        foreignKey: "purchase_id",
        sourceKey: "id",
        as: "cacaoBuyingStationLandImages",
      });

      this.belongsToMany(models.CacaoPlantations, {
        through: "CacaoPlantationPurchaseOrder",
        foreignKey: "purchaseOrderId",
        otherKey: "plantationId",
        as: "cacaoPlantataionPurchaseOrder",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
      this.belongsToMany(models.CacaoVariety,{
        through:"CacaoPurchaseOrderVarieties",
        foreignKey:"cacao_purchase_id",
        otherKey:"cacao_variety_id",
        as:"cacaoVariety"
      })
    }
  }
  CacaoPurchaseOrder.init(
    {
      orderCode: DataTypes.STRING,
      farmerId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      buyingStationId: DataTypes.INTEGER,
      zoneId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      cacao_plantation: {
        type: DataTypes.INTEGER,
        references: {
          model: "cacao_plantation",
          key: "id",
        },
      },
      cacao_species: {
        type: DataTypes.INTEGER,
        references: {
          model: "cacao_variety",
          key: "id",
        },
      },
      cacao_delivery_method_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "cacao_delivery_methods",
          key: "id",
        },
      },
      cacao_variety: {
        type: DataTypes.INTEGER,
        references: {
          model: "cacao_variety",
          key: "id",
        },
      },
      cacao_weight: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      cacao_weight_unit_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },

      cacao_type: {
        allowNull: true,
        type: DataTypes.ENUM("Organic", "Conventional", "In Transition"),
      },
      moisture: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },

      product_type: {
        allowNull: true,
        type: DataTypes.ENUM("Fruit", "Dry Grains/Seeds", "Wet Grains/Seeds"),
      },
      recordId: DataTypes.STRING,
      cacao_cherry_pic: DataTypes.JSON,
      perKgPrice: DataTypes.FLOAT,
      currencyId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      grandTotal: DataTypes.FLOAT,
      availableWeight: DataTypes.FLOAT,
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isdeleted: {
        type: DataTypes.DATE,
      },
      hasHarvestingDateInfo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      harvestingStartDate: {
        type: DataTypes.DATE,
      },
      harvestingEndDate: {
        type: DataTypes.DATE,
      },
      purchasedAt: {
        type: DataTypes.DATEONLY,
        get() {
          const purchasedAt = this.getDataValue("purchasedAt");
          if (_.isEmpty(purchasedAt)) return null;
          return moment
            .utc(purchasedAt, process.env.DB_ONLYDATE_FORMAT)
            .format(process.env.ACCEPT_DATE_FORMAT);
        },
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        allowNull: true,
        type: DataTypes.ENUM("global", "local", "merged", "new_user"),
      },
      buyer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      premiumPrice: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      dimitraCacaoPurchaseOrderId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      external_traceability_id: {
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      tableName: "cacao_purchase_orders",
      modelName: "CacaoPurchaseOrder",
      paranoid: true,
      deletedAt: "isdeleted",
      hooks: {
        beforeBulkCreate: (purchaseOrders) => {
          if(Array.isArray(purchaseOrders)) {
            for(const purchaseOrder of purchaseOrders) {
              if(purchaseOrder && !purchaseOrder.dimitraCacaoPurchaseOrderId) {
                purchaseOrder.dimitraCacaoPurchaseOrderId = uuid();
              }
            }
          }
        },
        beforeCreate: (purchaseOrder) => {
          if(purchaseOrder && !purchaseOrder.dimitraCacaoPurchaseOrderId) {
            purchaseOrder.dimitraCacaoPurchaseOrderId = uuid();
          }
        }
      }
    }
  );
  return CacaoPurchaseOrder;
};
