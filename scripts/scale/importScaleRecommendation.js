const spreadsheetId = "1UP0Iz61s_JIBzeGZgxxYxLzihxhOCxf5PVfKdS_0zEk";
const _ = require("lodash");
const db = require(rootPath + "/models");
const {
  getAuthToken,
  getSpreadSheetValues,
} = require("../../components/googleSheetsService");
const { Op } = require("sequelize");

module.exports = async function importData(cropType, sheetData) {
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
        const [moduleAttributeName] = row;
        if (_.isEmpty(moduleAttributeName)) continue;

        const moduleAttribute =
          await db.CropRecommendationModuleAttribute.findOne({
            raw: true,
            attributes: ["type", "id"],
            where: { ddName: moduleAttributeName },
          });
        if (
          _.isEmpty(moduleAttribute) ||
          (moduleAttribute && moduleAttribute.type != "scale")
        )
          continue;

        let recommendedScale = row[sheetData[index]?.scaleIndex].trim();
        const recommendation = row[sheetData[index]?.recommendationIndex]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim())
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
        // const regex = `(?:(?:<\s?|>\s?)?[.0-9]+?\s?(?:to|-|,)?){1,2}\s?[.0-9]+(?=\s?(${acceptedUnits}))`;
        const regex = new RegExp(
          `(?:(?:<\\s?|>\\s?)?[.0-9]{0,}?\\s?(?:to|-|,)?){1,2}\\s?[.0-9]{0,}(?=\\s?(${acceptedUnits}))`,
          "i"
        );
        const result = regex.exec(recommendedScale);
        recommendedScale = recommendedScale
          .replace("(give numerical range)", "")
          .replace("•", "");

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
            start: match.groups.start ? parseFloat(match.groups.start) : null,
            endOpr: match.groups.endOpr ?? null,
            end: match.groups.end ? parseFloat(match.groups.end) : null,
            unit: match.groups.unit ?? null,
          };
        }

        scaleRecommendations.push({
          cropTypeId: _cropType?.id,
          moduleId: module?.id,
          moduleAttrId: moduleAttribute?.id,
          recommendation,
          note,
          language: 'english',
          ...scale,
        });
      }
    }

    await db.ScaleRecommendation.bulkCreate(scaleRecommendations);
    return true;
  } catch (error) {
    throw error;
  }
};
