'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('harvest', 'area_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('harvest', 'total_fresh_yield_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('harvest', 'total_dry_yield_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('harvest', 'total_planned_fresh_yield_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('harvest', 'total_planned_dry_yield_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('harvest', 'yield_for_sale_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('harvest', 'area_unit_id');
    await queryInterface.removeColumn('harvest', 'total_fresh_yield_unit_id');
    await queryInterface.removeColumn('harvest', 'total_dry_yield_unit_id');
    await queryInterface.removeColumn('harvest', 'total_planned_fresh_yield_unit_id');
    await queryInterface.removeColumn('harvest', 'total_planned_dry_yield_unit_id');
    await queryInterface.removeColumn('harvest', 'yield_for_sale_unit_id');
  }
};
