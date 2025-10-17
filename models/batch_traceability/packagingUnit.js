
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PackagingUnit extends Model{
        static associate(models){
            this.belongsTo(models.BatchProcessingManagement, {
                foreignKey: "batch_id",
                as: "batch",
            });

            // Associating PackingUnitManagement with FinalProduct (foreign key final_product_id)
            // this.belongsTo(models.FinalProductManagement, {
            //     foreignKey: "final_product_id",
            //     as: "finalProduct",
            // });

            // Associating PackingUnitManagement with Purchase (foreign key purchase_id)
            this.belongsTo(models.PurchaseOrderManagement, {
                foreignKey: "purchase_order_id",
                as: "purchase",
            });
        }
    }

    PackagingUnit.init({
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
        packing_unit_type:{
            type: DataTypes.ENUM('case', 'bag', 'box'),
            allowNull: true,
        },
        packing_unit_value: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        no_of_units: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pallet_size: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        number_of_pallets: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "PackagingUnit",
        tableName: "packaging_units",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
        paranoid: true,
    })

    return PackagingUnit;
}
