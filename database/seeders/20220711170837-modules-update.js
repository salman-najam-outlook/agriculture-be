'use strict'
const { QueryTypes } = require('sequelize')
module.exports = {
  async up (queryInterface, Sequelize) {
    const sidebarMenu = [
      {
        id: 'plantations',
        name: 'Plantations',
        parent_menu_id: 'crops_overview',
        route_path_name: 'Plantations',
        icon: '/icons/users.png',
        order: 1,
        organization: 1
      },
      {
        id: 'coffee_data',
        name: 'Coffee Data',
        parent_menu_id: 'crops_overview',
        route_path_name: 'CoffeeData',
        icon: '/icons/users.png',
        order: 2,
        organization: 1
      },
      {
        id: 'reports',
        name: 'Reports',
        parent_menu_id: 'crops_overview',
        route_path_name: 'Reports',
        icon: '/icons/users.png',
        order: 3,
        organization: 1
      },
      {
        id: 'survey_builder',
        name: 'Survey Builder',
        parent_menu_id: null,
        route_path_name: 'SurveyBuilder',
        icon: '/icons/usersettings.png',
        order: 11,
        organization: 1
      },
      {
        id: 'role_requests',
        name: 'Role Requests',
        parent_menu_id: null,
        route_path_name: 'RoleRequests',
        icon: '/icons/usersettings.png',
        order: 12,
        organization: 1
      },
      {
        id: 'payments',
        name: 'Payments',
        parent_menu_id: null,
        route_path_name: 'Payments',
        icon: '/icons/usersettings.png',
        order: 12,
        organization: 1
      }
    ]
    const roles = ['community_admin', 'super_admin', 'manager', 'content_manager']
    const modules = []
    roles.map(role => {
      sidebarMenu.forEach(item => {
        modules.push({
          id: role + '_' + item.id,
          name: item.name,
          parent_module_id: role,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
    })
    await queryInterface.bulkInsert('modules', modules)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null)
  }
}
