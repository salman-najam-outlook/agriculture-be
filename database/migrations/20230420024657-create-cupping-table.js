'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cupping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      module_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      module_id: {
        type: Sequelize.INTEGER
      },
      cupping_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cupping_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      roasting_temperature: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      roasting_temperature_unit: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fragrance: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fragrance_break: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fragrance_dry: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fragrance_qualities: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      flavour: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      flavour_qualities: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      after_taste: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      after_taste_qualities: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      acidity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      acidity_qualities: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      body: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      body_level: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      body_qualities: {
        allowNull: true,
        type: Sequelize.TEXT,
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
      overall: {
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
      defect_value: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      final_score: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deletedAt: {
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cupping');
  }
};
