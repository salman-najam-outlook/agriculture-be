const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const S3 = require(rootPath + '/components/s3upload');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const shortid = require('short-uuid');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  '/helpers/general');
const organizationValidator = require(rootPath +
  '/helpers/validators/organization');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

const {
    createOrUpdateSuborg,
    getSubOrganizations,
    getSubOrganizationDetails,
    deactivateSubOrganization,
    deleteSubOrganization,
    exportSubOrganization,
    getMongoSubOrganization,
    getFarmMetricOfCurrentOrganization
} = require('../../../controllers/admin/organization');


/**
 * @swagger
 * /admin/organization/logo:
 *   put:
 *     summary: update organization logo
 *     description: update organization logo
 *     tags: [Admin Organization]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *     requestBody:
 *       description: upload csv to import user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { "base64Logo": "data:image/png;base64" }
 *             properties:
 *               base64Logo:
 *                type: string
 *     responses:
 *       200:
 *         description: show success message
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "logo": "https://dimitra-public-images.s3.amazonaws.com/org/81kSGrroRRJ7nWBRKRaN2z" } }
 *       500:
 *         description: Server error
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.put(
  '/logo',
  auth,
  organizationValidator.logoUpdate(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { base64Logo, recordId } = req.body;
      const { organization , subOrgId} = req.user;

      // get organization details
      let organizationData 
      if(subOrgId) {
        organizationData = await db.Organization.findOne({
          where: { id: subOrgId },
          attributes: ['id', 'name', 'code', 'logo', 'splashScreen', 'recordId'],
        });
      } else {
       organizationData = await db.Organization.findOne({
          where: { id: organization },
          attributes: ['id', 'name', 'code', 'logo', 'splashScreen', 'recordId'],
        });

      }
      if (organizationData === null) throw new Error('No organization found');

      // upload base64 image
      const params = {
        bucket: process.env.AWS_PUBLIC_BUCKET,
        base64: base64Logo,
        fileName: `org/${shortid.generate()}`,
      };
      const uploadedFile = await S3.uploadBase64(params);
      // save and format data
      const logo = uploadedFile.Location;
      const setOrganizationData = {
        logo,
        recordId,
      };
      removeEmptyValuesFromObject(setOrganizationData);
      await organizationData
        .set(setOrganizationData)
        .changed('logo', true)
        .save();
      organizationData = await organizationData?.toJSON();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: organizationData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);
router.put(
  '/splash-screen',
  auth,
  organizationValidator.splashUpdate(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { base64Splash, recordId } = req.body;
      const { organization } = req.user;

      // get organization details
      let organizationData = await db.Organization.findOne({
        where: { id: organization },
        attributes: ['id', 'name', 'code', 'logo', 'splashScreen', 'recordId'],
      });
      if (organizationData === null) throw new Error('No organization found');

      // upload base64 image
      const params = {
        bucket: process.env.AWS_PUBLIC_BUCKET,
        base64: base64Splash,
        fileName: `org/${shortid.generate()}`,
      };
      const uploadedFile = await S3.uploadBase64(params);
      console.log(uploadedFile)
      // save and format data
      const splashScreen = uploadedFile.Location;
      const setOrganizationData = {
        splashScreen,
        recordId,
      };
      removeEmptyValuesFromObject(setOrganizationData);
      await organizationData
        .set(setOrganizationData)
        .changed('splashScreen', true)
        .save();
      organizationData = await organizationData?.toJSON();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: organizationData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  '/update',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { custom_otp } = req.body;
      const { organization } = req.user;

      // get organization details
      let organizationData = await db.Organization.findOne({
        where: { id: organization },
      });
      if (organizationData === null) throw new Error('No organization found');


      // save and format data
      await organizationData.update({custom_otp});
       
      organizationData = await organizationData?.toJSON();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: organizationData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put('/update-hide-show-logo-splash',auth,validationErrorHandler, async (req, res) => {
  try {
    const { is_splash_hide, is_logo_hide } = req.body;
    const { organization } = req.user;

    // get organization details
    let organizationData = await db.Organization.findOne({
      where: { id: organization },
    });
    if (organizationData === null) throw new Error('No organization found');

    // save and format data
    await organizationData.update({is_splash_hide, is_logo_hide});
    organizationData = await organizationData?.toJSON();
    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: organizationData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

/**
 * @swagger
 * /admin/organization:
 *   get:
 *     summary: update organization logo
 *     description: update organization logo
 *     tags: [Admin Organization]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *     responses:
 *       200:
 *         description: show success message
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "logo": "https://dimitra-public-images.s3.amazonaws.com/org/81kSGrroRRJ7nWBRKRaN2z" } }
 *       500:
 *         description: Server error
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const { organization, subOrgId } = req.user;

      // get organization details
      let organizationData = await db.Organization.findOne({
        where: { id: subOrgId || organization },
        attributes: ['id', 'name', 'code', 'logo', 'splashScreen', 'recordId','custom_otp','is_logo_hide','is_splash_hide'],
      });
      if (organizationData === null) throw new Error('No organization found');
      organizationData = await organizationData?.toJSON();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: organizationData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /admin/organization/search:
 *   get:
 *     summary: Search organizations with optional country filter
 *     description: Get all organizations and their sub-organizations with optional country filtering
 *     tags: [Admin Organization]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter organizations by country (optional)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search organizations by name (optional)
 *     responses:
 *       200:
 *         description: Organizations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       code:
 *                         type: string
 *                       country:
 *                         type: string
 *                       isSubOrganization:
 *                         type: boolean
 *                       parentId:
 *                         type: integer
 *                       subOrganizations:
 *                         type: array
 *                         items:
 *                           type: object
 *       500:
 *         description: Server error
 */
