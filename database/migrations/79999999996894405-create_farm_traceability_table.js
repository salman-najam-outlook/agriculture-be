"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("farm_traceability", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      farmName: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      farmerName: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      country: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      city: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      farmCoordinates: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photos: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      videos: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable("farm_traceability");
  },
};
