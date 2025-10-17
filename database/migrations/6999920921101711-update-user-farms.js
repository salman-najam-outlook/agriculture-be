'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_farms', 'inviteLink', {
      type: Sequelize.STRING,
      allowNull: true
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_farms', 'inviteLink')
  }
};
