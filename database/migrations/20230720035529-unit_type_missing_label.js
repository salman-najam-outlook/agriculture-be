'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        name: "Density",
        label: "Density",
      },
      {
        name: "CoffeeParchmentDensityUnit",
        label: "Coffee Parchment Density Unit",
      },
    ]

    for (const row of data) {
      let sql =
        "SELECT * FROM unit_types WHERE name = :name";
      const unit_type = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { name: row.name },
      });

      // update case
      if (unit_type && unit_type.length > 0) {
        await queryInterface.bulkUpdate("unit_types", row, {
          id: unit_type[0].id
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
