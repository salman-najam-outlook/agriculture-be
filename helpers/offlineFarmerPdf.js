const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');

module.exports = async function offlineFarmerPdf(data) {
  try {
    // Read HTML Template
    const template = fs.readFileSync(path.resolve(__dirname, "../views/offlineFarmer.html"), 'utf8');
    // console.log(template, 'template')
    let html = await ejs.render(template, { data });
    // console.log(html, 'html')
    let fileName = 'Offline-farmer-list-' + Date.now() + '.pdf'
    fileName = fileName.replace(/\//g, '-')
    const fileDestination = path.resolve(__dirname, `../views/reports/${fileName}`)
    const options = {
      path: fileDestination,
      printBackground: true
    }
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options)
    if (pdf) {
      return {
        fileName,
        path: fileDestination
      }
    }
  } catch (error) {
    console.log(error)
  }
}
