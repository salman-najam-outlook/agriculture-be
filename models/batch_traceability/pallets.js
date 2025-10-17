"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Pallets extends Model {
        static associate(models){
            this.belongsTo(models.BatchProcessingManagement, {
                foreignKey: "batch_id",
                as: "batch",
            });
            this.belongsTo(models.FinalProductManagement, {
                foreignKey: "final_product_id",
                as: "finalProduct",
            });
            this.belongsTo(models.PurchaseOrderManagement, {
                foreignKey: "purchase_order_id",
                as: "purchase",
            });

            this.belongsTo(models.PackagingUnit, {
                foreignKey: "packing_unit_id",
                as: "packingUnit",
            });
        }
    }

    Pallets.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        batch_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "BatchProcessingManagement",
                key: "id",
            },
        },
        final_product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "FinalProductManagement",
                key: "id",
            },
        },
        purchase_order_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "PurchaseOrderManagement",
                key: "id",
            },
        },
           //packing_unit_id
           packing_unit_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "PackagingUnit",
                key: "id",
            },
        },
        pallet_id: {
            // Manually entered identifier of pallet
            type: DataTypes.STRING,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        no_of_boxes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        no_of_boxes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "Pallets",
        tableName: "pallets",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    });

    return Pallets;
}   