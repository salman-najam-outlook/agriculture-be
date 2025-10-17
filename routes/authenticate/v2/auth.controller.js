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
const {
  createPassword,
  createOtpHash,
  verifyHash,
} = require(rootPath + '/helpers/hash');
const { error, success } = require(rootPath + '/helpers/language'); // 
const db = require(rootPath + "/models");
const { getUserMemberships, getUserPermissions, getUserRoles, getUserPermissionsByMemberships } = require(rootPath + '/helpers/controller/user-permissions');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { v4: randomSting } = require('uuid');
const { setDefaultUnitSettingsForAppUsers } = require(rootPath + '/helpers/defaultUnitConfigCacaoUser')
const shortid = require('short-uuid');
const COUNTRIES = require('../../../constants/COUNTRIES');
const path = require("path");
const ejs = require("ejs");

  const getSplashScreen = async (req, userData) => {
     if(
      (userData.user_organization.id ==( process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154)) || 
      (userData.user_organization.id == (process.env.INDONESIA_PT_EXPORTER_ID || 228))
    ) {
      return false
    }
    let userMemberships = await getUserMemberships(userData.id);
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
    return coffeeSplash
  }
const getUserRolePermissions = async (req, userData) => { 
    let userMenus = {}, userRoles

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

  console.log('prajwalor', userData.user_organization.id)
  // static sidemenu permissions for new indonesian org
    if((userData.user_organization.id ==( process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154)) ||
        (userData.user_organization.id == (process.env.KENYA_NACCU_ORG_ID || 239))) {
      userMenus["My Schedule"] = false
      userMenus["Processing Station"] = false
      userMenus["My Reports"] = false
      userPermissions.finalModRolePermRet.push(      
            {
                "module_id": "traceability",
                "permission_id": "get",
                "module_name": "Traceability",
                "permitted": false,
                "user_role_id": "farmer",
                "parent_module": "My Farm"
            },
            {
              "module_id": "troubleshooting_guide",
              "permission_id": "get",
              "module_name": "Troubleshooting Guide",
              "permitted": true,
              "user_role_id": "faq",
              "parent_module": "FAQ"
            }
          )
    } else {
          userMenus["My Schedule"] = true
          userMenus["Processing Station"] = true
          userMenus["My Reports"] = true
          userPermissions.finalModRolePermRet.push(      
                {
                    "module_id": "traceability",
                    "permission_id": "get",
                    "module_name": "Traceability",
                    "permitted": true,
                    "user_role_id": "farmer",
                    "parent_module": "My Farm"
                },
                {
                  "module_id": "troubleshooting_guide",
                  "permission_id": "get",
                  "module_name": "Troubleshooting Guide",
                  "permitted": false,
                  "user_role_id": "faq",
                  "parent_module": "FAQ"
                }
              )
    }


  userRoles = userPermissions.userRoles && Array.isArray(userPermissions.userRoles) && userPermissions.userRoles.length > 0 && userPermissions.userRoles 
  
  return {userMenus, userMenusPermissions: userPermissions.finalModRolePermRet, userRoles}
}

