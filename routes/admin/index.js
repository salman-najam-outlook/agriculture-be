const express = require("express");
const router = express.Router();
// loading models
const db = require(rootPath + "/models");
const { Sequelize } = require('sequelize');
const axios = require('axios')
// loading middleware
const auth = require(rootPath + "/middleware/auth");
// loading helpers
const { successResp, errorRespSync, successRespSync, errorResp, serverError } = require(rootPath +
  "/helpers/api");
const { check, oneOf, param, body, query } = require("express-validator");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { createOTP, sendSMS, sendEmail, logErrorOccurred, notEmpty, fileFilterGen } = require(rootPath +
  "/helpers/general"); // constant messages
const translation = require(rootPath + '/middleware/translation');
const fs = require('fs')
var request = require('request');
const shortid = require('short-uuid');
const path = require('path')
const logsPath = path.join(__dirname, `../../activity_log_${process.env.NODE_ENV}`)
var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
const { updateDefaultUnitForCacaoByUserId } = require(rootPath + '/helpers/defaultUnitConfigCacaoUser')
const { sendLoginError } = require(rootPath + '/helpers/report_login_error')
const { syncUserData, syncUserDeletion, syncUserDeactivation, syncUserActivation, syncUserUpdate } = require('../../helpers/dds_sync')
const { syncMarketPlaceUserData } = require('../../helpers/marketplace_sync')
const { setDefaultUnitSettingsForAppUsers } = require(rootPath + '/helpers/defaultUnitConfigCacaoUser')
const { generatePassword } = require(rootPath + '/helpers/generatePassword')
const {queueActivationKeyGenerationInternally} = require('../admin/user/activation/index')
const { identifyAndRecordDevice } = require(rootPath + '/helpers/deviceIdentification')

// Constants from registration logic
const INDONESIA_DDS_ROLES = {
  'dds_exporter':'dds_exporter',
  'indonesia_admin':'indonesia_admin'
} 
const KENYA_DDS_ROLES = {
  'dds_exporter':'dds_exporter',
  'naccu_kenya_admin':'naccu_kenya_admin',
  'naccu_naccu':'naccu_naccu'
}

const KENYA_WHO_ARE_YOU = {
  'cooperative_union':'cooperative_union',
  'cooperative_society' : 'cooperative_society',
  'company' : 'company',
  'estate': 'estate',
  'agent':'agent',
}

const KENYA_COOPERATIVES = ["cooperative_union", "cooperative_society", "company", "estate", "agent"]
const INDONESIA_COOPERATIVES = ['koperasi', 'ekspor', 'koperasi','keduanya']

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});
// storage configuration
const storage = multerS3({
  s3,
  bucket: process.env.AWS_PUBLIC_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // create custom key name on s3 cloud
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});
var params, whiteListMimeTypes, lang;
// allowed mime types
whiteListMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
// allowed mimetypes
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});

const {
  auditGetValidation,
  adminRegistrationValidation,
  adminDdsUserRegistrationValidation,
  rolePostValidation,
  loginValidation,
} = require(rootPath + "/helpers/validation");
const appUserValidator = require(rootPath + "/helpers/validators/appUser");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  createPassword,
  createOtpHash,
  verifyHash,
} = require('../../helpers/hash');
const { Op, json } = require('sequelize');
const jwt = require('jsonwebtoken');
const mailer = require(rootPath + '/components/mailer');
const twilio = require('twilio')(
  process.env.TWILIO_ACC_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const moment = require('moment');
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const { lte } = require("lodash");
//salman
const { sendAuthCookies } = require("../../helpers/utils");
//salman
const { membershipValidityUnits } = require(rootPath + "/helpers/consts");
const { deleteFileS3 } = require(rootPath + '/helpers/aws_s3'); // s3 functions



const validateIfOrganizationExists = async (organizationCode) => {
  const organization = await db.Organization.findOne({
    where: {
      code: organizationCode,
    },
  });
  if (organization) {
    return true
  }
  return false
};

function compare(a, b) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}

// Authentications Module

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: API to register an admin
 *     description: API to register an admin.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for creating Admin
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                department:
 *                  type: string
 *                role:
 *                  type: string
 *            example:
 *              {"email":"abc@yopmail.com","password":"Admin@123","department":"finance","role":"manager","firstName":"Tom","lastName":"harley","countryCode":"+91","mobile":"+918854984736"}
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
 *               example: { "success": true, "code": 200, "message": "Admin User has been created successfully.", "data": { "id": 184, "email": "vikas1@yopmail.com", "firstName": "Tom", "lastName": "harley", "countryCode": "+91", "mobile": "+918854984736", "updatedAt": "2022-03-14T17:28:51.439Z", "createdAt": "2022-03-14T17:28:51.439Z", "department_id": "184_1", "role_id": "184_manager" } }  
 */
