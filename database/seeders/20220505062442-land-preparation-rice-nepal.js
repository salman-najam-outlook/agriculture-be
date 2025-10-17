'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Rice-Nepal';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify(['May-July']),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'Primary tillage is to attain a reasonable depth of soft soil, incorporate crop residues, kill weeds, and to aerate the soil. Secondary tillage is any subsequent tillage, to incorporate fertilizers, mulching during nursery period, reduce the soil to a finer tilth, Puddling the field, level the surface, or control weeds. should be supplied with good quality manure and regular irrigation.',
      'Preparation of nursery area: Prepare 100 m2 nurseries to plant 1 ha. Select a levelled area near the water source. Spread a plastic sheet or used polythene gunny bags on the shallow raised bed to prevent roots growing deep into soil.',
      '-The area should have an assured water supply and an efficient drainage system.',
      '-It should be dry ploughed twice.',
      'Preparation of soil mixture: Mix 70% soil + 20% well-decomposed pressmud / bio-gas slurry / FYM + 10% rice hull. Incorporate in the soil mixture 1.5 kg of powdered di -ammonium phosphate or 2 kg 17-17-17 NPK fertilizer after bed preparation.',
      '-After levelling and final puddling, beds of convenient length (8-10 m) with width of 2.5 m are to be made, leaving 30 - 50 cm channels in between two beds. Sow the sprouted seeds uniformly on the seedbed.',
      'Seed Treatment: Treat the seeds in Carbendazim or Pyroquilon or Tricyclozole solution at 2 gm/lit of water for 1 kg of seeds and also Treat the seeds with Pseudomonas fluorescens 10gm/kg and soak in 1 lit of water overnight. Decant the excess water and allow the seeds to sprout for 24 hrs and then sow.',
      'Water management: Drain the water 18 to 24hrs after sowing.',
      '-Allow enough water to saturate the soil from 3rd to 5th day. From 5th day onwards, increase the water depth to 1.5cm depending on the height of the seedlings. Thereafter maintain 2.5cm depth of water.',
      'Pest management: Spray Monocrotophos 36 SL 40 ml (or) Quinalphos 25 EC 80 ml. when Caterpillars feed on green tissues of the leaves and leave become whitish papery.',
      '-Apply pre-emergence herbicides viz., Pretilachlor + safener @ 0.3kg/ha, on 3rd or 4th day after sowing to control weeds',
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
