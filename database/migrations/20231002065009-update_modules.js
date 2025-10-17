"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkUpdate(
      "modules",
      { parent_module_id: "warehouse" },
      { id: "warehouse_inbound_whs" }
    );
    await queryInterface.bulkUpdate(
      "modules",
      { parent_module_id: "warehouse" },
      { id: "warehouse_outbound_whs" }
    );
    await queryInterface.bulkUpdate(
      "modules",
      { parent_module_id: "warehouse" },
      { id: "warehouse_warehouse_report" }
    );
    await queryInterface.bulkUpdate(
      "modules",
      { parent_module_id: "warehouse" },
      { id: "coffee/warehouse" }
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
