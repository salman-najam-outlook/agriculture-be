const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const { v4: randomSting } = require('uuid');

const _ = require('lodash');
const S3 = require(rootPath + '/components/s3upload');
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  "/helpers/api");

const db = require('../../models');

const { Roles, user, UserRole, AdminUsersRolesModulesPermissions, Modules } = db;
const { logErrorOccurred, notEmpty, isObject } = require(rootPath + "/helpers/general");


// List roles (paginated, search by role id)
router.get('/all-roles', async (req, res) => {
  try {
    const roles = await Roles.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(
      successRespSync({
        msg: "Fetched successfully",
        data: roles,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const where = {};
    if (req.query?.id) {
      where.id = req.query?.id;
    }
     if (req.query?.name) {
       where.name = {
        [Op.like]:`%${req.query?.name}%`
       }
    }
    const { rows: resData, count } = await Roles.findAndCountAll({
      include:[
        {
          model:db.Organization, 
          attributes:['id','name'],
          as:'organizationDetails',
          required:false
        }
      ],
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });
    res.json(
      successRespSync({
        msg: "Fetched successfully",
        data: {
          numRows: count,
          data: resData,
          total: count,
          page,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get one role by id
router.get('/:id', async (req, res) => {
  try {
    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json(errorRespSync({ msg: 'Role not found', code: 404 }));
    }
    res.json(
      successRespSync({
        msg: "Fetched successfully",
        data: { numRows: 1, data: [role] },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Create role
router.post('/', async (req, res) => {
  try {
    const {id, name, description, organization, role_type, editable = 1 } = req.body;
   
    if (!name) {
      return res.status(400).json(errorRespSync({ msg: 'Role name is required', code: 400 }));
    }
    const newRole = await Roles.create({ id, name, description, organization, role_type, editable });
    res.json(
      successRespSync({
        msg: "Role created successfully",
        data: { numRows: 1, data: [newRole] },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Update role
router.put('/:id', async (req, res) => {
  try {
    const { name, description, role_type } = req.body;
    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json(errorRespSync({ msg: 'Role not found', code: 404 }));
    }
    await role.update({ name, description, role_type });
    res.json(
      successRespSync({
        msg: "Role updated successfully",
        data: { numRows: 1, data: [role] },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get All Modules
// Get all role attached permissions 
// router.put('/permissions', async (req, res) => {
//   try {
//     const { roleId, modules } = req.body;
//     if (!roleId || !Array.isArray(modules)) {
//       return res.status(400).json(errorRespSync({ msg: 'roleId and modules array are required', code: 400 }));
//     }
//     if (!role) {
//       return res.status(404).json(errorRespSync({ msg: 'Role not found', code: 404 }));
//     }
//     // Delete existing permissions for the role
//     await AdminUsersRolesModulesPermissions.destroy({ where: { role_id: roleId } });
//     // Add new permissions
//     const newPermissions = modules.map(module => ({
//         role_id: roleId,  
//         module_id: `${roleId}_${module}`, // Prefix module with roleId to ensure uniqueness
//         permission_id: 'get', 
//     }));// Assuming 'get' as default permission, can be modified
//     const createdPermissions = await AdminUsersRolesModulesPermissions.bulkCreate(newPermissions);
//     // Fetch updated permissions
//     const role = await Roles.findByPk(roleId);
//     if (!role) {
//       return res.status(404).json(errorRespSync({ msg: 'Role not found', code: 404 }));
//     }
//     const permissions = await AdminUsersRolesModulesPermissions.findAll({
//       where: { role_id: roleId },
//     });
//     res.json(
//       successRespSync({
//         msg: "Role updated successfully",
//         data: { numRows: 1, data: permissions, permittedModules: modules },
//       })
//     );
//   } catch (err) {
//     logErrorOccurred(__filename, err);
//     return serverError(res, err);
//   }
// });

module.exports = router;
