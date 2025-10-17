const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TreeSpecies extends Model {
    static associate(models) {
      // Define associations here
      this.belongsTo(models.TreeType, {
        foreignKey: "tree_type_id",
      });
    }
  }

  TreeSpecies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tree_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tree_type",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TreeSpecies",
      tableName: "tree_species",
      timestamps: true,
    }
  );

  return TreeSpecies;
};
