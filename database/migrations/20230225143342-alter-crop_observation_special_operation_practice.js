'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'spanish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'hindi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'marathi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'nepali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'swahili', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'indonesian', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'arabic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'portugese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'french', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'bengali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'oromo', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'somali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'amharic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'vietnamese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'turkish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_special_operation_practice', 'greek', {
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
