"use strict";

const projects = [
  {
    project_title: "Dimitra Carbon Forest Conservation Project",
    project_type: "avoided_deforestation",
    description: "The primary goal of the project is to implement a forest conservation initiative in Mexico by promoting sustainable forest management practices that enhance carbon sequestration while creating alternative revenue streams for farmers",
    country: "Mexico",
    credit_type: "removal",
    status: "operational",
    standard_methodology: "Mexico Forest Protocol V3.1",
    credit_start_date: new Date("2025-08-01"),
    credit_end_date: new Date("2035-07-31")
  },
  {
    project_title: "Ethiopian AgroForestry Project Phase 01",
    project_type: "agroforestry",
    description: "The project's primary goal is to increase the green belt across the coffee growing regions of Ethiopia and generate alternative revenue streams for the farmers",
    country: "Ethiopia",
    credit_type: "removal",
    status: "planned",
    standard_methodology: "VM0042",
    credit_start_date: new Date("2025-10-01"),
    credit_end_date: new Date("2035-09-30")
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('carbon_credit_projects', projects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carbon_credit_projects', {}, {});
  },
};
