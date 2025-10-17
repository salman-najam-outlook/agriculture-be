'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('irrigation', 'cropId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'options',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('irrigation', 'cropId');
  },
};
