'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("pest_management_chemical_pesticides_type", "userId", {
      after: "pestManagementId",
      allowNull: true,
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("pest_management_chemical_pesticides_type","userId")
  }
};
