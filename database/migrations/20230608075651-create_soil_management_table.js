"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("soil_managements", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      area: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      areaUnitId: {
        type: Sequelize.INTEGER,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      soilHealth: {
        type: Sequelize.ENUM('Fertile', 'Medium fertile', 'Low fertile'),
      },
      ph: {
        type: Sequelize.INTEGER,
      },
      soilTest: {
        type: Sequelize.BOOLEAN,
      },
      soilTestLocationLat: {
        type: Sequelize.FLOAT,
      },
      soilTestLocationLog: {
        type: Sequelize.FLOAT,
      },
      soilTestLocationAddr: {
        type: Sequelize.TEXT,
      },
      soilTestLocationFarmId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_farms",
          key: "id",
        },
      },
      soilOrganicCarbon: {
        type: Sequelize.INTEGER,
      },
      nitrogen: {
        type: Sequelize.INTEGER,
      },
      nitrogenUnitId: {
        type: Sequelize.INTEGER,
      },
      phosphorus: {
        type: Sequelize.INTEGER,
      },
      phosphorusUnitId: {
        type: Sequelize.INTEGER,
      },
      potassium: {
        type: Sequelize.INTEGER,
      },
      potassiumUnitId: {
        type: Sequelize.INTEGER,
      },
      sulfur: {
        type: Sequelize.INTEGER,
      },
      sulfurUnitId: {
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      recordId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Unique ID sent from app for offline mode",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("soil_managements");
  },
};
