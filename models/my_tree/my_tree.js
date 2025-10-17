"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MyTree extends Model {
    static associate(models) {
      this.hasMany(models.MyTreeImages, {
        foreignKey: "my_tree_id",
        as: "my_tree_images",
      });
      this.belongsTo(models.Option, {
        foreignKey: "health_condition",
        as: "healthCondition",
      });
      this.belongsTo(models.TreeType, {
        foreignKey: "tree_type_id",
        as: "treeType",
      });
      this.belongsTo(models.TreeSpecies, {
        foreignKey: "tree_species_id",
        as: "treeSpecies",
      });
      this.belongsTo(models.user_farm, {
        foreignKey: "farm_id",
        as: "farm",
      });
      this.belongsTo(models.Geofence, {
        foreignKey: "zone_id",
        as: "zone",
      });
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }

  MyTree.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      tree_id_by_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user_farm",
          key: "id",
        },
      },
      zone_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Geofence",
          key: "id",
        },
      },
      additional_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      lon: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      location_information: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tree_type_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "TreeType",
          key: "id",
        },
      },
      tree_species_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "TreeSpecies",
          key: "id",
        },
      },
      date_planted: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      additional_note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      program_type: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      health_condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Option",
          key: "id",
        },
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "record_id",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "my_tree",
      modelName: "MyTree",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return MyTree;
};