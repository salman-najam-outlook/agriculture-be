'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("survey_response_download_history", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'surveys_list',
          key: 'id',
          cascade: true
        }
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      fileUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jobId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      }
    })

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("survey_response_download_history");
  },
};
