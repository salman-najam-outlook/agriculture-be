const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const fileUpload = require(rootPath + "/middleware/file_upload");
const {  createEnquiryValidation, updateEnquiryStatusValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath + "/middleware/validation_error_handler");
const { CreateAdminNotification } = require(rootPath + "/helpers/systemNotifications");
const {
  sendPushNotification
} = require(rootPath + '/helpers/pushNotification');
const db = require(rootPath + "/models");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const {
  addDays
} = require(rootPath + "/helpers/general");
const { Op, Sequelize } = require("sequelize");
const { checkOrganizationAssociationValidation } = require("../../helpers/validation");
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const { modulesApiExcludedText } = require(rootPath + '/helpers/consts');
const translation = require(rootPath + '/middleware/translation');
const {assignToSupportAdmin} = require("./enquiry.controller")
const {recordLogs} = require("../admin/tickets/tickets.controller")

/**
 * @swagger
 * /enquiry/areaOfRequest:
 *   get:
 *     summary: API to get Areas of Request
 *     description: API to get Areas of Request.
 *     tags: [Enquiry]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                 example: {"success": true, "code": 200, "message": "modules retrieved", "data": { "modules":[{"id": "audit","name": "Soil Management","parent_module_id": "my_farm","createdAt": "2022-03-14T01:17:38.000Z","updatedAt": "2022-03-14T01:17:38.000Z"},{"id": "coffee/buying-station","name": "Buying Station","parent_module_id": "coffee","createdAt": "2022-07-10T11:15:53.000Z","updatedAt": "2022-07-10T11:15:53.000Z"}]}}
*
*/

router.get("/areaOfRequest", auth, translation, async function (req, res) {
  try{
    let getModulesData = await db.Modules.findAll({
      attributes: [['name', 'id'], 'name']
      , where: {
             name: {
          [Op.in]: ["Eudr Due Diligence", "farms", "users"]
        }
      }, group: ['name'],
      raw: true
      })

    if (req.headers.lang && req.headers.lang != 'en') {
      getModulesData = req.translateFunction(
        getModulesData,
        globalTranslationCache,
        {
          lvl1: true,
        }
      );
    }
      return res.json(
        successRespSync({
          msg: "modules retrieved",
          data: getModulesData,
        })
      );
  }catch(error){
    return serverError(res, error);
  }
})


