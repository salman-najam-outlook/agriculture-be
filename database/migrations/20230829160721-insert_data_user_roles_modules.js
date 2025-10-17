'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_role_modules", [
      {
        id: "farmer_nutrientmanagement",
        user_role_id: 'farmer',
        module_id: "nutrientmanagement"
      },
      {
        id: "farmer_pestmanagement",
        user_role_id: 'farmer',
        module_id: "pestmanagement"
      },
      {
        id: "farmer_diseasemanagement",
        user_role_id: 'farmer',
        module_id: "diseasemanagement"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