const loginProcess = async (req) => {

    try {

      let adminUserRoles // this is for lgcloud login
      let message
      let accesstoken, refreshtoken, rolePermissionRes, coffeeSplash

      const { credential, password, source = 'CF', sso } = req.body;
        let userData = await db.user.findOne({
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
              [db.Sequelize.Op.or]: [{ email: credential }, { mobile: credential }],
            },
            include: [
              {
                model: db.Organization,
                as: 'user_organization',
                attributes: ['id', 'name', 'logo', 'splashScreen','is_logo_hide', 'is_splash_hide'],
              },
              {
                model: db.Organization,
                as: 'subOrg',
              },
            ],
            order: [ [ 'createdAt', 'DESC' ]]
          });


          if (!userData) { // user doesnt exist block
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
    
           throw new Error(400)
          } else { // user exists block
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

            if (!userData.verified) {

              message = req.translateFunction({name:error.USER_NOT_VERIFIED}, globalTranslationCache, {
                lvl1: true,
                lvl2: false
              });

              throw new Error(600)
            }

            if (!userData.active) {
              message = req.translateFunction({name:error.USER_DEACTIVATED}, globalTranslationCache, {
                lvl1: true,
                lvl2: false
              });

              throw new Error(500)
            }


               // verify password
              let isEqual = false
              if(sso) {
                isEqual = true
              } else {
                isEqual = await verifyHash(password, userData.password);
              }

              if(!isEqual){ 
                throw new Error(700);
              }

              
              // generate access token if all goes well
               accesstoken = await jwt.sign(
                {
                  data: { userId: userData.id, source },
                },
                process.env.ACCESS_TOKEN_SECRET,
              );

                // generate refresh token if all goes well
               refreshtoken = await jwt.sign(
                  {
                    data: { userId: userData.id, token: accesstoken, source },
                  },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: '365d' }
                );

                // get user roles and permissions
                rolePermissionRes = await getUserRolePermissions(req, userData);
                userData.dataValues.userMenus  = rolePermissionRes.userMenus;
                userData.dataValues.userMenusPermissions = rolePermissionRes.userMenusPermissions;
                userData.dataValues.userRoles = rolePermissionRes.userRoles;

                delete userData.dataValues.password;

                coffeeSplash = await getSplashScreen(req, userData)

                let returnObj = {
                  ...userData.dataValues,
                  active: userData.dataValues.active ? 1 : 0,
                  token: accesstoken,
                  refreshtoken,
                  changePassword: userData.isFirstLogin ? true : false,
                  coffeeSplash
                }

                if (
                      (userData.user_organization.id == (process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154)) ||
                      (userData.user_organization.id == (process.env.INDONESIA_PT_EXPORTER_ID || 228)) ||
                    userData.email == "swphal.thapa+ptsi@outlook.com"
                  ) {
                    returnObj.themeObj = {
                      primary: "#184980",
                      secondary: "#184980",
                      secondary2light: "#0470E6",
                      green2: "#FFF4F0",
                    }
                  } else if(userData.user_organization.id ==( process.env.KENYA_NACCU_ORG_ID || 239)){
                  returnObj.themeObj = {
                      primary: "#a75300",
                      secondary: "#a75300",
                      secondary2light: "#a75300",
                      green2: "#FFF4F0",
                    }
                  }


                return returnObj

                

              }



    } catch (error) {
      console.log(error)
      throw error
        
    }
  };

  const signupProcess = async (reqBody, reqParams) => {

      const { type } = reqParams;

      let userExists = false
      
      let {
        countryCode,
        email,
        password,
        mobile,
        language,
        countryIsoCode,
        country

      } = reqBody;

      // check if user exists
      if (mobile) {
        userExists = await db.user.findOne({
          where: {
            mobile,
            verified: 1
          },
               order: [['createdAt', 'DESC']],
        })

      } else {
        userExists = await db.user.findOne({
          where: {
            email,
            verified: 1
          },
               order: [['createdAt', 'DESC']],
        })
      }

      if (userExists && userExists.source != "cf_bulk_upload") {
        throw new Error(800);
      }

      if(userExists) {

        let otp = await createOTP();

        const otpHash = await createOtpHash(otp.toString());
        const passwordHash = await createPassword(password);

        let set = {
          password: passwordHash,
          otp: otpHash,
          isFirstLogin: false,
          countryCode,
          language,
          countryIsoCode,
          country,
          source: "cf_bulk_upload_signup_complete"
        }

        let activationKeyRes = await  db.activationKeys.findOne({
          where: {
            user_id: userExists?.id
          }
        })

        await db.UserRoles.upsert({
          id: `${userExists.id}_end_user`,
          user_id: userExists.id,
          role_id: 'end_user',
        });

        await setDefaultUnitSettingsForAppUsers(userExists.id, userExists.organization)
        
      // admin has assigned activation key to user id block
        if(activationKeyRes) {
          await db.user.update(set, {
            where: {
              id: userExists.id
            }
          });
  
          return {userExists, plainOtp: otp}
        } else {
          throw new Error(100);
        }

      } else {
        throw new Error(100);

      }

  };

  const getNameParts = (name) => {
    if(!name) return { firstName: '', middleName: '', lastName: '' };
    const parts = name.split(' ');
    
    if(parts.length === 1) {
      return { firstName: parts[0], middleName: '', lastName: '' };
    }
    return {
      firstName: parts[0] || '',
      middleName: parts.length > 2 ? parts.slice(1, -1).join(' ') : '',
      lastName: parts[parts.length - 1] || ''
    };
  }

  const sendDemoSignupEmailToSalesDirectors = async (newUser, message) => {
    const isProd = process.env.NODE_ENV === 'production';

    const template = await ejs.renderFile(
      path.join(rootPath, 'views', 'user-demo-signup-request.ejs'),
      {
        user: newUser,
        message,
      }
    );
    if(!isProd) {
      if(newUser.email) await mailer.sendMail(newUser.email, 'New Demo User Signup Request', template);
      return;
    }

    const allEmailReceivers = ['jon@dimitra.io', 'andreas@dimitra.io', 'diego@dimitra.io', 'haroon@dimitra.io'];
    const emailReceiversByRegion = [
      {
        emails: ['kevin@dimitra.io'],
        countries: ['Kenya'],
      },
      {
        emails: ['ricky@dimitra.io'],
        countries: ['Indonesia'],
      },
      {
        emails: ['sherif@dimitra.io', 'jan@dimitra.io'],
        continents: ['Africa', 'Europe'],
        excludedCountries: ['Kenya'],
      },
      {
        emails: ['tushar@dimitra.io'],
        countries: ['India']
      },
      {
        emails: ['carlos@dimitra.io'],
        countries: ['Brazil'],
      },
      {
        emails: ['calvin@dimitra.io'],
        continents: ['South America'],
        excludedCountries: ['Brazil'],
      },
    ];

    const emailReceivers = [...allEmailReceivers];
    if(newUser.country) {

      emailReceiversByRegion.forEach(region => {
        let countries;
        if('countries' in region) {
          countries = region.countries;
        } else if('continents' in region) {
          countries = COUNTRIES.filter(country => {
            return region.continents.map(c => c.toLowerCase()).includes(country.continentName.toLowerCase());
          }).map(c => c.name);
        }
    
        const includeCountry = countries && countries.length > 0 && countries.find(c => c.toLowerCase() === newUser.country.toLowerCase());
        if(includeCountry) {
          emailReceivers.push(...region.emails);
        }
      });
    }

    await mailer.sendMail(emailReceivers, 'New Demo User Signup Request', template);
  }

  const reqDemosignupProcess = async (reqBody, reqParams) => {

    const { type } = reqParams;

    let userExists = false, newUser, org_id= 3, // default to dimitra because of demo acc ,
     userId
    
    let {
      name,
      countryCode,
      email,
      password,
      mobile,
      language,
      countryIsoCode,
      country,
      message,
    } = reqBody;

    const { firstName, middleName, lastName } = getNameParts(name);

    const passwordHash = await createPassword(password);

    let set = {
      password: passwordHash,
      isFirstLogin: false,
      countryCode,
      email,
      mobile,
      language,
      countryIsoCode,
      country,
      dimitraUserId: randomSting(),
      verified: 1,
      active: 0,
      organization: org_id,
      source: "req_demo_signup",
      firstName,
      middleName,
      lastName,
    }


    // check if user exists
    if (mobile) {
      userExists = await db.user.findOne({
        where: {
          mobile,
          verified: 1
        },
             order: [['createdAt', 'DESC']],
      })

    } else {
      userExists = await db.user.findOne({
        where: {
          email,
          verified: 1
        },
             order: [['createdAt', 'DESC']],
      })
    }

    if(userExists) {
      throw new Error(800);

    } else {

          newUser = await db.user.create(set);
          await sendDemoSignupEmailToSalesDirectors(newUser, message);
          userId = newUser.id
          let membershipRes = null
          membershipRes = await db.Membership.findOne({
            where: {
              org_id,
              default_status: true
            }, include: [
              {
                model: db.UserRoleMembershipMap,
                as: 'userRoleMembershipMap'
              }
            ]
          })
         if (!membershipRes || (typeof membershipRes === 'object' && Object.keys(membershipRes).length === 0)) {
            membershipRes = await db.Membership.findOne({
              where: {
                org_id
              }, include: [
                {
                  model: db.UserRoleMembershipMap,
                  as: 'userRoleMembershipMap'
                }
              ]
            })        
          }

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

           await handleUserMembershipPermissions(defaultLicenseKey,newUser)

          }
       


    }

    return userId
};
  

  const sendOTP = async (userObj, plainOtp, type, lang ) => { 
    if(userObj) {
      if (type === 'email') {
        try {
          await mailer.sendOtp(userObj.email, userObj.firstName, plainOtp, lang);
          return true
  
        } catch (e) {
          let translMsg = '';
          if (
            lang &&
            lang != 'en' &&
            globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()]
          ) {
            translMsg =
              globalTranslationCache[error.INVALID_EMAIL.toLowerCase().replace(/\s/g, '').trim()][
              langObj[lang]
              ];
          }
          throw new Error( 200);
        }
      } else if (type === 'mobile') {
        try {
  
          if (userObj.countryCode == 254 || userObj.countryCode == 256 || userObj.countryCode == 263) { // 254 is the country code for Kenya
            await sendSMSWithAfricaTalking({
              body: `Your OTP is ${plainOtp}`,
              to: `+${userObj.countryCode}${userObj.mobile}`,
            });
          } else {
            await sendSMS({
              body: `Your OTP is ${plainOtp}`,
              to: `+${userObj.countryCode}${userObj.mobile}`,
            });
          }
  
          return true
        } catch (err) {
          throw new Error( 300);
        }
      }
    }

  }
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
  const validateUserActivationStatus = async (req) => {

    let errorMessage = ""

    try {
          const { mobile, email, password, org_id } = req.body;
        let resObj = {}, validPassword = [], userExists = false, resMsg = '', translMsg = '', activationExists = false;

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
        if (userExists) {
          activationExists = db.activationKeys.findOne({where : {user_id :userExists}})
          if(activationExists ){
            resObj.activationExists = activationExists
          } else {
            resObj.activationExists = false
          }
        }  else {
          resObj.activationExists = false
        }

        if (password) {
          lang = req.headers.lang;
          validPassword = await validatePasswordHelper(password, org_id)

          if (validPassword.length > 0) {
            resObj.validPassword = validPassword
          } else {
            resObj.validPassword = true
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

        return resObj

    } catch (error) {
      throw new Error( errorMessage);
    }


  }
  const signupProcessWithActivation = async (req) => {
    let { licenseKey, userId = null, email, mobile, password, country, language, countryCode, countryIsoCode } = req.body;
    let newUser, type = req.params.type
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
        },
        {
            model: db.Organization,
            as: 'subOrg',
        },
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
          const passwordHash = await createPassword(password);
          if(type == "email") {
            newUser = await db.user.create({email: email, country, password: passwordHash,  language, countryCode, countryIsoCode, active:1, verified:1, organization: activationKey.org_id, subOrganizationId: activationKey?.subOrgId || null, source: "signup_w_activation_key"});
            const user = await db.user.findOne({ where: { id: newUser.id } });
            await handleUserMembershipPermissions(activationKey, { id: user.id });
          } else {
            newUser = await db.user.create({mobile: mobile, country, password: passwordHash,  language, countryCode, countryIsoCode, active:1, verified:1, organization: activationKey.org_id, subOrganizationId: activationKey?.subOrgId || null, source: "signup_w_activation_key"});
            const user = await db.user.findOne({ where: { id: newUser.id } });
            await handleUserMembershipPermissions(activationKey, { id: user.id });
          }
     
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

    await db.UserRoles.upsert({
      id: `${userId || newUser.id}_end_user`,
      user_id: userId || newUser.id,
      role_id: 'end_user',
    });

    await activationKey.save();

    // Set default unit settings for the new user
    try {
      await setDefaultUnitSettingsForAppUsers(userId || newUser.id, orgObj.id);
    } catch (error) {
      console.error('Error setting default unit settings for user:', error);
    }

    let tmpObj = JSON.parse(JSON.stringify(activationKey))

    tmpObj.membership_assoc.userRoleMembershipMap = tmpObj.membership_assoc.userRoleMembershipMap.map(el => {
      el.name = el.user_role_id.split("_").join(" ")
      return el
    })

    tmpObj.membership_assoc.org_assoc = orgObj
    return true
};



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


const validateProfileComplete = async (req) => {

  let {userId} = req.params

  let userRes = null
  userRes = await db.user.findOne({where :{ id: userId}})

  if(userRes) { 
    if ( userRes.firstName && userRes.language && userRes.country && userRes.countryIsoCode && userRes.village && userRes.address ) {
      return {
        profileComplete : true
      }
    } else { 
      return {
        profileComplete : false
      }
    }
  } else { 
    return {
      profileComplete : false
    }
  }


}


const checkActivationKeyValidity = async (req) => {

  let {credential} = req.body

  userRes = await db.user.findOne({     
    where: {
    [db.Sequelize.Op.or]: [{ email: credential }, { mobile: credential }],
  },})

  if(userRes?.source == "req_demo_signup") {
    let activationRes = await db.activationKeys.findOne({
      where: { user_id: userRes.id, is_deleted: 0 },
  
    });
  
    let today  = new Date();
  
    if (moment(today).isAfter(new Date(activationRes.membershipValidity))) {
      throw new Error("904")
    }
  } 

  return

}

const reqDemoAccess = async (req) => {

  let {userId} = req.params

  let userRes = null
  userRes = await db.user.findOne({where :{ id: userId}})

  if(userRes) { 
    if (  userRes.active ) {
      return {
        demoAccessAllowed : true
      }
    } else { 
      return {
        demoAccessAllowed : false
      }
    }
  } else { 
 throw new Error("400")
  }


}

  const authCodes = {
    100: "User not associated to activation key yet",
    200: "OTP email error",
    300: "OTP sms error",
    400: "User doesnt exist",
    500: "User inactive",
    600: "User not verified",
    700: "Invalid credentials",
    800: "User already exists",
    900: "Profile incomplete",
    901: "Profile complete",
    902: "Demo access allowed",
    903: "User login successful",
    904: "Trial demo expired",

  }

  module.exports = {
    loginProcess,
    signupProcess,
    sendOTP,
    authCodes,
    validateUserActivationStatus,
    reqDemosignupProcess,
    signupProcessWithActivation,
    validateProfileComplete,
    reqDemoAccess,
    checkActivationKeyValidity
  }