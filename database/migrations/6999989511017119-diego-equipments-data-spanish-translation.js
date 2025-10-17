'use strict';

let equipSpanishTranslation = {
  "Precleaner": "Prelimpiador",
  "Juice tank": "Tanque de jugos",
  "Binder or Flocculant": "Aglutinante o Floculante",
  "Defoamer": "Antiespumante",
  "Punts": "Bateas",
  "Pailas or cauldrons": "Pailas o calderos",
  "Refractometer": "Refractómetro",
  "Ph meter": "PH Metro",
  "Ph tape": "Cinta de PH",
  "Thermometer": "Termómetro",
  "Granulator/Pulverizer": "Granuladora/pulverizadora",
  "Screen": "Zaranda",
  "Drying oven": "Horno de secado",
  "Mixer": "Mezcladora",
  "Heat shrink gun": "Pistola de termoencoger",
  "Shrink tunnel": "Tunel de termoencoger",

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
