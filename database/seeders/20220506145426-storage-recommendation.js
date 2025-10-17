'use strict';
const moment = require('moment');
const moduleName = 'Storage Report';
const storageRecommendations = {
  /**Onion-India */
  "Onion-India":[ {
    cropVarietyId:'Agrifound dark red',
    moduleAttrId: 35,
    recommendation:'[ "5 - 7 days after harvesting" ]'
   },
   {
    cropVarietyId:'Baswant 780',
    moduleAttrId:35,
    recommendation: '[ "5 - 7 days after harvesting" ]'
   },
   {
    cropVarietyId:'Pusa red',
    moduleAttrId:35,
    recommendation: '[ "5 - 7 days after harvesting" ]'
   },
   {
    cropVarietyId:'Agrifound dark red',
    moduleAttrId: 36,
    recommendation:'[]'
   },
   {
    cropVarietyId:'Baswant 780',
    moduleAttrId:36,
    recommendation: '[]'
   },
   {
    cropVarietyId:'Pusa red',
    moduleAttrId:36,
    recommendation: '[]'
   },
   {
    cropVarietyId:'Agrifound dark red',
    moduleAttrId: 37,
    recommendation:'["Good (5-6 months)"]'
   },
   {
    cropVarietyId:'Baswant 780',
    moduleAttrId:37,
    recommendation: '[]'
   },
   {
    cropVarietyId:'Pusa red',
    moduleAttrId:37,
    recommendation: '[]'
   },
   {
    cropVarietyId:'Agrifound dark red',
    moduleAttrId: 38,
    recommendation:'["Tops of onions are kept in the field for 2 - 3 days and curing done 3 - 4 days after harvesting to remove excess moisture from the outer skin"]'
   },
   {
    cropVarietyId:'Baswant 780',
    moduleAttrId:38,
    recommendation: '["Tops of onions are kept in the field for 2 - 3 days and curing done 3 - 4 days after harvesting to remove excess moisture from the outer skin."]'
   },
   {
    cropVarietyId:'Pusa red',
    moduleAttrId:38,
    recommendation: '["Tops of onions are kept in the field for 2 - 3 days and curing done 3 - 4 days after harvesting to remove excess moisture from the outer skin."]'
   },
   {
    cropVarietyId:'Agrifound dark red',
    moduleAttrId: 39,
    recommendation:'["Onions are stored in a well-ventilated place with a lot of aeration and sunlight. Onion bulbs are packed in perforated gunny bags/jute bags/wooden baskets or netted bags and stalked in a vertical column. Optimum temperature for storage is 30 - 35˚C with 65 - 70% relative humidity."]'
   },
   {
    cropVarietyId:'Baswant 780',
    moduleAttrId:39,
    recommendation: '["Onions are stored in a well-ventilated place with a lot of aeration and sunlight. Onion bulbs are packed in perforated gunny bags/jute bags/wooden baskets or netted bags and stalked in a vertical column. Optimum temperature for storage is 30 - 35˚C with 65 - 70% relative humidity."]'
   },
   {
    cropVarietyId:'Pusa red',
    moduleAttrId:39,
    recommendation: '["Onions are stored in a well-ventilated place with a lot of aeration and sunlight. Onion bulbs are packed in perforated gunny bags/jute bags/wooden baskets or netted bags and stalked in a vertical column. Optimum temperature for storage is 30 - 35˚C with 65 - 70% relative humidity."]'
   },
  ],
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try{
      let attributes = [];
      const moduleId = await queryInterface.rawSelect(
        'CropRecommendationModules',
        { where: { name: moduleName } },
        ['id']
      );
     
      
      for (const key in storageRecommendations) {
        const cropTypeId = await queryInterface.rawSelect(
          'options',
          { where: { name: key } },
          ['id']
        );
      //  await Promise.all(
        const set = storageRecommendations[key].map(async (obj) => {
       //   console.log('obj :>> ', obj);
          const cropVarietyId = await queryInterface.rawSelect(
            'crops',
            { where: { name: obj.cropVarietyId } },
            ['id']
          );
          console.log('cropVarietyId :>> ', cropVarietyId);
         return { cropTypeId,moduleId, ...obj };
        });
         attributes = [...set];
        
      }
     // console.log('attributes :>> ', attributes);
    // await queryInterface.bulkInsert(
    //   'CropRecommendations',
    //   attributes,
    //   {}
    // );
    }
    catch(err)
    {
      console.log(err)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CropRecommendations', null, {});
  },
};
