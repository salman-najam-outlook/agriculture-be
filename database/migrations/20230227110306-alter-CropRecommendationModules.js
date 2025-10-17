'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('CropRecommendationModules', 'ddName', {
    //   type: Sequelize.STRING
    // })
    // await queryInterface.addColumn('CropRecommendationModules', 'moduleNum', {
    //   type: Sequelize.STRING
    // })
    // await queryInterface.addColumn('CropRecommendationModules', 'deletedAt', {
    //   type: Sequelize.DATE
    // })
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
