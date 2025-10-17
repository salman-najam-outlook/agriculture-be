const _ = require("lodash");
const s3 = require(rootPath + "/components/s3upload.js");
const db = require(rootPath + "/models");
const {
  getAuthToken,
  getSpreadSheetObj,
  downloadFileFromDrive,
} = require("../../components/googleSheetsService");
const spreadsheetId = "1cgIuNxt4HtJCsSr9klaq11limpFVyVGP9cBVt3l-Fm4";
const sheetName = "Presentation-english!A2:D";

module.exports = async function importCropReportPdf() {
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

const cropTypesToImport = ['rose', 'sweet potato', 'pea', 'cowpea', 'carrot'];
async function cropReportPdfSaveAndUpload(mySheetData, transaction = null) {
  for (let cropType in mySheetData) {
    cropType = cropType?.trim();
    if(!cropTypesToImport.includes(cropType?.toLowerCase())) continue;

    const data = await Promise.allSettled(
      mySheetData[cropType]?.map(async (item) => {
        let comprehensnsiveAnalysisReport =
          await db.ComprehensnsiveAnalysisReport.findOne({
            where: { name: item.crop, type: item.type },
          });

        if (comprehensnsiveAnalysisReport === null) {
          console.log(item.crop, item.type);
          const result = await downloadFileFromDrive(item.fileId);
          if (result === false) return;

          const buffer = Buffer.from(result.data);
          const uploadData = await s3.uploadBuffer({
            buffer: buffer,
            type: "pdf",
          });
          const { Key: fileS3Key, Location: location } = uploadData;
          if (_.isEmpty(fileS3Key)) return;

          comprehensnsiveAnalysisReport =
            await db.ComprehensnsiveAnalysisReport.create({
              name: item.crop,
              type: item.type,
              fileS3Key,
              order: item.order,
              english: location,
            });
        }

        if (comprehensnsiveAnalysisReport) {
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
              fileS3Key,
              english: location,
            },
            { where: { id: comprehensnsiveAnalysisReport.id } },
            {}
          );
        }

        // set map between crop report and crop
        const cropTypes = await db.Option.findAll({
          raw: true,
          attributes: ["id", "name"],
          where: {
            name: { [db.Sequelize.Op.like]: `${item.crop}%` },
            groupName: "crop-type",
          },
        });

        const setMap = cropTypes?.map(({ id: cropTypeId }) => ({
          cropTypeId,
          comprehensnsiveAnalysisReportsId: comprehensnsiveAnalysisReport.id,
        }));

        await db.ComprehensnsiveAnalysisReportsAndCropType.bulkCreate(
          setMap,
          {}
        );
      })
    );
  }
}
