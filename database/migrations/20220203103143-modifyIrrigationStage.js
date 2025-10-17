'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('irrigation_stage', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    });
    await queryInterface.removeConstraint('irrigation_stage', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('irrigation_stage', 'userId');
  },
};
