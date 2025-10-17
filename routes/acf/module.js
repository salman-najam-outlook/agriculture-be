const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../../models');
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");

const { ParentModules, Modules, Roles, AdminUsersRolesModulesPermissions, SidebarMenu, user } = db; 

router.get('/all-p-modules', async (req, res) => {
  try {
    const mdls = await ParentModules.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(successRespSync({
      msg: "Fetched successfully",
      data: mdls
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get all parent modules with pagination
router.get('/p-modules', async (req, res) => {
  try {
    let { page = 1, pageSize = 10 } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const offset = (page - 1) * pageSize;
    const { count, rows } = await ParentModules.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit: pageSize
    });

    res.json(successRespSync({
      msg: "Fetched successfully",
      data: {
        numRows: rows.length,
        data: rows,
        page,
        total: count
      }
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get one parent module by id
router.get('/p-modules/:id', async (req, res) => {
  try {
    const module = await ParentModules.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json(errorRespSync({ msg: 'Module not found', code: 404 }));
    }
    res.json(successRespSync({ msg: "Fetched successfully", data: { numRows: 1, data: [module] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Create parent module
router.post('/p-modules', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json(errorRespSync({ msg: 'Module name is required', code: 400 }));
    }
    const newModule = await ParentModules.create({ id: uuidv4(), name, module_type: 'admin' });
    res.json(successRespSync({ msg: "Module created successfully", data: { numRows: 1, data: [newModule] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Update parent module
router.put('/p-modules/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const module = await ParentModules.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json(errorRespSync({ msg: 'Module not found', code: 404 }));
    }
    await module.update({ name });
    res.json(successRespSync({ msg: "Module updated successfully", data: { numRows: 1, data: [module] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// --- CRUD for Modules ---

// List all modules with pagination
router.get('/modules', async (req, res) => {
  try {
    let { page = 1, pageSize = 10 } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Modules.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit: pageSize
    });
    res.json(successRespSync({
      msg: "Fetched successfully",
      data: {
        numRows: rows.length,
        data: rows,
        page,
        total: count
      }
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get one module by id
router.get('/modules/:id', async (req, res) => {
  try {
    const module = await Modules.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json(errorRespSync({ msg: 'Module not found', code: 404 }));
    }
    res.json(successRespSync({ msg: "Fetched successfully", data: { numRows: 1, data: [module] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Create module
router.post('/modules', async (req, res) => {
  try {
    const { id, name, parent_module_id } = req.body;
    if (!name || !parent_module_id) {
      return res.status(400).json(errorRespSync({ msg: 'Name and parent_module_id are required', code: 400 }));
    }
    const newModule = await Modules.create({ id, name, parent_module_id });
    res.json(successRespSync({ msg: "Module created successfully", data: { numRows: 1, data: [newModule] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Update module
router.put('/modules/:id', async (req, res) => {
  try {
    const { id, name, parent_module_id } = req.body;
    const module = await Modules.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json(errorRespSync({ msg: 'Module not found', code: 404 }));
    }
    await module.update({ id, name, parent_module_id });
    res.json(successRespSync({ msg: "Module updated successfully", data: { numRows: 1, data: [module] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Delete module
router.delete('/modules/:id', async (req, res) => {
  try {
    const module = await Modules.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json(errorRespSync({ msg: 'Module not found', code: 404 }));
    }
    await module.destroy();
    res.json(successRespSync({ msg: "Module deleted successfully", data: { numRows: 0, data: [] } }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


//** Module permission related code is here  */
router.get('/all-rolewise-permitted-modules/:roleId', async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Roles.findByPk(roleId);
    if (!role) {
      return res.status(404).json(errorRespSync({ msg: 'Role not found', code: 404 }));
    }
    const permissions = await AdminUsersRolesModulesPermissions.findAll({
      where: { role_id: roleId, permission_id:'get' },
    });
    const permittedModules = permissions.map(p => {
        const stripPrefix = p.module_id.replace(`${roleId}_`, '');
        return stripPrefix;
    })
    res.json(
      successRespSync({
        msg: "Role updated successfully",
        data: permittedModules,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/all-trimed-modules', async (req, res) => {
  try {

    const modules = await Modules.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });
    const roles = await Roles.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    const  pruneOverlappingRoles = (roleItems)  => {
        // Normalize input to an array of unique, trimmed strings
        const ids = Array.from(new Set(
          roleItems
            .map(x => (typeof x === 'string' ? x : x && x.id))
            .filter(Boolean)
            .map(s => String(s).trim())
        ));

        // Sort by length descending (longest first) so longer roles are kept first.
        ids.sort((a, b) => b.length - a.length);

        const result = [];
        for (const id of ids) {
          // If any already-kept role starts with `${id}_` then `id` is covered by that longer role,
          // so skip it. (We check existing.startsWith(id + '_') — correct direction.)
          const isCovered = result.some(existing => existing.startsWith(`${id}_`));
          if (!isCovered) {
            result.push(id);
          }
        }
        result.splice(result.indexOf('indonesia_ptsi_worker'), 1);
        result.push('indonesia_ptsi');
        return result;
      }

    const rls = pruneOverlappingRoles(roles)
  

    const globalModules = new Set();
    for (const role of pruneOverlappingRoles(roles)) {
      const roleWiseModule = modules.filter(mod => mod.id.startsWith(`${role}_`)).map(m => {
        return m.id.slice(role.length + 1); 
      })
      roleWiseModule.forEach(md => globalModules.add(md));
    }
    const uniqueGlobalModules = Array.from(globalModules);
    res.json(
      successRespSync({
        msg: "Fetched successfully",
        data: uniqueGlobalModules,
      })
    );

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.put('/update-role-modules/:roleId', async (req, res) => {
  try {
    const { roleId } = req.params;
    const { moduleIds } = req.body; // Expecting an array of module IDs

    if (!Array.isArray(moduleIds)) {
      return res.status(400).json(errorRespSync({ msg: 'moduleIds must be an array', code: 400 }));
    }

    const role = await Roles.findByPk(roleId);
    if (!role || !role.organization) {
      return res.status(404).json(errorRespSync({ msg: 'Role with organization not found', code: 404 }));
    }


    //dds_parent
    const insertableModuleIds = moduleIds.map(modId => ({
      id: `${roleId}_${modId}`,
      name: modId,
      parent_module_id: "dds_parent",
      type: "admin"
    }));

    await Modules.bulkCreate(insertableModuleIds, {
      updateOnDuplicate: ['name']
    });

    await AdminUsersRolesModulesPermissions.destroy({ where: { role_id: roleId } });

    // Create new permissions
    const newPermissionsForGet = moduleIds.map(modId => ({
      id: uuidv4(),
      role_id: roleId,
      module_id: `${roleId}_${modId}`, 
      permission_id: 'get', 
      permitted: 1
    }));
    const newPermissionForPost = moduleIds.map(modId => ({
      id: uuidv4(),
      role_id: roleId,
      module_id: `${roleId}_${modId}`, 
      permission_id: 'post', 
      permitted: 1
    }));

    const newPermissionForUpdate = moduleIds.map(modId => ({
      id: uuidv4(),
      role_id: roleId,
      module_id: `${roleId}_${modId}`, 
      permission_id: 'put', 
      permitted: 1
    }));

    const newPermissionForDelete = moduleIds.map(modId => ({
      id: uuidv4(),
      role_id: roleId,
      module_id: `${roleId}_${modId}`, 
      permission_id: 'delete', 
      permitted: 1
    }));

    const newPermissions = [
      ...newPermissionsForGet,
      ...newPermissionForPost,
      ...newPermissionForUpdate,
      ...newPermissionForDelete
    ];
    await AdminUsersRolesModulesPermissions.bulkCreate(newPermissions);
  
    const permissions = await AdminUsersRolesModulesPermissions.findAll({
      where: { role_id: roleId, permission_id:'get' },
    });
    const permittedModules = permissions.map(p => {
        const stripPrefix = p.module_id.replace(`${roleId}_`, '');
        return stripPrefix;
    })
    res.json(
      successRespSync({
        msg: "Role updated successfully",
        data: permittedModules,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
