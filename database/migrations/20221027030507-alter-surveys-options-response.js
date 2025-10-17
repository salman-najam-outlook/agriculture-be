"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("survey_questions_response", "text", {
      type: Sequelize.INTEGER,
      after: "farmId",
      default: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("survey_questions_response", "text")
  }
};
