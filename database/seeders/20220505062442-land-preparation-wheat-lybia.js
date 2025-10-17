'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Wheat-Lybia';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify(['September to October']),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'During land preparation, one ploughing should be done with MB plow and 2-3 ploughing with harrow or cultivator. After this, the land should be leveled after every ploughing. When preparing the field, apply enough cow dung in the soil. Thus, preparation of land like this leads to good deposition of seed and to a certain depth. Due to which, crop growth is good and yield is also high. Along with this, moisture in the land is also very important for its cultivation.',
    ]),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const { id: cropTypeId } = await queryInterface.sequelize.query(
        'SELECT * FROM options WHERE name=? and groupName=?',
        {
          replacements: [cropType, 'crop-type'],
          type: queryInterface.sequelize.QueryTypes.SELECT,
          plain: true,
        }
      );

      const set = recommendation.map(({ moduleAttrId, recommendation }) => ({
        cropTypeId,
        cropVarietyId,
        moduleId,
        moduleAttrId,
        recommendation,
      }));

      await queryInterface.bulkInsert('CropRecommendations', set, {});
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      const { id: cropTypeId } = await queryInterface.sequelize.query(
        'SELECT * FROM options WHERE name=? and groupName=?',
        {
          replacements: [cropType, 'crop-type'],
          type: queryInterface.sequelize.QueryTypes.SELECT,
          plain: true,
        }
      );
      const moduleAttrId = recommendation.map(
        ({ moduleAttrId }) => moduleAttrId
      );
      const where = { cropTypeId, moduleId, moduleAttrId };
      await queryInterface.bulkDelete('CropRecommendations', where, {});
    } catch (err) {
      console.log(err);
    }
  },
};
