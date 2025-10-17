const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');
const ejsTranslation = require(rootPath + "/locales/ejsTranslation.json")

module.exports = async function farmActivityPdf(data, lang = 'en') {
  try {
    // Read HTML Template
    const filePath = path.resolve(__dirname, "../views/farmerActivityReport.html")
    const template = fs.readFileSync(filePath, 'utf8');

    let html = await ejs.render(template, { 
      data: data,
      translations: ejsTranslation[lang] ?? {},
    });
    let fileName = data.title.split(' ').join('_') + '-' + Date.now() + '.pdf'
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

