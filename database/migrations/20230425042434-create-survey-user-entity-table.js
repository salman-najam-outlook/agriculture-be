"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("survey_user_response_entiity", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "surveys_list",
          key: "id",
          cascade: true,
        },
      },
      surveyUserListId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "survey_users_list",
          key: "id",
          cascade: true,
        },
      },
      farmId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_farms",
          key: "id",
          cascade: true,
        },
        allowNull: true,
      },
      surveyStatus: Sequelize.BOOLEAN,
      status: {
        type: Sequelize.ENUM(["active", "inprogress", "submitted"]),
        allowNull: false,
        defaultVlue: "active",
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("survey_user_response_entiity");
  },
};
