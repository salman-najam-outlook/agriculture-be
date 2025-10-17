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


    const parchmentCoffees = await queryInterface.sequelize.query(
      "SELECT * FROM parchment_coffees",
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const parchmentCoffee of parchmentCoffees) {
      const externalId = `EID-${String(counter).padStart(6, "0")}`;
      counter++;

      await queryInterface.bulkInsert("traceability_external_ids", [
        {
          id: externalId,
          type: "parchment_coffee",
          type_id: parchmentCoffee.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await queryInterface.bulkUpdate(
        "parchment_coffees",
        { external_id: externalId },
        { id: parchmentCoffee.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("traceability_external_ids", null, {});
    await queryInterface.bulkUpdate("parchment_coffees", { external_id: null }, {});
  },
};
