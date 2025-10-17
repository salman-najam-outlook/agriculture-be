'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_events', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_events', 'deletedAt')
  }
};
