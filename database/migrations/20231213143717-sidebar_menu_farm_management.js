"use strict";
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.bulkDelete('sidebar_menu', {
      id: "farmers"
    }),
    queryInterface.bulkDelete('sidebar_menu', {
      id: "farms"
    })
    queryInterface.bulkDelete('sidebar_menu', {
      id: "farm_management"
    })

    const inputData = [
      {
        id: "farm_management",
        name: "Farm Management",
      }, 
      {
        id: "farms",
        name: "Famrs",
      },
      {
        id: "farmers",
        name: "Farmers",
      }
    ]

    const transaction = await queryInterface.sequelize.transaction();
    try {
      let organizations = await queryInterface.sequelize.query(
        "select distinct organization from sidebar_menu;",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      const permissions = ["get", "post", "put", "delete"];

      let sql = "SELECT * FROM parent_modules WHERE module_type = :moduleType";
      let roleSql = 'SELECT * FROM roles WHERE role_type = :roleType';
      const parent_modules = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { moduleType: "admin" },
      });

      const roles = await queryInterface.sequelize.query(roleSql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { roleType: 'admin'}
      });

      for (let org of organizations) {
        let organization = org.organization;
        let parentMenus = [
          {
            id: "farm_management",
            name: "Farm Management",
            parent_menu_id: null,
            route_path_name: "farms",
            icon: "/icons/users.png",
            active: 1,
            order: 5,
            organization: organization,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "farms",
            name: "Farms",
            parent_menu_id: "farm_management",
            route_path_name: "Farms",
            icon: null,
            active: 1,
            order: 1,
            organization: organization,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "farmers",
            name: "Farmers",
            parent_menu_id: "farm_management",
            route_path_name: "Farmers",
            icon: null,
            active: 1,
            order: 2,
            organization: organization,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        await queryInterface.bulkInsert("sidebar_menu", parentMenus);
      }

      if(roles) {
        for (const role of roles) {
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
            await queryInterface.insert(null, 'modules', newData);
          }
        }

        for (const role of roles) {
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
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.a
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
