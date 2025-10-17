const _ = require('lodash');
const db = require(rootPath + '/models');
const { getAuthToken, getSpreadSheetObj } = require('../../components/googleSheetsService');
const { Op } = require('sequelize');

module.exports = async function importCropTypeVarietyAndInfo({
  spreadsheetId,
  sheetName,
  translation,
  language,
  shouldImportTypeAndVariety = false,
}) {
  try {
    const auth = await getAuthToken();
    const googlesheetData = await getSpreadSheetObj({
      spreadsheetId,
      sheetName,
      auth,
    });

    if (shouldImportTypeAndVariety) {
      const cropTypeAndVariety = getCropTypeAndVarietyFromSheet(googlesheetData);
      await saveCropTypeAndVariety(cropTypeAndVariety);
    }

    const generalCropInfoRecommendation = getGeneralCropInfoRecommendationFromSheet(googlesheetData);
    await saveGeneralCropInformation(generalCropInfoRecommendation, translation, language);
    return true;
  } catch (error) {
    console.log(error.stack, error.message);
  }
};

function getCropTypeAndVarietyFromSheet(googlesheetData) {
  let currentCropType = '';
  const cropTypeAndVarietyData = googlesheetData?.values
    .filter((arr) => arr.length > 0)
    ?.reduce((total, [cropType, cropVariety]) => {
      cropType = cropType?.trim();
      cropVariety = cropVariety?.trim();

      switch (true) {
        case !_.isEmpty(cropType) && _.isEmpty(total[cropType]):
          currentCropType = cropType;
          if (_.isEmpty(cropVariety)) return { [cropType]: [], ...total };
          else return { [cropType]: [cropVariety], ...total };

        case _.isEmpty(cropType) && _.isArray(total[currentCropType]) && !_.isEmpty(cropVariety):
          total[currentCropType].push(cropVariety);
          return total;

        default:
          return total;
      }
    }, {});
  return cropTypeAndVarietyData;
}

function getGeneralCropInfoRecommendationFromSheet(googlesheetData) {
  let currentCropType = '';
  const generalCropInfoRecommendation = googlesheetData?.values
    .filter((arr) => arr.length > 0)
    ?.reduce(
      (
        total,
        [
          cropType,
          cropVariety,
          region,
          season,
          requiredDaysForCropMature,
          firstHarvestingAfterPlantingTrees,
          harvestingSeason,
          potentialYield,
          storability,
          maturityIndices,
          uniqueFactorOfVariety,
        ]
      ) => {
        cropType = cropType?.trim();
        cropVariety = cropVariety?.trim();
        region = region?.trim() ?? '';
        season = season?.trim() ?? '';
        requiredDaysForCropMature = requiredDaysForCropMature?.trim() ?? '';
        harvestingSeason = harvestingSeason?.trim() ?? '';
        potentialYield = potentialYield?.trim() ?? '';
        storability = storability?.trim() ?? '';
        maturityIndices = maturityIndices?.trim() ?? '';
        uniqueFactorOfVariety = uniqueFactorOfVariety?.trim() ?? '';

        switch (true) {
          case !_.isEmpty(cropType) && _.isEmpty(total[cropType]):
            currentCropType = cropType;
            if (_.isEmpty(cropVariety)) return { [cropType]: [], ...total };
            else
              return {
                [cropType]: [
                  {
                    cropVariety,
                    region,
                    season,
                    requiredDaysForCropMature,
                    harvestingSeason,
                    potentialYield,
                    storability,
                    maturityIndices,
                    uniqueFactorOfVariety,
                  },
                ],
                ...total,
              };

          case _.isEmpty(cropType) && _.isArray(total[currentCropType]) && !_.isEmpty(cropVariety):
            total[currentCropType].push({
              cropVariety,
              region,
              season,
              requiredDaysForCropMature,
              harvestingSeason,
              potentialYield,
              storability,
              maturityIndices,
              uniqueFactorOfVariety,
            });
            return total;

          default:
            return total;
        }
      },
      {}
    );
  return generalCropInfoRecommendation;
}

async function saveCropTypeAndVariety(mySheetData) {
  const transaction = await db.sequelize.transaction();
  try {
    for (let cropType in mySheetData) {
      cropType = cropType?.trim();
      
      let createdCropType = await db.Option.findOne({
        where: {
          name: {
            [Op.in]: [cropType, cropType.replace('( ', '(').replace(' )', ')')]
          },
          groupName: 'crop-type'
        },
      }, { transaction });
  
      if (createdCropType === null) {
        createdCropType = await db.Option.create(
          {
            name: cropType,
            groupName: 'crop-type',
          },
          { transaction }
        );
      }
  
      // filter all crop variety which are already added and add new ones
      const setCropVariety = (
        await Promise.all(
          mySheetData[cropType]?.map(async (name) => {
            const status = await db.Crop.findOne({
              where: { cropTypeOptId: createdCropType.id, name },
            }, { transaction });
            if (status === null) return name;
            return null;
          })
        )
      )
        ?.filter(Boolean)
        ?.map((name) => ({
          name,
          cropTypeOptId: createdCropType.id,
        }));
  
      await db.Crop.bulkCreate(setCropVariety, { transaction });
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
}

async function saveGeneralCropInformation(generalCropInfoRecommendation, translation, language) {
  const transaction = await db.sequelize.transaction();
  try {
    const newGeneralCropInfoRecommendation = [];
  
    for (let cropTypeName in generalCropInfoRecommendation) {
      cropTypeName = cropTypeName?.trim();
  
      const cropType = await db.Option.findOne({
        where: {
          name: {
            [Op.in]: translation[cropTypeName] ? [translation[cropTypeName], cropTypeName] : [cropTypeName],
          },
          groupName: 'crop-type',
        },
      }, { transaction });
  
      if (cropType) {
        for (let { cropVariety, ...rest } of generalCropInfoRecommendation[cropTypeName]) {
          const cropVarietyModel = await db.Crop.findOne({
            where: {
              name: {
                [Op.in]: translation[cropVariety] ? [translation[cropVariety], cropVariety] : [cropVariety],
              },
              cropTypeOptId: cropType.id,
            },
          }, { transaction });
  
          if (!cropVarietyModel) continue;
  
          const existingGeneralCropInfoRecommendation = await db.GeneralCropInformationRecommendation.findOne({
            where: {
              cropTypeId: cropType.id,
              cropVarietyId: cropVarietyModel.id,
              language,
            },
          }, { transaction });
  
          if (!existingGeneralCropInfoRecommendation) {
            newGeneralCropInfoRecommendation.push({
              ...rest,
              cropTypeId: cropType.id,
              cropVarietyId: cropVarietyModel.id,
              language,
            });
          }
        }
      }
    }
    await db.GeneralCropInformationRecommendation.bulkCreate(newGeneralCropInfoRecommendation, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
}
