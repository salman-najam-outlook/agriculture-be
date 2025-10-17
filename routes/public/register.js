const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const { errorResp, successRespSync, serverError, errorRespSync } = require(rootPath + "/helpers/api");
const { createPassword } = require("../../helpers/hash");
const { validateRegistration } = require("../../middleware/validation");
const { setDefaultUnitSettingsForAppUsers } = require("../../helpers/defaultUnitConfigCacaoUser");
const crypto = require('crypto');
const moment = require('moment');
const { syncUserData } = require("../../helpers/dds_sync");
const ejs = require('ejs');
const path = require('path');
const mailer = require(rootPath + "/components/mailer");
const { logUserActivity } = require("../../services/logs/user-activity-log");
const { Organization } = require("../../mongoose-models/Organization");
const { User } = require("../../mongoose-models/User");
const twilio = require("twilio")(
  process.env.TWILIO_ACC_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    logLevel: 'debug'
  }
);

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


const isMylocal = process.env.NODE_LOCAL || false
const REGISTRATION_ALLOWED_COUNTRY = ['Indonesia', 'Kenya'];

const {  fileFilterGen } = require(rootPath + '/helpers/general');
const {activationKeyAndUserCreation, societyMembershipCreation} = require('./register.controller')
const {queueActivationKeyGenerationInternally} = require('../admin/user/activation/index')



var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});
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
var params, whiteListMimeTypes;
whiteListMimeTypes = ['text/csv'];
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
const fileFilter = fileFilterGen(whiteListMimeTypes);
var upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2000000 },
  });

router.post("/", validateRegistration, async function (req, res) {
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
      securityToken,
      organizationType = 'koperasi',
    } = req.body;

    // Validate static token
    const expectedToken = process.env.REGISTRATION_SECRET || 'dimitra_public_reg_2025_secure_token_123456789';
    if (securityToken !== expectedToken) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Invalid security token"
      })
    }

    let timeStamp = new Date().getTime();
    const mongoClient = req.app.locals.mongoClient;

    // use twilio to validate phone number
    if(!isMylocal){
      await validatePhoneNumber(phoneNumber, { 
        firstName, 
        lastName, 
        phoneNumber, 
        email, 
        country, 
        organizationName, 
        organizationLogo, 
        products, 
        noOfFarmsPlanningToOnboard:NoOfFarmsPlanningtoonboard 
      });
    }
    

    // Log activity
    if(!isMylocal) {
      await logActivityLog(mongoClient, email, req);
    }

    const existingUser = await db.user.findOne({ where: { email } });
    if (existingUser) {
      // Use helper function to handle existing user logic and response
      return await handleExistingUser(res, existingUser, {
        firstName, 
        organizationName,
        email, 
        products,
        NoOfFarmsPlanningtoonboard,
        organizationType,
        timeStamp,
        organizationLogo,
        country
      });
    }
    return await handleNewUserRegistration(res, {
      firstName,
      lastName,
      phoneNumber,
      email,
      country,
      organizationName,
      organizationLogo,
      products,
      NoOfFarmsPlanningtoonboard,
      organizationType,
      timeStamp,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json(
      serverError(res, error)
    );
  }
});


async function validatePhoneNumber(phoneNumber, emailData) {
  if (!phoneNumber) return;
  try {
    let twilioRes = await twilio.lookups.v2.phoneNumbers(phoneNumber).fetch({ type: ['carrier'] });
    if (twilioRes?.validationErrors && twilioRes.validationErrors.length > 0) {
      // Prepare and send invalid phone email
      const title = 'Invalid Phone Number Detected in Indonesia Sub-Org Registration';
      const templatePath = path.join(rootPath, 'views', 'users/sub-org-reg-invalid-phone.html');
      const template = await ejs.renderFile(templatePath, {
        ...emailData,
        products: emailData?.products.join(', '),
        invalidPhoneNumber: phoneNumber,
      });
      await mailer.sendMail(["amit@dimitra.io", "sandesh@dimitra.io"], title, template);
    }
  } catch (error) {
    console.error("Twilio verification error:", error);
  }
}

