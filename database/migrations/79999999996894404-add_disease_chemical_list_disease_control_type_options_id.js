'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("disease_management_chemical_type", "diseaseControlTypeOptionId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "disease_management_chemical_type",
      "diseaseControlTypeOptionId"
    );
  },
};
