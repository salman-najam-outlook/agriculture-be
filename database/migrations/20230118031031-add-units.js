'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    let densityExists =  [], densityId = null, unitExists = []
    densityExists = await queryInterface.sequelize.query(
      'SELECT * FROM unit_types where name = "CoffeeParchmentDensityUnit"', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      });
      console.log(densityExists);
      if(densityExists.length > 0) {
        await queryInterface.bulkInsert('units_list', [
            {
              name : "kg/cm3",
              abbvr: "kg/cm3",
              unitType: densityExists[0].id,
              createdAt: new Date(), updatedAt: new Date()
            },
            {
              name : "gr/m3",
              abbvr: "gr/m3",
              unitType: densityExists[0].id,
              createdAt: new Date(), updatedAt: new Date()
            },
          ])
      } else {
       densityId =await  queryInterface.bulkInsert('unit_types', [
          {
            name : "CoffeeParchmentDensityUnit",
            createdAt: new Date(), updatedAt: new Date()
          }
        ])

        await queryInterface.bulkInsert('units_list', [
          {
            name : "kg/cm3",
            abbvr: "kg/cm3",
            unitType: densityExists[0].id,
            createdAt: new Date(), updatedAt: new Date()
          },
          {
            name : "gr/m3",
            abbvr: "gr/m3",
            unitType: densityExists[0].id,
            createdAt: new Date(), updatedAt: new Date()
          },
        ])
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
