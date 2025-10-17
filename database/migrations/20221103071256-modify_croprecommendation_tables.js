'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ScaleRecommendations', 'moduleNum', {
      type: Sequelize.STRING(10),
    });
    await queryInterface.addColumn('ScaleRecommendations', 'attributeNum', {
      type: Sequelize.STRING(10),
    });
    await queryInterface.addColumn('CropRecommendations', 'moduleNum', {
      type: Sequelize.STRING(10),
    });
    await queryInterface.addColumn('CropRecommendations', 'attributeNum', {
      type: Sequelize.STRING(10),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ScaleRecommendations', 'moduleNum');
    await queryInterface.removeColumn('ScaleRecommendations', 'attributeNum');
    await queryInterface.removeColumn('CropRecommendations', 'moduleNum');
    await queryInterface.removeColumn('CropRecommendations', 'attributeNum');
  },
};
