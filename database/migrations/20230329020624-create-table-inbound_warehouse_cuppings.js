'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('inbound_warehouse_cupping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inbound_warehouse_id: {
        type: Sequelize.INTEGER
      },
      cupping_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fragrance: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cupping_time: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      aromas: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      flavour: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      acidity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      acidity_range: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      body: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      body_range: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      after_taste: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      balance: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      balance_range: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      note: {
        allowNull: true,
        type: Sequelize.TEXT('long'),
      },
      final_score: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.DATE,
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('inbound_warehouse_cupping');
  }
};
