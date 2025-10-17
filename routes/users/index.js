const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const { getUserMemberships, getUserPermissionsByMemberships } = require(rootPath + '/helpers/controller/user-permissions');
const { v4: randomSting } = require('uuid');
// configuring twilio
const twilio = require('twilio')(
  process.env.TWILIO_ACC_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const axios = require("axios")
const shortid = require('short-uuid');
const _ = require('lodash');
const S3 = require(rootPath + '/components/s3upload');
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const fileUpload = require(rootPath + '/middleware/file_upload');
const translationMiddleware = require(rootPath + '/middleware/translation');
const path = require('path');
const ejs = require('ejs');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const crypto = require('crypto');
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');
// loading models
const {
  sequelize,
  user,
  user_language,
  user_document,
  forgot_password,
  UserRoles,
  UserPasswords,
  UserRegistrationToken,
  UserGeneralSetting
} = require('../../models');
// loading helpers
const {
  createPassword,
  createOtpHash,
  verifyHash,
} = require('../../helpers/hash');
const {
  serverError,
  errorResp,
  successRespSync,
  errorRespSync,
} = require('../../helpers/api');
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const {
  registrationValidation,
  verifyOtpValidation,
  listValidation,
  userDeleteValidation,
  userMobileUpdateValidation
} = require(rootPath + '/helpers/validation');
const {
  preRegisterUserValidation,
  preRegisterSetPassword
} = require('../../helpers/validators/appUser');


const {
  sendPushNotification
} = require(rootPath + '/helpers/pushNotification');
const {
  createOTP,
  fileFilterGen,
  sendSMS,
  sendTwilioSMS,
  verifyTwilioSMS,
  logErrorOccurred,
  validateMobileNumber,
  sendSMSWithAfricaTalking
} = require(rootPath + '/helpers/general');
const mailer = require(rootPath + '/components/mailer');
const { deleteFileS3, getSignedURL } = require(rootPath + '/helpers/aws_s3'); // s3 functions
// multer configuration
var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
const db = require('../../models');
const { faq, langObj } = require('../../helpers/consts');
const { check } = require('express-validator');
const { updateDefaultUnitForCacaoByUserIdForApp, setDefaultUnitSettingsForAppUsers } = require(rootPath + '/helpers/defaultUnitConfigCacaoUser')
const { syncUserData } = require('../../helpers/dds_sync')
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
// create upload
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});

const Queue = require('bull');
const { countries } = require('../../scripts/updateUserCountry/countiresIso');



const validateIfOrganizationExists = async (organizationCode) => {
  const organization = await db.Organization.findOne({
    where: {
      code: organizationCode,
    },
  });
  return organization;
};

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

const handleUserMembershipPermissions = async (activationKey, userData) => {
  // set activation key user_id
  if (activationKey) {
    await db.activationKeys.update({
      user_id: userData.id,
      // user_email: userData.email,
      // phone: userData.mobile,
      status: "assigned"
    }, { where: { id: activationKey.id } });

    // create userMembership
    if (activationKey.membership_type) {
      await db.UserMembershipMap.upsert({
        user_id: userData.id,
        membership_id: activationKey.membership_type,
      });
    }

    const userRoles = await db.UserRoleMembershipMap.findAll({ where: { membership_id: activationKey.membership_type } });

    const userRoleIds = userRoles.map(userRole => userRole.user_role_id);
    const roleModules = await db.UserRoleModule.findAll({
      where: {
        user_role_id: {
          [db.Sequelize.Op.in]: userRoleIds
        },
        isdeleted: {
          [db.Sequelize.Op.is]: null,
        },
        [db.Sequelize.Op.or]: [
          { organization_id: { [db.Sequelize.Op.is]: null } },
          { organization_id: activationKey.org_id }
        ]
      },
      include: [
        {
          model: db.Modules,
          where: {
            isDeleted: {
              [db.Sequelize.Op.is]: null,
            }
          },
          attributes: [],
          required: true,
          as: 'module',
        }
      ],
      order: [['createdAt', 'ASC']],
    });

    const organizationRoleModules = roleModules.reduce((prev, roleModule) => {
      const prevRoleModuleIdx = prev.findIndex(existingRoleModule => {
        return existingRoleModule.user_role_id === roleModule.user_role_id && existingRoleModule.module_id === roleModule.module_id;
      });
      const hasPrevRoleModule = prevRoleModuleIdx !== -1;

      if(roleModule.organization_id) {
        if(hasPrevRoleModule) {
          prev[prevRoleModuleIdx] = roleModule;
        } else {
          prev.push(roleModule);
        }
      } else {
        if(hasPrevRoleModule) {
          if(!prev[prevRoleModuleIdx].organization_id) {
            prev[prevRoleModuleIdx] = roleModule;
          }
        } else {
          prev.push(roleModule);
        }
      }
      return prev;
    }, []);
    const permissions = await db.Permissions.findAll({ raw: true });
    const userMembershipModulePermissions = organizationRoleModules.reduce(
      (previousValue, { module_id, user_role_id, default_enabled }) => {
        permissions.forEach(({ id: permissionId }) => {
          previousValue.push({
            id: `${user_role_id}_${activationKey.membership_type}_${module_id}_${permissionId}`,
            user_role_id,
            membership_plan_id: activationKey.membership_type,
            module_id,
            permission_id: permissionId,
            createdAt: moment.utc(),
            updatedAt: moment.utc(),
            permitted: default_enabled,
          });
        });
        return previousValue;
      },
      []
    );

    await db.UserRoleMembershipPermissions.bulkCreate(
      userMembershipModulePermissions,
      { 
        updateOnDuplicate: ["user_role_id", "module_id", "membership_plan_id", "permission_id"]
      }
    );
  };
}

const emailSendQueue = new Queue('emailSendQueue', {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});

emailSendQueue.process(async function (job, done) {
  try {

    const { preRegistrationData, host } = job.data;
    let result, userIdsArr = [], setPasswordUrl = process.env.SETPASSWORDURL;
    job.progress(50)
    for (let i = 0; i < preRegistrationData.length - 1; i++) {
      mailer.renderAndSend(
        preRegistrationData[i].email,
        { baseUrl: host, name: preRegistrationData[i].firstName, email: preRegistrationData[i].email, url: `${setPasswordUrl}/${preRegistrationData[i].preRegistrationToken}` },
        '/users/pre-reg-setup-password.html',
        'Set password request'
      );
      userIdsArr.push(preRegistrationData[i].id);
    }
    await db.user.update({ preRegistrationStatus: 'complete' }, {
      where: {
        id: userIdsArr
      }
    });
    done(null, 'console result')
    job.progress(100)
  } catch (error) {
    console.log(error);
  }

});

emailSendQueue.on('completed', async function (job, result) {
  console.log(job.data, result, 'completed')
});


// code to
// cron.schedule(process.env.cronTimeSendPushPreReg, async function () {
//   try {
//     const getUsers = await db.user.findAll({
//       attributes: ['id', 'preRegistrationToken', 'email'],
//       where: {
//         preRegistrationStatus: 'inprogress'
//       },
//       include: [
//         {
//           model: db.UserRegistrationToken,
//           attributes: ['device_registration_token', 'device_id'],
//           as: 'regToken'
//         }
//       ]
//     });
//     pushNotificationQueue.add({ preRegistrationUsersData: getUsers, host: req.headers.host }, { jobId: '' });
//   } catch (error) {
//     return serverError(res, error);
//   }
// });

// cron.schedule('* * * * *', async () => {


/**
 * @swagger
 * /user/activation-request:
 *   post:
 *     summary:  user
 *     description: Request for activation key for user
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               organizationCode:
 *                 type: string
 *           example:
 *              { "organizationCode": "agzon", "email": "user@yopmail.com", "mobile": 8793768476, "subject": "Request for activation code", "message": "Please provide activation key." }
 *     responses:
 *       200:
 *         description: Returns the activation key sent message
 *       500:
 *         description: Server error
 */
