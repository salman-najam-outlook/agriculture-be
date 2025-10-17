'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Barley';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify([]),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'Two to three ploughing with cultivator followed by planking after every ploughing. To save the crop from Termite, Ants and other insect, seed treatment is advisable.',
      'Field is prepared with disc harrow and cultivator then planking is done.',
      'Land levelling is very important as barley crop is very sensitive to excess water and nitrogen.',
      'Appropriate bunding of field is essential for proper irrigation.',
      'In case of irrigated barley cultivation, pre-sowing is essential for proper germination.',
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
