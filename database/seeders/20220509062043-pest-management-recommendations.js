'use strict';
const moduleName = 'Pest and Disease Management Report';
const storageRecommendations = {
  /**Onion-India */
  "Onion-India":[ {
    moduleAttrId: 25,
    pestName:"Onion thrips",
    pestSymptoms:'["Attacked leaves have sunken silvery Patches", "Under severe attack, the entire plant appears silvery and later the leaves wither, dry up and die", "The pest excreta appears as black spots on the silvery leaves."]',
    recommendedPrevention:'["Use resistant/tolerant varieties.", "Keep plants well irrigated since water stressed plants are more susceptible to thrips damage", "Maintain weed-free fields/field sanitation.", "Remove heavily infested plants.", "Avoid successive planting of garlic or other preferred/alternate hosts such as cabbage, cotton, tomato, cucumber, melons, pumpkins, strawberries etc."]',
    recommendedTreatment:'["Neem extracts can be sprayed on attacked plants.", "Spray dimethoate 30% EC or oxydemeton methyl 25% EC or quinalphos 25% EC or lambda cyhalothrin 5% EC." ]'
   },
   {
    moduleAttrId:25,
    pestName:"Onion fly",
    pestSymptoms:'["Onion flies eat the lateral roots causing tunnels into the stem then the plants become shrivelled or eventually die.","They are also found inside developing onion bulbs and their feeding exposes the plant to infection by diseases, such as Bacterial Soft Rot."]',
    recommendedPrevention:'["Practice crop rotation.", "Use well decomposed manure/compost.", "Practice field sanitation: remove and destroy infested plants.", "Carefully plough in crop residues immediately after harvest." "]',
    recommendedTreatment:'["Dimethoate 30 % EC (7.0 ml /10 lit)"," Oxydemeton –Methyl 25 % EC (1.2 ml/lit.)", "Quinalphos 25 % EC (1.2 ml/lit.)" ]'
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
        const set = storageRecommendations[key].map(async (obj) => {
          const pestId = await queryInterface.rawSelect(
            'crop_observation_disease',
            { where: { name: obj.pestName } },
            ['id']
          );
         return { cropTypeId,moduleId, ...obj,pestId };
        });
         attributes = [...set];     
      }

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
