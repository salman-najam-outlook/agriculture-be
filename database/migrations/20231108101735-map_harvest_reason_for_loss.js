"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("map_harvest_reason_for_loss", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      harvestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "harvest",
          key: "id",
        },
      },
      resonForLoss: {
        type: Sequelize.INTEGER,
        references: {
          model: "harvest_reason_for_losses",
          key: "id",
        },
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
    const harvestData = await queryInterface.sequelize.query(
      "SELECT id, resonForLoss FROM harvest"
    );

    // Transform the data to match the structure of the 'map_harvest_reason_for_loss' table
    const transformedData = harvestData[0]
      .filter((row) => row.resonForLoss !== null)
      .map((row) => ({
        harvestId: row.id,
        resonForLoss: row.resonForLoss,
      }));
    // Insert the transformed data into the 'map_harvest_reason_for_loss' table
    await queryInterface.bulkInsert(
      "map_harvest_reason_for_loss",
      transformedData,
      {}
    );

    // Remove the 'reasonForLoss' column from the 'harvest' table
    await queryInterface.removeColumn("harvest", "resonForLoss");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("map_harvest_reason_for_loss");

    await queryInterface.addColumn("harvest", "resonForLoss", {
      type: Sequelize.INTEGER,
      references: {
        model: "harvest_reason_for_losses",
        key: "id",
      },
    });
  },
};
