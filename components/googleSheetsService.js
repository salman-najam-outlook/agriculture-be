// googleSheetsService.js
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  try {
    const auth = new GoogleAuth({
      scopes: SCOPES,
    });
    const authToken = await auth.getClient();

    return authToken;
  } catch (e) {
    console.log('error in google auth token', e);
  }
}

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const service = google.sheets({ version: 'v4', auth });
  const res = await service.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: sheetName,
    prettyPrint: true,
  });

  return res;
}

async function getSpreadSheetObj({ spreadsheetId, auth, sheetName }) {
  const request = {
    spreadsheetId,
    range: sheetName,
    auth,
  };
  try {
    const service = google.sheets({ version: 'v4', auth });
    const response = (await service.spreadsheets.values.get(request)).data;
    return response;
  } catch (err) {
    throw err;
  }
}

/**
 * Download a Workspace file in PDF format
 * @param{string} fileId file ID
 * @return{obj} file status
 * */
async function exportPdfFromDrive(fileId) {
  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
    ],
  });
  const service = google.drive({ version: 'v3', auth });
  try {
    const result = await service.files.export(
      {
        fileId,
        mimeType: 'application/pdf',
        alt: 'media',
      },
      { responseType: 'arraybuffer' },
    );
    return result;
  } catch (err) {
    console.log(JSON.stringify(err), '___error___>>>>>>>>>>>>>>>');
    return false;
  }
}

/**
 * Downloads a file from drive
 * @param{string} file ID
 * @return{obj} file data
 * */
async function downloadFileFromDrive(fileId) {
  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
    ],
  });
  const service = google.drive({ version: 'v3', auth });

  try {
    const file = await service.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      { responseType: 'arraybuffer' }
    );
    console.log(file.status);
    return file;
  } catch (err) {
    console.log(err, '___error___>>>>>>>>>>>>>>>');
    return false;
  }
}

/**
 * Download a Workspace file in PDF format
 * @param{string} fileId file ID
 * @return{obj} file status
 * */
 async function getSheetsName(spreadsheetId, auth) {
   try {
     const service = google.sheets({ version: 'v4', auth });
     const response = (await service.spreadsheets.get({spreadsheetId})).data;
     return response;
   } catch (err) {
     throw err;
   }
 }

module.exports = {
  getAuthToken,
  getSpreadSheetValues,
  getSpreadSheetObj,
  exportPdfFromDrive,
  downloadFileFromDrive,
  getSheetsName,
};
