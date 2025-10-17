const express = require("express");
const router = express.Router();
// loading models
const db = require(rootPath + "/models");
// loading middleware
const auth = require(rootPath + "/middleware/auth");
// loading helpers
const { successResp, errorRespSync, successRespSync, errorResp, serverError } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { createOTP, sendSMS, sendEmail, logErrorOccurred, notEmpty } = require(rootPath +
  "/helpers/general"); // constant messages
const translation = require(rootPath + '/middleware/translation');
const fs = require('fs')
var request = require('request');
const path = require('path')

const {
  auditGetValidation,
  userRoleValidation,
  rolePostValidation,
  loginValidation,
} = require(rootPath + "/helpers/validation");
const appUserValidator = require(rootPath + "/helpers/validators/appUser");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

const { Op } = require('sequelize');

// Create userRole
router.post(
  "/",
  auth,
  userRoleValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const userId = req.user.id
      const chkUserRole = await db.UserRole.findOne({
        where: {
          name
        },
        raw: true
      });
      const data = {
        id: name.replaceAll(" ", "_"),
        name,
        description,
        created_by: userId
      }
      if (chkUserRole != null) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.ALREADY_EXISTS,
          })
        );
      }
        userResult = await db.UserRole.create(data);       
        res.json(
          await successResp({
            msg: success.ADMIN_USER_CREATED,
            data: userResult,
          })
        );     
    } catch (err) {
      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err.message);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);


// api to get userRole
router.get("/", auth, validationErrorHandler, translation, async (req, res) => {
  try {
    const { page, limit, searchPhrase } = req.query;
    let listRes = []
    //get userRoles
    let query = {};
    if(searchPhrase){
      query.where = {
        [Op.or] : [
          {name : { [Op.like] : `%${searchPhrase}%` }},
          {description : { [Op.like] : `%${searchPhrase}%` }}
        ]
      }
    }else{
      query.where = {}
    }
    query.where.isdeleted = null;
    if(page && limit){
      query.offset = (page-1)*limit;
      query.limit = parseInt(limit);
    }
    listRes = await db.UserRole.findAll(query);
    return res.json(
      successRespSync({
        msg: "Roles fetched successfully",
        data: listRes
        
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
});

// upadte user Role
router.put(
  "/:id",  
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const id = req.params.id;   
      // update userRole in DB
      await db.UserRole.update({ name, description }, { where: { id } });
      res.json(
        await successResp({
          msg: success.ROLE_UPDATED,
          data: {},
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

router.put(
  "/:id",  
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const id = req.params.id;   
      // update userRole in DB
      await db.UserRole.update({ name, description }, { where: { id } });
      res.json(
        await successResp({
          msg: success.ROLE_UPDATED,
          data: {},
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

//userRole soft delete
router.delete(
  "/:id",  
  async (req, res) => {
    try {
      const id = req.params.id;   
      // update delete status for role in DB
      await db.UserRole.update({ isdeleted: new Date() }, { where: { id } });
      res.json(
        await successResp({
          msg: success.ROLE_UPDATED,
          data: {},
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

module.exports = router;