'use strict';
const moment = require("moment");
const { admin_roles, admin_sidebar_menu } = require("../../helpers/consts");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const adminSidebarData = [];
     admin_roles.forEach(ar => {
      admin_sidebar_menu.forEach(asm => {
        adminSidebarData.push({
          id: `${ar.id}_${asm.id}`,
          role_id: ar.id,
          sidebar_menu_id: asm.id,
          sidebar_menu_name: asm.name,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
      })
     })
  
      await queryInterface.bulkInsert("admin_sidebar_menu", adminSidebarData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("admin_sidebar_menu", null, {
      truncate: true,
      cascade: false,
    });
  }
};
