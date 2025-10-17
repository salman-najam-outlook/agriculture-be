'use strict';

let nepaliTranslation = {
  "रामसाई": "Ramsai",
  "गोलसाई": "Golsai",
  "चिबेसाई": "Chibesai",
  "साउने": "Saune",
  "भरलाङ्गे": "Bharlange",
  "जिरमले": "Jirmale",
  "डम्बर्सी": "Dambersi",
  "रमाला": "Ramala",
  "टिभी २३": "TV 23",
  "UPASI 9 (आर्थरी)": "UPASI 9  (Arthrey)",
  "UPASI 1 (सधैं हरियो)": "UPASI 1 (Ever green)",
  "UPASI 10 (पाण्डियन)": "UPASI 10 (Pandian)",
  "UPSI 14 (सिंगारा)": "UPASI 14 (Singara)",
  "UPASI 2 (जयराम)": "UPASI 2 (Jayaram)",
  "UPASI 17 (सुन)": "UPASI 17 (Swarna)",
  "मासुली": "Masuli",
  "खुमाल ४": "Khumal 4",
  "राम": "Ram",
  "खुमाल ८": "Khumal 8",
  "छोम्मरङ": "Chhommrong",
  "लेकाली धन ३": "Lekali Dhan 3",
  "राधा ४": "Radha 4",
  "जानकी": "Janaki",
  "जुवा": "Judi",
  "शृङ्खला ५२": "Sarju 52",
  "कुफरी ज्योति": "Kufri jyoti",
  "कुफरी सिन्धुरी": "Kufri sindhuri",
  "खुमाल उपहार": "Khumal Upahar",
  "जानकदेव": "Jankdev",
  "खुमाल सेतो-१": "Khumal Seto-1",
  "खुमाल विकास": "Khumal Bikas",
};


module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
          
          let transArr = []

          for(let k in nepaliTranslation) {
            transArr.push({
                nepali: k,
                english: nepaliTranslation[k],

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
