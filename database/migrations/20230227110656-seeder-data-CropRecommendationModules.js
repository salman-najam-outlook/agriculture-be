'use strict';
const moment = require("moment");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const cropRecommendationModules = [
      {
        id: 1,
        name: 'Land Preparation Report',
        ddName: 'Land Preparation and Sowing',
        moduleNum: 'm1',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 2,
        name: 'Sowing/Planting Report',
        ddName: 'Mainfield Sowing/Planting (units: Field crop (cm); Tree crops (m) wherever applicable)',
        moduleNum: 'm2',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 3,
        name: 'Soil Management Report',
        ddName: '3. SOIL MANAGEMENT',
        moduleNum: 'm3',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 4,
        name: 'Irrigation Report',
        ddName: '4. IRRIGATION',
        moduleNum: 'm4',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 5,
        name: 'Weeding Report',
        ddName: '5. INTERCULTIVATION PRACTICES',
        moduleNum: 'm5',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 6,
        name: 'Pest Management Report',
        ddName: 'Pests/Insects',
        moduleNum: 'm6',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 7,
        name: 'Disease Management Report',
        ddName: 'Diseases',
        moduleNum: 'm7',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 8,
        name: 'Harvesting Report',
        ddName: '7. HARVESTING',
        moduleNum: 'm8',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 9,
        name: 'Storage Report',
        ddName: '8. STORAGE',
        moduleNum: 'm9',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 10,
        name: 'General Information Report',
        ddName: '1. GENERAL CROP INFORMATION',
        moduleNum: 'm10',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: 11,
        name: 'Special Operations',
        ddName: 'Special operations (for applicable crops only)',
        moduleNum: 'm11',
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ];
    // await queryInterface.bulkInsert("CropRecommendationModules", cropRecommendationModules, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
