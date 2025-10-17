'use strict';
const langObj = {  
hi: "hindi",
mr: "marathi",
ne: "nepali",
es: "spanish",
id: "indonesian",
ar: "arabic",
pt: "portugese",
fr: "french",
vi: "vietnamese",
am: "amharic",
so: "somali",
om: "oromo",
bn: "bengali",
sw: "swahili",
el: "greek",
tr: "turkish"}

module.exports ={
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.renameColumn('comprehensnsive_analysis_reports', 'location', 'english');

    // let promArr = []

    // for(let key in langObj) {
    //   promArr.push( await queryInterface.addColumn("comprehensnsive_analysis_reports", langObj[key], {
    //     type: Sequelize.STRING,
    //     allowNull: true
    //   }))
    // }

    // await Promise.all(promArr)
  },
  down: async (queryInterface, Sequelize) => {

  }
};
