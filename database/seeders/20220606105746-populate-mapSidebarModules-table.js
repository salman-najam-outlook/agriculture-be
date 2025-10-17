'use strict';
const moment = require('moment');
let { admin_roles } = require('../../helpers/consts');
const admin_sidebar_menu = [
  'membership',
  'activation',
  'faq',
  'tickets',
  'admin_roles',
  'dashboard',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let sidebarModulesData = [];

    admin_roles
      .map(({ id }) => id)
      .forEach((adminRole) => {
        admin_sidebar_menu.forEach((moduleCode) => {
          let id = `${adminRole}_${moduleCode}_${moduleCode}`;
          let sidebar_menu_id = `${adminRole}_${moduleCode}`;
          let module_id = `${adminRole}_${moduleCode}`;
          sidebarModulesData.push({
            id,
            sidebar_menu_id,
            module_id,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
        });
      });

    await queryInterface.bulkInsert(
      'map_sidebar_modules',
      sidebarModulesData,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
