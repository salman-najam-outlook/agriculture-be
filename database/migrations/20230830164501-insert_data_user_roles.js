'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_role", [
      {
        id: "cacao_farmer",
        name: 'Cacao Farmer',
        created_by: 22
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
