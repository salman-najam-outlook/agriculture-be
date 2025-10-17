'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('inbound_warehouse_cupping', 'roasting_time', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'roasting_temperature', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'qualities', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'uniformity', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'clean_cup', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'sweetness', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'defect_cups', {
      allowNull: true,
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('inbound_warehouse_cupping', 'defect_intensity', {
      allowNull: true,
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'roasting_time')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'roasting_temperature')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'qualities')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'uniformity')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'clean_cup')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'sweetness')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'defect_cups')
    await queryInterface.removeColumn('inbound_warehouse_cupping', 'defect_intensity')
  }
};
