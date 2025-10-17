'use strict';

let equipSpanishTranslation = {
  "Inns": "Mesones",
  "Product Processing": "Procesamiento de productos",
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
          
          let transArr = []

          for(let k in equipSpanishTranslation) {
            transArr.push({
                english: k,
                spanish: equipSpanishTranslation[k]
            })
          }

         let equipmentBulkRes = await queryInterface.bulkInsert('global_translation_metadata', transArr, {transaction} )
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
