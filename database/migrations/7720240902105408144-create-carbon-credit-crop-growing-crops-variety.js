"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("carbon_credit_crop_growing_crop_varieties", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      crop_growing_crop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_crop_growing_crops',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      crop_variety_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'crop_variety',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("carbon_credit_crop_growing_crop_varieties");
  },
};