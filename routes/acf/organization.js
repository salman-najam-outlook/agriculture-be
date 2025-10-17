const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const { v4: randomSting } = require('uuid');

const _ = require('lodash');
const db = require('../../models');
const { Roles, user, UserRole, AdminUsersRolesModulesPermissions, Organization, SidebarMenu } = db;
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");
const { logErrorOccurred, notEmpty, isObject } = require(rootPath + "/helpers/general");

// Get all organizations (paginated, search by name/code/country)
router.get('/all-orgs', async (req, res) => {

    try {  
        const organizations = await Organization.findAll({
            where:{
                isDeleted:0,
                isSubOrganization:0
            },
            order: [['id', 'DESC']]
        });
         res.json(
            successRespSync({
                msg: "Fetched successfully",
                data: organizations,
            })
        );

    } catch (err) { 
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
})

router.get('/sub-orgs/:orgId', async (req, res) => {

    try {  
        const organizations = await Organization.findAll({
            where:{
                isDeleted:0,
                parentId:req.params.orgId
            },
            order: [['id', 'DESC']]
        });
         res.json(
            successRespSync({
                msg: "Fetched successfully",
                data: organizations,
            })
        );

    } catch (err) { 
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
})



router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const where = {
        parentId:null,
        isDeleted:0,
        isSubOrganization:0
    };
    if (req.query.name) {
      where.name = { [Op.like]: `%${req.query.name}%` };
    }
    if (req.query.code) {
      where.code = { [Op.like]: `%${req.query.code}%` };
    }
    if (req.query.country) {
      where.country = { [Op.like]: `%${req.query.country}%` };
    }

    if(req.query){
        const { rows: resData, count } = await Organization.findAndCountAll({
        where,
        offset,
        limit,
        order: [['id', 'DESC']]
        });
        res.json(
        successRespSync({
            msg: "Fetched successfully",
            data: {
            numRows: count,
            data: resData,
            total: count,
            page,
            },
        })
        );
    }


  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get one organization by id
router.get('/:id', async (req, res) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org) {
      return res.status(404).json(errorRespSync({ msg: 'Organization not found', code: 404 }));
    }
    res.json(
      successRespSync({
        msg: "Fetched successfully",
        data: { numRows: 1, data: [org] },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Create organization
router.post('/', async (req, res) => {
  try {
    const { name, code, country, activationKeysAllowed } = req.body;
    if (!name || !code || !country) {
      return res.status(400).json(errorRespSync({ msg: 'Name, code, and country are required', code: 400 }));
    }
    const newOrg = await Organization.create({ 
        name, 
        code,
        country,
        dimitraPointSystem:0,
        activationKeysAllowed,
        registrationDate: new Date()
        });

     //After creating new organization create default menu item from organization Id 3 
     const sidebars = await SidebarMenu.findAll({ where: { organization: '3' } });
     const newSidebarItems = sidebars.map(item => {
     const {organization, active, ...rest} = item.toJSON();
      return {...rest, organization: newOrg.id, active:1}
     })
     await SidebarMenu.bulkCreate(newSidebarItems);
    res.json(
      successRespSync({
        msg: "Organization created successfully",
        data: { numRows: 1, data: [newOrg] },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Update organization
router.put('/:id', async (req, res) => {
  try {
    const { name, code, country } = req.body;
    const org = await Organization.findByPk(req.params.id);
    if (!org) {
      return res.status(404).json(errorRespSync({ msg: 'Organization not found', code: 404 }));
    }
    await org.update({ name, code, country });
    res.json(
      successRespSync({
        msg: "Organization updated successfully",
        data: { numRows: 1, data: [org] },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
