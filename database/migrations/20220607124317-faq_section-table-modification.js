'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('faq_sections', 'np', 'ne');
  },

  down: async (queryInterface, Sequelize) => {},
};
