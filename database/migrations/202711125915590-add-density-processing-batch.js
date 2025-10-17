'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('BuyingStationProcessingBatches', 'density', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });

    // await queryInterface.addColumn('BuyingStationProcessingBatches', 'density_unit', {
    //   allowNull: true,
    //   type: Sequelize.INTEGER,
    //   references: { model: 'units_list', key: 'id' },
    //   onDelete: 'CASCADE'
    // });

    let densityExists =  [], densityId = null, unitExists = []
    densityExists = await queryInterface.sequelize.query(
      'SELECT * FROM unit_types where name = "Density"', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      });
      if(densityExists.length > 0) {
        unitExists = await queryInterface.sequelize.query(
          'SELECT * FROM units_list where name = "kg/cm3"', {
            type: queryInterface.sequelize.QueryTypes.SELECT
          });
          if(unitExists.length == 0) {
            await queryInterface.bulkInsert('units_list', [
               {
                 name : "kg/cm3",
                 abbvr: "kg/cm3",
                 unitType: densityExists[0].id,
                 createdAt: new Date(), updatedAt: new Date()
               }
             ])
          }
      } else {
       densityId =await  queryInterface.bulkInsert('unit_types', [
          {
            name : "Density",
            createdAt: new Date(), updatedAt: new Date()
          }
        ])
            await queryInterface.bulkInsert('units_list', [
            {
              name : "kg/cm3",
              abbvr: "kg/cm3",
              unitType: densityId,
              createdAt: new Date(), updatedAt: new Date()
            }
          ])
      }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('BuyingStationProcessingBatches', 'density');
    // await queryInterface.removeColumn('BuyingStationProcessingBatches', 'density_unit');
  },
};
