'use strict'
const { QueryTypes } = require('sequelize')
module.exports = {
  async up (queryInterface, Sequelize) {
    const sidebarMenu = [
      {
        id: 'activation',
        name: 'Activation Keys',
        parent_menu_id: null,
        route_path_name: 'ActivationKey',
        icon: '/icons/activationKey.png',
        order: 7,
        organization: 1
      },
      {
        id: 'activity_log',
        name: 'Activity Logs',
        parent_menu_id: null,
        route_path_name: 'ActivityLogs',
        icon: '/icons/logs.png',
        order: 6,
        organization: 1
      },
      {
        id: 'admin_roles',
        name: 'Admin Roles',
        parent_menu_id: null,
        route_path_name: 'AdminRoles',
        icon: '/icons/roles.png',
        order: 3,
        organization: 1
      },
      {
        id: 'dashboard',
        name: 'Dashboard',
        parent_menu_id: null,
        route_path_name: 'Dashboard',
        icon: '/icons/dashboard.png',
        order: 1,
        organization: 1
      },
      {
        id: 'faq',
        name: 'FAQ',
        parent_menu_id: null,
        route_path_name: 'Faq',
        icon: '/icons/faq.png',
        order: 8,
        organization: 1
      },
      {
        id: 'membership',
        name: 'Membership Plan',
        parent_menu_id: null,
        route_path_name: 'MembershipTypes',
        icon: '/icons/membership.png',
        order: 4,
        organization: 1
      },
      {
        id: 'permissions',
        name: 'Permissions',
        parent_menu_id: null,
        route_path_name: 'AdminPermissions',
        icon: '/icons/permissions.png',
        order: 5,
        organization: 1
      },
      {
        id: 'tickets',
        name: 'Tickets',
        parent_menu_id: null,
        route_path_name: 'Tickets',
        icon: '/icons/tickets.png',
        order: 9,
        organization: 1
      },
      {
        id: 'users/userList',
        name: 'Users',
        parent_menu_id: null,
        route_path_name: 'Users',
        icon: '/icons/users.png',
        order: 2,
        organization: 1
      },
      {
        id: 'crops_overview',
        name: 'Crops Overview',
        parent_menu_id: null,
        route_path_name: 'CropsOverview',
        icon: '/icons/users.png',
        order: 10,
        organization: 1
      },
      {
        id: 'plantations',
        name: 'Plantations',
        parent_menu_id: 'crops_overview',
        route_path_name: 'Plantation',
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
      },
      {
        id: 'users/profiles',
        name: 'Settings',
        parent_menu_id: null,
        route_path_name: 'ProfileAuthSet',
        icon: '/icons/usersettings.png',
        order: 13,
        organization: 1
      },
    ]
    await queryInterface.bulkInsert('sidebar_menu', sidebarMenu)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sidebar_menu', null)
  }
}
