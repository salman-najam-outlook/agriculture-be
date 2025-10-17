'use strict';
const moment = require('moment');
const { admin_roles } = require('../../helpers/consts');
const admin_sidebar_menu = [
  { id: 'membership', name: 'Membership' },
  { id: 'activation', name: 'Activation' },
  { id: 'faq', name: 'FAQ' },
  { id: 'tickets', name: 'Tickets' },
  { id: 'admin_roles', name: 'Admin Roles' },
  { id: 'dashboard', name: 'Dashboard' },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminSidebarData = [];
    const newModules = [];
    admin_roles.forEach(({ id: adminRoleId }) => {
      admin_sidebar_menu.forEach(
        ({ id: sidebar_menu_id, name: sidebar_menu_name }) => {
          adminSidebarData.push({
            id: `${adminRoleId}_${sidebar_menu_id}`,
            role_id: adminRoleId,
            sidebar_menu_id,
            sidebar_menu_name,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
          newModules.push({
            id: `${adminRoleId}_${sidebar_menu_id}`,
            name: sidebar_menu_name,
            parent_module_id: adminRoleId,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
        }
      );
    });

    await queryInterface.bulkInsert('modules', newModules, {});
    await queryInterface.bulkInsert('admin_sidebar_menu', adminSidebarData, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
