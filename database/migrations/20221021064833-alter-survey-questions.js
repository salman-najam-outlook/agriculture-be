"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("survey_questions", "answerTempId", {
      type: Sequelize.STRING(100),
      after: "mandatory",
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("survey_questions", "answerTempId")
  }
};
