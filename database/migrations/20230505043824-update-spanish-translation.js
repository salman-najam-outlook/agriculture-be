'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      "global_translation_metadata",
      { english: "rainy/wet season" },
      { spanish: "Estación lluviosa/húmeda" }
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
