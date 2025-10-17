'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Cardamom-Nepal';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify([
      'Field should be ploughed, pits taken and filled the pits with manures and mulch during april-may.',
      'Large cardamom grows well in forest loamy soils with gentle to medium slopes.',
      'It performs well under partial shade (50 %) and hence, shade management is by growing agroforestry trees are recommended.',
      'Alnus nepalensis (Himalayan alder) is the most common shade tree grown for shade management in the main field.',
    ]),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'Primary nursery : Seed bed of 15-25 cm ht * 1 m width * 6 m length should be prepared during Dec month. Secondary nursery: saplings at 3-4 leaf stage has to be sown in new seed bed at 1*1 feet spacing. Seed beds should be supplied with good quality manure and regular irrigation. Seeds taken from well matured capsules should be treated with 25% nitric acid and wash it in running water for a seed treatment. Sowing with the treated seeds can be carried out in Feb month. 80-100 grams of seeds sown per bed in lines spaced 10 cm apart. Sown seeds should be covered with fine soil and mulching material like paddy straw, dry grass to thickness of 10-15cm in the primary nursery.',
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
