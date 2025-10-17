const jwt = require("jsonwebtoken");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { errorResp, errorRespSync } = require(rootPath + "/helpers/api");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { admin_roles, access_types } = require("../helpers/consts");
const admin_roles_arr = admin_roles.map((role) => role.id);
const {loggableApis} = require('../logger_config.js');

const { Op } = require('sequelize');
const User = require("../mongoose-models/User");

// loading models
const db = require(rootPath + "/models");

module.exports = async function auth(req, res, next) {
  endPoint = req.baseUrl
  httpMethod = req.method
  // Get token from header
  const token = req.header("oauth-token");
  // Check if not token
  if (!token) {
    return res
      .status(error.code.UNAUTHORIZED)
      .json(
        errorRespSync({ code: error.code.UNAUTHORIZED, msg: error.NO_TOKEN })
      );
  }
  // Verify token
  // try {
    try {
      // verify jwt signature
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      let baseUrl = req.baseUrl;
      let requestedModule = baseUrl.split("api/")[1];
      let nDate = new Date()
      const { userId } = decoded.data;
      const [userInfo, mongoUserInfo] = await Promise.all([
        db.user.findOne({
          include: [
            {
              attributes: ['id', 'membership_type'],
              model: db.Membership,
              as: 'user_membership',
              through: { attributes: [] },
            },
            {
              attributes: ['id', 'name', 'role_type'],
              model: db.Roles,
              as: 'user_role',
              through: { attributes: [] },
            },
          ],
          where: { id: userId },
        }),
        User.findOne({ cfUserId: userId }).select('_id organization subOrganization verified').lean().exec(),
      ]);
      // return res.json(userInfo);
      let userRolesRes = [];
      userRolesRes = await getUserRoles(userId);
      let isAdmin = userRolesRes
        .filter((userRole) => {
          if (userRole["roles.role_type"] == "admin") {
            return userRole;
          }
        })
        .map((r) => r.role_id);
      const isSuperAdmin = userRolesRes.some(userRole => userRole.role_id === 'super_admin');
      const isSubEnterprise = userRolesRes.some(userRole => userRole.role_id === 'sub_enterprise');
      let sidebarMenus = [];
      let logInfo = {
        time: nDate.toUTCString(),
        UTCTimeStamp: nDate.getTime(),
        userName: userInfo ? `${userInfo.firstName} ${userInfo.middleName || ''} ${userInfo.lastName}`.trim() : '',
        // role: userRolesRes.map(role => role.role_id),
        role: userInfo && userInfo?.user_role?.map(({ id }) => id),
        isAdmin,
        membership: userInfo && userInfo?.user_membership?.map(({ membership_type }) => membership_type),
        roleType: userInfo && userInfo?.user_role?.map((role) => role.role_type),
        'terminalId/IP': req.socket.remoteAddress,
        moduleAccessed: requestedModule,
        typeOfAccess: access_types[req.method],
        org_id: userInfo && userInfo?.organization
      };



      if (isAdmin && isAdmin.length > 0) {
        sidebarMenus = await getSideBarMenus(isAdmin);
      } else {

        let method = req.method.toLowerCase();
          let hasPermission = []
          hasPermission = await getPermission(userId, method, baseUrl)

          // if(hasPermission.length <= 0) {
          //   return res.status(error.code.UNAUTHORIZED).json(
          //     await errorResp({
          //       code: error.code.UNAUTHORIZED,
          //       msg: "User doesnt have permission",
          //     })
          //   );
            
          // }
      }

      req.user = {
        id: userId,
        firstName: userInfo?.firstName,
        middleName: userInfo?.middleName,
        lastName: userInfo?.lastName,
        name: `${userInfo?.firstName} ${userInfo?.lastName}`,
        organization: userInfo && userInfo?.organization,
        subOrgId: userInfo && userInfo?.subOrganizationId,
        countryId: userInfo && userInfo.countryId || null,
        countryIsoCode: userInfo && userInfo.countryIsoCode || null,
        country: userInfo && userInfo.country || null,
        state: userInfo && userInfo.stateId || null,
        adminType: userInfo && userInfo.adminType || null,
        userRoles: userRolesRes,
        sideBarMenus: sidebarMenus,
        isAdmin: isAdmin && isAdmin.length > 0,
        email: userInfo?.email || null,
        mongoId: mongoUserInfo && mongoUserInfo._id,
        mongoOrganizationId: mongoUserInfo && mongoUserInfo.organization,
        mongoSubOrganizationId: mongoUserInfo && mongoUserInfo.subOrganization,
        isSuperAdmin,
        isSubEnterprise,
        clientMetadata: {
          ipAddress: req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || req.ip,
          referer: req.headers?.['referer'],
          userAgent: req.headers?.['user-agent'],
          screenSize: req.headers?.['screensize'],
          timezone: req.headers?.['timezone'],
          origin: req.headers?.['origin'],
        }
      };

      await saveLogInMongo(req)
      next();
    } catch (err) {
      logErrorOccurred(__filename, err);
      if(err.name && (
        err.name === 'JsonWebTokenError' || 
        err.name === 'TokenExpiredError' || 
        err.name === 'NotBeforeError' || 
        err.name === 'JsonWebTokenVerificationError' || 
        err.name === 'JsonWebTokenAlgorithmError' || 
        err.name === 'JsonWebTokenExpired')) {
        return res.status(401).json({
          success: false,
          code: 401,
          message: err.message
        })
      }
      return res.status(500).json(
        await errorResp({
          code: 500,
          msg:  err.message,
          module: 'general'
        })
      );
      // if(err?.name == "JsonWebTokenError") {
      //   return res.status(error.code.UNAUTHORIZED).json(
      //     await errorResp({
      //       code: error.code.UNAUTHORIZED,
      //       msg: error.INVALID_JWT_TOKEN,
      //       module: 'general'
      //     })
      //   );
      // } else {
      //   return res.status(error.code.SERVER_ERROR).json(
      //     await errorResp({
      //       code: error.code.SERVER_ERROR,
      //       msg: error.SERVER,
      //       module: 'general'
      //     })
      //   );
      // }
   
    }
  // } catch (err) {
  //   logErrorOccurred(__filename, err);
  //   res.status(error.code.SERVER).json(await errorResp());
  // }
};

