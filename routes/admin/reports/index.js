const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const {
  successRespSync,
  successResp,
  serverError,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const shortid = require("short-uuid");
const { v4: uuidv4 } = require("uuid");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  "/helpers/general");
const organizationValidator = require(rootPath +
  "/helpers/validators/organization");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const {
  regionInfo,
  farmerInfo,
  farmInfo,
  farmReport,
  cropInfo,
  pestsInfo,
  equipmentsInfo,
  goalsInfo,
  yieldInfo,
  soilInfo,
  getUserFarmData,
  allFarmCoordinates,
} = require("./utils");
const rp = require("request-promise");
const moment = require("moment");
const fs = require("fs");
const join = require("path").join;
const xlsx = require("xlsx");
router.use("/dashboard", require("./dashboard"));
router.use("/crop-health-reports", require("./crop-health"));
const translation = require(rootPath + "/middleware/translation");
const farmReportPdf = require(rootPath + "/helpers/farmReportPdf");
const AWSS3 = require(rootPath + "/components/s3.js");
const s3 = AWSS3.getClient();
const writeToBlockChain = require("./../../../helpers/blockchain");

// WEATHER & LAND REPORTS ROUTES START HERE
router.get("/all-farms", auth, async (req, res) => {
  try {
    const orgId = req.user.organization;

    let where = {
      isDeleted: 0,
    };

    let userWhere = {};

    if (orgId) {
      userWhere.organization = orgId;
    }

    const result = await db.user_farm.findAll({
      attributes: ["id", "userId", "farmName", "lat", "log"],
      where,
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "firstName","middleName", "lastName", "organization"],
          where: userWhere,
          required: true,
        },
      ],
    });

    return res.json(
      await successResp({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.use("/land-suitability", require("./landSuitabilityReports"));

router.use("/weather-analysis", require("./weatherAnalysisReports"));

// WEATHER & LAND REPORTS ROUTES END HERE

router.get("/map-farms", auth, async (req, res) => {
  try {
    let { page = 1, limit = 100 } = req.query; // Default to page 1 and limit 10 if not provided
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const data = await allFarmCoordinates(req, { offset, limit });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/regions", auth, translation, async (req, res) => {
  try {
    const data = await regionInfo(req);

    if (req.headers.lang && req.headers.lang != "en") {
      data.regionalChart = req.translateFunction(
        data?.regionalChart,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
      data.regionalList = req.translateFunction(
        data?.regionalList,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
      data.regionalStat = req.translateFunction(
        data?.regionalStat,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/farmers", auth, async (req, res) => {
  try {
    const data = await farmerInfo(req);

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/farms", auth, async (req, res) => {
  try {
    const data = await farmInfo(req);

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/farmers-options", auth, async (req, res) => {
  try {
    const { organization } = req.user;

    const farmersOptionsQuery = `
      SELECT
        id,
        CONCAT(firstName, ' ', COALESCE(middleName, ''), IF(middleName IS NOT NULL, ' ', ''), lastName) AS fullName
      FROM users
      WHERE organization = :organization
    `;
  
    const farmersOptions = await db.sequelize.query(farmersOptionsQuery, {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { organization }, // Using query parameters to avoid SQL injection
    });

    return res.json({
      success: true,
      data: farmersOptions,
    });
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/farmers/byGender", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    let { sDate, eDate, country, state, countryCode } = req.query;
    let filter = "",
      countryFilter = "";

    if (sDate && eDate) {
      filter = `createdAt >= '${sDate}' AND createdAt <= '${eDate}' AND `;
    }

    if (countryCode) {
      countryFilter += `countryIsoCode = '${countryCode}' AND `;
    }

    if (country && state) {
      countryFilter += `country = '${country}' AND stateId = '${state}' AND `;
    } else if (country) {
      countryFilter += `country = '${country}' AND `;
    }

    const userByGender = await db.sequelize.query(
      `SELECT
    (select COUNT(id) from users WHERE ${filter} ${countryFilter} gender = 'male' AND organization = ${organization} AND active = 1) as male,
    (select COUNT(id) from users WHERE ${filter} ${countryFilter} gender = 'female' AND organization = ${organization} AND active = 1) as female,
    (select COUNT(id) from users WHERE ${filter} ${countryFilter} gender = 'other' AND organization = ${organization} AND active = 1) as other;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: userByGender[0],
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


router.get("/farmers/country-list", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const country = await db.sequelize.query(
      `select u.country from users u where u.organization = ${organization} AND u.country IS NOT NULL Group By u.country;`
    );
    const countryList = country[0].map((c) => c.country);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: countryList,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



/**
 * @swagger
 * /admin/reports/generate-farm-report:
 *   post:
 *     summary: API for generating farm report.
 *     description: Generate farm report using farm id.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               farmId:
 *                 type: string
 *                 example: "1839"
 *               fertilizerApplication:
 *                 type: object
 *                 properties:
 *                   fertilizerApplicationFrom:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-08"
 *                   fertilizerApplicationTo:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-09"
 *               pestDiseaseApplication:
 *                 type: object
 *                 properties:
 *                   pestDiseaseApplicationFrom:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-08"
 *                   pestDiseaseApplicationTo:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-09"
 *               yieldInfo:
 *                 type: object
 *                 properties:
 *                   yieldInfoFrom:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-08"
 *                   yieldInfoTo:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-09"
 *               deforestation:
 *                 type: boolean
 *                 example: true
 *               geographic:
 *                 type: boolean
 *                 example: true
 *               farmPerimeter:
 *                 type: boolean
 *                 example: true
 *               geoVertices:
 *                 type: boolean
 *                 example: true
 *               areasPerimeter:
 *                 type: boolean
 *                 example: true
 *               existingCrop:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Farm report generated successfully.", "data": { "fileName": "Farm_Report-16797.pdf", "path": "https://dimitra-private.s3.amazonaws.com/reports/Farm_Report-16797.pdf" } }
 */
router.post("/generate-farm-report", auth, async (req, res) => {
  try {
    const data = await farmReport(req, res);

    // assign uuid to user if user doesnt have uuid
    let uuid = uuidv4();
    if (data && !data["user.dimitraUserId"] && data?.userId) {
      await db.user.update(
        { dimitraUserId: uuid },
        { where: { id: data?.userId } }
      );
    }
    data.dimitraUserId = uuid;
    if (data) {
      const userId = req.user.id;

      data.title = "Farm Report";

      const imageBase64 = await fs.readFileSync(
        join(__dirname, "./../../../assets/image", "Cacao1.png"),
        {
          encoding: "base64",
        }
      );

      const pdfData = await farmReportPdf(
        req,
        data,
        userId,
        imageBase64
      );
      if (!pdfData) {
        return res.json(
          erroRespSync({
            msg: "PDF report generation failed.",
          })
        );
      } else {
        return res.json(
          successRespSync({
            msg: "Farm report generated successfully.",
            data: pdfData,
          })
        );
      }
    } else {
      return res.json(
        errorRespSync({
          msg: "No farm record found.",
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /admin/reports/farm-reports:
 *   get:
 *     summary: API for getting list of farm report.
 *     description: Return list of farm report of the user.
 *     tags: [Admin]
 *
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "userId": 4,"farmId": 39,"url": "https://dimitra-private.s3.amazonaws.com/reports/Farm_Report-10988.pdf","createdAt": "2023-12-28T18:15:00.000Z","updatedAt": "2023-12-29T09:50:29.000Z","user_farm": {"farmName": "znsb","address": "QM42+6XH, Jhungian Road, Dashmesh Nagar, Ropar Division"}}]}
 */
router.get("/farm-reports", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const reports = await db.FarmReport.findAll({
      where: { userId },
      include: [
        {
          model: db.user_farm,
          as: "user_farm",
          attributes: ["farmName", "address"],
        },
      ],
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: reports,
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /admin/reports/farm-report-by-url:
 *   get:
 *     summary: API for getting farm report.
 *     description: Fetch farm report pdf using pdf link.
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: pdf_url
 *         schema:
 *           type: string
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully." }
 */
router.get("/farm-report-by-url", auth, async (req, res) => {
  try {
    const bucketName = process.env.AWS_PRIVATE_BUCKET || "dimitra-private";
    const pdfUrl = req.query.pdf_url;
    const fileKey = pdfUrl.split(".com/")[1];

    const getObjectParams = {
      Bucket: bucketName,
      Key: fileKey,
    };

    // Create a read stream from S3
    const s3ReadStream = s3.getObject(getObjectParams).createReadStream();

    // Set the appropriate response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Farm_Report.pdf"'
    );

    // Pipe the S3 stream to the response
    s3ReadStream.pipe(res);

    s3ReadStream.on("error", (err) => {
      console.error("Error downloading file from S3:", err);
      res.status(500).send("Internal Server Error");
    });
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /admin/reports/farm-report/{id}:
 *   delete:
 *     summary: Delete a farm report by farm report ID
 *     description: Deletes a farm report based on the farm report ID.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the farm report to delete.
 *     responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                code:
 *                  type: integer
 *                message:
 *                  type: string
 *              example: { "success": true, "code": 200, "message": "Farm report successfully deleted." }
 */
router.delete("/farm-report/:id", auth, async function (req, res) {
  const reportId = req.params.id;
  try {
    const deletedRow = await db.FarmReport.destroy({
      where: {
        id: reportId,
      },
    });
    if (deletedRow > 0) {
      res.json(
        successRespSync({
          msg: "Farm report successfully deleted.",
        })
      );
    } else {
      res.json(
        errorRespSync({
          code: 404,
          msg: "No report found to delete.",
        })
      );
    }
  } catch (err) {
    logErrorOccurred(err);
    return serverError(res, err);
  }
});

router.get("/crops", auth, translation, async (req, res) => {
  try {
    const data = await cropInfo(req);

    if (req.headers.lang && req.headers.lang != "en") {
      data.cropChart = req.translateFunction(
        data?.cropChart,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
      data.cropList = req.translateFunction(
        data?.cropList,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
      data.cropStat.cropYieldStat = req.translateFunction(
        data?.cropStat?.cropYieldStat,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/pests", auth, translation, async (req, res) => {
  try {
    const data = await pestsInfo(req, true);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/pesticides", auth, async (req, res) => {
  try {
    const data = await pestsInfo(req, true);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/equipment", auth, async (req, res) => {
  try {
    const data = await equipmentsInfo(req);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/goals", auth, async (req, res) => {
  try {
    const data = await goalsInfo(req);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/yield", auth, async (req, res) => {
  try {
    const data = await yieldInfo(req);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/soil", auth, async (req, res) => {
  try {
    const data = await soilInfo(req);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/user-farm", auth, async (req, res) => {
  try {
    let { page = 1, limit = 100 } = req.query; // Default to page 1 and limit 10 if not provided
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const data = await getUserFarmData(req, { offset, limit });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/pdfs", auth, async (req, res) => {
  try {
    const { list, startDate, endDate, title, timeFrame } = req.body;
    const user = req.user;

    const data = {
      title,
      subHeader: {
        user_name: [user.firstName,user.middleName, user.lastName].filter(Boolean).join(' ') || '-',
        time_frame: timeFrame ? timeFrame : `${startDate}-${endDate}`,
      },
      tableData: list,
    };
    let pdfData = await generatePDF(data, req);
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
      fs.createReadStream(pdfData.path).pipe(res);
      return;
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/pdfs/:moduleName", auth, async (req, res) => {
  try {
    let endPoint = "";
    let objName = "";
    let title = "";
    const { moduleName } = req.params;
    switch (moduleName) {
      case "regions":
        endPoint = "admin/reports/regions";
        objName = "regionalList";
        title = "Regions";
        break;
      case "farmers":
        endPoint = "admin/reports/farmers";
        objName = "farmerList";
        title = "Farmer";
        break;
      case "farms":
        endPoint = "admin/reports/farms";
        objName = "farmList";
        title = "Farms";
        break;
      case "crops":
        endPoint = "admin/reports/crops";
        objName = "cropList";
        title = "Crops";
        break;
      case "pests":
        endPoint = "admin/reports/pests";
        objName = "pestsList";
        title = "Pests";
        break;
      case "equipment":
        endPoint = "admin/reports/equipment";
        objName = "equipmentList";
        title = "Equipments";
        break;
      case "goals":
        endPoint = "admin/reports/goals";
        objName = "goalsList";
        title = "Goals";
        break;
      default:
        throw Error("Wrong report selected");
    }

    let promises = [];
    promises.push(
      rp({
        url: `${process.env.BASEURL}/${endPoint}`,
        method: "GET",
        // body: payload,
        json: true,
        headers: {
          "User-Agent": "client",
          "oauth-token": req.headers["oauth-token"],
        },
      })
    );
    const AllData = await Promise.allSettled(promises);
    if (AllData[0].status == "rejected") {
      throw Error("Data fetching failed");
    }
    let farmList = AllData[0].value.data[objName];
    const data = {
      title,
      subHeader: {
        user_name: "pdf",
        time_frame: `${moment(new Date()).format("DD/MM/YY")}`,
      },
      tableData: farmList,
    };
    let pdfData = await generatePDF(data, req);
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
      fs.createReadStream(pdfData.path).pipe(res);
      return;
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/cropTypes", auth, translation, async (req, res) => {
  try {
    let data = await db.Option.findAll({
      where: {
        groupName: "crop-type",
        userId: null,
      },
    });
    if (req.headers.lang && req.headers.lang != "en") {
      data = req.translateFunction(data, globalTranslationCache, {
        lvl1: true,
      });
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/generate-excel", auth, async (req, res) => {
  try {
    const { data, fileName } = req.body;
    const isValidData =
      Array.isArray(data) &&
      data.every((row) => {
        return typeof row === "object";
      });

    if (!isValidData)
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.BAD_REQUEST,
        })
      );

    const parsedFileName =
      typeof fileName === "string" || typeof fileName === "number"
        ? fileName.toString()
        : Date.now().toString();
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, sheet);
    const stream = xlsx.writeXLSX(workbook, { type: "buffer" });
    res.set(
      "Content-disposition",
      `attachment; filename=${parsedFileName}.xlsx`
    );
    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(stream);
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
