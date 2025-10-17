const express = require("express");
const moment = require("moment");
const router = express.Router();
const { Op } = require("sequelize");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty, isObject } = require(rootPath +
  "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language");
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  "/helpers/api");
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { isArray, difference } = require("lodash");
const {
  roleRequestsByUserValidation,
  roleDeleteValidation,
} = require("../../../helpers/validation");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const _ = require("lodash")
const { getUserMemberships, getUserPermissionsByMemberships } = require(rootPath + '/helpers/controller/user-permissions');

router.get("/", auth, async (req, res) => {
  try {
    const { id: userId, organization: org_id, subOrgId } = req.user;
    let userMenus = {}, userData = {}
     
     
    let userMemberships = await getUserMemberships(userId);
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
            if(permissionObj.module_name.includes("Dry Milling")) {
              userMenus["Dry Milling"] = permissionObj.permitted
            }
            if(permissionObj.module_name.includes("Buying Station")) {
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
            if(permissionObj.module_name.includes('EUDR Assessment')) {
              userMenus["EUDR Due Diligence"] = permissionObj.permitted;
            }
            if(org_id == 3 || org_id == 7 || org_id == 8) {
              userMenus["Processing Station"] = true
            }
          }
        })
    }

    
  // static sidemenu permissions for new indonesian org
    if(
    (org_id == (process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID ||  154)) ||
    (org_id == (process.env.KENYA_NACCU_ORG_ID || 239))
  ) {
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
    }  else {
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

    const isCacaoApp = req.headers.app_package_name?.includes('cacao');
     if(
      (org_id ==( process.env.INDONESIA_PT_SURVEY_ORGANIZATION_ID || 154)) || 
      (org_id == (process.env.INDONESIA_PT_EXPORTER_ID || 228))
    ) {
        coffeeSplash = false
      }
    

     if (!!hasCoffeeRole.length) {
       coffeeSplash = true
     }
     if(!!hasCocoaRole.length || isCacaoApp) {
      coffeeSplash = false
    }

    const organization = await db.Organization.findOne({
      where: { id: org_id },
      attributes: ['id', 'name', 'logo', 'splashScreen','is_logo_hide', 'is_splash_hide'],
    });
    const subOrg = await db.Organization.findOne({
      where: { id: subOrgId },
    });
    userData.userMenus = userMenus;
    userData.userMenusPermissions = userPermissions.finalModRolePermRet;
    userData.userRoles = userPermissions.userRoles;
    userData.coffeeSplash = coffeeSplash
    userData.user_organization = organization;
    userData.subOrg = subOrg;

    return res.json(
      await successRespSync({
        msg: "Fetched successfully",
        data: userData
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
