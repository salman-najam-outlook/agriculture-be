#!/usr/bin/env node
const app = require("../app");
const db = require(rootPath + "/models");
const { QueryTypes } = require('sequelize');

async function main() {
  const parent_module = ['esg_parent']
  const modules = ['esg_dashboard','esg_suppliers']
  const roles = ['sub_enterprise']
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


async function insert_organization_pt_survaryer(){
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.insert(
        null,
        'organization',
        { 
            name: 'PT Surveyor Indonesia',
            code: 'PT_Surveyor_Indonesia',
            status: 'active',
            paymentStatus: 'pending',
            activationKeysAllowed:5000,
            registrationDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        { transaction }
        );
        await transaction.commit();
        console.log("Inserted client successfully");
    } catch (err) {
        console.log("Error in inserting client", err);
        await transaction.rollback();
    }
}

async function add_sidebar_menu_item() {

    const orgID = await db.Organization.findOne({
        where: { code: 'PT_Surveyor_Indonesia' },
        attributes: ['id']
    });

    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        
        const usermanagementMenu = await db.sequelize.query(
            `
            (
                SELECT * FROM sidebar_menu 
                WHERE organization = 3 AND parent_menu_id IN (
                SELECT id FROM sidebar_menu 
                WHERE id IN ( 
                'eudr_due_deligence','farm_management', 'user_management', 'faq', 'users/profiles', 'tickets', 'parent_dashboard' 
                ) AND organization = 3
                )
            )
            UNION
            (
                SELECT * FROM sidebar_menu 
                WHERE id IN ( 
                'eudr_due_deligence','farm_management', 'user_management', 'faq', 'users/profiles', 'tickets', 'parent_dashboard'
                ) AND organization = 3
            )
            `,
            {
                type: QueryTypes.SELECT
            }
            );

            for (let menu of usermanagementMenu) {
                
                await queryInterface.insert(
                    null,
                    'sidebar_menu',
                    {
                        id: menu.id,
                        name: menu.name,
                        parent_menu_id: menu.parent_menu_id,
                        route_path_name: menu.route_path_name,
                        order: menu.order,
                        icon: menu.icon,
                        organization: orgID.id,
                        active: menu.active,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    { transaction }
                );
            }
        await transaction.commit();
        console.log("Inserted sidebar menu item successfully");
    } catch (err) {
        console.log("Error in inserting sidebar menu item", err);
        await transaction.rollback();
    }
}

async function add_dynamic_role(){
    const roles = ['manage_user']
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.insert(
            null,
            'roles',
            {
                id: 'indonesia_admin',
                name: 'Indonesia admin',
                role_type: 'admin',
                organization: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { transaction }
        );
        await transaction.commit();
        console.log("Inserted sub_enterprise role successfully");
    } catch (err) {
        console.log("Error in inserting sub_enterprise role", err);
        await transaction.rollback();
    }
}
function removePrefix(text, prefix = 'solok_admin_') {
  if (text.startsWith(prefix)) {
    return text.slice(prefix.length);
  }
  return text;
}

async function add_indonesia_admin_modules_permissions() {
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        const modulePermission = await db.sequelize.query(
            `select * from admin_users_roles_modules_permissions where module_id in(
            "solok_admin_parent_dashboard",
            "solok_admin_dashboard"
            "solok_admin_farm_management",
            "solok_admin_farmers",
            "solok_admin_farms", 
            "solok_admin_farm_activities_calendar",
            "solok_admin_user_management", 
            "solok_admin_activation", 
            "solok_admin_membership",
            "solok_admin_permissions",
            "solok_admin_role_requests", 
            "solok_admin_users/userList", 
            "solok_admin_faq",
            "solok_admin_tickets", 
            "solok_admin_users/profiles"
            )`,          
            { type: QueryTypes.SELECT }
        );
        const modules = []
        const ids = []
        for (const permission of modulePermission) {
            const module = removePrefix(permission.module_id, 'solok_admin_');
            if (!ids.includes(module)) {
                ids.push(module)
                modules.push({
                        id: `indonesia_admin_${module}`,
                        name: `Indonesia Admin Module ${module}`,
                        parent_module_id: 'my_farm',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
            }
        }
         await queryInterface.bulkInsert('modules', modules, {
            transaction,
        });
        const userRolePermission = [];
        for (const permission of modulePermission) {
            const module = removePrefix(permission.module_id, 'solok_admin_');
            userRolePermission.push({
                id: `indonesia_admin_${module}_${permission.permission_id}`,
                role_id: 'indonesia_admin',
                module_id: `indonesia_admin_${module}`,
                permission_id: permission.permission_id,
                permitted: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermission, {
            transaction,
        });
        await transaction.commit();
        console.log("Inserted indonesia_admin modules permissions successfully");
    } catch (err) {
        console.log("Error in inserting indonesia_admin modules permissions", err);
        await transaction.rollback();
    }
}

async function insert_organization_pt_surveyor_exporter(){
  const queryInterface = db.sequelize.getQueryInterface();
  const transaction = await queryInterface.sequelize.transaction();
  try {
      await queryInterface.insert(
      null,
      'organization',
      { 
          name: 'PT Surveyor Indonesia Exporters Demo',
          code: 'PT_Surveyor_Indonesia_Exporter_Demo',
          status: 'active',
          paymentStatus: 'pending',
          activationKeysAllowed:5000,
          registrationDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      { transaction }
      );
      await transaction.commit();
      console.log("Inserted client successfully");
  } catch (err) {
      console.log("Error in inserting client", err);
      await transaction.rollback();
  }
}

async function add_sidebar_menu_item_exporter() {

  const orgID = await db.Organization.findOne({
      where: { code: 'PT_Surveyor_Indonesia_Exporter_Demo' },
      attributes: ['id']
  });

  const queryInterface = db.sequelize.getQueryInterface();
  const transaction = await queryInterface.sequelize.transaction();
  try {
      
      const usermanagementMenu = await db.sequelize.query(
          `
          (
              SELECT * FROM sidebar_menu 
              WHERE organization = 3 AND parent_menu_id IN (
              SELECT id FROM sidebar_menu 
              WHERE id IN ( 
              'eudr_due_deligence','farm_management', 'user_management', 'faq', 'users/profiles', 'tickets', 'parent_dashboard' 
              ) AND organization = 3
              )
          )
          UNION
          (
              SELECT * FROM sidebar_menu 
              WHERE id IN ( 
              'eudr_due_deligence','farm_management', 'user_management', 'faq', 'users/profiles', 'tickets', 'parent_dashboard'
              ) AND organization = 3
          )
          `,
          {
              type: QueryTypes.SELECT
          }
          );

          for (let menu of usermanagementMenu) {
              
              await queryInterface.insert(
                  null,
                  'sidebar_menu',
                  {
                      id: menu.id,
                      name: menu.name,
                      parent_menu_id: menu.parent_menu_id,
                      route_path_name: menu.route_path_name,
                      order: menu.order,
                      icon: menu.icon,
                      organization: orgID.id,
                      active: menu.active,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                  },
                  { transaction }
              );
          }
      await transaction.commit();
      console.log("Inserted sidebar menu item successfully");
  } catch (err) {
      console.log("Error in inserting sidebar menu item", err);
      await transaction.rollback();
  }
}


// main()
//add_dynamic_role()
//add_indonesia_admin_modules_permissions()
// insert_organization_pt_surveyor_exporter()
//add_sidebar_menu_item_exporter()

/**
 * -----------------------------------------------------------------------
 *  Exporter dds roles added Permissions
 * -----------------------------------------------------------------------
 */
async function add_dynamic_role_exporter(){
    const roles = ['dds_exporter']
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.insert(
            null,
            'roles',
            {
                id: 'dds_exporter',
                name: 'DDS Exporter',
                role_type: 'admin',
                organization: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { transaction }
        );
        await transaction.commit();
        console.log("Inserted dds exporter role successfully");
    } catch (err) {
        console.log("Error in inserting sub_enterprise role", err);
        await transaction.rollback();
    }
}


async function add_dds_exporter_permission() {
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        const modulePermission = await db.sequelize.query(
            `select * from admin_users_roles_modules_permissions where module_id in(
            "supplier_owner_dds_due_deligence_report",
            "supplier_owner_dds_shipments"
            )`,          
            { type: QueryTypes.SELECT }
        );
        const modules = []
        const ids = []
        for (const permission of modulePermission) {
            let module;
            if(permission.module_id.startsWith("supplier_owner_")){
                 module = removePrefix(permission.module_id, 'supplier_owner_');
            }else{
                 module = removePrefix(permission.module_id, 'operator_');
            }
        
            if (!ids.includes(module)) {
                ids.push(module)
                modules.push({
                        id: `dds_exporter_${module}`,
                        name: `Indonesia Exporter Module ${module}`,
                        parent_module_id: 'indonesia_admin',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
            }
        }
         await queryInterface.bulkInsert('modules', modules, {
            transaction,
        });
        const userRolePermission = [];
        for (const permission of modulePermission) {
            let module;
            if(permission.module_id.startsWith("supplier_owner_")){
                module = removePrefix(permission.module_id, 'supplier_owner_');
            }else{
                module = removePrefix(permission.module_id, 'operator_');
            }
            userRolePermission.push({
                id: `dds_exporter_${module}_${permission.permission_id}`,
                role_id: 'dds_exporter',
                module_id: `dds_exporter_${module}`,
                permission_id: permission.permission_id,
                permitted: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermission, {
            transaction,
        });
        await transaction.commit();
        console.log("Inserted indonesia exporter modules permissions successfully");
    } catch (err) {
        console.log("Error in indonesia exporter  modules permissions", err);
        await transaction.rollback();
    }
}

/**
 * -----------------------------------------------------------------------
 *  indonesia_ptsi, indonesia_ptsi_worker roles added Permissions
 * -----------------------------------------------------------------------
 */

async function add_indonesia_ptsi_role() {
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.insert(
            null,
            'roles',
            {
                id: 'indonesia_ptsi',
                name: 'Indonesia PTSI',
                role_type: 'admin',
                organization: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { transaction }
        );
        await transaction.commit();
        console.log("Inserted indonesia_ptsi role successfully");
    } catch (err) {
        console.log("Error in inserting indonesia_ptsi role", err);
        await transaction.rollback();
    }
}

async function add_ptsi_worker_role() {
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.insert(
            null,
            'roles',
            {
                id: 'indonesia_ptsi_worker',
                name: 'Indonesia PTSI Worker',
                role_type: 'admin',
                organization: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { transaction }
        );
        await transaction.commit();
        console.log("Inserted indonesia_ptsi_worker role successfully");
    } catch (err) {
        console.log("Error in inserting indonesia_ptsi_worker role", err);
        await transaction.rollback();
    }
}

async function add_indonesia_ptsi_panel_modules_permissions(){
  const modules = ['dds_root_dashboard','dds_root_due_diligence_report', 'root_profile', 'root_farms','root_cooperatives','root_exporter', 'root_manage_product', 'root_settings']
  const role = 'indonesia_ptsi'
    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();
    try {
    const adminModulesCol = []
    for (var i = 0; i< modules.length; i++){
      adminModulesCol.push({
          id: `${role}_${modules[i]}`,
          name: `${role}- ${modules[i]}`,
          parent_module_id: 'dds_parent',
          createdAt: new Date(),
          updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('modules', adminModulesCol, { transaction, });
    const permissions = await queryInterface.select(null, 'permissions', { transaction });
    const userRolePermission = [];
      for (const permission of permissions) {
        for(const module of modules) {
            userRolePermission.push({
              id: `${role}_${module}_${permission.id}`,
              role_id: role,
              module_id: `${role}_${module}`,
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
        
    console.log("Printed ptsi panel permission added")
     await transaction.commit();
    }catch(err){
      console.log("err", "print")
      await transaction.rollback();
    }
}

async function add_indonesia_ptsi_worker_modules_permissions(){
  const modules = ['dds_root_dashboard','dds_root_due_diligence_report', 'root_profile']
  const role = 'indonesia_ptsi_worker'
    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();
    try {
    const adminModulesCol = []
    for (var i = 0; i< modules.length; i++){
      adminModulesCol.push({
          id: `${role}_${modules[i]}`,
          name: `${role}- ${modules[i]}`,
          parent_module_id: 'dds_parent',
          createdAt: new Date(),
          updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('modules', adminModulesCol, { transaction, });
    const permissions = await queryInterface.select(null, 'permissions', { transaction });
    const userRolePermission = [];
      for (const permission of permissions) {
        for(const module of modules) {
            userRolePermission.push({
              id: `${role}_${module}_${permission.id}`,
              role_id: role,
              module_id: `${role}_${module}`,
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
        
    console.log("Printed workier paneal")
     await transaction.commit();
    }catch(err){
      console.log("err", "print")
      await transaction.rollback();
    }
}

async function add_sidebarMenu_ptsi_panel() {
    const queryInterface = db.sequelize.getQueryInterface()
    const transaction = await queryInterface.sequelize.transaction();
    const orgID = 232
    try {
        const sidebarItems = [
        {
            id: "dds_root_dashboard",
            name: "Dashboard",
            parent_menu_id: null,
            route_path_name: "dds_root_dashboard",
            order: 1,
            icon:'/icons/dashboard.png',
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "dds_root_due_diligence_report",
            name: "Due Diligence Report",
            parent_menu_id: null,
            route_path_name: "dds_root_due_diligence_report",
            order: 3,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "root_profile",
            name: "Profile",
            parent_menu_id: null,
            route_path_name: "root_profile",
            order: 2,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "root_farms",
            name: "Farms",
            parent_menu_id: null,
            route_path_name: "root_farms",
            order: 4,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "root_cooperatives",
            name: "Cooperatives",
            parent_menu_id: null,
            route_path_name: "root_cooperatives",
            order: 5,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "root_exporter",
            name: "Exporter",
            parent_menu_id: null,
            route_path_name: "root_exporter",
            order: 6,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "root_manage_product",
            name: "Manage Product",
            parent_menu_id: null,
            route_path_name: "root_manage_product",
            order: 7,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "root_settings",
            name: "Settings",
            parent_menu_id: null,
            route_path_name: "root_settings",
            order: 8,
            organization: orgID,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]
    await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
      transaction,
    });
    await transaction.commit();
    console.log("Inserted sidebar menu item successfully");
   }catch(err) {
        await transaction.rollback();
        console.log("Error in inserting sidebar menu item", err);
   }
}

async function main(){
    //await add_sidebarMenu_ptsi_panel()
    //await add_indonesia_ptsi_role()
    //await add_ptsi_worker_role()
    //await add_indonesia_ptsi_panel_modules_permissions()
    //await add_indonesia_ptsi_worker_modules_permissions()
    process.exit();
}
main()

