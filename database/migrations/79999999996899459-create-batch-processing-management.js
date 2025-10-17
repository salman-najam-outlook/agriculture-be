"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("batch_processing_management", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_of_issue: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      crop_type: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "options",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      quality_grade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      private_info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      public_info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      waste_quantity: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      final_quantity: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      available_quantity: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      lot_id:{
        type: Sequelize.TEXT,
        allowNull: true,
        
      },
      org_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      recordId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      isComplete: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("batch_processing_management");
  },
};
