'use strict';

let equipActivity = 'Processing'

let equipmentArr = [
'Precleaner'
]

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      
        let activityRes = await queryInterface.rawSelect(
          'equipment_activity',
          { where: { name: equipActivity } },
          ['id']
        );


         let equipRes = equipmentArr.map(e => {
          return {
            name : e,
            activity: activityRes,
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
  },
};
