"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("final_product_management", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lot_id: {
        type: Sequelize.STRING,
        allowNull: true,
        },
      issued_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_id: {
      type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      product_name: {
        type: Sequelize.STRING,
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
      quality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      hasWaste: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      waste_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      final_quantity: {
        type: Sequelize.FLOAT,
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
      recordId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      isComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
    },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('final_product_management');
  },
};