router.post(
  "/register",
  auth,
  adminRegistrationValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { email, password, country, countryIsoCode, state } = req.body;

      const userId = req.user.id
      const adminType = req.user.adminType

      const organization = await db.Organization.findOne({
        where: {
          id: req.user.organization
        }
      });

      // generate password hash
      const passwordHash = await createPassword(password);
      let userData = {
        ...req.body,
        organization: req.user.organization,
        subOrganizationId: req.user.subOrgId || null,
        email,
        password: passwordHash,
        verified: 1,
        countryId: country,
        country,
        adminType,
        countryIsoCode,
        stateId: state,
        source: 'saas_api_admin_creation'
      };

      // check if user already exist
      let isAlreadyExist = await db.user.findOne({
        attributes: ["email", "id"],
        where: { email },
      });

      // create admin user if user doesn't exists
      let userResult = null;
      let depResult = null;
      let roleResult = null;
      if (isAlreadyExist == null) {
        userResult = await db.user.create(userData);
        if (userResult) {
          depResult = await db.UserDepartment.create({
            id: `${userResult.id}_${req.body.department}`,
            user_id: userResult.id,
            department_id: req.body.department,
          });
          roleResult = await db.AdminUserRoles.create({
            id: `${userResult.id}_${req.body.role}`,
            user_id: userResult.id,
            role_id: req.body.role,
          });
        }
        delete userResult.dataValues.password;

        await syncUserData({...userResult, subOrganizationId:req.user.subOrgId || null}, organization);

        res.json(
          await successResp({
            msg: success.ADMIN_USER_CREATED,
            data: {
              ...userResult.dataValues,
              department_id: depResult.id,
              role_id: roleResult.id,
            },
          })
        );
      } else {
        // send response if user alredy exist
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.EMAIL_EXIST_ALREADY,
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err.message);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

// Operator,Supplier,Producer registration for DDS
router.post(
    "/dds_register",
    auth,
    adminDdsUserRegistrationValidation(),
    validationErrorHandler,
    async (req, res) => {
      try {
        const { email, mobile, country, countryIsoCode } = req.body;

        const userId = req.user.id
        const adminType = req.user.adminType

        const user_organization = await db.user.findOne({
          attributes: ['organization', 'subOrganizationId', 'id'],
          where: {
            id: userId
          },
        })

        let subOrganization = null;
        if(user_organization.subOrganizationId){
           subOrganization = await db.Organization.findOne({
            attributes: ['id', 'name', 'code'],
            where: {
              id: user_organization?.subOrganizationId
            }
          })
        }

        const org = await db.Organization.findOne({
          attributes:['id','name','code'],
          where:{
            id:user_organization?.organization
          }
        })

        const role = await db.Roles.findOne({
          attributes:['id','name','organization'],
          where:{
            id: `${req.body.role}`,
          }
        })


        if (!role && (req.body.role === 'operator' || req.body.role === 'supplier' || req.body.role === 'producer')) {
          await db.Roles.create({
            id: req.body.role,
            name: `${req.body.role.toUpperCase()}`,
            role_type: "admin",
            description: "Default Role",
            organization: org.id,
            subOrgId: req.user.subOrgId || null,
            editable: false
          });
        }


        let userData = {
          ...req.body,
          organization: org.id,
          subOrganizationId: user_organization?.subOrganizationId,
          email,
          verified: 0,
          active: 1,
          countryId: country,
          country,
          adminType,
          countryIsoCode,
          role:`${req.body.role}`,
          source: 'saas_api_admin_creation'
        };

        if (req.body.eori_number) {
          userData.eori_number = req.body.eori_number;
        }
        if (req.body.licenseNumber) {
          userData.licenseNumber = req.body.licenseNumber;
        }
        if (req.body.companyId) {
          userData.companyId = req.body.companyId;
        }

        let isEmailExist = await db.user.findOne({
          attributes: ["email", "id"],
          where: { email },
        });

        let existingUser = await db.user.findOne({
          attributes: ["email", "mobile", "id"],
          where: {
            [Op.or]: [{ email }, { mobile }],
          },
        });

        if (existingUser) {
          if (existingUser.email === email) {
            let errorResponse = await errorResp({
              code: success.code.OK,
              emailError: existingUser.email === email,
              msg:  error.EMAIL_EXIST_ALREADY
          });
          errorResponse.emailError = existingUser.email === email;
          return res.json(errorResponse);
          }

          if (existingUser.mobile === mobile) {
            let errorResponse = await errorResp({
                code: success.code.OK,
                emailError: existingUser.mobile === mobile,
                msg:  error.MOBILE_EXIST_ALREADY
            });
            errorResponse.mobileError = existingUser.mobile === mobile;
            return res.json(errorResponse);
          }
        }

        let roleResult = null;
        let userResult = await db.user.create(userData);
        if (userResult) {
            roleResult = await db.AdminUserRoles.create({
              id: `${userResult.id}_${org.code}_${req.body.role}`,
              user_id: userResult.id,
              role_id:`${req.body.role}`,
            });

             // SYNC TO DDS USERS
             const newUserData = {
              ...userData,
              id: userResult.id,
              role: req.body.role    //  In DDS, the role is saved as only 'supplier', 'operator', or 'producer'
            }
            await syncUserData(newUserData, {
              id: org.id,
              name:org?.name,
              code: org?.code,
              id: org?.id,
              isSubOrganization: subOrganization ? true : false,
              subOrganization: subOrganization ? subOrganization : null,
            });
          
          }
          res.json(
              await successResp({
                msg: success.ADMIN_USER_CREATED,
                data: {
                  ...userResult.dataValues,
                  role_id: roleResult.role_id,
                },
              })
          );
      } catch (err) {
        logErrorOccurred(__filename, err);
        console.log("error occured in catch*************", err.message);
        return res.status(error.code.SERVER_ERROR).json(await errorResp());
      }
    }
);



// fetch supplier user profile information
router.get('/dds_users/:role', auth, translation, async (req, res) => {
  let {limit = 10,page=1,country, search} = req.query
  limit = parseInt(limit)
  page = parseInt(page)
  let offsetm = (page - 1) * limit;
  
  let where = {
    organization:req.user.organization,
    active:1
  }
  if(country || search){
    if(country){
      where.country = {
        [Op.like]:`%${country}`
      }
    }
    if(search){
      const sp = search.split(" ")
      where.firstName = {
        [Op.like]:`%${sp[0]}`
      }
      if(sp.length > 1){
        const latNameJoin = sp.slice(1).join(" ")
        where.lastName = {
          [Op.like]:`%${latNameJoin}`
        }
      }
    }
  }
  try {
    let result = await db.user.findAndCountAll({
      attributes: [
        'id',
        'firstName',
        'middleName',
        'lastName',
        'fullName',
        'id_number',
        'email',
        'countryCode',
        'mobile',
        'profilePicUrl',
        'language',
        'registration_type',
        'address',
        'countryId',
        'countryIsoCode',
        'country',
        'organization',
        'createdAt'
      ],
      include: [
        {
          model:db.Roles,
          attributes:['id','name'],
          as:'admin_user_roles',
          where:{
             id:`${req.params.role}`
          }
        }
      ],
      where:where,
      limit,
      offset:offsetm,
      distinct:true,
      order:[['id','desc']]
    });

    let responseRes = JSON.parse(JSON.stringify(result))
    if (result) {
      return res.json(
        successRespSync({
          msg: success.PROFILE_FETCHED,
          data: responseRes,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


router.put(
  "/dds_update/:id",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      // const userId = req.user.id;
      const adminType = req.user.adminType;
      const { id } = req.params;

      const user_organization = await db.user.findOne({
        attributes: [['organization', 'id']],
        where: {
          id
        },
      });

      const org = await db.Organization.findOne({
        attributes: ['id', 'code', 'name'],
        where: {
          id: user_organization.id
        }
      });

      const role = await db.Roles.findOne({
        attributes: ['id', 'name', 'organization'],
        where: {
          id: req.body.role,
        }
      });

      if (!role && (req.body.role === 'operator' || req.body.role === 'supplier' || req.body.role === 'producer')) {
        await db.Roles.create({
          id: `${req.body.role}`,
          name: req.body.role,
          role_type: "admin",
          description: "Default Role",
          organization: org.id,
          subOrgId: req.user.subOrgId || null,
          editable: false
        });
      }

      const userRes = await db.user.findOne({
        attributes: ["id","address","active","eori_number","verified"],
        where: {
          id
        },
      });


      let userData = {
        ...req.body,
        countryId: req.body.country,
        organization: org.id,
        adminType,
        role: `${req.body.role}`
      };

      if (req.body.eori_number) {
        userData.eori_number = req.body.eori_number;
      }

      const newUserData = {
        ...userData,
        id,
        active: userRes.active,
        eori_number: userRes.eori_number,
        verified: userRes.verified,
        address: userRes.address,
        role: req.body.role    //  In DDS, the role is saved as only 'supplier', 'operator', or 'producer'
      }

       // SYNC TO DDS USERS
       await syncUserData(newUserData, org);


      // check if user exists
      let existingUser = await db.user.findOne({
        where: { id }
      });

      if (existingUser) {
        // update user
        await db.user.update(userData, {
          where: { id }
        });

        // update user role
        await db.AdminUserRoles.update({
          role_id: `${req.body.role}`
        }, {
          where: { user_id: id }
        });

        res.json(
          await successResp({
            msg: success.USER_UPDATED,
            data: { ...existingUser.dataValues }
          })
        );
      } else {
        return res.json(
          await errorResp({
            code: success.code.NOT_FOUND,
            msg: error.NOT_FOUND
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      console.log("error occurred in catch*************", err.message);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

// fetch supplier user profile information
router.get('/user/profile', auth, translation, async (req, res) => {
  try {
    const { id } = req.user;

    // check user exist or not before updating
    let isUserExist = await db.user.findByPk(id);
    if (isUserExist == null) {
      throw error.USER_NOT_EXIST;
    }
    // fetch user profile information
    let result = await db.user.findOne({
      attributes: [
        'id',
        'firstName',
        'middleName',
        'lastName',
        'fullName',
        'id_number',
        'email',
        'countryCode',
        'mobile',
        'profilePicUrl',
        'language',
        'registration_type',
        'address',
        'countryId',
        'countryIsoCode',
        'country',
      ],
      include: [
        {
          model: db.Organization,
          as: 'user_organization',
          attributes: ['id', 'name', 'logo', 'splashScreen'],
        },
      ],
      where: { id },
    });

    let responseRes = JSON.parse(JSON.stringify(result))
    if (result) {
      return res.json(
        successRespSync({
          msg: success.PROFILE_FETCHED,
          data: responseRes,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



// fetch user information by ID;
router.get('/user/:id', translation, async (req, res) => {
  try {

    const { id } = req.params;

    // check user exist or not before updating
    let isUserExist = await db.user.findByPk(id);
    if (isUserExist == null) {
      throw error.USER_NOT_EXIST;
    }
    // fetch user profile information
    let result = await db.user.findOne({
      attributes: [
        'id',
        'firstName',
        'middleName',
        'lastName',
        'fullName',
        'id_number',
        'email',
        'countryCode',
        'mobile',
        'profilePicUrl',
        'language',
        'registration_type',
        'address',
        'countryId',
        'countryIsoCode',
        'verified',
        'country',
        'eori_number',
        'stateId',
        'active'
      ],
      include: [
        {
          model: db.Organization,
          as: 'user_organization',
          attributes: ['id', 'name', 'code','logo', 'splashScreen'],
        },
      ],
      where: { id },
    });

    let responseRes = JSON.parse(JSON.stringify(result))
    if (result) {
      return res.json(
        successRespSync({
          msg: success.PROFILE_FETCHED,
          data: responseRes,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



// Supplier Profile update
router.put("/user/profile", async (req, res) => {
  try {
    const {
      id,
      countryId,
      country,
      countryIsoCode,
      address,
      firstName,
      middleName,
      lastName,
      mobile,
      email,
      countryCode,
      newPassword,
      confirmPassword,
      eori_number,
      companyId,
      profilePicUrl,
      verified = 0
    } = req.body;
    let userAlreadyExist;
    // check if user exist with this mobile number (excluding currenct user)
    userAlreadyExist = await db.user.findOne({
      attributes: ["mobile", "id"],
      where: { mobile, id: {
        [db.Sequelize.Op.ne] : id
      } },
    });
    // send response if user alredy exist
    if (userAlreadyExist != null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: `User Already Exist with mobile number ${mobile} `,
        })
      );
    }

    // check if user exist with this email
    userAlreadyExist = await db.user.findOne({
      attributes: ["email", "id"],
      where: { email, id :{
        [db.Sequelize.Op.ne] : id
      } },
    });
    // send response if user alredy exist
    if (userAlreadyExist) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: error.EMAIL_EXIST_ALREADY,
        })
      );
    }


    
    // Create password

    let passwordHash;

    if(newPassword || confirmPassword){
      if (newPassword !== confirmPassword) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Password doesn\'t match',
          })
        );
      }

      const validationErrors = await validatePasswordHelper(newPassword);

      if (validationErrors.length > 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: validationErrors[0],
          })
        );
      }

      passwordHash = await createPassword(newPassword);

    }

    // set data to be updated
    let set = {
      countryId,
      country,
      countryIsoCode,
      address,
      firstName,
      eori_number,
      companyId,
      middleName,
      lastName,
      countryCode,
      mobile,
      email,
      verified,
      profilePicUrl,
      ...(passwordHash ? { password: passwordHash } : {}),
    };

    // Remove keys with undefined or null values
    Object.keys(set).forEach((key) => {
      set[key] == undefined || set[key] == null ? delete set[key] : {};
    });

    // check user exist or not before updating
    let isUserExist = await db.user.findByPk(id);
    if (!isUserExist) {
      throw error.USER_NOT_EXIST;
    }

    // update profile
    let [update] = await db.user.update({ ...set }, { where: { id } });

    // if update success then fetch user details
    if (update) {
      // fetch user profile information
      var updatedDetails = await db.user.findOne({
        attributes: [
          "id",
          "firstName",
          "middleName",
          "lastName",
          "id_number",
          "email",
          "mobile",
          "profilePicUrl",
          "countryCode",
          "countryId",
          "countryIsoCode",
          "country",
          "address",
          "eori_number",
          "companyId",
          "verified",
          "active",
        ],
        include: [
          {
            model: db.Organization,
            as: "user_organization",
            attributes: ["id", "name", "logo"],
          },
        ],
        where: { id },
      });

      const organization = await db.Organization.findOne({ 
        where: { id: updatedDetails.user_organization.id },
        attributes: [ 'id','name', 'code', 'custom_otp']
      })

      if(updatedDetails && organization){
        await syncUserData(updatedDetails,organization)
      }

      updatedDetails = JSON.parse(JSON.stringify(updatedDetails));


      // send response
      return res.json(
        successRespSync({
          msg: update ? success.PROFILE_UPDATED : error.NOT_FOUND,
          data: update ? updatedDetails : {},
        })
      );
    } else {
      return res.json(
        successRespSync({
          msg: error.NOT_FOUND,
          data: {},
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// update user profile pic
router.put(
  '/user/profile-picture',
  auth,
  (req, res, next) => {
    let fileUpload = upload.single('profilePic');
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else if (req.file == undefined) {
        return res.json(
          errorRespSync({ code: 200, msg: 'profile pic required' })
        );
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const { id } = req.body;
      let set = {};
      // get old profile pic data
      const userProfile = await db.user.findOne({
        attributes: ['profilePicS3Key', 'id'],
        where: { id },
      });

      // check if file uploaded or not
      if (req.file != undefined && req.file != null) {
        // get uploaded file information and create some var
        const { key, originalname, location } = req.file;
        const fileName = originalname.substring(0, 90);
        set.profilePicS3Key = key;
        set.profilePicName = fileName;
        set.profilePicUrl = location;
      }

      // update profile pic in DB
      await db.user.update(set, {
        where: { id },
      });

      // if profile updated successfull then delete old picture form S3
      if (userProfile.profilePicS3Key != null && req.file != null) {
        // file to be deleted
        var param = {
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: userProfile.profilePicS3Key,
        };
        await deleteFileS3(param);
      }

      // send response
      return res.json(
        successRespSync({
          msg: success.PROFILE_PIC_UPDATED,
          data: { profilePicUrl: set.profilePicUrl },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// change password
router.put(
  '/user/change-password',
  auth,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      let { newPassword, confirmPassword } = req.body;
      let { id: userId } = req.user;

      if (newPassword !== confirmPassword) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Password doesn\'t match',
          })
        );
      }

      await db.user.findOne({
        attributes: [
          'password',
          'id',
        ],
        where: { id: userId },
      });
      
      lang = req.headers.lang
      // validate password
      const hasErrors = await validatePasswordHelper(newPassword);

      if (hasErrors.length > 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: hasErrors[0],
          })
        );
      }

      const passwordHash = await createPassword(newPassword);

      await db.user.update({ password: passwordHash, isFirstLogin: false }, { where: { id: userId } }, { transaction });
      await transaction.commit();

      return res.json(
        successRespSync({
          msg: 'Password has been changed.',
        })
      );
    } catch (err) {
      await transaction?.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// reset password
router.put(
  '/user/reset-password',
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      let { oldPassword, newPassword, confirmPassword, email } = req.body;

      if (newPassword !== confirmPassword) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Password doesn\'t match',
          })
        );
      }

      if (!email) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Email is required',
          })
        );
      }

      // Verify email
      const user = await db.user.findOne({
        where: { email },
      });

      if (!user) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'User not found',
          })
        );
      }

      // Verify old password
      const isPasswordValid = await verifyHash(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Old password is incorrect',
          })
        );
      }

      // validate password
      const hasErrors = await validatePasswordHelper(newPassword);

      if (hasErrors.length > 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: hasErrors[0],
          })
        );
      }

      const passwordHash = await createPassword(newPassword);

      await db.user.update(
        { password: passwordHash, isFirstLogin: false }, 
        { where: { id: user.id } }, 
        { transaction }
      );
      
      await transaction.commit();

      return res.json(
        successRespSync({
          msg: 'Password has been reset.',
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

const validatePasswordHelper = async (value, org_id) => {
  let errors = [];
  try {
    const getPasswordCriteria = await db.ProfileAuthenticationSettings.findOne({
      attributes: ["password_length", "password_acceptable_characters"],
      raw: true,
    });

    if (!getPasswordCriteria) {
      if (value.length < 5) {
        let message, translatedMsg;
        message = "Password must be at least 5 characters.";
        if (
          lang &&
          lang != "en" &&
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
        ) {
          translatedMsg =
            globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
        }
        errors.push(translatedMsg ? translatedMsg : message);
      }
      if (value.search(/[a-z]/) < 0) {
        let message, translatedMsg;
        message = "Password must contain at least one lower case letter.";
        if (
          lang &&
          lang != "en" &&
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
        ) {
          translatedMsg =
            globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
        }
        errors.push(translatedMsg ? translatedMsg : message);
      }
      if (value.search(/[A-Z]/) < 0) {
        let message, translatedMsg;
        message = "Password must contain at least one upper case letter.";
        if (
          lang &&
          lang != "en" &&
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
        ) {
          translatedMsg =
            globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
        }
        errors.push(translatedMsg ? translatedMsg : message);
      }
      if (value.search(/[0-9]/) < 0) {
        let message, translatedMsg;
        message = "Password must contain at least one digit.";
        if (
          lang &&
          lang != "en" &&
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
        ) {
          translatedMsg =
            globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
        }
        errors.push(translatedMsg ? translatedMsg : message);
      }
      if (value.search(/[!@#\$%\^&\*_]/) < 0) {
        let message, translatedMsg;
        message = "Password must contain at least one special character.";
        if (
          lang &&
          lang != "en" &&
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
        ) {
          translatedMsg =
            globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
        }
        errors.push(translatedMsg ? translatedMsg : message);
      }
      return errors;
    }

    const passwordAcceptableChars =
      getPasswordCriteria.password_acceptable_characters;

    if (value && value.length < getPasswordCriteria.password_length) {
      let message, translatedMsg;
      message = `Password must be at least ${getPasswordCriteria.password_length} characters.`;
      if (
        lang &&
        lang != "en" &&
        globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
      ) {
        translatedMsg =
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
      }
      errors.push(translatedMsg ? translatedMsg : message);
    }
    if (passwordAcceptableChars.lower_case && value.search(/[a-z]/) < 0) {
      let message, translatedMsg;
      message = "Password must contain at least one lower case letter.";
      if (
        lang &&
        lang != "en" &&
        globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
      ) {
        translatedMsg =
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
      }
      errors.push(translatedMsg ? translatedMsg : message);
    }
    if (passwordAcceptableChars.upper_case && value.search(/[A-Z]/) < 0) {
      let message, translatedMsg;
      message = "Password must contain at least one upper case letter.";
      if (
        lang &&
        lang != "en" &&
        globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
      ) {
        translatedMsg =
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
      }
      errors.push(translatedMsg ? translatedMsg : message);
    }
    if (passwordAcceptableChars.numbers && value.search(/[0-9]/) < 0) {
      let message, translatedMsg;
      message = "Password must contain at least one digit.";
      if (
        lang &&
        lang != "en" &&
        globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
      ) {
        translatedMsg =
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
      }
      errors.push(translatedMsg ? translatedMsg : message);
    }
    if (
      passwordAcceptableChars.special_characters &&
      value.search(/[!@#\$%\^&\*_]/) < 0
    ) {
      let message, translatedMsg;
      message = "Password must contain at least one special character.";
      if (
        lang &&
        lang != "en" &&
        globalTranslationCache[message.toLowerCase().replace(/\s/g, '')]
      ) {
        translatedMsg =
          globalTranslationCache[message.toLowerCase().replace(/\s/g, '')][langObj[lang]];
      }
      errors.push(translatedMsg ? translatedMsg : message);
    }
    return errors;
  } catch (err) {
    logErrorOccurred(__filename, err);
  }
};

router.post(
  "/app-user",
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'facilityPicUrl', maxCount: 1 },
    ]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  validationErrorHandler,
  async (req, res) => {

    try {
      // let userExists = false
      const facilityPicUrl = req.files && req.files['facilityPicUrl'] ? req.files['facilityPicUrl'][0] : null;
      const { 
        firstName,
        middleName,
        lastName,
        mobile,
        language,
        country: countryId,
        countryCode,
        countryIsoCode,
        country,
        stateId,
        district,
        village,
        address,
        userTribe,
        website,
        email,
        active,
        password = 'Dimitra@123',
        activationKey,
        isMarketPlaceUser
      } = req.body


      let requiredFields = {
        firstName,
        lastName,
        countryId,
        active
      }
      let currenctPassword = isMarketPlaceUser?generatePassword():password
      for (let key in requiredFields) {
        if (!requiredFields[key]) {
          return res.status(error.code.SERVER_ERROR).json(await errorResp({
            code: success.code.OK,
            msg: `${key} is required`,
          }));
        }
      }

      if(!email && !mobile){
        return res.status(error.code.SERVER_ERROR).json(await errorResp({
          code: success.code.OK,
          msg: `Email or mobile number is required`,
        }));
      }

      let activationKeyExists = await db.activationKeys.findOne({where: {
        license_key: activationKey,
      },})

      if (!activationKeyExists) {
        return res.status(error.code.SERVER_ERROR).json(await errorResp({
          code: success.code.OK,
          msg: `Activation key doesnt exist`,
        }));
      }

      let activationKeyUsed = await db.activationKeys.findOne({
        where: {
          license_key: activationKey,
          status: "assigned"
        },
      })


    if(activationKeyUsed) {
      return res.status(error.code.SERVER_ERROR).json(await errorResp({
        code: success.code.OK,
        msg: `Activation key already used`,
      }));
    }
    if(!(mobile || email)){
      return res.status(error.code.SERVER_ERROR).json(await errorResp({
        code: success.code.OK,
        msg: `mobile or email is required`,
      }));
    }
    let userRes;

    if(email){
      userRes = await db.user.findOne({
        where: { 
            email: email
        },
        raw: true
      })
    }
    if(mobile && !userRes){
      userRes = await db.user.findOne({
        where: { 
            mobile: mobile
        },
        raw: true
      })
    }
      if (userRes) {

        return res.status(error.code.SERVER_ERROR).json(await errorResp({
          code: success.code.OK,
          msg: error.ALREADY_EXISTS,
        }));
      } else {
        // generate password hash
        const passwordHash = await createPassword(currenctPassword);
        let userData = {
          ...req.body,
          organization: req.user.organization,
          subOrganizationId: req.user.subOrgId || null,
          password: passwordHash,
          verified: 1,
          active,
          facilityPicUrl: facilityPicUrl && facilityPicUrl.location
        };
        // check if user already exist
        let creationRes = await db.user.create(userData, {  });

        // activation keys and membership creation
        let membershipRes = await await db.activationKeys.findOne({
          where: {
            license_key: activationKey,
          },
          include: [
            {
              model: db.Membership,
              as: "membership_assoc",
              required: true,
              include: [
                {
                  model: db.UserRoleMembershipMap,
                  as: "userRoleMembershipMap",
                }
              ]
            },
          ]
        })

        userRole = membershipRes.membership_assoc.userRoleMembershipMap.map(m => m.user_role_id)

        await db.UserRoles.create({
          id: `${creationRes.id}_end_user`,
          user_id: creationRes.id,
          role_id: 'end_user'
        }, {

        })

        //create user membership

        if (membershipRes && membershipRes?.membership_assoc) {
          await db.UserMembershipMap.create({
            user_id: creationRes.id,
            membership_id: membershipRes?.membership_assoc?.id,
          },{

          });
        }
        if(isMarketPlaceUser){
          const title = `Welcome to Dimitra! Your Account Details`;
          const template = `
                       <p>Dear ${creationRes.firstName} ${creationRes.lastName || "User"},</p>
                        <p>Welcome to Dimitra! Your account has been successfully created.</p>
                        <p>Here are your login credentials:</p>
                        <p><strong>Email:</strong> ${creationRes.email}</p>
                        <p><strong>Password:</strong> ${currenctPassword}</p>
                        <p>For security reasons, we recommend changing your password after your first login.</p>
                        <p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
                        <br>
                        <p>Best regards,<br> Team Dimitra!</p>
                            `;
          mailer.sendMail(creationRes.email, title, template);
          await syncMarketPlaceUserData({...creationRes?.dataValues, type: 'createAppUser'})
        }
        const packageDurationUnit = membershipRes.membership_assoc.membership_duration_unit.split("(")[0];
        const packageDurationNumber = membershipRes.membership_assoc.membership_duration;
        const activationKeyActivatedAt = new Date();
        let packegeExpiryDate = "";

        if (packageDurationUnit == 'month') {
          packegeExpiryDate = addMonths(packageDurationNumber, activationKeyActivatedAt);
        } else if (packageDurationUnit == 'week') {
          packegeExpiryDate = addWeeks(packageDurationNumber, activationKeyActivatedAt)
        } else if (packageDurationUnit == 'year') {
          packegeExpiryDate = addYears(packageDurationNumber, activationKeyActivatedAt)
        } else if (packageDurationUnit == 'day') {
          packegeExpiryDate = adddays(packageDurationNumber, activationKeyActivatedAt)
        }

        const activationKeySet = {
          user_id: creationRes.id,
          status: "assigned",
          membershipValidity: packegeExpiryDate,
          // org_id: req.user.organization
        }


        defaultLicenseKey = await db.activationKeys.update(activationKeySet, {
          where: { license_key: activationKey },

        }),
        
        //Check if organization if Micacao and set default unit
        await updateDefaultUnitForCacaoByUserId(creationRes.id, req.user.organization, )

        // check and assign active survey to the user
      const surveys = await db.surveysList.findAll({
        attributes: [
          "id",
          "userId",
          "title",
          "description",
          "surveyStatus", 
          "status",
          "isSelectedUsers"
        ],
        where: {
          organization: userData.organization,
          status: 'Active',
          surveyStatus: 1,
          isSelectedUsers: 0
        },
      })
    
      for (const survey of surveys) {
        let surveyUsersObj = [{
          userId: creationRes.id,
          surveyId: survey.id,
          status: true,
          surveyListStatus: true,
        }]
    
        // adding to survey users list
        await db.surveyUsersList.bulkCreate(surveyUsersObj, {  });
    
        // Send notification to users
        const notification = await db.Notification.create(
          {
            notify: "user",
            message: `You have been invited to "${survey.title}"`,
            userId: creationRes.id,
            type: "survey",
            title: "You have been invited to the survey",
            data: JSON.stringify({
              surveyId: survey.id,
              title: `You have been invited to "${survey.title}"`,
              description: survey.description,
            }),
          },
          {  }
        );
    
        let setUserNotification;
        setUserNotification = {
          userId: creationRes.id,
          notificationId: notification?.id,
        };
        await db.UserNotification.create(setUserNotification, {

        });
      }
      
      await setDefaultUnitSettingsForAppUsers(creationRes.id, req.user.organization)
        res.json(
          await successResp({
            msg: "Farmer has been created successfully.",
            data: creationRes
          })
        );
      }


    } catch (err) {

      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

router.post(
  "/app-user/buying-station",
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'facilityPicUrl', maxCount: 1 },
    ]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      // let userExists = false
      const facilityPicUrl = req.files && req.files['facilityPicUrl'] ? req.files['facilityPicUrl'][0] : null;
      const { 
        firstName,
        middleName,
        lastName,
        mobile,
        language,
        country: countryId,
        countryCode,
        countryIsoCode,
        country,
        stateId,
        district,
        village,
        address,
        userTribe,
        website,
        email,
        active,
        password,
        activationKey,
        buyingStationId,
      } = req.body;
      if(!email && !mobile){
        return res.status(error.code.SERVER_ERROR).json(await errorResp({
          code: success.code.OK,
          msg: `Email or mobile number is required`,
        }));
      }
    let userRes;
      if(email){
        userRes = await db.user.findOne({
          where: { 
              email: email
          },
          raw: true
        })
      }
      if(mobile && !userRes){
        userRes = await db.user.findOne({
          where: { 
              mobile: mobile
          },
          raw: true
        })
      }
      if (userRes) {
        await transaction?.rollback();
        return res.status(error.code.SERVER_ERROR).json(await errorResp({
          code: success.code.OK,
          msg: error.ALREADY_EXISTS,
        }));
      } else {
        // generate password hash
        const passwordHash = await createPassword(password);
        let userData = {
          ...req.body,
          organization: req.user.organization,
          subOrganizationId: req.user.subOrgId || null,
          password: passwordHash,
          verified: 1,
          active,
          facilityPicUrl: facilityPicUrl && facilityPicUrl.location
        };
        // check if user already exist
        let creationRes = await db.user.create(userData, { transaction });

        await db.UserRoles.create({
          id: `${creationRes.id}_end_user`,
          user_id: creationRes.id,
          role_id: 'end_user'
        }, {
          transaction,
        })

        // Update farmerId on buying station
        await db.BuyingStationOrder.update({ farmerId: creationRes.id, status: 'new_user'}, { where: {
          id: buyingStationId
        }, transaction})

        // Set default unit settings for the new user
        try {
          await setDefaultUnitSettingsForAppUsers(creationRes.id, req.user.organization);
        } catch (error) {
          console.error('Error setting default unit settings for buying station user:', error);
        }

        await transaction.commit()
        res.json(
          await successResp({
            msg: "Farmer has been created successfully.",
            data: creationRes
          })
        );
      }
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err.message);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  })

router.get("/roles/all", auth, validationErrorHandler, translation, async (req, res) => {
  try {

    let listRes = []
    listRes = await db.Roles.findAll({
      where: {
        role_type: "admin"
      }
    })

    return res.json(
      successRespSync({
        msg: "Roles fetched successfully",
        data: {
          listRes
        }
      })
    );

  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

router.get("/app-user/key/:actKey", auth, validationErrorHandler, translation, async (req, res) => {
  try {

    let { actKey } = req.params

    let actRes = {}

    actRes = await db.activationKeys.findOne({
      where: {
        license_key: actKey,
        org_id: req.user.organization,
        status: "unassigned",
      },
      include: [
        {
          model: db.Membership,
          as: "membership_assoc",
          required: true,
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: "userRoleMembershipMap",
            }
          ]
        },
      ]
    })

    //calculate membershipValidity
    actRes  = JSON.parse(JSON.stringify(actRes))
    const now = moment();
    actRes.membershipValidity = now.add(actRes.membership_assoc.membership_duration_in_days, 'days').format('YYYY-MM-DD');

    if (actRes) {
      return res.json(
        successRespSync({
          msg: "Key validated successfully",
          data: actRes
        })
      );
    } else {
      return res.status(422).json({
        msg: "Invalid key",
      });
    }


  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: API for admin login.
 *     description: API for admin login.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for admin login
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                credential:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              {"credential":"abc@yopmail.com","password":"Admin@123"}
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Logged in successfully.", "data": { "email": "vikas1@yopmail.com", "countryCode": 91, "mobile": "+918854984736", "firstName": "Tom", "lastName": "harley", "verified": false, "id": 184, "user_organization": null, "user_role_assoc": [ { "id": "manager", "name": "Manager" } ], "sideBarMenu": [ { "active": 1, "id": "manager_activity_log", "sidebar_menu_id": "activity_log", "sidebar_menu_name": "Activity Log", "sidebar_submenu_obj": null }, { "active": 1, "id": "manager_permissions", "sidebar_menu_id": "permissions", "sidebar_menu_name": "Permissions", "sidebar_submenu_obj": null }, { "active": 1, "id": "manager_profile_authentication", "sidebar_menu_id": "profile_authentication", "sidebar_menu_name": "Profile Authentication", "sidebar_submenu_obj": null }, { "active": 1, "id": "manager_user_listing", "sidebar_menu_id": "user_listing", "sidebar_menu_name": "User Listing", "sidebar_submenu_obj": null } ], "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTg0fSwiaWF0IjoxNjQ3Mjc5MDg0LCJleHAiOjE2NDcyNzk2ODR9.gZAQyekqoIR4ojNABnWd1xW_IBY4GobMeY_qe_-lcs4", "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTg0LCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJblZ6WlhKSlpDSTZNVGcwZlN3aWFXRjBJam94TmpRM01qYzVNRGcwTENKbGVIQWlPakUyTkRjeU56azJPRFI5LmdaQVF5ZWtxb0lSNG9qTkFCbldkMXhXX0lCWTRHb2JNZVlfcWVfLWxjczQifSwiaWF0IjoxNjQ3Mjc5MDg0LCJleHAiOjE2Nzg4MTUwODR9.Tqn8vlPGTxPAb3TMP0M7S318uPlSq75H5lIHtD_WCyI" } }  
 */
router.post(
  "/login",
  loginValidation(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    
    try {
      const { credential, password } = req.body;
      // get user data
      let userData = await db.user.findOne({
        attributes: [
          "email",
          "countryCode",
          "mobile",
          "firstName",
          "middleName",
          "lastName",
          "password",
          "verified",
          "id",
          "adminType",
          "active",
          'createdAt',
          "eori_number",
          "countryId",
          "countryIsoCode",
          "organization",
          "subOrganizationId",
          "registrationUserType",
        ],
        where: {
          [Op.or]: [{ email: credential }, { mobile: credential }],
        },
        include: [
          {
            model: db.Organization,
            as: "user_organization",
            attributes: ["id", "name", "logo", "splashScreen", "country"],
          },
          {
            model: db.Organization,
            as: "subOrg",
            attributes: ["id", "name", "logo", "code", "splashScreen", "country"],
          },
          {
            model: db.Roles,
            as: "user_role_assoc",
            through: { model: db.AdminUserRoles, attributes: [] },
          },
        ],
        order: [['createdAt', 'DESC']]
      });

      // check if user is verified or not
      if (userData == null) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.USER_NOT_EXIST,
          })
        );
      }

      // check if user has active status or not
      if (!userData.active) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.USER_NOT_ACTIVE,
          })
        );
      }

      // check if user has access to admin panel or not
      const adminRoles = await db.Roles.findAll({
        attributes: ["id"],
        where: {
          id: { [Op.not]: "end_user" },
        },
      });
      const hasAdminRoles = userData.user_role_assoc.filter((item) =>
        adminRoles.some((role) => role.id === item.id)
      );
      if (hasAdminRoles.length === 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.ADMIN_USER_NOT_EXIST,
          })
        );
      }

      // verify password
      let isEqual = await verifyHash(password, userData.password);

      // check if password is correct or not
      if (!isEqual) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.INVALID_CREDENTIAL,
          })
        );
      }

      // Identify and record device login
      try {
        const deviceResult = await identifyAndRecordDevice(req, userData);
        console.log('Device identification:', {
          isNewDevice: deviceResult.isNewDevice,
          deviceName: deviceResult.device.deviceName,
          deviceId: deviceResult.device.deviceId
        });
      } catch (deviceErr) {
        // Log error but don't fail login if device identification fails
        console.error('Device identification error:', deviceErr.message);
      }

      // mark user login into DB
      // await db.user.update({ isLogin: 1 }, { where: { id: userData.id } });

      // get other required details

      let sidebarRes = await db.SidebarMenu.findAll({
        attributes: [
          'id',
          'name',
          'route_path_name',
          'icon',
          'order',
          'active'
        ],
        where: {
          active: 1,
          parent_menu_id: null,
          organization: userData.user_organization.id
        },
        raw: true
      });
      let subMenus = await db.SidebarMenu.findAll({
        attributes: [
          'id',
          'name',
          'route_path_name',
          'parent_menu_id',
          'icon',
          'order',
          ['name', 'label']
        ],
        where: {
          active: 1,
          parent_menu_id: {
            [Op.not]: null
          },
          organization: userData.user_organization.id
        },
        raw: true
      });

      const removeSubmenu = ['pesticides_reports'];
      if(userData.subOrganizationId) {
        removeSubmenu.push("membership", "permissions", "role_requests","farm_activities_calendar")
      }
      let sidebarResFinal = sidebarRes.map(item => {
        subMenus.forEach(subMenu => {
          if (subMenu.parent_menu_id === item.id) {
            if ('subMenu' in item) {
              if(!removeSubmenu.includes(subMenu.id)) {
                item.subMenu.push(subMenu)
              }
            } else {
              item.subMenu = []
              item.subMenu.push(subMenu)
            }
          }
        })
        return item
      })

        // Extract all roleIds
        const roleIds = hasAdminRoles.map(role => role.id);

        // Generate sidebar IDs for each role
        let sidebarIds = [];
        roleIds.forEach(roleId => {
          sidebarIds = sidebarIds.concat(sidebarRes.map(s => roleId + '_' + s.id));
          subMenus.forEach(s => sidebarIds.push(roleId + '_' + s.id));
        });

        // Fetch permissions for all roleIds and sidebarIds
        let sidebarModuleRolePermissions = await db.AdminUsersRolesModulesPermissions.findAll({
          where: {
            module_id: sidebarIds
          },
          raw: true
        });

        let permittedModules = [];

        // Filter permitted modules based on multiple roleIds
        if (sidebarModuleRolePermissions && sidebarModuleRolePermissions.length > 0) {
          permittedModules = sidebarModuleRolePermissions.filter(smr => {
            if (smr.permission_id === "get" && smr.permitted === 1) {
              return smr.module_id;
            }
          }).map(smr => smr.module_id);
        }

        // Filter permitted sidebar items
        let permittedSidebarRes = sidebarResFinal.filter(item => {
          if ('subMenu' in item) {
            for (let i = item.subMenu.length - 1; i >= 0; i--) {
              let permitted = roleIds.some(roleId => 
                permittedModules.some(p => p === (roleId + '_' + item.subMenu[i].id))
              );
              if (!permitted) {
                item.subMenu.splice(i, 1);
              }
            }
            if (item.subMenu.length > 0) {
              return true;
            }
            return false;
          } else {
            return roleIds.some(roleId => 
              permittedModules.some(p => p === (roleId + '_' + item.id))
            );
          }
        });
      permittedSidebarRes.sort(compare)
      
      // Check if user is from Kenya/NACCU organization and update menu names accordingly
      // Using the same logic as frontend isKenyaClient() function
      const isKenyaOrg = userData.user_organization && 
        (userData.user_organization.name === 'National Coffee Cooperative Union' || userData.user_organization.name === "test_org33412");
      if (isKenyaOrg) {
        // Update menu names for NACCU users - ONLY for buying_station_coffee (Coffee Overview)
        // Keep original buying_station (Member Data) unchanged
        permittedSidebarRes.forEach(item => {
          if (item.subMenu && item.subMenu.length > 0) {
            item.subMenu.forEach(subItem => {
              // Only update buying_station_coffee menu item (under Coffee Overview)
              // Keep original buying_station (Member Data) unchanged
              if (subItem.id === 'buying_station_coffee') {
                subItem.name = 'Affiliates';
                subItem.sidebar_menu_name = 'Affiliates';
              }
            });
          }
        });
      }
      
      if (req.headers.lang && req.headers.lang != 'en') {
        permittedSidebarRes = req.translateFunction(
          permittedSidebarRes,
          globalTranslationCache,
          { moduleName: 'sideBar', lvl1: true, lvl2: true, }
        );
      }

      // generate access token if all goes well
      let accesstoken = await jwt.sign(
        {
          data: { userId: userData.id },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );

      //salman
      // generate refresh token if all goes well
      let refreshtoken = await jwt.sign(
        {
          data: { userId: userData.id },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "365d" }
      );
      //salman
      // send response
      delete userData.dataValues.password;

      const organization = await db.Organization.findOne({ 
        where: { id: userData.user_organization.id },
        attributes: [ 'id','name', 'code', 'country', 'logo'],
        raw: true
      })

      const organizationD = {
        ...organization,
        ...(userData?.subOrg?.id && {subOrganization:userData?.subOrg})
      }
      // =========  sync user to dds =============;
      await syncUserData(userData.dataValues, organizationD);

      const moduleAndPermissions = await db.AdminUsersRolesModulesPermissions.findAll({
          attributes: ['role_id', 'module_id', 'permission_id', 'permitted'],
          where: {
            role_id: { [Op.in]: roleIds}
          },
      });

      //salman
      const options = { 
        refreshTokenMaxAge: 365 * 24 * 60 * 60 * 1000,
        accessTokenMaxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite:'strict',
        httpOnly:true,
      };

      sendAuthCookies(res,accesstoken,refreshtoken,options);
      //salman

      res.json(
        await successResp({
          msg: success.LOGIN,
          data: {
            ...userData.dataValues,
            sideBarMenu: permittedSidebarRes,
            moduleAndPermissions:moduleAndPermissions
          }
        })
      );
   

    } catch (err) {
      if(process.env.NODE_ENV != "development"){
          try {
            await sendLoginError(JSON.stringify({error:"Something went wrong on our end. Please try again later.", "statusCode": 500}), req);
          } catch (emailError) {
              console.error('Failed to send error email:', emailError);
          }
      }
      //await sendLoginError(JSON.stringify({error:"Unable to login. Internal server error. Please try again later."}), req);
      logErrorOccurred(__filename, err);
      let msg = {
        success:false,
        code:500,
        message:'Something went wrong on our end. Please try again later.'
      }
      try {
        msg  = await errorResp()
      }catch(erro){
        console.log("error throw")
      }
      return res.status(error.code.SERVER_ERROR).json(msg);
    }
  }
);

