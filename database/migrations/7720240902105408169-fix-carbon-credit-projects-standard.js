"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('carbon_credit_projects',
      { standard_methodology: "VM0048" },
      {
        standard_methodology: "Mexico Forest Protocol V3.1"
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('carbon_credit_projects',
      { standard_methodology: "Mexico Forest Protocol V3.1" },
      {
        standard_methodology: "VM0048"
      }
    );
  },
};