async function getPermission(userId, method, baseUrl) {
  requestedModule = baseUrl.split("api/")[1];
  let results = await db.UserMembershipMap.findAll({
    where: {
      user_id: userId,
    },
    // include: [
    //   {
    //     model: db.Membership,
    //     as: "membership",
    //     include: [
    //       {
    //         model: db.UserRoleMembershipPermissions,
    //         as: "roleModulePermAssoc",
    //         include: [
    //           {
    //             model: db.Modules,
    //             attributes: ["id", "id_name"],
    //             where: {
    //               [Op.or]: [{ id: requestedModule }, { id_name: requestedModule }],
    //             },
    //           }
    //         ],
    //         where: {
    //           permitted: true,
    //           isdeleted: { [Op.is]: null },
    //         }
    //       }
    //     ]
    //   },
    // ],
  });
  let retResult = []
  results.forEach(el => {
    if(el?.membership?.roleModulePermAssoc) {
      retResult.push(
        ...el?.membership?.roleModulePermAssoc
      )
    }
  })
  return retResult
  
}

async function getUserRoles(userId) {
  let result = await db.AdminUserRoles.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: db.Roles,
        as: "roles",
      },
    ],
    raw: true,
  });
  return result;
}

async function getSideBarMenus(roleIds) {
  let sidebarRes = await db.AdminSidebarMenu.findAll({
    attributes: [
      "active",
      "id",
      "sidebar_menu_id",
      "sidebar_menu_name",
      "sidebar_submenu_obj",
    ],
    where: {
      role_id: roleIds,
      active: 1,
    },
    raw: true,
  });

  let sidebarIds = [];
  let sidebarIdToSidebar = {};
  sidebarIds = sidebarRes.map((s) => {
    sidebarIdToSidebar[s.id] = s;
    return s.id;
  });

  let sidebarModuleIds = [];
  let sidebarModuleRes = await db.MapSidebarModule.findAll({
    where: {
      sidebar_menu_id: sidebarIds,
    },
    raw: true,
  });

  let moduleIdToSidebar = {};
  sidebarModuleIds = sidebarModuleRes.map((sm) => {
    moduleIdToSidebar[sm.module_id] = sm.sidebar_menu_id;
    return sm.module_id;
  });
  let sidebarModuleRolePermissions = await db.AdminUsersRolesModulesPermissions.findAll({
    where: {
      module_id: sidebarModuleIds,
    },
    raw: true,
  });

  let permittedModules = [];

  if (sidebarModuleRolePermissions && sidebarModuleRolePermissions.length > 0) {
    permittedModules = sidebarModuleRolePermissions
      .filter((smr) => {
        if (smr.permission_id == "get" && smr.permitted == 1) {
          return smr.module_id;
        }
      })
      .map((smr) => smr.module_id);
  }
  let permittedSidebarRes = [];
  permittedModules.forEach((pm) => {
    if (moduleIdToSidebar[pm]) {
      permittedSidebarRes.push(sidebarIdToSidebar[moduleIdToSidebar[pm]]);
    }
  });

  return permittedSidebarRes;
}


async function saveLogInMongo(req) {
     let originalUrl = req.originalUrl;
        const matchedApi = loggableApis.find(api => {
            return api.startsWith(originalUrl) || api.includes(originalUrl);
        });

        if(matchedApi && (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE')) {
               const mongoClient = req.app.locals.mongoClient;
            if (mongoClient) {
              const db = mongoClient.db(process.env.MONGO_DB);
              const collection = db.collection(process.env.MONGO_DB_Failure_COLLECTION)
              const activityCollection = db.collection(process.env.MONGO_DB_ACTIVITY_COLLECTION)

              await activityCollection.insertOne({
                userId: req.user.id ?? null,
                orgId: req.user.organization ?? null,
                subOrgId: req.user.subOrgId ?? null,
                endpoint: originalUrl,
                payload: req.body,
                method: req.method,
                userAgent: req.headers['user-agent'],
                ipInfo: req.headers['x-ip-info'] || req.socket.remoteAddress || req.ip,
                createdAt: new Date()
            })
          }
        }

 
}