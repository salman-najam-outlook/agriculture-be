"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("survey_questions", "type" )
    await queryInterface.addColumn("survey_questions", "questionType", {
      type: Sequelize.ENUM,
      values: [
        "text",
        "number",
        "textarea",
        "radio",
        "checkbox",
        "farmer",
        "geofence",
        "crop",
        "equipments",
      ],
      allowNull: false,
      after: "question",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn("survey_questions", "questionType" )
    await queryInterface.addColumn("survey_questions", "type", {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: "question",
    });
  },
};
