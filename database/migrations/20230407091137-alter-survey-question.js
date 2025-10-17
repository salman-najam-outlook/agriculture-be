'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("survey_questions", "questionType" )
    await queryInterface.addColumn("survey_questions", "questionType", {
      type: Sequelize.ENUM,
      values: [
        "text",
        "number",
        "textarea",
        "radio",
        "checkbox",
        "dynamicFarmer",
        "dynamicGeoFence",
        "dynamicCrop",
        "dynamicEquipment",
      ],
      allowNull: false,
      after: "question",
    });
    await queryInterface.addColumn("survey_questions", "resource", {
      type: Sequelize.ENUM,
      values: [
        "farm",
        "geofence",
        "crop",
        "equipment",
      ],
      allowNull: true,
      after: "questionType",
    });
    await queryInterface.addColumn("survey_questions", "selection", {
      type: Sequelize.ENUM,
      values: [
        "single",
        "multiple",
      ],
      allowNull: true,
      after: "resource",
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
