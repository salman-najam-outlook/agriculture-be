'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('crop_observation_disease', 'spanish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'hindi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'marathi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'nepali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'swahili', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'indonesian', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'arabic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'portugese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'french', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'bengali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'oromo', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'somali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'amharic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'vietnamese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'turkish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_disease', 'greek', {
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
