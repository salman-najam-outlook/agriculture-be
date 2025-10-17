'use strict';
const moment = require("moment");
const { admin_modules } = require("../../helpers/consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


     const adminModulesData = [];
      for(let key in admin_modules) {
        for(let key1 in admin_modules[key]) {

        admin_modules[key][key1].forEach(element => {
                adminModulesData.push({
                    id: `${key.split(' ').join('_').toLocaleLowerCase()}_${element}`,
                    name: key1,
                    parent_module_id: key.split(' ').join('_').toLocaleLowerCase(),
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                })
            });
        }

      }
      await queryInterface.bulkInsert("modules", adminModulesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
