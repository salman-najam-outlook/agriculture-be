'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Quinoa-Bolivia';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify(['Aug-Sep']),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'Land should be given couple of ploughings to make weed free and bring the soil to fine tilth stage. Incorporate cattle manure in to the soil with the  last ploughing.',
      'Quinoa requires a level, well-drained seedbed in order to avoid waterlogging.',
      'The ridge and furrow system will give more yield as there is less probability of initial damage to seedlings due to waterlogging.',
      'Seeds can be directly sown in the main field or transplanted.',
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
