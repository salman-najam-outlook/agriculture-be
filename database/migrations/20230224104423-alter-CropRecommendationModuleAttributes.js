'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'spanish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'hindi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'marathi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'nepali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'swahili', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'indonesian', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'arabic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'portugese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'french', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'bengali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'oromo', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'somali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'amharic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'vietnamese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'turkish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'greek', {
      type: Sequelize.STRING
    })
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