/**
 * @swagger
 * /enquiry:
 *   post:
 *     summary: Add Enquiry From App side
 *     description: Add Enquiry From App side
 *     tags: [Enquiry]
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
 *       description: Add Enquiry Request
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                type: string
 *               description:
 *                type: string
 *               areaOfRequest:
 *                type: string
 *               type:
 *                type: string
 *               recordId:
 *                type: string
 *               file:
 *                type: string
 *                format: binary
 *             required:
 *               - subject
 *               - description
 *               - areaOfRequest
 *               - type
 *     responses:
 *       200:
 *         description: show success response
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
 *               example: { "success": true, "code": 200, "message": "Created successfully", "data": { "id": 2,"subject": "Test","description": "This is a test Description for user","status": "closed","areaOfRequest": "test area of request","type": "Question", "recordId": null,"createdAt": "2022-07-18T12:40:54.000Z","updatedAt": "2022-07-18T12:40:54.000Z" } }
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

router.post("/", auth,checkOrganizationAssociationValidation(),validationErrorHandler, duplicateRecordId.handleDuplicateRecordId('Ticket'),
 fileUpload({
    acl: 'public-read',
    bucket: process.env.AWS_PUBLIC_BUCKET,
    whiteListMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ],
  }),
  validationErrorHandler,  
  async function (req, res) {
    try {     
      let userId = req.user.id;
      let org_id = req.user.organization;
      let adminAssigneeId = null;

      // organization admin user

      let adminRoles = [];
      adminRoles = await db.Roles.findAll({
        where: {
          id: {
            [Op.not]: ['end_user', 'super_admin'],
          },
        },
        attributes: ['id'],
        raw: true,
      });
      adminRoles = adminRoles.map((ar) => ar.id);

      // First try to get admin users with ticket permissions using EXISTS subquery
      let adminUser = await db.user.findAll({
        where: {
          organization: org_id,
          active: true,
          [Op.and]: [
            Sequelize.literal(`EXISTS (
              SELECT 1 FROM admin_user_roles aur 
              JOIN admin_users_roles_modules_permissions aurmp ON aur.role_id = aurmp.role_id
              WHERE aur.user_id = user.id 
              AND aurmp.module_id LIKE '%tickets%' 
              AND aurmp.permission_id = 'get' 
              AND aurmp.permitted = 1
            )`)
          ]
        },
        include: [
          {
            model: db.Roles,
            as: 'user_role_assoc',
            through: { model: db.AdminUserRoles, attributes: [] },
            attributes: ['id', 'name'],
            required: true,
            where: {
              id: {
                [Op.in]: adminRoles,
              },
            },
          }
        ],
      });

      // If no users with ticket permissions found, get all admin users as fallback
      if (adminUser.length === 0) {
        adminUser = await db.user.findAll({
          where: {
            organization: org_id,
            active: true
          },
          include: [
            {
              model: db.Roles,
              as: 'user_role_assoc',
              through: { model: db.AdminUserRoles, attributes: [] },
              attributes: ['id', 'name'],
              required: true,
              where: {
                id: {
                  [Op.in]: adminRoles,
                },
              },
            }
          ],
        });
      }

      const userData = await db.user.findOne({
        attributes: ['firstName', 'lastName', 'email'],
        where: {
          id: userId
        }
      })
      let {       
        subject,
        description,
        areaOfRequest,
        type,
        recordId
      } = req.body;

      if(!recordId){
        recordId = null;
      }

      const ticket = await db.Ticket.create({
          ticketUserType: 'Single User',
          requestorName: `${userData.firstName} ${userData.lastName}`,
          requestorEmail: userData.email,
          createdBy: userId,
          subject,
          description,
          status : 'open',
          areaOfRequest,
          type,
          requesterId: userId,
          recordId,
          org_id,
          startDate: new Date(),
          endDate: addDays(7, new Date()),
          priority: "High"
        },
        { raw: true }

      );
      if (ticket) {
      adminAssigneeId =  await assignToSupportAdmin(req, ticket);
        if(req.files){
          let ticketMediaArr = []
          req.files.forEach(file => { 
            ticketMediaArr.push({
              ticketId: ticket.id,
              fileName: file.location,
              profilePicS3Key: file.key
            })
          } )
          await db.ticketMedia.bulkCreate(ticketMediaArr)
        }
        ticket.assigneeId = adminAssigneeId;
      }

      let message = `New Enquiry From User ${userData.firstName} ${userData.lastName} with Enquiry ID - ${ticket?.id}`;

      let promiseArr = []
      adminUser.map(async el => {
        promiseArr.push( CreateAdminNotification(userId, el.id, message)) 
      })

      await Promise.all(promiseArr)
      // send push notification
      const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
        attributes: [
          'device_registration_token'
        ],
        where: {
          userId
        }
      })

      const firebaseToken = [];

      for (const device of deviceRegistrationToken) {
        firebaseToken.push(device.device_registration_token);
      }

      if (firebaseToken.length > 0) {
        const response = await sendPushNotification(firebaseToken, `Enquiry has been submitted for Enquiry ID ${ticket?.id}`)
        console.log(response)

      }
      await recordLogs(req, ticket, "support_ticket_create_logs");
      return res.json(
        successRespSync({
          msg: "Enquiry Generated",
          data: ticket,
        })
      );
    } catch (error) {

      return serverError(res, error);
    }
  }
);


/**
 * @swagger
 * /enquiry:
 *   get:
 *     summary: API to get Enquiries
 *     description: API to get Enquiries.
 *     tags: [Enquiry]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         example: '1'
 *         description: 'page number'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         example: '10'
 *         description: 'no of rows to return'
 *       - in: query
 *         name: searchPhrase
 *         schema:
 *           type: string
 *         description: 'Subject or Description'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["open", "closed", "additional information required"]
 *         description: 'Status'
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
 *                 example: {"success": true, "code": 200, "message": "tickets", "data": { "enquiriesCount": 1, "enquiry": [ {"id": 2,"subject": "Test","description": "This is a test Description for user","status": "closed","areaOfRequest": "test area of request","type": "Question","createdAt": "2022-07-18T12:40:54.000Z","updatedAt": "2022-07-18T12:40:54.000Z","ticketMedia": [],"ticketComments": []}]}}
*
*/