//salman
router.get("/user-data",auth,
  async (req, res) => {
    try {
       const { id } = req.user;
      // get user data
      let userData = await db.user.findOne({
        attributes: [
          "email",
          "countryCode",
          "mobile",
          "firstName",
          "middleName",
          "lastName",
          "password",
          "verified",
          "id",
          "adminType",
          "active",
          'createdAt',
          "eori_number",
          "countryId",
          "countryIsoCode",
          "organization",
          "subOrganizationId",
          "registrationUserType",
        ],
        where: {id:id},
        include: [
          {
            model: db.Organization,
            as: "user_organization",
            attributes: ["id", "name", "logo", "splashScreen", "country"],
          },
          {
            model: db.Organization,
            as: "subOrg",
            attributes: ["id", "name", "logo", "code", "splashScreen", "country"],
          },
          {
            model: db.Roles,
            as: "user_role_assoc",
            through: { model: db.AdminUserRoles, attributes: [] },
          },
        ],
        order: [['createdAt', 'DESC']]
      });

      // check if user is verified or not
      if (userData == null) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.USER_NOT_EXIST,
          })
        );
      }

      // check if user has active status or not
      if (!userData.active) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.USER_NOT_ACTIVE,
          })
        );
      }

      // check if user has access to admin panel or not
      const adminRoles = await db.Roles.findAll({
        attributes: ["id"],
        where: {
          id: { [Op.not]: "end_user" },
        },
      });
      const hasAdminRoles = userData.user_role_assoc.filter((item) =>
        adminRoles.some((role) => role.id === item.id)
      );
      if (hasAdminRoles.length === 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.ADMIN_USER_NOT_EXIST,
          })
        );
      }

      // get other required details

      let sidebarRes = await db.SidebarMenu.findAll({
        attributes: [
          'id',
          'name',
          'route_path_name',
          'icon',
          'order',
          'active'
        ],
        where: {
          active: 1,
          parent_menu_id: null,
          organization: userData.user_organization.id
        },
        raw: true
      });
      let subMenus = await db.SidebarMenu.findAll({
        attributes: [
          'id',
          'name',
          'route_path_name',
          'parent_menu_id',
          'icon',
          'order',
          ['name', 'label']
        ],
        where: {
          active: 1,
          parent_menu_id: {
            [Op.not]: null
          },
          organization: userData.user_organization.id
        },
        raw: true
      });

      const removeSubmenu = ['pesticides_reports'];
      if(userData.subOrganizationId) {
        removeSubmenu.push("membership", "permissions", "role_requests","farm_activities_calendar")
      }
      let sidebarResFinal = sidebarRes.map(item => {
        subMenus.forEach(subMenu => {
          if (subMenu.parent_menu_id === item.id) {
            if ('subMenu' in item) {
              if(!removeSubmenu.includes(subMenu.id)) {
                item.subMenu.push(subMenu)
              }
            } else {
              item.subMenu = []
              item.subMenu.push(subMenu)
            }
          }
        })
        return item
      })

        // Extract all roleIds
        const roleIds = hasAdminRoles.map(role => role.id);

        // Generate sidebar IDs for each role
        let sidebarIds = [];
        roleIds.forEach(roleId => {
          sidebarIds = sidebarIds.concat(sidebarRes.map(s => roleId + '_' + s.id));
          subMenus.forEach(s => sidebarIds.push(roleId + '_' + s.id));
        });

        // Fetch permissions for all roleIds and sidebarIds
        let sidebarModuleRolePermissions = await db.AdminUsersRolesModulesPermissions.findAll({
          where: {
            module_id: sidebarIds
          },
          raw: true
        });

        let permittedModules = [];

        // Filter permitted modules based on multiple roleIds
        if (sidebarModuleRolePermissions && sidebarModuleRolePermissions.length > 0) {
          permittedModules = sidebarModuleRolePermissions.filter(smr => {
            if (smr.permission_id === "get" && smr.permitted === 1) {
              return smr.module_id;
            }
          }).map(smr => smr.module_id);
        }

        // Filter permitted sidebar items
        let permittedSidebarRes = sidebarResFinal.filter(item => {
          if ('subMenu' in item) {
            for (let i = item.subMenu.length - 1; i >= 0; i--) {
              let permitted = roleIds.some(roleId => 
                permittedModules.some(p => p === (roleId + '_' + item.subMenu[i].id))
              );
              if (!permitted) {
                item.subMenu.splice(i, 1);
              }
            }
            if (item.subMenu.length > 0) {
              return true;
            }
            return false;
          } else {
            return roleIds.some(roleId => 
              permittedModules.some(p => p === (roleId + '_' + item.id))
            );
          }
        });
      permittedSidebarRes.sort(compare)
      
      // Check if user is from Kenya/NACCU organization and update menu names accordingly
      // Using the same logic as frontend isKenyaClient() function
      const isKenyaOrg = userData.user_organization && 
        (userData.user_organization.name === 'National Coffee Cooperative Union' || userData.user_organization.name === "test_org33412");
      if (isKenyaOrg) {
        // Update menu names for NACCU users - ONLY for buying_station_coffee (Coffee Overview)
        // Keep original buying_station (Member Data) unchanged
        permittedSidebarRes.forEach(item => {
          if (item.subMenu && item.subMenu.length > 0) {
            item.subMenu.forEach(subItem => {
              // Only update buying_station_coffee menu item (under Coffee Overview)
              // Keep original buying_station (Member Data) unchanged
              if (subItem.id === 'buying_station_coffee') {
                subItem.name = 'Affiliates';
                subItem.sidebar_menu_name = 'Affiliates';
              }
            });
          }
        });
      }
      
      if (req.headers.lang && req.headers.lang != 'en') {
        permittedSidebarRes = req.translateFunction(
          permittedSidebarRes,
          globalTranslationCache,
          { moduleName: 'sideBar', lvl1: true, lvl2: true, }
        );
      }

    
      // send response
      delete userData.dataValues.password;

      const organization = await db.Organization.findOne({ 
        where: { id: userData.user_organization.id },
        attributes: [ 'id','name', 'code', 'country', 'logo'],
        raw: true
      })

      const organizationD = {
        ...organization,
        ...(userData?.subOrg?.id && {subOrganization:userData?.subOrg})
      }
      // =========  sync user to dds =============;
      await syncUserData(userData.dataValues, organizationD);

      const moduleAndPermissions = await db.AdminUsersRolesModulesPermissions.findAll({
          attributes: ['role_id', 'module_id', 'permission_id', 'permitted'],
          where: {
            role_id: { [Op.in]: roleIds}
          },
      });

      res.json(
        await successResp({
          msg: success.LOGIN,
          data: {
            ...userData.dataValues,
            sideBarMenu: permittedSidebarRes,
            moduleAndPermissions:moduleAndPermissions
          }
        })
      );

    } catch (err) {
      if(process.env.NODE_ENV != "development"){
          try {
            await sendLoginError(JSON.stringify({error:"Something went wrong on our end. Please try again later.", "statusCode": 500}), req);
          } catch (emailError) {
              console.error('Failed to send error email:', emailError);
          }
      }
      //await sendLoginError(JSON.stringify({error:"Unable to login. Internal server error. Please try again later."}), req);
      logErrorOccurred(__filename, err);
      let msg = {
        success:false,
        code:500,
        message:'Something went wrong on our end. Please try again later.'
      }
      try {
        msg  = await errorResp()
      }catch(erro){
        console.log("error throw")
      }
      return res.status(error.code.SERVER_ERROR).json(msg);
    }
  }
);
//salman

router.post('/captcha', async function (req, res) {
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json(
      await errorResp({
        code: 403,
        msg: 'Please select captcha',
      })
    );
  }
  // Put your secret key here.
  var secretKey = process.env.GOOGLE_CAPTCHA_KEY || "6LffNccfAAAAANa2tid2PqmnovnICE99e23HQB64";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, async function (error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      await errorResp({
        code: 403,
        msg: 'Failed captcha verification',
      })
    }
    res.json(
      await successResp({
        msg: success.code.OK,
        data: {},
      })
    )
  });
});
/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: API for admin logout.
 *     description: API for admin login.
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Logged out successfully.", "data": {} }  
 *
 */
