const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const {
  errorResp,
  successResp,
  errorRespSync,
  serverError,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const axios = require("axios");
const stream = require("stream");
const ejs = require("ejs");
const html_to_pdf = require("html-pdf-node");
const moment = require("moment");
const landWeatherReport = require(rootPath + "/helpers/landWeatherPdf");
const multer = require("multer");
const upload = multer();
const {s3West, s3WestLandWeather} = require(rootPath + '/components/s3-config.js');
const { Op, Sequelize } = require('sequelize');
const join = require("path").join;

const weatherReportInstance = axios.create({
  baseURL: process.env.PYTHON_LAND_WEATHER_BASE_API || "https://land-score-api-prod.dimitra.dev"
});
const translation = require(rootPath + '/middleware/translation');


router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const organization = req.user.organization;

    let {
      page = 1,
      limit = 10,
      col = "createdAt",
      order = "desc",
      search,
      country,
      state,
      filter_date,
      farmId,
      platform = "web",
    } = req.query;

    limit = parseInt(limit);

    let where = {
      is_deleted: 0,
    };

    if (platform == "app") {
      where.user_id = userId;
    }

    if (country) {
      where.country = country;
    }

    if (state) {
      where.state = state;
    }

    if (filter_date) {
      where.issuedDate = {
        [Op.between]: [
          moment.utc(filter_date).startOf('day'),
          moment.utc(filter_date).endOf('day'),
        ],
      };
    }
    if (farmId) {
      where.farm_id = Number(farmId);
    }

    
      let queryOptions = {
        attributes: [
            "id",
            "country",
            "state",
            "latitude",
            "longitude",
            "issuedDate",
            "bbox_coordinates",
            "overall_score"
        ],
        where,
        include: [
            {
                model: db.user,
                as: "user",
                attributes: ["id", "firstName", "middleName","lastName","organization"],
                required: true,
                where: platform === "web" ? { organization } : undefined,
            },
            {
                model: db.user_farm,
                as: "userFarm",
                attributes: ["id", "farmName"],
                required: true,
            },
        ],
        order: [[col, order]],
        distinct: true,
    };

    if (search) {
      queryOptions.where = {
          [Op.and]: [
              where,
              {
                  [Op.or]: [
                      { '$userFarm.farmName$': { [Op.like]: `%${search}%` } },
                      { 'id': { [Op.like]: `%${search}%` } },
                      { [Op.or]: [
                        { '$user.firstName$': { [Op.like]: `%${search}%` } },
                        { '$user.middleName$': { [Op.like]: `%${search}%` } },
                        { '$user.lastName$': { [Op.like]: `%${search}%` } }
                    ]}
                  ]
              }
          ]
      };
    }

    // Skip pagination if the platform is "app"
    if (platform !== "app") {
        queryOptions.offset = (page - 1) * limit;
        queryOptions.limit = limit;
    }

    let result = await db.WeatherAnalysisReport.findAndCountAll(queryOptions);

    return res.json({
        msg: success.FETCH,
        data: result,
  });
  } catch (error) {
    logErrorOccurred(__filename, error);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

router.get("/export/:type", auth, async (req, res) => {
  try {
    let { type } = req.params;
    let where = {
      is_deleted: 0,
    };

    const resData = await db.WeatherAnalysisReport.findAll({
      where,
      attributes: ["id", "country", "latitude", "longitude", "issuedDate"],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "firstName", "middleName","lastName"],
          required: true,
        },
        {
          model: db.user_farm,
          as: "userFarm",
          attributes: ["id", "farmName"],
          required: true,
        },
      ],
    });

    const weatherReports = resData.map((u) => {
      return {
        id: u.id,
        operatorName: `${u.user?.firstName || ''} ${u.user?.middleName || ''} ${u.user?.lastName || ''}`.trim(),
        farmName: u.userFarm?.farmName,
        country: u.country,
        latitude: u.latitude,
        longitude: u.longitude,
        issuedDate: moment(u.issuedDate).format("YYYY-MM-DD"),
      };
    });

    const workbook = xlsx.utils.book_new();
    const landSuitabilitySheet = xlsx.utils.json_to_sheet(weatherReports);
    xlsx.utils.book_append_sheet(workbook, landSuitabilitySheet);
    var readStream = new stream.PassThrough();

    if (type === "csv") {
      // Generate CSV
      const csvBuffer = xlsx.write(workbook, {
        type: "buffer",
        bookType: "csv",
      });
      res.set(
        "Content-Disposition",
        "attachment; filename=weather_analysis_reports.csv"
      );
      res.set("Content-Type", "text/csv");
      res.end(csvBuffer);
      return;
    } else if (type === "xlsx") {
      // Generate XLSX
      const xlsxBuffer = xlsx.write(workbook, { type: "buffer" });
      res.set(
        "Content-Disposition",
        "attachment; filename=weather_analysis_reports.xlsx"
      );
      res.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.end(xlsxBuffer);
    } else if (type === "pdf") {
      let pdfData = await generatePdfReport(weatherReports);

      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed.",
          })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + pdfData.fileName,
        });

        const readStream = fs.createReadStream(pdfData.path);
  
        readStream.on('end', () => {
          // File read complete, now delete the file
          fs.unlink(pdfData.path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            }
          });
        });
      
        readStream.pipe(res);
      }
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

