'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('survey_questions', 'isQuestionScore', {
      type: Sequelize.BOOLEAN,
      after: "mandatory",
      default: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('survey_questions', 'isQuestionScore');
  },
};
