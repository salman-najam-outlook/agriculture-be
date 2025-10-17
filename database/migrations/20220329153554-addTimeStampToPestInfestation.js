'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'crop_observation_pestInfestation_list',
      'createdAt',
      { type: Sequelize.DATE },
    );
    await queryInterface.addColumn(
      'crop_observation_pestInfestation_list',
      'updatedAt',
      { type: Sequelize.DATE },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'crop_observation_pestInfestation_list',
      'updatedAt',
    );
    await queryInterface.removeColumn(
      'crop_observation_pestInfestation_list',
      'createdAt',
    );
  },
};
