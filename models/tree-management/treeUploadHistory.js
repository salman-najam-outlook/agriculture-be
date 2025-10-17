"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TreeUploadHistory extends Model {
        static associate(models) {
            this.belongsTo(models.user, {
                foreignKey: "userId",
                sourceKey: "id",
                as: "farmer"
            });
            this.belongsTo(models.user_farm, {
                foreignKey: "farmId",
                as: "farm"
            });

            this.belongsTo(models.Geofence, {
                foreignKey: "zoneId",
                as: "zone"
            });
        }
    } TreeUploadHistory.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        fileName: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        key: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        numberOfRowsFailed: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        numberOfRowsInserted: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        errors: {
          allowNull: true,
          type: DataTypes.JSON
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        farmId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user_farm",
                key: "id"
            }
        },
        zoneId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "geofences",
                key: "id"
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        tableName: "tree_upload_history",
        modelName: "TreeUploadHistory"
    });

    return TreeUploadHistory;
};
