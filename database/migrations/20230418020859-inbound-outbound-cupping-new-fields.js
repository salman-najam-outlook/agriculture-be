'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('inbound_warehouse_cupping', 'roasting_temperature_unit', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'fragrance_break', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'fragrance_dry', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'fragrance_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'flavour_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'after_taste_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'acidity_intensity', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'acidity_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'body_level', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'body_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'overall', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'defect_value', {
      allowNull: true,
      type: Sequelize.STRING,
    })

    await queryInterface.addColumn('outbound_warehouse_cupping', 'roasting_temperature_unit', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'fragrance_break', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'fragrance_dry', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'fragrance_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'flavour_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'after_taste_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'acidity_intensity', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'acidity_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'body_level', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'body_qualities', {
      allowNull: true,
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'overall', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('outbound_warehouse_cupping', 'defect_value', {
      allowNull: true,
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'roasting_temperature_unit')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'fragrance_break')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'fragrance_dry')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'fragrance_qualities')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'flavour_qualities')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'after_taste_qualities')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'acidity_intensity')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'acidity_qualities')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'body_level')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'body_qualities')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'overall')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'defect_value')

    await queryInterface.removeColumn('outbound_warehouse_cupping', 'roasting_temperature_unit')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'fragrance_break')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'fragrance_dry')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'fragrance_qualities')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'flavour_qualities')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'after_taste_qualities')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'acidity_intensity')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'acidity_qualities')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'body_level')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'body_qualities')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'overall')
    await queryInterface.removeColumn('outbound_warehouse_cupping', 'defect_value')
  }
};
