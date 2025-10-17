const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorRespSync, successRespSync, serverError, errorResp } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { deleteFileS3 } = require(rootPath + '/helpers/aws_s3');
const fileUpload = require(rootPath + '/middleware/file_upload');
const {orgFilter} = require(rootPath + '/helpers/utils');
const { membershipPostValidation } = require(rootPath +
  '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const translation = require(rootPath + '/middleware/translation');
const { Op } = require('sequelize');
const moment = require('moment');



router.put("/changeModulePermission", auth, validationErrorHandler, async (req, res) => {
  try {
    const { modulePermissionUpdates } = req.body

    // permitted updations
    let permittedUpdatesIds = modulePermissionUpdates.filter(modulePermissions => (modulePermissions.permitted)).map(mpIds => mpIds.id)

    // unpermitted updations
    let unPermittedUpdatesIds = modulePermissionUpdates.filter(modulePermissions => (!modulePermissions.permitted)).map(mpIds => mpIds.id)

    // update permitted module permission
    const permittedResult = await db.UserRoleMembershipPermissions.update(
      { permitted: 1 },
      { where: { id: permittedUpdatesIds } }
    );


    // update permitted module permission
    const unPermittedResult = await db.UserRoleMembershipPermissions.update(
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

router.get("/getUserRoles/:membershipId", auth, translation, validationErrorHandler, translation, async (req, res) => {
  try {
    let membershipId = req.params.membershipId;
    let listRes = []
    if(!membershipId){
      return res.json(
        await errorResp({
          code: 500,
          msg: "membership id is required",
        })
      );
    }
    
    //get userRoles associated to permissions
 
    listRes = await db.UserRole.findAll({
      attributes: ['id', 'name'],
      where: {
        isDeleted: {
          [db.Sequelize.Op.is]: null
        }
      },
      include: [
        {
        model: db.UserRoleMembershipPermissions,
        as: 'userroleModulePermAssoc',
        where: {
          membership_plan_id: membershipId,
          isdeleted: { [Op.is]: null }
        }
      }
      ]
    });
    if (req.headers.lang && req.headers.lang != 'en') {
    listRes = req.translateFunction(listRes, globalTranslationCache, 
      { lvl1: true,
        lvl2: true,
      })
    }
    const response = listRes.map(obj => { return { "id": obj.id, "name": obj.name } })
    return res.json(
      successRespSync({
        msg: "Roles fetched successfully",
        data: response
        
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
});

router.get("/allModulesPermissions/:membershipId", auth, translation, validationErrorHandler, async (req, res) => {
  try {
    const { membershipId } = req.params
    const { searchPhrase, user_role_id } = req.query
    let modules = [], searchQuery = {}
    if (searchPhrase) {
      searchQuery = {
        [Op.or]: [
          { "name": { [Op.like]: `%${searchPhrase}%` } },
          // { "description": { [Op.like]: `%${searchPhrase}%` } },
        ]
      }
    }
// console.log(user_role_id);
// return;
let user_role_id_condition = { };
if(user_role_id){
  user_role_id_condition.where = { id: user_role_id}
}else{
  return res.json(
    await errorResp({
      code: 500,
      msg: "user_role_id is required",
    })
  );
}
    modules = await db.ParentModules.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: db.Modules,
          as: 'modules',
          attributes: ['id', 'name'],
          include: [
            {
              model: db.UserRoleMembershipPermissions,
              as: 'userrole_membership_permissions',
              attributes: ['id', 'user_role_id','membership_plan_id', 'module_id', 'permission_id', 'permitted',
              [db.sequelize.literal('`modules->userrole_membership_permissions->Permission`.`name`'), 'permission_name']],
              required: true,            
                include: [
                {
                  model: db.Permissions,
                  attributes: [],
                },
                {
                  model: db.Membership,
                  attributes: [],
                
                },
                {
                  model: db.UserRole,
                  attributes: ["id", "name"],
                 ...user_role_id_condition
                }
              ],
              where: {
                membership_plan_id: membershipId,
                isdeleted: { [Op.is]: null }
              },
            }
          ],
          where: searchQuery
        },
      ]
    })
    modules = modules.filter(mod => mod.modules.length > 0)
    if (req.headers.lang && req.headers.lang != 'en') {
      modules =  req.translateFunction(modules, globalTranslationCache, {
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

router.post(
  '/',
  auth,
  membershipPostValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const {
        membershipType,
        description,
        membershipDuration,
        membershipDurationUnit,
        membershipFee,
        satelliteReport,
        advancedReport,
        userRoleId,

        plan_type,
        feeUnitType,
        allowed_users,
        allowed_farms,
        advanceReportTypeUnit,
        advancedReportUnit,
        satelliteReportTypeUnit,
        deforestationReport,
        deforestationReportTypeUnit,
        deforestationReportUnit,
        basicFarmLevelReport,
        advancedFarmLevelReport,
        largeAreaReport,
      } = req.body;

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
            { organization_id: req.user.organization }
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

      const permission = await db.Permissions.findAll({ raw: true });

      const transaction = await db.sequelize.transaction();

      try {
        let membershipDurationInDays = membershipDuration
        if (membershipDurationUnit === 'week(s)') {
          membershipDurationInDays = membershipDuration * 7
        } else if (membershipDurationUnit === 'month(s)') {
          membershipDurationInDays = membershipDuration * 30
        } else if (membershipDurationUnit === 'year(s)') {
          membershipDurationInDays = membershipDuration * 365
        }
        let memberRows = await db.Membership.create(
          {
            membership_type: membershipType,
            description: description,
            membership_duration: membershipDuration,
            membership_duration_in_days: membershipDurationInDays,
            membership_duration_unit: membershipDurationUnit,
            membership_fee: membershipFee,
            satellite_report: satelliteReport,
            advanced_report: advancedReport,
            // user_role_id: userRoleId,
            org_id: req.user.organization,
            subOrgId: req.user.subOrgId || null,
            plan_type,
            feeUnitType,
            allowed_users,
            allowed_farms,
            advanceReportTypeUnit,
            advancedReportUnit,
            satelliteReportTypeUnit,
            deforestationReport,
            deforestationReportTypeUnit,
            deforestationReportUnit,
            basicFarmLevelReport,
            advancedFarmLevelReport,
            largeAreaReport,
          },
          { transaction }
        );
        let userRoleMembershipInput = []
        userRoleMembershipInput = userRoleId.map(user_role => {
          return {
            membership_id: memberRows.id,
            user_role_id: user_role,
            isDeleted: false
          }
        })
       await db.UserRoleMembershipMap.bulkCreate(userRoleMembershipInput,  { transaction })

        const userMembershipModulePermissions = organizationRoleModules.reduce(
          (previousValue, { module_id, user_role_id, default_enabled }) => {
            permission.forEach(({ id: permissionId }) => {
              previousValue.push({
                id: `${user_role_id}_${memberRows.id}_${module_id}_${permissionId}`,
                user_role_id,
                membership_plan_id: memberRows.id,
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
        
        if(userMembershipModulePermissions.length > 0) {
          await db.UserRoleMembershipPermissions.bulkCreate(
            userMembershipModulePermissions,
            { transaction }
          );
        }

        await transaction.commit();

        return res.json(
          successRespSync({
            msg: 'Membership created successfully',
            data: {
              memberRows,
            },
          })
        );
      } catch (err) {
        await transaction?.rollback();
        return serverError(res, err);
      }
    } catch (err) {
      console.error(err);
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

router.put("/:id", auth, membershipPostValidation(), validationErrorHandler, async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {

    const { membershipType, description, membershipDuration, membershipDurationUnit, membershipFee, satelliteReport, advancedReport, role,
      plan_type,
      feeUnitType,
      allowed_users,
      allowed_farms,
      advanceReportTypeUnit,
      advancedReportUnit,
      satelliteReportTypeUnit,
      deforestationReport,
      deforestationReportTypeUnit,
      deforestationReportUnit,
      basicFarmLevelReport,
      advancedFarmLevelReport,
      largeAreaReport } = req.body
    let memberRows = await db.Membership.findOne({
      where: {
        id: req.params.id
      }
    })
    if (memberRows) {
      let membershipDurationInDays = membershipDuration
      if (membershipDurationUnit === 'week(s)') {
        membershipDurationInDays = membershipDuration * 7
      } else if (membershipDurationUnit === 'month(s)') {
        membershipDurationInDays = membershipDuration * 30
      } else if (membershipDurationUnit === 'year(s)') {
        membershipDurationInDays = membershipDuration * 365
      }


      await db.Membership.update({
        membership_type: membershipType,
        description: description,
        membership_duration: membershipDuration,
        membership_duration_in_days: membershipDurationInDays,
        membership_duration_unit: membershipDurationUnit,
        membership_fee: membershipFee,
        satellite_report: satelliteReport,
        advanced_report: advancedReport,
        // user_role_id: role

        plan_type,
        feeUnitType,
        allowed_users,
        allowed_farms,
        advanceReportTypeUnit,
        advancedReportUnit,
        satelliteReportTypeUnit,
        deforestationReport,
        deforestationReportTypeUnit,
        deforestationReportUnit,
        basicFarmLevelReport,
        advancedFarmLevelReport,
        largeAreaReport,

      }, { where: { id: req.params.id }, transaction })

      const userRoleMembershipInput = role && role.map(user_role => {
        return {
          membership_id: memberRows.id,
          user_role_id: user_role,
          isDeleted: false
        }
      })
      if (userRoleMembershipInput?.length) {
        await db.UserRoleMembershipMap.update(
          { isDeleted: true } /* set attributes' value */,
          { where: { membership_id: memberRows.id }, transaction });

        await db.UserRoleMembershipMap.bulkCreate(
          userRoleMembershipInput,
          {
            fields: ["membership_id", "user_role_id", "isDeleted"],
            updateOnDuplicate: ["membership_id", "user_role_id", "isDeleted"],
            transaction: transaction
          }
        );
      }

      const roleModules = await db.UserRoleModule.findAll({
        where: {
          user_role_id: {
            [db.Sequelize.Op.in]: role
          },
          isdeleted: {
            [db.Sequelize.Op.is]: null,
          },
          [db.Sequelize.Op.or]: [
            { organization_id: { [db.Sequelize.Op.is]: null } },
            { organization_id: req.user.organization }
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

      
      const permission = await db.Permissions.findAll({ raw: true });
      const userMembershipModulePermissions = organizationRoleModules.reduce(
        (previousValue, { module_id, user_role_id, default_enabled }) => {
          permission.forEach(({ id: permissionId }) => {
            previousValue.push({
              id: `${user_role_id}_${memberRows.id}_${module_id}_${permissionId}`,
              user_role_id,
              membership_plan_id: memberRows.id,
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

      await db.UserRoleMembershipPermissions.destroy({
        where: {
          membership_plan_id: memberRows.id,
          user_role_id: {
            [Op.notIn]: role,
          },
        },
        transaction,
      });

      await db.UserRoleMembershipPermissions.bulkCreate(
        userMembershipModulePermissions,
        { 
          updateOnDuplicate: ["user_role_id", "module_id", "membership_plan_id", "permission_id"],
          transaction 
        }
      );
      await transaction.commit();
    } else {
      return res.json(await errorResp({
        code: error.code.FORBIDDEN,
        msg: error.DOESNT_EXISTS
      }))
    }
    return res.json(
      successRespSync({
        msg: "Membership updated successfully",
        data: {
          memberRows
        }
      })
    );

  } catch (err) {
    await transaction?.rollback();
    return res.json(await errorResp({
      code: err?.original?.code || 500,
      msg: err?.original?.code == 'ER_DUP_ENTRY' ? error.ALREADY_EXISTS : error.SERVER
    }))
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    let membershipRes = []
    membershipRes = await db.UserMembershipMap.findAll({
      where: {
        membership_id: id
      }
    })
    if (membershipRes.length > 0) {
      return res.json(await errorResp({
        code: error.code.FORBIDDEN,
        msg: error.USER_MEMBERSHIP_EXISTS,
      }))
    } else {
      await db.UserRoleMembershipPermissions.destroy({
        where: {
          membership_plan_id: id
        }
      })
      await db.Membership.destroy({
        where: {
          id
        }
      })
      return res.json(
        successRespSync({
          msg: "Membership deleted successfully"
        })
      );
    }


  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

router.get("/", auth, validationErrorHandler, translation, async (req, res) => {
  try {

    let {
      page,
      limit,
      searchPhrase,
      orderField="createdAt",
      order="DESC"
    } = req.query;

    let listRes = [], query = {}

    if (orderField && order) {
      query.order = [[orderField, order]]
    } else {
      query.order = [["membership_type", "ASC"]]
    }
    if (searchPhrase) {
      query.where = {
        [Op.or]: [
          { "membership_type": { [Op.like]: `%${searchPhrase}%` } },
          { "description": { [Op.like]: `%${searchPhrase}%` } },
        ]
      }
    }
    if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }

    query.include = [
      {
        model: db.UserRoleMembershipMap,
        where: { isDeleted: false }, raw: true,
        attributes: ['user_role_id',],
        include: {
          model: db.UserRole,

          attributes: ['id', 'name'],

          as: 'user_role'
        },
        as: 'userRoleMembershipMap',
        // required: false
      }

    ]


    query.where = {org_id: req.user.organization, subOrgId: req.user.subOrgId || null, ...query.where}
    listRes = await db.Membership.findAndCountAll(query)

    if (req.headers.lang && req.headers.lang != 'en') {
      listRes.rows = req.translateFunction(listRes.rows, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        moduleName: 'adminMembership'
      })
    }
    return res.json(
      successRespSync({
        msg: "Membership fetched successfully",
        data: {
          listRes
        }
      })
    );

  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

router.get("/all", auth, validationErrorHandler, translation, async (req, res) => {
  try {
    let listRes = []
    const { roleId } = req.query
    if (roleId) {
      listRes = await db.Membership.findAll({
        include: {
          model: db.UserRoleMembershipMap,
          where: { isDeleted: false, user_role_id: roleId }, raw: true,
          attributes: ['user_role_id',],

          as: 'userRoleMembershipMap',
        },
        where: {
          org_id: req.user.organization,
          subOrgId: req.user.subOrgId || null
        }
      })
    } else {
      listRes = await db.Membership.findAll({
        include: {
          model: db.UserRoleMembershipMap,
          where: { isDeleted: false }, raw: true,
          attributes: ['user_role_id',],

          as: 'userRoleMembershipMap',
        },
        where: {
          org_id: req.user.organization,
          subOrgId: req.user.subOrgId || null
        }
      })
    }
    

    return res.json(
      successRespSync({
        msg: "Membership fetched successfully",
        data: {
          listRes
        }
      })
    );

  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})

router.put("/updateDefaultMembership/:id", auth, async (req, res) => {
  try {
    let where = {}
    await db.Membership.update({ default_status: 0 }, { where } );
    
    let update = await db.Membership.update({ default_status: 1 }, { where: {
      id: req.params.id
    } } );

    let data = await db.Membership.findOne({ where: {
      default_status: 1
    }});
    if (update) {
      res.json(
        await successRespSync({
          msg: 'Default membership updated',
          data
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
})

router.get("/user-role", auth, validationErrorHandler, translation, async (req, res) => {
  try {
    const adminType = req.user.adminType

    let where = {
      isDeleted: {
        [db.Sequelize.Op.is]: null
      }
    }

    let listRes = []
    listRes = await db.UserRole.findAll({ where })

    if (req.headers.lang && req.headers.lang != 'en' && listRes.length) {
      listRes = req.translateFunction(listRes, globalTranslationCache, {
        lvl1: true,
        lvl2: true
      })
    }

    return res.json(
      successRespSync({
        msg: "User Roles fetched successfully",
        data: {
          listRes
        }
      })
    );

  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
})
module.exports = router;