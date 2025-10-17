const express = require("express");
const xlsx = require("xlsx");
const axios = require("axios");
const { Op } = require("sequelize");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { deleteFileS3 } = require(rootPath + "/helpers/aws_s3");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const fileUpload = require(rootPath + "/middleware/file_upload");
const userUploadValidator = require(rootPath +
  "/helpers/validators/userUpload");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const html2pdf = require("html-pdf");
let stream = require("stream");
var aws = require("aws-sdk");
const s3 = new aws.S3({
  region: process.env.AWS_REGION || "us-east-1",
  signatureVersion: process.env.AWS_SIGNATURE_V || "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ||
    "",
  bucket: process.env.AWS_PUBLIC_BUCKET || "dimitra-public-images",
});
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const moment = require("moment");

/**
 * @swagger
 * /admin/coffee/reports/pdf/{reportType}:
 *   get:
 *     summary: API for getting coffee production report data.
 *     description: API for getting coffee production report data.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: reportType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [farmer, buyingStation, dryMilling]
 *       - in: query
 *         name: filterType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [year, month, week, custom]
 *       - in: query
 *         name: filterDate
 *         required: true
 *         description: Pair year filterDate with year filterType, for eg filterType=year and filterDate=2022. And month filterDate with month filterType, for eg filterType=month and filterDate=2022-06. For week and custom filter with date range e.g filerType=custom and filterDate=2022-07-08-15
 *         schema:
 *           type: string
 *           enum: ["2022", "2022-06", "2021", "2021-05", "2022-07-08-15", "2022-07-08-09", "etc"]
 *       - in: query
 *         name: filterBy
 *         required: true
 *         description: Graph filter by name or production
 *         schema:
 *           name: string
 *           enum: [production, name]
 *       - in: query
 *         required: true
 *         name: sort
 *         description: sort ascending or descending
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: search
 *         description: search keyword
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
 *                 example: { "success": true, "code": 200, "message": "Pdf fetched successfully", "data": "https://dimitra-public-images.s3.amazonaws.com/farmer_production_pdf_1656559902955.pdf" }
 */

