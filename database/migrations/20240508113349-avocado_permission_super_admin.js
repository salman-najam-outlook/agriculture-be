'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    const permissions = await queryInterface.select(null, 'permissions', { transaction });
    try {
      const avocadoOnly = [
        {
          id:"avocado",
          name:"Avocado",
          parent_menu_id:null,
          route_path_name:"AvocadoTrees",
          order:1,
          organization:3,
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
          organization:3,
          active:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
      await queryInterface.bulkInsert('sidebar_menu', avocadoOnly, {
        transaction,
      });

      const adminModules = []
      adminModules.push({
        id: `dimitra_internal_avocado`,
        name: `avocado modul` ,
        parent_module_id: 'avocado_parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await queryInterface.bulkInsert('modules', adminModules, {
        transaction,
      });

      let userRoleMembershipModulePermissions2 = []
      for (const permission of permissions) {
        userRoleMembershipModulePermissions2.push({
          id: `dimitra_internal_avocado_${permission.id}`,
          role_id: 'dimitra_internal',
          module_id: 'dimitra_internal_avocado',
          permission_id: permission.id,
          permitted: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRoleMembershipModulePermissions2, {
        transaction,
      });
      await transaction.commit()
    } catch(error){
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
