'use strict'
const { QueryTypes } = require('sequelize')
module.exports = {
  async up (queryInterface, Sequelize) {
    let adminUsers =  await queryInterface.sequelize.query('select * from user_roles where role_id <> ?', { 
      replacements: ['end_user'],
      type: QueryTypes.SELECT
    })
    await queryInterface.bulkInsert('admin_user_roles', adminUsers)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin_user_roles', null)
  }
}
