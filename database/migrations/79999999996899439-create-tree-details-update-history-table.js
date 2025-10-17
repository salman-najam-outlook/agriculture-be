"use strict";

const TREE_TYPES = require("../../constants/TREE_TYPES");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tree_detail_update_history", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      treeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      treeUUID: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      farmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_farms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      treeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      treeType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      plantationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      altitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      zoneId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "geofences",
          key: "id",
        },
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      images: {
        type: Sequelize.JSON,
        allowNull: true,
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

      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("tree_detail_update_history");
  },
};
