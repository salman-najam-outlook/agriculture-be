'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE ReportSettings MODIFY downloadingPreference ENUM("cellular data","with data","both", "wifi data");');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE ReportSettings MODIFY downloadingPreference ENUM("value1", "value2");');
  }
};
