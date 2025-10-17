"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "lime_analysis_results",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          status: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
              isIn: [["FAILED", "SUCCESS", "PENDING"]],
            },
          },
          remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          limePrice: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          env: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          targetPH: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          soilDepth: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          useCoordinates: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
          },
          areaUnit: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          currentPH: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          soilType: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          latitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          longitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          currentSoilPh: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          limeNeeded: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          limeUnit: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          note: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          success: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
          },
          totalCost: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          createdAt: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("lime_analysis_results", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};