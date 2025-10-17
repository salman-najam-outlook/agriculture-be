"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("tree_details", "treeName", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("tree_details", "plantationDate", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.changeColumn("tree_details", "latitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });

    await queryInterface.changeColumn("tree_details", "longitude", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });

    await queryInterface.changeColumn("tree_details", "status", {
      type: Sequelize.STRING,
      allowNull: true,
    });
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
