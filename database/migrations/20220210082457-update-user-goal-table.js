'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_goals', 'harvestingDate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_goals', 'expectedYield', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.removeColumn('user_goals', 'cropId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_goals', 'harvestingDate');
    await queryInterface.removeColumn('user_goals', 'expectedYield');
    await queryInterface.addColumn('user_goals', 'cropId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
