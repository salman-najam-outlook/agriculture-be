"use strict";

const sdgs = [
  {
    "title": "Good Health and well Being",
    "fix": "Good Health and Well-Being"
  },
  {
    "title": "Affordable  and Clean Energy",
    "fix": "Affordable and Clean Energy"
  },
  {
    "title": "Industry, innovation and infrastructure",
    "fix": "Industry, Innovation and Infrastructure"
  },
  {
    "title": "Responsible consumption and production",
    "fix": "Responsible Consumption and Production"
  },
  {
    "title": "Partnerships For the Goals",
    "fix": "Partnerships for the Goals",
  },
  {
    "title": "Peace, Justice and Strong Intitutions",
    "fix": "Peace, Justice and Strong Institutions"
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for await (const {title, fix} of sdgs) {
      await queryInterface.bulkUpdate('carbon_credit_sdgs', 
        { title: fix },
        {
          title
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    for await (const {title, fix} of sdgs) {
      await queryInterface.bulkUpdate('carbon_credit_sdgs', 
        { title },
        {
          title: fix
        }
      );
    }
  },
};
