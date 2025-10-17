const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /user/module:
 *   get:
 *     summary: get all the modules of user along with it's submodules.
 *     description: get all the modules of user along with it's submodules.
 *     tags: [user-modules]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": "my_crops", "name": "My Crops", "module_type": "app_user", "modules": [ { "id": "harvesting", "id_name": null, "name": "Harvesting" }, { "id": "irrigation", "id_name": null, "name": "Irrigation" }, { "id": "observation", "id_name": null, "name": "Observations" }, { "id": "soilpreparation", "id_name": null, "name": "Land/Soil Preparation" }, { "id": "sowing", "id_name": null, "name": "Sowing/Planting" }, { "id": "storage", "id_name": null, "name": "Storage" }, { "id": "users/goal", "id_name": null, "name": "My Goals" }, { "id": "weed", "id_name": null, "name": "Weeding" } ] }, { "id": "my_farm", "name": "My Farm", "module_type": "app_user", "modules": [ { "id": "audit", "id_name": null, "name": "Soil Management" }, { "id": "crop", "id_name": null, "name": "Crop Registration" }, { "id": "documents", "id_name": null, "name": "My Documents" }, { "id": "farm", "id_name": null, "name": "Farm Registration" }, { "id": "geofencing", "id_name": null, "name": "My Geofences" }, { "id": "soil", "id_name": null, "name": "Soil Management" } ] }, { "id": "my_livestock", "name": "My Livestock", "module_type": "app_user", "modules": [ { "id": "livestock", "id_name": null, "name": "Animal Registration" }, { "id": "livestock/goal", "id_name": null, "name": "My Goals" } ] } ] }
 */
router.get(
  '/',
  auth,
  translation,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let where = { module_type: 'app_user' };

      let modules = await db.ParentModules.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'module_type'] },
        where,
        include: [
          {
            model: db.Modules,
            as: 'modules',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'parent_module_id'],
            },
          },
        ],
      });

      // this change is only for the schedule module listing, fixing coffee warehouse nesting issue in code instead of DB, because changing in DB may cause issue
      let coffeeWarehouse
      if(modules) {
        modules = JSON.parse(JSON.stringify(modules))
        coffeeWarehouse = modules.find(obj => obj.id === "warehouse");
        modules.forEach(obj => {
          let tmpModules = []
          if(obj.id == "coffee") {
            tmpModules = [...obj.modules, ...coffeeWarehouse.modules]
            obj.modules = tmpModules
          }

        })
      }
      
      modules = modules.filter(obj => obj.id !== "warehouse");

      if (req.headers.lang && req.headers.lang != 'en') {
        modules = req.translateFunction(modules, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
          moduleName: "modules",
        });
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: modules,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
