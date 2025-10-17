'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
      * Add altering commands here.
      *
      * Example:
      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
    await queryInterface.addColumn('CropRecommendations', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
     
    await queryInterface.addColumn('CropRecommendationModuleAttributes', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
    await queryInterface.addColumn('crop_observation_disease', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
    await queryInterface.addColumn('crop_observation_pest_infestation', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
    await queryInterface.addColumn('SpecialOperationRecommendations', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
    await queryInterface.addColumn('comprehensnsive_analysis_reports', 'dutch', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "amharic"
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
