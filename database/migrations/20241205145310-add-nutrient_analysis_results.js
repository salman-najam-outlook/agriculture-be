"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nutrient_analysis_results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      areaUnit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cropDetail: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      fertilizers: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      userFertilizers: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      soilInfo: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      cropLeftOnField: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      recommendations: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      totalCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("nutrient_analysis_results");
  },
};