async function logActivityLog(mongoClient, email, req) {
   try {
      if (mongoClient) {
        const db = mongoClient.db(process.env.MONGO_DB);
        const collection = db.collection(process.env.MONGO_DB_Failure_COLLECTION)
        const activityCollection = db.collection(process.env.MONGO_DB_ACTIVITY_COLLECTION)

        let logRes = await activityCollection.insertOne({
          subOrgEmail: email,
          module: "sub_org_registration",
          endpoint: "/api/public/register",
          payload: req.body,
          createdAt: new Date()
        })
        console.log("logged sub org registration", logRes)
      }
    } catch (error) {
      console.error("Error sub org log reg activity:", error);
    }
}

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

// Handle existing user registration attempts and respond appropriately
async function handleExistingUser(res, existingUser, context) {
  const {
    firstName, 
    organizationName,
    email,
    products,
    NoOfFarmsPlanningtoonboard,
    organizationType,
    timeStamp,
    organizationLogo,
    country,
  } = context;

  const { parentOrganizationId, organizationCode } = await selectOrganizationCode(country);

  // User belongs to parent org and no subOrganization => upgrade user
  if (existingUser.organization === parentOrganizationId && !existingUser.subOrganizationId) {
    return await upgradeExistingUserToSubOrg(res, existingUser, {
      firstName,
      lastName: existingUser?.lastName || '',
      phoneNumber: existingUser?.mobile,
      email: existingUser?.email,
      country,
      organizationName,
      organizationLogo,
      products,
      NoOfFarmsPlanningtoonboard,
      organizationType,
      timeStamp,
      parentOrganizationId,
      organizationCode,
    });
  }
  // User from different organization or existing sub-org user — send notification email
  await sendExistingUserEmail(email, { country, userName: existingUser.firstName || 'User', email });
  const msg = country.toLowerCase() === 'kenya' ? "Email already registered. Please try with different email." : "Akun dengan email ini sudah terdaftar. Kami telah mengirimkan link reset kata sandi ke email Anda."
  return res.status(400).json({
    success: false,
    code: 400,
    message: msg
  });
}

async function upgradeExistingUserToSubOrg(res, existingUser, context) {
  const {
    firstName, 
    lastName, 
    phoneNumber, 
    email, 
    country,
    organizationName, 
    organizationLogo, 
    products,
    NoOfFarmsPlanningtoonboard, 
    organizationType,
    timeStamp, 
  } = context;


  const { parentOrganizationId, organizationCode } = await selectOrganizationCode(country);
  const orgLogo = await selectOrganizationLogo(country);

  try {
    const newOrganizationCode = generateOrganizationCode(organizationName, timeStamp);
    const organization = await db.Organization.create({
      name: `${organizationName}_${timeStamp}`,
      logo: organizationLogo || orgLogo,
      parentId: parentOrganizationId,
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

    existingUser.subOrganizationId = organization.id;
    existingUser.firstName = firstName || organizationName;
    existingUser.lastName = lastName || '';
    existingUser.mobile = phoneNumber;
    existingUser.password = await createPassword('Dimitra@123');
    existingUser.verified = 1;
    existingUser.NoOfFarmsPlanningtoonboard = NoOfFarmsPlanningtoonboard || 0;
    existingUser.registrationUserType = organizationType.toLowerCase();
    existingUser.source = existingUser.source || 'saas_api_upgrade';
    await existingUser.save();

    organization.primaryUserId = existingUser.id;
    await organization.save();

    await linkProductsToOrganization(products, existingUser.id, organization.id);

    const roles_id = getRolesForOrganizationType(country, organizationType);
    await assignRoles(existingUser.id, roles_id);

    await createDefaultMembershipPermissions(existingUser, parentOrganizationId, organization.id);

    if(!isMylocal) {
      await sendWelcomeEmail(email, {
        user:existingUser,
        password: 'Dimitra@123',
        organizationName: organization.name,
        userType: organizationType.toLowerCase(),
        country:country
      });
    }

    await syncUserAndOrgData(existingUser, organization, products, parentOrganizationId, organizationCode);

    // Build response user data
    const userResponse = {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName || organization.name,
      lastName: existingUser.lastName,
      organization: organization.name,
      organizationCode: organization.code,
      organizationLogo: organization.logo,
      NoOfFarmsPlanningtoonboard: existingUser.NoOfFarmsPlanningtoonboard,
      userType: organizationType.toLowerCase(),
      country,
    };

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Registration successful. Your default password is: Dimitra@123. Please change your password after login.",
      data: userResponse,
    });
  } catch (error) {
    console.error("Error upgrading existing user:", error);
    return res.status(500).json(serverError(res, error));
  }
}

