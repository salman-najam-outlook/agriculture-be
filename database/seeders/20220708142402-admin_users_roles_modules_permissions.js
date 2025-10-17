'use strict'

const { QueryTypes } = require('sequelize')
module.exports = {
  async up (queryInterface, Sequelize) {
    let adminRoles =  await queryInterface.sequelize.query('select id from roles where role_type = ?', { 
      replacements: ['admin'],
      type: QueryTypes.SELECT
    })
    const modules = await queryInterface.sequelize.query('select id from modules where parent_module_id = ?', { 
      replacements: ['super_admin'],
      type: QueryTypes.SELECT
    })    
    let data = []
    adminRoles.forEach(async role => {  
      modules.forEach(module => {
        module.id = module.id.replace('super_admin', '')
        const permissions = ['get', 'post', 'put', 'delete']
        for (let i = 0; i < permissions.length; i++) {
          data.push({
            id: role.id + module.id + '_' + permissions[i],
            role_id: role.id,
            module_id: role.id + module.id,
            permission_id: permissions[i],
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      })
    })
    console.log(data)
    await queryInterface.bulkInsert('admin_users_roles_modules_permissions', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin_users_roles_modules_permissions', null)
  }
}
