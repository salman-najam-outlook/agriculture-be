"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "cacao_horticulture_information_map_data",
      {
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
        horticulture_information_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "horticulture_information",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        number_of_trees: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cacao_horticulture_information_map_data");
  },
};
