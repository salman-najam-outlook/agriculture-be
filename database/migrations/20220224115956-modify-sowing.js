'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sowing', 'plantingTypeId');
    await queryInterface.removeColumn('sowing', 'areaUnitId');
    await queryInterface.removeColumn('sowing', 'seedingRate');
    await queryInterface.removeColumn('sowing', 'seedingUnitId');
    await queryInterface.removeColumn('sowing', 'rowSpacing');
    await queryInterface.removeColumn('sowing', 'rowSpacingUnitId');
    await queryInterface.removeColumn('sowing', 'inRowSpacing');
    await queryInterface.removeColumn('sowing', 'inRowSpacingUnitId');
    await queryInterface.removeColumn('sowing', 'density');
    await queryInterface.removeColumn('sowing', 'depth');
    await queryInterface.removeColumn('sowing', 'depthUnitId');

    await queryInterface.addColumn('sowing', 'plantingTypeId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'planting_types', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('sowing', 'areaUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'areaunit', model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('sowing', 'seedingRate', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('sowing', 'seedingUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'seedingunit', model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('sowing', 'rowSpacing', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('sowing', 'rowSpacingUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'rowspacing', model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('sowing', 'inRowSpacing', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('sowing', 'inRowSpacingUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'inrowspacing', model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('sowing', 'density', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('sowing', 'depth', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('sowing', 'depthUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'depthspacing', model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down: async () => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
