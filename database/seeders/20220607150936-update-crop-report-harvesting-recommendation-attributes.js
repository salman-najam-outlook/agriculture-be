'use strict';

const cropRecommendationModuleAttr = {
  'Harvesting Report': [
    { type: 'none', name: 'Harvesting method' },
    { type: 'none', name: 'Yield loss (%)' },
    { type: 'none', name: 'Reason for yield loss' },
    { type: 'none', name: 'Crop residue retention (%)' },
  ],
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      let attributes = [];

      for (const key in cropRecommendationModuleAttr) {
        const moduleId = await queryInterface.rawSelect(
          'CropRecommendationModules',
          { where: { name: key } },
          ['id']
        );
        const set = cropRecommendationModuleAttr[key].map((obj) => {
          return { moduleId, ...obj };
        });
        attributes = [...attributes, ...set];
      }

      await queryInterface.bulkInsert(
        'CropRecommendationModuleAttributes',
        attributes,
        {}
      );
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'CropRecommendationModuleAttributes',
      null,
      {}
    );
  },
};
