const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const { errorResp, successRespSync, serverError } = require(rootPath + "/helpers/api");
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
const { v4: uuidv4 } = require("uuid");
const axios = require('axios')
const xlsx = require('xlsx');
const shortid = require('short-uuid');
const validator = require('validator').default;
const { Op } = require('sequelize');
const twilio = require("twilio")(
  process.env.TWILIO_ACC_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    logLevel: 'debug'
  }
);

const INDONESIA_DDS_ROLES = {
  'dds_exporter': 'dds_exporter',
  'indonesia_admin': 'indonesia_admin'
}
const KENYA_DDS_ROLES = {
  'dds_exporter': 'dds_exporter',
  'naccu_kenya_admin': 'naccu_kenya_admin',
  'naccu_naccu': 'naccu_naccu'
}

const KENYA_WHO_ARE_YOU = {
  'cooperative_union': 'cooperative_union',
  'cooperative_society': 'cooperative_society',
  'company': 'company',
  'estate': 'estate',
  'agent': 'agent',
}

const KENYA_COOPERATIVES = ["cooperative_union", "cooperative_society", "company", "estate", "agent"]
const INDONESIA_COOPERATIVES = ['koperasi', 'ekspor', 'koperasi', 'keduanya']


const isMylocal = process.env.NODE_LOCAL || false
const REGISTRATION_ALLOWED_COUNTRY = ['Indonesia', 'Kenya'];

