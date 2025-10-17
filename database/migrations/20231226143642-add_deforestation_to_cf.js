"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const sidebarMenu = [
      {
        id: "deforestation",
        name: "Deforestation",
        parent_menu_id: null,
        route_path_name: "Deforestation",
        icon: "/icons/bar.png",
        order: 10,
        organization: 8,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "deforestation_compliance_reports",
        name: "Deforestation Compliance Reports",
        parent_menu_id: "deforestation",
        route_path_name: "DeforestationComplianceReports",
        icon: "/icons/member-data.png",
        order: 1,
        organization: 8,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "compliance_certification",
        name: "Compliance Certification",
        parent_menu_id: "deforestation",
        route_path_name: "ComplianceCertification",
        icon: "/icons/member-data.png",
        order: 2,
        organization: 8,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    // const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const roles = await queryInterface.sequelize.query("SELECT * FROM roles WHERE role_type = :roleType", {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        replacements: { roleType: 'admin' },
      },  {transaction });



      //const roles = ["fedepanela_admin", "agronostros_admin","super_admin"]
      //const roles = ["fedepanela_admin", "agronostros_admin"];
      const permissions = ["get", "post", "put", "delete"];

      const adminUserRolesModules = [];
      const modules = [];
      const adminSidebarMenu = [];
      const mapSidebarModules = [];

      roles.map((role) => {
        sidebarMenu.forEach((item) => {
          modules.push({
            id: role.id + "_" + item.id,
            name: item.name,
            parent_module_id: role.id,
            id_name: role.id + "_" + item.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          adminSidebarMenu.push({
            id: role.id + "_" + item.id,
            role_id: role.id,
            sidebar_menu_id: item.id,
            sidebar_menu_name: item.name,
            active: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          mapSidebarModules.push({
            id: role.id + "_" + item.id,
            sidebar_menu_id: role.id + "_" + item.id,
            module_id: role.id + "_" + item.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          permissions.forEach((permission) => {
            adminUserRolesModules.push({
              id: role.id + "_" + item.id + "_" + permission,
              role_id: role.id,
              module_id: role.id + "_" + item.id,
              permission_id: permission,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          });
        });
      });

      await queryInterface.bulkInsert("modules", modules, { transaction });
      await queryInterface.bulkInsert("admin_sidebar_menu", adminSidebarMenu, { transaction });
      await queryInterface.bulkInsert("map_sidebar_modules", mapSidebarModules, { transaction });
      await queryInterface.bulkInsert(
        "admin_users_roles_modules_permissions",
        adminUserRolesModules,
        { transaction }
      );
      
      const organizations = await queryInterface.sequelize.query("SELECT * FROM organization", {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }, { transaction });
      const sidebars = []

      organizations.forEach(org => {
        sidebarMenu.forEach(sidebar => {
          const { organization, ...rest } = sidebar
          sidebars.push({
            organization: org.id,
            ...rest
          })
        })
      });

      await queryInterface.bulkInsert("sidebar_menu", sidebars, { transaction });
      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
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
