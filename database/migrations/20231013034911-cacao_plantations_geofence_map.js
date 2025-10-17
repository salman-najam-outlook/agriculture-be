"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cacao_plantations_geofence_map", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plantation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cacao_plantations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      segment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "geofences",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("cacao_plantations_geofence_map");
  },
};
