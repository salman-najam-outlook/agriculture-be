'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pest_management_chemical_pesticides_type", "pestControlTypeOptionId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "pest_management_chemical_pesticides_type",
      "pestControlTypeOptionId"
    );
  },
};
