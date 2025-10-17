'use strict';

let equipCategory = 'Crop Production equipment'

let equipActivity = 'Processing'

let equipmentArr = [

  "Juice tank", "Binder or Flocculant", "Defoamer", "Punts", "Pailas or cauldrons", "Refractometer", "Ph meter", "Ph tape", "Thermometer", "Granulator/Pulverizer", "Screen", "Drying oven", "Mixer", "Heat shrink gun", "Shrink tunnel"
]

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      
        let categoryRes = await queryInterface.rawSelect(
          'equipment_category',
          { where: { name: equipCategory } },
          ['id']
        );

         let activityRes = await queryInterface.insert(
           null,
           "equipment_activity",
           {
             name: equipActivity,
             category: categoryRes,
             createdAt: new Date(),
             updatedAt: new Date(),
           },
           { transaction }
         );

         let equipRes = equipmentArr.map(e => {
          return {
            name : e,
            activity: activityRes[0],
            createdAt: new Date(),
            updatedAt: new Date()
          }
         })

         let equipmentBulkRes = await queryInterface.bulkInsert('equipment_name', equipRes, {transaction} )
        await transaction.commit();
    } catch (error) {
      await transaction?.rollback();
      console.log(error, '=============================');
    }


  
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Currencies', null, {});
  },
};
