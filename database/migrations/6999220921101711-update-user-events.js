'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_events', 'dateForAlert', {
      type: Sequelize.DATE,
      allowNull: true
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_events', 'dateForAlert')
  }
};
