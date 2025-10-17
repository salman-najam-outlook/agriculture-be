#!/usr/bin/env node
const app = require("../app");
const db = require(rootPath + "/models");

async function main() {
    const parent_module = ['dds_parent']
    const modules = [
        'dds_dashboard',
        'dds_due_deligence_report',
        'dds_manage_farm',
        'dds_dispute_resolution',
        'dds_suppliers',
        'dds_assessment_builder',
        'dds_settings',
        'dds_due_deligence_guide',

        //suppliers
        'dds_my_farm',
        'dds_producers',

        'dds_operators',
        'dds_shipments'
    ]

    const operator_owner = ['dds_dashboard', 'dds_due_deligence_report',
         'dds_manage_farm', 'dds_dispute_resolution', 'dds_suppliers','dds_shipments',
         'dds_assessment_builder','dds_settings','dds_due_deligence_guide']

    const operator = ['dds_dashboard', 'dds_due_deligence_report', 'dds_settings']

    const supplier_owner = ['dds_dashboard', 'dds_due_deligence_report', 
      'dds_manage_farm', 'dds_dispute_resolution','dds_operators', 'dds_producers', 'dds_shipments',
      'dds_assessment_builder','dds_settings', 'dds_due_deligence_guide']

    const supplier = ['dds_dashboard', 'dds_due_deligence_report', 'dds_my_farm','dds_producers']

    const user_roles = ['operator_owner','operator','supplier_owner','supplier']

    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();  
    try {
      // await queryInterface.insert(
      //   null,
      //   'parent_modules',
      //   {
      //     id: 'dds_parent',
      //     name: 'DDS Parent module',
      //     module_type: 'app_user',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   { transaction }
      // );

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
    // for (var i = 0; i< operator_owner.length; i++){
    //   adminModulesCol.push({
    //       id: `solok_admin_${operator_owner[i]}`,
    //       name: `DDS Module for solok admin ${operator_owner[i]}`,
    //       parent_module_id: 'dds_parent',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //   })
    //   adminModulesCol.push({
    //     id: `${user_roles[0]}_${operator_owner[i]}`,
    //     name: `DDS Module for operator owner admin ${operator_owner[i]}`,
    //     parent_module_id: 'dds_parent',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })
    // }

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

    for (var i = 0; i< supplier_owner.length; i++){
      adminModulesCol.push({
          id: `super_admin_${supplier_owner[i]}`,
          name: `DDS Module ${supplier_owner[i]}`,
          parent_module_id: 'dds_parent',
          createdAt: new Date(),
          updatedAt: new Date(),
      })
    }

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
        // for(const operator_own of operator_owner) {
        //     userRolePermission.push({
        //       id: `solok_admin_${operator_own}_${permission.id}`,
        //       role_id: 'solok_admin',
        //       module_id: `solok_admin_${operator_own}`,
        //       permission_id: permission.id,
        //       permitted: 1,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     })
        //  }

        // for(const opert of operator_owner) {
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

          for(const sup of supplier_owner) {
            userRolePermission.push({
              id: `super_admin_${sup}_${permission.id}`,
              role_id: 'super_admin',
              module_id: `super_admin_${sup}`,
              permission_id: permission.id,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }

          // for(const supr of supplier) {
          //   userRolePermission.push({
          //     id: `supplier_${supr}_${permission.id}`,
          //     role_id: 'supplier',
          //     module_id: `supplier_${supr}`,
          //     permission_id: permission.id,
          //     permitted: 1,
          //     createdAt: new Date(),
          //     updatedAt: new Date(),
          //   })
          // }
      }
      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermission, {
        transaction,
      });

    // const sidebarItems = [
    //   {
    //     id: "eudr_due_deligence",
    //     name: "EUDR Due Diligence",
    //     parent_menu_id: null,
    //     route_path_name: "eudr_due_deligence",
    //     order: 3,
    //     icon:'/icons/eudr.png',
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_dashboard",
    //     name: "Dashboard",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "dueDiligenceDashboard",
    //     order: 1,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_due_deligence_report",
    //     name: "Due Deligence Report",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "dueDiligenceReports",
    //     order: 2,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_manage_farm",
    //     name: "Manage Farm",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "dueDiligenceManageFarm",
    //     order: 3,
    //     organization: 3,
    //     active: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_producers",
    //     name: "Producers",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "Producers",
    //     order: 4,
    //     organization: 3,
    //     active: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_operators",
    //     name: "Operator",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "Operators",
    //     order: 5,
    //     organization: 3,
    //     active: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_my_farm",
    //     name: "My Farm",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "supplierFarms",
    //     order: 6,
    //     organization: 3,
    //     active: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_dispute_resolution",
    //     name: "Dispute Resolution",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "DisputeResolution",
    //     order: 7,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_suppliers",
    //     name: "Suppliers",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "Suppliers",
    //     order: 8,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_shipments",
    //     name: "Shipments",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "Shipment",
    //     order: 9,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_assessment_builder",
    //     name: "Assessment Builder",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "AssessmentList",
    //     order: 10,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_settings",
    //     name: "Settings",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "EUDRSettings",
    //     order: 11,
    //     organization: 3,
    //     active: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     id: "dds_due_deligence_guide",
    //     name: "Due Diligence Guide",
    //     parent_menu_id: 'eudr_due_deligence',
    //     route_path_name: "dueDiligenceGuide",
    //     order: 12,
    //     organization: 3,
    //     active: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]
    // await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
    //   transaction,
    // });
    console.log("Printed")
     await transaction.commit();
    }catch(err){
      console.log("err", "print", err)
      await transaction.rollback();
    }
  process.exit();
}


