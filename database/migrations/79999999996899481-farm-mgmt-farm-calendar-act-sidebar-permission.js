'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
   try {

    // 1: modules insert

    await queryInterface.bulkInsert('modules', [
      {
        id: `dimitra_internal_farm_activities_calendar`,
        name: `Farm Activities Calendar`,
        parent_module_id: 'my_farm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { transaction, });

    const permissions = await queryInterface.select(null, 'permissions', { transaction });
    const userRolePermission = [];

    for (const permission of permissions) {
          userRolePermission.push({
            id: `dimitra_internal_farm_activities_calendar_${permission.id}`,
            role_id: 'dimitra_internal',
            module_id: `dimitra_internal_farm_activities_calendar`,
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          })

    }

    // 2: admin_users_roles_modules_permissions insert

    await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermission, {
      transaction,
    });

    const sidebarItems = [
      {
        id: "farm_activities_calendar",
        name: "Farm Activities",
        parent_menu_id: "farm_management",
        route_path_name: "FarmCalenderActivities",
        order: 3,
        icon:null,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
      transaction,
    });
    await transaction.commit();
   } catch (error) {
    console.log("err", "print")
      await transaction.rollback();
   }
  },

  down: async (queryInterface, Sequelize) => {

  }
};
