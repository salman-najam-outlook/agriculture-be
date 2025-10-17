"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoTraceabilityInformation extends Model {
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
  CacaoTraceabilityInformation.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      cacao_plantation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cacao_plantations',
          key: 'id',
        },
      },

      plantation_history: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      cacaoVaritey: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      cacaoSpecies: {
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
      tableName: "cacao_traceability_informations",
      modelName: "CacaoTraceabilityInformation",
    }
  );
  return CacaoTraceabilityInformation;
};