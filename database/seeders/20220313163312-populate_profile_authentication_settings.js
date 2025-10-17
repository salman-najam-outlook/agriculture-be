'use strict';
const moment = require("moment");
const { profile_authentication_settings } = require("../../helpers/consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let settings = []

    settings.push({
      ...profile_authentication_settings,
      password_acceptable_characters: JSON.stringify(profile_authentication_settings.password_acceptable_characters),
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    })

    await queryInterface.bulkInsert("profile_authentication_settings", settings, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
