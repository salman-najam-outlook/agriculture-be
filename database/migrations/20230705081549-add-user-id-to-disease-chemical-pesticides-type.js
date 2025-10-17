'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("disease_management_chemical_type", "userId", {
      after: "diseaseManagementId",
      allowNull: true,
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("disease_management_chemical_type","userId")
  }
};