router.get('/search', auth, async (req, res) => {
  try {
    const { country, search } = req.query;
    
    // Build where clause
    let whereClause = {
      isDeleted: { [db.Sequelize.Op.ne]: true }
    };
    
    // Add country filter if provided
    if (country) {
      whereClause.country = country;
    }
    
    // Add search filter if provided
    if (search) {
      whereClause.name = {
        [db.Sequelize.Op.like]: `%${search}%`
      };
    }
    
    // Get parent organizations (organizations without parentId or isSubOrganization = false)
    const parentOrganizations = await db.Organization.findAll({
      where: {
        ...whereClause,
        [db.Sequelize.Op.or]: [
          { parentId: null },
          { isSubOrganization: false }
        ]
      },
      attributes: ['id', 'name', 'code', 'country', 'isSubOrganization', 'parentId'],
      order: [['name', 'ASC']],
    });
    
    // Get sub-organizations for each parent
    const organizationsWithSubs = await Promise.all(
      parentOrganizations.map(async (parent) => {
        const subOrganizations = await db.Organization.findAll({
          where: {
            // we don't apply the main filters to sub-orgs to ensure they are always attached to their parents
            parentId: parent.id,
            isSubOrganization: true
          },
          attributes: ['id', 'name', 'code', 'country', 'isSubOrganization', 'parentId'],
          order: [['name', 'ASC']]
        });
        
        return {
          ...parent.toJSON(),
          subOrganizations: subOrganizations.map(sub => sub.toJSON())
        };
      })
    );
    
    return res.json(
      successRespSync({
        msg: "Organizations retrieved successfully",
        data: organizationsWithSubs
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Suborg creation routes
router.post('/sub-organization', auth, createOrUpdateSuborg);

// Fetch sub-organization listing
router.get('/sub-organizations', auth, getSubOrganizations);

// Fetch sub-organization details
router.get('/sub-organizations/:id', getSubOrganizationDetails);

// Deactivate a sub-organization
router.put('/sub-organizations/:id/deactivate', deactivateSubOrganization);

// Delete a sub-organization
router.delete('/sub-organizations/:id', deleteSubOrganization);


router.get('/sub-organization/export', auth, exportSubOrganization); 

router.get('/sub-organization-mongo', auth, getMongoSubOrganization);

// Get all organizations for admin use
router.get('/all', auth, async (req, res) => {
  try {
    const organizations = await db.Organization.findAll({
      attributes: ['id', 'name', 'logo', 'splashScreen', 'code'],
      order: [['name', 'ASC']]
    });
    
    res.json(
      successRespSync({
        msg: success.FETCH,
        data: organizations,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/farm-metric', auth, getFarmMetricOfCurrentOrganization);

module.exports = router;
