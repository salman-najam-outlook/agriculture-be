"use strict";
const moment = require("moment");
const { gasUnits } = require("../../helpers/consts");

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let membershipArr = await queryInterface.sequelize.query(
        "SELECT * FROM user_membership",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );
      let parent_modules_arr = [
        {
          id: "cacao",
          name: "Cacao",
          createdAt: new Date(),
          updatedAt: new Date(),
          module_type: "app_user",
        },
      ];
      let module_arr = [
        {
          id: `cacao_farmer`,
          name: "Cacao Farmer",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_farmer/plantation`,
          name: "Cacao Plantation",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_farmer/production_chart`,
          name: "Cacao Plantation Production Chart",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_farmer/sales_report`,
          name: "Cacao Plantation Sales Report",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_farmer/tracebility`,
          name: "Cacao Farmer Tracebility",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_buying_station`,
          name: "Cacao Buying Station",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_buying_station/purchase`,
          name: "Cacao Purchase Order",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_buying_station/fermentation`,
          name: "Cacao Fermentation",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_buying_station/report`,
          name: "Cacao Buying Station Report",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_buying_station/production`,
          name: "Cacao Buying Station Production",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_dry_milling`,
          name: "Cacao Dry Milling",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_dry_milling/register_dry`,
          name: "Cacao Dry Milling Register Dry",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_dry_milling/production_chart`,
          name: "Cacao Dry Milling Production Chart",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_warehouse`,
          name: "Cacao Warehouse",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_warehouse/inbound_whs`,
          name: "Cacao InBound Warehouse",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_warehouse/outbound_whs`,
          name: "Cacao OutBound Warehouse",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `cacao_warehouse/warehouse_report`,
          name: "Cacao Warehouse Report",
          parent_module_id: "cacao",
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      let perms = ["delete", "get", "post", "put"];

      let roles = ["cacao_farmer"];

      let user_module_permission_arr = [];
      let userRoleModules = [];

      membershipArr.forEach((membership) => {
        module_arr.forEach((mod) => {
          perms.forEach((perm) => {
            roles.forEach((role) => {
              user_module_permission_arr.push({
                // id: `${mod.id}_${perm}_${role}_${membership.id}`,
                id: `${mod.id}_${membership.id}_${role}_${perm}`,
                user_role_id: role,
                module_id: mod.id,
                membership_plan_id: membership.id,
                permission_id: perm,
                permitted: 1,
                isdeleted: null,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            });
          });
        });
      });

      module_arr.forEach((mod) => {
        roles.map((userRoleId) =>
          userRoleModules.push({
            id: `${userRoleId}_${mod.id}`,
            user_role_id: userRoleId,
            module_id: mod.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        );
      });

      let parentModulesRes = await queryInterface.bulkInsert(
        "parent_modules",
        parent_modules_arr,
        { transaction }
      );
      let moduleRes = await queryInterface.bulkInsert("modules", module_arr, {
        transaction,
      });
      let modulePermRes = await queryInterface.bulkInsert(
        "user_role_membership_module_permission",
        user_module_permission_arr,
        { transaction }
      );
      await queryInterface.bulkInsert("user_role_modules", userRoleModules, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction?.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