async function handleNewUserRegistration(res, context) {
  const {
      firstName, 
      lastName, 
      phoneNumber, 
      email, 
      country,
      organizationName, 
      organizationLogo, 
      products,
      NoOfFarmsPlanningtoonboard, 
      organizationType,
      timeStamp
  } = context;

  const { parentOrganizationId, organizationCode } = await selectOrganizationCode(country);
  
  try {
    // Find parent organization
    const parentOrganization = await db.Organization.findOne({ where: { code: organizationCode, status: 'active' } });
    if (!parentOrganization) {
      return res.status(400).json({ success: false, code: 400, message: "Parent Organization not found" });
    }
    const orgLogo = await selectOrganizationLogo(country);
    const newOrganizationCode = generateOrganizationCode(organizationName, timeStamp);
    // Check if org code exists
    const existingOrg = await db.Organization.findOne({ where: { code: newOrganizationCode } });
    if (existingOrg) {
      return res.status(400).json({ success: false, code: 400, message: "Organization already exists with this name" });
    }

    const organization = await db.Organization.create({
      name: `${organizationName}_${timeStamp}`,
      logo: organizationLogo || orgLogo,
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
      subOrganizationId: organization.id,
      verified: 1,
      country,
      countryId: country,
      active: true,
      NoOfFarmsPlanningtoonboard: NoOfFarmsPlanningtoonboard || 0,
      registrationUserType: organizationType.toLowerCase(),
      source: 'saas_api_registration',
      createdAt: moment.utc(),
      updatedAt: moment.utc(),
    });

    // Update organization primary user
    await organization.update({ primaryUserId: user.id });

    // Link products to org
    await linkProductsToOrganization(products, user.id, organization.id);

    // Assign roles
    const roles_id = getRolesForOrganizationType(country, organizationType);

    await assignRoles(user.id, roles_id);

    // Send welcome email
    if(!isMylocal){
      await sendWelcomeEmail(email, { user:user, country:country, password: defaultPassword, organizationName: organization.name, userType: organizationType.toLowerCase() });
    }
    // Sync user/org data
    await syncUserAndOrgData(user, organization, products, parentOrganization.id, parentOrganization.code);

    // Create default membership permissions
   
      let defaultMembershipRes = await createDefaultMembershipPermissions(user, parentOrganization.id, organization.id);


    //Create society membership and activation keys for NACCU
     if(country.toLowerCase() == 'kenya') {
        let societyMembershipRes = await societyMembershipCreation(organization, parentOrganization)
        }
    // queue activation key creation for default membership
    await queueActivationKeyGenerationInternally({
      user: {
        organization:parentOrganization.id ,
        subOrgId:organization.id,
        id: user.id ,
        userRole: "admin" 
      },
      body:{
        membershipType: defaultMembershipRes.id,
        numberOfKeys: NoOfFarmsPlanningtoonboard > 0 ? NoOfFarmsPlanningtoonboard:  50,
        comment: 'Initial keys for new sub org registration'
      }
    })


    // Set default unit settings, catch errors to avoid blocking success response
    try {
      await setDefaultUnitSettingsForAppUsers(user.id, parentOrganization.id);
    } catch (error) {
      console.error('Error setting default unit settings for user:', error);
    }

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
    };

    return res.status(200).json({
      success: true,
      code: 200,
      message: `Registration successful. Your default password is: ${defaultPassword}. Please change your password after login.`,
      data: userResponse,
    });

  } catch (error) {
    console.error("Error in new user registration:", error);
    return res.status(500).json(serverError(res, error));
  }
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

