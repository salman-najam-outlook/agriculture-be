"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.sequelize.query(`
    ALTER TABLE crop_observation_disease_list DROP PRIMARY KEY, ADD PRIMARY KEY(id, observation, disease);
  `);
    await queryInterface.sequelize.query(`
    ALTER TABLE crop_observation_pestInfestation_list DROP PRIMARY KEY, ADD PRIMARY KEY(id, observation, pestInfestation);
  `);

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "isFirstLogin");
  },
};
