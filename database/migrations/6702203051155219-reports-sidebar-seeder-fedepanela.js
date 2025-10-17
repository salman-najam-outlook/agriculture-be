'use strict';
const moment = require("moment");
const { gasUnits } = require("../../helpers/consts");


  let reports_parent = [
    {id:"regions_reports", name: "Regions", parent_menu_id: "reports_parent", route_path_name: "RegionsReports"    },
    {id:"farmers_reports", name: "Farmers", parent_menu_id: "reports_parent", route_path_name: "FarmersReports"    },
    {id:"farms_reports", name: "Farms", parent_menu_id: "reports_parent", route_path_name: "FarmsReports"    },
    {id:"crops_reports", name: "Crops", parent_menu_id: "reports_parent", route_path_name: "CropsReports"    },
    {id:"pests_reports", name: "Pests", parent_menu_id: "reports_parent", route_path_name: "PestsReports"    },
    {id:"pesticides_reports", name: "Pesticides", parent_menu_id: "reports_parent", route_path_name: "PesticidesReports"    },
    {id:"equipment_reports", name: "Equipment", parent_menu_id: "reports_parent", route_path_name: "EquipmentReports"    },
    {id:"goals_achieved_reports", name: "Goals Achieved", parent_menu_id: "reports_parent", route_path_name: "GoalsAchievedReports"   },
    {id:"report_dashboard", name: "Report Dashboard", parent_menu_id: "reports_parent", route_path_name: "ReportDashboard"   },
    
  ]
  let perms = [
    "delete",
    "get",
    "post",
    "put",
  ]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   try {
  //   let insertArr = []
  //   reports_parent.forEach((rp, index) => {
  //     let tmpObj = {}
  //     tmpObj.id = rp.id
  //     tmpObj.name = rp.name
  //     tmpObj.parent_menu_id = rp.parent_menu_id
  //     tmpObj.route_path_name = rp.route_path_name
  //     tmpObj.icon = rp.icon || null
  //     tmpObj.order = index
  //     tmpObj.organization = 6

  //     insertArr.push(tmpObj)
  //   })

  //   insertArr.push({
  //     id:"reports_parent", name: "Reports", parent_menu_id: null, route_path_name: "ReportsParents" , icon: "/icons/bar.png", organization: 6
  //   })

  //  let test = await queryInterface.bulkInsert("sidebar_menu", insertArr, {});

   // start of admin_users_roles_modules_permissions insertions


  //  let moduleRolePermInsertArr = [], moduleInsertArr = []
  //  agronostros_admin_traceability	Traceability	agronostros_admin	2022-07-12 14:44:45	2022-07-12 14:44:45	
  // reports_parent.forEach((rp, index) => {
  //   let tmpObj = {}
  //   tmpObj.id = `fedepanela_admin_${rp.id}`
  //   tmpObj.name = rp.name
  //   tmpObj.parent_module_id = `fedepanela_admin`
  //   tmpObj.createdAt = new Date()
  //   tmpObj.updatedAt = new Date()
  //   moduleInsertArr.push(tmpObj)
  // })
  // let test1 = await queryInterface.bulkInsert("modules", moduleInsertArr, {});

  // reports_parent.forEach((rp, index) => {
  //   perms.forEach(perm => {
  //     let tmpObj = {}
  //     tmpObj.id = `fedepanela_admin_${rp.id}_${perm}`
  //     tmpObj.role_id = "fedepanela_admin"
  //     tmpObj.module_id = `fedepanela_admin_${rp.id}`
  //     tmpObj.permission_id = perm
  //     tmpObj.permitted = 1
  //     tmpObj.createdAt = new Date()
  //     tmpObj.updatedAt = new Date()
      

  //     moduleRolePermInsertArr.push(tmpObj)
  //   })
  
  // })

  // let test2 = await queryInterface.bulkInsert("admin_users_roles_modules_permissions", moduleRolePermInsertArr, {});
   } catch (error) {
    console.log(error)
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