router.post("/logout", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const userExist = await user.findByPk(id);
    if (userExist == null) throw error.USER_NOT_EXIST; // if not exist throw error

    // await user.update({ isLogin: 0 }, { where: { id } }); // mark user logout into DB
    res.json(
      await successResp({
        msg: success.LOGOUT,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

/**
 * @swagger
 * /admin/access-token:
 *   post:
 *     summary: API for getting refresh-token.
 *     description: API for getting refresh-token.
 *     tags: [Admin]
 *     requestBody:
 *       description: API for getting refresh-token
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accesstoken:
 *                  type: string
 *                refreshtoken:
 *                  type: string
 *            example:
 *              {"accesstoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c","refreshtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Accesstoken genereated successfully.", "data": { "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTg0fSwiaWF0IjoxNjQ3Mjc5NjMzLCJleHAiOjE2NDcyODAyMzN9.91XXLgwNsLSagVsZPxroSsfoDI7Q7lfUVW9X-L-Yppk", "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTg0LCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJblZ6WlhKSlpDSTZNVGcwZlN3aWFXRjBJam94TmpRM01qYzVOak16TENKbGVIQWlPakUyTkRjeU9EQXlNek45LjkxWFhMZ3dOc0xTYWdWc1pQeHJvU3Nmb0RJN1E3bGZVVlc5WC1MLVlwcGsifSwiaWF0IjoxNjQ3Mjc5NjMzLCJleHAiOjE2Nzg4MTU2MzN9.XXqNENg1Eulce8Eofy-hBlR66pk52DBn4KMLiOx-wVI" } }   
 */
//salman
router.post("/access-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
  
    // verify refresh token
    const { data } = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // generate access token if all goes well
    const accesstoken = await jwt.sign(
      {
        data: { userId: data.userId },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // generate refresh token if all goes well
    const refreshtoken = await jwt.sign(
      {
        data: { userId: data.userId },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "365d" }
    );

     const options = { 
        refreshTokenMaxAge: 365 * 24 * 60 * 60 * 1000,
        accessTokenMaxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite:'strict',
        httpOnly:true,
      };

    sendAuthCookies(res,accesstoken,refreshtoken,options);

    // send response
    return res.json(
      successRespSync({
        msg: success.ACCESSTOKEN_GENERATED,
       
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.json(
      errorRespSync({
        code: success.code.OK,
        msg: error.INVALID_JWT_TOKEN,
      })
    );
  }
});

/**
 * @swagger
 * /admin/userConfig:
 *   get:
 *     summary: Fetch all the audit question and also based on the categories.
 *     description: Fetch all the audit question and also based on the categories.
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
 *                 example:
 *                   success: true
 *                   code: 200
 *
 */
router.get("/userConfig", auth, validationErrorHandler, async (req, res) => {
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: req.user,
    })
  );
});

/**
 * @swagger
 * /admin/validateEmail:
 *   get:
 *     summary: API to get validate email.
 *     description: API to get user details by email.
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: email
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Profile data has been fetched successfully
 *                   data: {firstName": "kawaldeep","lastName": "singh","email": "kawaldeep@dimitra.io","mobile": null,"countryCode": null}
 */
router.get("/validateEmail", async (req, res) => {
  try {
    const { email } = req.query;

    // fetch user profile information
    let result = await db.user.findOne({
      attributes: [
        'firstName',
        "middleName",
        'lastName',
        'email',
        'mobile',
        'countryCode'
      ],
      include: [
        {
          model: db.Roles,
          as: "user_role_assoc",
          through: { model: db.AdminUserRoles, attributes: [] },
          attributes: ["id", "name"],
          where: {
            id: { [Op.not]: 'end_user' },
          }
        },
      ],
      where: { email },
    });

    if (result == null) {
      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: error.USER_NOT_EXIST,
        })
      );
    }

    // send response
    if (result) {
      return res.json(
        successRespSync({
          msg: success.PROFILE_FETCHED,
          data: result,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

/**
 * @swagger
 * /admin/forgot-password/{type}:
 *   post:
 *     summary: API for forgot password.
 *     description: API for forgot password.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: false
 *         schema:
 *           type: Integer
 *         description: email | mobile
 *     requestBody:
 *       description: API for forgot password
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example:
 *              {"email":"abc@yopmail.com"}
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
 *                 example: {"success": true,"code": 200,"message": "OTP sent successfully.","data": {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0OTZ9LCJpYXQiOjE2NDY5MjcyNTIsImV4cCI6MTY0NjkzMDg1Mn0.YheW8RBlS3nJy0vmQ2NrBDlYNsmj_Wbdel6W8trkUoo"}}
 */
router.post("/forgot-password/:type", async (req, res) => {
  try {
    let result;
    const { type } = req.params;
    // console.log("type", type);
    // console.log("req.body", req.body);
    const otp = await createOTP();

    if (type === "email") {
      const { email } = req.body;
      if (email == undefined)
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.BAD_REQUEST,
          })
        );

      // check if user already exist
      let isUserExist = await db.user.findOne({
        attributes: ["email", "countryCode", "id", "password"],
        where: {
          email
        },
      });

      // send error message if user not exist
      if (isUserExist == null) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.USER_NOT_EXIST,
          })
        );
      }

      // generate otp token if all goes well
      let otpHash = await createOtpHash(otp.toString());

      // return res.send(otpHash);
      // create data to be insert into DB
      let userData = {
        otp: otpHash,
        userId: isUserExist.id,
        oldPassword: isUserExist.password,
      };
      // console.log("otpHash",userData);
      // return res.json(isUserExist);

      // store data into DB
      result = await db.forgot_password.create(userData);

      // generate oauth token if all goes well
      let oAuthToken = await jwt.sign(
        {
          data: { id: result.id },
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      try {
         mailer.sendOtp(email, result.firstName, otp);
        return res.json(
          await successResp({
            msg: success.OTP_SENT,
            data: {
              token: oAuthToken,
            },
          })
        );
      } catch (e) {
        return res.status(error.code.SERVER_ERROR).json(await errorResp());
      }
    } else if (type === "mobile") {
      const { mobile } = req.body;
      if (mobile == undefined)
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.BAD_REQUEST,
          })
        );
      // check if user already exist
      let isUserExist = await db.user.findOne({
        attributes: ["mobile", "countryCode", "id", "password"],
        where: db.sequelize.where(
          db.sequelize.fn(
            'concat',
            db.sequelize.col('countryCode'),
            '',
            db.sequelize.col('mobile'),
          ), {
          [Op.like]: `${mobile}`,
        }
        ),
      });

      // send error message if user not exist
      if (isUserExist == null) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.USER_NOT_EXIST,
          })
        );
      }

      // generate otp token if all goes well
      let otpHash = await createOtpHash(otp.toString());

      // return res.send(otpHash);
      // create data to be insert into DB
      let userData = {
        otp: otpHash,
        userId: isUserExist.id,
        oldPassword: isUserExist.password,
      };

      // store data into DB
      result = await db.forgot_password.create(userData);
      // console.log("result", result);

      // generate oauth token if all goes well
      let oAuthToken = await jwt.sign(
        {
          data: { id: result.id },
        },
        process.env.JWT_SECRET,
        { expiresIn: 10 * 60 }
      );

      // send OTP to the user mobile number

      try {
        let info = await twilio.messages.create({
          body: `Your OTP is ${otp}`,
          from: process.env.TWILIO_FROM,
          to: `+${isUserExist.countryCode}${isUserExist.mobile}`,
        });
        // check if sms is sent or not
        if (info.status == 'queued') {
          return res.json(
            await successResp({
              msg: success.OTP_SENT,
              data: {
                token: oAuthToken,
              },
            })
          );
        }
      } catch (err) {
        return res.json(
          await errorResp({
            code: err.status,
            msg: err.message,
          })
        );
      }
    } else {
      return res.json(
        await errorResp({
          code: error.success.code.OK,
          msg: error.BAD_REQUEST,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);

    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

/**
 * @swagger
 * /admin/verify-otp/forgot-password:
 *   post:
 *     summary: API for verifying otp of forgot password.
 *     description: API for verifying otp of forgot password.
 *     tags: [Admin]
 *     requestBody:
 *       description: API for verifying otp of forgot password
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accesstoken:
 *                  token: string
 *                refreshtoken:
 *                  otp: string
 *            example:
 *              {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c","otp":"2323"}
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
 *                 example: {"success": true,"code": 200,"message": "OTP matches successfully.","data": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NTh9LCJpYXQiOjE2NDY5Mjg5NTksImV4cCI6MTY0NjkyOTg1OX0.OiNoJQJXTVFsXNIrsicD1vxGJ_88UXPWIHZZHJEOZjI"}}
 */
router.post("/verify-otp/forgot-password", async (req, res) => {
  try {
    let result;
    const { token, otp } = req.body;

    try {
      let { data } = await jwt.verify(token, process.env.JWT_SECRET);
      if (data.id == null) {
        throw "Id missing";
      }

      result = await db.forgot_password.findByPk(data.id);
      // return res.json(result);
      let isEqual = await verifyHash(otp.toString(), result.otp);
      if (!isEqual) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.INVALID_OTP,
          })
        );
      }

      // console.log("result.userId", result.userId);
      // generate token if all goes well
      let oAuthToken = await jwt.sign(
        {
          data: { id: result.userId },
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // send response
      return res.json(
        await successResp({
          msg: success.OTP_MATCH,
          data: {
            token: oAuthToken,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.UNAUTHORIZED).json(
        await errorResp({
          code: error.code.UNAUTHORIZED,
          msg: error.INVALID_JWT_TOKEN,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);

    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

/**
 * @swagger
 * /admin/create-password:
 *   post:
 *     summary: API to Create new password.
 *     description: API to Create new password.
 *     tags: [Admin]
 *     requestBody:
 *       description: API to Create new password
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accesstoken:
 *                  token: string
 *                refreshtoken:
 *                  otp: string
 *            example:
 *              {"password":"Admin@123"}
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
 *                 example: {}
 */
router.post("/create-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    let { data } = await jwt.verify(token, process.env.JWT_SECRET);
    if (data.id == null) {
      throw "Id missing";
    }
    const passwordHash = await createPassword(password);

    // update password
    let result = await db.user.update(
      { password: passwordHash },
      { where: { id: data.id } }
    );
    // send response back
    if (result) {
      return res.json(await successResp({ msg: success.PASSWORD_CREATED }));
    } else {
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  } catch (err) {
    logErrorOccurred(__filename, err);

    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

// User List Module

/**
 * @swagger
 * /admin/userList/{userType}:
 *   get:
 *     summary: API for getting users list.
 *     description: API for getting users list.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userType
 *         required: false
 *         schema:
 *           type: string
 *           enum: [end_user, admin] 
 *         description: end_user | admin
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
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc] 
 *       - in: query
 *         name: searchPhrase
 *         schema:
 *           type: string
 *       - in: query
 *         name: membershipType
 *         schema:
 *           type: integer
 *       - in: query
 *         name: membershipValidity
 *         schema:
 *           type: string
 *           enum: [expired, lessThen1Month, 1-8Months, 6-12Months, moreThan1Year, custom] 
 *       - in: query
 *         name: membershipRemainingDays
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "firstName": "santosh", "lastName": "gusain", "mobile": null, "active": 1, "user_role_assoc.id": "community_admin", "user_role_assoc.name": "Community Admin", "user_dept_assoc.id": null, "user_dept_assoc.name": null }, { "firstName": null, "lastName": null, "mobile": "7087729700", "active": 1, "user_role_assoc.id": "community_admin", "user_role_assoc.name": "Community Admin", "user_dept_assoc.id": null, "user_dept_assoc.name": null }, { "firstName": null, "lastName": null, "mobile": "78306191191", "active": 1, "user_role_assoc.id": "community_admin", "user_role_assoc.name": "Community Admin", "user_dept_assoc.id": null, "user_dept_assoc.name": null }, { "firstName": null, "lastName": null, "mobile": null, "active": 1, "user_role_assoc.id": "community_admin", "user_role_assoc.name": "Community Admin", "user_dept_assoc.id": null, "user_dept_assoc.name": null },]}    
 */
router.get(
  '/userList/:userType',
  auth,
  appUserValidator.userListValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, searchPhrase, orderField="createdAt", order="DESC" } = req.query;
      let listRes = [];
      const { organization, subOrgId } = req.user;
      // fetch admin roles
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
      let query = {};

      if(req.params.userType == 'all_users') {
        query = {
          attributes: [
            'id',
            'fullName',
            'firstName',
            "middleName",
            'lastName',
            'mobile',
            'active',
            'email',
            'countryCode',
            'countryId',
            'stateId',
            'district',
            "city",
            'village',
            'address',
            'userTribe',
            'partnerTribe',
            'website',
            'createdAt'
          ],
          include: [
            {
              model: db.Organization,
              as: 'user_organization',
            },
              {
              model: db.Roles,
              as: 'user_role_assoc',
              through: { model: db.AdminUserRoles, attributes: [] },
              attributes: ['id', 'name'],
              required: false
            },
              {
              model: db.Departments,
              as: 'user_dept_assoc',
              through: { model: db.UserDepartment, attributes: [] },
              attributes: ['id', 'name'],
              required: false
            },
                 {
              model: db.activationKeys,
              as: 'activation',
              include: [
                {
                  model: db.Membership,
                  as: 'membership_assoc',
                  attributes: [
                    'membership_type',
                    'membership_duration',
                    'membership_duration_unit',
                  ],
                },
              ],
              attributes: [
                'membershipExtendedDays',
                'membershipExtensionReason',
                'membership_type',
                'membershipValidity',
              ],
              required: false
            },
          ],
        };

        query.where = {}
        
              if (searchPhrase) {
          query.where = {
            ...query.where,
            [Op.or]: [
              { firstName: { [Op.like]: `%${searchPhrase}%` } },
              { middleName: { [Op.like]: `%${searchPhrase}%` } },
              { lastName: { [Op.like]: `%${searchPhrase}%` } },
              { mobile: { [Op.like]: `%${searchPhrase}%` } },
              { email: { [Op.like]: `%${searchPhrase}%` } },
            ],
          };
        }

         if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
          limit = parseInt(limit);
          query.offset = (page - 1) * limit;
          query.limit = limit;
        }
        query.where.organization = organization;
        query.where.subOrganizationId = subOrgId || null;
        listRes = await db.user.findAndCountAll(query);
        console.log("listRes", listRes);
      }
      else if (req.params.userType == 'end_user') {
        let {
          membershipType: membership_type,
          membershipValidity,
          membershipRemainingDays,
          state,
          city,
        } = req.query;

        let membershipWhere = {
          ...(_.isEmpty(membership_type) ? null : { membership_type }),
        };
        switch (membershipValidity) {
          case 'expired':
            membershipWhere = {
              ...membershipWhere,
              membershipValidityWithExtension: db.Sequelize.where(
                db.Sequelize.fn(
                  'ADDDATE',
                  db.Sequelize.col('membershipValidity'),
                  db.Sequelize.fn('COALESCE', 'membershipExtendedDays', 0)
                ),
                '<',
                moment.utc().format('YYYY-MM-DD')
              ),
            };
            break;
          case 'lessThen1Month':
            membershipWhere = {
              ...membershipWhere,
              membershipValidityWithExtension: db.Sequelize.where(
                db.Sequelize.fn(
                  'ADDDATE',
                  db.Sequelize.col('membershipValidity'),
                  db.Sequelize.fn('COALESCE', 'membershipExtendedDays', 0)
                ),
                '<',
                moment.utc().add(1, 'M').format('YYYY-MM-DD')
              ),
            };
            break;
          case '1-8Months':
            membershipWhere = {
              ...membershipWhere,
              membershipValidityWithExtension: db.Sequelize.where(
                db.Sequelize.fn(
                  'ADDDATE',
                  db.Sequelize.col('membershipValidity'),
                  db.Sequelize.fn(
                    'COALESCE',
                    db.Sequelize.col('membershipExtendedDays'),
                    0
                  )
                ),
                'BETWEEN',
                [
                  moment.utc().add(1, 'M').format('YYYY-MM-DD'),
                  moment.utc().add(8, 'M').format('YYYY-MM-DD'),
                ]
              ),
            };
            break;
          case '6-12Months':
            membershipWhere = {
              ...membershipWhere,
              membershipValidityWithExtension: db.Sequelize.where(
                db.Sequelize.fn(
                  'ADDDATE',
                  db.Sequelize.col('membershipValidity'),
                  db.Sequelize.fn(
                    'COALESCE',
                    db.Sequelize.col('membershipExtendedDays'),
                    0
                  )
                ),
                'BETWEEN',
                [
                  moment.utc().add(6, 'M').format('YYYY-MM-DD'),
                  moment.utc().add(12, 'M').format('YYYY-MM-DD'),
                ]
              ),
            };
            break;
          case 'moreThan1Year':
            membershipWhere = {
              ...membershipWhere,
              membershipValidityWithExtension: db.Sequelize.where(
                db.Sequelize.fn(
                  'ADDDATE',
                  db.Sequelize.col('membershipValidity'),
                  db.Sequelize.fn('COALESCE', 'membershipExtendedDays', 0)
                ),
                '>=',
                moment.utc().add(1, 'y').format('YYYY-MM-DD')
              ),
            };
            break;
          case 'custom':
            membershipWhere = {
              ...membershipWhere,
              membershipValidityWithExtension: db.Sequelize.where(
                db.Sequelize.fn(
                  'ADDDATE',
                  db.Sequelize.col('membershipValidity'),
                  db.Sequelize.fn('COALESCE', 'membershipExtendedDays', 0)
                ),
                '>=',
                moment
                  .utc()
                  .add(membershipRemainingDays || 0, 'd')
                  .format('YYYY-MM-DD')
              ),
            };
            break;
        }

        query = {
          attributes: [
            'id',
            'fullName',
            'firstName',
            "middleName",
            'lastName',
            'mobile',
            'active',
            'email',
            'countryCode',
            'countryId',
            'stateId',
            'district',
            "city",
            'village',
            'address',
            'userTribe',
            'partnerTribe',
            'website',
            'userType',
            'createdAt'
          ],
          include: [
                {
              model: db.AdminUserRoles, 
              as: 'admin_user_roles_assoc', 
              required: false, 
            },
            {
              ...(_.isEmpty(membershipWhere)
                ? null
                : { where: { ...membershipWhere } }),
              model: db.activationKeys,
              as: 'activation',
              include: [
                {
                  model: db.Membership,
                  as: 'membership_assoc',
                  attributes: [
                    'membership_type',
                    'membership_duration',
                    'membership_duration_unit',
                  ],
                },
              ],
              attributes: [
                'membershipExtendedDays',
                'membershipExtensionReason',
                'membership_type',
                'membershipValidity',
              ],
            },
          ],
          distinct: true, // Ensure distinct results
            subQuery: false,
        };

        if (orderField && order) {
          if (orderField == 'role') {
            query.order = [['user_role_assoc', 'name', order]];
          } else {
            query.order = [[orderField, order]];
          }
        } else {
          query.order = [['firstName', 'ASC']];
        }
        query.where =  {
          [Op.and]: [
            { organization, subOrganizationId: subOrgId || null },
            // Exclude offline users
            {
              [Op.or]: [
                { userType: { [Op.ne]: 'offline' } },
                { userType: { [Op.is]: null } }
              ]
            },
            // `admin_user_roles`.`user_id` will be null for users with no related rows
            Sequelize.where(
              Sequelize.col('admin_user_roles_assoc.user_id'),
              'IS',
              null
            ),
          ],
        }
        if (searchPhrase) {
          query.where = {
            ...query.where,
            [Op.or]: [
              { firstName: { [Op.like]: `%${searchPhrase}%` } },
              { middleName: { [Op.like]: `%${searchPhrase}%` } },
              { lastName: { [Op.like]: `%${searchPhrase}%` } },
              { mobile: { [Op.like]: `%${searchPhrase}%` } },
              { email: { [Op.like]: `%${searchPhrase}%` } },
            ],
          };
        }
        if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
          limit = parseInt(limit);
          query.offset = (page - 1) * limit;
          query.limit = limit;
        }
        listRes = await db.user.findAndCountAll(query);
      } else if (req.params.userType == 'admin') {
        query = {
          attributes: [
            'id',
            'fullName',
            'firstName',
            'middleName',
            'lastName',
            'mobile',
            'active',
            'email',
            'countryCode',
            'countryId',
            'stateId',
            'city',
            'createdAt'
          ],
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
            },
            {
              model: db.Departments,
              as: 'user_dept_assoc',
              through: { model: db.UserDepartment, attributes: [] },
              attributes: ['id', 'name'],
            },
          ],
          // raw: true,
        };
        if (orderField && order) {
          if (orderField == 'role') {
            query.order = [['user_role_assoc', 'name', order]];
          } else {
            query.order = [[orderField, order]];
          }
        } else {
          query.order = [['firstName', 'ASC']];
        }

        query.where = { organization, subOrganizationId: subOrgId || null };
        if (searchPhrase) {
          query.where = {
            ...query.where,
            [Op.or]: [
              { firstName: { [Op.like]: `%${searchPhrase}%` } },
              { middleName: { [Op.like]: `%${searchPhrase}%` } },
              { lastName: { [Op.like]: `%${searchPhrase}%` } },
              { mobile: { [Op.like]: `%${searchPhrase}%` } },
              { email: { [Op.like]: `%${searchPhrase}%` } },
            ],
          };
        }
        if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
          limit = parseInt(limit);
          query.offset = (page - 1) * limit;
          query.limit = limit;
        }
        listRes = await db.user.findAndCountAll(query);
      } else if (req.params.userType == 'offline_user') {
        query = {
          attributes: [
            'id',
            'fullName',
            'firstName',
            'middleName',
            'lastName',
            'mobile',
            'active',
            'email',
            'countryCode',
            'countryId',
            'stateId',
            'district',
            "city",
            'village',
            'address',
            'userTribe',
            'partnerTribe',
            'website',
            'userType',
            'createdAt'
          ],
        }

        query.distinct = true;
        
        if (orderField && order) {
          if (orderField == 'role') {
            query.order = [['user_role_assoc', 'name', order]];
          } else {
            query.order = [[orderField, order]];
          }
        } else {
          query.order = [['firstName', 'ASC']];
        }
        query.where = {
          organization,
          subOrganizationId: subOrgId || null,
          userType: {
            [Sequelize.Op.or]: [
              { [Sequelize.Op.like]: '%offline%' },
            ]
          },
        }
        if (searchPhrase) {
          query.where = {
            ...query.where,
            [Op.or]: [
              { firstName: { [Op.like]: `%${searchPhrase}%` } },
              { middleName: { [Op.like]: `%${searchPhrase}%` } },
              { lastName: { [Op.like]: `%${searchPhrase}%` } },
              { mobile: { [Op.like]: `%${searchPhrase}%` } },
              { email: { [Op.like]: `%${searchPhrase}%` } },
            ],
          };
        }
        if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
          limit = parseInt(limit);
          query.offset = (page - 1) * limit;
          query.limit = limit;
        }
        listRes = await db.user.findAndCountAll(query);
      } else {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: error.INVALID_USERTYPE,
          })
        );
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: listRes,
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);


router.get(
    '/adminuserListByRole/:roleType',
    auth,
    appUserValidator.userListValidation(),
    validationErrorHandler,
    async (req, res) => {
      console.log(req.user, "-----------------");
      try {
        let {page, limit, searchPhrase, countryId, orderField = "createdAt", order = "DESC"} = req.query;


        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        let listRes = [];
        const {organization, subOrgId} = req.user;
        const org = await db.Organization.findOne({
          where: {
            id: organization
          }
        });

        if (!org) {
          return res.json(
            errorRespSync({
              msg: `Organization not found`,
            })
          );
        }

        
        roleType = req.params.roleType;
        const orgName = org.name;

   
        const toSnakeCase = (str) => {
          return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/\s+/g, '_') 
            .replace(/__+/g, '_')
            .toLowerCase();
        };
        
        const snakeCaseRoleType = toSnakeCase(roleType);
        const role_id = `${snakeCaseRoleType}`
        let query = {};


        query = {
          attributes: [
            'id',
            'fullName',
            'firstName',
            'middleName',
            'lastName',
            'mobile',
            'active',
            'email',
            'countryCode',
            'countryIsoCode',
            'countryId',
            'country',
            'stateId',
            'city',
            'district',
            'village',
            'address',
            'createdAt',
            'eori_number'
          ],
          include: [
            {
              model: db.Roles,
              as: 'user_role_assoc',
              through: {model: db.AdminUserRoles, attributes: []},
              attributes: ['id', 'name'],
              required: true,
              where: {
                id: role_id
              },
            },
          ],
        };
        if (orderField && order) {
          if (orderField == 'role') {
            query.order = [['user_role_assoc', 'name', order]];
          } else {
            query.order = [[orderField, order]];
          }
        } else {
          query.order = [['firstName', 'ASC']];
        }

        query.where = {organization, ...(subOrgId && { subOrganizationId:subOrgId }) };
        if (searchPhrase) {
          const formattedSearchPhrase = `%${searchPhrase.trim()}%`;
          
          query.where = {
            ...query.where,
            [Op.or]: [
              { firstName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              { middleName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              { lastName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              {mobile: {[Op.like]: `%${formattedSearchPhrase}%`}},
              {email: {[Op.like]: `%${formattedSearchPhrase}%`}},

              // if need use this for middlename
              // Sequelize.where(
              //   Sequelize.fn(
              //     'CONCAT',
              //     Sequelize.col('firstName'),
              //     ' ',
              //     Sequelize.col('middleName'),
              //     ' ',
              //     Sequelize.col('lastName')
              //   ),
              //   {
              //     [Op.like]: formattedSearchPhrase
              //   }
              // ),
              Sequelize.where(
                Sequelize.fn(
                  'CONCAT',
                  Sequelize.col('firstName'),
                  ' ',
                  Sequelize.col('lastName')
                ),
                {
                  [Op.like]: `%${formattedSearchPhrase}%`
                }
              )
            ]
          };
        }
        
        if(countryId){
          query.where={
            ...query.where,
            countryId:countryId
          }
        }

        if (!isNaN(page) && !isNaN(limit)) {
          query.offset = (page - 1) * limit;
          query.limit = limit;
        }
        listRes = await db.user.findAndCountAll(query);

        return res.json(
            successRespSync({
              msg: success.FETCH,
              data: listRes,
            })
        );
      } catch (err) {
        return res.status(error.code.SERVER_ERROR).json(err.toString());
      }
    }
);

// New API endpoint for fetching users with multiple roles
router.get(
    '/adminuserListByMultipleRoles',
    auth,
    appUserValidator.userListValidation(),
    validationErrorHandler,
    async (req, res) => {
      console.log(req.user, "-----------------");
      try {
        let {page, limit, searchPhrase, countryId,stateId, address, orderField = "createdAt", order = "DESC", registrationType, startDate, endDate} = req.query;

        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        let listRes = [];
        const {organization, subOrgId} = req.user;
        const org = await db.Organization.findOne({
          where: {
            id: organization
          }
        });

        if (!org) {
          return res.json(
            errorRespSync({
              msg: `Organization not found`,
            })
          );
        }

        // Function to translate registration type from English to Indonesian for filtering
        const translateRegistrationTypeToIndonesian = (englishType) => {
          switch(englishType.toLowerCase()) {
            case 'exporter':
              return 'ekspor';
            case 'cooperative':
              return 'koperasi';
            case 'cooperative and exporter':
              return 'keduanya';
            default:
              return englishType;
          }
        };

        // Now build the main query for users
        let query = {
          attributes: [
            'id',
            'firstName',
            'middleName',
            'lastName',
            'mobile',
            'active',
            'email',
            'countryCode',
            'countryIsoCode',
            'countryId',
            'country',
            'stateId',
            'city',
            'address',
            'district',
            'village',
            'createdAt',
            'eori_number',
            'registrationUserType',
            'NoOfFarmsPlanningtoonboard'
          ],
          where: {},
          include: [
            {
              model: db.Roles,
              as: 'user_role_assoc',
              through: {model: db.AdminUserRoles, attributes: []},
              attributes: ['id', 'name'],
              required: false,
            },
            {
              model: db.Organization,
              as: 'org',
              attributes: [
                'id', 
                'name', 
                'logo', 
              ],
              // include: [
              //   {
              //     model: db.Product,
              //     as: 'products',
              //     attributes: ['id', 'name'],
              //     through: {
              //       attributes: []
              //     }
              //   }
              // ],
              required: true,
            },
            {
              model: db.Organization,
              as: 'subOrg',
              attributes: ['id', 'name', 'logo'],
              required: true,
              where: {
                isSubOrganization: true
              },
              include: [
                {
                  model: db.Product,
                  as: 'products',
                  attributes: ['id', 'name'],
                }
              ]
            }
          ]
        };

        if (orderField && order) {
          if (orderField == 'role') {
            query.order = [['user_role_assoc', 'name', order]];
          } else {
            query.order = [[orderField, order]];
          }
        } else {
          query.order = [['firstName', 'ASC']];
        }

        // Build where conditions array
        const whereConditions = [];

        // Apply registration type filter directly for all organizations
        const registrationTypeFilter = ['koperasi', 'keduanya', 'cooperative_union'];

        // Apply search functionality
        if (searchPhrase) {
          const formattedSearchPhrase = `%${searchPhrase.trim()}%`;
          
          whereConditions.push({
            [Op.or]: [
              { firstName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              { middleName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              { lastName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              {mobile: {[Op.like]: `%${formattedSearchPhrase}%`}},
              {email: {[Op.like]: `%${formattedSearchPhrase}%`}},
              Sequelize.where(
                Sequelize.fn(
                  'CONCAT',
                  Sequelize.col('firstName'),
                  ' ',
                  Sequelize.col('lastName')
                ),
                {
                  [Op.like]: `%${formattedSearchPhrase}%`
                }
              )
            ]
          });
        }
        
        if(countryId){
          whereConditions.push({
            countryId: countryId
          });
        }

                
        if(address){
          const formattedAddressPhrase = `%${address.trim()}%`;
          whereConditions.push({
            [Op.or]: [
              { address: { [Op.like]: formattedAddressPhrase } },
              { countryId: { [Op.like]: formattedAddressPhrase } },
              { stateId: { [Op.like]: formattedAddressPhrase } },
              { village: { [Op.like]: formattedAddressPhrase } },
              { district: { [Op.like]: formattedAddressPhrase } }
            ]
          });
        }

        // Apply registration type filter if provided
        if (registrationType) {
          const indonesianRegistrationType = translateRegistrationTypeToIndonesian(registrationType);
          whereConditions.push({
            registrationUserType: indonesianRegistrationType
          });
        }

        // Apply role-based registration type filtering
        if (registrationTypeFilter && registrationTypeFilter.length > 0) {
          const filterCondition = {
            registrationUserType: {
              [Op.in]: registrationTypeFilter
            }
          };
          whereConditions.push(filterCondition);
        }

        // Apply organization filter using authenticated user's organization
        if (req.user && req.user.organization) {
          whereConditions.push({
            organization: req.user.organization
          });
        }

        if (whereConditions.length > 0) {
          const queryWhere = {
            [Op.and]: whereConditions
          };
          query.where = queryWhere;
        }

        let totalCountQuery = {
          attributes: ['id'],
          include: [
            {
              model: db.Roles,
              as: 'user_role_assoc',
              through: {model: db.AdminUserRoles, attributes: []},
              attributes: [],
              required: false,
            }
          ],
          raw: true
        };

        const totalCountWhereConditions = [];

        if (searchPhrase) {
          const formattedSearchPhrase = `%${searchPhrase.trim()}%`;
          totalCountWhereConditions.push({
            [Op.or]: [
              { firstName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              { middleName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              { lastName: { [Op.like]: `%${formattedSearchPhrase}%` } },
              {mobile: {[Op.like]: `%${formattedSearchPhrase}%`}},
              {email: {[Op.like]: `%${formattedSearchPhrase}%`}},
              Sequelize.where(
                Sequelize.fn(
                  'CONCAT',
                  Sequelize.col('firstName'),
                  ' ',
                  Sequelize.col('lastName')
                ),
                {
                  [Op.like]: `%${formattedSearchPhrase}%`
                }
              )
            ]
          });
        }

        if (countryId) {
          totalCountWhereConditions.push({
            countryId: countryId
          });
        }

        if (registrationType) {
          const indonesianRegistrationType = translateRegistrationTypeToIndonesian(registrationType);
          totalCountWhereConditions.push({
            registrationUserType: indonesianRegistrationType
          });
        }

        // Apply role-based registration type filtering to total count query
        if (registrationTypeFilter && registrationTypeFilter.length > 0) {
          totalCountWhereConditions.push({
            registrationUserType: {
              [Op.in]: registrationTypeFilter
            }
          });
        }

        // Apply organization filter to total count query using authenticated user's organization
        if (req.user && req.user.organization) {
          totalCountWhereConditions.push({
            organization: req.user.organization
          });
        }

        if (totalCountWhereConditions.length > 0) {
          totalCountQuery.where = {
            [Op.and]: totalCountWhereConditions
          };
        }

        const totalCountResult = await db.user.findAll(totalCountQuery);
        const totalCount = totalCountResult.length;

        // Add date filtering if startDate and endDate are provided
        if (startDate && endDate) {
          query.where = {
            ...query.where,
            createdAt: {
              [Op.between]: [new Date(startDate + ' 00:00:00'), new Date(endDate + ' 23:59:59')]
            }
          };
        } else if (startDate) {
          query.where = {
            ...query.where,
            createdAt: {
              [Op.gte]: new Date(startDate + ' 00:00:00')
            }
          };
        } else if (endDate) {
          query.where = {
            ...query.where,
            createdAt: {
              [Op.lte]: new Date(endDate + ' 23:59:59')
            }
          };
        }

        if (!isNaN(page) && !isNaN(limit)) {
          query.offset = (page - 1) * limit;
          query.limit = limit;
        }

        listRes = await db.user.findAll(query);

        // 2️⃣ Clone query but remove pagination for total count
        const countQuery = { ...query };
        delete countQuery.limit;
        delete countQuery.offset;

        // 3️⃣ Total count query (same filters, no pagination)
        const enrichedUsersListRes = await db.user.findAll(countQuery);


        const enrichedUsers = await Promise.all(
          listRes.map(async (user) => {
            const userData = user.toJSON();
          
            
            // Get products from user's organization
            const products = userData.subOrg?.products || [];
            
            // Add fullName (virtual field) to the response
            const fullName = user.fullName;
            
            return {
              ...userData,
              fullName: fullName,
              products: products,
              translatedRegistrationType: translateUserTypeFromIndonesian(userData.registrationUserType)
            };
          })
        );

        return res.json(
            successRespSync({
              msg: success.FETCH,
              data: {
                count: enrichedUsers.length,
                totalCount: enrichedUsersListRes.length,
                rows: enrichedUsers
              }
            })
        );
      } catch (err) {
        console.error('Error in adminuserListByMultipleRoles:', err);
        return res.status(error.code.SERVER_ERROR).json(err.toString());
      }
    }
);


/**
 * @swagger
 * /admin/toggleActiveStatus/:userId
 * Create new password
 */

/**
 * @swagger
 * /admin/toggleUserActiveStatus/{userId}:
 *   put:
 *     summary: API for toggling user status.
 *     description: API for toggling users status.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of the user
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
 *                 example: { "success": true, "code": 200, "message": "Status has been updated successfully.", "data": { "firstName": null, "lastName": null, "email": null, "mobile": "7087729700", "active": 0, "user_role_assoc": [ {"id": "community_admin","name": "Community Admin"}], "user_dept_assoc": []}} 
 */

router.put(
  "/toggleUserActiveStatus/:userId",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { userId } = req.params;

      let userRes = null
      userRes = await db.user.findOne({where: { id: Number(userId) }})
      if(userRes && userRes?.active){
        await db.user.update(
          { active: 0 },
          { where: { id: Number(userId) } }
        );
        await db.activationKeys.update(
          {
            status: "unassigned",
            user_email: null,
            user_id: null,
            phone_no: null,
            is_deleted: 1,
          },
          { where: { user_id: Number(userId) } }
        );
        await syncMarketPlaceUserData({disabled: true,id: userId, type: 'updateAppUser'});

      } else {
        await db.user.update(
          { active: 1, verified: 1 },
          { where: { id: Number(userId) } }
        );
        await syncMarketPlaceUserData({disabled: false,id: userId, type: 'updateAppUser'});
      }
     
  

      return res.json(
        successRespSync({
          msg: success.ADMIN_USER_STATUS_UPDATE,
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);

router.put(
  "/toggleDdsUserStatus/:userId",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      await db.user.update(
        { active: status },
        { where: { id: Number(userId) } }
      );

      const user_organization = await db.user.findOne({
        attributes: [['organization', 'id']],
        where: {
          id: userId
        },
      })


      const org = await db.Organization.findOne({
        attributes:['id','name','code'],
        where:{
          id:user_organization.id
        }
      });

      const userRes = await db.user.findOne({
        where: {
          id:userId
        },
      });

      // SYNC TO DDS USERS
      await syncUserData(userRes, org);

      return res.json(
        successRespSync({
          msg: success.ADMIN_USER_STATUS_UPDATE,
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);

/**
 * @swagger
 * /admin/updateUser/{userId}:
 *   put:
 *     summary: API for updating admin user.
 *     description: API for updating admin user.
 *     tags: [Admin]
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: admin user id
 *        schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                mobile:
 *                  type: string
 *                password:
 *                  type: string
 *                active:
 *                  type: integer
 *            example:
 *              { "firstName": "hemant", "lastName": "rathore", "email": "hemant@dimitra.io", "mobile": "7830619119", "password": "test123", "active": 1 }
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
 *                 example: {"success": true,"code": 200, "message": "user updated successfully.","data": {}} 
 */

router.put("/updateUser/:userId", auth, validationErrorHandler, async (req, res) => {
  try {
    const { userId, firstName, middleName, lastName, email, password, role_id, department_id, mobile, countryCode, country, state, city, active } = req.body
    const adminType = req.user.adminType

    
    // toggle active status of user
    let userSet = {
      firstName,
      middleName,
      lastName,
      email,
      mobile,
      countryId: country,
      stateId: state,
      countryCode,
      country,
      state,
      city,
      adminType,
      active,
      registrationUserType: existingUserRes?.registrationUserType
    }
        
    if(password) {
      userSet.password = await createPassword(password);
    }

    let roleSet = { id: `${userId}_${role_id}`, role_id, user_id: userId }


    await db.user.update(userSet, { where: { id: userId } })
    await db.AdminUserRoles.destroy({ where: { user_id: userId } })
    await db.AdminUserRoles.upsert(roleSet)
    // await db.UserDepartment.update(deptSet, {where: {user_id: userId}})

    if (userId && department_id) {
      await db.UserDepartment.upsert({
        id: `${userId}_${department_id}`,
        user_id: userId,
        department_id
      })
    }

    let organization = await db.Organization.findOne({ where: { id: req.user.organization }, raw: true }); 

    await syncUserData(userSet, organization)

    return res.json(
      successRespSync({
        msg: success.USER_UPDATED,
        data: {}
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
});

/**
 * @swagger
 * /admin/getAllModulesPermissions/{userType}:
 *   get:
 *     summary: API for getting module permissions of user.
 *     description: API for getting module permissions of user.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userType
 *         required: false
 *         schema:
 *           type: Integer
 *         description: app_user | admin_user
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
 *                 example: {"success": true,"code": 200,"message": "Fetched successfully.", "data": [{"id": "community_admin","name": "Community Admin","modules": [{"id": "community_admin_activity_log","name": "Activity Log","role_modules_permissions": [{ "id": "community_admin_activity_log_delete","role_id": "community_admin","module_id": "community_admin_activity_log","permission_id": "delete","permitted": true,"permission_name": "delete"},]},]}]}
 */

router.get("/getAllModulesPermissions/:userType", auth, translation, validationErrorHandler, async (req, res) => {
  try {
    const { id } = req.user
    const { userType } = req.params
    const userRole = await db.UserRoles.findOne({
      attributes: ['role_id'],
      where: {
        user_id: id
      }
    });
    let modules;
    if (userType === 'app_user') {
      modules = await db.ParentModules.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: db.Modules,
            as: 'modules',
            attributes: ['id', 'name'],
            include: [
              {
                model: db.RolesModulesPermissions,
                as: 'role_modules_permissions',
                attributes: ['id', 'role_id', 'module_id', 'permission_id', 'permitted',
                  [db.sequelize.literal('`modules->role_modules_permissions->Permission`.`name`'), 'permission_name']],
                include: [
                  {
                    model: db.Permissions,
                    attributes: [],
                  },
                ],
                where: {
                  role_id: "end_user"
                }
              }
            ]
          },
        ],
        where: {
          module_type: 'app_user'
        }
      })
    } else if (userType === 'admin_user') {
      modules = await db.ParentModules.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: db.Modules,
            as: 'modules',
            attributes: ['id', 'name'],
            include: [
              {
                model: db.AdminUsersRolesModulesPermissions,
                as: 'admin_users_roles_modules_permissions',
                attributes: ['id', 'role_id', 'module_id', 'permission_id', 'permitted',
                  [db.sequelize.literal('`modules->role_modules_permissions->Permission`.`name`'), 'permission_name']],
                include: [
                  {
                    model: db.Permissions,
                    attributes: [],
                  }
                ],
                where: {
                  role_id: { [Op.not]: userRole.role_id },
                },
              }
            ]
          },
        ],
        where: {
          module_type: 'admin'
        }
      })
    } else {
      return res.json(
        successRespSync({
          msg: error.USER_TYPE_NOT_EXITS,
        })
      );
    }
    if (req.headers.lang && req.headers.lang != 'en') {
      modules = req.translateFunction(modules, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        lvl3: true,
        moduleName: 'adminModulePermissions'
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: modules,
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
}
);

router.get("/allModulesPermissions/:role", auth, translation, validationErrorHandler, async (req, res) => {
  try {

    const { role } = req.params
    const { searchPhrase } = req.query
    let searchQuery = {}
    if (searchPhrase) {
      searchQuery = {
        [Op.or]: [
          { "name": { [Op.like]: `%${searchPhrase}%` } },
          // { "description": { [Op.like]: `%${searchPhrase}%` } },
        ]
      }
    }

    let modules = await db.ParentModules.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: db.Modules,
          as: 'modules',
          attributes: ['id', 'name'],
          include: [
            {
              model: db.AdminUsersRolesModulesPermissions,
              as: 'admin_users_roles_modules_permissions',
              attributes: ['id', 'role_id', 'module_id', 'permission_id', 'permitted',
                [db.sequelize.literal('`modules->admin_users_roles_modules_permissions->Permission`.`name`'), 'permission_name']],
              include: [
                {
                  model: db.Permissions,
                  attributes: [],
                }
              ],
              where: {
                role_id: role,
              },
            }
          ],
          where: searchQuery
        },
      ]
    })
    if (req.headers.lang && req.headers.lang != 'en') {
      modules = req.translateFunction(modules, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        lvl3: true,
        moduleName: 'adminModulePermissions'
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: modules,
      })
    );


  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
}
);

/**
 * @swagger
 * /admin/changeModulePermission:
 *   put:
 *     summary: API for changing module permissions.
 *     description: API for changing module permissions.
 *     tags: [Admin]
 *     requestBody:
 *       description: API for changing module permissions
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"id":"super_admin_weed_put","value":1}
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
 *                 example: {"success": true,"code": 200, "message": "Modules permission has been updated successfully.","data": {}} 
 */

router.put("/changeModulePermission", auth, validationErrorHandler, async (req, res) => {
  try {
    const { modulePermissionUpdates } = req.body


    // permitted updations
    let permittedUpdatesIds = modulePermissionUpdates.filter(modulePermissions => (modulePermissions.permitted)).map(mpIds => mpIds.id)

    // unpermitted updations
    let unPermittedUpdatesIds = modulePermissionUpdates.filter(modulePermissions => (!modulePermissions.permitted)).map(mpIds => mpIds.id)

    // update permitted module permission
    const permittedResult = await db.AdminUsersRolesModulesPermissions.update(
      { permitted: 1 },
      { where: { id: permittedUpdatesIds } }
    );


    // update permitted module permission
    const unPermittedResult = await db.AdminUsersRolesModulesPermissions.update(
      { permitted: 0 },
      { where: { id: unPermittedUpdatesIds } }
    );
    return res.json(
      successRespSync({
        msg: success.MODULE_PERMISSION_UPDATED,
        data: { ...permittedResult, ...unPermittedResult }
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
}
);

/**
 * @swagger
 * /admin/getProfileAuthenticationSettings:
 *   get:
 *     summary: API for getting profile authentication settings.
 *     description: API for getting profile authentication settings.
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
 *                 example: {"success": true,"code": 200,"message": "Fetched successfully.","data": {"id": 1,"auto_log_off_value": 30,"auto_log_off_value_type": "mins","unsuccessful_login_attempts_value": 5,"unsuccessful_login_attempts_value_type": "per_hour","unsuccessful_login_lockout_value": 30,"unsuccessful_login_lockout_value_type": "mins","password_length": 8,"number_of_unique_passwords": 7,"maximum_password_age_value": 30,"maximum_password_age_value_type": "days","password_acceptable_characters": {"numbers": true,"lower_case": true, "upper_case": true, "unique_symbols": false, "special_characters": true }, "createdAt": "2022-03-14T06:23:06.000Z", "updatedAt": "2022-03-14T06:23:06.000Z" } }  
 */

router.get("/getProfileAuthenticationSettings", auth, validationErrorHandler, async (req, res) => {
  try {
    let org_id = req.user.organization;
    let data = await db.ProfileAuthenticationSettings.findOne({ where: { org_id } });
    const harvestAlertRes = await db.HarvestAlert.findOne({ where: { organization: org_id}})
    if (data == null || data == undefined) {
      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: error.NOT_FOUND,
        })
      );
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          profileAuthenticationSettings : data,
          harvestAlertSettings: harvestAlertRes

        },
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
});

/**
 * @swagger
 * /admin/updateProfileAuthenticationSettings:
 *   put:
 *     summary: API for updating profile authentication settings.
 *     description: API for updating profile authentication settings.
 *     tags: [Admin]
 *     requestBody:
 *       description: API for updating profile authentication settings
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accesstoken:
 *                  token: string
 *                refreshtoken:
 *                  otp: string
 *            example: { "success": true, "code": 200, "message": "Profile authentication settings has been updated successfully.", "data": { "id": 1, "auto_log_off_value": 31, "auto_log_off_value_type": "mins", "unsuccessful_login_attempts_value": 5, "unsuccessful_login_attempts_value_type": "per_hour", "unsuccessful_login_lockout_value": 30, "unsuccessful_login_lockout_value_type": "mins", "password_length": 8, "number_of_unique_passwords": 7, "maximum_password_age_value": 30, "maximum_password_age_value_type": "days", "password_acceptable_characters": { "numbers": true, "lower_case": true, "upper_case": true, "unique_symbols": false, "special_characters": true }, "createdAt": "2022-03-14T06:23:06.000Z", "updatedAt": "2022-03-14T17:09:45.000Z" } }
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
 */
router.put("/updateProfileAuthenticationSettings", auth, validationErrorHandler, async (req, res) => {
  try {
    const settings = req.body
    // update module permission
    let org_id = req.user.organization;
    let data = await db.ProfileAuthenticationSettings.findOne({ where: { org_id } });
    let set = { ...settings, org_id };
    if (data) {
      const result = await db.ProfileAuthenticationSettings.update(set,
        { where: { org_id } }
      );
    } else {
      // console.log(set);
      // return;
      await db.ProfileAuthenticationSettings.create(set)
    }
    data = await db.ProfileAuthenticationSettings.findOne({ where: { org_id } });
    if (data) {
      return res.json(
        successRespSync({
          msg: success.PROFILE_AUTHENTICATION_SETTINGS_UPDATED,
          data
        })
      );
    }
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
}
);

/**
 * @swagger
 * /admin/userCount/{userType}:
 *   get:
 *     summary: API for counting users of specific roles.
 *     description: API for counting users of specific roles.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userType
 *         required: false
 *         schema:
 *           type: string
 *         description: end_user | admin
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
 *                 example: { "success": true, "code": 200, "message": "User count fetched successfully.", "data": { "userCount": 64 } }  
 */

router.get("/userCount/:userType", auth, validationErrorHandler, async (req, res) => {
  try {
    let userType = req.params.userType
    let userCount = 0
    const { organization, subOrgId } = req.user;
       // check if user has access to admin panel or not
       let adminRoles = []
       adminRoles = await db.Roles.findAll({
        attributes: ["id"],
        where: {
          id: { [Op.not]: "end_user" },
        },
      });
      adminRoles = adminRoles.map((ar) => ar.id);

    if (userType) {

        if (userType == "all_users") {
        userCount = await db.user.count({
          where : { 
            organization,
            subOrganizationId: subOrgId || null,
            // userType: {
            //   [Op.or]: {
            //     [Op.is]: null,
            //     [Op.notIn]: ["offline", "offline_technician"]
            //   }
            // },
           },
           distinct: true,
        });
        console.log(userCount)
      }

      else if (userType == "end_user") {
        let rawRes = await db.sequelize.query(`
          SELECT COUNT(u.id) AS userCount
          FROM users AS u
          LEFT JOIN admin_user_roles AS aur ON u.id = aur.user_id
          WHERE aur.user_id IS NULL 
            AND u.organization = ${organization} 
            AND u.subOrganizationId ${subOrgId ? `= ${subOrgId}` : 'IS NULL'}
            AND (u.userType != 'offline' OR u.userType IS NULL) ;`, {
          type: db.sequelize.QueryTypes.SELECT,
        });
        userCount = rawRes && rawRes[0].userCount;
        console.log(userCount)
      } else if (userType == "admin") {
        userCount = await db.AdminUserRoles.count({
          include: [
            {
              required: true,
              model: db.user,
              as: 'user_role',
              where: { organization, subOrganizationId: subOrgId || null },
            },
          ],
          where: { role_id: { [Op.not]: ['end_user', 'super_admin'] } },
          // where: { role_id: ['community_admin', 'content_manager', 'manager'] },
        });
      } else if (req.params.userType == 'offline_user' ) {
        let query = {
          where: { 
            userType: {
              [Sequelize.Op.or]: [
                { [Sequelize.Op.like]: '%offline%' },
                // { [Sequelize.Op.like]: 'cacao_warehouse%' },
              ]
            },
            organization,
            subOrganizationId: subOrgId || null
          },
          order: [["createdAt", "DESC"]],
        }
        userCount = await db.user.count({ ...query });
      } else {
        throw new Error("Invalid userType")
      }
      return res.json(
        successRespSync({
          msg: success.USERCOUNT_FETCH_SUCCESS,
          data: {
            userCount
          }
        })
      );
    } else {
      throw new Error("Missing userType")
    }


  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

/**
 * @swagger
 * /admin/roles:
 *   get:
 *     summary: API for getting roles.
 *     description: API for getting roles.
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
 *                 example: { "success": true, "code": 200, "message": "Roles fetched successfully", "data": { "rolesRows": [ { "id": "community_admin", "name": "Community Admin", "role_type": null, "createdAt": "2022-03-14T06:16:34.000Z", "updatedAt": "2022-03-14T06:16:34.000Z" }, { "id": "content_manager", "name": "Content Manager", "role_type": null, "createdAt": "2022-03-14T06:16:34.000Z", "updatedAt": "2022-03-14T06:16:34.000Z" }, { "id": "manager", "name": "Manager", "role_type": null, "createdAt": "2022-03-14T06:16:34.000Z", "updatedAt": "2022-03-14T06:16:34.000Z" } ] } }
 */

router.get("/roles", auth, validationErrorHandler, translation, async (req, res) => {
  try {
    let userId = req.user.id
    let userData = await db.user.findOne({
      raw: true,
      where: {
        id: userId
      }
    })
    let organization = userData.organization
    let {
      page,
      limit,
      searchPhrase,
      orderField,
      order
    } = req.query;

    let listRes = [], query = {}
    query.where = {
      [Op.not]: {
        id: "super_admin",
        role_type: "app_user"
      },
      organization,
      subOrgId: req.user.subOrgId || null
    }

    if (orderField && order) {
      query.order = [[orderField, order]]
    } else {
      query.order = [["name", "ASC"]]
    }
    if (searchPhrase) {
      query.where = {
        [Op.or]: [
          { "name": { [Op.like]: `%${searchPhrase}%` } },
          { "description": { [Op.like]: `%${searchPhrase}%` } },
        ]
      }
    }
    if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    listRes = await db.Roles.findAndCountAll(query)
    // default parent role as sub orgs dont have their own roles yet
  
    if((req.user.organization = process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154) || (req.user.organization ==  process.env.INDONESIA_PT_EXPORTER_ID || 228)) {
      listRes.rows.push({
        id: "indonesia_admin",
        name: "Admin Role"
      })
    }
    if (req.headers.lang && req.headers.lang != 'en') {
      listRes = req.translateFunction(listRes, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      })
    }
    return res.json(
      successRespSync({
        msg: "Roles fetched successfully",
        data: {
          listRes
        }
      })
    );

  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

router.post(
  '/roles',
  auth,
  rolePostValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { roleName, description, roleType } = req.body;
      const transaction = await db.sequelize.transaction();

      const userId = req.user.id
      const userData = await db.user.findOne({
        attributes: ['organization'],
        include: [
          {
            model: db.Roles,
            as: "user_role_assoc",
            through: { model: db.AdminUserRoles, attributes: [] },
            attributes: ["id", "name"],
          },
        ],
        where: {
          id: userId
        },
        raw: true
      })

      if (userData && !userData.organization) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Logged in user is not associated to any organization.',
          })
        );
      }

      const isRoleNameExists = await db.Roles.count({
        where: {
          name: roleName,
          organization: userData.organization
        }
      })
      if (isRoleNameExists > 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: `Role already exists with name ${roleName}`,
          })
        )
      }

      let count = await db.Roles.count({
        where: {
          name: roleName
        }
      })
      let roleId = ''
      if (count > 0) {
        roleId = roleName.split(' ').join('_').toLowerCase() + '_' + (count + 1)
      } else {
        roleId = roleName.split(' ').join('_').toLowerCase()
      }

      try {
        const uniqueRoleId = uuidv4();
        let rolesRows = await db.Roles.create(
          {
            id: uniqueRoleId,
            name: roleName,
            role_type: roleType || 'admin',
            description,
            organization: userData.organization,
            subOrgId: req.user.subOrgId || null
          },
          { transaction }
        );
        await db.ParentModules.create(
          {
            id: uniqueRoleId,
            name: roleName,
            module_type: 'admin',
          },
          { transaction }
        );

        let currentUserRole = userData['user_role_assoc.id']
        let modules = await db.Modules.findAll({
          raw: true,
          nest: true,
          where: {
            parent_module_id: currentUserRole
          },
        });

        let newModules = []
        if(roleType == "manager" || roleType == "support_admin") {
          newModules.push({
            id: uniqueRoleId + '_tickets',
            name: 'Tickets',
            parent_module_id: uniqueRoleId,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          modules = newModules
        } else {
            newModules = modules.map(item => ({
            ...item,
            id: item.id.replace(currentUserRole, uniqueRoleId),
            parent_module_id: item.parent_module_id.replace(currentUserRole, uniqueRoleId),
            createdAt: new Date(),
            updatedAt: new Date()
          }))

        }


        await db.Modules.bulkCreate(newModules, {
          transaction,
        });

        const permission = await db.Permissions.findAll({ raw: true });

        const adminModulePermissions = modules.reduce(
          (previousValue, { id: module_id }) => {
            const moduleAndPermissions = permission.map(
              ({ id: permission_id }) => {
                const id = uuidv4();
                // const id = `${rolesRows.id}_${module_id}_${permission_id}`;
                return {
                  id: module_id.replace(currentUserRole, uniqueRoleId) + permission_id,
                  role_id: uniqueRoleId,
                  module_id: module_id.replace(currentUserRole, uniqueRoleId),
                  permission_id,
                  createdAt: moment.utc(),
                  updatedAt: moment.utc(),
                };
              }
            );
            return [...previousValue, ...moduleAndPermissions];
          },
          []
        );

        await db.AdminUsersRolesModulesPermissions.bulkCreate(adminModulePermissions, {
          transaction,
        });

        await transaction.commit();

        return res.json(
          successRespSync({
            msg: 'Roles created successfully',
            data: {
              rolesRows,
            },
          })
        );
      } catch (err) {
        await transaction?.rollback();
        return serverError(res, err);
      }
    } catch (err) {
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg:
            err?.original?.code == 'ER_DUP_ENTRY'
              ? error.ALREADY_EXISTS
              : error.SERVER,
        })
      );
    }
  }
);

router.put("/roles/:id", auth, rolePostValidation(), validationErrorHandler, async (req, res) => {
  try {
    const { roleName, description } = req.body
    let rolesRows = await db.Roles.findOne({
      where: {
        id: req.params.id
      }
    })
    if (rolesRows) {
      await rolesRows.update({
        name: roleName,
        description
      })
    } else {
      return res.json(await errorResp({
        code: error.code.FORBIDDEN,
        msg: error.DOESNT_EXISTS
      }))
    }
    return res.json(
      successRespSync({
        msg: "Roles updated successfully",
        data: {
          rolesRows
        }
      })
    );

  } catch (err) {
    return res.json(await errorResp({
      code: err?.original?.code || 500,
      msg: err?.original?.code == 'ER_DUP_ENTRY' ? error.ALREADY_EXISTS : error.SERVER
    }))
  }
})
router.delete("/roles/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    let userRolesRes = []
    userRolesRes = await db.AdminUserRoles.findAll({
      where: {
        role_id: id
      }
    })
    if (userRolesRes.length > 0) {
      return res.json(await errorResp({
        code: error.code.FORBIDDEN,
        msg: error.USER_ROLE_EXISTS,
      }))
    } else {
      await db.AdminUsersRolesModulesPermissions.destroy({
        where: {
          role_id: id
        }
      })
      await db.Modules.destroy({
        where: {
          parent_module_id: id
        }
      })
      await db.ParentModules.destroy({
        where: {
          id
        }
      })
      await db.Roles.destroy({
        where: {
          id
        }
      })
      return res.json(
        successRespSync({
          msg: "Roles deleted successfully"
        })
      );
    }


  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

/**
 * @swagger
 * /admin/departments:
 *   get:
 *     summary: API for getting Departments.
 *     description: API for getting Departments.
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
 *                 example: { "success": true, "code": 200, "message": "Departments fetched successfully", "data": { "deptRows": [ { "id": "1", "name": "test_dep", "createdAt": "2022-03-14T06:18:21.000Z", "updatedAt": "2022-03-14T06:18:21.000Z" } ] } }
 */

router.get("/departments", auth, validationErrorHandler, translation, async (req, res) => {
  try {
    let deptRows = await db.Departments.findAll({})
    if (req.headers.lang && req.headers.lang != 'en') {
      deptRows = req.translateFunction(deptRows, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      })
    }
    return res.json(
      successRespSync({
        msg: "Departments fetched successfully",
        data: {
          deptRows
        }
      })
    );

  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: API for getting Logs.
 *     description: API for getting Logs.
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ "activity_log_2022-03-23.log" ] }
 */

router.get('/logs', auth, function (req, res) {

  try {
    fs.readdir(logsPath, (err, files) => {
      if (err) {
        throw err
      }
      //   res.status(HttpStatusCodes.OK).send(files)
      files = files.filter(file => file.includes("activity_log"))
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: files,
        })
      );
    })
  } catch (e) {

    return res.json(errorRespSync(e));
  }
})

/**
 * @swagger
 * /admin/logs/{startDate}/{endDate}:
 *   get:
 *     summary: API for getting Logs.
 *     description: API for getting Logs.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: logFileName
 *         required: false
 *         schema:
 *           type: string
 *         description: activity_log_2022-03-23.log
 *       - in: query
 *         name: user
 *         required: false
 *         schema:
 *           type: enum('app_user','admin')
 *         description: logs of user or admin
 *       - in: query
 *         name: role
 *         required: false
 *         schema:
 *           type: string
 *         description: admin role or user memmbership id
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
 *                 example:  
 */

router.get('/logs/:startDate/:endDate', auth, async function (req, res) {
  try {
    const { user = 'app_user', role, searchPhrase = "", page = 0, limit = 0, org_id } = req.query;
    const count = { admin: 0, appUser: 0 };
    const date1 = new Date(req.params.startDate).getTime();
    const date2 = new Date(req.params.endDate).getTime();
    const dateDiff = date2 - date1;
    const daydiff = dateDiff / (1000 * 60 * 60 * 24);
    if (daydiff < 1) {
      return res.json({
        success: false,
        code: error.code.BAD_REQUEST,
        message: error.ACTIVITY_LOG_ONE_DAY,
      });
    };
    if (daydiff > 91) {
      return res.json({
        success: false,
        code: error.code.BAD_REQUEST,
        message: error.ACTIVITY_LOG_THREE_MONTH,
      });
    }
    if (!org_id) {
      return res.json({
        success: false,
        code: error.code.BAD_REQUEST,
        message: error.ORGANIZATION_CODE_DOESNOT_EXIST,
      });
    }

    const dates = getDates(new Date(req.params.startDate), new Date(req.params.endDate))
    let responseArray = [], response = {
      userLogs: [],
      adminDataLogs: []
    };
    dates.forEach(function (date) {
      responseArray = responseArray.concat(getFilesData(date, org_id));
    })
    let offset = responseArray.length - 1;
    let arrayLimit = 1;
    if (page !== 0 && limit !== 0) {
      offset = offset - ((page) * limit);
      if (limit <= ((responseArray.length - 1) / 2)) {
        arrayLimit = offset - (limit) + 1;
      }
    }
    for (let i = offset; i >= arrayLimit; i = i - 1) {
      let data = responseArray[i];

      switch (true) {
        case data.roleType.includes('app_user'):
          {
            if (searchPhrase != '' && data.role.length) {
              // filter by membership type and searchphrase for user data
              if (data.role[0].includes(searchPhrase) && 
              (data.membership.length && data.membership.includes(role.label) )) {
                response.userLogs.push(data);
                  count.appUser++;
              }
            }
            if (searchPhrase == '') {
              response.userLogs.push(data);
                count.appUser++;
            }
        

          }
          break;
        case data.roleType.includes('admin'): {
          if (searchPhrase != '' && data.role.length) {
          // filter by role  and searchphrase for user data
            if (data.role[0].includes(searchPhrase) && 
            (data.role.length && data.role.includes(role) )) {
              response.adminDataLogs.push(data);
              count.admin++;
            }
          }
          if (searchPhrase == '') {
            response.adminDataLogs.push(data);
            count.admin++;
          }
        }
          break;
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { count, response },
      })
    );
  } catch (e) {

    if (e && typeof e == 'object') {
      console.log(e);
      return res.json({
        success: false,
        code: error.code.NOT_FOUND,
        message: error.LOG_DOESNT_EXIST,
      });
    } else {
      return res.json(errorRespSync(e.Error));
    }
  }
})

function getFilesData(date, org_id) {
  let responseArray = [], filePath = `${logsPath}/${date}_activity_log.log`;
  if (fs.existsSync(filePath)) {
    let logs = fs.readFileSync(filePath, 'utf-8')
    logs = logs.split(/\r?\n/);
    logs.filter(text => {
      if (text.includes('auth')) {
        let splitedData = text.split('auth -')[1]
        if (splitedData) {
          splitedData = JSON.parse(splitedData);
          splitedData.time = moment(splitedData.UTCTimeStamp).format("YYYY-MM-DD hh:mm:ss")
          if (splitedData.org_id == org_id)
            responseArray.push(splitedData)
        }
      }
    });
  }
  return responseArray;
}

// Returns an array of dates between the two dates
function getDates(startDate, endDate) {
  const dates = []
  let currentDate = startDate
  const addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return (date)
  }
  while (currentDate <= endDate) {
    dates.push(moment(currentDate).format('YYYY-MM-DD'))
    currentDate = addDays.call(currentDate, 1)
  }
  return dates
}

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

/**
 * @swagger
 * /admin/global-setting:
 *   get:
 *     summary: fetch global settings.
 *     description: API for fetching global settings.
 *     tags: [Global Setting]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "globalSetting": { "currencyId": 3, "codeActivationTimeQty": 2, "codeActivationTimeUom": "days", "currency": { "id": 3, "symbol": "$", "abbreviation": "USD", "name": "United States dollar" } } } }
 */
router.get('/global-setting', auth, async function (req, res) {
  try {
    let org_id = req.user.organization;
    const globalSetting = await db.GlobalSetting.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id'],
        include: ['largeFarm'] // Include largeFarm in the attributes
      },
      include: [
        {
          model: db.Currency,
          as: 'currency',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: db.UnitsList,
          as: "areaUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
        {
          model: db.UnitsList,
          as: "weightUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
        {
          model: db.FarmSizeRange,
          as: "smallFarm",
          attributes: ["id", "from", "to", "isInclusive"],
        },
        {
          model: db.FarmSizeRange,
          as: "mediumFarm",
          attributes: ["id", "from", "to", "isInclusive"],
        },
      ],
      where: { org_id }
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { globalSetting },
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});


/**
 * @swagger
 * /admin/global-setting:
 *   put:
 *     summary: update global settings.
 *     description: update global settings.
 *     tags: [Global Setting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                currencyId:
 *                  type: integer
 *                codeActivationTimeQty:
 *                  type: integer
 *                codeActivationTimeUom:
 *                  type: string
 *            example: { "currencyId": 3, "codeActivationTimeQty": 2, "codeActivationTimeUom": "days" }
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "globalSetting": { "currencyId": 2, "codeActivationTimeQty": 1, "codeActivationTimeUom": "days" } } }
 */
router.put('/global-setting', auth, async function (req, res) {
  try {
    const {
      currencyId,
      codeActivationTimeQty,
      codeActivationTimeUom,
      areaUnitId,
      weightUnitId,
      largeFarm,
      smallFarm,
      mediumFarm
    } = req.body;

    let org_id = req.user.organization;
    let globalSetting = await db.GlobalSetting.findOne({ where: { org_id } });
    let set = {
      org_id,
      currencyId,
      codeActivationTimeQty,
      codeActivationTimeUom,
      areaUnitId,
      weightUnitId,
      largeFarm
    };

    if (globalSetting) {
      await globalSetting.set(set).save();

      // Update or create smallFarm
      if (smallFarm) {
        let smallFarmRange = await db.FarmSizeRange.findOne({
          where: { id: globalSetting.smallFarmId }
        });
        if (smallFarmRange) {
          await smallFarmRange.set(smallFarm).save();
        } else {
          let newSmallFarmRange = await db.FarmSizeRange.create({ ...smallFarm, globalSettingId: globalSetting.id });
          await globalSetting.set({ smallFarmId: newSmallFarmRange.id }).save();
        }
      }

      // Update or create mediumFarm
      if (mediumFarm) {
        let mediumFarmRange = await db.FarmSizeRange.findOne({
          where: { id: globalSetting.mediumFarmId }
        });
        if (mediumFarmRange) {
          await mediumFarmRange.set(mediumFarm).save();
        } else {
          let newMediumFarmRange = await db.FarmSizeRange.create({ ...mediumFarm, globalSettingId: globalSetting.id });
          await globalSetting.set({ mediumFarmId: newMediumFarmRange.id }).save();
        }
      }
    } else {
      globalSetting = await db.GlobalSetting.create(set);

      // Create smallFarm
      if (smallFarm) {
        let newSmallFarmRange = await db.FarmSizeRange.create({ ...smallFarm, globalSettingId: globalSetting.id });
        await globalSetting.set({ smallFarmId: newSmallFarmRange.id }).save();
      }

      // Create mediumFarm
      if (mediumFarm) {
        let newMediumFarmRange = await db.FarmSizeRange.create({ ...mediumFarm, globalSettingId: globalSetting.id });
        await globalSetting.set({ mediumFarmId: newMediumFarmRange.id }).save();
      }
    }

    globalSetting = await db.GlobalSetting.findOne({
      where: { org_id },
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Currency,
          as: 'currency',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: db.UnitsList,
          as: 'areaUnit',
          attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
        },
        {
          model: db.UnitsList,
          as: 'weightUnit',
          attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
        },
        {
          model: db.FarmSizeRange,
          as: 'smallFarm',
          attributes: ['from', 'to', 'isInclusive'],
        },
        {
          model: db.FarmSizeRange,
          as: 'mediumFarm',
          attributes: ['from', 'to', 'isInclusive'],
        }
      ]
    });

    return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { globalSetting },
        })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /admin/app-user/{id}:
 *   put:
 *     summary: API to update app user details.
 *     description: API to update app user details.
 *     tags: [Admin]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: app user id
 *        schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - firstName
 *                - lastName
 *                - countryCode
 *                - mobile
 *                - country
 *                - state
 *                - city
 *                - membershipTypeId
 *              properties:
 *                email:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                countryCode:
 *                  type: string
 *                mobile:
 *                  type: string
 *                country:
 *                  type: integer
 *                state:
 *                  type: integer
 *                village:
 *                  type: string
 *                membershipTypeId:
 *                  type: integer
 *                membershipExtendedDays:
 *                  type: integer
 *                membershipExtensionReason:
 *                  type: string
 *            example:
 *              { "firstName": "hemant", "lastName": "rathore", "email": "hemant@dimitra.io", "countryCode": "91", "mobile": "7830619119", "country": "india", "state": "uk", "city": "ddn", "membershipTypeId": 7, "membershipExtendedDays": 2, "membershipExtensionReason": "some reason", "userTribe": "tribe name", "website": "website string", "address": "address string" }
 *     responses:
 *        '200':
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
 *               example: { "success": true, "code": 200, "message": "Updated successfully.", "data": {} } 
 */
router.put(
  '/app-user/:user_id',
  auth,
  appUserValidator.appUserValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { user_id } = req.params;
      const { id: membershipExtendedBy } = req.user;
      let {
        userTribe,
        website,
        firstName,
        middleName,
        lastName,
        email,
        city,
        countryCode,
        mobile,
        country,
        state,
        village,
        district,
        address,
        status: active,
        membershipTypeId: membership_type,
        membershipExtendedDays,
        membershipExtensionReason,
        isMarketPlaceUser
      } = req.body;
      let userExists = false, existsArr = []
      membership_type = JSON.parse(membership_type)

      
      let activationExists = false
      activationExists =  await db.activationKeys.findOne({
        where: { user_id, is_deleted: 0 }
      })
      if(!activationExists) {
        let key = shortid.generate();


        const packageDurationUnit = membership_type.membership_duration_unit.split("(")[0];
        const packageDurationNumber = membership_type.membership_duration;
        const activationKeyActivatedAt = new Date();
        let packegeExpiryDate = "";

        if (packageDurationUnit == 'month') {
          packegeExpiryDate = addMonths(packageDurationNumber, activationKeyActivatedAt);
        } else if (packageDurationUnit == 'week') {
          packegeExpiryDate = addWeeks(packageDurationNumber, activationKeyActivatedAt)
        } else if (packageDurationUnit == 'year') {
          packegeExpiryDate = addYears(packageDurationNumber, activationKeyActivatedAt)
        } else if (packageDurationUnit == 'day') {
          packegeExpiryDate = adddays(packageDurationNumber, activationKeyActivatedAt)
        }

        const activationKeyObj = {
          license_key: key,
          membership_type: membership_type.id,
          user_id,
          status: "assigned",
          membershipValidity: packegeExpiryDate,
          org_id: req.user.organization
        }

       let activationRes = await db.activationKeys.create(activationKeyObj)
      }

      let userEmailExists = []
      if(email)
       {
         userEmailExists = await db.user.findAll({  where: {
            email,
            app_type: process.env.APP_ORIGIN_TYPE || "connected_farmer"
           }
         })
       }

      let userMobileExists = []
      if(mobile) {

        userMobileExists = await db.user.findAll({  where: {
           mobile,
           app_type: process.env.APP_ORIGIN_TYPE || "connected_farmer"
          }
        })
      }

      existsArr = [...userEmailExists, ...userMobileExists]
      existsArr.forEach(el => {
        if(el.id != user_id) {
          userExists = true
        }
      })

      // TODO need to enable this later after we handle duplicate email in user bulk upload
      // if(userExists) {
      //   return res.json(
      //     await errorResp({
      //       code: success.code.OK,
      //       msg: error.USER_EXIST_ALREADY,
      //     })
      //   );
      // }
          
      var transaction = await db.sequelize.transaction();

      const setUser = {
        firstName,
        middleName,
        lastName,
        email,
        countryCode,
        mobile,
        countryId: country,
        stateId: state,
        district,
        city,
        village,
        userTribe,
        website,
        active,
        address
      };
      const setMembership = {
        membershipExtendedBy,
        membership_type: membership_type.id,
        membershipExtendedDays,
        membershipExtensionReason,
      };
      await Promise.all([
        db.user.update(setUser, { where: { id: user_id }, transaction }),
        db.activationKeys.update(setMembership, {
          where: { user_id },
          transaction,
        }),
        db.UserMembershipMap.update({membership_id:  membership_type.id}, {where: {user_id}, transaction})
      ]);

      await transaction.commit();
      if(isMarketPlaceUser) {
        await syncMarketPlaceUserData({...setUser,id: user_id, type: 'updateAppUser',});
      }
      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: {},
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /admin/app-user/status/{user_id}:
 *   put:
 *     summary: API for updating user status.
 *     description: API for updating user status.
 *     tags: [Admin]
 *     requestBody:
 *       description: API for updating user status. The value of status will be either 1 or 0
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"status":1}
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
 *                 example: {"success": true,"code": 200, "message": "User status updated","data": {}} 
 */

router.put(
  '/app-user/status/:user_id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { user_id } = req.params;

      const {
        status: active,
      } = req.body;
      let data = await db.user.update({ active, email: null, mobile: null }, { where: { id: user_id } })
      return res.json(
        successRespSync({
          msg: "User status updated",
          data
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/getPermittedActionsData/:moduleId',
  auth,
  async (req, res) => {
    try {
      const { moduleId } = req.params;
      const { role_id: roleId } = req.user.userRoles[0]
      

      let whereParamArr = []
      whereParamArr = req.user.userRoles.map(rol => `${rol.role_id}_${moduleId.replace('__', '/')}`)

      const modulePermissions = await db.AdminUsersRolesModulesPermissions.findAll({
        where: {
          module_id: whereParamArr
        },
        raw: true
      })
      const permittedActionsData = modulePermissions.reduce((prev, next) => {
        const type = next['permission_id']
        const isPermitted = next['permitted']
        let obj = {}
        obj[type] = isPermitted === 1
        return {
          ...prev,
          ...obj
        }
      }, {})
      return res.json(
        successRespSync({
          msg: "Module actions permissions fetched.",
          data: permittedActionsData
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get('/yieldUnits', auth, translation, async(req,res) => {
  const unitType = "harvesting-yield-household-consumption"
  let query = {
    include: [
      {
        model: db.UnitsList,
        as: 'units',
      },
    ],
  };
  
  query.where = { name: unitType };
  const units = await db.UnitTypes.findAll(query);
  if (req.headers.lang && req.headers.lang != 'en') {
    req.translateFunction(units, globalTranslationCache, {
      moduleName: 'unit',
      lvl1: false,
      lvl2: true,
    });
  }
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: units,
    })
  );
})

router.get('/areaUnits', auth, translation, async(req,res) => {
  const unitType = "Area"
  let query = {
    include: [
      {
        model: db.UnitsList,
        as: 'units',
      },
    ],
  };
  
  query.where = { name: unitType };
  const units = await db.UnitTypes.findAll(query);
  if (req.headers.lang && req.headers.lang != 'en') {
    req.translateFunction(units, globalTranslationCache, {
      moduleName: 'unit',
      lvl1: false,
      lvl2: true,
    });
  }
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: units,
    })
  );
})

router.get('/weightUnits', auth, translation, async(req,res) => {
  const unitType = "Weight"
  let query = {
    include: [
      {
        model: db.UnitsList,
        as: 'units',
      },
    ],
  };
  
  query.where = { name: unitType };
  const units = await db.UnitTypes.findAll(query);
  if (req.headers.lang && req.headers.lang != 'en') {
    req.translateFunction(units, globalTranslationCache, {
      moduleName: 'unit',
      lvl1: false,
      lvl2: true,
    });
  }
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: units,
    })
  );
})

router.get('/getSideBarData',
  auth,
  translation,
  async (req, res) => {
    try {
      const userData = req.user
      let sidebarRes = await db.SidebarMenu.findAll({
        attributes: [
          'id',
          'name',
          'route_path_name',
          'icon',
          'order',
          'active'
        ],
        where: {
          active: 1,
          parent_menu_id: null,
          organization: userData.organization
        },
        raw: true
      });
      let subMenus = await db.SidebarMenu.findAll({
        attributes: [
          'id',
          'name',
          'route_path_name',
          'parent_menu_id',
          'icon',
          'order',
          ['name', 'label']
        ],
        where: {
          active: 1,
          parent_menu_id: {
            [Op.not]: null
          },
          organization: userData.organization
        },
        raw: true
      });

      let sidebarResFinal = sidebarRes.map(item => {
        subMenus.forEach(subMenu => {
          if (subMenu.parent_menu_id === item.id) {
            if ('subMenu' in item) {
              item.subMenu.push(subMenu)
            } else {
              item.subMenu = []
              item.subMenu.push(subMenu)
            }
          }
        })
        return item
      })

      // check if user has access to admin panel or not
      const adminRoles = await db.Roles.findAll({
        attributes: ["id"],
        where: {
          id: { [Op.not]: "end_user" },
        },
      })
      const hasAdminRoles = userData.userRoles.filter((item) =>
        adminRoles.some((role) => role.id === item.role_id)
      );

      const roleIds = hasAdminRoles.map(role => role.role_id);
      // Generate sidebar IDs for each role
      let sidebarIds = [];
      roleIds.forEach(roleId => {
        sidebarIds = sidebarIds.concat(sidebarRes.map(s => roleId + '_' + s.id));
        subMenus.forEach(s => sidebarIds.push(roleId + '_' + s.id));
      });

      let sidebarModuleRolePermissions = await db.AdminUsersRolesModulesPermissions.findAll({
        where: {
          module_id: sidebarIds
        },
        raw: true
      })


      let permittedModules = []

      if (sidebarModuleRolePermissions && sidebarModuleRolePermissions.length > 0) {
        permittedModules = sidebarModuleRolePermissions.filter(smr => {
          if (smr.permission_id == "get" && smr.permitted == 1) {
            return smr.module_id
          }
        }).map(smr => smr.module_id);
      }

      let permittedSidebarRes = sidebarResFinal.filter(item => {
        if ('subMenu' in item) {
          for (let i = item.subMenu.length - 1; i >= 0; i--) {
            let permitted =  roleIds.some(roleId => 
              permittedModules.some(p => p === (roleId + '_' + item.subMenu[i].id))
            );
            if (!permitted) {
              item.subMenu.splice(i, 1)
            }
          }
          if (item.subMenu.length > 0) {
            return true
          }
          return false
        } else {
          return roleIds.some(roleId => 
            permittedModules.some(p => p === (roleId + '_' + item.id))
          );
        }
      })
      permittedSidebarRes.sort(compare)
      
      // Check if user is from Kenya/NACCU organization and update menu names accordingly
      // Using the same logic as frontend isKenyaClient() function
      const orgDetails = await db.Organization.findOne({
        where: { id: userData.organization },
        attributes: ['id', 'name']
      });
      
      const isKenyaOrg = orgDetails && orgDetails.name === 'National Coffee Cooperative Union';
      
      if (isKenyaOrg) {
        // Update menu names for NACCU users - ONLY for buying_station_coffee (Coffee Overview)
        // Keep original buying_station (Member Data) unchanged
        permittedSidebarRes.forEach(item => {
          if (item.subMenu && item.subMenu.length > 0) {
            item.subMenu.forEach(subItem => {
              // Only update buying_station_coffee menu item (under Coffee Overview)
              // Keep original buying_station (Member Data) unchanged
              if (subItem.id === 'buying_station_coffee') {
                subItem.name = 'Affiliates';
                subItem.sidebar_menu_name = 'Affiliates';
              }
            });
          }
        });
      }
      
      if (req.headers.lang && req.headers.lang != 'en') {
        permittedSidebarRes = req.translateFunction(
          permittedSidebarRes,
          globalTranslationCache,
          { moduleName: 'sideBar', lvl1: true, lvl2: true, }
        );
      }
      res.json(
        await successResp({
          msg: 'Sidebar successfully fetched',
          data: permittedSidebarRes,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  })

router.get("/crop/list", auth, async (req, res) => {
  let orderBy = [["createdAt", "DESC"]];
  let query = {
    order: orderBy,
    attributes: ['id', 'region', 'name'],
    where: {
      region: {
        [Op.not]: null
      },
    }
  };
  const userFarmCrops = await db.Option.findAndCountAll(query);
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: userFarmCrops,
    })
  );
})

router.get("/harvest/alert", auth, async (req, res) => {
  const { organization } = req.user;
  let query = {
    where: { organization },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: db.Option,
        as: 'crop',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: db.UnitsList,
        as: "unit",
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      },
    ],
  };
  const userFarmCrops = await db.HarvestAlert.findAll(query);
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: userFarmCrops,
    })
  );
})

router.post("/harvest/alert", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const {  cropId, country, alertAdmin, alertFarmer, maxAllowed, unitId } = req.body;
    const set = { cropId, country, alertAdmin, alertFarmer, maxAllowed, unitId, organization };
    const newAlert = await db.HarvestAlert.create(set);
    res.json(
      await successResp({
        msg: "Crop Harvest alert created successfully",
        data: newAlert,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

router.put("/harvest/alert/:id", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const { id } = req.params;
    const {  cropId, country, alertAdmin, alertFarmer, maxAllowed, unitId } = req.body;
    const set = { cropId, country, alertAdmin, alertFarmer, maxAllowed, unitId, organization };
    const newAlert = await db.HarvestAlert.update(set, { where: { id }});
    res.json(
      await successResp({
        msg: success.UPDATED,
        data: newAlert,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

router.delete("/harvest/alert/:id", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const { id } = req.params;
    const newAlert = await db.HarvestAlert.destroy({ where: { id }});
    res.json(
      await successResp({
        msg: success.UPDATED,
        data: newAlert,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
})

router.post("/proxy-image",auth,async function (req, res) {
    try {
      const { location } = req.body
      console.log(location, "loc")
      if(location) {
        const response = await axios.get(location, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'image/png',
          },
        });
        const base64Data = Buffer.from(response.data, 'binary').toString('base64');
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', 'attachment; filename=image.txt');
        res.send(base64Data);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

function addMonths(numOfMonths, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setMonth(date.getMonth() + numOfMonths);
  return returningDate;
}

function addWeeks(weeks, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + weeks * 7)
  return returningDate
}

function addYears(years, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setFullYear(date.getFullYear() + years)
  return returningDate
}

function adddays(days, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + days)
  return returningDate
}

// get exporter details
router.get("/exporter/:email", auth, async (req, res) => {
  const { organization } = req.user;
  console.log(organization, "organization")
  const { email } = req.params;
  let where = {
    email,
    organization,
    active: 1,
    registrationUserType: {
      [Op.in]: ['ekspor', 'agent']
    }
  }

  const exporter = await db.user.findOne({ where }); // ekspor is the exporter in indonesian.
  if(exporter){
    res.json(successRespSync({
      msg: success.FETCH,
      data: exporter,
    }));
  } else {
    return res.status(404).json(errorRespSync({
      msg: error.FETCH,
      data: {},
    }));
  }
});


// Essential User Detail Endpoint
router.get('/user/:id/detail', auth, translation, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    let isUserExist = await db.user.findByPk(id);
    if (isUserExist == null) {
      throw error.USER_NOT_EXIST;
    }

    // Fetch user information with organization details
    let userDetail = await db.user.findOne({
      attributes: [
        'id',
        'firstName',
        'middleName',
        'lastName',
        'fullName',
        'email',
        'countryCode',
        'mobile',
        'profilePicUrl',
        'address',
        'country',
        'stateId',
        'city',
        'district',
        'village',
        'verified',
        'active',
        'userType',
        'registrationUserType',
        'buisnessName',
        'createdAt',
        'organization',
        'NoOfFarmsPlanningtoonboard',
      ],
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code', 'logo', 'status', 'country'],
          include: [
            {
              model: db.Product,
              as: 'products',
              attributes: ['id', 'name'],
              through: {
                attributes: []
              }
            }
          ]
        },
        {
          model: db.Organization,
          as: 'subOrg',
          attributes: ['id', 'name', 'logo'],
          where: {
            isSubOrganization: true
          },
          include: [
            {
              model: db.Product,
              as: 'products',
              attributes: ['id', 'name'],
            }
          ]
        }
      ],
      where: { id },
    });

    if (!userDetail) {
      throw error.USER_NOT_EXIST;
    }

    // Get farm count and products list
    const [farmCount] = await Promise.all([
      db.user_farm.count({ where: { userId: id } }),
    ]);

    // Prepare response data
    const userData = JSON.parse(JSON.stringify(userDetail));
    
    // Structure the response with farms and products
    const responseData = {
      ...userData,
      userType: translateUserTypeFromIndonesian(userData.registrationUserType),
      products: userData.subOrg?.products?.map(product => product.name) || [],
      subOrg: userData.subOrg?.name || '',
      subOrgLogo: userData.subOrg?.logo || '',
      subOrgId: userData.subOrg?.id || '',
    };

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: responseData,
      })
    );

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Delete User Endpoint
router.delete('/user/:id', auth, translation, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    let userToDelete = await db.user.findByPk(id, {
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code']
        }
      ]
    });

    if (!userToDelete) {
      return res.json(
        errorRespSync({
          msg: error.USER_NOT_EXIST,
        })
      );
    }

    // Check if user is trying to delete themselves
    if (req.user.id == id) {
      return res.json(
        errorRespSync({
          msg: "You cannot delete your own account",
        })
      );
    }



    await db.user.update(
      { 
        active: false,
        deletedAt: new Date()
      },
      { where: { id } }
    );

    // Sync deletion to farmer service database
    try {
      await syncUserDeletion(id, userToDelete, false); // false = soft delete
    } catch (syncError) {
      console.error('Error syncing user deletion:', syncError);
      // Continue with deletion even if sync fails
    }

    // Log the deletion
    console.log(`User deleted: ${id}, Name: ${userToDelete.fullName}, Email: ${userToDelete.email}`);

    return res.json(
      successRespSync({
        msg: "User deleted successfully",
        data: {
          deletedUserId: id,
          deletedUserName: userToDelete.fullName,
          deletedUserEmail: userToDelete.email,
        }
      })
    );

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Hard Delete User Endpoint (for admin use only)
router.delete('/user/:id/hard', auth, translation, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    let userToDelete = await db.user.findByPk(id, {
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code']
        }
      ]
    });

    if (!userToDelete) {
      return res.json(
        errorRespSync({
          msg: error.USER_NOT_EXIST,
        })
      );
    }

    // Check if user is trying to delete themselves
    if (req.user.id == id) {
      return res.json(
        errorRespSync({
          msg: "You cannot delete your own account",
        })
      );
    }

    // Get related data count before deletion
    const [farmCount, equipmentCount, buyingStationOrders] = await Promise.all([
      db.user_farm.count({ where: { userId: id } }),
      db.Equipment.count({ where: { userID: id } }),
      db.BuyingStationOrder.count({ where: { farmerId: id } })
    ]);

    // Delete related data first (cascade delete)
    await Promise.all([
      db.user_farm.destroy({ where: { userId: id } }),
      db.Equipment.destroy({ where: { userID: id } }),
      db.UserMembershipMap.destroy({ where: { user_id: id } }),
      db.UserRoles.destroy({ where: { user_id: id } }),
      db.UserDepartment.destroy({ where: { user_id: id } })
    ]);

    // Hard delete the user
    await db.user.destroy({ where: { id } });

    // Sync deletion to farmer service database
    try {
      await syncUserDeletion(id, userToDelete.org, true); // true = hard delete
    } catch (syncError) {
      console.error('Error syncing user deletion:', syncError);
      // Continue with deletion even if sync fails
    }

    // Log the deletion
    console.log(`User hard deleted: ${id}, Name: ${userToDelete.fullName}, Email: ${userToDelete.email}`);

    return res.json(
      successRespSync({
        msg: "User permanently deleted successfully",
        data: {
          deletedUserId: id,
          deletedUserName: userToDelete.fullName,
          deletedUserEmail: userToDelete.email,
          organizationId: userToDelete.organization,
          organizationName: userToDelete.org?.name,
          deletedRelatedData: {
            farms: farmCount,
            equipment: equipmentCount,
            buyingStationOrders: buyingStationOrders
          }
        }
      })
    );

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Activate/Deactivate User Endpoint
router.patch('/user/:id/status/:action', auth, translation, async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.params; // 'activate' or 'deactivate'

    // Validate action parameter
    if (!action || !['activate', 'deactivate'].includes(action.toLowerCase())) {
      return res.json(
        errorRespSync({
          msg: "Invalid action. Please provide 'activate' or 'deactivate'",
        })
      );
    }

    const isActivate = action.toLowerCase() === 'activate';
    const newActiveStatus = isActivate;

    // Check if user exists
    let userToUpdate = await db.user.findByPk(id, {
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code']
        }
      ]
    });

    if (!userToUpdate) {
      return res.json(
        errorRespSync({
          msg: error.USER_NOT_EXIST,
        })
      );
    }

    // Check if user is trying to modify their own account
    if (req.user.id == id) {
      return res.json(
        errorRespSync({
          msg: `You cannot ${action} your own account`,
        })
      );
    }

    // Update the user status
    await db.user.update(
      { 
        active: newActiveStatus,
        updatedAt: new Date()
      },
      { where: { id } }
    );

    // Sync status change to farmer service database
    try {
      if (isActivate) {
        await syncUserActivation(id, userToUpdate);
      } else {
        await syncUserDeactivation(id, userToUpdate);
      }
    } catch (syncError) {
      console.error(`Error syncing user ${action}:`, syncError);
      // Continue with status change even if sync fails
    }

    // Log the status change
    console.log(`User ${action}d: ${id}, Name: ${userToUpdate.fullName}, Email: ${userToUpdate.email}`);

    const actionText = isActivate ? 'activated' : 'deactivated';
    const userIdKey = isActivate ? 'activatedUserId' : 'deactivatedUserId';
    const userNameKey = isActivate ? 'activatedUserName' : 'deactivatedUserName';
    const userEmailKey = isActivate ? 'activatedUserEmail' : 'deactivatedUserEmail';

    return res.json(
      successRespSync({
        msg: `User ${actionText} successfully`,
        data: {
          [userIdKey]: id,
          [userNameKey]: userToUpdate.fullName,
          [userEmailKey]: userToUpdate.email,
          organizationId: userToUpdate.organization,
          organizationName: userToUpdate.org?.name,
          action: action,
          newStatus: newActiveStatus
        }
      })
    );

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Update User Endpoint
router.put('/user/:id', auth, translation, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if user exists
    let userToUpdate = await db.user.findByPk(id, {
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code']
        }
      ]
    });

    if (!userToUpdate) {
      return res.json(
        errorRespSync({
          msg: error.USER_NOT_EXIST,
        })
      );
    }

    // Remove sensitive fields that shouldn't be updated via this endpoint
    const allowedFields = [
      'firstName',
      'lastName',
      'mobile',
      'email',
      'address',
      'countryId',
      'stateId',
      'city',
      'district',
      'village',
      // extra allowed fields
      'NoOfFarmsPlanningtoonboard',
    ];

    const filteredUpdateData = {};
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        filteredUpdateData[key] = updateData[key];
      }
    });

    // Map incoming phoneNumber to user's mobile
    if (updateData.phoneNumber !== undefined) {
      filteredUpdateData.mobile = updateData.phoneNumber;
    }

    // Map organizationType to user's registrationUserType
    if (updateData.organizationType !== undefined && updateData.organizationType !== null) {
      filteredUpdateData.registrationUserType = String(updateData.organizationType).toLowerCase();
    }

    // Add updatedAt timestamp
    filteredUpdateData.updatedAt = new Date();

    // Update the user
    await db.user.update(filteredUpdateData, { where: { id } });

    // If organization fields are present, update the related organization (prefer subOrganization if available)
    const orgUpdate = {};
    if (updateData.organizationName !== undefined) {
      orgUpdate.name = updateData.organizationName;
    }
    if (updateData.organizationLogo !== undefined) {
      orgUpdate.logo = updateData.organizationLogo;
    }

    const hasOrgChanges = Object.keys(orgUpdate).length > 0;
    const hasProductChanges = Array.isArray(updateData.products) && updateData.products.length >= 0;

    if (hasOrgChanges || hasProductChanges) {
      const targetOrgId = userToUpdate.subOrganizationId || userToUpdate.organization;
      if (hasOrgChanges) {
        orgUpdate.updatedAt = new Date();
        await db.Organization.update(orgUpdate, { where: { id: targetOrgId } });
      }

      // Replace organization products if provided
      if (hasProductChanges) {
        const productNames = (updateData.products || []).map(p => typeof p === 'string' ? p : p?.name).filter(Boolean);
        await db.OrganizationProduct.destroy({ where: { organizationId: targetOrgId } });
        if (productNames.length) {
          await linkProductsToOrganization(productNames, id, targetOrgId);
        }
      }
    }

    // Sync update to farmer service database
    try {
      await syncUserUpdate(id, userToUpdate.organization, filteredUpdateData);
    } catch (syncError) {
      console.error('Error syncing user update:', syncError);
      // Continue with update even if sync fails
    }

    // Get updated user data
    const updatedUser = await db.user.findByPk(id, {
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code']
        }
      ]
    });

    // Log the update
    console.log(`User updated: ${id}, Name: ${updatedUser.fullName}, Email: ${updatedUser.email}`);

    return res.json(
      successRespSync({
        msg: "User updated successfully",
        data: {
          updatedUserId: id,
          updatedUser: updatedUser,
          organizationId: updatedUser.organization,
          organizationName: updatedUser.org?.name,
          updatedFields: Object.keys(filteredUpdateData)
        }
      })
    );

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Helper functions from registration logic
async function selectOrganizationCode(country) {
  let organizationCode = null
  let parentOrganizationId = null

  if (country && country.toLowerCase() === 'indonesia') {
     organizationCode = 'PT_Surveyor_Indonesia';
     parentOrganizationId = process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154;
  }else if(country && country.toLowerCase() == 'kenya'){
    organizationCode = 'naccu';
    parentOrganizationId = process.env.KENYA_NACCU_ORG_ID || 239;
  }
  return {
     organizationCode,
     parentOrganizationId
  };
}

