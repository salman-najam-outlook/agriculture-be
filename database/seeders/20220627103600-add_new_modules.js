'use strict';

const parent_modules = [
  {id: "coffee", name: "Coffee", module_type: "app_user" },
]

const modules = [

  {id: "coffee/buying-station", name: "Buying Station", parent_module_id: "coffee" },
  {id: "coffee/buying-station/purchase", name: "Purchase Order", parent_module_id: "coffee" },
  {id: "coffee/buying-station/processing", name: "Processing", parent_module_id: "coffee" },
  {id: "coffee/buying-station/report", name: "Buying Station Report", parent_module_id: "coffee" },
  {id: "coffee/buying-station/production", name: "Buying Station Production", parent_module_id: "coffee" },
  {id: "coffee/farmers", name: "Coffee", parent_module_id: "coffee" },
  {id: "coffee/dry-milling", name: "Dry Milling", parent_module_id: "coffee" },
  {id: "coffee/dry-milling/production-chart", name: "Dry Milling Production Chart", parent_module_id: "coffee" },
  {id: "coffee/farmers/production-chart", name: "Farmer Production Chart", parent_module_id: "coffee" },
  {id: "coffee/dry-milling/production-targets", name: "Dry Milling Targets", parent_module_id: "coffee" },
  {id: "coffee/farmers/plantation", name: "Plantation", parent_module_id: "coffee" },
  {id: "coffee/farmers/seedling", name: "Seedling", parent_module_id: "coffee" },
  {id: "coffee/farmers/selling-report", name: "Farmer Selling Report", parent_module_id: "coffee" },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    let parentModulesData = [], moduleData = []

    parentModulesData = parent_modules.map(parm => {
      return {
        id: parm.id,
        name: parm.name,
        module_type: parm.module_type, // super admin user id
        createdAt: new Date() ,
        updatedAt: new Date() ,
      }
    })
    await queryInterface.bulkInsert("parent_modules", parentModulesData, {});

    moduleData = modules.map(mod => {
      return {
        id: mod.id,
        name: mod.name,
        parent_module_id: mod.parent_module_id, // super admin user id
        createdAt: new Date() ,
        updatedAt: new Date() ,
      }
    })
    await queryInterface.bulkInsert("modules", moduleData, {});
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
