const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../models');
const { user, UserRegistrationToken } = require(rootPath + '/models');
const { loginValidation } = require(rootPath + '/helpers/validation');
const { getUserMemberships, getUserPermissions, getUserRoles, getUserPermissionsByMemberships } = require(rootPath + '/helpers/controller/user-permissions');
const { 
  createPassword,
  createOtpHash,
  verifyHash,
 } = require(rootPath + '/helpers/hash');
const { capitalizeFirstLetter } = require(rootPath + '/helpers/utils');
const axios = require("axios")
const mailer = require(rootPath + '/components/mailer');
const ejs = require('ejs');
const path = require("path");
const {
  serverError,
  successResp,
  errorResp,
  errorRespSync,
  successRespSync,
} = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const { 
  createOTP,
  fileFilterGen,
  sendSMS,
  sendTwilioSMS,
  verifyTwilioSMS,
  logErrorOccurred,
  validateMobileNumber,
 } = require(rootPath + '/helpers/general'); // constant messages
// loading middleware
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + "/middleware/translation");
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const moment = require('moment');
const {langObj } = require('../../helpers/consts');
const Queue = require('bull');

const { sendLoginError } = require(rootPath + '/helpers/report_login_error')

router.use('/v2', require("./v2/index"));
router.use('/', require("./sso/index"));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: API for login
 *     description: API for login.
 *     tags: [Authentication]
 *     requestBody:
 *       description: Request body for login
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"credential":"abc@yopmail.com","password":"User@123"}
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
 *                 example: {"success": true,"code": 200,"message": "Logged in successfully.","data": {"email": "user@yopmail.com","mobile": null,"firstName": null,"lastName": null,"verified": true,"id": 171,"user_organization": null,"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTcxfSwiaWF0IjoxNjQ3MDE2ODE2LCJleHAiOjE2NDcwMTc0MTZ9.LZsbVRybom07aMh5zddifktg4XF7geJJ9MzIjunKj7E","refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTcxLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJblZ6WlhKSlpDSTZNVGN4ZlN3aWFXRjBJam94TmpRM01ERTJPREUyTENKbGVIQWlPakUyTkRjd01UYzBNVFo5Lkxac2JWUnlib20wN2FNaDV6ZGRpZmt0ZzRYRjdnZUpKOU16SWp1bktqN0UifSwiaWF0IjoxNjQ3MDE2ODE2LCJleHAiOjE2Nzg1NTI4MTZ9.zmoDdoL6z0x2GJxVZkbWPVzPlUigzP1G3A2pRxPU-KI"}}
 *
 */

