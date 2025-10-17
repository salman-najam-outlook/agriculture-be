const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
const { Op } = require("sequelize");
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty, getUserIdsByOrganization } = require(rootPath + '/helpers/general');
const { deleteFileS3, uploadToS3 } = require(rootPath + '/helpers/aws_s3');
const fileUpload = require(rootPath + '/middleware/file_upload');
const userUploadValidator = require(rootPath +
  '/helpers/validators/userUpload');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

const { CreateUserNotification, SendNotificationToMultipleDevices } = require(rootPath + '/helpers/systemNotifications');

  /**
 * @swagger
 * /admin/plantation:
 *   get:
 *     summary: API for getting plantation list.
 *     description: API for getting plantation list.
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderField
 *         description: 'field name to sort with'
 *         schema:
 *           type: string
 *           enum: [farm, user, plantation_name, createdAt]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc] 
 *       - in: query
 *         name: searchPhrase
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
 *                 example: { "success": true, "code": 200, "message": "Plantations data successfully fetched.", "data": { "count": 1, "response": [ { "id": 11, "user_id": 246, "plantation_name": "Test another user", "commodity_id": 1, "harvested_trees_count": 100, "area": 100, "expected_yield": 200, "is_deleted": false, "recordId": null, "status": "pending", "createdAt": "2022-06-26T23:47:48.000Z", "updatedAt": "2022-06-26T23:47:48.000Z", "userFarm": { "id": 315, "farmName": "my farm", "area": 1279590 }, "user": { "fullName": "Sobia  B", "firstName": "Sobia ", "lastName": "B" } } ] } }    
 */

router.get("/", auth, async (req, res) => {
  try {
    const {id, organization, subOrgId} = req.user;
    const { userId } = req.query;

    // Get organization user IDs for filtering
    const organizationUserIds = await getUserIdsByOrganization(db, organization, subOrgId);



    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No plantations found for this organization.",
          data: {
            count: 0,
            response: [],
          },
        })
      );
    }

    // Filters
    let where = { [Op.and]: [{
      is_deleted: false,
      user_id: {
        [Op.in]: organizationUserIds
      }
    }
    ]}



    let query= {}
    query.order = []
    let { page, limit, searchPhrase, orderField, order, status } = req.query;
    if(status && status !== 'all'){
      where.status = status;
    }

    if (orderField && order) {
      if (orderField == 'farm') {
        query.order = [['userFarms', 'farmName', order]];
      } else  if (orderField == 'user') {
        query.order = [['user', 'firstName', order]];
      }  else {
        query.order = [[orderField, order]];
      }
    } else {
      query.order.push(['createdAt', 'DESC'])  
    }

    query.where = where
    // if( page && limit ){
    //   page = parseInt(page)
    //   limit = parseInt(limit)
    //   query.offset = (page - 1) * limit
    //   query.limit = limit
    // }

    // count number of plantations
    // const count = await db.Plantations.count({   
    //   ...query,  
    //   include: [
    //     {
    //       attributes: [],
    //       model: db.user,
    //       as: "user",
    //       where: { organization },
    //       required: true
    //     },
    //   ]
    // })

    let userWhere = {};
    if (userId > 0) {
      userWhere = { id: userId };
    }
    const response = await db.Plantations.findAll({
      attributes: [
        "id",
        "user_id",
        "plantation_name",
        // "commodity_id",
        // "harvested_trees_count",
        // "area",
        "expected_yield",
        "is_deleted",
        "recordId",
        "status",
        "createdAt",
        "updatedAt"
    ],
      ...query,
      include: [
        {
          attributes: ["id", "farmName", "registrationNo", "farmerId", "area", "farmerFirstName", "farmerMiddleName", "farmerLastName", "isTechnician",
          "technicianId"],
          model: db.user_farm,
          as: "userFarms",
          include: [

            {
              attributes: ["firstName","middleName", "lastName", "fullName", "mobile", "email"],
              model: db.user,
              as: "user",
              where: {
                ...userWhere,
                organization,
              },
              required: true
            },
          ]         
        },

        {
          attributes: ["firstName","middleName" ,"lastName", "fullName", "mobile", "email"],
          model: db.user,
          as: "user",
          where: {
            ...userWhere,
            organization,
          },
          required: true
        },
   
      ]
    })



    let recordsAllFiltered = response.filter(record => {
      // Check if the searchTerm matches the farmName, fullName, or email
      // this is easier than mysql nested search
      const searchLowerCase = searchPhrase.toLowerCase();

      return (
        record?.userFarms.some(farm => farm.farmName.toLowerCase().includes(searchLowerCase)) ||
        record?.user?.fullName.toLowerCase().includes(searchLowerCase) ||
        record?.user?.email?.toLowerCase().includes(searchLowerCase) ||
        record?.user?.mobile?.includes(searchLowerCase) ||
        record?.plantation_name?.toLowerCase().includes(searchLowerCase)
      );
    });

    let count = recordsAllFiltered.length ?? 0;

    // Applying pagination after filtering
    if (page && limit) {

      page = parseInt(page);
      limit = parseInt(limit);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      recordsAllFiltered = recordsAllFiltered.slice(startIndex, endIndex);
    }

    if (!response) {
      return res.json(
        errorRespSync({
          msg: "Plantations data not found.",
        })
      )
    } else {
      return res.json(
        successRespSync({
          msg: "Plantations data successfully fetched.",
          data: {
            count,
            response:recordsAllFiltered
          },
          
        })
      )
    }
  } catch (error) {
    return serverError(res, error)
  }
})

