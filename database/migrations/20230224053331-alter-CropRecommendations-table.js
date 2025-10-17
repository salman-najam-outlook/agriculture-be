'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('CropRecommendations', 'spanish', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'hindi', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'marathi', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'nepali', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'swahili', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'indonesian', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'arabic', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'portugese', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'french', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'bengali', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'oromo', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'somali', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'amharic', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'vietnamese', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'turkish', {
      type: Sequelize.JSON,
    })
    await queryInterface.addColumn('CropRecommendations', 'greek', {
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
    await queryInterface.removeColumn('CropRecommendations', 'hindi')
    await queryInterface.removeColumn('CropRecommendations', 'marathi')
    await queryInterface.removeColumn('CropRecommendations', 'spanish')
    await queryInterface.removeColumn('CropRecommendations', 'indonesian')
    await queryInterface.removeColumn('CropRecommendations', 'arabic')
    await queryInterface.removeColumn('CropRecommendations', 'portugese')
    await queryInterface.removeColumn('CropRecommendations', 'french')
    await queryInterface.removeColumn('CropRecommendations', 'swahili')
    await queryInterface.removeColumn('CropRecommendations', 'bengali')
    await queryInterface.removeColumn('CropRecommendations', 'oromo')
    await queryInterface.removeColumn('CropRecommendations', 'somali')
    await queryInterface.removeColumn('CropRecommendations', 'amharic')
    await queryInterface.removeColumn('CropRecommendations', 'vietnamese')
    await queryInterface.removeColumn('CropRecommendations', 'turkish')
    await queryInterface.removeColumn('CropRecommendations', 'greek')
  }
};
