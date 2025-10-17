'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('survey_questions_response', 'survey_questions_response_surveyUserResponseEntityId_foreign_idx');
    await queryInterface.sequelize.query('ALTER TABLE survey_questions_response MODIFY COLUMN surveyUserResponseEntityId VARCHAR(50) NULL');
    await queryInterface.sequelize.query('ALTER TABLE survey_questions_response MODIFY COLUMN surveyUserResponseEntityId varchar(50) COLLATE utf8mb4_general_ci');
    await queryInterface.sequelize.query('ALTER TABLE survey_questions_response ADD CONSTRAINT survey_questions_response_surveyUserResponseEntityId_foreign_idx FOREIGN KEY (surveyUserResponseEntityId) REFERENCES survey_user_response_entiity(uuid)');
  },

  down: async (queryInterface, Sequelize) => {
  },
};
