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


    const cacaoPlantations = await queryInterface.sequelize.query(
      "SELECT * FROM cacao_plantations",
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const plantation of cacaoPlantations) {
      const externalId = `EID-${String(counter).padStart(6, "0")}`;
      counter++;

      await queryInterface.bulkInsert("traceability_external_ids", [
        {
          id: externalId,
          type: "cacao_plantation",
          type_id: plantation.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await queryInterface.bulkUpdate(
        "cacao_plantations",
        { external_traceability_id: externalId },
        { id: plantation.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("traceability_external_ids", null, {});
    await queryInterface.bulkUpdate("cacao_plantations", { external_traceability_id: null }, {});
  },
};
