'use strict';

const user_roles = [
  {id: "farmer", name: "Farmer" },
  {id: "buying_station", name: "Buying Station" },
  {id: "dry_milling", name: "Dry Milling" }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    let insertArr = []
    insertArr = user_roles.map(role => {
      return {
        id: role.id,
        name: role.name,
        created_by: "22" // super admin user id
      }
    })
    await queryInterface.bulkInsert("user_role", insertArr, {});
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
