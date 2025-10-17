const express = require("express");
const moment = require('moment');
const { body } = require("express-validator");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { langObj } = require("../../../helpers/consts");
const { error, success } = require(rootPath + "/helpers/language");
const { modulesApiExcludedText } = require('../../../helpers/consts');
const { deleteFileS3 } = require('../../../helpers/aws_s3');
const { 
        createTicketValidation,
        updateTicketValidation,
        deleteTicketValidation,
        getTicketUserValidation,
        markAsReadValidation
      } = require("../../../helpers/validation");
const {
    createOTP,
    fileFilterGen,
    sendSMS,
    logErrorOccurred,
    validateMobileNumber,
  } = require(rootPath + '/helpers/general');
const validationErrorHandler = require("../../../middleware/validation_error_handler");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const { user, ticketMedia } = require("../../../models");
const db = require(rootPath + "/models");
const modulesModel = require("../../../models/admin/modules");
const { CreateAdminNotification } = require(rootPath + "/helpers/systemNotifications");

const mailer = require("../../../components/mailer");
const multer = require("multer");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
const { Op, Sequelize } = require("sequelize");
// const { query } = require("express");
const REGION = "ap-south-1";
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_TICKET_BUCKET,
});

function getNumberOfDays(start, end) {
  console.log(start, 'startstart');
  console.log(end, 'endendend');
  const date1 = new Date(start);
  const date2 = new Date(end);
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}

const {recordLogs, sendTicketNotification} = require("./tickets.controller")

const {assignToSupportAdmin} = require("../../enquiry/enquiry.controller")

function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

function getYearDifference(startDate, endDate) {
  return (endDate.getFullYear() - startDate.getFullYear());
}

function addMonths(numOfMonths, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setMonth(date.getMonth() + numOfMonths);
  return returningDate;
}

function addWeeks (weeks, date = new Date()) {  
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + weeks * 7)
  return returningDate
}

function addYears (years, date = new Date()) {  
  const returningDate = new Date(date);
  returningDate.setFullYear(date.getFullYear() + years)
  return returningDate
}

function adddays (days, date = new Date()) {  
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + days)
  return returningDate
}

