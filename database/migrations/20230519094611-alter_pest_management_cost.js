"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "pest_managements_costs",
      "totalNumberOfWorkers",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: "chemicalCost",
      }
    );

    await queryInterface.addColumn(
      "pest_managements_costs",
      "totalNumberOfHours",
      {
        type: Sequelize.DOUBLE,
        allowNull: true,
        after: "chemicalCost",
      }
    );
    await queryInterface.removeColumn('pest_managements_costs', 'totalCost');
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
