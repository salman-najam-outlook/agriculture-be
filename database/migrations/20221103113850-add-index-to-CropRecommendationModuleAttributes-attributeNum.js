module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('CropRecommendationModuleAttributes', ['attributeNum']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('CropRecommendationModuleAttributes', ['attributeNum']);
  }
};