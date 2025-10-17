const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const ejsTranslation = require(rootPath + "/locales/ejsTranslation.json"); // Assuming rootPath is defined elsewhere
const moment = require('moment')
module.exports = async function landReportPdf(req,data,imageBase64,logoBase64) {
  const query = req.body;
  try {
    if (data && data.issuedDate) {
      data.parsedIssuedDate = moment(data.issuedDate).format('DD MMMM YY');
    }

    let land_eval_lists = {};
    if (data && data.land_eval_details) {
      land_eval_lists = data.land_eval_details.reduce((acc, item) => {
        if (!acc[item.group]) {
          acc[item.group] = [item];
        } else {
          acc[item.group].push(item);
        }
        return acc;
      }, {});
    }

    else if(data && data.weather_analysis_details){
      land_eval_lists = data.weather_analysis_details.reduce((acc, item) => {
        if (!acc[item.group]) {
          acc[item.group] = [item];
        } else {
          acc[item.group].push(item);
        }
        return acc;
      }, {});
    }

    data.land_eval_lists = land_eval_lists;

    // DIFFERENT COLORS MAP BASED ON STATUS
    const statusColorMap = {
      "Highly suitable": "suitable-color",
      "Moderately suitable": "moderate-color",
      "Marginally suitable": "marginal-color",
      "Unsuitable": "unsuitable-color",
    };

    const statusBgColorMap = {
      "Highly suitable": "suitable-bg-color",
      "Moderately suitable": "moderate-bg-color",
      "Marginally suitable": "marginal-bg-color",
      "Unsuitable": "unsuitable-bg-color",
    };

    // LAND EVALUATION CRITERIA

    let overallStatus = "";

    if (data.overall_score > 90) {
      overallStatus = "Highly suitable";
    } else if (data.overall_score > 75) {
      overallStatus = "Moderately suitable";
    } else if (data.overall_score > 50) {
      overallStatus = "Marginally suitable";
    } else {
      overallStatus = "Unsuitable";
    }

    data.overallStatus = overallStatus;

    data.report_type = query.report_type;

    const templatePath = "landWeatherReport.html";
    const templateFilePath = path.resolve(__dirname, `../views/${templatePath}`);
    
    const translation = ejsTranslation[req.headers.lang ?? 'en'] || {};

    
    const html = await ejs.renderFile(templateFilePath, {data, statusColorMap, statusBgColorMap,imageBase64,logoBase64, translation }, { async: true });

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html);
   
    const pdfBuffer = await page.pdf({
      format: "a4",
    });

    const filePath = `${query.report_type === "land_suitability" ? "land_suitability" : "weather_analysis"}-${Date.now()}.pdf`.replace(/\//g, "-");

    fs.writeFileSync(filePath, pdfBuffer);

    await browser.close();
    
    return {
      filePath,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
