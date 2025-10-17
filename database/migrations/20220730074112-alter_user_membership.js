'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_membership', 'user_role_id')
  },
  down: async (queryInterface, Sequelize) => {
  }
};
