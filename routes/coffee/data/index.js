const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
const { sortCoffeeVarieties } = require('../../../helpers/coffee-variety');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { deleteFileS3 } = require(rootPath + '/helpers/aws_s3');
const fileUpload = require(rootPath + '/middleware/file_upload');
const userUploadValidator = require(rootPath +
  '/helpers/validators/userUpload');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const translation = require(rootPath + "/middleware/translation");



/**
 * @swagger
 * /api/coffee-data/windBreaker:
 *   get:
 *     description: Returns all winbreaker data
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Wind breaker fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get("/windBreaker", auth, translation, async function (req, res) {
  try {
    const userId = req.user.id;
    
    const {page, limit } = req.query;
    
    let query = {where: { isDeleted: false }}
    if(page && limit){
      query.offset = parseInt((page-1) * limit);
      query.limit = parseInt(limit)
    }
    
    let windBreakerRes = await db.WindBreaker.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/windBreaker",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Wind breaker fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /api/coffee-data/coffeeSpecies:
 *   get:
 *     description: Returns all coffee species data
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coffee species fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
 router.get("/coffeeSpecies", auth, translation, async function (req, res) {
  try {
    const userId = req.user.id;
    const organization = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    const { name, sortingType, page, limit } = req.query;
    
    // Get all user IDs within the organization/sub-organization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, organization, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, organization, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this organization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = {where: { isDeleted: false }}
    // query.include =[{
    //   model: db.CoffeeVariety
    // }]
    if(page && limit){
      query.offset = parseInt((page-1) * limit);
      query.limit = parseInt(limit)
    }
    if(name && sortingType){
      query.order = [[name, sortingType]];
    }
    
    // Filter by organization users
    query.where.created_by = {
      [db.Sequelize.Op.in]: organizationUserIds
    };
    
    let windBreakerRes = await db.CoffeeSpecies.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/coffeeSpecies",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Coffee species fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /api/coffee-data/coffeeVariety:
 *   get:
 *     description: Returns all coffee variety data
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coffee variety fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/coffeeVariety/:id", auth, translation, async function (req, res) {
  try {
    const userId = req.user.id;
    const organization = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    const { name, sortingType, page, limit } = req.query;
    const coffeeSpeciesId = req.params.id
    
    // Get all user IDs within the organization/sub-organization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, organization, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, organization, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this organization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query
    if (coffeeSpeciesId === 'all') {
      query = {where: { isDeleted: false }}
    } else {
      query = {where: { isDeleted: false, coffee_species: Number(coffeeSpeciesId) }}
    }
    
    // Filter by organization users
    query.where.created_by = {
      [db.Sequelize.Op.in]: organizationUserIds
    };
    
    query.include =[{
      model: db.CoffeeSpecies
    }]
    if(page && limit){
      query.offset = parseInt((page-1) * limit);
      query.limit = parseInt(limit)
    }
    if(name && sortingType){
      query.order = [[name, sortingType]];
    }
    let getCoffeeVarieties = await db.CoffeeVariety.findAndCountAll(query);
    if(getCoffeeVarieties.rows) {
      sortCoffeeVarieties(getCoffeeVarieties.rows);
    }
    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      getCoffeeVarieties = req.translateFunction(
        getCoffeeVarieties,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/coffeeVariety",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Coffee variety fetched",
        data: getCoffeeVarieties,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /api/coffee-data/horticultureInfo:
 *   get:
 *     description: Returns all horticulture info data
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: horticulture info fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/horticultureInfo", auth, translation, async function (req, res) {
  try {
    const userId = req.user.id;
    const organization = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    const {page, limit } = req.query;
    
    // Get all user IDs within the organization/sub-organization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, organization, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, organization, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this organization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = {where: { isDeleted: false }}
    if(page && limit){
      query.offset = parseInt((page-1) * limit);
      query.limit = parseInt(limit)
    }
    
    // Filter by organization users
    query.where.created_by = {
      [db.Sequelize.Op.in]: organizationUserIds
    };
    
    let windBreakerRes = await db.HorticultureInformation.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/horticultureInfo",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Horticulture info fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /api/coffee-data/shadeTree:
 *   get:
 *     description: Returns all shade tree data
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: shade tree fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/shadeTree", auth, translation, async function (req, res) {
  try {
    const userId = req.user.id;
    const organization = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    const {page, limit } = req.query;
    
    // Get all user IDs within the organization/sub-organization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, organization, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, organization, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this organization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = {where: { isDeleted: false }}
    if(page && limit){
      query.offset = parseInt((page-1) * limit);
      query.limit = parseInt(limit)
    }
    
    // Filter by organization users
    query.where.created_by = {
      [db.Sequelize.Op.in]: organizationUserIds
    };
    
    let windBreakerRes = await db.ShadeTree.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/shadeTree",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Shade tree fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});





module.exports = router;
