'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('commodity', [
        { name: "Tea" },
        { name: "Coffee" },
        { name: "Horticulture" }
      ]);
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