async function selectOrganizationLogo(country) {
  let organizationLogo = null;
  if (country && country.toLowerCase() === 'indonesia') {
    organizationLogo = "https://dimitra-prod-public-images.s3.amazonaws.com/org/5NTz6wXYJefX6DwS1Yfb9N.png";
  } else if (country && country.toLowerCase() === 'kenya') {
    organizationLogo = "https://dimitra-pre-prod-public-images.s3.amazonaws.com/org/g5m6uSe9Ewk1zP6vetkzzy.png"; 
  } else {
    organizationLogo = "https://dimitra-prod-public-images.s3.amazonaws.com/org/5NTz6wXYJefX6DwS1Yfb9N.png";
  }
  return organizationLogo;
}

function generateOrganizationCode(organizationName, timeStamp) {
  let tmps = timeStamp +  Math.floor(Math.random() * 10);
  return `${organizationName.toLowerCase().replace(/\s+/g, '_')}_${tmps}`;
}

// Link products to organization in DB
async function linkProductsToOrganization(products, userId, organizationId) {
  if (!products || products.length === 0) return;
  const organizationProducts = [];

  for (const productName of products) {
    let product = await db.Product.findOne({ where: { name: productName } });
    if (!product) {
      product = await db.Product.create({
        name: productName,
        userId,
        organizationId,
        createdAt: moment.utc(),
        updatedAt: moment.utc(),
      });
    }
    organizationProducts.push({
      organizationId,
      product_id: product.id,
      createdAt: moment.utc(),
      updatedAt: moment.utc(),
    });
  }
  await db.OrganizationProduct.bulkCreate(organizationProducts);
}

