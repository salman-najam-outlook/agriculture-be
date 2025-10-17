#!/usr/bin/env node
const app = require("../app");
const db = require(rootPath + "/models");

async function main() {
  const parent_module = ['esg_parent']
  const modules = ['esg_dashboard','esg_suppliers']

  const roles = ['sub_enterprise']

  'sub_enterprise_esg_suppliers'

    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.insert(
        null,
        'parent_modules',
        {
          id: 'esg_parent',
          name: 'ESG Parent module',
          module_type: 'app_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );
    //   const adminRoles = []
    //   for(var i=0; i<user_roles.length; i++){
    //     adminRoles.push({
    //       id: user_roles[i],
    //       name: `DDS Roles ${user_roles[i]}`,
    //       role_type:'admin',
    //       organization:8,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     })
    //   }
    // await queryInterface.bulkInsert('roles', adminRoles, { transaction, });
    /** A modules */
     const adminModulesCol = []
    for (var i = 0; i< modules.length; i++){
      adminModulesCol.push({
          id: `${'sub_enterprise'}_${modules[i]}`,
          name: `DDS Module for solok admin ${modules[i]}`,
          parent_module_id: 'esg_parent',
          createdAt: new Date(),
          updatedAt: new Date(),
      })
      // adminModulesCol.push({
      //   id: `${user_roles[0]}_${operator_owner[i]}`,
      //   name: `DDS Module for operator owner admin ${operator_owner[i]}`,
      //   parent_module_id: 'dds_parent',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // })
    }
    // for (var i = 0; i< operator.length; i++){
    //   adminModulesCol.push({
    //       id: `${user_roles[1]}_${operator[i]}`,
    //       name: `DDS Module ${operator[i]}`,
    //       parent_module_id: 'dds_parent',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //   })
    // }
    // for (var i = 0; i< supplier_owner.length; i++){
    //   adminModulesCol.push({
    //       id: `${user_roles[2]}_${supplier_owner[i]}`,
    //       name: `DDS Module ${supplier_owner[i]}`,
    //       parent_module_id: 'dds_parent',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //   })
    // }
    // for (var i = 0; i< supplier.length; i++){
    //   adminModulesCol.push({
    //       id: `${user_roles[3]}_${supplier[i]}`,
    //       name: `DDS Module ${supplier[i]}`,
    //       parent_module_id: 'dds_parent',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //   })
    // }
    await queryInterface.bulkInsert('modules', adminModulesCol, { transaction, });
    const permissions = await queryInterface.select(null, 'permissions', { transaction });
    const userRolePermission = [];
      for (const permission of permissions) {
        //operator owner
        for(const module of modules) {
            userRolePermission.push({
              id: `sub_enterprise_${module}_${permission.id}`,
              role_id: 'sub_enterprise',
              module_id: `sub_enterprise_${module}`,
              permission_id: permission.id,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
         }
        //     for(const opert of operator_owner) {
        //     userRolePermission.push({
        //       id: `operator_owner_${opert}_${permission.id}`,
        //       role_id: 'operator_owner',
        //       module_id: `operator_owner_${opert}`,
        //       permission_id: permission.id,
        //       permitted: 1,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     })
        // }
        //   for(const oper of operator) {
        //     userRolePermission.push({
        //       id: `operator_${oper}_${permission.id}`,
        //       role_id: 'operator',
        //       module_id: `operator_${oper}`,
        //       permission_id: permission.id,
        //       permitted: 1,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     })
        // }
        // for(const sup of supplier_owner) {
        //     userRolePermission.push({
        //       id: `supplier_owner_${sup}_${permission.id}`,
        //       role_id: 'supplier_owner',
        //       module_id: `supplier_owner_${sup}`,
        //       permission_id: permission.id,
        //       permitted: 1,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     })
        //   }
        //   for(const supr of supplier) {
        //     userRolePermission.push({
        //       id: `supplier_${supr}_${permission.id}`,
        //       role_id: 'supplier',
        //       module_id: `supplier_${supr}`,
        //       permission_id: permission.id,
        //       permitted: 1,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     })
        //   }
      }
      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermission, {
        transaction,
      });
    const sidebarItems = [
      {
        id: "esg_platform",
        name: "ESG Platform",
        parent_menu_id: null,
        route_path_name: "esg_platform",
        order: 16,
        icon:'/icons/dashboard.png',
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "esg_dashboard",
        name: "ESG Dashboard",
        parent_menu_id: 'esg_platform',
        route_path_name: "esgAccountDashboard",
        order: 1,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "esg_suppliers",
        name: "Suppliers",
        parent_menu_id: 'esg_platform',
        route_path_name: "esgSuppliers",
        order: 1,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
      transaction,
    });
    console.log("Printed")
     await transaction.commit();
    }catch(err){
      console.log("err", "print")
      await transaction.rollback();
    }
  process.exit();
}

async function only_esg_sidebar_insert(){
  const queryInterface = db.sequelize.getQueryInterface()
  const transaction = await queryInterface.sequelize.transaction();
  try {
    // First, clean up any existing ESG platform items to prevent duplicates
    console.log("Cleaning up existing ESG platform menu items...");
    await queryInterface.sequelize.query(
      'DELETE FROM sidebar_menu WHERE parent_menu_id = ?',
      {
        replacements: ['esg_platform'],
        transaction
      }
    );
    
    const sidebarItems = [
      {
        id: "esg_dashboard",
        name: "ESG Dashboard",
        parent_menu_id: 'esg_platform',
        route_path_name: "esgAccountDashboard",
        order: 1,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "esg_my_products",
        name: "My Products",
        parent_menu_id: 'esg_platform',
        route_path_name: "esgMyProducts",
        order: 2,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "esg_my_protocol",
        name: "My Sustainability Guide",
        parent_menu_id: 'esg_platform',
        route_path_name: "MyProtocols",
        order: 3,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "esg_reports_builder",
        name: "ESG Report Builder",
        parent_menu_id: 'esg_platform',
        route_path_name: "esgReportsBuilder",
        order: 4,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "esg_sdg_goal_icons",
        name: "SDG Goal Icons",
        parent_menu_id: 'esg_platform',
        route_path_name: "sgdGoalIcons",
        order: 5,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
      transaction,
    });
    console.log("Printed")
     await transaction.commit();
  } catch(err){
    console.log("err", "print")
    await transaction.rollback();
  }
  process.exit();
}

async function insert_client_admin_role(){
  const queryInterface = db.sequelize.getQueryInterface()
  const transaction = await queryInterface.sequelize.transaction();
  try {
    const user_roles = ['esg_client_admin'];
    const adminRoles = []
      for(var i=0; i<user_roles.length; i++){
        adminRoles.push({
          id: user_roles[i],
          name: `DDS Esg Client ${user_roles[i]}`,
          role_type:'admin',
          organization:3,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    await queryInterface.bulkInsert('roles', adminRoles, { transaction, });
    await transaction.commit()
    console.log("OK fine")
  }catch(err){
    await transaction.rollback()
    console.log(err)
  }
   
}

// main()
// only_esg_sidebar_insert()
