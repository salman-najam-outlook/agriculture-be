'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('crop_observation_pest_infestation', 'spanish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'hindi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'marathi', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'nepali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'swahili', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'indonesian', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'arabic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'portugese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'french', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'bengali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'oromo', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'somali', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'amharic', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'vietnamese', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'turkish', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('crop_observation_pest_infestation', 'greek', {
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
