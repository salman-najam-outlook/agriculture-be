const _ = require('lodash');
const s3 = require(rootPath + '/components/s3upload.js');
const db = require(rootPath + '/models');
const {
  getAuthToken,
  getSpreadSheetObj,
  exportPdfFromDrive,
} = require('../../components/googleSheetsService');
const spreadsheetId = '1UP0Iz61s_JIBzeGZgxxYxLzihxhOCxf5PVfKdS_0zEk';
const sheetName = 'PRESENTATIONS!A2:C';

module.exports = async function importCropReportPdf() {
  try {
    const auth = await getAuthToken();
    let googlesheetData = await getSpreadSheetObj({
      spreadsheetId,
      sheetName,
      auth,
    });

    // format google sheet data
    googlesheetData = googlesheetData.values
      .filter((row) => !_.isEmpty(row[2]?.trim()) && !_.isEmpty(row[1]?.trim()))
      ?.map((row) => {
        const cropName = row[1];
        const fileUrl = row[2];
        const fileId = row[2].match(/[-\w]{25,}/)[0];
        return { cropName, fileUrl, fileId };
      });

    console.time(
      'time_tracker_________________________________>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    );
    const status = await Promise.allSettled(
      googlesheetData?.map(async (row) => await cropReportPdfSaveAndUpload(row))
    );
    console.timeEnd(
      'time_tracker_________________________________>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    );
    console.log(status);
    return;
  } catch (error) {
    console.log(error.stack, error.message);
  }
};

/**
 * @description function to save and upload crop report pdf data
 * @param {*} object
 * @returns
 */
async function cropReportPdfSaveAndUpload({ cropName, fileId }) {
  // add crop report info if not exist
  let comprehensnsiveAnalysisReport =
    await db.ComprehensnsiveAnalysisReport.findOne({
      where: { name: cropName },
    });

  if (comprehensnsiveAnalysisReport === null) {
    // convert ppt file into pdf and get data
    const result = await exportPdfFromDrive(fileId);
    if (result === false) return;

    // upload file into s3
    const buffer = Buffer.from(result.data);
    const uploadData = await s3.uploadBuffer({
      buffer: buffer,
      type: 'pdf',
    });
    const { Key: fileS3Key, Location: location } = uploadData;
    if (_.isEmpty(fileS3Key)) return;

    // save crop pdf data
    comprehensnsiveAnalysisReport =
      await db.ComprehensnsiveAnalysisReport.create({
        name: cropName,
        fileS3Key,
        location,
      });
  }

  // set map between crop report and crop
  const cropTypes = await db.Option.findAll({
    raw: true,
    attributes: ['id', 'name'],
    where: {
      name: { [db.Sequelize.Op.substring]: cropName },
      groupName: 'crop-type',
    },
  });
  const setMap = cropTypes?.map(({ id: cropTypeId }) => ({
    cropTypeId,
    comprehensnsiveAnalysisReportsId: comprehensnsiveAnalysisReport.id,
  }));
  await db.ComprehensnsiveAnalysisReportsAndCropType.destroy({
    where: {
      comprehensnsiveAnalysisReportsId: comprehensnsiveAnalysisReport.id,
    },
  });
  await db.ComprehensnsiveAnalysisReportsAndCropType.bulkCreate(setMap);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>> promise_added');
  return;
}
