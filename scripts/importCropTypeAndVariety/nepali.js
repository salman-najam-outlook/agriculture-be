const _ = require("lodash");
const db = require(rootPath + "/models");
const {
  getAuthToken,
  getSpreadSheetObj,
} = require("../../components/googleSheetsService");
const { nepaliTranslation } = require("./translationKeys/nepali");

const spreadsheetId = "1NXKE9HupSQ85SSNTlTcOlcoxuj7Uaw_0jj4yFxxmplo"; //new sheet id
const sheetName = "Crop types and varieties nepali!A2:J"; //new sheet name

module.exports = async function importCropTypeAndVarietyNepali() {
  try {
    const auth = await getAuthToken();
    const googlesheetData = await getSpreadSheetObj({
      spreadsheetId,
      sheetName,
      auth,
    });

    // create an object of crop types and each crop types will have array of its variety
    let currentCropType = "";
    let cropTypeAndVarietyData = googlesheetData?.values
      .filter((arr) => arr.length > 0)
      ?.reduce((total, [cropType, cropVariety]) => {
        cropType = cropType?.trim();
        cropVariety = cropVariety?.trim();

        switch (true) {
          case !_.isEmpty(cropType) && _.isEmpty(total[cropType]):
            currentCropType = cropType;
            if (_.isEmpty(cropVariety)) return { [cropType]: [], ...total };
            else return { [cropType]: [cropVariety], ...total };

          case _.isEmpty(cropType) &&
            _.isArray(total[currentCropType]) &&
            !_.isEmpty(cropVariety):
            total[currentCropType].push(cropVariety);
            return total;

          default:
            return total;
        }
      }, {});

    // format data for importing general crop information and return an object
    currentCropType = "";
    let generalCropInfo = googlesheetData?.values
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
            harvestingSeason,
            potentialYield,
            storability,
            maturityIndices,
            uniqueFactorOfVariety,
          ]
        ) => {
          cropType = cropType?.trim();
          cropVariety = cropVariety?.trim();
          region = region?.trim() ?? "";
          season = season?.trim() ?? "";
          requiredDaysForCropMature = requiredDaysForCropMature?.trim() ?? "";
          harvestingSeason = harvestingSeason?.trim() ?? "";
          potentialYield = potentialYield?.trim() ?? "";
          storability = storability?.trim() ?? "";
          maturityIndices = maturityIndices?.trim() ?? "";
          uniqueFactorOfVariety = uniqueFactorOfVariety?.trim() ?? "";

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

            case _.isEmpty(cropType) &&
              _.isArray(total[currentCropType]) &&
              !_.isEmpty(cropVariety):
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

    await saveGeneralCropInformation(generalCropInfo);

    return true;
  } catch (error) {
    console.log(error.stack, error.message);
  }
};

async function saveGeneralCropInformation(mySheetData, transaction = null) {
  let setBulkData = [];

  for (let cropType in mySheetData) {
    cropType = cropType?.trim();

    let createdCropType = await db.Option.findOne({
      raw: true,
      where: { name: cropType, groupName: "crop-type" },
    });

    if (createdCropType) {
      for (let { cropVariety, ...rest } of mySheetData[cropType]) {
        let createdCropVariety = await db.Crop.findOne({
          raw: true,
          where: {
            name: nepaliTranslation[cropVariety] || cropVariety,
            cropTypeOptId: createdCropType.id,
          },
        });

        if (createdCropVariety === null) continue;

        const existGeneralCropInfo =
          await db.GeneralCropInformationRecommendation.findOne({
            where: {
              cropTypeId: createdCropType.id,
              cropVarietyId: createdCropVariety.id,
              language: "nepali",
            },
          });

        if (!existGeneralCropInfo) {
          setBulkData.push({
            cropTypeId: createdCropType.id,
            cropVarietyId: createdCropVariety.id,
            ...rest,
            language: "nepali",
          });
        }
      }
    }
  }

  await db.GeneralCropInformationRecommendation.bulkCreate(setBulkData, {
    transaction,
  });

  return true;
}
