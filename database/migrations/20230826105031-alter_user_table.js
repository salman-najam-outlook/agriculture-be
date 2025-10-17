"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "adminType", {
      type: Sequelize.ENUM(
        "connected_farmer",
        "connected_coffee",
        "connected_cacao"
      ),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "adminType");
  },
};