router.get("/", auth,  async function (req, res) {
  try {
    let requesterId = req.user.id;
    let where = { ticketUserType : 'Single User', requesterId};
    let query= {};
    query.order = [];
    let {page, limit, searchPhrase, order} = req.query;
    query.order.push(['createdAt', 'DESC']);   
    
    if(searchPhrase){ 
      where = {  [Op.or]: [{
          subject: { 
             [Op.like]: `%${searchPhrase}%`
            }
          },
          {
          description: { 
            [Op.like]: `%${searchPhrase}%`
          }
          }]
        }
    }
    
    if(order && order != "All"){
      where.status = order
    }
    
    query.where = where;
    const enquiriesCount = await db.Ticket.count({   
      ...query,  
    });  
    if(page && limit){
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const enquiry = await db.Ticket.findAll({
      attributes: [
        "id",
        "subject",
        "description",
        "status",
        "areaOfRequest",
        "type",
        "recordId",
        "createdAt",
        "updatedAt"
    ],
      ...query,     
      include: [
        {
          model: db.ticketMedia,
          as: "ticketMedia",
        },
        {
          model: db.TicketComments,
          as: "ticketComments",
        }
      ],
    });
    
    if (!enquiry) {
      return res.json(
        errorRespSync({
          msg: "no Enquiries found",
        })
      );
    } else {
      const apiResp = {
        enquiriesCount,
        enquiry
      }
      return res.json(
        successRespSync({
          msg: "Enquiries",
          data: apiResp,
          
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /enquiry/{id}:
 *   get:
 *     summary: API to get Single Enquiry
 *     description: API to get Single Enquiry.
 *     tags: [Enquiry]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: path
 *         name: id
 *         required: true
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
 *                 example: {"success": true, "code": 200, "message": "Enquiry", "data": { "id": 2,"subject": "Test","description": "This is a test Description for user","status": "closed","areaOfRequest": "test area of request","type": "Question","createdAt": "2022-07-18T12:40:54.000Z","updatedAt": "2022-07-18T12:40:54.000Z","ticketMedia": [],"ticketComments": []} }
*
*/
router.get("/:id", auth,  async function (req, res) {
  try {
    const requesterId =  req.user.id;
    const enquiry = await db.Ticket.findOne({
      where: { id: req.params.id, requesterId},
      attributes: [
        "id",
        "subject",
        "description",
        "status",
        "areaOfRequest",
        "type",
        "recordId",
        "createdAt",
        "updatedAt"
    ],
      include: [
        {
          model: db.ticketMedia,
          as: "ticketMedia",
        },
        {
          model: db.TicketComments,
          as: "ticketComments",
        }
      ],
      order: [['id', 'DESC']]
    });
    if (!enquiry) {
      return res.json(
        errorRespSync({
          msg: "No Enquiry found",
        })
      );
    } else {
      return res.json(
        successRespSync({
          msg: "Enquiry",
          data: enquiry,
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /enquiry/{id}:
 *   put:
 *     summary: Update Enquiry Status From App side
 *     description: Update Enquiry Status From App side
 *     tags: [Enquiry]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Update Enquiry
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                type: string
 *     responses:
 *       200:
 *         description: show success response
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
 *               example: { "success": true, "code": 200, "message": "Status Updated", "data": { } }
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

router.put("/:id", auth, updateEnquiryStatusValidation(), validationErrorHandler, async function (req, res) {
  let transaction = await db.sequelize.transaction();
  try {
    let { id } = req.params;  
    
    let { status } = req.body;
  
    var set = { status }
    
    
    
    const enquiry = await db.Ticket.findOne(
      {
        where: { id }
      }
    );
    if (enquiry) {
      const updateEnquiry = await db.Ticket.update(set,
        {
          where: { id },
          transaction
        }
      );

      await transaction.commit()
      return res.json(
        successRespSync({
          msg: "Status updated"
        })
      );
    } else {
      await transaction.rollback()
      return res.json(
      errorRespSync({
          msg: "no Data found",
        })
      );
    }
  } catch (error) {
    await transaction.rollback()
    return serverError(res, error);
  }
});

module.exports = router;