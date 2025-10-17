"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CropsTraceability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
      });

    }
  }
  CropsTraceability.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      //additional information
      slogan: {
        type: DataTypes.STRING,
        allowNull: false
      },

      additional_logos: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      //origin


      origin_title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      origin_description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      map_link: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      origin_image: {
        allowNull: false,
        type: DataTypes.JSON,
      },

      //cooperative_informations

      cooperative_title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      cooperative_description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      website_link: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      cooperative_image: {
        allowNull: false,
        type: DataTypes.JSON,
      },

      //traceability_informations
      traceability_title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      traceability_description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      traceability_image: {
        allowNull: false,
        type: DataTypes.JSON,
      },

      organization_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },


      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: "crops_traceability",
      modelName: "CropsTraceability",
    }
  );
  return CropsTraceability;
};