'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('survey_question_options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      text: Sequelize.TEXT,
      scores: Sequelize.INTEGER,
      isDisabled: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('survey_question_options');
  }
};
