'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('survey_questions', {
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
      question: Sequelize.STRING,
      type: Sequelize.STRING(50),
      isDisabled: Sequelize.BOOLEAN,
      mandatory: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('survey_questions');
  }
};
