const { Op } = require('sequelize');

const db = require(rootPath + "/models");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");

exports.getUserPermissions = async (roleId) => {
    let permissionsList =[]
    let sidebarMenuPerm = {}
     permissionsList = await db.RolesModulesPermissions.findAll({
        where: {
          role_id: roleId
        },
        include: [
          {
            model: db.Modules,
              include: [
                {
                  model: db.ParentModules,
                  // as: "parentModules"
                }
              ]
          }
        ]
      })
  
      let parentModuleToModulePerm = {}
      permissionsList.forEach(permission => {
        // if(permission.id && permission.id.includes("get")) {
          let tmpObj = {}
          tmpObj.module_id = permission.Module.id
          tmpObj.permission_id = permission.permission_id
          tmpObj.module_name = permission.Module.name
          tmpObj.permitted =  permission.permitted
          tmpObj.parent_module = permission.Module.ParentModule.name
          parentModuleToModulePerm[permission.Module.ParentModule.id] = [ ...(parentModuleToModulePerm[permission.Module.ParentModule.id] || []), tmpObj]
        // }
  
      })
  
  
  
      return parentModuleToModulePerm
  
  }
  exports.getUserRoles = async (userId) => {
    let result = await db.UserRoles.findOne({
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

  exports.getUserMemberships = async (userId) => {
    let results = await db.activationKeys.findAll({
      where: { user_id: userId, is_deleted: 0 },
      include: [
        {
          model: db.Membership,
          as: "membership_assoc"
        }
      ]
    });

    return results;
  };

  exports.getUserPermissionsByMemberships = async (userMemberships) => {
    let permissionList = [];
    let userRoleMembershipModulePermissions
    let userRoles = []
    let flatModuleRolePerm = []
    let finalModRolePermRet = []


    for (const membershipEl of userMemberships) {
      userRoleMembershipModulePermissions = await db.UserRoleMembershipMap.findAll({
        where: {
          membership_id: membershipEl.membership_assoc.id,
          isdeleted: 0
        },
        required: true,
        include: [
          {
            model: db.UserRole,
            as: "user_role",
            required: true,
            where :{
              isDeleted: null
            },
            include: [
              {
                model: db.UserRoleMembershipPermissions,
                as: 'userroleModulePermAssoc',
                required: true,
                where: {
                  membership_plan_id: membershipEl.membership_assoc.id,
                  isdeleted: { [Op.is]: null }
                },
                include: [
                  {
                    model: db.Modules,
                    include: [
                      {
                        model: db.ParentModules,
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ]
      })


     try {
       userRoleMembershipModulePermissions.forEach(el => {
         flatModuleRolePerm.push(...el.user_role.userroleModulePermAssoc)
       })
       let tmpArr = []
       tmpArr = flatModuleRolePerm.map(el => {
         const tempObj = {
           module_id: el.module_id,
           permission_id: el.permission_id,
           module_name: el.Module.name,
           permitted: el.permitted,
           user_role_id: el.user_role_id,
           parent_module: el.Module.ParentModule.name,
         };
         return tempObj
       })

       const uniqueModules = {};

      tmpArr.forEach(el => {
        const key = `${el.module_id}_${el.permission_id}_${el.module_name}_${el.parent_module}`;

        if (!uniqueModules[key] || !el.permitted) {
          uniqueModules[key] = el;
        }
      });

      const uniquemoduleRolePermissions = Object.values(uniqueModules);
      
       finalModRolePermRet.push(...uniquemoduleRolePermissions);
       userRoleMembershipModulePermissions.forEach(modPerm => {
         let tmpObj = {}
         tmpObj.id = modPerm.user_role.id
         tmpObj.name = modPerm.user_role.name
         userRoles.push(tmpObj)
       })
      
     } catch (error) {
      console.log(error)
     }

    }

    return {finalModRolePermRet, userRoles};
  }
