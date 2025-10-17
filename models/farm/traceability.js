'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmTraceability extends Model {
    static associate(models) {
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        targetKey: 'id',
        as: 'userFarms',
      });
    }
  }

  FarmTraceability.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      farmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user_farm',
          key: 'id',
        },
      },
      farmName: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      farmerName: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      country: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      city: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      farmCoordinates: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photos: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      videos: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      farmImage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      qrCodeData: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.farmId) return null;
          const traceabilityBaseURL =
            process.env.TRACEABILITY_BASE_URL || 'https://trace.dimitra.world/trace-your-product/#';
          return `${traceabilityBaseURL}/farm-detail/${this.farmId}?currentEnv=${process.env.NODE_ENV}`;
        },
      },
    },
    {
      sequelize,
      tableName: 'farm_traceability',
      modelName: 'FarmTraceability',
    }
  );

  return FarmTraceability;
};
