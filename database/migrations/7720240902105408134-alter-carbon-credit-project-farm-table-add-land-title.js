'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("carbon_credit_project_farm", "land_title_permit_s3_url", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropColumn("carbon_credit_project_farm", 'land_title_permit_s3_url');
  },
};