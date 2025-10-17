"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class PurchaseOrderManagement extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.user, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'user',
              });
            this.belongsTo(models.user, {
                foreignKey: 'farmerId',
                targetKey: 'id',
                as: 'farmer',
              });

              this.belongsTo(models.user_farm, {
                foreignKey: 'farmId',
                targetKey: 'id',
                as: 'userFarms'
              });

              this.belongsTo(models.Geofence, {
                foreignKey: 'geofenceId',
                targetKey: 'id'
              });
              this.belongsTo(models.CroptypeProductType, {
                foreignKey: 'productTypeId',
                targetKey: 'id'
              });
              this.belongsToMany(models.CroptypeRejection, {
                through: 'AllTraceabilityRejection',
                foreignKey: 'purchase_order_id',
                otherKey: 'reason_id',
                as: 'rejectionReasons',
              });

              this.belongsTo(models.Option, {
                foreignKey: 'cropTypeId',
                as: 'cropType',
              });
            this.belongsToMany(models.BatchProcessingManagement, {
                through: 'MapPurchaseOrderAndProcessingBatches',
                foreignKey: 'purchase_order_id',
                otherKey: 'processing_batch_id',
                as: 'processingBatches',
              });

              this.belongsToMany(models.Crop, {
                through: 'PurchaseTraceabilityCropVarProduct',
                foreignKey: 'purchase_order_id',
                otherKey: 'crop_variety_id',
                as: 'cropVarieties',
              });
              this.hasOne(models.PackagingUnit, {
                foreignKey: "purchase_order_id",
            });
              this.hasMany(models.Pallets, {
                foreignKey: "purchase_order_id",
            });

            this.hasMany(models.AllPurchaseTraceabilityImages, {
                foreignKey: "purchase_order_id",
                as: "images"
            });


        }
    }
    PurchaseOrderManagement.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        farmerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        farmId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user_farms',
                key: 'id',
            },
        },
        geofenceId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'geofences',
                key: 'id',
            },
        },
        cropTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'options',
                key: 'id',
            },
        },
        productTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'CroptypeProductType',
                key: 'id',
            },
        },
        qualityGrade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        wasteQuantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        finalQuantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        availableQuantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        pricePerUnit: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        privateInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publicInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        orderCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        recordId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        external_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        purchaseDate: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        used: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'PurchaseOrderManagement',
        tableName: 'purchase_order_management',
        timestamps: true,
        hooks: {
            afterBulkCreate: async (purchaseOrders, options) => {
                // Use a bulk update operation to set the orderCode for each created record
                for (const purchaseOrder of purchaseOrders) {
                  purchaseOrder.orderCode = `PC-00${purchaseOrder.id}`
                }
          
                // Perform a bulk update to save the orderCodes
                await Promise.all(purchaseOrders.map(po => po.update({ orderCode: po.orderCode })));
              },
            afterCreate: async (purchaseOrder, options) => {
                purchaseOrder.orderCode = `PC-00${purchaseOrder.id}`
                await purchaseOrder.update({ orderCode: purchaseOrder.orderCode });
              },
          },

         
    }
    );

    return PurchaseOrderManagement;
};
