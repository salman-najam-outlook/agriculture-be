'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'isFirstLogin', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'isFirstLogin')
  }
};