// request for acttivation key
router.post(
  '/activation-request',
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const {
        subject,
        message,
        email,
        mobile,
        organizationCode,
      } = req.body;

      const userResult = await db.user.create(
        { email, mobile, registration_type: email ? 'email' : 'mobile', source: 'saas_api_contact_form' },
        { transaction }
      );
      const set = {
        userId: userResult.id,
        subject,
        message,
        organizationCode,
      };

      await db.UserActivationKeyRequest.create(set, { transaction });
      await transaction.commit();

      res.json(
        successRespSync({
          msg: 'Activation key request sent',
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
 * /user/verify/activation-key:
 *   post:
 *     summary:  user
 *     description: Verify activation key provided by user
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licenseKey:
 *                 type: string
 *           example:
 *              { "licenseKey": "uxPz9TAEtN9JvvuGNCCSb5" }
 *     responses:
 *       200:
 *         description: Returns the activationKey data along with userId
 *       500:
 *         description: Server error
 */
// check activation key
router.post(
  '/verify/activation-key',
  async (req, res) => {
    let newUser, orgObj = ''

    try {
      let { licenseKey, userId = null } = req.body;
      const activationKey = await db.activationKeys.findOne({
        where: { license_key: licenseKey },
        include: [
          {
            model: db.Membership,
            as: "membership_assoc",
            include: [
              {
                model: db.UserRoleMembershipMap,
                as: "userRoleMembershipMap"
              },
            ]

          },
          {
            model: db.Organization,
          }
        ]
      })
      orgObj = activationKey.Organization


      if (!activationKey) {
        throw new Error('Activation key not found');
      } else {
        if (activationKey.status == "activated") {
          throw new Error('Activation key not found');
        }

        else if (activationKey.status == "unassigned" || activationKey.status == "assigned") {
          userId = activationKey?.user_id
          if (!userId) {
            // Check if user already exists with email or mobile
            let existingUser = null;
            if (email) {
              existingUser = await db.user.findOne({
                where: { email: email }
              });
            } 
            if (existingUser) {
              throw new Error('User already exists with this email.');
            }

            newUser = await db.user.create({source: 'saas_api_activation_key'});
            const user = await db.user.findOne({ where: { id: newUser.id } });
            await handleUserMembershipPermissions(activationKey, { id: user.id });
          }
          if (activationKey.membershipValidity) {
            const today = new Date();
            if (!userId) {
              if (moment(today).isAfter(new Date(activationKey.membershipValidity))) {
                throw new Error('Activation key not found');
              }
            }
          } else if (activationKey.status === 'activated' && !userId) {
            throw new Error('Activation key not found');
          }
        }

        else if (activationKey.status === 'activated' && !userId) {
          throw new Error('Activation key not found');
        }
      }
      const packageDurationUnit = activationKey.membership_assoc.membership_duration_unit.split("(")[0];
      const packageDurationNumber = activationKey.membership_assoc.membership_duration;
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

      activationKey.membershipValidity = packegeExpiryDate;
      if (!userId) {
        activationKey.status = 'assigned';
      }
      activationKey.user_id = userId || newUser.id;

      await activationKey.save();

      let tmpObj = JSON.parse(JSON.stringify(activationKey))

      tmpObj.membership_assoc.userRoleMembershipMap = tmpObj.membership_assoc.userRoleMembershipMap.map(el => {
        el.name = el.user_role_id.split("_").join(" ")
        return el
      })

      tmpObj.membership_assoc.org_assoc = orgObj
      return res.json(
        successRespSync({
          msg: 'Activation key has been activated',
          data: tmpObj,
        })
      );
    } catch (e) {

      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: e.message,
        })
      );
    }
  }
);

/**
 * @swagger
 * /user/signup/{type}:
 *   post:
 *     summary:  user
 *     description: Register user (update user)
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        example:
 *          email
 *     requestBody:
 *       description: Register user details
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 countryCode:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 organizationCode:
 *                   type: string
 *                 mobile:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 language:
 *                   type: string
 *                 userRole:
 *                   type: string
 *                 address:
 *                   type: string
 *                 countryId:
 *                     type: string 
 *                 countryIsoCode:
 *                     type: string
 *                 stateId:
 *                     type: string
 *                 village:
 *                     type: string
 *                 districe:
 *                     type: string
 *                 userTribe:
 *                     type: string
 *                 website:
 *                     type: string
 *                 profilePic:
 *                     type: string
 *                 facilityPic:
 *                     type: string
 *                 licenseKey:
 *                     type: string
 *                 resendOTP:
 *                     type: boolean
 *               example:
 *                 { "userId": 307, "countryCode": 977, "email": "new.user@dimitra.com", "password": "User@123", organizationCode: "AGZON", "mobile": 78945613, "firstName": "Hillary", "lastName": "Scott", "language": "English", "userRole": "farmer", "address": "test address", "countryId": "USA", "stateId": "Michigan", "district": "district", "village": "village", "userTribe": "userTribe", "website": "www.dimitra.io","licenseKey": "asd82319","resendOTP": false }
 *     responses:
 *       200:
 *           description: Returns the otp message
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
 *                 example: { "success": true, "code": 200, "message": "OTP sent successfully.", "data": {} }
 *       500:
 *         description: Server error
 */
router.post(
  '/signup/:type',
  validationErrorHandler,
  translationMiddleware,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'facilityPic', maxCount: 1 },
      { name: 'profilePic', maxCount: 1 },
    ]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    console.log( req.headers.lang, ' req.headers.lang')

    try {
      // 0: check already exists
      // 1. Check if activation key exists
      // 2. validate organization
      // 3. Validate password
      // 4. create user
      // 5. create user password
      // 6. upload facilityPic to s3
      // 7. Update activationKey user_id and status
      // 8. Create record in users_user_membership_map (userMembership) table
      // 9. Create user_roles record (UserRoles)
      // 10. Get user_role_modules data based on the requested userRole
      // 11. Create records in user_role_membership_module_permission table a/c to the user_role_modules user_role_id and module_id
      // 12. Send OTP
      const { type } = req.params;
      let { userId } = req.body;
      let {
        countryCode,
        email,
        password,
        organizationCode,
        mobile,

        firstName,
        middleName,
        language,
        lastName,
        gender,
        id_number,
        userRole,

        address,
        countryId,
        countryIsoCode,
        stateId,
        city,
        district,
        village,

        userTribe,
        website,
        licenseKey,
        isLivestockUser,
        app_type,
        resendOTP = false,
        firebaseToken
      } = req.body;

      resendOTP = resendOTP?.toString().toLowerCase() == 'true' ? true : false;

      let userExists = []
      let otherRoles = []

      if (mobile) {
        userExists = await db.user.findAll({
          where: {
            mobile,
            verified: 1
          }
        })

      } else {
        userExists = await db.user.findAll({
          where: {
            email,
            verified: 1
          }
        })
      }


      if (userExists.length > 0) {

        let translMsg = '';
        if (
          req.headers.lang &&
          req.headers.lang != 'en' &&
          globalTranslationCache[error.EMAIL_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()]
        ) {
          translMsg =
            globalTranslationCache[error.EMAIL_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()][
            langObj[req.headers.lang]
            ];
        }

        return res.json(
          {
            success: false,
            code: 200,
            message: translMsg ? translMsg : error.EMAIL_EXIST_ALREADY,
            data: {
            },
          }
        );
      } else {
        if (mobile) {
          userExists = await db.user.findAll({
            where: {
              mobile
            }
          })

        } else {
          userExists = await db.user.findAll({
            where: {
              email
            }
          })
        }
      }

      // send otp
      let otp = await createOTP();
      let otpChannel = null
      // if (otp) {
      //   let otpArray = otp.toString().split('');
      //   let translNumber = "";
      //   otpArray.forEach(obj => {
      //     if (
      //       req.headers.lang &&
      //       req.headers.lang != 'en' &&
      //       globalTranslationCache[obj]
      //     ) {    
      //       translNumber += typeof globalTranslationCache[obj][langObj[req.headers.lang]] == "string" ? globalTranslationCache[obj][langObj[req.headers.lang]] : obj;
      //     } else {
      //       translNumber += obj;
      //     }
      //   })
      //   otp = translNumber;
      // }
     
      if (type === 'email') {
        try {
          await mailer.sendOtp(email, firstName, otp, req.headers.lang);
          otpChannel = 'email'

        } catch (e) {
          let translMsg = '';
          if (
            req.headers.lang &&
            req.headers.lang != 'en' &&
            globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()]
          ) {
            translMsg =
              globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()][
              langObj[req.headers.lang]
              ];
          }
          return res.json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: translMsg ? translMsg : error.INVALID_EMAIL,
            })
          );
        }
      } else if (type === 'mobile') {
        try {
          // if (firebaseToken) {
          //   const message = `Your OTP is ${otp}`
          //   otpChannel = 'push_notification'
          //   const firebaseTokenArr = []
          //   firebaseTokenArr.push(firebaseToken)
          //   await sendPushNotification(firebaseTokenArr, message)
          // } else {
          //   // let info = await sendSMS({
          //   //   body: `Your OTP is ${otp}`,
          //   //   to: `+${countryCode}${mobile}`,
          //   // });
          //   otpChannel = 'sms'
          //   await sendSMS({
          //     to: `+${countryCode}${mobile}`
          //   })
          // }
          if (countryCode == 254 || countryCode == 256 || countryCode == 263) { // 254 is the country code for Kenya
            await sendSMSWithAfricaTalking({
              body: `Your OTP is ${otp}`,
              to: `+${countryCode}${mobile}`,
            });
          } else {
            await sendSMS({
              body: `Your OTP is ${otp}`,
              to: `+${countryCode}${mobile}`,
            });
          }

          
        } catch (err) {
          logErrorOccurred(__filename, err);
          // res.json(
          //   {
          //     success: true,
          //     code: 200,
          //     message: "Error sending OTP. Please try again",
          //   }
          // );
        }
      }

      let userResult;

      let defaultLicenseKey = null, newUser = null
      let organizationData = {};
      let org_id = "";

      if(licenseKey) {
        let licenseRes = await  db.activationKeys.findOne({
          where: {
            license_key: licenseKey
          }
        })
        organizationData.organization = licenseRes.org_id
      } else {
        if (organizationCode) {
          const organization = await validateIfOrganizationExists(
            organizationCode
          );

          if (organization) {
            org_id = organization.id;
            organizationData.organization = org_id;
          } else {
            return res.status(error.code.CONFLICT).json(
              errorRespSync({
                code: error.code.CONFLICT,
                msg: error.ORGANIZATION_CODE_DOESNOT_EXIST,
              })
            );
          }
        } else {
          const organization = await validateIfOrganizationExists(
            organizationCode || (process.env.DIMITRA_ORG_STR || "dimitra")
          );
          org_id = organization.id
          organizationData.organization = organization.id
        }
      }
      if (!licenseKey) {
        if (userExists.length <= 0) {
          // Check if user already exists with email or mobile
          let existingUser = null;
          if (email) {
            existingUser = await db.user.findOne({
              where: { email: email }
            });
          } else if (mobile) {
            existingUser = await db.user.findOne({
              where: { mobile: mobile }
            });
          }

          if (existingUser) {
            throw new Error('User already exists with this email or mobile number');
          }

          newUser = await db.user.create({dimitraUserId: randomSting(), source: 'saas_api_license_key'});
        } else {
          newUser = userExists[0]
        }

        if (newUser && userExists.length == 0) {
          userId = newUser.id
          let membershipRes = await db.Membership.findOne({
            where: {
              [Op.or]: [{ plan_type: "global", default_status: 1 }, { plan_type: "enterprise", default_status: 1 }],
            }, include: [
              {
                model: db.UserRoleMembershipMap,
                as: 'userRoleMembershipMap'
              }
            ]
          })
          if (membershipRes) {
            userRole = membershipRes.userRoleMembershipMap.map(m => m.user_role_id)
            otherRoles = userRole.filter(item => item !== 'farmer')
            userRole = userRole.filter(item => item === 'farmer')

            let key = shortid.generate();

            const packageDurationUnit = membershipRes.membership_duration_unit.split("(")[0];
            const packageDurationNumber = membershipRes.membership_duration;
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
              membership_type: membershipRes.id,
              user_id: newUser.id,
              status: "assigned",
              membershipValidity: packegeExpiryDate,
              org_id
            }
            defaultLicenseKey = await db.activationKeys.create(activationKeyObj)
          }
        } else {
          userId = newUser.id
          defaultLicenseKey = await db.activationKeys.findOne({
            where: {
              user_id: newUser.id
            }
          })
        }

      }

      if (!resendOTP || resendOTP === 'false'){
        // check if activation key exists
        let activationKey;
        if ((userId && licenseKey)) {
          activationKey = await db.activationKeys.findOne({
            where: { user_id: userId, license_key: defaultLicenseKey?.license_key || licenseKey, status: 'assigned' }, include: [
              {
                model: db.Membership,
                as: 'membership_assoc',
                include: [
                  {
                    model: db.UserRole,
                    as: 'user_role_assoc'
                  }
                ]
              }
            ]
          });

          if (!activationKey) {
            throw new Error('Activation key not found');
          }
        } else if (newUser && defaultLicenseKey) {
          activationKey = defaultLicenseKey
          // throw new Error('License key required');
        } else {
          throw new Error('License key required');
        }

        // validate organization
        const otpHash = await createOtpHash(otp.toString());
        const passwordHash = await createPassword(password);

        lang = req.headers.lang;
        // validate password
        const hasErrors = await validatePasswordHelper(password);

        if (hasErrors.length > 0) {
          return res.json(
            await errorResp({
              code: success.code.OK,
              msg: hasErrors[0],
            })
          );
        }

        // create user data
        const userWhere = userId
          ? { id: userId }
          : type === 'email'
            ? { email }
            : { mobile };
        let isAlreadyExist = await db.user.findOne({
          attributes: ['email', 'mobile', 'verified', 'id', 'profilePicS3Key', 'facilityPicS3Key'],
          where: userWhere,
        });

        // confirm user exists already
        if (isAlreadyExist) {
          userId = isAlreadyExist.id
        }

        if (isAlreadyExist && isAlreadyExist.verified) {
          let translMsg = '';
          if (
            req.headers.lang &&
            req.headers.lang != 'en' &&
            globalTranslationCache[error.EMAIL_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()]
          ) {
            translMsg =
              globalTranslationCache[error.EMAIL_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()][
              langObj[req.headers.lang]
              ];
          }

          return res.json(
            errorRespSync({
              code: success.code.OK,
              msg: translMsg ? translMsg : error.EMAIL_EXIST_ALREADY,
            })
          );
        }

        const country = countries.find(item => item.code === countryIsoCode) 

        let set = {
          ...organizationData,
          address,
          countryCode,
          countryId,
          countryIsoCode,
          country: country?.name ?? null,
          district,
          email,
          firstName,
          middleName,
          language,
          lastName,
          gender,
          id_number,
          mobile,
          otp: otpHash,
          otp_channel: otpChannel,
          password: passwordHash,
          registration_type: type,
          stateId,
          city,
          userTribe,
          isLivestockUser,
          app_type,
          village,
          website,
          dimitraUserId: randomSting(),
          source: 'saas_api_user_registration'
        };

        // check if file uploaded or not
        const facilityPicFile = req.files && req.files['facilityPic'] ? req.files['facilityPic'][0] : null;
        const profilePicFile = req.files && req.files['profilePic'] ? req.files['profilePic'][0] : null;

        if (facilityPicFile != undefined && facilityPicFile != null) {
          // get uploaded file information and create some var
          const { key, originalname, location } = facilityPicFile;
          const fileName = originalname.substring(0, 90);
          set.facilityPicS3Key = key;
          set.facilityPicName = fileName;
          set.facilityPicUrl = location;
        }

        if (profilePicFile != undefined && profilePicFile != null) {
          // get uploaded file information and create some var
          const { key, originalname, location } = profilePicFile;
          const fileName = originalname.substring(0, 90);
          set.profilePicS3Key = key;
          set.profilePicName = fileName;
          set.profilePicUrl = location;
        }

        if (userId) {
          await db.user.update(set, { where: { id: userId } });
        } else {
          const result = await db.user.create(set);
          userId = result.id;
          
          // Set default unit settings for the new user
          try {
            await setDefaultUnitSettingsForAppUsers(userId, result.organization);
          } catch (error) {
            console.error('Error setting default unit settings for user:', error);
          }
        }

        let deleteFiles = [];

        if (isAlreadyExist.facilityPicS3Key !== null && facilityPicFile != null) {
          // file to be deleted
          const param = {
            Bucket: process.env.AWS_PUBLIC_BUCKET,
            Key: isAlreadyExist.facilityPicS3Key,
          };

          deleteFiles.push(await deleteFileS3(param));
        }

        if (isAlreadyExist.profilePicS3Key !== null && profilePicFile != null) {
          // file to be deleted
          const param = {
            Bucket: process.env.AWS_PUBLIC_BUCKET,
            Key: isAlreadyExist.profilePicS3Key,
          };

          deleteFiles.push(await deleteFileS3(param));
        }

        await Promise.all(deleteFiles);

        userResult = await db.user.findOne({ where: { id: userId } });
        if (userExists.length == 0) {
          await UserPasswords.create({
            userId: userId,
            password: passwordHash,
          });
        }

        // set activation key user_id
        if (activationKey) {
          // TODO reuse handleUserMemberPermissions method
          await db.activationKeys.update({
            user_id: userResult.id,
            user_email: email,
            phone: mobile,
            // status: 'activated'
          }, { where: { id: activationKey.id } });

          // create userMembership
          if (activationKey.membership_type) {
            await db.UserMembershipMap.upsert({
              user_id: userId,
              membership_id: activationKey.membership_type,
            })
            // await db.UserMembershipMap.create({
            //   user_id: userId,
            //   membership_id: activationKey.membership_type,
            // }, { transaction });
          }
          if (!licenseKey) {
            const roleModules = await db.UserRoleModule.findAll({
              where: {
                user_role_id: userRole,
                isdeleted: {
                  [db.Sequelize.Op.is]: null,
                },
                [db.Sequelize.Op.or]: [
                  { organization_id: { [db.Sequelize.Op.is]: null } },
                  { organization_id: activationKey.org_id }
                ]
              },
              include: [
                {
                  model: db.Modules,
                  where: {
                    isDeleted: {
                      [db.Sequelize.Op.is]: null,
                    }
                  },
                  attributes: [],
                  required: true,
                  as: 'module',
                }
              ],
              order: [['createdAt', 'ASC']],
            });

            const organizationRoleModules = roleModules.reduce((prev, roleModule) => {
              const prevRoleModuleIdx = prev.findIndex(existingRoleModule => {
                return existingRoleModule.user_role_id === roleModule.user_role_id && existingRoleModule.module_id === roleModule.module_id;
              });
              const hasPrevRoleModule = prevRoleModuleIdx !== -1;

              if(roleModule.organization_id) {
                if(hasPrevRoleModule) {
                  prev[prevRoleModuleIdx] = roleModule;
                } else {
                  prev.push(roleModule);
                }
              } else {
                if(hasPrevRoleModule) {
                  if(!prev[prevRoleModuleIdx].organization_id) {
                    prev[prevRoleModuleIdx] = roleModule;
                  }
                } else {
                  prev.push(roleModule);
                }
              }
              return prev;
            }, []);
            const permissions = await db.Permissions.findAll({ raw: true });
            const userMembershipModulePermissions = organizationRoleModules.reduce(
              (previousValue, { module_id, user_role_id, default_enabled }) => {
                permissions.forEach(({ id: permissionId }) => {
                  previousValue.push({
                    id: `${user_role_id}_${activationKey.membership_type}_${module_id}_${permissionId}`,
                    user_role_id,
                    membership_plan_id: activationKey.membership_type,
                    module_id,
                    permission_id: permissionId,
                    createdAt: moment.utc(),
                    updatedAt: moment.utc(),
                    permitted: default_enabled,
                  });
                });
                return previousValue;
              },
              []
            );

            await db.UserRoleMembershipPermissions.bulkCreate(
              userMembershipModulePermissions,
              { 
                updateOnDuplicate: ["user_role_id", "module_id", "membership_plan_id", "permission_id"] 
              }
            );

            let insertArr = [];
            insertArr = otherRoles.map((reqRole) => {
              return {
                user_id: userId,
                status: "pending",
                role_requested: reqRole,
                org_id,
              };
            });
            if (insertArr.length !== 0) {
              await db.RoleRequests.bulkCreate(insertArr);
            }
          }
        };
        await UserRoles.upsert({
          id: `${userResult.id}_end_user`,
          user_id: userResult.id,
          role_id: 'end_user',
        });

        //set currency settings for user
        let countryObj = {
          currency_code: "USD"
        }
        countryObj = await  db.Countries.findOne({where: {iso2: countryIsoCode}})

        let currencyObj = await db.Currency.findOne({where: {abbreviation: countryObj.currency_code}})
        if(!currencyObj) {
          currencyObj = {
            id : 3
          }
        }

        await db.UserCurrencySettings.create({
          userId: userResult.id,
          currencyId: currencyObj.id
        })


      }

      return res.json(
        successRespSync({
          msg: success.OTP_SENT,
        })
      );
    } catch (err) {

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
)

