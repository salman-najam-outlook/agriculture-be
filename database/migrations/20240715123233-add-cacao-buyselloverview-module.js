"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const orgRoleSql = `
      SELECT
        o.id AS orgId,
        r.id AS adminRole
      FROM
        organization o
      JOIN roles r ON o.id = r.organization
      JOIN admin_user_roles aur ON aur.role_id = r.id
      JOIN parent_modules pm ON pm.id = r.id
      GROUP BY o.id, r.id;
    `;
      const [orgRoleResults] = await queryInterface.sequelize.query(
        orgRoleSql,
        { transaction }
      );
      const sidebarOrgSql = `
    SELECT DISTINCT organization
    FROM sidebar_menu
    WHERE parent_menu_id = 'cacao';
  `;
      const [sidebarOrgResults] = await queryInterface.sequelize.query(
        sidebarOrgSql,
        { transaction }
      );

      const sidebarOrganizations = sidebarOrgResults.map(
        (result) => result.organization
      );
      const roles = orgRoleResults.map((result) => result.adminRole);
      const newModules = roles.map((role) => {
        return {
          id: `${role}_cacao_buyselloverview`,
          name: "Buy Sell Overview",
          parent_module_id: `cacao`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      await queryInterface.bulkInsert("modules", newModules, {
        transaction,
        updateOnDuplicate: ["id", "parent_module_id"],
      });
      const permissions = ["put", "get", "post", "delete"];
      const userRolePermissions = [];
      for (const role of roles) {
        for (const permission of permissions) {
          userRolePermissions.push({
            id: `${role}_cacao_buyselloverview_${permission}`,
            role_id: role,
            module_id: `${role}_cacao_buyselloverview`,
            permission_id: permission,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
      await queryInterface.bulkInsert(
        "admin_users_roles_modules_permissions",
        userRolePermissions,
        {
          transaction,
          updateOnDuplicate: ["id", "role_id"],
        }
      );

      const sidebarMenuItems = sidebarOrganizations.map((org) => ({
        id: "cacao_buyselloverview",
        name: "Buy Sell Overview",
        parent_menu_id: "cacao",
        route_path_name: "BuySellOverview",
        icon: "/icons/logs.png",
        active: 1,
        order: 1,
        organization: org,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("sidebar_menu", sidebarMenuItems, {
        transaction,
        updateOnDuplicate: ["id", "parent_menu_id"],
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("error occured in catch*************", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const roles = ["super_admin", "solok_admin"];
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const conditions = roles.map((role) => ({
        module_id: `${role}_cacao_buyselloverview`,
      }));

      await queryInterface.bulkDelete(
        "admin_users_roles_modules_permissions",
        {
          [Sequelize.Op.or]: conditions,
        },
        { transaction }
      );

      await queryInterface.bulkDelete(
        "modules",
        {
          id: {
            [Sequelize.Op.in]: roles.map(
              (role) => `${role}_cacao_buyselloverview`
            ),
          },
        },
        { transaction }
      );

      await queryInterface.bulkDelete(
        "sidebar_menu",
        { id: "cacao_buyselloverview" },
        { transaction }
      );

      await transaction.commit();
      console.log("Transaction committed revert");
    } catch (error) {
      console.log("Error occurred in down:", error);
      await transaction.rollback();
      throw error;
    }
  },
};
