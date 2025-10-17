'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('outbound_warehouse_cupping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      outbound_warehouse_id: {
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
      roasting_time: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      roasting_temperature: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      qualities: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      uniformity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      clean_cup: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      sweetness: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      defect_cups: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      defect_intensity: {
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
    await queryInterface.dropTable('outbound_warehouse_cupping');
  }
};
