"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("comprehensnsive_analysis_reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileS3Key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      english: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hindi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      marathi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nepali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spanish: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      indonesian: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      arabic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      portugese: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      french: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vietnamese: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amharic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      somali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      oromo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bengali: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      swahili: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      greek: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      turkish: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     *
     */

    await queryInterface.dropTable("comprehensnsive_analysis_reports");
  },
};
