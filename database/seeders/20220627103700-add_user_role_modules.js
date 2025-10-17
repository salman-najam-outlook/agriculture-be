'use strict';


const famer_role = [

  {user_role_id: "farmer", module_id: "user" },
  {user_role_id: "farmer", module_id: "equipment" },
  {user_role_id: "farmer", module_id: "location" },
  {user_role_id: "farmer", module_id: "users/goal_1" },
  {user_role_id: "farmer", module_id: "audit" },
  {user_role_id: "farmer", module_id: "crop" },
  {user_role_id: "farmer", module_id: "documents" },
  {user_role_id: "farmer", module_id: "farm" },
  {user_role_id: "farmer", module_id: "geofencing" },
  {user_role_id: "farmer", module_id: "harvesting" },
  {user_role_id: "farmer", module_id: "irrigation" },
  {user_role_id: "farmer", module_id: "observation" },
  {user_role_id: "farmer", module_id: "soil" },
  {user_role_id: "farmer", module_id: "soilpreparation" },
  {user_role_id: "farmer", module_id: "sowing" },
  {user_role_id: "farmer", module_id: "storage" },
  {user_role_id: "farmer", module_id: "users/goal" },
  {user_role_id: "farmer", module_id: "weed" },
  {user_role_id: "farmer", module_id: "coffee/farmers" },
  {user_role_id: "farmer", module_id: "coffee/farmers/plantation" },
  {user_role_id: "farmer", module_id: "coffee/farmers/seedling" },
  {user_role_id: "farmer", module_id: "coffee/farmers/production-chart" },
  {user_role_id: "farmer", module_id: "coffee/farmers/selling-report" },
]

const buying_station = [
  {user_role_id: "buying_station", module_id: "coffee/buying-station" },
  {user_role_id: "buying_station", module_id: "coffee/buying-station/purchase" },
  {user_role_id: "buying_station", module_id: "coffee/buying-station/processing" },
  {user_role_id: "buying_station", module_id: "coffee/buying-station/report" },
  {user_role_id: "buying_station", module_id: "coffee/buying-station/production" },
]
const dry_milling = [
  {user_role_id: "dry_milling", module_id: "coffee/dry-milling" },
  {user_role_id: "dry_milling", module_id: "coffee/dry-milling/production-chart" },
  {user_role_id: "dry_milling", module_id: "coffee/dry-milling/production-targets" },

]


module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    let  famerRoleModuleData = [], buyingModuleData = [], dryMillingModuleData = []

    famerRoleModuleData = famer_role.map(farmer => {
      return {
        id: `${farmer.user_role_id}_${farmer.module_id}`,
        user_role_id: farmer.user_role_id,
        module_id: farmer.module_id
      }
    })
    buyingModuleData = buying_station.map(farmer => {
      return {
        id: `${farmer.user_role_id}_${farmer.module_id}`,
        user_role_id: farmer.user_role_id,
        module_id: farmer.module_id
      }
    })
    dryMillingModuleData = dry_milling.map(farmer => {
      return {
        id: `${farmer.user_role_id}_${farmer.module_id}`,
        user_role_id: farmer.user_role_id,
        module_id: farmer.module_id
      }
    })
    await queryInterface.bulkInsert("user_role_modules", [...famerRoleModuleData, ...buyingModuleData, ...dryMillingModuleData]);
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
