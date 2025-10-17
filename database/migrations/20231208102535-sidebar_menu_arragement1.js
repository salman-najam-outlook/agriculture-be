'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    //const organization = 8
    try {
      let organizations = await queryInterface.sequelize.query(
        "select distinct organization from sidebar_menu;",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      for (let org of organizations) {
        let organization = org.organization
        let parentMenus = [
          {
            id: 'parent_dashboard',
            name: 'Dashboard',
            parent_menu_id: null,
            route_path_name: 'ReportsParents',
            icon: '/icons/dashboard.png',
            active: 1,
            order: 1,
            organization: organization,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'user_management',
            name: 'User Management',
            parent_menu_id: null,
            route_path_name: 'Users',
            icon: '/icons/users.png',
            active: 1,
            order: 4,
            organization: organization,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
        const alreadyhaveMenus = await queryInterface.select(null, 'sidebar_menu', {
          where: {
            id: {
              [Sequelize.Op.in]: ['parent_dashboard', 'user_management']
            },
            organization: organization
          },
        }, { transaction: transaction })
        let filteredParentMenus
        if (alreadyhaveMenus.length) {
          filteredParentMenus = parentMenus.filter(menu => {
            const foundMenu = alreadyhaveMenus.find(existingMenu => existingMenu.id === menu.id);
            return !foundMenu;
          });
        } else {
          filteredParentMenus = parentMenus
        }
        if (filteredParentMenus.length) {
          await queryInterface.bulkInsert('sidebar_menu', filteredParentMenus, { transaction })
        }
        const sqlStatements = [
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 2, `name` = 'User Dashboard', icon = null WHERE id = 'dashboard' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 1 WHERE id = 'report_dashboard' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 3 WHERE id = 'farms_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 4 WHERE id = 'farmers_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 5 WHERE id = 'crops_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 6 WHERE id = 'pests_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 7 WHERE id = 'regions_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 8 WHERE id = 'equipment_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'parent_dashboard', `order` = 9 WHERE id = 'goals_achieved_reports' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `name` = 'Coffee Overview', `order` = 2 WHERE id = 'crops_overview' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'user_management', `order` = 1 WHERE id = 'users/userList' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'user_management', `order` = 2 WHERE id = 'membership' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'user_management', `order` = 3 WHERE id = 'permissions' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET parent_menu_id = 'user_management', `order` = 4 WHERE id = 'activation' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 5 WHERE id = 'faq' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 6 WHERE id = 'tickets' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 7 WHERE id = 'role_requests' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 8 WHERE id = 'activity_log' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 9 WHERE id = 'users/profiles' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 12 WHERE (`id` = 'reports_parent') and (`organization` = " + organization + ");",
          "UPDATE sidebar_menu SET `order` = 11 WHERE (`id` = 'admin_roles') and (`organization` = " + organization + ");",
          "UPDATE sidebar_menu SET `active` = 0 WHERE (`id` = 'reports_parent') and (`organization` = " + organization + ");"
        ];
        for (let qr of sqlStatements) {
          await queryInterface.sequelize.query(qr, { transaction })
        }
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback()
      console.error(err);
      throw err
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