// Sync user and organization data (assuming you have a syncUserData function)
async function syncUserAndOrgData(user, organization, products, parentOrgId, parentOrgCode) {
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
      registrationUserType: user.registrationUserType,
      organization: {
        name: organization.name,
        code: organization.code,
      },
    },
    {
      id: parentOrgId,
      code: parentOrgCode,
      name: parentOrgCode,
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
}


function generateOrganizationCode(organizationName, timeStamp) {
  let tmps = timeStamp +  Math.floor(Math.random() * 10);
  return `${organizationName.toLowerCase().replace(/\s+/g, '_')}_${tmps}`;
}

async function sendWelcomeEmail(email, data) {
  try {
    const { password, organizationName, userType = 'koperasi', country } = data;
    const platformUrlSuffix = country.toLowerCase() === 'indonesia' ? 'login/id' : 'login';
    const emailData = {
      cooperativeName: organizationName,
      username: email,
      password: password,
      platformUrl: process.env.NODE_ENV === 'pre_prod' ? `https://admin-pre-prod.dimitra.dev/${platformUrlSuffix}` : (process.env.NODE_ENV === 'development' ? `http://localhost:8080/${platformUrlSuffix}` : `https://cfadmin.dimitra.world/${platformUrlSuffix}`),
      changePasswordLink: process.env.NODE_ENV === 'pre_prod' ? 'https://admin-pre-prod.dimitra.dev/change-password' : (process.env.NODE_ENV === 'development' ? 'http://localhost:8080/change-password' : 'https://cfadmin.dimitra.world/change-password'),
      kickstartGuideLink: country.toLowerCase() == 'kenya' ? "https://drive.google.com/file/d/14EI1vIbgpZVeZXFjn8kTfFu0s8MESAXg/view?usp=sharing" :'https://drive.google.com/file/d/1CSXfvjVg9ihx27a68F4QiKhDuAY8GK2l/view?usp=drive_link',
      supportEmail: 'support@dimitra.io',
      userType: userType.toLowerCase(),
      country: data.country,
      user: data?.user
    };

    let title = '';
    let templatePath = '';

    if(country && country.toLowerCase() === 'kenya') {
      if(userType === 'cooperative_society' || userType === 'company' || userType === 'estate'){
        title = "Your Gateway to EUDR Compliance – Get Started Today!";
        templatePath = path.join(rootPath, 'views', 'users/welcome-kenya-cooperative-society.html');
      }else if(userType === 'cooperative_union') {
        title = "Your Gateway to EUDR Compliance – Get Started Today!";
        templatePath = path.join(rootPath, 'views', 'users/welcome-kenya-cooperative-union.html');
      }
      else if(userType === 'agent') {
        title = "Your Gateway to EUDR Compliance – Get Started Today!";
        templatePath = path.join(rootPath, 'views', 'users/welcome-kenya-agent.html');
      }
    } else if(country && country.toLowerCase() === 'indonesia') {
        title = userType === 'ekspor'
        ? 'Selamat datang di Platform Dimitra – Mulailah Hari Ini!'
        : 'Selamat datang di Platform Dimitra – Mulailah Hari Ini!';

       if(userType == "ekspor"){
        templatePath = path.join(rootPath, 'views', 'users/welcome-exporter.html')
       }else if(userType == 'koperasi'){
        templatePath = path.join(rootPath, 'views', 'users/welcome-coorperatives.html')
       }else if(userType == 'keduanya'){
        templatePath = path.join(rootPath, 'views', 'users/welcome-coorperatives-exporter.html')
       }
    }

    if(title && templatePath){
      const template = await ejs.renderFile(templatePath, emailData);
      await mailer.sendMail(email, title, template);
    } 
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

async function sendExistingUserEmail(email, data) {
  if (isMylocal) {
    console.error('Email is required to send existing user notification');
    return;
  }
  try {
    const { userName, country } = data;
    const platformUrlSuffix = country.toLowerCase() === 'indonesia' ? 'login/id' : 'login';

    const emailData = {
      userName: userName,
      email: email,
      platformUrl: process.env.NODE_ENV === 'pre_prod' ? 'https://admin-pre-prod.dimitra.dev' : (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://cfadmin.dimitra.world/'),
      loginUrl: process.env.NODE_ENV === 'pre_prod' ? `https://admin-pre-prod.dimitra.dev/${platformUrlSuffix}` : (process.env.NODE_ENV === 'development' ? `http://localhost:8080/${platformUrlSuffix}` : `https://cfadmin.dimitra.world/${platformUrlSuffix}`),
      forgotPasswordUrl: process.env.NODE_ENV === 'pre_prod' ? 'https://admin-pre-prod.dimitra.dev/forgot-password?lang=id' : (process.env.NODE_ENV === 'development' ? 'http://localhost:8080/forgot-password?lang=id' : 'https://cfadmin.dimitra.world/forgot-password?lang=id'),
      supportEmail: 'bantuan@dimitra.io',
    };
    
    const title = country.toLowerCase() == 'kenya'? "Your Gateway to EUDR Compliance – Get Started Today!" : 'Akses ke Platform DDS Menggunakan Kredensial Anda yang Ada';
    const templatePath = country.toLowerCase() == 'kenya' ? "users/existing-user-notification-kenya.html" : "users/existing-user-notification.html";
    const template = await ejs.renderFile(
      path.join(rootPath, 'views', templatePath),
      emailData
    );

    await mailer.sendMail(email, title, template);
  } catch (error) {
    console.error('Error sending existing user email:', error);
    throw error;
  }
}


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
    await db.UserRoleMembershipPermissions.findAll({
      where: {
        membership_plan_id: parentMembership.id
      }
    })
    console.log(`Successfully completed creating default membership permissions for sub-org ${subOrgId}`);
    return newMembership
  } catch (error) {
    console.error('Error creating default membership permissions:', error);
  }
}


  router.post("/society-company-estate-creation", 
    (req, res, next) => {
    let fileUpload = upload.single("userUploadStage");
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      }  else {
        next();
      }
    });
  },
  
  async (req, res) => {
    try {

      const expectedToken = process.env.REGISTRATION_SECRET || 'dimitra_public_reg_2025_secure_token_123456789';
      if (req.body.securityToken !== expectedToken) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: "Invalid security token"
        })
      }

     let stagingRes = await activationKeyAndUserCreation(req)

     res.status(200).json({
      success: true,
      data: stagingRes
    });
  
    } catch (error) {
      return serverError(res, error);
    }
  });

  router.get("/union-list", async (req, res) => {
    try {
      let unionList = await db.Organization.findAll({
        include: [{
          model: db.user,
          where: {
            registrationUserType: "cooperative_union"
          },
          as: "primaryUser",
          required: true
        }],
        where: {
                [db.Sequelize.Op.or]: [
              {
                  parentId: [(process.env.KENYA_NACCU_ORG_ID || 239)],
              },
              {
                id: [346,
                  349,
                  350,
                  351,
                  352,
                  353,
                  354,
                  355,
                  356,
                  357,
                  358,
                  359,
                  360,
                  361,
                  362,
                  363,
                  364,
                  365,
                  366,
                  367,
                  368,
                  369,
                  370],

              },
            ],
       
          status: 'active'
        },
        attributes: ['id', 'name', 'code', 'logo', 'country']
      });
  
      return res.status(200).json({
        success: true,
        data: unionList
      });
    } catch (error) {
      console.error("Error fetching union list:", error);
      return serverError(res, error);
    }
  });

module.exports = router;