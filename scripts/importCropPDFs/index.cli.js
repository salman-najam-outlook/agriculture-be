#!/usr/bin/env node
const app = require('../../app');
const importCropReportPdf = require('./new-script');
const importOtherLangPdfReport = require('./lang');
const db = require(rootPath + '/models');

const OTHER_LANG_PDF_CONFIG = [
  {
    spreadsheetId: '1cgIuNxt4HtJCsSr9klaq11limpFVyVGP9cBVt3l-Fm4',
    sheetName: 'Presentation-spanish!A2:D',
    language: 'spanish',
  },
  // {
  //   spreadsheetId: '1cgIuNxt4HtJCsSr9klaq11limpFVyVGP9cBVt3l-Fm4',
  //   sheetName: 'Presentation-nepali!A2:D',
  //   language: 'nepali',
  // },
  // {
  //   spreadsheetId: '1cgIuNxt4HtJCsSr9klaq11limpFVyVGP9cBVt3l-Fm4',
  //   sheetName: 'Presentation-swahili!A2:D',
  //   language: 'swahili',
  // },
  {
    spreadsheetId: '1cgIuNxt4HtJCsSr9klaq11limpFVyVGP9cBVt3l-Fm4',
    sheetName: 'Presentation-portugese!A2:D',
    language: 'portugese',
  },
];

async function main() {
  // await db.ComprehensnsiveAnalysisReportsAndCropType.destroy({
  //   where: {},
  //   truncate: true,
  // });
  // await importCropReportPdf();
  await Promise.all(
    OTHER_LANG_PDF_CONFIG.map(({ language, sheetName, spreadsheetId }) =>
      importOtherLangPdfReport(spreadsheetId, sheetName, language)
    )
  );
  console.log('ran successfully............');
  process.exit();
}

main();
