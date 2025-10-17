'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'GeneralCropInformationRecommendations',
      'harvestingSeason',
      { type: Sequelize.STRING(400) }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'GeneralCropInformationRecommendations',
      'harvestingSeason'
    );
  },
};