// Determine roles based on organizationType
function getRolesForOrganizationType(country, orgType) {
  if (country && country.toLowerCase() === 'indonesia') {
    if (orgType.toLowerCase() === 'ekspor') {
      return ["dds_exporter"];
    }
    return ['supplier_owner', 'indonesia_admin'];
  }else if (country && country.toLowerCase() === 'kenya') {
    if (orgType.toLowerCase() === KENYA_WHO_ARE_YOU.agent) {
      return ["dds_exporter"];
    }
    return ['supplier_owner', KENYA_DDS_ROLES.naccu_kenya_admin];
  }
}

// Assign roles to user
async function assignRoles(userId, roles) {
  for (const role_id of roles) {
    await db.AdminUserRoles.upsert({
      id: `${userId}_${role_id}`,
      role_id,
      user_id: userId,
      createdAt: moment.utc(),
      updatedAt: moment.utc(),
    });
  }
}

// Create default membership permissions
async function createDefaultMembershipPermissions(user, parentOrgId, subOrgId) {
  try {
    const parentMembership = await db.Membership.findOne({
    where: {
      org_id: parentOrgId,
      membership_type: {
        [db.Sequelize.Op.like]: `%Default plan%`
      }
    },
  });

    // Create new membership for sub-organization
    const newMembership = await db.Membership.create({
      membership_type: "Default Plan",
      satellite_report: parentMembership.satellite_report,
      advanced_report: parentMembership.advanced_report,
      membership_duration: parentMembership.membership_duration,
      membership_duration_in_days: parentMembership.membership_duration_in_days,
      membership_duration_unit: parentMembership.membership_duration_unit,
      membership_fee: parentMembership.membership_fee,
      default_status: parentMembership.default_status,
      description: parentMembership.description,
      org_id: parentOrgId,
      plan_type: parentMembership.plan_type,
      feeUnitType: parentMembership.feeUnitType,
      allowed_users: parentMembership.allowed_users,
      allowed_farms: parentMembership.allowed_farms,
      advanceReportTypeUnit: parentMembership.advanceReportTypeUnit,
      advancedReportUnit: parentMembership.advancedReportUnit,
      satelliteReportTypeUnit: parentMembership.satelliteReportTypeUnit,
      deforestationReport: parentMembership.deforestationReport,
      deforestationReportTypeUnit: parentMembership.deforestationReportTypeUnit,
      deforestationReportUnit: parentMembership.deforestationReportUnit,
      basicFarmLevelReport: parentMembership.basicFarmLevelReport,
      advancedFarmLevelReport: parentMembership.advancedFarmLevelReport,
      largeAreaReport: parentMembership.largeAreaReport,
      subOrgId: subOrgId,
      createdAt: moment.utc(),
      updatedAt: moment.utc()
    });

    console.log(`Created new membership ${newMembership.id} for sub-org ${subOrgId}`);

    // create user role membership map
    await db.UserRoleMembershipMap.create({
      user_id: user.id,
      membership_id: newMembership.id,
      user_role_id: 'farmer',
      isDeleted: false,
      createdAt: moment.utc(),
      updatedAt: moment.utc()
    });

    // Get parent membership's permissions
    const parentPermissions = await db.UserRoleMembershipPermissions.findAll({
      where: {
        membership_plan_id: parentMembership.id
      }
    });

    // Create permissions for new membership
    const newPermissions = parentPermissions.map(permission => ({
      id: `${permission.user_role_id}_${newMembership.id}_${permission.module_id}_${permission.permission_id}`,
      user_role_id: permission.user_role_id,
      module_id: permission.module_id,
      membership_plan_id: newMembership.id,
      permission_id: permission.permission_id,
      permitted: permission.permitted,
      isdeleted: permission.isdeleted,
      createdAt: moment.utc(),
      updatedAt: moment.utc()
    }));

    if (newPermissions.length > 0) {
      await db.UserRoleMembershipPermissions.bulkCreate(newPermissions);
      console.log(`Created ${newPermissions.length} permissions for membership ${newMembership.id}`);
    }
    
    console.log(`Successfully completed creating default membership permissions for sub-org ${subOrgId}`);
    return newMembership
  } catch (error) {
    console.error('Error creating default membership permissions:', error);
    throw error;
  }
}

