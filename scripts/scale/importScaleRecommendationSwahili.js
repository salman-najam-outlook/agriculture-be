const spreadsheetId = '1ekXfjvdn_YbEC1KfS6oKGpRBOt98WGboRmpx8QkE8OA';
const _ = require('lodash');
const db = require(rootPath + '/models');
const { getAuthToken, getSpreadSheetValues } = require('../../components/googleSheetsService');
const { swahiliTranslation } = require('../cropReportings/translationKeys/swahili');
const { Op } = require('sequelize');

module.exports = async function importSwahiliData(cropType, sheetData) {
  try {
    const sheetName = sheetData.map((data) => data.range);
    const auth = await getAuthToken();
    const { data: googlesheetData } = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });

    let scaleRecommendations = [];
    let _cropType = await db.Option.findOne({
      attributes: ['id'],
      where: {
        name: {
          [Op.or]: [
            { [Op.like]: `%${cropType}%`},
            { [Op.like]: `%${cropType.replace('( ', '(').replace(' )', ')')}%`},
            { [Op.like]: `%${cropType.replace('(', '( ').replace(')', ' )')}%`}
          ]
        },
      },
    });
    // if crop type is empty then don't proceed
    if (_cropType === null) return false;

    for (const [index, { values, range }] of googlesheetData?.valueRanges.entries()) {
      const moduleName = sheetData[index]?.report;
      const module = await db.CropRecommendationModule.findOne({
        raw: true,
        attributes: ['id'],
        where: { name: moduleName },
      });

      for (row of values) {
        try {
          const [moduleAttributeName] = row;
          if (_.isEmpty(moduleAttributeName)) continue;

          if (swahiliTranslation[moduleAttributeName.trim()]) {
            const moduleAttribute = await db.CropRecommendationModuleAttribute.findOne({
              raw: true,
              attributes: ['type', 'id'],
              where: { ddName: swahiliTranslation[moduleAttributeName.trim()] },
            });
            if (_.isEmpty(moduleAttribute) || (moduleAttribute && moduleAttribute.type != 'scale')) continue;

            await db.CropRecommendationModuleAttribute.update(
              {
                swahili: moduleAttributeName,
              },
              {
                where: {
                  id: moduleAttribute.id,
                },
              },
              {}
            );
            let recommendedScale = row[sheetData[index]?.scaleIndex].trim();
            const recommendation = row[sheetData[index]?.recommendationIndex]
              ?.split('•')
              ?.filter((val) => val?.trim() !== '')
              ?.map((val) => val?.trim());
            const note = row[sheetData[index]?.noteIndex]
              ?.split('•')
              ?.filter((val) => val?.trim() !== '')
              ?.map((val) => val?.trim());

            recommendedScale = recommendedScale
              .replace('(give numerical range)', '')
              .replace('•', '')
              .replace(' ', '')
              .replace(' ', '');

            const match = recommendedScale.match(
              /^\s*•?\s*((?<startOpr>[<>+-]\s*)?)(?<start>\d+(?:\.\d+)?)\s*(?:(?<endOpr>[<>+-]|[tT][oO])\s*(?<end>\d+(?:\.\d+)?))?\s*(?<unit>[^\d\s]+)?$/
            );

            let scale = {
              startOpr: null,
              start: null,
              endOpr: null,
              end: null,
              unit: null,
            };
            if (match) {
              scale = {
                startOpr: match.groups.startOpr ?? null,
                start: match.groups.start,
                endOpr: match.groups.endOpr ?? null,
                end: match.groups.end,
                unit: match.groups.unit ?? null,
              };
            }

            scaleRecommendations.push({
              cropTypeId: _cropType?.id,
              moduleId: module?.id,
              moduleAttrId: moduleAttribute?.id,
              recommendation,
              note,
              language: 'swahili',
              ...scale,
            });
          }
        } catch (e) {
          console.log('error =>', e);
        }
      }
    }

    await db.ScaleRecommendation.bulkCreate(scaleRecommendations);
    return true;
  } catch (error) {
    console.log(error.stack, error.message);
    throw error;
  }
};
