"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "survey_questions",
      "isNestedQuestion",
      {
        type: Sequelize.BOOLEAN,
        after: "answerTempId",
        defaultValue: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "survey_questions",
      "isNestedQuestion"
    );
  },
};
