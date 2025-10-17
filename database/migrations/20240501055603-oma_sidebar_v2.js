'use strict';
const userRoleIds = ['farmer', 'avocado_farmer'];
const organizationCodes = ['internal'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const userRoleIds = ['farmer', 'avocado_farmer'];
      const organizationCodes = ['internal'];
      const omaOrganizationCode = ['oma']
      //const queryInterface = db.sequelize.getQueryInterface()
      //const transaction = await queryInterface.sequelize.transaction();

      const modules_oma = ['avocado_tree'] // role avocado_farmer // 
      const modules_oma2 = ['avocado_tree','land_suitability']
      const modules_farmer = ['weather_analysis_report', 'crop_health_report', 'land_suitability'] // role farmer
      const modules_farmer2 = ['weather_analysis_report', 'crop_health_report']
      /**
       *  add avocado as parent modules
       */
    
      const existingParentModule = await queryInterface.select(null, 'parent_modules', {
        where: { id: 'avocado_parent' },
        transaction,
      });
      if(existingParentModule){
        await queryInterface.insert(
          null,
          'parent_modules',
          {
            id: 'avocado_parent',
            name: 'Avocado Parent',
            module_type: 'app_user',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { transaction }
        );
      }
      //Land suitibility 
      await queryInterface.insert(
        null,
        'modules',
        {
          id: 'land_suitability',
          name: 'Land Suitability',
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );
    
      await queryInterface.insert(
        null,
        'modules',
        {
          id: 'avocado_tree',
          name: 'Avocado tree management',
          parent_module_id: 'avocado_parent',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );

      await queryInterface.insert(
        null,
        'modules',
        {
          id: 'weather_analysis_report',
          name: 'Weather Analysis Report',
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );

      await queryInterface.insert(
        null,
        'modules',
        {
          id: 'crop_health_report',
          name: 'Crop Health Report',
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );
      
      //Add new user role avocado farmer  for mobbile user
      await queryInterface.insert(
        null,
        'user_role',
        {
          id: 'avocado_farmer',
          name: 'Avocado Farmer',
          created_by: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );  
      
    
     //const modules_oma = ['avocado_tree'] // role avocado_farmer
     //const modules_farmer = ['weather_analysis_report','crop_health_report','land_suitability'] // role farmer
     //For farmer  role
     const rolee_module_1 = modules_oma.map((moduleId) => {
        return {
            id: `avocado_farmer_${moduleId}`,
            user_role_id: 'avocado_farmer',
            module_id: moduleId,
            createdAt: new Date(),
            updatedAt: new Date(),
            organization_id:null
        }
     })
     const rolee_module_2 = modules_farmer.map((moduleId) => {
        return {
            id: `farmer_${moduleId}`,
            user_role_id: 'farmer',
            module_id: moduleId,
            createdAt: new Date(),
            updatedAt: new Date(),
            organization_id:null
        }
     })
     const final_role_module = [...rolee_module_1, ...rolee_module_2]
     await queryInterface.bulkInsert('user_role_modules', final_role_module, { transaction, });
    
     const permissions = await queryInterface.select(null, 'permissions', { transaction });
      const omAorganizations = await queryInterface.select(null, 'organization', {
        where: { code: { [Sequelize.Op.in]: omaOrganizationCode } },
        transaction,
      });
      const allOrganization = await queryInterface.select(null, 'organization', {
        transaction,
      });


      //For all organization 
      const organizationIdsAll = allOrganization.map((organization) => organization.id);
      const userMembershipsAll = await queryInterface.select(null, 'user_membership', {
        where: { org_id: { [Sequelize.Op.in]: organizationIdsAll } },
        transaction,
      });
      if (permissions && permissions.length > 0 && userMembershipsAll && userMembershipsAll.length > 0) {
        const userRoleMembershipModulePermissions1 = [];
        for (const userMembership of userMembershipsAll) {
          for (const permission of permissions) {
            for (const modulef of modules_farmer2) {
                // role for farmer
              userRoleMembershipModulePermissions1.push({
                id: `farmer_${userMembership.id}_${modulef}_${permission.id}`,
                user_role_id: 'farmer',
                module_id: modulef,
                membership_plan_id: userMembership.id,
                permission_id: permission.id,
                permitted: 1,
                isdeleted: null,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }
          }
        }
        await queryInterface.bulkInsert('user_role_membership_module_permission', userRoleMembershipModulePermissions1, {
          transaction,
        });
      }
      //For OMA only organization
      const organizationIds = omAorganizations.map((organization) => organization.id);
      const userMemberships = await queryInterface.select(null, 'user_membership', {
        where: { org_id: { [Sequelize.Op.in]: organizationIds } },
        transaction,
      });
      if (permissions && permissions.length > 0 && userMemberships && userMemberships.length > 0) {
        const userRoleMembershipModulePermissions = [];
        for (const userMembership of userMemberships) {
          for (const permission of permissions) {
            
            for (const oma_module of modules_oma) {
                // role for avocado_farmer
              userRoleMembershipModulePermissions.push({
                id: `avocado_farmer_${userMembership.id}_${oma_module}_${permission.id}`,
                user_role_id: 'avocado_farmer',
                module_id: oma_module,
                membership_plan_id: userMembership.id,
                permission_id: permission.id,
                permitted: 1,
                isdeleted: null,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }
            userRoleMembershipModulePermissions.push({
              id: `farmer_${userMembership.id}_land_suitability_${permission.id}`,
              user_role_id: 'farmer',
              module_id: 'land_suitability',
              membership_plan_id: userMembership.id,
              permission_id: permission.id,
              permitted: 1,
              isdeleted: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }
        await queryInterface.bulkInsert('user_role_membership_module_permission', userRoleMembershipModulePermissions, {
          transaction,
        });
      }
    


      // --------Superadmin backkend peermission  ------------------
      //Add avocado role
      //Add new user role avocado farmer
      await queryInterface.insert(
        null,
        'roles',
        {
          id: 'avocado_farmer',
          name: 'Avocado Farmer',
          role_type:'admin',
          organization:8,
          description:'Avocado farmer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );

      //Role Internal Admin  role Id: internal_internal_admin
      

      //add modules for super admin 
      //for roles [super_admin]
      //admin modules
      const adminModules = []
      const aRoles = ['super_admin','internal_internal_admin','dimitra_internal']
      for (const mf of modules_farmer){
        adminModules.push({
          id: `${aRoles[0]}_${mf}`,
          name: `Farmer oma report_${Math.random()}` ,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        adminModules.push({
          id: `${aRoles[1]}_${mf}`,
          name: `Farmer oma report_${Math.random()}` ,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        adminModules.push({
          id: `${aRoles[2]}_${mf}`,
          name: `Farmer oma report_${Math.random()}` ,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      adminModules.push({
        id: `${aRoles[0]}_avocado_tree`,
        name: `Avocado Tree management ${Math.random()}`,
        parent_module_id: 'avocado_parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      adminModules.push({
        id: `${aRoles[1]}_avocado_tree`,
        name: `Avocado Tree management${Math.random()}`,
        parent_module_id: 'avocado_parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      adminModules.push({
        id: `${aRoles[2]}_avocado_tree`,
        name: `Avocado Tree management${Math.random()}`,
        parent_module_id: 'avocado_parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      })



      await queryInterface.bulkInsert('modules', adminModules, {
        transaction,
      });

      if (permissions && permissions.length > 0) {
        const userRoleMembershipModulePermissions2 = [];
        for (const permission of permissions) {
          for (const farmer_module of modules_farmer) {
            // role for avocado_farmer
            userRoleMembershipModulePermissions2.push({
              id: `super_admin_${farmer_module}_${permission.id}`,
              role_id: 'super_admin',
              module_id: 'super_admin_' + farmer_module,
              permission_id: permission.id,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            userRoleMembershipModulePermissions2.push({
              id: `internal_internal_admin_${farmer_module}_${permission.id}`,
              role_id: 'internal_internal_admin',
              module_id: 'internal_internal_admin_' + farmer_module,
              permission_id: permission.id,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            userRoleMembershipModulePermissions2.push({
              id: `dimitra_internal_${farmer_module}_${permission.id}`,
              role_id: 'dimitra_internal',
              module_id: 'dimitra_internal_' + farmer_module,
              permission_id: permission.id,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
          userRoleMembershipModulePermissions2.push({
            id: `super_admin_avocado_tree_${permission.id}`,
            role_id: 'super_admin',
            module_id: 'super_admin_avocado_tree',
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }) 
          userRoleMembershipModulePermissions2.push({
            id: `internal_internal_admin_avocado_tree_${permission.id}`,
            role_id: 'internal_internal_admin',
            module_id: 'internal_internal_admin_avocado_tree',
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          userRoleMembershipModulePermissions2.push({
            id: `dimitra_internal_avocado_tree_${permission.id}`,
            role_id: 'dimitra_internal',
            module_id: 'dimitra_internal_avocado_tree',
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          })  
        }
        await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRoleMembershipModulePermissions2, {
          transaction,
        });
      }


      //theree report fo alll oganization
      for(const organiz of allOrganization){
        const sidebarItems = [
          {
            id:"land_suitability",
            name:"Land Suitability",
            parent_menu_id:'reports_parent',
            route_path_name:"LandSuitibilityList",
            order:5,
            organization:organiz.id,
            active:1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id:"weather_analysis_report",
            name:"Weather Analysis",
            parent_menu_id:'reports_parent',
            route_path_name:"WeatherAnalysisList",
            order:6,
            organization:organiz.id,
            active:1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id:"crop_health_report",
            name:"Satellite Reports",
            parent_menu_id:'reports_parent',
            route_path_name:"SatelliteReports",
            order:6,
            organization:organiz.id,
            active:1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
        await queryInterface.bulkInsert('sidebar_menu', sidebarItems, {
          transaction,
        });
      }

      //for oma onlly
      for(const omaOrg of omAorganizations){
        const avocadoOnly = [
          {
            id:"avocado",
            name:"Avocado",
            parent_menu_id:null,
            route_path_name:"AvocadoTrees",
            order:1,
            organization:omaOrg.id,
            active:1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id:"avocado_tree",
            name:"Avocado Trees",
            parent_menu_id:'avocado',
            route_path_name:"AvocadoTrees",
            order:1,
            organization:omaOrg.id,
            active:1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
        await queryInterface.bulkInsert('sidebar_menu', avocadoOnly, {
          transaction,
        });
      }

      console.log("Execute Successfully !!")
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {

  },
};
