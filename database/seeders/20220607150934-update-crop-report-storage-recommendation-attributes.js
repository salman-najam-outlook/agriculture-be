'use strict';

const cropRecommendationModuleAttr = {
  'Storage Report': [
    { type: 'none', name: 'Yield Stored (tonnes/ha)' },
    { type: 'none', name: 'Number of days in storage' },
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
