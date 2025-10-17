"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      "crop_observation_special_operation_practice",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        practice: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        cropTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: "options",
            key: "id",
          },
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
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("crop_observation_special_operation_practice");
  },
};
