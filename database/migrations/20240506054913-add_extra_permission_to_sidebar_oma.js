'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const modules_farmer = ['weather_analysis_report', 'crop_health_report','reports_parent']
      const adminModules = []
      const aRoles = ['admin','agronostros_admin','avocado_farmer', 'oma_oma_admin',
      'ceproaa_ceproaa_admin','comisuyl_comisuyl_admin','community_admin','fedepanela_admin',
      'iabra_iabra','jazan_jazan_admin','kata_muduga_kata_muduga','micacao_admin',
      'micacao_micacao','ofc_ofc_admin','pangoa_pangoa']

      for (const role of aRoles) {
        adminModules.push({
          id: `${role}_${modules_farmer[0]}`,
          name: `Farmer omas report_${Math.random()}` ,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        adminModules.push({
          id: `${role}_${modules_farmer[1]}`,
          name: `Farmer oma report_${Math.random()}` ,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        if(!['ceproaa_ceproaa_admin','oma_oma_admin','comisuyl_comisuyl_admin',
         'jazan_jazan_admin', 'ofc_ofc_admin', 'pangoa_pangoa', 'kata_muduga_kata_muduga','micacao_admin'].includes(role)){
          adminModules.push({
            id: `${role}_${modules_farmer[2]}`,
            name: `Farmer oma report_${Math.random()}` ,
            parent_module_id: 'reports',
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }

      }

      adminModules.push({
        id: `oma_oma_admin_land_suitability`,
        name: `Farmer land lad report_${Math.random()}` ,
        parent_module_id: 'reports',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await queryInterface.bulkInsert('modules', adminModules, {
        transaction,
      });

      const permissions = await queryInterface.select(null, 'permissions', { transaction });

      const userRoleMembershipModulePermissions2 = []
      for (const permission of permissions) {
        for (const rol of aRoles) {

          userRoleMembershipModulePermissions2.push({
            id: `${rol}_weather_analysis_report_${permission.id}`,
            role_id: rol,
            module_id: `${rol}_weather_analysis_report`,
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          userRoleMembershipModulePermissions2.push({
            id: `${rol}_crop_health_report_${permission.id}`,
            role_id: rol,
            module_id: `${rol}_crop_health_report`,
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          if(!['oma_oma_admin','ceproaa_ceproaa_admin','comisuyl_comisuyl_admin','jazan_jazan_admin','kata_muduga_kata_muduga','micacao_admin','ofc_ofc_admin','pangoa_pangoa'].includes(rol)){
            userRoleMembershipModulePermissions2.push({
              id: `${rol}_reports_parent_${permission.id}`,
              role_id: rol,
              module_id: `${rol}_reports_parent`,
              permission_id: permission.id,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }

        userRoleMembershipModulePermissions2.push({
          id: `oma_oma_admin_land_suitability_${permission.id}`,
          role_id: 'oma_oma_admin',
          module_id: `oma_oma_admin_land_suitability`,
          permission_id: permission.id,
          permitted: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRoleMembershipModulePermissions2, {
        transaction,
      });
      
      await queryInterface.sequelize.query(`
      update sidebar_menu set active = 1 where id = 'reports_parent';
      `, {
        type: Sequelize.QueryTypes.UPDATE
      }, transaction);

      console.log("Execute successfully")
      await transaction.commit()
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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