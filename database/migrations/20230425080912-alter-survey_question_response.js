'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("survey_questions_response", "surveyUserResponseEntityId", {
      type: Sequelize.INTEGER,
      after: "surveyId",
      references: {
        model: "survey_user_response_entiity",
        key: "id",
        cascade: true,
      },
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
