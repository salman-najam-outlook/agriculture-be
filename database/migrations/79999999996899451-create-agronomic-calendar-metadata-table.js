'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agronomic_calendar_metadata', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      triggerActivity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      moduleId: {
        type: Sequelize.DataTypes.STRING,
        collate: 'utf8mb4_0900_ai_ci',
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: true,
      },
      triggerActivityStartDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      triggerActivityEndDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      subActivity: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      // subActivityStartDate: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // subActivityEndDate: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // description: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
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
    },
    {
      collate: 'utf8mb4_0900_ai_ci' // Set the collation of the "users" table to "utf8_general_ci"
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('agronomic_calendar_metadata');
  }
};
