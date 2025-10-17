"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            this.belongsTo(models.user, {
                foreignKey: 'userId',
                as: 'user'
            })
        }
    }

    Product.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hsCode: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        s3Url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: "SET NULL",
        },
        orgId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'organization',
                key: 'id',
            },
            onDelete: "SET NULL",
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },{
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true
    });
    return Product;
}