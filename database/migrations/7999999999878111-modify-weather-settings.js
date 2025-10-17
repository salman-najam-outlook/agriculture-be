'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_weather_settings', 'stateId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('user_weather_settings', 'countryId', {
      type: Sequelize.STRING,
      allowNull: true,

    });

  },
  down: async (queryInterface, Sequelize) => {

  },
};
