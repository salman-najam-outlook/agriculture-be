"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.sequelize.query(`
    ALTER TABLE crop_observation_deficiency_list DROP PRIMARY KEY, ADD PRIMARY KEY(id, observation, deficiency);
  `);
    await queryInterface.sequelize.query(`
    ALTER TABLE crop_observation_toxicity_list DROP PRIMARY KEY, ADD PRIMARY KEY(id, observation, toxicity);
  `);

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "isFirstLogin");
  },
};
