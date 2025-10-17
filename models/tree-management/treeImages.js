"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TreeImage extends Model {
    static associate(models) {
      this.belongsTo(models.TreeDetail, {
        foreignKey: "treeId",
        as: "treeDetail",
        onDelete: "CASCADE",
      });
    }
  }

  TreeImage.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      treeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tree_details",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      key: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "tree_images",
      modelName: "TreeImage",
    }
  );

  return TreeImage;
};