/**
 * @swagger
 * /admin/plantation/{id}:
 *   put:
 *     summary: Update (approve/decline) plantation
 *     description: Update plantation
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of plantation
  *     requestBody:
 *       description: Request body for updating plantation
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                rejectionReason:
 *                  type: string
 *            example:
 *              {"status":"rejected", rejectionReason: "rejection reason text"}
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
 *                     properties:
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Plantation status updated", "data": [ 1 ] } 
 */

//update status
router.put("/:id", auth, async (req, res) => {
  try {
    const {status, rejectionReason} = req.body
    const {id} = req.params
  
    let set = {status, rejection_reason: rejectionReason}
    if(status === 'approved') {
      set = {...set, plantationStatus: 'active'}
    }
    if(status === 'rejected') {
      set = {...set, plantationStatus: 'unapproved'}
    }
    let plantationRes = await db.Plantations.update(set,
      {
        where: { id },
      }
    );

    const isRejected = status.toLowerCase() === 'rejected';

    const messageData = {
      title: isRejected ? 'Rejected Alert' : 'Approved Alert',
      body: `Your plantation has been ${isRejected ? 'rejected' : 'approved'}.`,
      notification_type: 'plantation',
      report_id: plantationRes.id,
      report_type: status,
      status: status,
    };

    await CreateUserNotification(plantationRes.user_id, JSON.stringify({ title: messageData.title, body: messageData.body }));
    await SendNotificationToMultipleDevices(plantationRes.user_id, messageData);

    return res.json(
      successRespSync({
        msg: "Plantation status updated",
        data: plantationRes,
      })
    );
  } catch (error) {
     return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/plantation/csvFile:
 *   get:
 *     summary: Get csv file download link
 *     description: Get csv file download link
 *     tags: [Admin]
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
 *                     properties:
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Plantation csv download url fetched", "data": "https://plantation-csv.s3.amazonaws.com/1656388623670_plantation.csv" } 
 */
router.get("/csvFile", auth, async (req, res) => {
  try {
    const { organization, subOrgId } = req.user;
    const { userId } = req.query;

    // Get organization user IDs for filtering
    const organizationUserIds = await getUserIdsByOrganization(db, organization, subOrgId);



    // Filters
    let where = { [Op.and]: [{
      is_deleted: false,
      user_id: {
        [Op.in]: organizationUserIds
      }
    }
    ]}
    let query= {}
    const status = req.query.status;
    if(status && status !== 'all'){
      where.status = status;
    }

    let userWhere = {};
    if (userId > 0) {
      userWhere = { id: userId };
    }
   let plantationRes = [], plantationSheet
   const workbook = xlsx.utils.book_new();
   query.where = where;
   plantationRes = await db.Plantations.findAll({
    attributes: [
      "plantation_name",
      "status",
      "id",
      db.sequelize.literal('DATE_FORMAT(`Plantations`.`createdAt`, "%Y-%m-%d") AS Date'),
  ],
    ...query,
    include: [
      {
        attributes: [
          db.sequelize.literal("farmName AS 'Farm/Location'"),
          "farmerFirstName", 
          "farmerMiddleName", 
          "farmerLastName", 
          "isTechnician",
          "technicianId"
        ],
        model: db.user_farm,
        as: "userFarms",
        include: [

          {
            attributes: [
              db.sequelize.literal("firstName AS 'userFirstName'"),
              db.sequelize.literal("middleName AS 'userMiddleName'"),
              db.sequelize.literal("lastName AS 'userLastName'"),
              db.sequelize.literal("mobile AS 'phoneNumber'"),
              db.sequelize.literal("email AS 'email'"),
            ],
            model: db.user,
            as: "user",
            where: {
              ...userWhere,
              organization,
            },
            required: true
          },
        ]         
      },
 
    ],
     raw: true
   })

  const groupedDataMap = new Map();
  plantationRes.forEach(entry => {
    const plantationId = entry.id;
    const farmName = entry["Farm/Location"];
    const farmerFirstName = entry['userFarms.farmerFirstName'];
    const farmerName = farmerFirstName
      ? `${farmerFirstName} ${entry['userFarms.farmerMiddleName'] || ''} ${entry['userFarms.farmerLastName']}`.trim().replace(/\s+/g, ' ')
      : `${entry['userFirstName']} ${entry['userMiddleName'] || ''} ${entry['userLastName']}`.trim().replace(/\s+/g, ' ');

    if (!groupedDataMap.has(plantationId)) {
      groupedDataMap.set(plantationId, []);
    }
    
    groupedDataMap.get(plantationId).push({farmName:farmName, farmerName: farmerName});
  });
  const finalResult = Array.from(groupedDataMap.entries()).map(([plantationId, entries]) => ({
    plantation_id: plantationId,
    farmName: entries.map(entry => entry.farmName).join('/'),
    farmerName: entries.map(entry => entry.farmerName).join('/')
  }));
  let convertedResult = finalResult.map(({ plantation_id, farmName, farmerName }) => {
    // Find the corresponding entry in plantationRes based on plantation_id
    const initialEntry = plantationRes.find(entry => entry.id === plantation_id);
  
    // Create a new object by merging initialEntry and finalResult properties
    if(initialEntry['userLastName']){
      return {
        "Farmer Name": farmerName,
        email: initialEntry['email'],
        "Phone Number": initialEntry['phoneNumber'],
        "Plantation Name": initialEntry["plantation_name"],
        "Farm/Location": farmName,
        Date: initialEntry.Date,
        status: initialEntry.status
      };
    }else{
      return {};
    }
  });
  let filteredConvertedResult = convertedResult.filter(entry => Object.keys(entry).length > 0);

   plantationSheet = xlsx.utils.json_to_sheet(filteredConvertedResult) 
   xlsx.utils.book_append_sheet(workbook, plantationSheet);
   let csvBuffer = xlsx.write(workbook, {type: 'buffer', bookType: 'csv'});
   let uploadRes = await uploadToS3(`${new Date().getTime()}_plantation.csv`,csvBuffer, "plantation-csv" )
    return res.json(
      successRespSync({
        msg: "Plantation csv download url fetched",
        data: uploadRes.Location,
      })
    );
  } catch (error) {
     return serverError(res, error);
  }

 })

 // /admin/plantation/save-setting:
router.post("/save-setting", auth, async (req, res) => {
  try {
    const {id, organization} = req.user;
    const {approvalOption, autoApprovalLimit} = req.body

    let result = await db.PlantationSetting.findOne({  
      where: {
        organization_id: organization
      }
    });
    if (result) {
      await db.PlantationSetting.update(
        {
          approvalOption: approvalOption || "",
          autoApprovalLimit: autoApprovalLimit || "",
        },
        {
          where: { id: result.id }
        }
      );
    } else {
      const json = {
        organization_id: organization,
        approvalOption: approvalOption || "",
        autoApprovalLimit: autoApprovalLimit || "",
      }
      await db.PlantationSetting.create(json);
    }
    return res.json(
      successRespSync({
        msg: "Plantation setting saved"
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

// /admin/plantation/get-setting:
router.get("/get-setting", auth, async (req, res) => {
  try {
    const {id, organization} = req.user;

    let result = await db.PlantationSetting.findOne({  
      where: {
        organization_id: organization
      }
    });
    const data = {
      approvalOption: '',
      autoApprovalLimit: ''
    }
    if(result) {
      data.approvalOption = result.approvalOption;
      data.autoApprovalLimit = result.autoApprovalLimit;
    }
    return res.json(
      successRespSync({
        msg: "Plantation settings",
        data: data
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
})

module.exports = router;