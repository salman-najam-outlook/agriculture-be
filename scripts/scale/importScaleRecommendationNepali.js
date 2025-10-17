const spreadsheetId = '1gOOyvURcqixt5XQAnfTUlfyhFLOI2c_do9YShBVL_xM';
const _ = require("lodash");
const db = require(rootPath + "/models");
const {
  getAuthToken,
  getSpreadSheetValues,
} = require("../../components/googleSheetsService");
const {
  nepaliTranslation,
} = require("../cropReportings/translationKeys/nepali");
const { Op } = require('sequelize');

module.exports = async function importNepaliData(cropType, sheetData) {
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
      attributes: ["id"],
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

    for (const [
      index,
      { values, range },
    ] of googlesheetData?.valueRanges.entries()) {
      const moduleName = sheetData[index]?.report;
      const module = await db.CropRecommendationModule.findOne({
        raw: true,
        attributes: ["id"],
        where: { name: moduleName },
      });

      for (row of values) {
        try {
          const [moduleAttributeName] = row;
          if (_.isEmpty(moduleAttributeName)) continue;

          if (nepaliTranslation[moduleAttributeName]) {
            const moduleAttribute =
              await db.CropRecommendationModuleAttribute.findOne({
                raw: true,
                attributes: ["type", "id"],
                where: { ddName: nepaliTranslation[moduleAttributeName] },
              });
            if (
              _.isEmpty(moduleAttribute) ||
              (moduleAttribute && moduleAttribute.type != "scale")
            )
              continue;

            await db.CropRecommendationModuleAttribute.update(
              {
                nepali: moduleAttributeName,
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
              ?.split("•")
              ?.filter((val) => val?.trim() !== "")
              ?.map((val) => val?.trim());
            const note = row[sheetData[index]?.noteIndex]
              ?.split("•")
              ?.filter((val) => val?.trim() !== "")
              ?.map((val) => val?.trim());

            const acceptedUnits = [
              `Kg\/ha \\+ 1\% K2O foliar spay`,
              `Kg\/ha`,
              `kg`,
              `cm`,
              `ton`,
              `\%`,
              `mg\/kg critical\/optimal soil P`,
              `mg\/kg`,
              `mg\/g`,
              `Threshold Soil exch\. K cmolc\/kg`,
              `ppm or mg/kg`,
              `Threshold Soil exch\. K cmolc\/kg`,
              `mg\/kg critical\/optimal soil P`,
            ].join("|");
            const regex = new RegExp(
              `(?:(?:<\\s?|>\\s?)?[.0-9]{0,}?\\s?(?:to|-|,)?){1,2}\\s?[.0-9]{0,}(?=\\s?(${acceptedUnits}))`,
              "i"
            );
            const result = regex.exec(recommendedScale);
            recommendedScale = recommendedScale
              .replace("(give numerical range)", "")
              .replace("•", "")
              .replace(" ", "")
              .replace(" ", "");

            recommendedScale = verifyAndTranslateNumber(recommendedScale);

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
              language: "nepali",
              ...scale,
            });
          }
        } catch (e) {
          console.log("error =>", e);
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

function isNepaliNumber(number) {
  const nepaliDigits = /[०-९]/;
  return nepaliDigits.test(number);
}

function translateNepaliToEnglish(nepaliNumber) {
  const nepaliToEnglishMap = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };

  let englishNumber = "";
  for (let i = 0; i < nepaliNumber.length; i++) {
    const digit = nepaliNumber[i];
    const englishDigit = nepaliToEnglishMap[digit];
    englishNumber += englishDigit || digit;
  }

  return englishNumber;
}

function verifyAndTranslateNumber(number) {
  if (isNepaliNumber(number)) {
    return translateNepaliToEnglish(number);
  }
  return number;
}