router.get("/pdf/:reportType", auth, async function (req, res) {
  try {
    const { reportType } = req.params;
    const { organization } = req.user;
    const { filterType, filterDate, id, filterBy, sort, search } = req.query;
    let finalResData = [];
    finalResData = await getPdfData(
      reportType,
      id,
      filterType,
      filterDate,
      filterBy,
      sort,
      search,
      '',
      '',
      true,
      organization
    );
    const data = {
      title:
        reportType.charAt(0).toUpperCase() +
        reportType.slice(1) +
        " Production Report",
      subHeader: {
        user_name: "Coffee Admin",
        time_frame: `${moment(finalResData.firstDay).format('DD/MM/YY')} to ${moment(finalResData.lastDay).format('DD/MM/YY')}`,
      },
      tableData: finalResData.data,
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
  } catch (error) {
    logErrorOccurred(__filename, err);
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/reports/{reportType}:
 *   get:
 *     summary: API for getting coffee production report data.
 *     description: API for getting coffee production report data.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: reportType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [farmer, buyingStation, dryMilling]
 *       - in: query
 *         name: filterType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [year, month, week, custom]
 *       - in: query
 *         name: filterDate
 *         required: true
 *         description: Pair year filterDate with year filterType, for eg filterType=year and filterDate=2022. And month filterDate with month filterType, for eg filterType=month and filterDate=2022-06. For week and custom filter with date range e.g filerType=custom and filterDate=2022-07-08-15
 *         schema:
 *           type: string
 *           enum: ["2022", "2022-06", "2021", "2021-05", "2022-07-08-15", "2022-07-08-09", "etc"]
 *       - in: query
 *         name: filterBy
 *         required: true
 *         description: Graph filter by name or production
 *         schema:
 *           name: string
 *           enum: [production, name]
 *       - in: query
 *         required: true
 *         name: sort
 *         description: sort ascending or descending
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: search
 *         description: search keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: true
 *         description: page number
 *         schema:
 *           type: integer
 *       - in: query
 *         required: true
 *         name: limit
 *         description: items per page limit
 *         schema:
 *           type: integer
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
 *                 example: { "success": true, "code": 200, "message": "Report fetched successfully", "data": [ { "farmerName": "fnametest lnametest", "production": 80 }, { "farmerName": "ms111 ss", "production": 150 } ] }
 */

router.get("/:reportType", auth, async function (req, res) {
  try {
    const { reportType } = req.params;
    const { organization } = req.user;
    const { filterType, filterDate, id, filterBy, sort, search, page, limit } =
      req.query;
    let finalResData = [];
    finalResData = await getPdfData(
      reportType,
      id,
      filterType,
      filterDate,
      filterBy,
      sort,
      search,
      page,
      limit,
      "",
      organization
    );

    return res.json(
      successRespSync({
        msg: "Report fetched successfully",
        data: finalResData,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/reports/pdf/{reportType}/{id}:
 *   get:
 *     summary: API for getting coffee production report data.
 *     description: API for getting coffee production report data.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: reportType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [farmer, buyingStation, dryMilling]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: filterType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [year, month, week, custom]
 *       - in: query
 *         name: filterDate
 *         required: true
 *         description: Pair year filterDate with year filterType, for eg filterType=year and filterDate=2022. And month filterDate with month filterType, for eg filterType=month and filterDate=2022-06. For week and custom filter with date range e.g filerType=custom and filterDate=2022-07-08-15
 *         schema:
 *           type: string
 *           enum: ["2022", "2022-06", "2021", "2021-05", "2022-07-08-15", "2022-07-08-09", "etc"]
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
 *                 example: { "success": true, "code": 200, "message": "Pdf fetched successfully", "data": "https://dimitra-public-images.s3.amazonaws.com/farmer_production_pdf_1656559902955.pdf" }
 */

router.get("/pdf/:reportType/:id", auth, async function (req, res) {
  try {
    const { reportType, id } = req.params;
    const { organization } = req.user;
    const { filterType, filterDate, filterBy, sort, search } = req.query;
    let finalResData = [];
    finalResData = await getSpecificPdfData(
      reportType,
      id,
      filterType,
      filterDate,
      // filterBy,
      // sort,
      // search,
      organization
    );
    const data = {
      title:
        reportType.charAt(0).toUpperCase() +
        reportType.slice(1) +
        " Production Report",
      subHeader: {
        user_name: "Coffee Admin",
        date: moment().format(process.env.ACCEPT_DATE_FORMAT),
      },
      tableData: reportType == "dryMilling" ? finalResData.data : finalResData,
    };
    console.log(data);
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
  } catch (error) {
    logErrorOccurred(__filename, err);
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/reports/{reportType}/{id}:
 *   get:
 *     summary: API for getting coffee production report data.
 *     description: API for getting coffee production report data.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: reportType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [farmer, buyingStation, dryMilling]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: filterType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [year, month, week, custom]
 *       - in: query
 *         name: filterDate
 *         required: true
 *         description: Pair year filterDate with year filterType, for eg filterType=year and filterDate=2022. And month filterDate with month filterType, for eg filterType=month and filterDate=2022-06. For week and custom filter with date range e.g filerType=custom and filterDate=2022-07-08-15
 *         schema:
 *           type: string
 *           enum: ["2022", "2022-06", "2022-07", "2021", "2021-05", "2022-07-08-15", "2022-07-08-09", "etc"]
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
 *                 example: { "success": true, "code": 200, "message": "Report fetched successfully", "data": [ { "farmerName": "fnametest lnametest", "production": 80 }, { "farmerName": "ms111 ss", "production": 150 } ] }
 */

router.get("/:reportType/:id", auth, async function (req, res) {
  try {
    const { reportType, id } = req.params;
    const { organization } = req.user;
    const { filterType, filterDate } = req.query;
    let finalResData = [];
    finalResData = await getSpecificPdfData(
      reportType,
      id,
      filterType,
      filterDate,
      organization
    );

    return res.json(
      successRespSync({
        msg: "Report fetched successfully",
        data: finalResData,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

async function getPdfData(
  reportType,
  id,
  filterType,
  filterDate,
  filterBy,
  sort,
  search,
  page = "",
  limit = "",
  pdf = "",
  organization
) {
  let finalResData = [];

  let order = [];

  let limits = {};
  if (limit && page) {
    page = parseInt(page);
    limit = parseInt(limit);
    offset = (page - 1) * limit;
    limits = { limit, offset };
  }

  switch (reportType) {
    case "farmer":
      {
        let monthRes;
        let offset = 0;

        if (filterType == "month") {
          let today = new Date(filterDate);
          let farmerDataObj = {};

          let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = ["$farmer.firstName$","$farmer.middleName$", "$farmer.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "farmer" },
                "firstName",
                sort,
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } =
            await db.BuyingStationOrder.findAndCountAll({
              attributes: [
                [db.Sequelize.fn('sum', db.Sequelize.col('coffeeCherryQty')), 'production'],
                "farmerId",
              ],
              where,
              distinct: true,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "farmer",
                  where: { organization },
                  required: true
                },
              ],
              group: ["farmerId"],
              order,
              ...limits,
            });
            rows.forEach(el => {
              if(pdf != ''){
                finalResData.push({
                  farmer: el.farmer.fullName,
                  production: el.dataValues.production
                });
              }
              else{
                finalResData.push({
                  farmerId: el.farmerId,
                  farmer: el.farmer.fullName,
                  production: el.dataValues.production
                });
              }
              
            });
            // console.log('final res check', finalResData);
          finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        } else if (filterType == "year") {
          let today = new Date(filterDate);
          let farmerDataObj = {};

          let firstDay = new Date(today.getFullYear(), 0, 1);
          let lastDay = new Date(today.getFullYear(), 12, 0);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };
          if (!_.isEmpty(search)) {
            const fields = ["$farmer.firstName$","$farmer.middleName$", "$farmer.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "farmer" },
                "firstName",
                sort,
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } =
            await db.BuyingStationOrder.findAndCountAll({
              attributes: [
                [db.Sequelize.fn('sum', db.Sequelize.col('coffeeCherryQty')), 'production'],
                "farmerId",
              ],
              where,
              distinct: true,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "farmer",
                  where: { organization },
                  required: true
                },
              ],
              group: ["farmerId"],
              order,
              ...limits,
            });
            rows.forEach(el => {
              console.log('el',el);
              console.log('el',);
              if(pdf != ''){
                finalResData.push({
                  farmer: el.farmer.fullName,
                  production: el.dataValues.production
                });
              }
              else{
                finalResData.push({
                  farmerId: el.farmerId,
                  farmer: el.farmer.fullName,
                  production: el.dataValues.production
                });
              }
              
            });
            // console.log('final res check', finalResData);
          finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        } else {
          let date = filterDate.split("-");
          let farmerDataObj = {};

          let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
          let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
          console.log("first day", firstDay);
          console.log("first day", lastDay);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = ["$farmer.firstName$","$farmer.middleName$", "$farmer.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "farmer" },
                "firstName",
                sort,
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } =
            await db.BuyingStationOrder.findAndCountAll({
              attributes: [
                [db.Sequelize.fn('sum', db.Sequelize.col('coffeeCherryQty')), 'production'],
                "farmerId",
              ],
              where,
              distinct: true,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "farmer",
                  where: { organization },
                  required: true
                },
              ],
              group: ["farmerId"],
              order,
              ...limits,
            });
            rows.forEach(el => {
              console.log('el',el);
              console.log('el',);
              if(pdf != ''){
                finalResData.push({
                  farmer: el.farmer.fullName,
                  production: el.dataValues.production
                });
              }
              else{
                finalResData.push({
                  farmerId: el.farmerId,
                  farmer: el.farmer.fullName,
                  production: el.dataValues.production
                });
              }
              
            });
            // console.log('final res check', finalResData);
          finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        }
      }
      break;
    case "buyingStation":
      {
        let monthRes;
        if (filterType == "month") {
          let today = new Date(filterDate);
          let buyingStationDataObj = {};

          let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = ["$buyingStation.firstName$","$buyingStation.middleName$", "$buyingStation.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "buyingStation" },
                "firstName",
                sort.toUpperCase(),
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } =
            await db.BuyingStationOrder.findAndCountAll({
              attributes: [
                [db.Sequelize.fn('sum', db.Sequelize.col('coffeeCherryQty')), 'production'],
                'buyingStationId'
              ],
              where,
              distinct: true,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "buyingStation",
                  where: { organization },
                  required: true
                },
              ],
              order,
              group: ["buyingStationId"],
              ...limits
            });
            rows.forEach(el => {
              if(pdf != ''){
                finalResData.push({
                  buyingStation: el.buyingStation.fullName,
                  production: el.dataValues.production
                });
              }
              else{
                finalResData.push({
                  buyingStationId: el.buyingStationId,
                  buyingStation: el.buyingStation.fullName,
                  production: el.dataValues.production
                });
              }
              
            });
            // console.log('final res check', finalResData);
          finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        } else if (filterType == "year") {
          let today = new Date(filterDate);
          let buyingStationDataObj = {};

          let firstDay = new Date(today.getFullYear(), 0, 1);
          let lastDay = new Date(today.getFullYear(), 12, 0);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = [
              "$buyingStation.firstName$",
              "$buyingStation.middleName$",
              "$buyingStation.lastName$",
            ];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "buyingStation" },
                "firstName",
                sort.toUpperCase(),
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } =
            await db.BuyingStationOrder.findAndCountAll({
              attributes: [
                [db.Sequelize.fn('sum', db.Sequelize.col('coffeeCherryQty')), 'production'],
                'buyingStationId'
              ],
              where,
              distinct: true,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "buyingStation",
                  where: { organization },
                  required: true
                },
              ],
              order,
              group: ["buyingStationId"],
              ...limits
            });
            rows.forEach(el => {
              if(pdf != ''){
                finalResData.push({
                  buyingStation: el.buyingStation.fullName,
                  production: el.dataValues.production
                });
              }
              else{
                finalResData.push({
                  buyingStationId: el.buyingStationId,
                  buyingStation: el.buyingStation.fullName,
                  production: el.dataValues.production
                });
              }
              
            });
            // console.log('final res check', finalResData);
          finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        } else {
          let date = filterDate.split("-");
          let farmerDataObj = {};

          let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
          let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = [
              "$buyingStation.firstName$",
              "$buyingStation.middleName$",
              "$buyingStation.lastName$",
            ];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }
          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "buyingStation" },
                "firstName",
                sort.toUpperCase(),
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } =
            await db.BuyingStationOrder.findAndCountAll({
              attributes: [
                [db.Sequelize.fn('sum', db.Sequelize.col('coffeeCherryQty')), 'production'],
                'buyingStationId'
              ],
              where,
              distinct: true,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "buyingStation",
                  where: { organization },
                  required: true
                },
              ],
              order,
              group: ["buyingStationId"],
              ...limits
            });
            rows.forEach(el => {
              if(pdf != ''){
                finalResData.push({
                  buyingStation: el.buyingStation.fullName,
                  production: el.dataValues.production
                });
              }
              else{
                finalResData.push({
                  buyingStationId: el.buyingStationId,
                  buyingStation: el.buyingStation.fullName,
                  production: el.dataValues.production
                });
              }
              
            });
            // console.log('final res check', finalResData);
          finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        }
      }
      break;
    case "dryMilling":
      {
        let monthRes;
        if (filterType == "month") {
          let today = new Date(filterDate);
          let buyingStationDataObj = {};

          let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = ["$dryMilling.firstName$", "$dryMilling.middleName$","$dryMilling.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "dryMilling" },
                "firstName",
                sort.toUpperCase(),
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } = await db.ParchmentCoffee.findAndCountAll({
            attributes: [
              [db.Sequelize.fn('sum', db.Sequelize.col('batchProductionKilogramAsalan')), 'production'],
              'dryMillingUserId'
            ],
            where,
            distinct: true,       
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "dryMilling",
                where: { organization },
                required: true
              },
            ],
            order,
            group: ['dryMillingUserId'],
            ...limits,
          });
          // console.log("yearly res dry milling limit", rows);
          rows.forEach(el => {
            if(pdf != ''){
              finalResData.push({
                dryMilling: el.dryMilling.fullName,
                production: el.dataValues.production
              });
            }
            else{
              finalResData.push({
                dryMillingUserId: el.dryMillingUserId,
                dryMilling: el.dryMilling.fullName,
                production: el.dataValues.production
              });
            }
            
          });
          // console.log('final res check', finalResData);
        finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        } else if (filterType == "year") {
          let today = new Date(filterDate);
          let buyingStationDataObj = {};

          let firstDay = new Date(today.getFullYear(), 0, 1);
          let lastDay = new Date(today.getFullYear(), 12, 0);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = ["$dryMilling.firstName$", "$dryMilling.middleName$","$dryMilling.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "dryMilling" },
                "firstName",
                sort,
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } = await db.ParchmentCoffee.findAndCountAll({
            attributes: [
              [db.Sequelize.fn('sum', db.Sequelize.col('batchProductionKilogramAsalan')), 'production'],
              'dryMillingUserId'
            ],
            where,
            distinct: true,       
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "dryMilling",
                where: { organization },
                required: true
              },
            ],
            order,
            group: ['dryMillingUserId'],
            ...limits,
          });
          // console.log("yearly res dry milling limit", rows);
          rows.forEach(el => {
            if(pdf != ''){
              finalResData.push({
                dryMilling: el.dryMilling.fullName,
                production: el.dataValues.production
              });
            }
            else{
              finalResData.push({
                dryMillingUserId: el.dryMillingUserId,
                dryMilling: el.dryMilling.fullName,
                production: el.dataValues.production
              });
            }
            
          });
          // console.log('final res check', finalResData);
        finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        } else {
          let date = filterDate.split("-");
          let farmerDataObj = {};

          let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
          let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
          };

          if (!_.isEmpty(search)) {
            const fields = ["$dryMilling.firstName$", "$dryMilling.middleName$","$dryMilling.lastName$"];
            const searchQuery = fields.map((col) => {
              return {
                [col]: {
                  [db.Sequelize.Op.substring]: search,
                },
              };
            });
            where = { ...where, [db.Sequelize.Op.or]: searchQuery };
          }

          if (filterBy == "name") {
            order = [
              [
                { model: db.user, as: "dryMilling" },
                "firstName",
                sort.toUpperCase(),
              ],
            ];
          } else {
            order = [[db.sequelize.col("production"), sort]];
          }

          const { count: totalCount, rows } = await db.ParchmentCoffee.findAndCountAll({
            attributes: [
              [db.Sequelize.fn('sum', db.Sequelize.col('batchProductionKilogramAsalan')), 'production'],
              'dryMillingUserId'
            ],
            where,
            distinct: true,       
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "dryMilling",
                where: { organization },
                required: true
              },
            ],
            order,
            group: ['dryMillingUserId'],
            ...limits,
          });
          // console.log("yearly res dry milling limit", rows);
          rows.forEach(el => {
            if(pdf != ''){
              finalResData.push({
                dryMilling: el.dryMilling.fullName,
                production: el.dataValues.production
              });
            }
            else{
              finalResData.push({
                dryMillingUserId: el.dryMillingUserId,
                dryMilling: el.dryMilling.fullName,
                production: el.dataValues.production
              });
            }
            
          });
          // console.log('final res check', finalResData);
        finalResData = { firstDay, lastDay, totalCount: totalCount.length, data: finalResData };
        }
      }
      break;

    default:
      break;
  }
  return finalResData;
}
/**
 * Get specific report for porvied id of reportType - farmer,
 * @returns pdf data
 */