// user login
router.post(
  '/login',
  translation,
  loginValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let adminUserRoles // this is for lgcloud login
      const { credential, password, source = 'CF', sso } = req.body;
      // get user data
      let userData = await user.findOne({
        attributes: [
          'email',
          'mobile',
          'countryCode',
          'firstName',
          'language',
          'middleName',
          'lastName',
          'password',
          'verified',
          'active',
          'id',
          'loginAttempts',
          'lockedToken',
          'createdAt',
          'synced',
          'isFirstLogin',
          "dimitraUserId"
        ],
        where: {
          [Op.or]: [{ email: credential }, { mobile: credential }],
        },
        include: [
          {
            model: db.Organization,
            as: 'user_organization',
            attributes: ['id', 'name', 'logo', 'splashScreen','is_logo_hide', 'is_splash_hide'],
          },

          // {
          //   model: db.Roles,
          //   as: 'user_role_assoc',
          //   where:{ role_type: 'app_user' },
          //   required: true
          // },
        ],
        order: [ [ 'createdAt', 'DESC' ]]
      });

      let message
      // check if user is verified or not
      if (userData == null || userData == undefined) {
        //  message = req.translateFunction({name:error.USER_NOT_EXIST}, globalTranslationCache, {
        //             lvl1: true,
        //             lvl2: false
        //           });
        // return res.json(
        //   await errorResp({
        //     code: success.code.OK,
        //     msg: message.name
        //   })
        // );
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

      if(userData) {
        let result = []
        adminUserRoles = await db.AdminUserRoles.findAll({
          where: {
            user_id: userData.id,
          },
          include: [
            {
              model: db.Roles,
              as: "roles",
            },
          ],
          raw: true,
        });
        // if(result.length > 0) {
        //     let message = req.translateFunction({name:error.USER_NOT_EXIST}, globalTranslationCache, {
        //               lvl1: true,
        //               lvl2: false
        //             });
        //   return res.json(
        //     await errorResp({
        //       code: success.code.OK,
        //       msg: message.name
        //     })
        //   );
        // }
      }

      // check if user is verified or not, then send OTP if not verified
      let otp = await createOTP();
      const otpHash = await createOtpHash(otp.toString());
      // await db.user.update({ otp: otpHash }, { where: { id: userData.id } });
      let otpChannel
      if (!userData.verified) {
        message = req.translateFunction({name:error.USER_NOT_VERIFIED}, globalTranslationCache, {
          lvl1: true,
          lvl2: false
        });

        if(userData.email) {
          otpChannel = 'email'
           mailer.sendOtp(userData.email, userData.firstName, otp, req.headers.lang);
        } else if(userData.mobile) {
          otpChannel = 'sms'

          const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
            attributes: [
              'device_registration_token'
            ],
            where: {
              userId: userData.id
            }
          })
          if (deviceRegistrationToken.length > 0) {
            const message = `Your OTP is ${otp}`
            otpChannel = 'push_notification'
            const firebaseTokenArr = []
            firebaseTokenArr.push(deviceRegistrationToken[0].device_registration_token)
            await sendPushNotification(firebaseTokenArr, message)
          } else {
            otpChannel = 'sms'
            await sendTwilioSMS({
              to: `+${userData.countryCode}${userData.mobile}`
            })
          }
        }
        return res.json(
          await errorResp({
            code: error.code.USER_NOT_VERIFIED,
            msg: message.name,
            module: 'login'
          })
        );
      }
      if (!userData.active) {
        message = req.translateFunction({name:error.USER_DEACTIVATED}, globalTranslationCache, {
          lvl1: true,
          lvl2: false
        });
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: message.name
          })
        );
      }

      // check if user is active/locked or not
      if (userData.lockedToken) {
        try {
          let decoded = jwt.verify(userData.lockedToken, process.env.ACCESS_TOKEN_SECRET)
          const msg = `Account Locked. Please try again in ${((parseInt((decoded.exp * 1000) - (new Date().getTime()))) / 60000).toFixed()} mins`;
          return res.json(
            await errorResp({
              code: success.code.OK,
              msg,
            })
          );
        } catch (error) {
          await userData.update({lockedToken: null})
        }

      }

      // verify password
      let isEqual = false
      if(sso) {
        isEqual = true
      } else {
        isEqual = await verifyHash(password, userData.password);
      }

      let authSettings = {}
      let authSettingsRes = []
      authSettingsRes = await db.ProfileAuthenticationSettings.findAll({})
      if(authSettingsRes.length > 0){
        authSettings = authSettingsRes[0]
      }

      // check if password is correct or not
      if (!isEqual) {
        if(userData.dataValues.loginAttempts) { // has loginAttempts jwt
          try {
            let decoded = jwt.verify(userData.dataValues.loginAttempts, process.env.ACCESS_TOKEN_SECRET)
            let remainingAttemptTime =  parseInt((decoded.exp * 1000) - (new Date().getTime()))

            if(decoded.attemptNo === authSettings.unsuccessful_login_attempts_value){
              // no login attempts left lock user
              if(!userData.lockedToken) {
                await insertLockedToken(`${parseInt(authSettings.unsuccessful_login_lockout_value * 60000)}ms`, userData)
              }
              return res.json(
                await errorResp({
                  code: success.code.OK,
                  msg: error.USER_LOCKED,
                })
              );

            } else  {
              let attemptNo = decoded.attemptNo + 1
              await insertLoginAttemptsJwt(attemptNo, `${parseInt(remainingAttemptTime)}ms`, userData)
            }

          } catch (error) {
              // loginAttempts time expire, start new login attempts timer
              console.log(error)
              await insertLoginAttemptsJwt(1, `${1 * 60 *60 * 1000}ms`, userData)
          }
        } else { // doesnt have loginAttempts jwt
          let loginAttemptsUpdate = await insertLoginAttemptsJwt(1, `${1 * 60 *60 * 1000}ms`, userData) // 1 hour expiry time
          // console.log(loginAttemptsUpdate)
        }
        message = req.translateFunction({name:error.INVALID_CREDENTIAL}, globalTranslationCache, {
          lvl1: true,
          lvl2: false
        });
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: message.name
          })
        );
      }

      // mark user login into DB
      // await user.update({ isLogin: 1, loginAttempts: null, lockedToken: null }, { where: { id: userData.id } });

      // generate access token if all goes well
      let accesstoken = await jwt.sign(
        {
          data: { userId: userData.id, source },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // { expiresIn: `${authSettings.auto_log_off_value * 60000}ms` || process.env.ACCESS_TOKEN_EXPIRY }
      );
      console.log('Token is signed for : ', process.env.ACCESS_TOKEN_EXPIRY);
      // generate refresh token if all goes well
      let refreshtoken = await jwt.sign(
        {
          data: { userId: userData.id, token: accesstoken, source },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '365d' }
      );

      // get user menus and user permissions based on roles
      let userMenus = {}
      // let userRoles = await getUserRoles(userData.id)
      // let userPermissions = await getUserPermissions(userRoles.role_id)
      let userMemberships = await getUserMemberships(userData.id);
      let userPermissions = await getUserPermissionsByMemberships(userMemberships);

      if(userPermissions) {
          userPermissions.finalModRolePermRet.forEach(permissionObj => {
            if(permissionObj.permission_id == "get") {
              if(permissionObj.module_name.includes("Farm Registration")) {
                userMenus["My Farm"] = permissionObj.permitted
              }
              if(permissionObj.module_name.includes("Crop Registration")) {
                userMenus["My Crops"] = permissionObj.permitted
              }
              if(permissionObj.module_name.includes("Animal Registration")) {
                userMenus["My Livestock"] = permissionObj.permitted
              }
              if(permissionObj.module_name.includes("Dry Milling") && !permissionObj.module_name.includes("Cacao")) {
                userMenus["Dry Milling"] = permissionObj.permitted
              }
              if(permissionObj.module_name.includes("Buying Station") && !permissionObj.module_name.includes("Cacao")) {
                userMenus["Buying Station"] = permissionObj.permitted
              }
              if(permissionObj.module_name.includes("Coffee")) {
                userMenus["Coffee"] = permissionObj.permitted
              }
              if(permissionObj.module_name.includes("NFT")) {
                userMenus["Mint NFT"] = permissionObj.permitted;
              }
              if(permissionObj.module_name.includes("Survey Builder")) {
                userMenus["Survey Builder"] = permissionObj.permitted;
              }
              if(permissionObj.module_name.includes("Cacao")) {
                userMenus["Cacao"] = permissionObj.permitted;
              }
              if(userData.user_organization.id == 3 || userData.user_organization.id == 7 || userData.user_organization.id == 8) {
                userMenus["Processing Station"] = true
              }
            }
          })
      }
      userData.dataValues.userMenus = userMenus;
      userData.dataValues.userMenusPermissions = userPermissions.finalModRolePermRet;
      userData.dataValues.userRoles = userPermissions.userRoles && Array.isArray(userPermissions.userRoles) && userPermissions.userRoles.length > 0 && userPermissions.userRoles || adminUserRoles; // this is for lgcloud login
      // send response
      delete userData.dataValues.password;

      // Check password change time
      const getPasswordCriteria = await db.ProfileAuthenticationSettings.findOne({
        attributes: ['maximum_password_age_value', 'maximum_password_age_value_type'],
        raw: true
      });
      let passwordChangeRequiredDay = '', lastChangedDate
      if(getPasswordCriteria) {
        if (getPasswordCriteria.maximum_password_age_value_type === 'months') {
          passwordChangeRequiredDay = getPasswordCriteria.maximum_password_age_value * 30
        } else if (getPasswordCriteria.maximum_password_age_value_type === 'weeks') {
          passwordChangeRequiredDay = getPasswordCriteria.maximum_password_age_value * 7
        } else {
          passwordChangeRequiredDay = getPasswordCriteria.maximum_password_age_value
        }

        lastChangedDate = await db.UserPasswords.findOne({
          attributes: [
            'updatedAt'
          ],
          where: { userId: userData.id },
          raw: true,
          order: [
            ['createdAt', 'DESC'],
          ],
        });
      }

      //splash screen

      let coffeeSplash = false
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
      const isCacaoApp = req.headers.app_package_name?.includes('cacao');

      if (!!hasCoffeeRole.length) {
        coffeeSplash = true
      }

      if(!!hasCocoaRole.length || isCacaoApp) {
        coffeeSplash = false
      }

      if (lastChangedDate !== null && getPasswordCriteria) {
        let today = new Date().toISOString().slice(0, 10)
        let prevDate = new Date(lastChangedDate.createdAt || lastChangedDate.updatedAt).toISOString().slice(0, 10)
        var todayMoment = moment(today,'YYYY-MM-DD')
        var prevDateMoment = moment(prevDate,'YYYY-MM-DD')
        var dayDifference = todayMoment.diff(prevDateMoment, 'days');

        if(dayDifference >= passwordChangeRequiredDay) {
          message = req.translateFunction({name: error.RESET_PASSWORD}, globalTranslationCache, {
            lvl1: true,
            lvl2: false
          })
          res.json(
            await successResp({
              msg: message.name,
              data: {
                token: accesstoken,
                changePassword: true,
                 coffeeSplash
              },
            })
          );
        } else {
          let userSyncData = JSON.parse(JSON.stringify(userData))
          userSyncData.accesstoken = accesstoken
          res.json(
            await successResp({
              msg: success.LOGIN,
              data: {
                ...userData.dataValues,
                active: userData.dataValues.active ? 1 : 0,
                token: accesstoken,
                refreshtoken,
                changePassword: userData.isFirstLogin ? true : false,
                coffeeSplash
              },
            })
          );


        }
      } else {
        res.json(
          await successResp({
            msg: success.LOGIN,
            data: {
              ...userData.dataValues,
              active: userData.dataValues.active ? 1 : 0,
              token: accesstoken,
              refreshtoken,
              changePassword: userData.isFirstLogin ? true : false,
               coffeeSplash
            },
          })
        );
      }
    } catch (err) {
      const error = {
        message: JSON.stringify(err.message),
        stack: err.stack ? JSON.stringify(err.stack) : '',
      }
      if(process.env.NODE_ENV != "development")
        await sendLoginError(JSON.stringify(error), req);

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * @swagger
 * /logout:
 *   post:
 *     summary: API for logout.
 *     description:  API for logout.
 *     tags: [Authentication]
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
 *                 example: {"success": true,"code": 200,"message": "Logged out successfully.","data": {}}
 */

// user logout
router.post('/logout', auth, translation, async (req, res) => {
  try {
    const { id } = req.user;
    const userExist = await user.findByPk(id);
    if (userExist == null) throw error.USER_NOT_EXIST; // if not exist throw error

    await user.update({ isLogin: 0 }, { where: { id } }); // mark user logout into DB

    // remove FCM token
    await UserRegistrationToken.destroy({
      where: {
        userId: id
      },
    });

    let message = [{ name: success.LOGOUT }]
    if (req.headers.lang && req.headers.lang != 'en') {
      message = req.translateFunction(message, globalTranslationCache, {
        lvl1: true,
        lvl2: false
      })
    }
    res.json(
      await successResp({
        msg: message[0].name,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /access-token:
 *   post:
 *     summary: API for getting access token.
 *     description:  API for getting access token.
 *     tags: [Authentication]
 *     requestBody:
 *       description:  API for getting access token
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
 *                 example: {"success": true,"code": 200,"message": "OTP matches successfully.","data": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NTh9LCJpYXQiOjE2NDY5Mjg5NTksImV4cCI6MTY0NjkyOTg1OX0.OiNoJQJXTVFsXNIrsicD1vxGJ_88UXPWIHZZHJEOZjI"}}
 */

// Generate new accesstoken with help of refresh token
router.post('/access-token', async (req, res) => {
  try {
    let { accesstoken, refreshtoken } = req.body;

    // verify refresh token
    const { data } = await jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // check if accesstoken is the one who last login with that device
    // if (data.token != accesstoken) throw new Error('Invalid Token');
    let authSettings = {}
    let authSettingsRes = []
    authSettingsRes = await db.ProfileAuthenticationSettings.findAll({})
    if(authSettingsRes.length > 0){
      authSettings = authSettingsRes[0]
    }

    // generate access token if all goes well
    accesstoken = await jwt.sign(
      {
        data: { userId: data.userId },
      },
      process.env.ACCESS_TOKEN_SECRET,
      // commented to test token expiry
      // { expiresIn: (authSettings && authSettings.auto_log_off_value )? `${authSettings.auto_log_off_value * 60000}ms`|| `${process.env.ACCESS_TOKEN_EXPIRY}ms` :`${process.env.ACCESS_TOKEN_EXPIRY}ms`}
    );

    // generate refresh token if all goes well
    refreshtoken = await jwt.sign(
      {
        data: { userId: data.userId, token: accesstoken },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '365d' }
    );

    // send response
    res.json(
      successRespSync({
        msg: success.ACCESSTOKEN_GENERATED,
        data: {
          accesstoken,
          refreshtoken,
        },
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



async function insertLoginAttemptsJwt(attemptNo, expiryTime, userData) {
    let loginAttempJwt = await jwt.sign(
      {
        attemptNo
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expiryTime}
    );
    // this is causing DB to lock
  // return await userData.update({loginAttempts: loginAttempJwt})
  return
}
async function insertLockedToken( expiryTime, userData) {
    let lockedJwt = await jwt.sign(
      {
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expiryTime}
    );
  return await userData.update({lockedToken: lockedJwt})
}

module.exports = router;