'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('weed', 'area_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('weed', 'area_unit_id');
  }
};
