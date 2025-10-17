'use strict';
const moment = require("moment");
const { gasUnits } = require("../../helpers/consts");




module.exports = {
  async up (queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();
   try {
      
        let membershipArr = await queryInterface.sequelize.query(
          'SELECT * FROM user_membership', {
            type: queryInterface.sequelize.QueryTypes.SELECT
          });
          let parent_modules_arr = [
            {id:"warehouse", name: "Warehouse", createdAt: new Date(), updatedAt: new Date(), module_type: "app_user"    }
            
          ]
          let module_arr = [
            {
              id: `warehouse_inbound_whs`,
              name: 'InBound Warehouse',
              parent_module_id: 'coffee',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: `warehouse_outbound_whs`,
              name: 'OutBound Warehouse',
              parent_module_id: 'coffee',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: `warehouse_warehouse_report`,
              name: 'Warehouse Report',
              parent_module_id: 'coffee',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: `coffee/warehouse`,
              name: 'Warehouse',
              parent_module_id: 'coffee',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            }

          ]

          let perms = [
            "delete",
            "get",
            "post",
            "put",
          ]

          let roles= [ 
            "buying_station",
            "dry_milling"
          ]

          let user_module_permission_arr = []

          membershipArr.forEach(membership => {
            module_arr.forEach(mod => {
              perms.forEach(perm => {
                roles.forEach( role => {
                  user_module_permission_arr.push({
                    id : `${mod.id}_${perm}_${role}_${membership.id}`,
                    user_role_id: role,
                    module_id: mod.id,
                    membership_plan_id: membership.id,
                    permission_id: perm,
                    permitted: 1,
                    isdeleted: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  })
                })

              })
            })
          })
           


      let parentModulesRes = await queryInterface.bulkInsert("parent_modules", parent_modules_arr, {transaction});
      let moduleRes = await queryInterface.bulkInsert("modules", module_arr, {transaction});
      let modulePermRes = await queryInterface.bulkInsert("user_role_membership_module_permission", user_module_permission_arr, {transaction});
      await transaction.commit();
   } catch (error) {
    console.log(error)
    await transaction?.rollback();
   }
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