async function main1() {
  const parent_module = ['dds_parent']
      const modules = [
        'dds_dashboard',
        'dds_due_deligence_report',
        'dds_manage_farm',
        'dds_dispute_resolution',
        'dds_suppliers',
        'dds_assessment_builder',
        'dds_settings',
        'dds_due_deligence_guide',
        //suppliers
        'dds_my_farm',
        'dds_producers',
        'dds_operators',
        'dds_shipments'
      ]
    const operator_owner = ['dds_dashboard', 'dds_due_deligence_report',
         'dds_manage_farm', 'dds_dispute_resolution', 'dds_suppliers','dds_shipments',
         'dds_assessment_builder','dds_settings','dds_due_deligence_guide']
    const operator = ['dds_dashboard', 'dds_due_deligence_report', 'dds_settings']
    const supplier_owner = ['dds_dashboard', 'dds_due_deligence_report',
      'dds_manage_farm', 'dds_dispute_resolution','dds_operators', 'dds_producers', 'dds_shipments',
      'dds_assessment_builder','dds_settings', 'dds_due_deligence_guide']
    const supplier = ['dds_dashboard', 'dds_due_deligence_report', 'dds_my_farm','dds_producers']
    const user_roles = ['operator_owner','operator','supplier_owner','supplier']
    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // await queryInterface.insert(
      //   null,
      //   'parent_modules',
      //   {
      //     id: 'dds_parent',
      //     name: 'DDS Parent module',
      //     module_type: 'app_user',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   { transaction }
      // );
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
    for (var i = 0; i< operator_owner.length; i++){
      adminModulesCol.push({
          id: `dimitra_internal_${operator_owner[i]}`,
          name: `DDS Module for solok admin ${operator_owner[i]}`,
          parent_module_id: 'dds_parent',
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
        for(const operator_own of operator_owner) {
            userRolePermission.push({
              id: `dimitra_internal_${operator_own}_${permission.id}`,
              role_id: 'dimitra_internal',
              module_id: `dimitra_internal_${operator_own}`,
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
        id: "eudr_due_deligence",
        name: "Eudr Due Diligence",
        parent_menu_id: null,
        route_path_name: "eudr_due_deligence",
        order: 3,
        icon:'/icons/eudr.png',
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_dashboard",
        name: "Dashboard",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "dueDiligenceDashboard",
        order: 1,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_due_deligence_report",
        name: "Due Deligence Report",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "dueDiligenceReports",
        order: 2,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_manage_farm",
        name: "Manage Farm",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "dueDiligenceManageFarm",
        order: 3,
        organization: 3,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_producers",
        name: "Producers",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "Producers",
        order: 4,
        organization: 3,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_operators",
        name: "Operator",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "Operators",
        order: 5,
        organization: 3,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_my_farm",
        name: "My Farm",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "supplierFarms",
        order: 6,
        organization: 3,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_dispute_resolution",
        name: "Dispute Resolution",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "DisputeResolution",
        order: 7,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_suppliers",
        name: "Suppliers",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "Suppliers",
        order: 8,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_shipments",
        name: "Shipments",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "Shipment",
        order: 9,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_assessment_builder",
        name: "Assessment Builder",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "AssessmentList",
        order: 10,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_settings",
        name: "Settings",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "EUDRSettings",
        order: 11,
        organization: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dds_due_deligence_guide",
        name: "Due Diligence Guide",
        parent_menu_id: 'eudr_due_deligence',
        route_path_name: "dueDiligenceGuide",
        order: 12,
        organization: 3,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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


async function add_dds_superadmin_role_and_add_riginal_risk_assessment()
{
    const parent_module = ['dds_parent']
    const modules = ['dds_regional_risk_assessment']
    const user_roles = ['dds_superadmin']
    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();  

    try {
      const adminRoles = []
      const adminModulesCol  = []

     /** 
      *  Insert new role for dds superadmin role
      */

      for(var i=0; i<user_roles.length; i++){
        adminRoles.push({
          id: user_roles[i],
          name: `DDS super admin Roles ${user_roles[i]}`,
          role_type:'admin',
          organization:3,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    
     await queryInterface.bulkInsert('roles', adminRoles, { transaction, });



     /** 
      *  Insert module for dds superadmin risk assessment
      */
     for (var i = 0; i< modules.length; i++){
        adminModulesCol.push({
            id: `dds_superadmin_${modules[i]}`,
            name: `DDS Module for dds super admin ${modules[i]}`,
            parent_module_id: 'dds_parent',
            createdAt: new Date(),
            updatedAt: new Date(),
        })
      }
      await queryInterface.bulkInsert('modules', adminModulesCol, { transaction, });

    /** 
      *  Insert module for dds superadmin risk assessment
      */
        const permissions = await queryInterface.select(null, 'permissions', { transaction });
        const userRolePermission = [];
        for (const permission of permissions) {
            for(const mod of modules) {
                userRolePermission.push({
                  id: `dds_superadmin_${mod}_${permission.id}`,
                  role_id: 'dds_superadmin',
                  module_id: `dds_superadmin_${mod}`,
                  permission_id: permission.id,
                  permitted: 1,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                })
            }
        }

        await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermission, {
            transaction,
        });

        const sidebarItems = [
            {
            id: "dds_regional_risk_assessment",
            name: "Regional Risk Assessment",
            parent_menu_id: 'eudr_due_deligence',
            route_path_name: "regionalRiskAssessment",
            order: 4,
            organization: 3,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            },
        ]

        await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
          transaction,
        });

     console.log("Printed")
     await transaction.commit();
    }catch(err){
        console.log(err, "print")
        await transaction.rollback();
    }
}
add_dds_superadmin_role_and_add_riginal_risk_assessment()
