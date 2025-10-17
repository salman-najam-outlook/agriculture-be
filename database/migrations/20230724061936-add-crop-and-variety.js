"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.bulkInsert(
      "options",
      [
        {
          name: "Mango (Brazil)",
          region: "Brazil",
          countryCode: "BR",
          groupName: "crop-type",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const [result] = await queryInterface.sequelize.query(
      "SELECT LAST_INSERT_ID() AS id"
    );
    await queryInterface.bulkInsert(
      "crops",
      [
        {
          cropTypeOptId: result[0].id,
          name: "Espada",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Rosa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Tommy Atkins",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Palmer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Ubá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "KENT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "KEITT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
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
