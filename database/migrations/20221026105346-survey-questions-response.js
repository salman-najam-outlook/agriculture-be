'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('survey_questions_response', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          cascade: true
        }
      },
      surveyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'surveys_list',
          key: 'id',
          cascade: true
        }
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'survey_questions',
          key: 'id',
          cascade: true
        }
      },     
      optionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'survey_question_options',
          key: 'id',
          cascade: true
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('survey_questions_response');
  }
};
