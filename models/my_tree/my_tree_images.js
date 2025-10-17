'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MyTreeImages extends Model {
    static associate(models) {
      this.belongsTo(models.MyTree, {
        foreignKey: "my_tree_id",
        as: "my_tree",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.MyTreeHistory, {
        foreignKey: "my_tree_history_id",
        as: "my_tree_history",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  MyTreeImages.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      my_tree_id: {
        type: DataTypes.BIGINT,
        allowNull: true, // Nullable because it can be linked to MyTree
        references: {
          model: "my_tree",
          key: "id",
        },
      },
      my_tree_history_id: {
        type: DataTypes.BIGINT,
        allowNull: true, // Nullable because it can be linked to MyTreeHistory
        references: {
          model: "my_tree_history",
          key: "id",
        },
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      s3_key: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "my_tree_images",
      modelName: "MyTreeImages",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return MyTreeImages;
};
