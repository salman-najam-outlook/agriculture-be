const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');
const translatedReportData = require('./reportTranslator');

module.exports = async function generatePDF(data, req, templateName = 'pdfReport') {
  try {
    let fileName = data.title;
    if (data.subHeader && Object.keys(data.subHeader).length) {
      for (const key in data.subHeader) {
        fileName += '-' + data.subHeader[key];
      }
    }
    fileName += `-${Date.now()}-${req.headers?.lang ?? 'en'}.pdf`;
    fileName = fileName.split(' ').join('-');
    fileName = fileName.replace(/\//g, '-');
    if (req.headers.lang != 'en') {
      data = translatedReportData(data, req.headers.lang);
    }
    // Read HTML Template
    const template = fs.readFileSync(path.resolve(__dirname, `../views/${templateName}.html`), 'utf8');
    // console.log(template, 'template')
    let html = await ejs.render(template, { data: data });
    // console.log(html, 'html')
    const fileDestination = path.resolve(__dirname, `../views/reports/${fileName}`);
    const options = {
      format: 'A4',
      path: fileDestination,
      printBackground: true,
    };
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options);
    if (pdf) {
      return {
        fileName,
        path: fileDestination,
      };
    }

  } catch (err) {
    console.log(err)
  }
}