// Create User Endpoint for Co-orperative User
router.post('/user', auth, translation, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      country = 'Indonesia',
      organizationName,
      organizationLogo,
      products = ["coffee", "cacao"],
      NoOfFarmsPlanningtoonboard = 1,
      organizationType = 'koperasi',
      address,
      countryId,
      stateId,
      city,
      district,
      village,
      active = true
    } = req.body;

    let timeStamp = new Date().getTime();

    // Check if user already exists
    const existingUser = await db.user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "User with this email already exists"
      });
    }

    // Get organization details based on country (same as registration)
    const { parentOrganizationId, organizationCode } = await selectOrganizationCode(country);
    
    // Find parent organization
    const parentOrganization = await db.Organization.findOne({ 
      where: { code: organizationCode, status: 'active' } 
    });
    
    if (!parentOrganization) {
      return res.status(400).json({ 
        success: false, 
        code: 400, 
        message: "Parent Organization not found" 
      });
    }

    // Create new sub-organization (same as registration)
    const newOrganizationCode = generateOrganizationCode(organizationName, timeStamp);
    
    // Check if org code exists
    const existingOrg = await db.Organization.findOne({ where: { code: newOrganizationCode } });
    if (existingOrg) {
      return res.status(400).json({ 
        success: false, 
        code: 400, 
        message: "Organization already exists with this name" 
      });
    }

    const organization = await db.Organization.create({
      name: `${organizationName}_${timeStamp}`,
      logo: organizationLogo || await selectOrganizationLogo(country),
      parentId: parentOrganization.id,
      isSubOrganization: true,
      code: newOrganizationCode,
      activationKeysAllowed: 5000,
      registrationDate: moment.utc(),
      dimitraPointSystem: 0,
      country,
      status: 'active',
      createdAt: moment.utc(),
      updatedAt: moment.utc(),
    });

    // Create user with hashed password
    const defaultPassword = 'Dimitra@123';
    const passwordHash = await createPassword(defaultPassword);
    
    const user = await db.user.create({
      firstName: firstName || organizationName,
      lastName: lastName || '',
      email,
      mobile: phoneNumber,
      password: passwordHash,
      organization: parentOrganization.id,
      subOrganizationId: organization.id, // Use newly created organization
      verified: 1,
      country: country,
      countryId: countryId || country,
      active: active,
      NoOfFarmsPlanningtoonboard: NoOfFarmsPlanningtoonboard || 0,
      registrationUserType: organizationType.toLowerCase(),
      source: 'saas_api_admin_creation',
      address: address,
      stateId: stateId,
      city: city,
      district: district,
      village: village,
      createdAt: moment.utc(),
      updatedAt: moment.utc(),
    });

    // Update organization primary user
    organization.primaryUserId = user.id;
    await organization.save();

    // Link products to org
    await linkProductsToOrganization(products, user.id, organization.id);

    // Assign roles based on organization type and country
    const roles_id = getRolesForOrganizationType(country, organizationType);
    await assignRoles(user.id, roles_id);

    // Create default membership permissions
    let defaultMembershipRes = await createDefaultMembershipPermissions(user, parentOrganization.id, organization.id);

    // Queue activation key creation for default membership
    await queueActivationKeyGenerationInternally({
      user: {
        organization: parentOrganization.id,
        subOrgId: organization.id,
        id: user.id,
        userRole: "admin" 
      },
      body: {
        membershipType: defaultMembershipRes.id,
        numberOfKeys: NoOfFarmsPlanningtoonboard > 0 ? NoOfFarmsPlanningtoonboard : 50,
        comment: 'Initial keys for admin created user'
      }
    });

    // Set default unit settings, catch errors to avoid blocking success response
    try {
      await setDefaultUnitSettingsForAppUsers(user.id, parentOrganization.id);
    } catch (error) {
      console.error('Error setting default unit settings for user:', error);
    }

    // Sync user/org data
    await syncUserData(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        countryId: user.countryId,
        countryCode: user.countryCode ? parseInt(user.countryCode) : null,
        address: user.address,
        active: user.active,
        role: 'sub_enterprise',
        verified: user.verified,
        eoriNumber: user.eori_number,
        organization: {
          name: organization.name,
          code: organization.code,
        },
        registrationUserType: user.registrationUserType,
      },
      {
        id: parentOrganization.id,
        code: parentOrganization.code,
        name: parentOrganization.code,
        isSubOrganization: true,
        subOrgCreation: true,
        subOrganization: {
          id: organization.id,
          name: organization.code,
          code: organization.code,
        },
        product: products.length ? products.map(product => ({
          cfId: product.id,
          name: product.name,
          hsCode: product.hsCode,
          s3Url: product.s3Url,
        })) : [],
      }
    );

    // Get created user data with organization and roles
    const createdUser = await db.user.findByPk(user.id, {
      include: [
        {
          model: db.Organization,
          as: 'org',
          attributes: ['id', 'name', 'code']
        },
        {
          model: db.Roles,
          as: 'user_role_assoc',
          through: { model: db.AdminUserRoles, attributes: [] },
          attributes: ['id', 'name']
        }
      ]
    });

    // Prepare response user data
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName || organization.name,
      lastName: user.lastName,
      organization: organization.name,
      organizationCode: organization.code,
      organizationLogo: organization.logo,
      NoOfFarmsPlanningtoonboard: user.NoOfFarmsPlanningtoonboard,
      userType: organizationType.toLowerCase(),
      country: country,
    };

    return res.status(200).json({
      success: true,
      code: 200,
      message: `User created successfully.`,
      data: createdUser
    });

  } catch (err) {
    console.error("Error in user creation:", err);
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

function translateUserTypeFromIndonesian(string) {
  const translationObj = {
    'ekspor': 'Exporter',
    'koperasi': 'Cooperative',
    'keduanya': 'Cooperative and Exporter',
    'cooperative_union': 'Cooperative Union'
  };
  
  return translationObj[string] || 'N/A';
}



/**
 * @swagger
 * /admin/user-permissions/{userId}:
 *   get:
 *     summary: Get all permissions for a specific user
 *     description: API to get all module permissions for a user by their ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID to get permissions for
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       roleIds:
 *                         type: array
 *                         description: Array of user's role IDs
 *                       moduleAndPermissions:
 *                         type: array
 *                         description: Array of all module permissions for the user's roles
 *        '400':
 *           description: Bad Request
 *        '404':
 *           description: User not found
 *        '500':
 *           description: Internal Server Error
 */
router.get('/user-permissions/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId || isNaN(userId)) {
      return res.status(400).json(
        await errorResp({
          code: 400,
          msg: 'Invalid user ID provided'
        })
      );
    }

    // Get user data with roles
    let userData = await db.user.findOne({
      attributes: ["id", "organization", "subOrganizationId"],
      where: {
        id: parseInt(userId),
        active: true
      },
      include: [
        {
          model: db.Organization,
          as: "user_organization",
          attributes: ["id"],
        },
        {
          model: db.Roles,
          as: "user_role_assoc",
          through: { model: db.AdminUserRoles, attributes: [] },
        },
      ],
    });

    if (!userData) {
      return res.status(404).json(
        await errorResp({
          code: 404,
          msg: 'User not found or inactive'
        })
      );
    }

    // Check if user has admin roles
    const adminRoles = await db.Roles.findAll({
      attributes: ["id"],
      where: {
        id: { [Op.not]: "end_user" },
      },
    });
    
    const hasAdminRoles = userData.user_role_assoc.filter((item) =>
      adminRoles.some((role) => role.id === item.id)
    );
    
    if (hasAdminRoles.length === 0) {
      return res.status(403).json(
        await errorResp({
          code: 403,
          msg: 'User does not have admin access'
        })
      );
    }

    // Extract role IDs
    const roleIds = hasAdminRoles.map(role => role.id);

    // Get all permissions for the user's roles
    const moduleAndPermissions = await db.AdminUsersRolesModulesPermissions.findAll({
      attributes: ['role_id', 'module_id', 'permission_id', 'permitted'],
      where: {
        role_id: { [Op.in]: roleIds}
      },
    });

    res.json(
      await successResp({
        msg: 'User permissions retrieved successfully',
        data: {
          roleIds: roleIds,
          moduleAndPermissions: moduleAndPermissions
        }
      })
    );

  } catch (error) {
    console.error('Error in user-permissions endpoint:', error);
    logErrorOccurred(__filename, error);
    return res.status(500).json(
      await errorResp({
        code: 500,
        msg: 'Internal server error'
      })
    );
  }
});

