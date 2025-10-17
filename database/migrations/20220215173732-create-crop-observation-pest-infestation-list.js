'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_observation_pestInfestation_list', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      observation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
      pestInfestation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_pest_infestation',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_pestInfestation_list');
  },
};
