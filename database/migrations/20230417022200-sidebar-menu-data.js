'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const inputData = [
      {
        id: 'crops_reports',
        name: 'Crops',
        routePath: 'CropsReports'
      },
      {
        id: 'equipment_reports',
        name: 'Equipment',
        routePath: 'EquipmentReports'
      },
      {
        id: 'farmers_reports',
        name: 'Farmers',
        routePath: 'FarmersReports'
      },
      {
        id: 'farms_reports',
        name: 'Farms',
        routePath: 'FarmsReports'
      },
      {
        id: 'goals_achieved_reports',
        name: 'Goals Achieved',
        routePath: 'GoalsAchievedReports'
      },
      {
        id: 'pesticides_reports',
        name: 'Pesticides',
        routePath: 'PesticidesReports'
      },
      {
        id: 'pests_reports',
        name: 'Pests',
        routePath: 'PestsReports'
      },
      {
        id: 'report_dashboard',
        name: 'Report Dashboard',
        routePath: 'dashboard-reports'
      },
    ];
    
    let sql = 'SELECT * FROM organization';
    const organizations = await queryInterface.sequelize.query(sql, { 
      type: Sequelize.QueryTypes.SELECT
    });
    if(organizations) {
      for(const org of organizations) {
        console.log(org.name);
        sql = 'SELECT * FROM sidebar_menu WHERE parent_menu_id IS NULL AND organization = :org AND id = :id';
        const parentMenu = await queryInterface.sequelize.query(sql, { 
          type: Sequelize.QueryTypes.SELECT,
          replacements: { org: org.id, id: 'reports_parent'}
        });
        if(!(parentMenu && parentMenu.length > 0)) {
          const data = {
            id: 'reports_parent',
            name: 'Reports',
            parent_menu_id: null,
            route_path_name: 'ReportsParents',
            icon: '/icons/bar.png',
            active: 1,
            order: null,
            organization: org.id,
            createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          }
          await queryInterface.insert(null, 'sidebar_menu', data);
        }
        let order = 1;
        for(const module of inputData) {
          sql = 'SELECT * FROM sidebar_menu WHERE parent_menu_id = :parent_menu_id AND organization = :org AND id = :id';
          const subMenu = await queryInterface.sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { parent_menu_id: 'reports_parent', org: org.id, id: module.id}
          });
          if(!(subMenu && subMenu.length > 0)) {
            const data = {
              id: module.id,
              name: module.name,
              parent_menu_id: 'reports_parent',
              route_path_name: module.routePath,
              icon: null,
              active: 1,
              order: order++,
              organization: org.id,
              createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
              updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            }
            await queryInterface.insert(null, 'sidebar_menu', data);
          }
        }
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