/**
 * @swagger
 * /admin/devices:
 *   get:
 *     summary: Get all devices for the logged-in user
 *     description: Retrieve all devices that have been used to login to this account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/devices', auth, async (req, res) => {
  try {
    const { getUserDevices } = require(rootPath + '/helpers/deviceIdentification');
    const userId = req.user.id;

    const devices = await getUserDevices(userId);

    res.json(
      await successResp({
        msg: 'Devices retrieved successfully',
        data: { devices }
      })
    );
  } catch (error) {
    console.error('Error fetching devices:', error);
    logErrorOccurred(__filename, error);
    return res.status(500).json(
      await errorResp({
        code: 500,
        msg: 'Failed to retrieve devices'
      })
    );
  }
});

/**
 * @swagger
 * /admin/devices/{deviceId}:
 *   delete:
 *     summary: Remove a device from trusted devices
 *     description: Remove a specific device from the user's list of trusted devices
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device ID to remove
 *     responses:
 *       200:
 *         description: Device removed successfully
 */
router.delete('/devices/:deviceId', auth, async (req, res) => {
  try {
    const { removeUserDevice } = require(rootPath + '/helpers/deviceIdentification');
    const userId = req.user.id;
    const deviceId = req.params.deviceId;

    const removed = await removeUserDevice(userId, deviceId);

    if (removed) {
      res.json(
        await successResp({
          msg: 'Device removed successfully'
        })
      );
    } else {
      res.json(
        await errorResp({
          code: 404,
          msg: 'Device not found'
        })
      );
    }
  } catch (error) {
    console.error('Error removing device:', error);
    logErrorOccurred(__filename, error);
    return res.status(500).json(
      await errorResp({
        code: 500,
        msg: 'Failed to remove device'
      })
    );
  }
});


module.exports = router;