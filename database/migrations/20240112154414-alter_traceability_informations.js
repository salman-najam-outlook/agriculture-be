"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "traceability_informations",
      "coffeeSpecies",
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );
    await queryInterface.addColumn(
      "traceability_informations",
      "coffee_plantation_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "plantations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    );
    await queryInterface.addColumn("traceability_informations", "photos", {
      allowNull: true,
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn("traceability_informations", "videos", {
      allowNull: true,
      type: Sequelize.JSON,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
