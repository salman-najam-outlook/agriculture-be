"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "survey_question_options",
      "nestedQuestionId",
      {
        type: Sequelize.INTEGER,
        after: "questionId",
        allowNull: true,
        references: {
          model: "survey_questions",
          key: "id",
          cascade: true,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "survey_question_options",
      "nestedQuestionId"
    );
  },
};
