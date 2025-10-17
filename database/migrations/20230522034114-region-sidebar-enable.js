'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const inputData = [
      {
        id: 'regions_reports',
        name: 'Regions',
      },
      {
        id: 'crops_reports',
        name: 'Crops',
      },
      {
        id: 'equipment_reports',
        name: 'Equipment',
      },
      {
        id: 'farmers_reports',
        name: 'Farmers',
      },
      {
        id: 'farms_reports',
        name: 'Farms',
      },
      {
        id: 'goals_achieved_reports',
        name: 'Goals Achieved',
      },
      {
        id: 'pesticides_reports',
        name: 'Pesticides',
      },
      {
        id: 'pests_reports',
        name: 'Pests',
      },
      {
        id: 'report_dashboard',
        name: 'Report Dashboard',
      },
    ];
    let sql = 'SELECT * FROM parent_modules WHERE module_type = :moduleType AND id IN (SELECT id FROM roles)';
    const parent_modules = await queryInterface.sequelize.query(sql, { 
      type: Sequelize.QueryTypes.SELECT,
      replacements: { moduleType: 'admin'}
    });

    if(parent_modules) {
      for (const role of parent_modules) {
        for (const newModuleData of inputData) {
          const id = `${role.id}_${newModuleData.id}`
          sql = 'SELECT * FROM modules WHERE id = :id';
          const modules = await queryInterface.sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { id: id}
          });
          if(modules && modules.length > 0) {
            continue;
          }
          const newData = {
            id: id,
            name: newModuleData.name,
            parent_module_id: role.id,
            createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          };
          console.log(JSON.stringify(newData))
          await queryInterface.insert(null, 'modules', newData);
        }
      }

      for (const role of parent_modules) {
        for (const newModuleData of inputData) {
          const httpVerbs = ['get', 'post', 'put', 'delete'];
          for ( const verb of httpVerbs) {
            const id = `${role.id}_${newModuleData.id}_${verb}`;
            const module_id = `${role.id}_${newModuleData.id}`;
            sql = 'SELECT * FROM admin_users_roles_modules_permissions WHERE role_id = :role_id AND module_id = :module_id AND permission_id =:permission_id';
            const result = await queryInterface.sequelize.query(sql, {
              type: Sequelize.QueryTypes.SELECT,
              replacements: { role_id: role.id, module_id: module_id, permission_id: verb}
            });
            if(result && result.length > 0) {
              continue;
            }
            const newData = {
              id: id,
              role_id: role.id,
              module_id: module_id,
              permission_id: verb,
              permitted: 1,
              createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
              updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            };
            console.log(JSON.stringify(newData))
            await queryInterface.insert(null, 'admin_users_roles_modules_permissions', newData);
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
