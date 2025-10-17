'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE survey_user_response_entiity ADD COLUMN uuid VARCHAR(50)');
    await queryInterface.sequelize.query('ALTER TABLE survey_user_response_entiity ADD CONSTRAINT survey_user_response_entiity_unique_key UNIQUE (uuid)');
    await queryInterface.sequelize.query('UPDATE survey_user_response_entiity SET uuid = CAST(id AS CHAR(50))');
  },

  down: async (queryInterface, Sequelize) => {

  },
};
