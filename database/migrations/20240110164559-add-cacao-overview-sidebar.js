"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const menuItems = [
      {
        active: 1,
        icon: "/icons/logs.png",
        id: "cacao",
        name: "Cacao Overview",
        order: 3,
        route: "cacao",
        subMenus: [
          {
            icon: "/icons/users.png",
            id: "cacao_plantation",
            label: "cacao_plantation",
            name: "Plantations",
            order: 1,
            parent_menu_id: "cacao",
            route: "CacaoPlantation",
          },
          {
            icon: "/icons/users.png",
            id: "cacao-data",
            label: "cacao-data",
            name: "Cacao Data",
            order: 1,
            parent_menu_id: "cacao",
            route: "cacaoData",
          },
          {
            icon: "/icons/users.png",
            id: "dry-cacao",
            label: "dry-cacao",
            name: "Dry Cacao",
            order: 1,
            parent_menu_id: "cacao",
            route: "dryCacao",
          },
          {
            icon: "/icons/users.png",
            id: "traceability",
            label: "traceability",
            name: "Traceability",
            order: 1,
            parent_menu_id: "traceability",
            route: "traceability",
          },
        ],
      },
    ];

    let sql = `select
      o.id as orgId,
      r.id as adminRole
    from
      organization o
    join roles r on
      o.id = r.organization
    join admin_user_roles aur on
      aur.role_id = r.id
    join parent_modules pm on
      pm.id = r.id
    group by
      o.id;`;

    try {
      const orgRoleList = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
      });

      for (const data of orgRoleList) {
        let sidebarMenuInputArr = [],
          adminUserRolePerm = [],
          moduleArr = [],
          promiseArr = [],
          methodsArr = ["put", "get", "post", "delete"];

        let { orgId, adminRole } = data;

        adminRole = adminRole.split(" ").join("_").toLowerCase();

        menuItems.forEach((menu) => {
          //parent menu data entry
          sidebarMenuInputArr.push({
            id: menu?.id,
            name: menu?.name,
            parent_menu_id: null,
            route_path_name: menu?.route,
            icon: null,
            active: 1,
            order: menu?.order,
            icon: menu?.icon,
            organization: orgId,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          moduleArr.push({
            id: `${adminRole}_${menu?.id}`,
            name: menu?.name,
            parent_module_id: adminRole,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          methodsArr.forEach((perm) => {
            adminUserRolePerm.push({
              id: `${adminRole}_${menu?.id}_${perm}`,
              role_id: adminRole,
              module_id: `${adminRole}_${menu?.id}`,
              permission_id: perm,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          });

          //sub menu data entry
          menu?.subMenus?.forEach((subMenu) => {
            moduleArr.push({
              id: `${adminRole}_${subMenu?.id}`,
              name: subMenu?.name,
              parent_module_id: adminRole,
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            methodsArr.forEach((perm) => {
              adminUserRolePerm.push({
                id: `${adminRole}_${subMenu?.id}_${perm}`,
                role_id: adminRole,
                module_id: `${adminRole}_${subMenu?.id}`,
                permission_id: perm,
                permitted: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            });

            sidebarMenuInputArr.push({
              id: subMenu?.id,
              name: subMenu?.name,
              parent_menu_id: menu?.id,
              route_path_name: subMenu?.route,
              icon: null,
              active: 1,
              order: subMenu?.order,
              icon: subMenu?.icon,
              organization: orgId,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          });
        });

        await queryInterface.bulkInsert("modules", moduleArr, {
          transaction,
          updateOnDuplicate: ["id", "parent_module_id"],
        });

        await queryInterface.bulkInsert("sidebar_menu", sidebarMenuInputArr, {
          transaction,
          updateOnDuplicate: ["id", "organization"],
        });

        await queryInterface.bulkInsert(
          "admin_users_roles_modules_permissions",
          adminUserRolePerm,
          {
            transaction,
            updateOnDuplicate: ["id", "role_id"],
          }
        );
      }
    } catch (err) {
      await transaction.rollback();
      console.log("error occured in catch*************", err.message);
    } finally {
      await transaction.commit();
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
