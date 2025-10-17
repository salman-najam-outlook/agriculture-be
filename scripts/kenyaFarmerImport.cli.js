#!/usr/bin/env node
const app = require("../app");
const db = require(rootPath + "/models");
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const { where } = require("../mongoose-models/Organization");

async function insert_sub_organization_form_kenya_naccu(){
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        const orgParent = await db.Organization.findOne({
            where: {
                code: 'naccu',
                isSubOrganization: false
            },
        });
        await db.Organization.create({
            name: `Kipkelion`,
            logo: "https://dimitra-prod-public-images.s3.amazonaws.com/org/cpSV3hKUQQCAgVaeykNBhd.png",
            parentId: orgParent?.id,
            isSubOrganization: true,
            code: 'kipkelion',
            activationKeysAllowed: 2000,
            registrationDate: moment.utc(),
            dimitraPointSystem: 0,
            country: "Kenya",
            status: 'active',
            createdAt: moment.utc(),
            updatedAt: moment.utc()
        }, { transaction });
        await transaction.commit();
        console.log("Sub Organization Inserted successfully");
    } catch (err) {
        console.log("Error in inserting client", err);
        await transaction.rollback();
    }
}


async function insert_sub_organization_form_kenya_naccu_internal(){
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        const orgParent = await db.Organization.create({
            name: `NACCUInternal`,
            logo: "https://dimitra-prod-public-images.s3.amazonaws.com/org/cpSV3hKUQQCAgVaeykNBhd.png",
            parentId: null,
            isSubOrganization: false,
            code: 'NACCU_internal',
            activationKeysAllowed: 2000,
            registrationDate: moment.utc(),
            dimitraPointSystem: 0,
            country: "Kenya",
            status: 'active',
            createdAt: moment.utc(),
            updatedAt: moment.utc()
        }, { transaction });

        await db.Organization.create({
            name: `KipkelionInternal`,
            logo: "https://dimitra-prod-public-images.s3.amazonaws.com/org/cpSV3hKUQQCAgVaeykNBhd.png",
            parentId: orgParent?.id,
            isSubOrganization: true,
            code: 'kipkelion_internal',
            activationKeysAllowed: 2000,
            registrationDate: moment.utc(),
            dimitraPointSystem: 0,
            country: "Kenya",
            status: 'active',
            createdAt: moment.utc(),
            updatedAt: moment.utc()
    }, { transaction });
        await transaction.commit();
        console.log("Organization/Sub Organization Inserted successfully");
    } catch (err) {
        console.log("Error in inserting client", err);
        await transaction.rollback();
    }
}

/* 
async function add_sidebar_menu_item() {

    const orgID = await db.Organization.findOne({
        where: { code: 'naccu' },
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
*/

async function add_dynamic_role(){
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.insert(
            null,
            'roles',
            {
                id: 'naccu_kenya_admin',
                name: 'Naccu Kenya Admin',
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


async function add_kenya_admin_modules_permissions() {
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
                        id: `naccu_kenya_admin_${module}`,
                        name: `Kenyna Admin Module ${module}`,
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
                id: `naccu_kenya_admin_${module}_${permission.permission_id}`,
                role_id: 'naccu_kenya_admin',
                module_id: `naccu_kenya_admin_${module}`,
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
        console.log("Inserted kenya admin modules permissions successfully");
    } catch (err) {
        console.log("Error in inserting kenya admin modules permissions", err);
        await transaction.rollback();
    }
}


async function createDefaultMembershipPermissions() {
    const queryInterface = db.sequelize.getQueryInterface();
    const transaction = await queryInterface.sequelize.transaction();

    const user = await db.User.findOne({
        where:{
            email:'nnaccu_suborg@dimitra.io'
        }
    });
  
    try {
    const parentMembership = await db.Membership.findOne({
      where: {
        org_id: user.organization,
      },
    });

    // Create new membership for sub-organization
    const newMembership = await db.Membership.create({
      membership_type: "Default Plan",
      satellite_report: parentMembership.satellite_report,
      advanced_report: parentMembership.advanced_report,
      membership_duration: parentMembership.membership_duration,
      membership_duration_in_days: parentMembership.membership_duration_in_days,
      membership_duration_unit: parentMembership.membership_duration_unit,
      membership_fee: parentMembership.membership_fee,
      default_status: parentMembership.default_status,
      description: parentMembership.description,
      org_id: user.organization,
      plan_type: parentMembership.plan_type,
      feeUnitType: parentMembership.feeUnitType,
      allowed_users: parentMembership.allowed_users,
      allowed_farms: parentMembership.allowed_farms,
      advanceReportTypeUnit: parentMembership.advanceReportTypeUnit,
      advancedReportUnit: parentMembership.advancedReportUnit,
      satelliteReportTypeUnit: parentMembership.satelliteReportTypeUnit,
      deforestationReport: parentMembership.deforestationReport,
      deforestationReportTypeUnit: parentMembership.deforestationReportTypeUnit,
      deforestationReportUnit: parentMembership.deforestationReportUnit,
      basicFarmLevelReport: parentMembership.basicFarmLevelReport,
      advancedFarmLevelReport: parentMembership.advancedFarmLevelReport,
      largeAreaReport: parentMembership.largeAreaReport,
      subOrgId: user.subOrganizationId,
      createdAt: moment.utc(),
      updatedAt: moment.utc()
    }, { transaction });

    console.log(`Created new membership ${newMembership.id} for sub-org ${subOrgId}`);

    // create user role membership map
    await db.UserRoleMembershipMap.create({
      user_id: user.id,
      membership_id: newMembership.id,
      user_role_id: 'farmer',
      isDeleted: false,
      createdAt: moment.utc(),
      updatedAt: moment.utc()
    }, { transaction });

    // Get parent membership's permissions
    const parentPermissions = await db.UserRoleMembershipPermissions.findAll({
      where: {
        membership_plan_id: parentMembership.id
      }
    });


    // Create permissions for new membership
    const newPermissions = parentPermissions.map(permission => ({
      id: `${permission.user_role_id}_${newMembership.id}_${permission.module_id}_${permission.permission_id}`,
      user_role_id: permission.user_role_id,
      module_id: permission.module_id,
      membership_plan_id: newMembership.id,
      permission_id: permission.permission_id,
      permitted: permission.permitted,
      isdeleted: permission.isdeleted,
      createdAt: moment.utc(),
      updatedAt: moment.utc()
    }));


    if (newPermissions.length > 0) {
      await db.UserRoleMembershipPermissions.bulkCreate(newPermissions, { transaction });
      console.log(`Created ${newPermissions.length} permissions for membership ${newMembership.id}`);
    }
    await db.UserRoleMembershipPermissions.findAll({
      where: {
        membership_plan_id: parentMembership.id
      }
    })
    await transaction.commit();
    console.log(`Successfully completed creating default membership permissions for sub-org ${subOrgId}`);
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating default membership permissions:', error);
  }
}


async function main() {
    //await insert_sub_organization_form_kenya_naccu();
    //await insert_sub_organization_form_kenya_naccu_internal();
    //await add_sidebar_menu_item(); Not needed
    //await add_dynamic_role();
    //await add_kenya_admin_modules_permissions();
    await createDefaultMembershipPermissions()
    process.exit();
}

main();






