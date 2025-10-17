'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('soil_prep_practice', 'area', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('soil_prep_practice', 'areaUnitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { as: 'areaunit', model: 'units', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('soil_prep_practice', 'cropId');
    await queryInterface.addColumn('soil_prep_practice', 'cropId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { as: 'crop', model: 'options', key: 'id' },
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn('soil_prep_practice', 'cropVariety');
    await queryInterface.addColumn('soil_prep_practice', 'days', {
      allowNull: true,
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('soil_prep_practice', 'area');
    await queryInterface.removeColumn('soil_prep_practice', 'areaUnitId');
    await queryInterface.removeColumn('soil_prep_practice', 'days');
  }
};
