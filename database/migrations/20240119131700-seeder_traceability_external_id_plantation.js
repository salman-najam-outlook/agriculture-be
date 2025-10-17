"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const plantations = await queryInterface.sequelize.query(
      "SELECT * FROM plantations",
      { type: Sequelize.QueryTypes.SELECT }
    );

    let counter = 1;

    for (const plantation of plantations) {
      const externalId = `EID-${String(counter).padStart(6, "0")}`;
      counter++;

      await queryInterface.bulkInsert("traceability_external_ids", [
        {
          id: externalId,
          type: "coffee_plantation",
          type_id: plantation.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await queryInterface.bulkUpdate(
        "plantations",
        { external_traceability_id: externalId },
        { id: plantation.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("traceability_external_ids", null, {});
    await queryInterface.bulkUpdate("plantations", { external_traceability_id: null }, {});
  },
};