/**
 * @swagger
 * /user/change-password:
 *   post:
 *     summary: user
 *     description: Change user password
 *     tags: [User]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Change user password
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 oldPassword:
 *                   type: string
 *                 newPassword:
 *                   type: string
 *               example:
 *                 { "oldPassword": "old@123", "newPassword": "User@123" }
 *     responses:
 *       200:
 *           description: Returns the password changed message
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
 *                 example: { "success": true, "code": 200, "message": "Password has been changed.", "data": {} }
 *       500:
 *         description: Server error
 */
router.put(
  '/change-password',
  auth,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      let { oldPassword, newPassword } = req.body;
      let { id: userId } = req.user;

      if (oldPassword === newPassword) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Cannot save the same password.',
          })
        );
      }

      let userData = await user.findOne({
        attributes: [
          'password',
          'id',
        ],
        where: { id: userId },
      });
      let isEqual = await verifyHash(oldPassword, userData.password);

      if (!isEqual) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: 'Password does not match',
          })
        );
      }

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
)

/**
 * @swagger
 * /user/send-otp/{type}:
 *   post:
 *     summary: Send OTP api.
 *     description: Send OTP api.
 *     tags: [User]
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
 *              { "organizationCode": "agzon", "email": "user@yopmail.com", "password": "User@123", "countryCode": 91, "mobile": 8793768476 }
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
 *                 example: { "success": true, "code": 200, "message": "OTP sent successfully.", "data": {} }
 */

