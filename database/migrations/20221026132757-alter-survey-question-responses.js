"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("survey_questions_response", "farmId", {
      type: Sequelize.INTEGER,
      after: "optionId",
      default: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("survey_questions_response", "farmId")
  }
};
