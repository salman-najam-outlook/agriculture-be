const _ = require("lodash");
const s3 = require(rootPath + "/components/s3upload.js");
const db = require(rootPath + "/models");
const {
  getAuthToken,
  getSpreadSheetObj,
  downloadFileFromDrive,
} = require("../../components/googleSheetsService");
const spreadsheetId = "1cgIuNxt4HtJCsSr9klaq11limpFVyVGP9cBVt3l-Fm4";
const sheetName = "Presentation-nepali!A2:D";

module.exports = async function importNepaliCropReportPdf() {
  try {
    const auth = await getAuthToken();
    let googlesheetData = await getSpreadSheetObj({
      spreadsheetId,
      sheetName,
      auth,
    });

    let currentCrop = "";

    let crops = googlesheetData?.values
      .filter((arr) => arr.length > 0)
      ?.reduce((total, [crop, type, link, order]) => {
        crop = crop?.trim();
        switch (true) {
          case !_.isEmpty(crop) && _.isEmpty(total[crop]):
            currentCrop = crop;
            if (_.isEmpty(link)) return { [crop]: [], ...total };
            return {
              [crop]: [
                {
                  crop,
                  type,
                  link,
                  fileId: link.match(/[-\w]{25,}/)[0],
                  order,
                },
              ],
              ...total,
            };

          case _.isEmpty(crop) &&
            _.isArray(total[currentCrop]) &&
            !_.isEmpty(link):
            total[currentCrop].push({
              crop: currentCrop,
              type,
              link,
              fileId: link.match(/[-\w]{25,}/)[0],
              order,
            });
            return total;

          default:
            return total;
        }
      }, {});

    await cropReportPdfSaveAndUpload(crops);
  } catch (error) {
    console.log(error.stack, error.message);
  }
};

/**
 * @description function to save and upload crop report pdf data
 * @param {*} object
 * @returns
 */

async function cropReportPdfSaveAndUpload(mySheetData, transaction = null) {
  for (let cropType in mySheetData) {
    cropType = cropType?.trim();

    const data = await Promise.allSettled(
      mySheetData[cropType]?.map(async (item) => {
        let comprehensnsiveAnalysisReport =
          await db.ComprehensnsiveAnalysisReport.findOne({
            where: { name: item.crop, type: item.type },
          });

        if (comprehensnsiveAnalysisReport) {
            console.log(comprehensnsiveAnalysisReport.id)
          const result = await downloadFileFromDrive(item.fileId);
          if (result === false) return;

          const buffer = Buffer.from(result.data);
          const uploadData = await s3.uploadBuffer({
            buffer: buffer,
            type: "pdf",
          });
          const { Key: fileS3Key, Location: location } = uploadData;
          if (_.isEmpty(fileS3Key)) return;

          await db.ComprehensnsiveAnalysisReport.update(
            {
              nepali: location,
            },
            { where: { id: comprehensnsiveAnalysisReport.id } },
            {}
          );
        }
      })
    );
  }
}
