"use strict";
const {Model} = require("sequelize");
const TREE_TYPES = require("../../constants/TREE_TYPES");
module.exports = (sequelize, DataTypes) => {
    class TreeDetail extends Model {
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

        this.hasMany(models.TreeImage, {
          onDelete: "CASCADE",
          hooks: true,
          sourceKey: "id",
          foreignKey: "treeId",
          as: "images",
        });
      }
    }
    TreeDetail.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        treeUUID: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        treeName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        treeType: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: TREE_TYPES.AVOCADO,
        },
        plantationDate: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
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
        // import

        importImageName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        clientFarmId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        clientZoneId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        clientTimestamp: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        clientDatestamp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        // import

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
        uploadhistoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "tree_upload_history",
            key: "id",
          },
        },

        status: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        clientTreeId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tree_mapping_plot_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "tree_mapping_plots",
            key: "id",
          },
        },
        diameter_at_breast_height: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null,
        },
        height: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null,
        },
        crown_base_height: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null,
        },
        vigor: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        defect: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null,
        },
        recordId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'recordId'
        },
      },
      {
        sequelize,
        tableName: "tree_details",
        modelName: "TreeDetail",
      }
    );

    return TreeDetail;
};