async function getSpecificPdfData(reportType, id, filterType, filterDate, organization) {
  let finalResData = [];

  let order = [];
  switch (reportType) {
    case "farmer":
      {
        let monthRes;

        if (filterType == "month") {
          let today = new Date(filterDate);
          let farmerDataObj = {};

          let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()]
            },
            farmerId: id,
          };

          monthRes = await db.BuyingStationOrder.findAll({
            attributes: [
              "coffeeCherryQlty",
              "perKgPrice",
              "coffeeCherryQty",
              "farmerId",
              "createdAt",
              "buyingStationId",
              "createdAt",
              "grandTotal",
            ],
            where,
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "buyingStation",
                where: { organization },
                required: true
              },
            ],
          });
          console.log("year res specific", monthRes);
          monthRes.forEach((el) => {
            if (el.buyingStation.fullName) {
              finalResData.push({
                date: el.createdAt,
                buyingStation: el.buyingStation.fullName,
                weight: el.coffeeCherryQty,
                quality: el.coffeeCherryQlty,
                price: el.coffeeCherryQty * el.perKgPrice,
              });
            }
          });
        } else if (filterType == "year") {
          let today = new Date(filterDate);
          let farmerDataObj = {};

          let firstDay = new Date(today.getFullYear(), 0, 1);
          let lastDay = new Date(today.getFullYear(), 12, 0);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
            farmerId: id,
          };

          monthRes = await db.BuyingStationOrder.findAll({
            attributes: [
              "coffeeCherryQlty",
              "perKgPrice",
              "coffeeCherryQty",
              "farmerId",
              "createdAt",
              "buyingStationId",
              "createdAt",
              "grandTotal",
            ],
            where,
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "buyingStation",
                where: { organization },
                required: true
              },
            ],
          });
          console.log("year res specific", monthRes);
          monthRes.forEach((el) => {
            if (el.buyingStation.fullName) {
              finalResData.push({
                date: el.createdAt,
                buyingStation: el.buyingStation.fullName,
                weight: el.coffeeCherryQty,
                quality: el.coffeeCherryQlty,
                price: el.coffeeCherryQty * el.perKgPrice,
              });
            }
          });
        } else {
          let date = filterDate.split("-");
          let farmerDataObj = {};

          let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
          let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
          console.log("first day", firstDay);
          console.log("first day", lastDay);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
            farmerId: id,
          };

          monthRes = await db.BuyingStationOrder.findAll({
            attributes: [
              "coffeeCherryQlty",
              "perKgPrice",
              "coffeeCherryQty",
              "farmerId",
              "createdAt",
              "buyingStationId",
              "createdAt",
              "grandTotal",
            ],
            where,
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "buyingStation",
                where: { organization },
                required: true
              },
            ],
          });
          console.log("year res specific", monthRes);
          monthRes.forEach((el) => {
            if (el.buyingStation.fullName) {
              finalResData.push({
                date: el.createdAt,
                buyingStation: el.buyingStation.fullName,
                weight: el.coffeeCherryQty,
                quality: el.coffeeCherryQlty,
                price: el.coffeeCherryQty * el.perKgPrice,
              });
            }
          });
        }
      }
      break;
    case "buyingStation":
      {
        let monthRes;
        if (filterType == "month") {
          let today = new Date(filterDate);
          let buyingStationDataObj = {};

          let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
            buyingStationId: id,
          };

          monthRes = await db.BuyingStationOrder.findAll({
            attributes: [
              "createdAt",
              "coffeeCherryQlty",
              "perKgPrice",
              "coffeeCherryQty",
              "farmerId",
              "orderCode",
              "buyingStationId",
            ],
            where,
            include: [
              {
                model: db.user,
                attributes: ["id", "firstName","middleName", "lastName", "fullName"],
                as: "farmer",
                where: { organization },
                required: true
              },
            ],
          });
          // datasetObj[cus.customerId.customerName] = [ ...(datasetObj[cus.customerId.customerName] || []), tmpVar]

          monthRes.forEach((el) => {
            if (el.farmer.fullName) {
              finalResData.push({
                date: el.createdAt,
                farmer: el.farmer.fullName,
                weight: el.coffeeCherryQty,
                parchmentID: el.orderCode,
                price: el.coffeeCherryQty * el.perKgPrice,
              });
            }
          });
        } else if (filterType == "year") {
          let today = new Date(filterDate);

          let firstDay = new Date(today.getFullYear(), 0, 1);
          let lastDay = new Date(today.getFullYear(), 12, 0);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
            buyingStationId: id,
          };

          monthRes = await db.BuyingStationOrder.findAll({
            attributes: [
              "createdAt",
              "coffeeCherryQlty",
              "perKgPrice",
              "coffeeCherryQty",
              "farmerId",
              "buyingStationId",
              "orderCode",
            ],
            where,
            include: [
              {
                model: db.user,
                attributes: ["firstName","middleName", "lastName", "fullName"],
                as: "farmer",
                where: { organization },
                required: true
              },
            ],
          });
          // datasetObj[cus.customerId.customerName] = [ ...(datasetObj[cus.customerId.customerName] || []), tmpVar]

          monthRes.forEach((el) => {
            if (el.farmer.fullName) {
              finalResData.push({
                date: el.createdAt,
                farmer: el.farmer.fullName,
                weight: el.coffeeCherryQty,
                parchmentID: el.orderCode,
                price: el.coffeeCherryQty * el.perKgPrice,
              });
            }
          });
        } else {
          let date = filterDate.split("-");
          let farmerDataObj = {};

          let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
          let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
          let where = {
            createdAt: {
              [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
            },
            buyingStationId: id,
          };

          monthRes = await db.BuyingStationOrder.findAll({
            attributes: [
              "coffeeCherryQlty",
              "perKgPrice",
              "coffeeCherryQty",
              "farmerId",
            ],
            where,
            include: [
              {
                model: db.user,
                attributes: ["id", "firstName","middleName", "lastName", "fullName"],
                as: "buyingStation",
                // where: id ? { id } : 1,
                where: { organization , ...(id ? { id } : null)},
                required: true
              },
            ],
          });

          monthRes.forEach((el) => {
            if (el.buyingStation.fullName) {
              buyingStationDataObj[el.buyingStation.fullName] =
                (buyingStationDataObj[el.buyingStation.fullName] || 0) +
                el.coffeeCherryQty;
            }
          });
          console.log(farmerDataObj);
          for (let key in farmerDataObj) {
            finalResData.push({
              farmerName: key,
              production: farmerDataObj[key],
            });
          }
        }
      }
      break;
    case "dryMilling":
      {
        let monthRes;
        if (filterType == "month") {
          let today = new Date(filterDate);
          let buyingStationDataObj = {};

          let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

          const { inboundWarehouse, outboundWarehouse } =
            await getDryMillingReport(id, firstDay, lastDay);
          let totalQuantity = _.sumBy(
            inboundWarehouse.inboundRows,
            function (item) {
              return item.quantity;
            }
          );
          let totalPrice = _.sumBy(
            inboundWarehouse.inboundRows,
            function (item) {
              return item.amount * item.quantity;
            }
          );

          inboundWarehouse.inboundRows.forEach((el) => {
            finalResData.push({
              date: el.createdAt,
              commodity: el.warehouseProduct.name,
              quantity: `${el.unitSize} KG`,
              unit: el.unitCount,
              price: `${el.amount * el.quantity}`,
            });
          });
          finalResData = { data: finalResData, totalQuantity, totalPrice };
        } else if (filterType == "year") {
          let today = new Date(filterDate);

          let firstDay = new Date(today.getFullYear(), 0, 1);
          let lastDay = new Date(today.getFullYear(), 12, 0);
          const { inboundWarehouse, outboundWarehouse } =
            await getDryMillingReport(id, firstDay, lastDay);
          let totalQuantity = _.sumBy(
            inboundWarehouse.inboundRows,
            function (item) {
              return item.quantity;
            }
          );
          let totalPrice = _.sumBy(
            inboundWarehouse.inboundRows,
            function (item) {
              return item.amount * item.quantity;
            }
          );

          console.log("inbound rows", inboundWarehouse.inboundRows);
          inboundWarehouse.inboundRows.forEach((el) => {
            finalResData.push({
              date: el.createdAt,
              commodity: el.product,
              quantity: `${el.unitSize} KG`,
              unit: el.unitCount,
              price: `${el.amount * el.quantity}`,
            });
          });
          finalResData = { data: finalResData, totalQuantity, totalPrice };
        } else {
          let date = filterDate.split("-");
          let farmerDataObj = {};

          let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
          let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
          const { inboundWarehouse, outboundWarehouse } =
            await getDryMillingReport(id, firstDay, lastDay);
          let totalQuantity = _.sumBy(
            inboundWarehouse.inboundRows,
            function (item) {
              return item.quantity;
            }
          );
          let totalPrice = _.sumBy(
            inboundWarehouse.inboundRows,
            function (item) {
              return item.amount * item.quantity;
            }
          );

          console.log("inbound rows", inboundWarehouse.inboundRows);
          inboundWarehouse.inboundRows.forEach((el) => {
            finalResData.push({
              date: el.createdAt,
              commodity: el.product,
              quantity: `${el.unitSize} KG`,
              unit: el.unitCount,
              price: `${el.amount * el.quantity}`,
            });
          });
          finalResData = { data: finalResData, totalQuantity, totalPrice };
        }
      }
      break;
      case "buyingstation":
        {
          let monthRes;
          if (filterType == "month") {
            let today = new Date(filterDate);
            let buyingStationDataObj = {};
  
            let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            let where = {
              createdAt: {
                [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
              },
              buyingStationId: id,
            };
  
            monthRes = await db.BuyingStationOrder.findAll({
              attributes: [
                "createdAt",
                "coffeeCherryQlty",
                "perKgPrice",
                "coffeeCherryQty",
                "farmerId",
                "orderCode",
                "buyingStationId",
              ],
              where,
              include: [
                {
                  model: db.user,
                  attributes: ["id", "firstName","middleName", "lastName", "fullName"],
                  as: "farmer",
                  where: { organization },
                  required: true
                },
              ],
            });
            // datasetObj[cus.customerId.customerName] = [ ...(datasetObj[cus.customerId.customerName] || []), tmpVar]
  
            monthRes.forEach((el) => {
              if (el.farmer.fullName) {
                finalResData.push({
                  date: el.createdAt,
                  farmer: el.farmer.fullName,
                  weight: el.coffeeCherryQty,
                  parchmentID: el.orderCode,
                  price: el.coffeeCherryQty * el.perKgPrice,
                });
              }
            });
          } else if (filterType == "year") {
            let today = new Date(filterDate);
  
            let firstDay = new Date(today.getFullYear(), 0, 1);
            let lastDay = new Date(today.getFullYear(), 12, 0);
            let where = {
              createdAt: {
                [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
              },
              buyingStationId: id,
            };
  
            monthRes = await db.BuyingStationOrder.findAll({
              attributes: [
                "createdAt",
                "coffeeCherryQlty",
                "perKgPrice",
                "coffeeCherryQty",
                "farmerId",
                "buyingStationId",
                "orderCode",
              ],
              where,
              include: [
                {
                  model: db.user,
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                  as: "farmer",
                  where: { organization },
                  required: true
                },
              ],
            });
            // datasetObj[cus.customerId.customerName] = [ ...(datasetObj[cus.customerId.customerName] || []), tmpVar]
  
            monthRes.forEach((el) => {
              if (el.farmer.fullName) {
                finalResData.push({
                  date: el.createdAt,
                  farmer: el.farmer.fullName,
                  weight: el.coffeeCherryQty,
                  parchmentID: el.orderCode,
                  price: el.coffeeCherryQty * el.perKgPrice,
                });
              }
            });
          } else {
            let date = filterDate.split("-");
            let farmerDataObj = {};
  
            let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
            let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
            let where = {
              createdAt: {
                [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
              },
              buyingStationId: id,
            };
  
            monthRes = await db.BuyingStationOrder.findAll({
              attributes: [
                "coffeeCherryQlty",
                "perKgPrice",
                "coffeeCherryQty",
                "farmerId",
              ],
              where,
              include: [
                {
                  model: db.user,
                  attributes: ["id", "firstName","middleName", "lastName", "fullName"],
                  as: "buyingStation",
                  // where: id ? { id } : 1,
                  where: { organization , ...(id ? { id } : null)},
                  required: true
                },
              ],
            });
  
            monthRes.forEach((el) => {
              if (el.buyingStation.fullName) {
                buyingStationDataObj[el.buyingStation.fullName] =
                  (buyingStationDataObj[el.buyingStation.fullName] || 0) +
                  el.coffeeCherryQty;
              }
            });
            console.log(farmerDataObj);
            for (let key in farmerDataObj) {
              finalResData.push({
                farmerName: key,
                production: farmerDataObj[key],
              });
            }
          }
        }
        break;
      case "drymilling":
        {
          let monthRes;
          if (filterType == "month") {
            let today = new Date(filterDate);
            let buyingStationDataObj = {};
  
            let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  
            const { inboundWarehouse, outboundWarehouse } =
              await getDryMillingReport(id, firstDay, lastDay);
            let totalQuantity = _.sumBy(
              inboundWarehouse.inboundRows,
              function (item) {
                return item.quantity;
              }
            );
            let totalPrice = _.sumBy(
              inboundWarehouse.inboundRows,
              function (item) {
                return item.amount * item.quantity;
              }
            );
  
            inboundWarehouse.inboundRows.forEach((el) => {
              finalResData.push({
                date: el.createdAt,
                commodity: el.warehouseProduct.name,
                quantity: `${el.unitSize} KG`,
                unit: el.unitCount,
                price: `${el.amount * el.quantity}`,
              });
            });
            finalResData = { data: finalResData, totalQuantity, totalPrice };
          } else if (filterType == "year") {
            let today = new Date(filterDate);
  
            let firstDay = new Date(today.getFullYear(), 0, 1);
            let lastDay = new Date(today.getFullYear(), 12, 0);
            const { inboundWarehouse, outboundWarehouse } =
              await getDryMillingReport(id, firstDay, lastDay);
            let totalQuantity = _.sumBy(
              inboundWarehouse.inboundRows,
              function (item) {
                return item.quantity;
              }
            );
            let totalPrice = _.sumBy(
              inboundWarehouse.inboundRows,
              function (item) {
                return item.amount * item.quantity;
              }
            );
  
            console.log("inbound rows", inboundWarehouse.inboundRows);
            inboundWarehouse.inboundRows.forEach((el) => {
              finalResData.push({
                date: el.createdAt,
                commodity: el.product,
                quantity: `${el.unitSize} KG`,
                unit: el.unitCount,
                price: `${el.amount * el.quantity}`,
              });
            });
            finalResData = { data: finalResData, totalQuantity, totalPrice };
          } else {
            let date = filterDate.split("-");
            let farmerDataObj = {};
  
            let firstDay = new Date(date[0] + "-" + date[1] + "-" + date[2]);
            let lastDay = new Date(date[0] + "-" + date[1] + "-" + date[3]);
            const { inboundWarehouse, outboundWarehouse } =
              await getDryMillingReport(id, firstDay, lastDay);
            let totalQuantity = _.sumBy(
              inboundWarehouse.inboundRows,
              function (item) {
                return item.quantity;
              }
            );
            let totalPrice = _.sumBy(
              inboundWarehouse.inboundRows,
              function (item) {
                return item.amount * item.quantity;
              }
            );
  
            console.log("inbound rows", inboundWarehouse.inboundRows);
            inboundWarehouse.inboundRows.forEach((el) => {
              finalResData.push({
                date: el.createdAt,
                commodity: el.product,
                quantity: `${el.unitSize} KG`,
                unit: el.unitCount,
                price: `${el.amount * el.quantity}`,
              });
            });
            finalResData = { data: finalResData, totalQuantity, totalPrice };
          }
        }
        break;

    default:
      break;
  }
  return finalResData;
}

async function getDryMillingReport(userId, firstDay, lastDay) {
  let where = { userId: userId };
  let col = "createdAt";
  let sort = "desc";
  where.createdAt = {
    [Op.between]: [firstDay.toISOString(), lastDay.toISOString()],
  };

  let { count: totalInboundRows, rows: inboundRows } =
    await db.DryMillingInboundWarehouse.findAndCountAll({
      where,
      distinct: true,
      order: [[col, sort.toUpperCase()]],
      include: [
        {
          model: db.WarehouseProductName,
          as: "warehouseProduct",
          attributes: ["name"],
        }
      ],
    });
  return {
    inboundWarehouse: {
      totalInboundRows,
      numRows: inboundRows?.length ?? 0,
      inboundRows,
    },
  };
}
module.exports = router;
