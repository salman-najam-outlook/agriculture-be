'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'otp_channel', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'otp'
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'otp_channel')
  }
};
