"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "soil_analysis_parameter_ranges",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          analysis_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "soil_analysis_metadata",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          parameter_key: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: "soil_analysis_metadata",
              key: "name",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          range: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          uncertainty: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          value: {
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
      await queryInterface.dropTable("soil_analysis_parameter_ranges", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};