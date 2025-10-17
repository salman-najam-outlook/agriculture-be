'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("carbon_credit_projects", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_type: {
        type: Sequelize.ENUM(
          "agroforestry",
          "regenerative_agriculture",
          "avoided_deforestation"
        ),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "proposed",
          "planned",
          "in_progress",
          "operational",
          "deactivate"
        ),
        allowNull: false,
      },
      credit_type: {
        type: Sequelize.ENUM("removal", "avoided"),
        allowNull: false,
      },
      credit_start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      credit_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      standard_methodology: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      validation_documentation: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "S3 Key to uploaded validation document",
      },
      vintage_currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USD",
        comment: "Currency for vintage prices",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carbon_credit_projects');
  },
};