const generatePdfReport = async (data) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "../../../../views/landSuitabilityList.html"
    );
    const template = fs.readFileSync(templatePath, "utf8");

    let html = await ejs.render(template, { data });

    let fileName = "weather-analysis-report-" + Date.now() + ".pdf";
    fileName = fileName.replace(/\//g, "-");
    const fileDestination = path.resolve(
      __dirname,
      `../../../../views/reports/${fileName}`
    );
    const options = {
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
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Rethrow the error to handle it upstream
  }
};
// Generate Land Report

router.get("/get-regions", auth, translation, async (req, res) => {
  try {
    const response = await weatherReportInstance.get("/get-regions");

    return res.json(
      await successResp({
        msg: success.FETCH,
        data: response.data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})
router.post("/generate-report", auth, translation, async (req, res) => {
  try {
    const { farmId, cropId } = req.body;
    const userId = req.user.id;

    // Fetch farm details
    const { lat, log, country, state } = await db.user_farm.findOne({
      where: { id: farmId },
    });

    // Prepare payload for land score API
    const payload = { latitude: lat, longitude: log, crop_id:cropId };

    // Get land score from the API
    const response = await weatherReportInstance.post("/get-land-score",
      payload
    );

    if (response && response.data && response.data.success) {
      const { bbox_coordinates, ...parameterDetails } = response.data;

      // Save weather analysis report
      const weatherAnalysisRes = await db.WeatherAnalysisReport.create({
        user_id: userId,
        farm_id: farmId,
        crop_id: cropId,
        country: country,
        state: state,
        latitude: lat,
        longitude: log,
        issuedDate: Date.now(),
        bbox_coordinates,
        overall_score: response.data.result["overall_score (%)"],
      });

      // Iterate through parameter details
      for (const { param, ...item } of parameterDetails["parameter-details"]) {
        const resultObj = response.data.result[param];

        // Save weather analysis detail
        if (item.group && item.group === "Weather") {
          const weatherAnalysisDetailPayload = {
            weather_report_id: weatherAnalysisRes.id,
            name: item.name,
            group: item.group,
            unit: resultObj?.unit,
            url: resultObj?.url,
            value: resultObj?.value || 0,  //this is for "overall_score (%)": 0,
            status: resultObj?.status || "Unsuitable", //this is for "overall_score (%)": 0,
          };
          const weatherAnalysisDetailRes =
            await db.WeatherAnalysisDetail.create(weatherAnalysisDetailPayload);

          // Save weather analysis classes
          if (item.classes && item.classes.length > 0) {
            const weatherAnalysisClassPayloads = item.classes.map(
              (weatherAnalysItem) => ({
                weather_eval_id: weatherAnalysisDetailRes.id,
                class: weatherAnalysItem.class,
                range: weatherAnalysItem.range,
              })
            );
            await db.WeatherAnalysisClass.bulkCreate(
              weatherAnalysisClassPayloads
            );
          }
        }
      }

      const weatherAnalysisResponse = await getWeatherAnalysisDetail(
        req,
        weatherAnalysisRes.id
      );

      return res.json(
        await successResp({
          msg: success.REGISTERED,
          data: weatherAnalysisResponse.data,
        })
      );
    }

    return res.json(errorRespSync({ msg: response?.data?.message }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get weather report Detail

router.get("/details/:id", auth, translation, async (req, res) => {
  try {
    const weatherReportId = req.params.id;

    const response = await getWeatherAnalysisDetail(req, weatherReportId);

    return res.json(
      await successResp({
        msg: success.FETCH,
        data: response.data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post(
  "/download-report",
  auth,
  translation,
  upload.single("image"),
  async (req, res) => {
    try {
      const { reportId } = req.body;

      req.body.report_type = "weather_suitability";

      const imageBuffer = req.file.buffer;
      const imageBase64 = imageBuffer.toString("base64");
      const logoBase64 = await fs.readFileSync(
        join(__dirname, '../../../../assets/image', 'Cacao1.png'),
        {
          encoding: 'base64',
        },
      );
      const { success, data } = await getWeatherAnalysisDetail(req, reportId);

      if (!success) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Weather analysis detail not found",
          });
      }

      const pdfData = await landWeatherReport(req, data, imageBase64,logoBase64);

      if (!pdfData) {
        return res
          .status(error.code.SERVER_ERROR)
          .json({ success: false, message: "PDF report generation failed" });
      }

      const filePath = pdfData.filePath;

      if (filePath) {
        res.download(filePath, (err) => {
          if (err) {
            console.error(err);
            return res.status(error.code.SERVER_ERROR).json({
              success: false,
              message: "An error occurred while downloading the file",
            });
          } else {
            fs.unlinkSync(filePath);
          }
        });
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);
const getWeatherAnalysisDetail = async (req, weatherAnalysisId) => {

  try {
    const weatherAnalysisRes = await db.WeatherAnalysisReport.findOne({
      where: {
        id: weatherAnalysisId,
      },
      include: [
        {
          model: db.user_farm,
          as: "userFarm",
          attributes: ["id", "farmName", "address"],
          required: false,
        },
        {
          model: db.WeatherAnalysisDetail,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          as: "weather_analysis_details",
          include: [
            {
              model: db.WeatherAnalysisClass,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              as: "weather_eval_class",
            },
          ],
        },
      ],
    });

    if (weatherAnalysisRes && weatherAnalysisRes.weather_analysis_details) {
      try {
        await Promise.all(weatherAnalysisRes.weather_analysis_details.map(async (item) => {
          const params = {
            Bucket: process.env.OMA_BUCKET || "dimitra-data-science-datasets",
            Key: item.url,
            Expires: 60 * 60,
          };
          item.url = await getSignedURLs3West("getObject", params);
        }));
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }

    if (weatherAnalysisRes) {

      let result = weatherAnalysisRes;
      if(result !==null){
        result = await result.toJSON();
        const { weather_analysis_details } = result;
        if(req.headers.lang !=='en'){
          if (weather_analysis_details && weather_analysis_details.length > 0) {
            weather_analysis_details.forEach(item => {
              item.group = req.simpleTranslate(item.group);
              item.name = req.simpleTranslate(item.name);
              item.originalStatus = item.status;
              item.status = req.simpleTranslate(item.status);

              if (item.weather_eval_class && item.weather_eval_class.length > 0) {
                item.weather_eval_class.forEach(evalClass => {
                  evalClass.originalClass = evalClass.class;
                  evalClass.class = req.simpleTranslate(evalClass.class);
                  evalClass.range = req.simpleTranslate(evalClass.range);
                });
              }
            });
          }
        }
        else {
          if (weather_analysis_details && weather_analysis_details.length > 0) {
            weather_analysis_details.forEach(item => {
              item.originalStatus = item.status;

              if (item.weather_eval_class && item.weather_eval_class.length > 0) {
                item.weather_eval_class.forEach(evalClass => {
                  evalClass.originalClass = evalClass.class;
                });
              }
            });
          }
        }
      }


      return { success: true, data: result };
    }

    return { success: false, data: null };
  } catch (err) {
    console.error("Error in getWeatherAnalysis Detail:", err);
    return new Error("Failed to fetch weather analysis detail");
  }
};

  // get signed url of the file REgion west
  const getSignedURLs3West = async (action = "getObject", params) => {
    try {
      var url = s3WestLandWeather.getSignedUrl(action, params);
      return url;
    } catch (err) {
      console.log("inside verify has function ********", err.message);
    }
  };
module.exports = router;
