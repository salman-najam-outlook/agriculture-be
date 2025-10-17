'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    await queryInterface.addColumn('SpecialOperationRecommendations', 'spanish', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'hindi', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'marathi', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'nepali', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'swahili', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'indonesian', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'arabic', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'portugese', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'french', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'bengali', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'oromo', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'somali', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'amharic', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'vietnamese', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'turkish', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('SpecialOperationRecommendations', 'greek', {
      type: Sequelize.JSON,
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
