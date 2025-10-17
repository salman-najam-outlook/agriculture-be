'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('CropRecommendationModuleAttributes', 'dataIndex', {
    //   type: Sequelize.JSON
    // })
    // await queryInterface.addColumn('CropRecommendationModuleAttributes', 'attributeNum', {
    //   type: Sequelize.STRING
    // })
    // await queryInterface.addColumn('CropRecommendationModuleAttributes', 'moduleNum', {
    //   type: Sequelize.STRING
    // })
    // await queryInterface.addColumn('CropRecommendationModuleAttributes', 'deletedAt', {
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
