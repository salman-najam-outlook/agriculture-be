"use strict";

const sdgs = [
  {
    "title": "No Poverty",
    "description": "End poverty in all its forms everywhere.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg"
  },
  {
    "title": "Zero Hunger",
    "description": "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg"
  },
  {
    "title": "Good Health and well Being",
    "description": "Ensure healthy lives and promote well-being for all at all ages.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg"
  },
  {
    "title": "Quality Education",
    "description": "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg"
  },
  {
    "title": "Gender Equality",
    "description": "Achieve gender equality and empower all women and girls.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg"
  },
  {
    "title": "Clean Water and Sanitation",
    "description": "Ensure availability and sustainable management of water and sanitation for all.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg"
  },
  {
    "title": "Affordable  and Clean Energy",
    "description": "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg"
  },
  {
    "title": "Decent Work and Economic Growth",
    "description": "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg"
  },
  {
    "title": "Industry, innovation and infrastructure",
    "description": "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg"
  },
  {
    "title": "Reduced Inequalities",
    "description": "Reduce inequality within and among countries.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg"
  },
  {
    "title": "Sustainable Cities and Communities",
    "description": "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg"
  },
  {
    "title": "Responsible consumption and production",
    "description": "Ensure sustainable consumption and production patterns.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg"
  },
  {
    "title": "Climate Action",
    "description": "Take urgent action to combat climate change and its impacts.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg"
  },
  {
    "title": "Life Below Water",
    "description": "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg"
  },
  {
    "title": "Life on Land",
    "description": "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg"
  },
  {
    "title": "Partnerships For the Goals",
    "description": "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg"
  },
  {
    "title": "Peace, Justice and Strong Intitutions",
    "description": "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.",
    "icon": "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg"
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('carbon_credit_sdgs', sdgs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carbon_credit_sdgs', {}, {});
  },
};
