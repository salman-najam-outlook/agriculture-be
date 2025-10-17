"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TreeDetailUpdateHistory extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "farmer",
      });
      this.belongsTo(models.user, {
        foreignKey: "updatedBy",
        as: "lastUpdatedBy",
      });

      this.belongsTo(models.user_farm, {
        foreignKey: "farmId",
        as: "farm",
      });

      this.belongsTo(models.Geofence, {
        foreignKey: "zoneId",
        as: "zone",
      });
    }
  }

  TreeDetailUpdateHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      treeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      treeUUID: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      treeName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      treeType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      plantationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      altitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },

      farmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user_farm",
          key: "id",
        },
      },
      zoneId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "geofences",
          key: "id",
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
      },

      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tree_detail_update_history",
      modelName: "TreeDetailUpdateHistory",
    }
  );

  return TreeDetailUpdateHistory;
};
