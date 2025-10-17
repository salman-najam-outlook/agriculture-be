'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('survey_questions_response', 'farmId'); 

    await queryInterface.addColumn("survey_questions_response", "farmId", {
      type: Sequelize.INTEGER,
      after: "optionId",
      allowNull: true
    });
    await queryInterface.addColumn("survey_questions_response", "geofenceId", {
      type: Sequelize.INTEGER,
      after: "farmId",
      allowNull: true
    });
    await queryInterface.addColumn("survey_questions_response", "equipmentId", {
      type: Sequelize.INTEGER,
      after: "geofenceId",
      allowNull: true
    });
    await queryInterface.addColumn("survey_questions_response", "cropId", {
      type: Sequelize.INTEGER,
      after: "equipmentId",
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
