'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert("user_role_modules",[
      {
        id: "coffee_farmer_warehouse",
        user_role_id: "coffee_farmer",
        module_id: "coffee/warehouse",
      },
      {
        id: "coffee_farmer_warehouse_inbound",
        user_role_id: "coffee_farmer",
        module_id: "warehouse_inbound_whs",
      },
      {
        id: "coffee_farmer_warehouse_outbound",
        user_role_id: "coffee_farmer",
        module_id: "warehouse_outbound_whs",
      },
      {
        id: "coffee_farmer_warehouse_warehouse_report",
        user_role_id: "coffee_farmer",
        module_id: "warehouse_warehouse_report",
      }
    ], {})

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