// get area of request
router.get("/areaOfRequest",  auth,
async function (req, res) {
try{
    const getModulesData = await db.Modules.findAll({
      where: {
      name: {
          [Op.in]: ["Eudr Due Diligence", "farms", "users"]
        }
    }    ,
     group: ['name']
    })
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

// get users
router.get("/getAllUsers",auth,  getTicketUserValidation(), validationErrorHandler,
async function (req, res) {
try{ 
  const { organization } = req.user;
    const getAppUsers = await db.user.findAll({
      where: { organization },
      attributes: ['id', 'firstName','middleName', 'lastName', 'fullName', "email"],
      include: [
        {
          model: db.Roles,
          as: 'user_role',
         
        },
        {
          attributes: ["id", "membership_type", "membership_duration", "membership_duration_unit",  
         ],
          model: db.Membership,
          as: 'user_membership',
          include: [
            {
           
              model: db.UserMembershipMap,
              as: "membershipMap",             
            }
          ]    
        }
      ],
       });
    let filteredUsers = [];
    if(getAppUsers){
      filteredUsers = getAppUsers
    }
    return res.json(
      successRespSync({
        msg: "users retrieved",
        data: filteredUsers,
      })
    );
}catch(error){
  return serverError(res, error);
}
});

// get users
router.get("/users",auth,  getTicketUserValidation(), validationErrorHandler,
async function (req, res) {
try{
  const { organization } = req.user;
  let {
    membershipTypes,
    membershipValidity,
    remainingDays,
    searchPhrase,
    page,
    limit
  } = req.query;
  let query= {};
  if(page && limit){
    page = parseInt(page);
    limit = parseInt(limit);
    query.offset = (page - 1) * limit;
    query.limit = limit;
  }
  let membershipCondition = {}  
    let where = {[Op.or]: [
      {
        firstName: {
          [Op.ne]: null
        }
      },
      {
        lastName: {
          [Op.ne]: null
        }
      }
    ],
    organization
    }

    if(req.query){
      if(membershipTypes){
        membershipCondition.id = membershipTypes;
      }
      if(searchPhrase){
        where = {[Op.or] : [
          {firstName: {[Op.like] : `%${searchPhrase}%`}},
          {middleName: {[Op.like] : `%${searchPhrase}%`}},
          {lastName: {[Op.like] : `%${searchPhrase}%`}},
        ]
      }
    }
    }
    const getAppUsers = await db.user.findAll({
      attributes: ['id', 'firstName','middleName', 'lastName', 'fullName', "email"],
      where,
      ...query,
      include: [
        {
          model: db.Roles,
          as: 'user_role',
          where: {
            role_type: 'app_user'
          }
        },
        {
          attributes: ["id", "membership_type", "membership_duration", "membership_duration_unit",  
         ],
          model: db.Membership,
          as: 'user_membership',
          where: membershipCondition,
          include: [
            {
           
              model: db.UserMembershipMap,
              as: "membershipMap",             
            }
          ]    
        }
      ],
       });
    let filteredUsers;
    if(getAppUsers){
      filteredUsers = getAppUsers.filter(object => {
        const membershipBoughtAt = object.user_membership[0].UserMembershipMap.createdAt
        const packageDurationNumber = object.user_membership[0].membership_duration
        const packageDurationUnit = object.user_membership[0].membership_duration_unit.split("(")[0]
        let packegeExpiryDate = "";      
        if(packageDurationUnit == 'month'){
           packegeExpiryDate = addMonths(packageDurationNumber,membershipBoughtAt)
          }
        if(packageDurationUnit == 'week'){
          packegeExpiryDate = addWeeks(packageDurationNumber,membershipBoughtAt)
        }
        if(packageDurationUnit == 'year'){
          packegeExpiryDate = addYears(packageDurationNumber,membershipBoughtAt)
        }
        if(packageDurationUnit == 'day'){
          packegeExpiryDate = adddays(packageDurationNumber,membershipBoughtAt)
        }
        console.log(packegeExpiryDate, 'packegeExpiryDatepackegeExpiryDatepackegeExpiryDate');
        object.user_membership[0].UserMembershipMap.dataValues.membershipExpiryDate = packegeExpiryDate;
        console.log(object.user_membership[0].UserMembershipMap, 'objectobjectobjectobjectobjectobject');

        if(membershipValidity && membershipValidity == 'custom'){
           const days = getNumberOfDays(membershipBoughtAt, packegeExpiryDate)
          if(days <= remainingDays){
            return object
          }
        }

        if(membershipValidity && membershipValidity == 'lessThanOneMonth'){
          const days = getNumberOfDays(membershipBoughtAt, packegeExpiryDate)
          if(days <= 30){
            return object
          }
        }

        if(membershipValidity && membershipValidity == 'oneToEightMonth'){
          const months = getMonthDifference(membershipBoughtAt, packegeExpiryDate)
          if(months >= 1 && months <= 8){
            return object
          }
        }

        if(membershipValidity && membershipValidity == 'sixToTweleveMonth'){
          const months = getMonthDifference(membershipBoughtAt, packegeExpiryDate)
          if(months >= 6 && months <= 12){
            return object
          }
        }
       
        if(membershipValidity && membershipValidity == 'moreThanOneYear'){
          const years = getYearDifference(membershipBoughtAt, packegeExpiryDate)
          if(years >= 1){
            return object
          }
        }
        if(membershipValidity && membershipValidity == 'expired'){
          const currentUnixDate = new Date().getTime();
          const expiryUnixDate = new Date(packegeExpiryDate).getTime();
          if(currentUnixDate >= expiryUnixDate ){
            return object;
          }
        }   
        if(!membershipValidity || membershipValidity == null){
          return object
        }    
      });
    }
    return res.json(
      successRespSync({
        msg: "users retrieved",
        data: filteredUsers,
      })
    );
}catch(error){
  return serverError(res, error);
}
});

// get admin users
router.get("/adminUsers",  auth,
async function (req, res) {
try{
    let { organization } = req.user;
    let getAdminUsers = []
    getAdminUsers = await db.user.findAll({
      attributes: [['id', 'userId'], 'firstName', 'middleName', 'lastName', 'fullName', 'email'],
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                '$admin_user_roles.role_type$': "support_admin" 
              },
              organization

            ]
          },{
          [Op.and]: [

            {organization: 3},
            {
              email: "superadmin@dimitra.io"
            }
          ]
          }
   
        ]
  
      },
      include: [
        {
          model: db.Roles,
          as: 'admin_user_roles',
          through: {
            model: db.AdminUserRoles,
          },
          
          
          required: false 
        }
      ],
    });

    // If no users with ticket permissions found, get all admin users as fallback
    if (getAdminUsers.length === 0) {
      getAdminUsers = await db.user.findAll({
        attributes: [['id', 'userId'], 'firstName','middleName', 'lastName', 'fullName', 'email', 'organization'],
        where: {
          organization: organization,
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

    let getSuperAdminUsers = [];
    try {
      const superAdminUser = await db.user.findOne({
        attributes: [['id', 'userId'], 'firstName','middleName', 'lastName', 'fullName', 'email'],
        where: {
          email: 'superadministrator@dimitra.io',
          active: true
        }
      });
      
      if (superAdminUser) {
        getSuperAdminUsers = [{
          ...superAdminUser.toJSON(),
          admin_user_roles: [{ id: 'super_admin' }]
        }];
      }
    } catch (superAdminError) {
      console.error('Error fetching super admin user:', superAdminError);
      getSuperAdminUsers = [];
    }

    // Combine both lists and remove duplicates
    const allAdminUsers = [...getAdminUsers];

    getSuperAdminUsers.forEach(superAdmin => {
      const exists = allAdminUsers.find(admin => admin.userId === superAdmin.userId);
      if (!exists) {
        allAdminUsers.push(superAdmin);
      }
    });

    return res.json(
      successRespSync({
        msg: "users retrieved",
        data: allAdminUsers,
      })
    );
}catch(error){
  return serverError(res, error);
}
});

// create TICKET
router.post("/", auth,
 fileUpload({
    acl: 'public-read',
    bucket: process.env.AWS_TICKET_BUCKET,
    whiteListMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ],
  }),
  validationErrorHandler,  
  async function (req, res) {

    try {     
      let createdBy = req.user.id, userIdArr = [], emailValidation = [];
      let org_id = req.user.organization;
      let {
        ticketUserType,
        userId,
        requestorName,
        requestorEmail,        
        subject,
        description,
        status ="open",
        priority,
        startDate,
        endDate,
        areaOfRequest,
        type,
        asigneeId,
        requesterId,
      } = req.body;
      requestorEmail =  req?.user?.email
      requestorName = req?.user?.name
      status = "open"
      if(!startDate){        
        startDate = null;
        if(ticketUserType !=  'Dimitra Admin'){
          startDate = new Date();
        }
      }
      if(!endDate){
        endDate = null;
      }
      if(userId){
      userIdArr = JSON.parse(userId);
      }
      if(!status){
        status = null;
      }
      if(!priority){
        priority = 'High';
      }
      if(ticketUserType ==  'Dimitra Admin'){
        asigneeId = process.env.DIMITRA_ADMIN_ID || 879 // dimitra admin id
        requestorEmail = req.user.email
      }
      const ticket = await db.Ticket.create({
        ticketUserType,
        requestorName,
        requestorEmail,
        createdBy,
        subject,
        description,
        status,
        priority,
        startDate,
        endDate,
        areaOfRequest,
        type,
        asigneeId,
        requesterId,
        org_id
      });
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

      return res.json(
        successRespSync({
          msg: "ticket created",
          data: ticket,
        })
      );
    } catch (error) {

      return serverError(res, error);
    }
  }
);
// mark as read
router.post("/markAsRead", auth, markAsReadValidation(), validationErrorHandler, async function (req, res) {
  try {
    let userId = req.user.id;
    const { ticketId } = req.body;
    const data = {
      ticketId,
      userId: userId
    }
    const readCount = await db.ticketReadStatus.findOne({ where: data})
    // return
    if(readCount){
      return res.json(
        errorRespSync({
          msg: "Alredy updated",
        })
      );
    }
    await db.ticketReadStatus.create(data)
    return res.json(
      successRespSync({
        msg: "Status updated",
        data: {},
      })
    );
  }catch(error){
    return serverError(res, error);
  }
});

// get all tickets
router.get("/", auth,  async function (req, res) {
  try {
    let createdBy = req.user.id;
    let org_id = req.user.organization;
    let state = req.user.state;
    let where = { };
    let query= {};
    query.order = [];
    let {page, limit, searchPhrase, order, userType} = req.query;
    query.order.push(['createdAt', 'DESC']);   
   
    if(order && order == "endDate"){
      query.order = [['endDate', 'ASC']];
    } else if(order && (order === "dateAscending")) {
      query.order = [['createdAt', 'ASC']];
    } else if (order && order === "dateDescending") {
      query.order = [['createdAt', 'DESC']];
    }

    let userRolesTypeArr = req.user.userRoles.map(role => role.role_type); 
    if(userRolesTypeArr.includes('support_admin')){
      where.state = state;
    }
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
          },{
            id: {
              [Op.like]: `%${searchPhrase}%`
            }
          }
        ]
        }
    }

    if(order && order != "All" && order != "endDate" && order != "dateAscending" && order != "dateDescending"){
      where.priority = order
    }
    if(userType && userType != "All"){
      where.ticketUserType = userType
    }
    if(org_id == 3) //dimitra admin as super admin must see dimitra admin ticket user type tickets
    {
      where[Op.or] =[
        {
          org_id : org_id
        },
        {
          ticketUserType : "Dimitra Admin"
        }
      ]
    } else {
      where.org_id = org_id;
    }
    query.where = where;
    const ticketCount = await db.Ticket.count({   
      ...query,  
    });  
    if(page && limit){
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const ticket = await db.Ticket.findAll({
      attributes: [
        "id",
        "ticketUserType",
        "requestorName",
        "requestorEmail",
        "createdBy",
        "subject",
        "description",
        "status",
        "priority",
        "startDate",
        "endDate",
        "areaOfRequest",
        "type",
        "asigneeId",
        "createdAt",
        "updatedAt",
        "requesterId",
        "org_id"
    ],
      ...query,     
      include: [
        {
          attributes: ["id", "fullName", "firstName","middleName", "lastName"],
          model: db.user,
          as: "createdByUser"         
        },
        {
          attributes: ["id", "fullName", "firstName","middleName", "lastName"],
          model: db.user,
          as: "asignee"         
        },
        {
          attributes: ["id", "fullName", "firstName","middleName", "lastName"],
          model: db.user,
          as: "createdByUser"         
        },
        {
          model: db.ticketMedia,
          as: "ticketMedia",
        },
        {
          model: db.TicketComments,
          as: "ticketComments",
        },
        {
          model: db.ticketSelectedUser,
          as: "ticketSelectedUser",
          include: [
            {
              attributes: ["id", "fullName", "firstName","middleName", "lastName"],
              model: db.user,
              as: "user"
            }
          ]
        },
        {
          model: db.ticketReadStatus,
          as: "ticketReadStatus"
        }
      ],
    });
    
    if (!ticket) {
      return res.json(
        errorRespSync({
          msg: "no tickets found",
        })
      );
    } else {
      const apiResp = {
        ticketCount,
        ticket
      }
      return res.json(
        successRespSync({
          msg: "tickets",
          data: apiResp,
          
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

//get single ticket
router.get("/:id", auth,  async function (req, res) {
  try {
    const ticket = await db.Ticket.findOne({
      where: { id: req.params.id},
      include: [
        {
          attributes: ["id", "fullName", "firstName","middleName", "lastName"],
          model: db.user,
          as: "createdByUser"         
        },
        {
          model: db.ticketMedia,
          as: "ticketMedia",
        },
        {
          model: db.ticketSelectedUser,
          as: "ticketSelectedUser",
          include: [
            {
              attributes: ["id", "fullName", "firstName","middleName", "lastName"],
              model: db.user,
              as: "user"
            }
          ]
        },
        {
          model: db.ticketReadStatus,
          as: "ticketReadStatus"
        }
      ],
      order: [['id', 'DESC']]
    });
    if (!ticket) {
      return res.json(
        errorRespSync({
          msg: "no tickets found",
        })
      );
    } else {
      return res.json(
        successRespSync({
          msg: "tickets",
          data: ticket,
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

// Delete Ticket
router.delete("/:id", 
  auth,
  validationErrorHandler,
  async function (req, res) {
    let transaction = await db.sequelize.transaction();
  try {  
    const {
      id,
    } = req.params;  
    const ticket = await db.Ticket.findOne({
        where: 
        {
          id,
        }       
    });   
   
    if(ticket){
      const ticketMedia = await db.ticketMedia.findAll({ 
        attributes: ['id', 'profilePicS3Key'],
        where: 
        {
          ticketId: id
        }
      });
      if(ticketMedia){
      let ticketMediaIds = [];
       const filesId =  ticketMedia.forEach(mediaObject => {
        const params = {
          Key: mediaObject.profilePicS3Key,
          Bucket: process.env.AWS_TICKET_BUCKET,
        };
        const is_deleted = deleteFileS3(params);
        ticketMediaIds.push(mediaObject.id)
       
      });
       await db.ticketMedia.destroy({ 
          where: 
          {
            id: ticketMediaIds
          },
          transaction
        });
      }
        await db.Ticket.destroy({ 
          where: 
          {
            id
          },
          transaction
        });
        await transaction.commit();
        return res.json(
          successRespSync({
            msg: "Ticket deleted successfully.",
            data: {}
          })
        );
    }else{
             await transaction.rollback();
      return res.json(errorRespSync({
        msg: "Ticket not found",
        code: 500,
        data: {}
      }))
    }
        }catch (error) {
                 await transaction.rollback();
          return serverError(res, error);
        }
});

// update tickets
router.put("/:id",
auth,
fileUpload({
  field: 'file',
  acl: 'public-read',
  bucket: process.env.AWS_TICKET_BUCKET,
  whiteListMimeTypes: [
    'image/png',
    'image/jpeg',
    'image/jpg',
  ],
}),
updateTicketValidation(),
validationErrorHandler,
 async function (req, res) {
  try {
    
    let userIdArr = []
    let { id } = req.params;  
    let org_id = req.user.organization;
    let {
      ticketUserType,
      requestorName,
      requestorEmail,
      userId,
      subject,
      description,
      status,
      priority,
      startDate,
      endDate,
      areaOfRequest,
      type,
      asigneeId
    } = req.body;
   
    if(!startDate){        
      startDate = null;
      if(ticketUserType !=  'Dimitra Admin'){
        startDate = new Date();
      }
    }
    if(!endDate){
      endDate = null;
    }
    if(userId){
    userIdArr = [...JSON.parse(userId)];
    }
    if(!status){
      status = null;
    }
    if(!priority){
      priority = null;
    }
    var set = {
      ticketUserType,
      requestorName,
      requestorEmail,
      subject,
      description,
      status,
      priority,
      startDate,
      endDate,
      areaOfRequest,
      type,
      asigneeId,
      org_id
    }
    
    const ticket = await db.Ticket.findOne(
      {
        where: { id, org_id }
      },
      {raw: true}
    );
    if (ticket) {
      const assigneeChanged = ticket.asigneeId !== parseInt(asigneeId);
      
      let ticketUserArr = []
      userIdArr.forEach(id => {
        ticketUserArr.push({
          ticketId: ticket.id,
          userId: id
        })
      });
      await db.ticketSelectedUser.destroy({where: {ticketId: id}, transaction})
      await db.ticketSelectedUser.bulkCreate(ticketUserArr, {transaction})
      const updateTicket = await db.Ticket.update(set,
        {
          where: { id},
        }
      );
      if(updateTicket){
       if(req.files){
        const fileData = []
        req.files.forEach(file => {
          fileData.push({
            fileName: file.location,
            profilePicS3Key: file.key,
            ticketId: id
          })
        })
        // await db.ticketMedia.destroy(
        //   {
        //     where: { ticketId: id }
        //   }
        // );
        await db.ticketMedia.bulkCreate(fileData ,)
        ticket.assigneeId = asigneeId;
       }

       await recordLogs(req, ticket, "support_ticket_update_logs");

       if(req.body?.changesMade.includes("asigneeId")) {
          let changesObj = JSON.parse(req.body.changesMade);
          await sendTicketNotification(ticket, req);
       }

      return res.json(
        successRespSync({
          msg: "tickets updated",
          data: {},
        })
      );
      }
    } else {

      return res.json(
      errorRespSync({
          msg: "no tickets found",
        })
      );
    }
  } catch (error) {

    return serverError(res, error);
  }
});

// delete ticket's media files
router.delete("/deleteTicketMedia/:id",auth, 
async function (req, res) {
  try {
    const ticketMedia = await db.ticketMedia.findOne(
      {
        where: { id: req.params.id }
      }
    );    
    if (ticketMedia) {
      const params = {
        Key: ticketMedia.profilePicS3Key,
        Bucket: process.env.AWS_TICKET_BUCKET,
      };
      const is_deleted = deleteFileS3(params);
      const deleteticket = await db.ticketMedia.destroy(
        {
          where: { id: ticketMedia.id }
        }
      );
      return res.json(
        successRespSync({
          msg: "File deleted"
        })
      );
    } else {
      return res.json(
        errorRespSync({
          msg: "no file found",
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

function isJson(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
module.exports = router;
