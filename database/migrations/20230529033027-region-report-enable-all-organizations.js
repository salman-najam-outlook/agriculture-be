'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let sql = 'SELECT * FROM organization';
    const organizations = await queryInterface.sequelize.query(sql, { 
      type: Sequelize.QueryTypes.SELECT,
    });
    for (const org of organizations) {
      sql = 'SELECT * FROM sidebar_menu WHERE parent_menu_id = :parent_menu_id and id = :id and organization = :organization';
      const sidebar_menu = await queryInterface.sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { parent_menu_id: 'reports_parent', id: 'regions_reports', organization: org.id}
      });
      if(sidebar_menu && sidebar_menu.length > 0) {
        for( const menu of sidebar_menu) {
          const item = {...menu, active: 1}
          await queryInterface.bulkUpdate('sidebar_menu', item, {parent_menu_id: 'reports_parent', id: 'regions_reports', organization: org.id });
        }
      } else {
        const item = {
          id: 'regions_reports',
          name: 'Regions',
          parent_menu_id: 'reports_parent',
          route_path_name: 'regions',
          active: 1,
          order: 1,
          organization: org.id,
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        }
        await queryInterface.insert(null, 'sidebar_menu', item);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
