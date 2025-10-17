'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_observation_segment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      segment: {
        type: Sequelize.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
      observation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_segment');
  },
};
