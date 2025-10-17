"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TraceabilityInformation extends Model {
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
  TraceabilityInformation.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      coffee_plantation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'plantations',
          key: 'id',
        },
      },

      plantation_history: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      coffeeVaritey: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      coffeeSpecies: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      photos: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      videos: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      recordId: DataTypes.STRING,
      
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
      tableName: "traceability_informations",
      modelName: "TraceabilityInformation",
    }
  );
  return TraceabilityInformation;
};