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
          let module_arr = [
            {
              id: `nutrientmanagement`,
              name: 'Nutrient Management',
              parent_module_id: 'my_crops',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: `pestmanagement`,
              name: 'Pest Management',
              parent_module_id: 'my_crops',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: `diseasemanagement`,
              name: 'Disease Management',
              parent_module_id: 'my_crops',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date()
            },

          ]

          let perms = [
            "delete",
            "get",
            "post",
            "put",
          ]

          let roles= [ 
            "farmer",
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
