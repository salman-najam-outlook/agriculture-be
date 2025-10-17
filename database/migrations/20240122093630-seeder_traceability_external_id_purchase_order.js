"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lastExternalIdRow = await queryInterface.sequelize.query(
      "SELECT id FROM traceability_external_ids ORDER BY id DESC LIMIT 1",
      { type: Sequelize.QueryTypes.SELECT }
    );

    let counter = 1;

    if (lastExternalIdRow.length > 0) {
      // Extract the numeric part of the last external ID
      const lastIdNumericPart = parseInt(lastExternalIdRow[0].id.split('-')[1], 10);
      counter = lastIdNumericPart + 1;
    }


    const buyingStationOrders = await queryInterface.sequelize.query(
      "SELECT * FROM BuyingStationOrders",
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const buyingStationOrder of buyingStationOrders) {
      const externalId = `EID-${String(counter).padStart(6, "0")}`;
      counter++;

      await queryInterface.bulkInsert("traceability_external_ids", [
        {
          id: externalId,
          type: "coffee_purchase_order",
          type_id: buyingStationOrder.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await queryInterface.bulkUpdate(
        "BuyingStationOrders",
        { external_id: externalId },
        { id: buyingStationOrder.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("traceability_external_ids", null, {});
    await queryInterface.bulkUpdate("BuyingStationOrders", { external_id: null }, {});
  },
};