async function societyMembershipCreation(subOrgRes, orgObj) {

  // check if membership with society role already exists for this sub org
  let memberCreateRes = null
  let existingMembership = await db.UserRoleMembershipMap.findOne({
    where: {
      '$membership.subOrgId$': subOrgRes.id,
      '$user_role.id$': 'society',
    },
    include: [
      {
        model: db.Membership,
        as: 'membership',
        required: true,
        attributes: [],
      },
      {
        model: db.UserRole,
        as: 'user_role',
        required: true,
        attributes: []
      }
    ],
    raw: true,
    attributes: ['membership_id', 'user_role_id'],
  })

  if (existingMembership) {
    memberCreateRes = {}
    memberCreateRes.id = existingMembership.membership_id
    return memberCreateRes
  }
  userRoleId = ["society", "coffee_farmer", "buying_station", "farmer", "dry_milling"]
  const roleModules = await db.UserRoleModule.findAll({
    where: {
      user_role_id: {
        [db.Sequelize.Op.in]: userRoleId
      },
      isdeleted: {
        [db.Sequelize.Op.is]: null,
      },
      [db.Sequelize.Op.or]: [
        { organization_id: { [db.Sequelize.Op.is]: null } },
        { organization_id: orgObj.id }
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

    if (roleModule.organization_id) {
      if (hasPrevRoleModule) {
        prev[prevRoleModuleIdx] = roleModule;
      } else {
        prev.push(roleModule);
      }
    } else {
      if (hasPrevRoleModule) {
        if (!prev[prevRoleModuleIdx].organization_id) {
          prev[prevRoleModuleIdx] = roleModule;
        }
      } else {
        prev.push(roleModule);
      }
    }
    return prev;
  }, []);

  const permission = await db.Permissions.findAll({ raw: true });
  let membershipDurationInDays = 1 * 365

  memberCreateRes = await db.Membership.create(
    {
      membership_type: `${subOrgRes.code} Society Membership`,
      description: `${subOrgRes.code} Society Membership`,
      membership_duration: 365,
      membership_duration_in_days: 365,
      membership_duration_unit: "day(s)",
      membership_fee: 100,
      satellite_report: 100,
      advanced_report: 100,
      // user_role_id: userRoleId,
      org_id: orgObj.id,
      subOrgId: subOrgRes.id || null,
      "plan_type": "enterprise",
      "feeUnitType": "day(s)",
      "allowed_users": 0,
      "allowed_farms": 0,
      "advanceReportTypeUnit": "per_user",
      "advancedReportUnit": "day(s)",
      "satelliteReportTypeUnit": "per_user",
      "deforestationReport": "11",
      "deforestationReportTypeUnit": "per_user",
      "deforestationReportUnit": "day(s)",
      "basicFarmLevelReport": 0,
      "advancedFarmLevelReport": 0,
      "largeAreaReport": 0
    },
  );
  let userRoleMembershipInput = []
  userRoleMembershipInput = userRoleId.map(user_role => {
    return {
      membership_id: memberCreateRes.id,
      user_role_id: user_role,
      isDeleted: false
    }
  })
  await db.UserRoleMembershipMap.bulkCreate(userRoleMembershipInput, {})


  const userMembershipModulePermissions = organizationRoleModules.reduce(
    (previousValue, { module_id, user_role_id, default_enabled }) => {
      permission.forEach(({ id: permissionId }) => {
        previousValue.push({
          id: `${user_role_id}_${memberCreateRes.id}_${module_id}_${permissionId}`,
          user_role_id,
          membership_plan_id: memberCreateRes.id,
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

  if (userMembershipModulePermissions.length > 0) {
    await db.UserRoleMembershipPermissions.bulkCreate(
      userMembershipModulePermissions,
      {}
    );
  }

  return memberCreateRes

}

async function activationKeyAndUserCreation(req) {

  const {
    organizationCode,
    userData,
    subOrgUserId
  } = req.body;
  let subOrgRes = await db.Organization.findOne({
    where: { code: organizationCode }
  })
  let orgRes = await db.Organization.findOne({
    where: { id: subOrgRes.parentId }
  })
  const jobId = uuidv4();
  let set = {},
    activationIdArr = [],
    activationKeyRes = [],
    jsonArray = [],
    successArr = [],
    failedArr = [],
    activationIdToData = {},
    userInsertArr = [],
    mailArr = [],
    mobileArr = []
  userExistArr = [],
    mailExistArr = [],
    mobileExistArr = []
  newActivationKeys = []
  noOfUsedExstingKeys = 0

  if (req?.file) {
    const file = await axios({
      method: "GET",
      url: req.file?.location,
      responseType: "arraybuffer",
      responseEncoding: "utf-8"
    });
    const wb = xlsx.read(file.data.toString(), { type: "string" });
    jsonArray = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      blankrows: false,
    });
  } else {
    jsonArray.push(
      {
        "First Name": userData.firstName || "",
        "Last Name": userData.lastName || "",
        "Email": userData.email || "",
        "Country Code": userData.countryCode || "",
        "Country": userData.country || "",
        "Mobile Number": userData.mobile || "",
        "Id Number": userData.organizationNumber || "",
      }
    )
  }


  // create new society/company/estate membership
  let memberRes = await societyMembershipCreation(subOrgRes, orgRes)

  // generate new activation keys

  let result = await db.generatedKeys.create({
    membership_type: memberRes.id,
    generated_by: subOrgUserId,
    number_of_keys: 1,
    org_id: orgRes.id,
    admin_role: "admin",
    subOrgId: subOrgRes.id || null,
  });


  for(let i = 0; i < (jsonArray.length); i++) {
      let key = shortid.generate();

    let inputObj = {
      license_key: key,
      membership_type: memberRes.id,
      generated_key_id: result.id,
      org_id: orgRes.id,
      subOrgId: subOrgRes.id || null,
    };
    newActivationKeys.push(inputObj);
  }
  
    
  await db.activationKeys.bulkCreate(newActivationKeys);
  activationKeyRes = [...activationKeyRes, ...newActivationKeys];


  jsonArray = jsonArray.map((item, index) => {
    const email = item['Primary Email Address'] || item['Email'] || item['email'];
    const phone = item['Mobile Number'] || item['mobile'] || item['Phone Number'] || item['phone'];
    const id_number =
      item['Id Number'] ||
      item['Organization  Number'] ||
      item['Organization Number'] ||
      item['OrganizationNumber'] ||
      item['Organization  number'] ||
      item['Organization number'] ||
      item['id_number'];

    if (email) mailArr.push(String(email).trim());
    if (phone) mobileArr.push(String(phone).trim());

    let tmpObj = {};
    tmpObj.index = index;
    tmpObj.first_name = item["Organization Name"] || item["First Name"] || item["first_name"] || "";
    tmpObj.email = email || "";
    tmpObj.mobile = phone || "";
    tmpObj.country_code = 254;
    tmpObj.country = "Kenya";
    tmpObj.activation_key = item["Activation Key"] || item["license_key"] || "";
    tmpObj.id_number = id_number ? String(id_number).trim() : "";

    if (!email && !phone) return { ...tmpObj, validation_code: 101 };

    const isValidEmail = validator.isEmail((email ?? '').trim());
    const isValidPhone = validator.isMobilePhone(String(phone ?? '').trim(), 'any');

    return {
      ...tmpObj,
      validation_code: !(isValidEmail || isValidPhone) ? 102 : 103
    };
  });

  userExistArr = await db.user.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        { email: mailArr },
        { mobile: mobileArr }
      ]
    },
    attributes: ['email', 'mobile']
  });

  mailExistArr = userExistArr.map(({ email }) => { return email });
  mobileExistArr = userExistArr.map(({ mobile }) => { return mobile });




  for (let i = 0; i < jsonArray.length; i++) {
    if (mailExistArr.includes(jsonArray[i]["email"])) {
      jsonArray[i].validation_code = 104;
      jsonArray[i].license_key = null
      jsonArray[i].success = false
      continue;
    } else if (mobileExistArr.includes(jsonArray[i]["mobile"] + "")) {
      jsonArray[i].validation_code = 105;
      jsonArray[i].license_key = null
      jsonArray[i].success = false
      continue;
    }

    if (activationKeyRes[i]) {
      jsonArray[i].license_key = activationKeyRes[i].license_key;
      jsonArray[i].success = true
      noOfUsedExstingKeys++
    } else {
      jsonArray[i].license_key = null
      jsonArray[i].success = true
      jsonArray[i].validation_code = 106;
    }
  }
  if (jsonArray.length == 0) {
    if (req.file?.key) {
      await deleteFileS3({
        Bucket: process.env.AWS_PUBLIC_BUCKET,
        Key: req.file.key,
      });
    }
    return res.json(errorRespSync({ code: 400, msg: 'Invalid CSV data' }));
  }


  let returnObj = {  jsonArray, noOfNewActivatedKeys: newActivationKeys.length, noOfUsedExstingKeys, orgRes, subOrgRes, mailExistArr, mobileExistArr, memberRes };

  await societyCompanyEstateCreation(returnObj);
  return returnObj;



}

async function societyCompanyEstateCreation(userStageData) {
  let {
    jsonArray,
    noOfNewActivatedKeys,
    noOfUsedExstingKeys,
    orgRes,
    subOrgRes,
    memberRes
  } = userStageData;
    let activationIdToData = {}
    let activationIdArr = jsonArray.filter(item => item.license_key).map((item) => {
        let tmpObj = {}
        tmpObj.first_name = item['First Name'] || item['first_name']
        tmpObj.email = item['Email'] || item['email']
        tmpObj.country_code = item['Country Code'] || item['country_code']
        // tmpObj.country_iso_code = item['Country ISO Code'] || item['country_iso_code']
        tmpObj.country = item['Country'] || item['country']
        tmpObj.license_key = item['Activation Key']?.trim() || item['license_key'].trim()
        // Add id_number mapping from bulk upload data (Organization Number)
        tmpObj.id_number = item['Id Number'] || item['Organization  Number'] || item['Organization Number'] || item['OrganizationNumber'] || item['Organization  number'] || item['Organization number'] || item['id_number'];
        if (tmpObj.id_number) { tmpObj.id_number = String(tmpObj.id_number).trim(); }


        activationIdToData[tmpObj.license_key] = tmpObj;
        return tmpObj.license_key;
      });

      let  activationKeyRes = await db.activationKeys.findAll({
        where: { license_key: activationIdArr, status: "unassigned" },
        raw: true,
      });



          let promiseArr = [],
              userDataArr = [],
              activationInputObj = {},
              activationInputArr = [],
              membershipInputArr = [],
              userPasswordArr = [];
      
            activationKeyRes.forEach(async (item) => {
            
                let prom = new Promise(async (resolve, reject) => {
                  try {
                    let whereArr = []
                    if(activationIdToData[item.license_key].email) {
                      whereArr.push({ email: activationIdToData[item.license_key].email  })
                    } 
                    if(activationIdToData[item.license_key].phone_no){
                      whereArr.push({ mobile: activationIdToData[item.license_key].phone_no })
                    }
                    let userExists = await db.user.findOne({   where: {
                      [Op.or]: whereArr,
                    }})
                    if(!userExists) {
                          let userData = {},
                          userPassword;
                        userData.firstName = activationIdToData[item.license_key].first_name && `${activationIdToData[item.license_key].first_name}`.trim() || null;
  
                        userData.email = activationIdToData[item.license_key].email && `${activationIdToData[item.license_key].email}`.trim() || null;

                        let password = shortid.generate().slice(13);
                        userPassword = await createPassword("Dimitra@123");
                        userData.password = userPassword; //userPassword;
                        userData.verified = true
                        userData.isFirstLogin = true
                        userData.language = "English";
                        // userData.countryIsoCode = activationIdToData[item.license_key].country_iso_code &&`${activationIdToData[item.license_key].country_iso_code}`.trim() || null;
                        userData.country = activationIdToData[item.license_key].country &&`${activationIdToData[item.license_key].country}`.trim() || null;
                        userData.countryCode = activationIdToData[item.license_key].country_code &&`${activationIdToData[item.license_key].country_code}`.trim() || 0;
                        userData.organization = orgRes.id;
                        userData.subOrganizationId = subOrgRes.id || null;
                        userData.source = "cf_society_bulk_upload" // need this to differentiate between bulk upload and other signup flow
                        userData.id_number = activationIdToData[item.license_key].id_number && `${activationIdToData[item.license_key].id_number}`.trim() || null;
                        activationInputObj[userPassword] = {
                          password,
                          ...item,
                          ...activationIdToData[item.license_key],
                        };
                        userPasswordArr.push({
                          password: password,
                          email: userData.email
                        })
      
                        resolve(userData);
                    } else {
                      resolve(null)
                    }
                    
                  } catch (error) {
                    reject(error);
                  }
                });
                promiseArr.push(prom);
          });
      
          userDataArr = await Promise.all(promiseArr);
      
          userDataArr = userDataArr.filter(u => u)
      
          // create user
          let userRes = await db.user.bulkCreate(userDataArr);
          let userIdList = []
      
          // transaction.rollback();
      
          // assign membership to user
          if (userRes.length > 0) {
            userRes.forEach((user) => {
              userIdList.push(user.id)
              let tmpObj = {},
                tmpObj1 = {};
              tmpObj.user_id = user.id;
              tmpObj.membership_id = memberRes.id;
                activationInputObj[user.password].membership_type;
              membershipInputArr.push(tmpObj);
      
              tmpObj1.id = activationInputObj[user.password].id;
              tmpObj1.license_key = activationInputObj[user.password].license_key;
              tmpObj1.user_id = user.id;
              tmpObj1.user_email = activationInputObj[user.password].email;
              tmpObj1.phone_no = activationInputObj[user.password].phone_no;
              tmpObj1.membership_type =
                activationInputObj[user.password].membership_type;
              tmpObj1.status = "assigned";
              tmpObj1.generated_key_id =
                activationInputObj[user.password].generated_key_id;
              tmpObj1.is_deleted = activationInputObj[user.password].is_deleted;
              tmpObj1.createdAt = new Date();
              tmpObj1.updatedAt = new Date();
              tmpObj1.job_id = "test";
              tmpObj1.org_id = orgRes.id;
              tmpObj1.subOrgId = subOrgRes.id || null;
              activationInputArr.push(tmpObj1);
            });
          }
          const userRoles = userRes.map(r => {
            return {
              id: `${r.id}_end_user`,
              user_id: r.id,
              role_id: 'end_user'
            }
          })
      
          await db.UserRoles.bulkCreate(
            userRoles)
      
          let membershipRes = await db.UserMembershipMap.bulkCreate(
            membershipInputArr,
          );
      
          // assign activation key to user
          let activationRes = await db.activationKeys.bulkCreate(
            activationInputArr,
            {
              updateOnDuplicate: ["user_id", "user_email", "phone_no", "status"],
      
            }
          );
      
          // assign generic password to all users
          // let genericPassword = await createPassword(process.env.GENERIC_BULK_USER_PW || "Dimitra@123" );
          // await db.user.update({password: genericPassword}, {where: {id: userIdList}})
      
          // Set default unit settings for all newly created users
          if (userRes.length > 0) {
            for (const user of userRes) {
              try {
                await setDefaultUnitSettingsForAppUsers(user.id, orgRes.id);
              } catch (error) {
                console.error(`Error setting default unit settings for user ${user.id}:`, error);
              }
            }
          }
      
}

const validationCode = {
  101: "Either email or phone is required",
  102: "Either email or phone is invalid",
  103: "Email or phone is valid",
  104: "Email already exists",
  105: "Mobile already exists",
  106: "License key quota exceeded",

}

module.exports = {
  societyCompanyEstateCreation,
   activationKeyAndUserCreation,
   societyMembershipCreation
}