router.post(
  '/send-otp/:type',
  translation,
  registrationValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { type } = req.params;
      const { organizationCode } = req.body;
      const otp = await createOTP();
      if (otp) {
        let otpArray = otp.toString().split('');
        let translNumber = "";
        otpArray.forEach(obj => {
          if (
            req.headers.lang &&
            req.headers.lang != 'en' &&
            globalTranslationCache[obj]
          ) {
            translNumber += typeof globalTranslationCache[obj][langObj[req.headers.lang]] == "string" ? globalTranslationCache[obj][langObj[req.headers.lang]] : obj;
          } else {
            translNumber += obj;
          }
        })
        otp = translNumber;
      }

      const otpHash = await createOtpHash(otp.toString());
      let organizationData = {};
      if (organizationCode) {
        const organization = await validateIfOrganizationExists(
          organizationCode
        );
        if (organization) {
          organizationData.organization = organization.id;
        } else {
          return res.status(error.code.CONFLICT).json(
            errorRespSync({
              code: error.code.CONFLICT,
              msg: error.ORGANIZATION_CODE_DOESNOT_EXIST,
            })
          );
        }
      }

      if (type === 'email') {
        const { email, password } = req.body;
        // validate password
        lang = req.headers.lang
        const hasErrors = await validatePasswordHelper(password);
        if (hasErrors.length > 0) {
          return res.json(
            await errorResp({
              code: success.code.OK,
              msg: hasErrors[0],
            })
          );
        }

        // generate password hash
        const passwordHash = await createPassword(password);
        let userData = {
          ...organizationData,
          email,
          otp: otpHash,
          password: passwordHash,
          registration_type: 'email',
          source: 'saas_api_email_registration'
        };
        // check if user already exist
        let isAlreadyExist = await user.findOne({
          attributes: ['email', 'verified'],
          where: { email },
        });

        // update if exist
        let result = null;
        if (isAlreadyExist == null) {
          result = await user.create(userData);
          await UserPasswords.create({
            userId: result.id,
            password: passwordHash,
          });
          let membershipRes = []
          membershipRes = await db.Membership.findAll({ where: { default_status: 1 } })

          if (membershipRes.length > 0) {
            await db.UserMembershipMap.create({
              user_id: result.id,
              membership_id: membershipRes[0].id
            })
          }
          let test = await UserRoles.create({
            id: `${result.id}_end_user`,
            user_id: result.id,
            role_id: 'end_user',
          });
        } else {
          // send response if user alredy exist and verified
          if (isAlreadyExist.verified) {
            let translMsg = '';
            if (
              req.headers.lang &&
              req.headers.lang != 'en' &&
              globalTranslationCache[error.EMAIL_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()]
            ) {
              translMsg =
                globalTranslationCache[error.EMAIL_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()][
                langObj[req.headers.lang]
                ];
            }
            return res.json(
              errorRespSync({
                code: success.code.OK,
                msg: translMsg ? translMsg : error.EMAIL_EXIST_ALREADY,
              })
            );
          }
          // if not verified
          delete userData.email;
          result = await user.update(userData, { where: { email } });
        }

        // send mail to the user mail id with otp
        // let info = await sendEmail({
        //   to: email, // list of receivers
        //   subject: 'One Time Pincode', // Subject line
        //   html: `<b>Your OTP is : ${otp}. Please don't share it with anyone.</b>`, // html body
        // });

        try {
          await mailer.sendOtp(email, result.firstName, otp, req.headers.lang);
          return res.json(
            successRespSync({
              msg: success.OTP_SENT,
            })
          );
        } catch (e) {
          let translMsg = '';
          if (
            req.headers.lang &&
            req.headers.lang != 'en' &&
            globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()]
          ) {
            translMsg =
              globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()][
              langObj[req.headers.lang]
              ];
          }
          return res.json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: translMsg ? translMsg : error.INVALID_EMAIL,
            })
          );
        }
      } else if (type === 'mobile') {
        const { mobile, countryCode, password } = req.body;
        lang = req.headers.lang
        const hasErrors = await validatePasswordHelper(password);
        if (hasErrors.length > 0) {
          return res.json(
            await errorResp({
              code: success.code.OK,
              msg: hasErrors[0],
            })
          );
        }
        const passwordHash = await createPassword(password);

        //used while creating new user
        let userData = {
          ...organizationData,
          countryCode,
          mobile,
          otp: otpHash,
          password: passwordHash,
          registration_type: 'mobile',
          source: 'saas_api_mobile_registration'
        };

        // check if user already exist
        let isAlreadyExist = await user.findOne({
          attributes: ['mobile', 'verified'],
          where: { mobile },
        });

        // update if exist
        if (isAlreadyExist == null) {
          result = await user.create(userData);
          await UserPasswords.create({
            userId: result.id,
            password: passwordHash,
          });
          let membershipRes = []
          membershipRes = await db.Membership.findAll({ where: { default_status: 1 } })

          if (membershipRes.length > 0) {
            await db.UserMembershipMap.create({
              user_id: result.id,
              membership_id: membershipRes[0].id
            })
          }
          let test = await UserRoles.create({
            id: `${result.id}_end_user`,
            user_id: result.id,
            role_id: 'end_user',
          });
        } else {
          // send response if user alredy exist and verified
          if (isAlreadyExist.verified) {
            let translMsg = '';
            if (
              req.headers.lang &&
              req.headers.lang != 'en' &&
              globalTranslationCache[error.MOBILE_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()]
            ) {
              translMsg =
                globalTranslationCache[
                error.MOBILE_EXIST_ALREADY.toLowerCase().replace(/\s/g, '').trim()
                ][langObj[req.headers.lang]];
            }
            return res.json(
              errorRespSync({
                code: success.code.OK,
                msg: translMsg ? translMsg : error.MOBILE_EXIST_ALREADY,
              })
            );
          }
          // if not verified
          delete userData.mobile;
          result = await user.update(userData, { where: { mobile } });
        }

        // send sms to the user with otp

        try {
          if (countryCode == 254 || countryCode == 256 || countryCode == 263) { // 254 is the country code for Kenya
           const info = await sendSMSWithAfricaTalking({
              body: `Your OTP is ${otp}`,
              to: `+${countryCode}${mobile}`,
            });
            if (info) {
              return res.json(
                successRespSync({
                  msg: success.OTP_SENT,
                })
              );
            }
          } else {
            const info = await sendSMS({
              body: `Your OTP is ${otp}`,
              to: `+${countryCode}${mobile}`,
            });
            // check if sms is sent or not
            if (info.status == 'queued') {
              return res.json(
                successRespSync({
                  msg: success.OTP_SENT,
                })
              );
            }
          }
          
        } catch (err) {
          return serverError(res, err);
        }
      } else {
        return serverError(res);
      }
    } catch (err) {
      await user.destroy({
        where: {
          mobile: req.body.mobile,
        },
      });
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/verify-otp:
 *   post:
 *     summary: Verify otp of the user
 *     description: Verify otp of the user.
 *     tags: [User]
 *     requestBody:
 *       description: Verify otp of the user
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"credential":"user@yopmail.com","otp":"2323", "licenseKey": "12asdg"}
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
 *                 example: { "success": true, "code": 200, "message": "OTP matches successfully.", "data": { "userData": { "email": "user11@yopmail.com", "mobile": null, "otp": "$2b$10$0Qf89YTh2Wu9Tqoimgwb2.IPOx7IP9y0quptoy4w6uBkDQgXwNWBS", "id": 185, "user_organization": { "id": 1, "name": "Agzon", "logo": "https://dimitra-public-images.s3.amazonaws.com/org/agzon-logo-big.png", "splashScreen": "https://dimitra-public-images.s3.amazonaws.com/org/agzonSplashScreen.png" } }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTg1fSwiaWF0IjoxNjQ4NjI2NzI3LCJleHAiOjE2NDg2MjczMjd9.U9v2gpa4_A4ZC8YC-MtQZJEwp8nLJYTA4YWihNG_5N8", "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTg1LCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJblZ6WlhKSlpDSTZNVGcxZlN3aWFXRjBJam94TmpRNE5qSTJOekkzTENKbGVIQWlPakUyTkRnMk1qY3pNamQ5LlU5djJncGE0X0E0WkM4WUMtTXRRWkpFd3A4bkxKWVRBNFlXaWhOR181TjgifSwiaWF0IjoxNjQ4NjI2NzI3LCJleHAiOjE2ODAxNjI3Mjd9.Uk8sNyir3uDyaLKarcL7fcsrxJVoOvkO6cGowxmtdbw" } }
 */

// verify otp of the user
router.post(
  '/verify-otp',
  translation,
  verifyOtpValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { credential, otp, licenseKey } = req.body;
      // get user data
      let userSyncData = await user.findOne({
        attributes: ['email', 'mobile', 'otp', 'otp_channel', 'id', "unverifiedMobile", "unverifiedEmail", "password", "firstName","middleName", "lastName", "language", "address", "countryId", "country", "countryIsoCode", "stateId", "district", "village", "userTribe", "otp", "fax", "website", "createdAt", "countryCode", "localPremiseId", "federalPremiseId", "userType", "registration_type", "profilePicUrl", "profilePicS3Key", "profilePicName", "loginAttempts", "lockedToken","registrationUserType"],
        where: {
          [Op.or]: [{ email: credential }, { mobile: credential }],
        },
        order: [['createdAt', 'DESC']]
      })
      let userData = await user.findOne({
        attributes: ['email', 'mobile', 'otp', 'otp_channel', 'id', "firstName","middleName", "lastName", "language", "address", "countryId", "country", "countryIsoCode", "stateId", "district", "village", "userTribe", "website", "createdAt", "countryCode", "organization"],
        include: [
          {
            model: db.Organization,
            as: 'user_organization',
            attributes: ['id', 'name', 'logo', 'splashScreen'],
          },
          {
            model: db.Membership,
            as: "user_membership",
            through: { model: db.UserMembershipMap, attributes: [] }
          },
        ],
        where: {
          [Op.or]: [{ email: credential }, { mobile: credential }],
        },
        order: [['createdAt', 'DESC']]
      });
      if(!userData){
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: 'User not found',
          })
        );
      }
      // verify otp
      let isEqual
      // check if organization has custom_otp set
      const data = await db.Organization.findOne({ 
        where: { id: userData.organization },
        attributes: ['id', 'name', 'code', 'custom_otp']
      })
      if (data.dataValues.custom_otp && ((data.dataValues.custom_otp).toString() === otp.toString())) {
        isEqual = true;
      } else {
        if (userData && userData.otp_channel === 'sms') {
          let countryCode = userData.countryCode.toString()
          if (countryCode.indexOf('+') === -1) {
            countryCode = `+${userData.countryCode}`
          }
          isEqual = await verifyHash(otp.toString(), userData.otp);
        } else {
          isEqual = await verifyHash(otp.toString(), userData.otp);
        }
      }

      // check if otp is correct or not
      if (!isEqual) {
        let translMsg = '';
        if (
          req.headers.lang &&
          req.headers.lang != 'en' &&
          globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()]
        ) {
          translMsg =
            globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()][
            langObj[req.headers.lang]
            ];
        }
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: translMsg ? translMsg : error.INVALID_OTP,
          })
        );
      }

      // update user status as logged in
      result = await user.update(
        { isLogin: 1, verified: 1 },
        { where: { id: userData.id } }
      );

      // generate token if all goes well
      let accesstoken = await jwt.sign(
        {
          data: { userId: userData.id },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}ms` }
      );

      // generate refresh token if all goes well
      let refreshtoken = await jwt.sign(
        {
          data: { userId: userData.id, token: accesstoken },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '365d' }
      );

      // get user menus and user permissions based on roles
      let userMenus = {}

      let userMemberships = await getUserMemberships(userData.id);
      let userPermissions = await getUserPermissionsByMemberships(userMemberships);
      if (userPermissions) {
        userPermissions.finalModRolePermRet.forEach(permissionObj => {
          if (permissionObj.permission_id == "get" && permissionObj.module_name.includes("Farm Registration")) {
            userMenus["My Farm"] = permissionObj.permitted
          }
          if (permissionObj.permission_id == "get" && permissionObj.module_name.includes("Crop Registration")) {
            userMenus["My Crops"] = permissionObj.permitted
          }
          if (permissionObj.permission_id == "get" && permissionObj.module_name.includes("Animal Registration")) {
            userMenus["My Livestock"] = permissionObj.permitted
          }
          if (permissionObj.permission_id == "get" && permissionObj.module_name.includes("Dry Milling")) {
            userMenus["Dry Milling"] = permissionObj.permitted
          }
          if (permissionObj.permission_id == "get" && permissionObj.module_name.includes("Buying Station")) {
            userMenus["Buying Station"] = permissionObj.permitted
          }
          if (permissionObj.permission_id == "get" && permissionObj.module_name.includes("Coffee")) {
            userMenus["Coffee"] = permissionObj.permitted
          }
          if(permissionObj.permission_id == "get" && permissionObj.module_name.includes("NFT")) {
            userMenus["Mint NFT"] = permissionObj.permitted;
          }
          if(permissionObj.permission_id == "get" && permissionObj.module_name.includes("Survey Builder")) {
            userMenus["Survey Builder"] = permissionObj.permitted;
          }
          if(permissionObj.permission_id == "get" && permissionObj.module_name.includes("Cacao")) {
            userMenus["Cacao"] = permissionObj.permitted;
          }
          if(userData.user_organization.id == 3 || userData.user_organization.id == 7 || userData.user_organization.id == 8) {
            userMenus["Processing Station"] = true
          }
        })
      }
      userData.dataValues.userMenus = userMenus;
      userData.dataValues.userMenusPermissions = userPermissions.finalModRolePermRet;
      userData.dataValues.userRoles = userPermissions.userRoles;

      //splash screen
      let coffeeSplash = false;
      const membershipIds = userMemberships.map(membership => membership.membership_assoc.id);
      const hasCoffeeRole = await db.UserRoleMembershipMap.findAll({
        where: {
          membership_id: {
            [db.Sequelize.Op.in]: [...membershipIds],
          },
          isDeleted: 0,
          [db.Sequelize.Op.or]: [
            {
              user_role_id: 'buying_station'
            },
            {
              user_role_id: 'coffee_farmer'
            },
            {
              user_role_id: 'dry_milling'
            }
          ]
        }
      });

      const hasCocoaRole = await db.UserRoleMembershipMap.findAll({
        where: {
          membership_id: {
            [db.Sequelize.Op.in]: [...membershipIds],
          },
          isDeleted: 0,
          user_role_id: 'cacao_farmer'
        }
      });

      if (!!hasCoffeeRole.length) {
        coffeeSplash = true
      }

      if(!!hasCocoaRole.length) {
        coffeeSplash = false
      }
 if(
      (userData.user_organization.id ==( process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154)) || 
      (userData.user_organization.id == (process.env.INDONESIA_PT_EXPORTER_ID || 228))
    ){
      coffeeSplash = false
    }

      if (licenseKey) {
        let actKeyRes = await db.activationKeys.findOne({ where: { user_id: userData.id, license_key: licenseKey } })
        actKeyRes.status = "activated"
        await actKeyRes.save()
      }

      await updateDefaultUnitForCacaoByUserIdForApp(userData.id, userData.organization)

      let jobData = JSON.parse(JSON.stringify(userSyncData))
      jobData.accesstoken = accesstoken
      
      //sync to dds
      await syncUserData(userSyncData, data);

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
          userId: userData.id,
          surveyId: survey.id,
          status: true,
          surveyListStatus: true,
        }]
    
        // adding to survey users list
        await db.surveyUsersList.bulkCreate(surveyUsersObj);
    
        // Send notification to users
        const notification = await db.Notification.create(
          {
            notify: "user",
            message: `You have been invited to "${survey.title}"`,
            userId: userData.id,
            type: "survey",
            title: "You have been invited to the survey",
            data: JSON.stringify({
              surveyId: survey.id,
              title: `You have been invited to "${survey.title}"`,
              description: survey.description,
            }),
          }
        );
    
        let setUserNotification;
        setUserNotification = {
          userId: userData.id,
          notificationId: notification?.id,
        };
        await db.UserNotification.create(setUserNotification);
      }
      
      // send response
      res.json(
        successRespSync({
          msg: success.OTP_MATCH,
          data: {
            userData,
            token: accesstoken,
            refreshtoken,
          },
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
 * /user/create-password:
 *   post:
 *     summary: Create user password
 *     description: Create user password.
 *     tags: [User]
 *     requestBody:
 *       description: Create user password
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"password":"User@123"}
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
 *                 example: { "success": true, "code": 200, "message": "Password created successfully.", "data": {} }
 */

// create user password
router.post('/create-password', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    // Check previous passwords
    const getPasswordCriteria = await db.ProfileAuthenticationSettings.findOne({
      attributes: ['number_of_unique_passwords'],
      raw: true,
    });

    const prevPasswords = await db.UserPasswords.findAll({
      attributes: ['password'],
      where: { userId: id },
      raw: true,
      order: [['createdAt', 'DESC']],
      limit: getPasswordCriteria.number_of_unique_passwords,
    });

    for (let i = 0; i < prevPasswords.length; i++) {
      let isEqual = await verifyHash(password, prevPasswords[i].password);
      if (isEqual) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: `New password cannot be identical to the last ${getPasswordCriteria.number_of_unique_passwords} passwords`,
          })
        );
      }
    }

    // validate password
    lang = req.headers.lang
    const hasErrors = await validatePasswordHelper(password);
    if (hasErrors.length > 0) {
      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: hasErrors[0],
        })
      );
    }
    const passwordHash = await createPassword(password);
    await UserPasswords.create({
      userId: id,
      password: passwordHash,
    });

    // update password
    let result = await user.update(
      { password: passwordHash, isFirstLogin: false  },
      { where: { id } }
    );
    // send response back
    if (result) {
      return res.json(successRespSync({ msg: success.PASSWORD_CREATED }));
    } else {
      return res.status(error.code.SERVER_ERROR).json(errorRespSync());
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc Profile routes
 */

/**
 * @swagger
 * /user/profile-picture:
 *   put:
 *     summary: Update user profile picture
 *     description: Update user profile picture.
 *     tags: [User]
 *     requestBody:
 *       description: Update user profile picture
 *       required: true
 *       content:
 *         multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                profilePic:
 *                  type: string
 *                  format: binary
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
 *                 example: { "success": true, "code": 200, "message": "Profile Picture updated successfully.", "data": {} }
 */

router.put(
  '/profile-picture',
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
      const { id } = req.user;
      let set = {};
      // get old profile pic data
      const userProfile = await user.findOne({
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
      await user.update(set, {
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

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user
 *     description: Update user details
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       description: User details with id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               countryId:
 *                 type: integer
 *               countryIsoCode:
 *                 type: integer
 *               stateId:
 *                 type: integer
 *               district:
 *                 type: string
 *               village:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               unverifiedMobile:
 *                 type: integer
 *               unverifiedEmail:
 *                 type: email
 *               website:
 *                 type: string
 *               familyTribe:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the sowing JSON
 *       500:
 *         description: Server error
 */

router.put('/profile', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const {
      language,
      countryId,
      countryIsoCode,
      stateId,
      address,
      district,
      village,
      firstName,
      middleName,
      lastName,
      gender,
      id_number,
      unverifiedMobile,
      unverifiedEmail,
      countryCode,
      website,
      familyTribe: userTribe,
      eori_number,
      licenseNumber,
      companyId
    } = req.body;

    if (unverifiedMobile) {
      // check if user exist with this mobile number
      const userAlreadyExist = await user.findOne({
        attributes: ['unverifiedMobile', 'mobile', 'id'],
        where: { mobile: unverifiedMobile },
      });
      // send response if user alredy exist
      if (userAlreadyExist != null) {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: `User Already Exist with mobile number ${unverifiedMobile} `,
          })
        );
      }


    }

    if (unverifiedEmail) {
      // check if user exist with this email
      const userAlreadyExist = await user.findOne({
        attributes: ['unverifiedEmail', 'email', 'id'],
        where: { email: unverifiedEmail, },
      });
      // send response if user alredy exist
      if (userAlreadyExist != null) {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: error.EMAIL_EXIST_ALREADY,
          })
        );
      }
    }

    const country = countries.find(item => item.code === countryIsoCode) 


    // set data to be updated
    let set = {
      countryId,
      country: country?.name ?? null,
      countryIsoCode,
      language,
      address,
      stateId,
      district,
      village,
      firstName,
      middleName,
      lastName,
      gender,
      id_number,
      unverifiedMobile,
      unverifiedEmail,
      countryCode,
      website,
      userTribe,
      eori_number,
      licenseNumber,
      companyId
    };

    Object.keys(set).forEach((key) => {
      set[key] == undefined || set[key] == null ? delete set[key] : {};
    });

    // check user exist or not before updating
    let isUserExist = await user.findByPk(id);
    if (isUserExist == null) {
      throw error.USER_NOT_EXIST;
    }

    // update currency when user changes country
    if(countryIsoCode != isUserExist.countryIsoCode && countryIsoCode) {
      let countryObj = {
        currency_code: "USD"
      }
      countryObj = await  db.Countries.findOne({where: {iso2: countryIsoCode}})

      let currencyObj = await db.Currency.findOne({where: {abbreviation: countryObj.currency_code}})
      if(!currencyObj) {
        currencyObj = {
          id : 3
        }
      }
      let currencyResObj = {}

      let currencySettingsRes = await db.UserCurrencySettings.findOne({where: {userId: isUserExist.id}})

      if(!currencySettingsRes) { //user curency settings doesnt exist
       await db.UserCurrencySettings.create({
          currencyId: currencyObj.id,
          userId: isUserExist.id

        })
      } else {
        await db.UserCurrencySettings.update({
          currencyId: currencyObj.id
        }, {where:{
          userId: isUserExist.id,
        }})
      }
  

    }
    currencyResObj = await db.UserCurrencySettings.findOne({where: {userId: isUserExist.id}, include: [{ model: db.Currency, as: "currency" }],})

    if (countryCode && unverifiedMobile) {
      try {
        let isValidMobileNumber = await validateMobileNumber(
          countryCode + unverifiedMobile
        );
      } catch (err) {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: error.INVALID_MOBILE_NO,
          })
        );
      }
    }

    // update profile
    let [update] = await user.update({ ...set }, { where: { id } });
    //Sync user general settings 
    await UserGeneralSetting.update({
      preferredCountry: countryId,
      preferredState: stateId,
      preferredDistrict: district,
      preferredCountryIsoCode: countryIsoCode,
      preferredCity:village
    },{
      where:{
        userId:id
      }
    })


    // if update success then fetch user details
    if (update) {
      // fetch user profile information
      var updatedDetails = await user.findOne({
        attributes: [
          'id',
          'firstName',
          'middleName',
          'lastName',
          'gender',
          'id_number',
          'email',
          'mobile',
          'unverifiedMobile',
          'unverifiedEmail',
          'profilePicUrl',
          'language',
          'countryCode',
          'language',
          'countryId',
          'countryIsoCode',
          'country',
          'stateId',
          'address',
          'district',
          'village',
          'website',
          'organization',
          "eori_number",
          "licenseNumber",
          "companyId",
          "registrationUserType"
        ],
        where: { id },
      });
    }
    updatedDetails = JSON.parse(JSON.stringify(updatedDetails))
    updatedDetails.currencySettings = currencyResObj

    await syncFarmerDataToOCC(req.user.id);

    const organizationDetail = await db.Organization.findOne({
      where: { id: updatedDetails.organization },
      attributes: ['id', "name", "code"],
    });
    await syncUserData(updatedDetails, organizationDetail);

    // send response
    return res.json(
      successRespSync({
        msg: update ? success.PROFILE_UPDATED : error.NOT_FOUND,
        data: update ? updatedDetails : {},
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


/**
 * @swagger
 * /user/livestock/profile:
 *   put:
 *     summary: Update user
 *     description: Update user details
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       description: User details with id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               mobile:
 *                 type: integer
 *               email:
 *                 type: email
 *     responses:
 *       200:
 *         description: Returns the updated JSON
 *       500:
 *         description: Server error
 */


router.put('/livestock/profile', auth, async (req, res) => {
  try {
    const { id } = req.user;
    console.log({ body: req.body });

    const {
      language,
      firstName,
      middleName,
      lastName,
      mobile,
      email,
      countryCode,
      verificationType,
    } = req.body;


    // set data to be updated
    let set = {
      countryCode,
      firstName,
      middleName,
      lastName,
      mobile,
      email,
    };

    Object.keys(set).forEach((key) => {
      set[key] == undefined || set[key] == null ? delete set[key] : {};
    });

    // check user exist or not before updating
    let isUserExist = await user.findByPk(id);
    if (isUserExist == null) {
      throw error.USER_NOT_EXIST;
    }

    // console.log(set);
    // return
    if(verificationType === 'email') {
      const isDuplicateEmail = await user.findOne({
        where: {
          email: email,
          id: {
            [Op.not]: id,
          },
        },
      });
      if (isDuplicateEmail) throw new Error("Email Already Exists");
    }

    if(verificationType === 'mobile') {
      const isDuplicatePhone = await user.findOne({
        where: {
          mobile: mobile,
          countryCode: countryCode,
          id: {
            [Op.not]: id,
          },
        },
      });
      if (isDuplicatePhone) throw new Error("Mobile Number Already Exists");
    }

    // update profile
    let [update] = await user.update({ ...set }, { where: { id } });

    // if update success then fetch user details
    if (update) {
      // fetch user profile information
      var updatedDetails = await user.findOne({
        attributes: [
          'id',
          'countryCode',
          'firstName',
          'middleName',
          'lastName',
          'email',
          'mobile',
        ],
        where: { id },
      });
    }

    // send response
    return res.json(
      successRespSync({
        msg: update ? success.PROFILE_UPDATED : error.NO_DATA,
        data: update ? updatedDetails : {},
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/other-Information:
 *   put:
 *     summary: Update user's Other information
 *     description: Update user's Other details
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       description: User details with id
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userTribe:
 *                 type: string
 *               website:
 *                 type: string
 *               facilityPic:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: Returns the Users JSON
 *       500:
 *         description: Server error
 */

router.put('/other-information', auth,
  (req, res, next) => {
    let fileUpload = upload.single('facilityPic');
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const { id } = req.user;
      const {
        userTribe,
        website
      } = req.body;

      // set data to be updated
      let set = {
        userTribe,
        website
      };
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // check user exist or not before updating
      let isUserExist = await user.findByPk(id);
      if (isUserExist == null) {
        throw error.USER_NOT_EXIST;
      }

      // check if file uploaded or not
      if (req.file != undefined && req.file != null) {
        // get uploaded file information and create some var
        const { key, originalname, location } = req.file;
        const fileName = originalname.substring(0, 90);
        set.facilityPicS3Key = key;
        set.facilityPicName = fileName;
        set.facilityPicUrl = location;
      }

      // update profile
      let [update] = await user.update({ ...set }, { where: { id } });

      // if update success then fetch user details
      if (update) {
        // fetch user profile information
        var updatedDetails = await user.findOne({
          attributes: [
            'firstName',
            'middleName',
            'lastName',
            'email',
            'mobile',
            'unverifiedMobile',
            'unverifiedEmail',
            'profilePicUrl',
            'language',
            'countryCode',
            'userTribe',
            'website',
            'facilityPicUrl'
          ],
          where: { id },
        });
      }

      // send response
      return res.json(
        successRespSync({
          msg: update ? success.PROFILE_UPDATED : error.NOT_FOUND,
          data: update ? updatedDetails : {},
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  });

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile information
 *     description: Get user profile information.
 *     tags: [User]
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
 *                 example: { "success": true, "code": 200, "message": "Profile data has been fetched successfully.", "data": { "firstName": null, "lastName": null, "email": "vikas11@yopmail.com", "countryCode": null, "mobile": null, "unverifiedMobile": null, "unverifiedEmail": null, "profilePicUrl": null, "language": null } }
 */

// fetch user profile information
router.get('/profile', auth, translation, async (req, res) => {
  try {
    const { id } = req.user;

    // check user exist or not before updating
    let isUserExist = await user.findByPk(id);
    if (isUserExist == null) {
      throw error.USER_NOT_EXIST;
    }
    // fetch user profile information
    // ['email', 'mobile', 'otp', 'id',"firstName", "lastName", "language", "address", "countryId", "stateId", "district", "village", "userTribe", "website" ],
    let result = await user.findOne({
      attributes: [
        'firstName',
        'middleName',
        'lastName',
        'gender',
        'id_number',
        'email',
        'countryCode',
        'mobile',
        'unverifiedMobile',
        'unverifiedEmail',
        'profilePicUrl',
        'facilityPicUrl',
        'language',
        'registration_type',
        'address',
        'countryId',
        'countryIsoCode',
        'country',
        'stateId',
        'district',
        'village',
        'userTribe',
        'website',
        "dimitraUserId",
        "eori_number",
        "licenseNumber",
        "companyId"
      ],
      include: [
        {
          model: db.Organization,
          as: 'user_organization',
          attributes: ['id', 'name', 'logo', 'splashScreen'],
        },
        {
            model: db.Organization,
            as: 'subOrg',
        },
        {
          model: db.activationKeys,
          attributes: ["membershipValidity"],
          as: "activation",
          include: [
            {
              model: db.Membership,
              as: "membership_assoc",
              // through: { model: db.UserMembershipMap, attributes: [] },
              include: [
                {
                  model: db.Organization,
                  as: "org_assoc"
                }
              ]
            },
          ]
        },

      ],
      where: { id },
    });
    const getAllRoles = await db.activationKeys.findAll({
      where: { user_id: id, is_deleted: 0 },
      include: [
        {
          model: db.Membership,
          as: "membership_assoc",
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: "userRoleMembershipMap",
              attributes: [
                'id',
                'membership_id',
                'user_role_id',
                [
                  db.Sequelize.literal('`membership_assoc->userRoleMembershipMap->user_role`.`name`'),
                  "name"
                ],
                [
                  db.Sequelize.literal('`membership_assoc->userRoleMembershipMap->membership`.`membership_type`'),
                  "membership_type"
                ]
              ],

              include: [
                {
                  model: db.UserRole,
                  as: "user_role",
                  attributes: []
                },
                {
                  model: db.Membership,
                  as: "membership",
                  attributes: []
                }
              ]
            }
          ]
        }
      ]
    });

    if (getAllRoles == null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: "No roles found",
        })
      );
    }

    let resData = []
    getAllRoles.forEach(el => {
      resData.push(...(el.membership_assoc.userRoleMembershipMap))
    })
    let newData = [];
    for (let el of resData) {
      newData.push((await el?.toJSON()))
    }

    result?.activation.forEach(el => {
      if (el.membership_assoc.deforestationReport === null) {
          el.membership_assoc.deforestationReport = 2;
      }
    });

    if (req.headers.lang && req.headers.lang != 'en') {
      resData = req.translateFunction(newData, globalTranslationCache, {
        lvl1: true,
        moduleName: 'user/profile'
      })
    }

    let responseRes = JSON.parse(JSON.stringify(result))
    responseRes.user_roles = JSON.parse(JSON.stringify(resData))

     if(
      (req.user.organization == (process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154)) || 
      (req.user.organization ==  (process.env.INDONESIA_PT_EXPORTER_ID || 228) ||
      (req.user.email == "swphal.thapa+ptsi@outlook.com")
    )
  ) {
    responseRes.themeObj = {
        primary: "#184980",
        secondary: "#184980",
        secondary2light: "#0470E6",
        green2: "#FFF4F0",
      }
  } else if(req.user.organization ==( process.env.KENYA_NACCU_ORG_ID || 239)){
                    responseRes.themeObj = {
                      primary: "#a75300",
                      secondary: "#a75300",
                      secondary2light: "#a75300",
                      green2: "#FFF4F0",
                    }
                  }
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

/**
 * @swagger
 * /user/forgot-password/{type}:
 *   post:
 *     summary: User forgot password.
 *     description: User forgot password..
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: false
 *         schema:
 *           type: Integer
 *         description: email | mobile
 *     requestBody:
 *       description: User forgot password.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example:
 *              {"email": "user@yopmail.com", "mobile": 8793768476 }
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
 *                 example: { "success": true, "code": 200, "message": "OTP sent successfully.", "data": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1MzR9LCJpYXQiOjE2NDg2MzQxOTIsImV4cCI6MTY0ODYzNzc5Mn0.pwYQvwRogJ_efHIESdsaWjuCqUiv9lH8yn5QXYUNZoU" } }
 */

// user forgot password
router.post('/forgot-password/:type', translation, async (req, res) => {
  try {
    let result;
    const { type } = req.params;
    let otp = await createOTP();
    if (otp) {
      let otpArray = otp.toString().split('');
      let translNumber = "";
      otpArray.forEach(obj => {
        if (
          req.headers.lang &&
          req.headers.lang != 'en' &&
          globalTranslationCache[obj]
        ) {
          translNumber += typeof globalTranslationCache[obj][langObj[req.headers.lang]] == "string" ? globalTranslationCache[obj][langObj[req.headers.lang]] : obj;
        } else {
          translNumber += obj;
        }
      })
      otp = translNumber;
    }

    if (type === 'email') {
      const { email, app_type='connected_farmer' } = req.body;
      if (email == undefined)
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: error.BAD_REQUEST,
          })
        );
      // check if user already exist
      let isUserExist = await user.findOne({
        attributes: ['email', 'countryCode', 'id', 'password'],
        where: { email },
        raw: true
      });

      // send error message if user not exist
      if (isUserExist == null) {
        let translMsg = '';
        if (
          req.headers.lang &&
          req.headers.lang != 'en' &&
          globalTranslationCache[error.USER_NOT_EXIST.toLowerCase().replace(/\s/g, '').trim()]
        ) {
          translMsg =
            globalTranslationCache[error.USER_NOT_EXIST.toLowerCase().replace(/\s/g, '').trim()][
            langObj[req.headers.lang]
            ];
        }
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: translMsg ? translMsg : error.USER_NOT_EXIST,
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
      result = await forgot_password.create(userData);
      console.log('result', result);

      // generate oauth token if all goes well
      let oAuthToken = await jwt.sign(
        {
          data: { id: result.id },
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // send mail to the user mail id with otp
      // let info = await sendEmail({
      //   to: email, // list of receivers
      //   subject: 'One Time Pincode', // Subject line
      //   html: `<b>Your OTP is : ${otp}. Please don't share it with anyone.</b>`, // html body
      // });

      try {
        await mailer.sendOtp(email, result.firstName, otp, req.headers.lang);
        return res.json(
          successRespSync({
            msg: success.OTP_SENT,
            data: {
              token: oAuthToken,
            },
          })
        );
      } catch (err) {
        return serverError(res, err);
      }
    } else if (type === 'mobile') {
      const { mobile, app_type='connected_farmer' } = req.body;
      if (mobile == undefined)
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: error.BAD_REQUEST,
          })
        );
      // check if user already exist
      let isUserExist = await user.findOne({
        attributes: ['mobile', 'countryCode', 'id', 'password'],
        where: { mobile: Number(mobile) },
        raw: true
      });

      // send error message if user not exist
      if (isUserExist == null) {
        let translMsg = '';
        if (
          req.headers.lang &&
          req.headers.lang != 'en' &&
          globalTranslationCache[error.USER_NOT_EXIST.toLowerCase().replace(/\s/g, '').trim()]
        ) {
          translMsg =
            globalTranslationCache[error.USER_NOT_EXIST.toLowerCase().replace(/\s/g, '').trim()][
            langObj[req.headers.lang]
            ];
        }
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: translMsg ? translMsg : error.USER_NOT_EXIST,
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
      result = await forgot_password.create(userData);
      console.log('result', result);

      // generate oauth token if all goes well
      let oAuthToken = await jwt.sign(
        {
          data: { id: result.id },
        },
        process.env.JWT_SECRET,
        { expiresIn: 10 * 60 }
      );

      // const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
      //   attributes: [
      //     'device_registration_token'
      //   ],
      //   where: {
      //     userId: userData.userId
      //   }
      // })

      // const firebaseToken = [];

      // for (const device of deviceRegistrationToken) {
      //   firebaseToken.push(device.device_registration_token);
      // }
      // const message = `Your OTP is ${otp}`
      
      // if (firebaseToken.length > 0) {
      //   const response = await sendPushNotification(firebaseToken, message);
      //   if (response.successCount > 0) {
      //     // Success response for push notification
      //     return res.json(
      //       successRespSync({
      //         msg: success.OTP_SENT,
      //         data: {
      //           token: oAuthToken,
      //         },
      //       })
      //     );
      //   }
      // }
      
      // If push notification fails or firebaseToken is not available, send OTP via Twilio SMS
      try {
        if (isUserExist.countryCode == 254 || isUserExist.countryCode == 256 || isUserExist.countryCode == 263) { // 254 is the country code for Kenya
          await sendSMSWithAfricaTalking({
            body: `Your OTP is ${otp}`,
            to: `+${isUserExist.countryCode}${mobile}`,
          });
          return res.json(
            successRespSync({
              msg: success.OTP_SENT,
              data: {
                token: oAuthToken,
              },
            })
          );
        }else {
          try{
            let info = await twilio.messages.create({
              body: `Your OTP is ${otp}`,
              from: process.env.TWILIO_FROM,
              to: `+${isUserExist.countryCode}${mobile}`,
            });
            // Check if SMS is sent or not
            switch (info.status) {
              case 'queued':
                // Success response for SMS
                return res.json(
                  successRespSync({
                    msg: success.OTP_SENT,
                    data: {
                      token: oAuthToken,
                    },
                  })
                );
              case 'failed':
                // Handle failed SMS
                throw new Error('SMS sending failed');
              // You can add more cases to handle other statuses if needed
              default:
                // Handle unexpected status
                throw new Error(`Unexpected SMS status: ${info.status}`);
            }
          } catch(err){

            // this is for organizational OTP support
            return res.json(
              successRespSync({
                msg: success.OTP_SENT,
                data: {
                  token: oAuthToken,
                  warning:  "Cellphone support for your region is not available, please register using e-mail or reach out to us at info@dimitra.io"
                },
              })
            );
          }

        }

      } catch (err) {
        // Error response for failed SMS
        return res.json(
          errorRespSync({
            msg: err.message || "Invalid number!",
            data: {
              // Just for organization OTP.
              token: oAuthToken,
            },
          })
        );
      }
      

    } else {
      return res.json(
        errorRespSync({
          code: error.success.code.OK,
          msg: error.BAD_REQUEST,
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
 * /user/verify-otp/forgot-password:
 *   post:
 *     summary: User forgot password verify OTP.
 *     description: User forgot password verify OTP.
 *     tags: [User]
 *     requestBody:
 *       description: User forgot password.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1MzR9LCJpYXQiOjE2NDg2MzQxOTIsImV4cCI6MTY0ODYzNzc5Mn0.pwYQvwRogJ_efHIESdsaWjuCqUiv9lH8yn5QXYUNZoU", "otp": 8793768476 }
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
 *                 example: { "success": true, "code": 200, "message": "OTP matches successfully.", "data": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTcxfSwiaWF0IjoxNjQ4NjM0NTM2LCJleHAiOjE2NDg2MzU0MzZ9.PbG7SNYJ7DlftjBrbW5l6riQPerfEf07mqk9B4e7PVE" } }
 */

// user forgot password verify OTP
router.post('/verify-otp/forgot-password', translation, async (req, res) => {
  try {
    let result;
    const { token, otp } = req.body;

    try {
      let dbOtp
      let { data } = await jwt.verify(token, process.env.JWT_SECRET);
      // if (data.id == null) {
      //   throw 'Id missing';
      // }

      // return res.send(data);
      result = await forgot_password.findByPk(data.id);
      const userData = await user.findByPk(result.userId);

      let orgRes =  await db.Organization.findOne({
          where: {
              id: userData.organization
          }
      })
      // dbOtp = orgRes.custom_otp || result.otp
      // return res.json(result);
      // let isEqual = await verifyHash(otp.toString(), result.otp);
      let isEqual
      if (userData.otp_channel === 'sms') {
        let countryCode = userData.countryCode.toString()
        if (countryCode.indexOf('+') === -1) {
          countryCode = `+${userData.countryCode}`
        }
        isEqual = await verifyHash(otp.toString(), result?.otp) || (otp.toString() == orgRes?.custom_otp) // check OTP sent in email or org OTP
      } else {
        isEqual = await verifyHash(otp.toString(), result?.otp) || (otp.toString() == orgRes?.custom_otp) // check OTP sent in email or org OTP
      }
      if (!isEqual) {
        let translMsg = '';
        if (
          req.headers.lang &&
          req.headers.lang != 'en' &&
          globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()]
        ) {
          translMsg =
            globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()][
            langObj[req.headers.lang]
            ];
        }
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: translMsg ? translMsg : error.INVALID_OTP,
          })
        );
      }

      // mark user verified
      await userData.set({verified:true}).save();
      // generate token if all goes well
      let oAuthToken = await jwt.sign(
        {
          data: { userId: result.userId },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '900000' }
      );

      // send response
      return res.json(
        successRespSync({
          msg: success.OTP_MATCH,
          data: {
            token: oAuthToken,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.UNAUTHORIZED).json(
        errorRespSync({
          code: error.code.UNAUTHORIZED,
          msg: error.INVALID_OTP,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc User documents related routes
 */

// Get list of all the document uploaded also you can search for the document with name, type, and created date
router.get(
  '/documents',
  auth,
  listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // return res.send("uploading files now");
      const userId = req.user.id;
      const { page, documentName, documentType, createdAt, column, limit } =
        req.body;

      let where = { userId };

      // condition docName
      if (documentName != undefined && documentName != null) {
        where.documentName = {
          [Op.like]: '%' + documentName + '%',
        };
      }

      // condition doctype
      if (documentType != undefined && documentType != null) {
        where.documentType = {
          [Op.like]: '%' + documentType + '%',
        };
      }

      // condition for date
      if (createdAt != undefined && createdAt != null && createdAt.length > 0) {
        where.createdAt = {
          [Op.between]: [
            moment.utc(createdAt).startOf('day'),
            moment.utc(createdAt).endOf('day'),
          ],
        };
      }

      // fetch Data form DB
      var documents = await user_document.findAll({
        attributes: [
          'documentName',
          'documentType',
          'createdAt',
          'updatedAt',
          'id',
          's3Key',
        ],
        where,
        raw: true,
        offset: (page - 1) * limit,
        limit: limit,
        //order: [column ?? ['createdAt', 'DESC']],
      });

      // loop all the documents and generate signed URL for the images
      for (i = 0; i < documents.length; i++) {
        let Key = documents[i]['s3Key'];
        var params = {
          Bucket: process.env.AWS_PRIVATE_BUCKET,
          Key,
        };
        const url = await getSignedURL(params);
        documents[i]['url'] = url;
        delete documents[i]['s3Key'];
      }

      let data = {
        num_rows: documents.length,
        data: documents,
      };
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
  }
);

/**
 * @swagger
 * /user/documents:
 *   put:
 *     summary: Update user document
 *     description: Update user document.
 *     tags: [User-Document]
 *     requestBody:
 *       description: Update user document
 *       required: true
 *       content:
 *         multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                fields:
 *                  type: string
 *                  format: binary
 *                documentType:
 *                  type: string
 *                documentName:
 *                  type: string
 *                id:
 *                  type: integer
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

// Update/Edit user documents
router.put('/documents', auth, fileUpload(params), async (req, res) => {
  try {
    const userId = req.user.id;
    const { documentType, documentName, id } = req.body;

    // check if document with id exist or not
    let document = await user_document.findOne({
      attributes: ['documentName', 'documentType', 'updatedAt', 'id', 's3Key'],
      where: { id },
      raw: true,
    });

    // check if document exist or not
    if (document == null || document == undefined)
      throw new Error(error.DOCUMENT_NOT_EXIST);

    // update following information
    let set = {
      documentType,
      documentName,
    };
    // check if file uploaded or not
    if (req.file != undefined && req.file != null) {
      // get uploaded file information and create some var
      const { key, originalname } = req.file;
      const s3Key = key;
      const fileName = originalname.substring(0, 90);
      const fileNameArr = originalname.split('.');
      const extension = fileNameArr[fileNameArr.length - 1]
        .trim()
        .toLowerCase();
      set.s3Key = s3Key;
      set.fileName = fileName;
      set.extension = extension;
    }

    // update file information in DB
    await user_document.update(set, {
      where: { id, userId },
    });

    // Delete OLD file if file uploaded successfully
    if (req.file != undefined && req.file != null) {
      var param = {
        Bucket: process.env.AWS_PRIVATE_BUCKET,
        Key: document.s3Key,
      };

      const isDeleted = await deleteFileS3(param);
    }

    return res.json(
      successRespSync({
        msg: success.DOC_UPDATED,
        data: {},
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/documents:
 *   post:
 *     summary: Add user document
 *     description: Add user document.
 *     tags: [User-Document]
 *     requestBody:
 *       description: Add user document
 *       required: true
 *       content:
 *         multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                fields:
 *                  type: string
 *                  format: binary
 *                documentType:
 *                  type: string
 *                documentName:
 *                  type: string
 *                id:
 *                  type: integer
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

// Upload/Create user documents
router.post('/documents', auth, fileUpload(params), async (req, res) => {
  try {
    // return res.send("uploading files now");
    const userId = req.user.id;
    const { documentType, documentName, docFor } = req.body;

    // uploading files to S3
    let set = []; // for saving all the file into DB

    // check if any file is uploaded or not
    if (req.files.length <= 0) {
      throw new Error('No file uploaded');
    }
    // for saving all the file into DB
    set = req.files.map((fileInfo, index) => {
      // create some variables
      let fileName = fileInfo.originalname;
      let fileNameArr = fileName.split('.');
      let extension = fileNameArr[fileNameArr.length - 1].trim().toLowerCase();
      fileName = fileName.substring(0, 90);
      const s3Key = fileInfo.key;
      return {
        userId,
        s3Key,
        fileName,
        extension,
        documentType,
        documentName,
        docFor,
      };
    });
    // Insert file information into DB
    let userDocument = await user_document.bulkCreate(set);
    console.log('userDocument', userDocument);

    return res.json(
      successRespSync({
        msg: success.USER_DOC_UPLOADED,
        data: {},
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc Route for verifying email and mobile number
 */
/**
 * @swagger
 * /user/verify-mobile:
 *   post:
 *     summary: Verify mobile.
 *     description: Verify mobile..
 *     tags: [User]
 *     requestBody:
 *       description: Verify mobile.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mobile:
 *                  type: string
 *                country:
 *                  type: string
 *            example:
 *              {mobile: "984712314", country: "+977"}
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

// Send OTP to user mobile for updating mobile number
router.post('/verify-mobile', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const {mobile, country} = req.body

    let hasMobile = await user.findOne({
      where: { id },
    });

    //user doesnt have existing mobile
    if(!(hasMobile?.unverifiedMobile)) {
      if(!mobile || !country) {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: `mobile and country are required `,
          })
        );
      }
          // check if user exist with this mobile number
          const userAlreadyExist = await user.findOne({
            where: { mobile },
          });
          // send response if user alredy exist
          if (userAlreadyExist) {
            return res.json(
              errorRespSync({
                code: success.code.OK,
                msg: `User Already Exist with mobile number ${mobile} `,
              })
            );
          }
                // mark user verified
         let updateRes = await user.update({unverifiedMobile: mobile}, {where: {id: req.user.id}})


         try {
          let info = await sendTwilioSMS({
            to: `+${country}${mobile}`,
          })

            return res.json(
              successRespSync({
                msg: success.OTP_SENT,
              })
            );
         } catch (err) {
          err.message = "Cellphone support for your region is not available, please register using e-mail or reach out to us at info@dimitra.io"
          return serverError(res, err);
         }
  

    } else { // user has existing mobile
       // get user's unverified mobile number
        const { unverifiedMobile, countryCode } = await user.findOne({
          attributes: ['unverifiedMobile', 'countryCode', 'mobile', 'id'],
          where: { id },
        });


        if (unverifiedMobile === null) {
          return res.json(
            errorRespSync({
              code: success.code.OK,
              msg: error.UNVERIFIED_MOBILE_NOT_AVAILABLE,
            })
          );
        }

        if (countryCode === null) {
          return res.json(
            errorRespSync({
              code: success.code.OK,
              msg: error.COUNTRY_CODE_NOT_AVAILABLE,
            })
          );
        }

        // check if user exist with this mobile number
        const userAlreadyExist = await user.findOne({
          attributes: ['unverifiedMobile', 'mobile', 'id'],
          where: { mobile: unverifiedMobile },
        });
        // send response if user alredy exist
        if (userAlreadyExist != null) {
          return res.json(
            errorRespSync({
              code: success.code.OK,
              msg: `User Already Exist with mobile number ${unverifiedMobile} `,
            })
          );
        }



        // send OTP in user mobile number for verification
        try {

          let info = await sendTwilioSMS({
            to: `+${countryCode}${unverifiedMobile}`,
          })

            return res.json(
              successRespSync({
                msg: success.OTP_SENT,
              })
            );
          // }
        } catch (err) {
          err.message = "Cellphone support for your region is not available, please register using e-mail or reach out to us at info@dimitra.io"
          return serverError(res, err);
        }
    }

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/verify-mobile:
 *   put:
 *     summary: Verify OTP for updating mobile number.
 *     description: Verify OTP for updating mobile number..
 *     tags: [User]
 *     requestBody:
 *       description: Verify OTP for updating mobile number.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "otp": 234343 }
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
 *                 example: { "success": true, "code": 200, "message": "OTP sent successfully.", "data": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1MzR9LCJpYXQiOjE2NDg2MzQxOTIsImV4cCI6MTY0ODYzNzc5Mn0.pwYQvwRogJ_efHIESdsaWjuCqUiv9lH8yn5QXYUNZoU" } }
 */

// verify OTP for updating mobile number
router.put('/verify-mobile', auth, translation, async (req, res) => {
  try {
    const id = req.user.id;
    let isEqual
    const { otp } = req.body;
      // get user's unverified mobile number
      const userData = await user.findOne({
        attributes: ['otp', 'unverifiedMobile', 'id', 'countryCode'],
        where: { id },
      });
    if (!otp) return res.json(
      errorRespSync({ code: success.code.OK, msg: error.INVALID_OTP })
    );

    //org OTP
    const data = await db.Organization.findOne({ 
      where: { id: req.user.organization },
      attributes: ['custom_otp']
    })
    if (data.dataValues.custom_otp && ((data.dataValues.custom_otp).toString() == otp.toString())) {
      isEqual = true;
        // update user mobile
    let set = {
      mobile: userData.unverifiedMobile,
      unverifiedMobile: null,
    };

    await user.update(set, { where: { id } });
      res.json(
        successRespSync({
          msg: success.MOBILE_VERIFIED,
        })
      );
    }
  

    // check if unverifiedMobile is not empty
    if (
      userData.unverifiedMobile == null ||
      userData.unverifiedMobile == undefined
    ) {
      return res.json(
        errorRespSync({ code: success.code.OK, msg: error.ALREADY_VERIFIED })
      );
    }

    // check if otp is correct or not
    // const isEqual = await verifyHash(otp.toString(), otpHash);
    let countryCode = userData.countryCode.toString()
    if (countryCode.indexOf('+') === -1) {
      countryCode = `+${userData.countryCode}`
    }
     isEqual = await verifyTwilioSMS({
      to: `${countryCode}${userData.unverifiedMobile}`,
      code: otp
    })
    if (!isEqual) {
      let translMsg = '';
      if (
        req.headers.lang &&
        req.headers.lang != 'en' &&
        globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()]
      ) {
        translMsg =
          globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()][
          langObj[req.headers.lang]
          ];
      }
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: translMsg ? translMsg : error.INVALID_OTP,
        })
      );
    }
    // update user mobile
    var set = {
      mobile: userData.unverifiedMobile,
      unverifiedMobile: null,
    };

    await user.update(set, { where: { id } });

    // send response
    res.json(
      successRespSync({
        msg: success.MOBILE_VERIFIED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/verify-email:
 *   post:
 *     summary: Send OTP to user email for updating email.
 *     description:  Send OTP to user email for updating email.
 *     tags: [User]
 *     requestBody:
 *       description: Send OTP to user email for updating email.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {}
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

// Send OTP to user email for updating email
router.post('/verify-email', auth, async (req, res) => {
  try {
    const id = req.user.id;
    // get user's unverified mobile number
    const { unverifiedEmail, firstName } = await user.findOne({
      attributes: ['firstName', 'unverifiedEmail', 'email', 'id'],
      where: { id },
    });

    if (unverifiedEmail === null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: error.UNVERIFIED_EMAIL_NOT_AVAILABLE,
        })
      );
    }


    // check if user exist with this email
    const userAlreadyExist = await user.findOne({
      attributes: ['unverifiedEmail', 'email', 'id'],
      where: { email: unverifiedEmail, },
    });
    // send response if user alredy exist
    if (userAlreadyExist != null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: error.EMAIL_EXIST_ALREADY,
        })
      );
    }

    // generate OTP
    const otp = await createOTP();
    const otpHash = await createOtpHash(otp.toString());
    // generate signed OTP
    let signedOTP = await jwt.sign(
      {
        data: { otpHash, update: 'email' },
      },
      process.env.JWT_SECRET,
      { expiresIn: 10 * 60 }
    );

    // update OTP into DB
    await user.update({ otp: signedOTP }, { where: { id } });

    // send OTP in user mobile email for verification
    try {
      await mailer.sendSignupOtp(unverifiedEmail, firstName, otp, req.headers.lang);
      return res.json(
        successRespSync({
          msg: success.OTP_SENT,
        })
      );
    } catch (err) {
      return serverError(res, err);
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/verify-email:
 *   put:
 *     summary: Verify OTP for updating email.
 *     description: Verify OTP for updating email.
 *     tags: [User]
 *     requestBody:
 *       description: Verify OTP for updating email.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "otp":235465 }
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
// verify OTP for updating email
router.put('/verify-email', auth, translation, async (req, res) => {
  try {
    const id = req.user.id;
    const { otp } = req.body;
    if (!otp) return res.json(
      errorRespSync({ code: success.code.OK, msg: error.INVALID_OTP })
    );
    // get user's unverified email
    const userData = await user.findOne({
      attributes: ['otp', 'unverifiedEmail', 'id'],
      where: { id },
    });

    // check if unverifiedEmail is not empty
    if (
      userData.unverifiedEmail == null ||
      userData.unverifiedEmail == undefined
    ) {
      return res.json(
        errorRespSync({ code: success.code.OK, msg: error.ALREADY_VERIFIED })
      );
    }

    // verify JWT
    try {
      var decoded = await jwt.verify(userData.otp, process.env.JWT_SECRET);
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.json(
        errorRespSync({ code: success.code.OK, msg: error.OTP_EXPIRE })
      );
    }
    // decoded Data
    const { otpHash, update } = decoded.data;

    // check if otp is for updating email or mobile
    if (update != 'email') {
      let translMsg = '';
      if (
        req.headers.lang &&
        req.headers.lang != 'en' &&
        globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()]
      ) {
        translMsg =
          globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()][
          langObj[req.headers.lang]
          ];
      }
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: translMsg ? translMsg : error.INVALID_OTP,
        })
      );
    }
    // check if otp is correct or not
    const isEqual = await verifyHash(otp.toString(), otpHash);
    if (!isEqual) {
      let translMsg = '';
      if (
        req.headers.lang &&
        req.headers.lang != 'en' &&
        globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()]
      ) {
        translMsg =
          globalTranslationCache[error.INVALID_OTP.toLowerCase().replace(/\s/g, '').trim()][
          langObj[req.headers.lang]
          ];
      }
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: translMsg ? translMsg : error.INVALID_OTP,
        })
      );
    }
    // update user email
    var set = {
      email: userData.unverifiedEmail,
      unverifiedEmail: null,
    };
    await user.update(set, { where: { id } });

    res.json(
      successRespSync({
        msg: success.EMAIL_VERIFIED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// get user deviceId and FCM Token

router.post('/registerUserToken', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const { registrationToken, deviceId } = req.body;

    let reqFields = [
      'registrationToken',
      'deviceId'
    ];

    let msg = null;
    reqFields.forEach(async function (field) {
      if (!req.body[field]) {
        msg = field + ' is required';
        return;
      }
    });

    if (msg) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: msg,
        })
      );
    }

    // check if token is already present
    let tokenExists = await UserRegistrationToken.findOne({
      attributes: [
        "id"
      ],
      where: {
        userId: id,
        device_id: deviceId
      }
    });
    // console.log(tokenExists, 'tokenExists')
    if (tokenExists !== null) {
      let response = await UserRegistrationToken.update({
        userId: id,
        device_registration_token: registrationToken,
        device_id: deviceId
      }, {
        where: {
          userId: id,
          device_id: deviceId
        },
      });
      return res.json(
        await successRespSync({
          msg: 'FCM Token Successfully Updated',
          data: response,
        })
      );
    } else {
      let response = await UserRegistrationToken.create({
        userId: id,
        device_registration_token: registrationToken,
        device_id: deviceId
      });
      // console.log(response)
      if (response) {
        res.json(
          await successRespSync({
            msg: 'FCM Token Successfully Registered',
            data: {
              ...response.dataValues
            },
          })
        );
      }
    }


  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

router.get('/getUserRegistrationToken', auth, async (req, res) => {
  try {
    const { id } = req.user;

    // fetch user profile information
    let result = await UserRegistrationToken.findOne({
      attributes: [
        'id',
        'userId',
        'device_registration_token',
        'device_id'
      ],
      where: { userId: id },
    });

    if (result == null) {
      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: 'FCM Token not found',
        })
      );
    }

    // send response
    if (result) {
      return res.json(
        successRespSync({
          msg: 'FCM Token fetched',
          data: result,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
})

router.put('/updateUserRegistrationToken', auth, async (req, res) => {
  try {
    const { id } = req.user
    const { registrationToken } = req.body

    let result = await UserRegistrationToken.update(
      { device_registration_token: registrationToken },
      {
        where: {
          userId: id
        }
      }
    );
    if (result) {
      let data = await UserRegistrationToken.findOne({
        attributes: [
          'id',
          'userId',
          'device_registration_token',
          'device_id'
        ],
        where: { userId: id },
      });
      return res.json(
        successRespSync({
          msg: 'FCM Token Updated',
          data,
        })
      )
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
})

/**
* @swagger
* /user/getMembershipPlans:
*   get:
*     summary: API for getting user membership plans list.
*     description: API for getting user membership plans list.
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
*                 example: { "success": true, "code": 200, "message": "User membership plans fetched", "data": [ { "id": 1, "membership_id": 10, "user_id": 246, "createdAt": "2022-05-13T05:07:18.000Z", "updatedAt": "2022-05-13T05:07:18.000Z", "membership": { "id": 10, "membership_type": "Basic", "satellite_report": 0, "advanced_report": 0, "membership_duration": 1, "membership_duration_in_days": 0, "membership_duration_unit": "month(s)", "membership_fee": 10, "default_status": false, "description": "Basic membership", "createdAt": "2022-05-17T22:26:09.000Z", "updatedAt": "2022-07-11T01:21:51.000Z", "user_role_id": "farmer", "org_id": null, "plan_type": "enterprise" } } ] }
*/
router.get('/getMembershipPlans', auth, async (req, res) => {
  try {
    const { id } = req.user;

    // fetch user profile information
    let result = await db.UserMembershipMap.findAll({

      where: { user_id: id },
      include: [
        {
          model: db.Membership, as: 'membership',
          include: [
            {
              model: db.Organization,
              as: "org_assoc"
            }
          ]
        }
      ]
    });

    const getAllRoles = await db.activationKeys.findAll({
      attributes: ["membershipValidity"],
      where: { user_id: id, is_deleted: 0 },
      include: [
        {
          model: db.Membership,
          as: "membership_assoc",
          // through: { model: db.UserMembershipMap, attributes: [] },
          include: [
            {
              model: db.Organization,
              as: "org_assoc"
            }
          ]
        },
      ]
    });
    // send response
    if (result) {
      return res.json(
        successRespSync({
          msg: 'User membership plans fetched',
          data: getAllRoles,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
})


/**
* @swagger
* /user/userRole:
*   get:
*     summary: API for getting user-role list.
*     description: API for getting user-role list.
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
*                 example: { "success": true, "code": 200, "message": "User roles fetched", "data": [ { "id": "buying_station", "name": "Buying Station", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, { "id": "dry_milling", "name": "Dry Milling", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, { "id": "farmer", "name": "Farmer", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" } ] }
*/
router.get("/userRole", translation, async (req, res) => {
  try {

    let userRoleRes = await db.UserRole.findAll(
      {
        where: {
          isDeleted: {
            [db.Sequelize.Op.is]: null
          }
        },
      }
    )
    if (req.headers.lang && req.headers.lang != 'en') {
      userRoleRes = req.translateFunction(userRoleRes, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      })
    }
    return res.json(
      successRespSync({
        msg: "User roles fetched",
        data: userRoleRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }

})

//Deactive/Delete User Account

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: API for deleting user account
 *     description: API for deleting user account.
 *     tags: [User]
 *     requestBody:
 *       description: description for deleting the account.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "reason":"Privacy Concerns",
 *                "details":"Details Here"   }
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
 *                 example: { "success": true, "code": 200, "message": "User Deleted succesfully","data": {}}
 */
router.delete("/", auth, userDeleteValidation(), validationErrorHandler, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { reason, details } = req.body;

    const checkUserExists = await db.user.findOne({
      where: { id: userId },
    });

    // send response if user doesnt exist
    if (checkUserExists == null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: error.USER_NOT_EXIST,
        })
      );
    }

    // update user
    await db.user.update({ active: 0, email: null, mobile: null }, { where: { id: userId } });
    await db.activationKeys.update({ status: 'unassigned', user_email: null, user_id: null, phone_no: null, is_deleted: 1  } ,{ where: { user_id: userId }});
    await db.UserMembershipMap.destroy({
      where: {
        user_id: userId
      }
    })


    await db.UserDeativationDetails.create({
      userId,
      reason,
      details,
    });

    return res.json(
      successRespSync({
        msg: success.USER_DELETED,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /user/membershipValidity:
 *   get:
 *     summary: API for getting user's membership valid date.
 *     description: API for getting user's membership valid date.
 *     tags: [User]
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
 *                 example: { "success": true, "code": 200, "message": "Membership Validation Fetched","data": {"user_id": 123127, "membership_valid_untill": "Mon Nov 21 2022 00:00:00 GMT+0545 (Nepal Time)"}}
 */
router.get("/membershipValidity", auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    let activationDetails = await db.activationKeys.findOne({ where: { user_id: userId } });

    if (activationDetails == null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: "Membership Not Found",
        })
      );
    }

    let membership_validity = new Date(activationDetails.membershipValidity);
    membership_validity = membership_validity.toString();

    const responseData = {
      "user_id": activationDetails.user_id,
      "membership_valid_untill": membership_validity
    }

    return res.json(
      successRespSync({
        msg: "Membership validation fetched",
        data: responseData,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});


router.post("/userAlreadyExists", translation, async (req, res) => {
  try {
    const { mobile, email, password, org_id } = req.body;
    let resObj = {}, validPassword = [], userExists = false, resMsg = '', translMsg = ''

    if (mobile) {
      userExists = await db.user.findOne({
        where: {
          mobile,
          verified: 1
        }
      })

    } else if (email) {
      userExists = await db.user.findOne({
        where: {
          email,
          verified: 1
        }
      })
    }
    if(userExists?.source == "cf_bulk_upload") {
      resObj.userExists = false
      resMsg = req.translateFunction({
        msg: "User doesn't exist."
      }, globalTranslationCache, {
        lvl1: true,
        moduleName: "error"
      }).msg;
    }
    else if (userExists) {
      resObj.userExists = true
      resMsg = req.translateFunction({ msg: `User already exist with this ${(email && 'email') || (mobile && 'mobile number')}`},
        globalTranslationCache, {
          lvl1: true,
          moduleName: "error"
        }
      ).msg;
    } else {
      resObj.userExists = false
      resMsg = req.translateFunction({
        msg: "User doesn't exist."
      }, globalTranslationCache, {
        lvl1: true,
        moduleName: "error"
      }).msg;
    }

    if (password) {
      lang = req.headers.lang;
      validPassword = await validatePasswordHelper(password, org_id)

      if (validPassword.length > 0) {
        resObj.validPassword = validPassword
      } else {
        resObj.validPassword = []
      }
    }

    if (
      req.headers.lang &&
      req.headers.lang != 'en' &&
      globalTranslationCache[resMsg.toLowerCase().replace(/\s/g, '').trim()]
    ) {
      translMsg =
        globalTranslationCache[resMsg.toLowerCase().replace(/\s/g, '').trim()][
        langObj[req.headers.lang]
        ];
    } else {
      translMsg = resMsg
    }

    return res.json(
      {
        success: true,
        code: 200,
        message: translMsg,
        data: resObj
      }
    );


  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/testPushNotification", async (req, res) => {
  try {
    const message = `Your OTP is 1234`
    const firebaseToken = 'cdgRuXvzRMexjNPe4Qok-W:APA91bF1zIHy08Ld0kD9ygMDnkaUGAoWvMdF9dEyoKfWj4ZlFxjxOzJmwOnnKknWr8sN-q2vdi-BkN3mYw4QRAKw00LxAhIB8tgLCsHhlQ0NfhEXyElF4DNxlp8_Cn0JJV-3nFYrN8GS'
    const firebaseTokenArr = []
    firebaseTokenArr.push(firebaseToken)
    const response = await sendPushNotification(firebaseTokenArr, message)
    console.log(response, 'response')
    if (response.successCount > 0) {
      return res.json(
        {
          success: true,
          code: 200,
          message: "Push Notification sent.",
        }
      )
    } else {
      const errMsg = response.responses.find(item => !item.success)
      return res.json(
        {
          success: false,
          code: 200,
          message: errMsg[0].error,
        }
      )
    }
  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/testSendSMS", async (req, res) => {
  try {
    const response = await sendTwilioSMS({
      to: '+919619970631'
    })
    if (response && response.status === 'pending') {
      return res.json(
        {
          success: true,
          code: 200,
          message: "OTP sent successfully.",
        })
    }
  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/testVerifySMS", async (req, res) => {
  try {
    const { to, code } = req.body
    const response = await verifyTwilioSMS({
      to,
      code
    })
    if (response) {
      return res.json(
        {
          success: true,
          code: 200,
          message: "OTP verified successfully.",
        })
    } else {
      return res.json(
        {
          success: false,
          code: 401,
          message: "OTP verification failed.",
        }
      )
    }
  } catch (error) {
    return serverError(res, error);
  }
});

router.post(
  '/pre-register',
  preRegisterUserValidation(),
  validationErrorHandler,
  translationMiddleware,
  async (req, res) => {
    try {
      let {
        firstName,
        middleName,
        lastName,
        email,
        countryCode,
        mobile,
        countryId,
        countryIsoCode,
        permissionToContact = 0,
        // organizationCode,
        // resendOTP = false,
      } = req.body;

      const organization = (
        await validateIfOrganizationExists(
          process.env.DIMITRA_ORG_STR || 'dimitra'
        )
      )?.id;

      const country = countries.find(item => item.code === countryIsoCode) 

      const set = {
        firstName,
        middleName,
        lastName,
        email,
        countryCode,
        mobile,
        countryId,
        country: country?.name ?? null,
        countryIsoCode,
        organization,
        permissionToContact,
        preRegistrationStatus: 'inprogress',
        preRegistrationToken: randomSting(),
        source: 'saas_api_pre_registration'
      };

      // basic/required validation
      if (_.isEmpty(email)) throw new Error('Email is must');
      const userEmail = await db.user.findOne({
        where: {
          email,
        },
      });
      if (userEmail !== null) throw new Error('User already registered');

      if (!_.isEmpty(mobile)) {
        const userMobile = await db.user.findOne({
          where: {
            mobile,
          },
        });
        if (userMobile !== null) throw new Error('User already registered');
      }

      await db.user.create(set);

      mailer.renderAndSend(
        email,
        { baseUrl: req.headers.host, name: firstName },
        '/users/pre-registration-thankyou.html',
        'Pre Registration Success'
      );

      return res.json(
        successRespSync({
          msg: success.PRE_REGISTERD,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  '/pre-register/set-password/:preRegistrationToken',
  preRegisterSetPassword(),
  validationErrorHandler,
  translationMiddleware,
  async (req, res) => {
    try {
      let { preRegistrationToken } = req.params;
      let {
        password,
        confirmPassword,
      } = req.body;

      const organization = (
        await validateIfOrganizationExists(
          process.env.DIMITRA_ORG_STR || 'dimitra'
        )
      )?.id;

      const user = await db.user.findOne({
        where: {
          preRegistrationToken,
        },
      });
      if (user == null) throw new Error("User doesn't exist");
      const hasErrors = await validatePasswordHelper(password);
      if (hasErrors.length > 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: hasErrors[0],
          })
        );
      }
      if (password != confirmPassword) throw new Error('Password and confirm password are not same');

      const passwordHash = await createPassword(password);
      await db.user.update({
        password: passwordHash,
        preRegistrationStatus: 'complete',

      }, {
        where: {
          id: user.id
        }
      });

      return res.json(
        successRespSync({
          msg: success.PASSWORD_CREATED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/pre-register/send-email/set-password',
  async (req, res) => {
    try {
      const users = await db.user.findAll({
        raw: true,
        attributes: ['id', 'firstName', 'email', 'preRegistrationToken'],
        where: {
          preRegistrationStatus: 'inprogress',
        },
      });
      // console.log(users);return;
      if (users) {
        emailSendQueue.add({ preRegistrationData: users, host: req.headers.host }, { jobId: '' });
      }
      return res.json(
        successRespSync({
          msg: "success",
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  '/livestock/send-otp/:type',
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { type } = req.params; 

      if(type == 'email') {
        const userWithEmail = await db.user.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (userWithEmail !== null) throw new Error('User already registered with this email');
      }

      if(type === 'mobile') {
        const userWithMobile = await db.user.findOne({
          where: {
            mobile: req.body.mobile,
            countryCode: req.body.countryCode,
          },
        });
        if (userWithMobile !== null) throw new Error('User already registered with this mobile');
      }
  
      let otp = await createOTP();
      if (otp) {
        let otpArray = otp.toString().split('');
        let translNumber = "";
        otpArray.forEach(obj => {
          if (
            req.headers.lang &&
            req.headers.lang != 'en' &&
            globalTranslationCache[obj]
          ) {
            translNumber += typeof globalTranslationCache[obj][langObj[req.headers.lang]] == "string" ? globalTranslationCache[obj][langObj[req.headers.lang]] : obj;
          } else {
            translNumber += obj;
          }
        })
        otp = translNumber;
      }

      const otpHash = await createOtpHash(otp.toString());
      let query = { id: req.user.id };
      let userData = {
          otp: otpHash,
      };
      if(type === 'email' || type === 'mobile') {
        if (type === 'email') {
          try {
            const { email, firstName } = req.body;
            await mailer.sendOtp(email, firstName, otp, req.headers.lang);
          } catch (e) {
            let translMsg = '';
            if (
              req.headers.lang &&
              req.headers.lang != 'en' &&
              globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()]
            ) {
              translMsg =
                globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()][
                langObj[req.headers.lang]
                ];
            }
            return res.json(
              errorRespSync({
                code: error.code.UNPROCESSABLE_ENTITY,
                msg: translMsg ? translMsg : error.INVALID_EMAIL,
              })
            );
          }
        } else {
          try {
            const { mobile, countryCode } = req.body;
            await sendTwilioSMS({
              to: `+${countryCode}${mobile}`
            })
          } catch (err) {
            err.message = "Cellphone support for your region is not available, please register using e-mail or reach out to us at info@dimitra.io"
            return serverError(res, err);
          }
        }
        result = await user.update(userData, { where: query });
  
        return res.json(
          successRespSync({
            msg: success.OTP_SENT,
          })
        );
      } else {
        return serverError(res);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  '/livestock/verify-otp',
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    const { credential, type, otp } = req.body;

    try {
      let query = { id: req.user.id };
      const user = await db.user.findOne({
        where: query,
      });

      if (user == null) throw new Error("User doesn't exist");

      let isEqual = false;
      if (type === 'mobile') {
        isEqual = await verifyTwilioSMS({
          to: credential,
          code: otp
        })
      } else if(type === 'email'){
        isEqual = await verifyHash(otp.toString(), user.otp);
      }

      if (!isEqual) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: error.INVALID_OTP,
          })
        );
      }

      return res.json(
        successRespSync({
          msg: success.OTP_VERIFIED,
        })
      );
    }
    catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
)

router.post(
  '/fb-data-deletion',
  auth,
  validationErrorHandler,
  async (req, res) => {

    const APP_SECRET = process.env.FB_SDK_SECRET || "16c370e5ee42c71c1135fe0738e5cc37"
    try {
      const signedRequest = req.body.signed_request;

      if (!signedRequest) {
        return res.status(400).send('Bad request: No signed request found');
      }
    
      const [signature, payload] = signedRequest.split('.');
    
      // Verify the signature
      const expectedSignature = crypto.createHmac('sha256', APP_SECRET)
                                      .update(payload)
                                      .digest('base64')
                                      .replace(/\+/g, '-')
                                      .replace(/\//g, '_')
                                      .replace(/=+$/, '');
    
      if (signature !== expectedSignature) {
        return res.status(401).send('Invalid signature');
      }
    
      // Decode the base64 payload
      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    
      // Process the deletion request (e.g., delete user data from your database)
      const userId = decodedPayload.user_id;
      console.log(`Received data deletion request for user: ${userId}`);
    
      // Here you would delete the user's data from your system (if applicable)
    
      // Respond with the confirmation URL (optional tracking link)
      res.json({
        url: `https://sass-api-prod.dimitra.dev/api/user/deletion-status?user_id=${userId}`,  // URL where the user can track the deletion status
        confirmation_code: userId  // Unique identifier for the request
      });
    }
    catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
)

router.get("/deletion-status", async (req, res) => {
  let {userId} = req.query
  res.json({
    msg: `Deletion request successful for user ${userId}`
  })
})

module.exports = router;
