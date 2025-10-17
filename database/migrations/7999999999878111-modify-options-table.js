'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE options
      SET groupName = 'soil-organic-input'
      WHERE name  = 'Lime';`, {
        type: queryInterface.sequelize.QueryTypes.UPDATE
    });

  },
  down: async (queryInterface, Sequelize) => {

  },
};
