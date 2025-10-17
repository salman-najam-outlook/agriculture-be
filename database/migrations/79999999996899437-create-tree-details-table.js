"use strict";

const TREE_TYPES = require("../../constants/TREE_TYPES");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tree_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      treeUUID: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
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
        allowNull: false,
      },
      treeType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: TREE_TYPES.AVOCADO,
      },
      plantationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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

      uploadhistoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tree_upload_history",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("tree_details");
  },
};
