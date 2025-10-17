'use strict';
const moment = require("moment");
const { modules } = require("../../helpers/consts");

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
    
     const modulesData = [];
    for(let key in modules) {
      for(let key1 in modules[key]) {
          modules[key][key1].forEach(element => {

              modulesData.push({
                  id: element,
                  name: key1,
                  parent_module_id: key.split(' ').join('_').toLocaleLowerCase(),
                  createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                  updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
              })
          });
      }
    }
     await queryInterface.bulkInsert("modules", modulesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("modules", null, {
      truncate: true,
      cascade: false,
    });
  }
};
