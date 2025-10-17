"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    static associate(models) {
      // define association here

    }
  }
  Countries.init(
    {
      id: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      iso3: {
        type: DataTypes.CHAR(3),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      numeric_code: {
        type: DataTypes.CHAR(3),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      iso2: {
        type: DataTypes.CHAR(2),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      phonecode: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      capital: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      currency: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      currency_symbol: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      tld: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      native: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      region: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      subregion: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      timezones: {
        type: DataTypes.TEXT,
        // collate: 'utf8mb4_0900_ai_ci',
      },
      translations: {
        type: DataTypes.TEXT,
        // collate: 'utf8mb4_0900_ai_ci',
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
      },
      emoji: {
        type: DataTypes.STRING(191),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      emojiU: {
        type: DataTypes.STRING(191),
        // collate: 'utf8mb4_0900_ai_ci',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      wikiDataId: {
        type: DataTypes.STRING(255),
        // collate: 'utf8mb4_0900_ai_ci',
        comment: 'Rapid API GeoDB Cities',
      },
      currency_code: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: 'Countries',
      tableName: 'countries',
      timestamps: false
    }
  );
  return Countries;
};
