"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("survey_question_options", "answerTempId", {
      type: Sequelize.STRING(100),
      after: "isDisabled",
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("survey_question_options", "answerTempId")
  }
};
