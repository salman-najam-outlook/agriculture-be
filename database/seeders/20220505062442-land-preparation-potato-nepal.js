'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Potato-Nepal';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify([
      'Plains: Sep-Oct',
      'Mid: Aug-Nov',
      'Hills: Dec-Feb',
    ]),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'Flat bed method(Land should ploughed at a depth of 20-25 cm and incorporate FYM during last ploughing): The whole plot has to be divided into beds of convenient length and width. Open shallow furrows and potato tubers can be planted and covered with the original soil of furrows.',
      'Ridge and furrow planting(Land should ploughed at a depth of 20-25 cm and incorporate FYM during last ploughing): Furrows are opened at a distance of 50-60 cm before planting.The whole or cut tubers are planted 15- 20 cm apart on the centre of the ridge at a depth of 5-10 cm and covered with soil.',
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
