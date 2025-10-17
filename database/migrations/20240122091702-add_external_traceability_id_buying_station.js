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
    await queryInterface.addColumn("BuyingStationOrders", "external_id", {
      type: Sequelize.STRING(20),
      allowNull: true,
      references: {
        model: "traceability_external_ids",
        key: "id",
      },
    });
    await queryInterface.addColumn(
      "BuyingStationProcessingBatches",
      "external_id",
      {
        type: Sequelize.STRING(20),
        allowNull: true,
        references: {
          model: "traceability_external_ids",
          key: "id",
        },
      }
    );
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
