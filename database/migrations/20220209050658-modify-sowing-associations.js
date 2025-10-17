'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sowing', 'area', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('sowing', 'areaUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'areaunit', model: 'units', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('sowing', 'cropId');
    await queryInterface.addColumn('sowing', 'cropId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { as: 'crop', model: 'options', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('sowing', 'cropVariety');
    await queryInterface.addColumn('sowing', 'days', {
      allowNull: true,
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('sowing', 'area');
    await queryInterface.removeColumn('sowing', 'areaUnitId');
  }
};
