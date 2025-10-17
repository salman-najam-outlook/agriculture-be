"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cacao_manage_trees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plantation_id: {
        type: Sequelize.INTEGER,
        references: { model: "cacao_plantations", key: "id" },
        allowNull: false,
        onDelete: "CASCADE",
      },
      date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      cacao_species: {
        type: Sequelize.INTEGER,
        references: {
          model: "cacao_species",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      cacao_variety: {
        type: Sequelize.INTEGER,
        references: {
          model: "cacao_variety",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      no_of_cacao_trees: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("cacao_manage_trees");
  },
};
