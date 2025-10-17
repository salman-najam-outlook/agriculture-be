'use strict';

const cropRecommendationModuleAttr = {
  'Weeding Report': [
    { type: 'none', name: 'Number of days after sowing that weeding was carried out' },
    { type: 'none', name: 'Type of cultural/mechanical/manual method' },
    { type: 'none', name: 'Herbicide dose/rate (litres/ha)' },
    { type: 'none', name: 'Herbicide application method' },
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
