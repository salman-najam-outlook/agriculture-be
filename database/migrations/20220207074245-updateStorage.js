'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('crop_storage', 'cropId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'options',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('crop_storage', 'cropId');
  },
};
