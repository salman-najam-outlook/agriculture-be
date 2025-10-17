const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const html_to_pdf = require("html-pdf-node");
const translatedReportData = require("./reportTranslator");

module.exports = async function generatePDFSurveyQuestion(data, req) {
  try {
    // const lang = req.headers.lang ?? "en"
    // if(lang != "en") {
    //   data = translatedReportData(data, lang)
    // }
    // Read HTML Template
    const template = fs.readFileSync(
      path.resolve(__dirname, "../views/pdfCacaoOverviewFarmDetails.html"),
      "utf8"
    );
    let html = await ejs.render(template, { data: data });
    let fileName =
      data.title +
      " - " +
      Date.now() +
      ".pdf";

    fileName = fileName
      .replace(/\s+/g, "")
      .substring(fileName.length - 40, fileName.length); // long filename gave error
    const fileDestination = path.resolve(
      __dirname,
      `../views/reports/${fileName}`
    );
    const footerTemplate = `<div style="width: 100%; background: white; padding: 0px 20px; display: flex; justify-content: space-between; font-size: 10px; color: #333;">
      <div>www.dimitra.io</div>
      <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
      </div>`;
    const options = {
      scale: 0.7,
      displayHeaderFooter: true,
      format: "A4",
      footerTemplate,
      path: fileDestination,
      printBackground: true,
      margin: {
        bottom: "30mm",
      },
    };
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options);
    if (pdf) {
      return {
        fileName,
        path: fileDestination,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
