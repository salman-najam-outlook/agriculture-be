const _ = require("lodash");
const express = require("express");
const xlsx = require("xlsx");
const axios = require("axios");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { deleteFileS3 } = require(rootPath + "/helpers/aws_s3");
const fileUpload = require(rootPath + "/middleware/file_upload");
const userUploadValidator = require(rootPath +
  "/helpers/validators/userUpload");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");
const { Op } = require("sequelize");

router.get("/farmers", auth, async (req, res) => {
  try {
    const { search, hasPurchase } = req.query;
    let where = {
      firstName: {
        [Op.not]: null,
      },
    };

    if (!_.isEmpty(search)) {
      const fields = ["firstName","middleName", "lastName"];
      const searchQuery = fields.map((col) => {
        return {
          [col]: {
            [db.Sequelize.Op.like]: "%" + search + "%",
          },
        };
      });
      where = { ...where, [db.Sequelize.Op.or]: searchQuery };
    }

    const include = [
      {
        model: db.Membership,
        as: "user_membership",
        required: true,
        through: {
          model: db.UserMembershipMap,
        },
        include: [
          {
            model: db.UserRoleMembershipMap,
            as: "userRoleMembershipMap",
            where: {
              user_role_id: process.env.COFFEE_FARMER || "coffee_farmer",
            },
          },
        ],
      },
    ];

    const farmers = await db.user.findAll({
      include,
      attributes: ["id", "firstName","middleName", "lastName", "userType"],
      where: {
        organization: req.user.organization,
        active: true,
        firstName: {
          [Op.not]: null,
        }
      },
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { farmers },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/farm/:farmerId", auth, async (req, res) => {
  try {
    const { farmerId, farmName, search, geofence } = req.params;

    let where = { userId: farmerId, isDeleted: 0 };
    if (notEmpty(farmName)) {
      where.farmName = {
        [Op.like]: "%" + farmName + "%",
      };
    }

    let query = {
      include: [
        {
          attributes: ["unit_subCategory_id"],
          model: db.UnitConfiguration,
          as: "configuration",
          required: false,
          where: {
            unit_subCategory_id: [3, 14],
            // [db.Sequelize.Op.or]: [{ unit_subCategory_id: 'area' }, { unit_subCategory_id: 'parameter' }],
          },
          include: [
            {
              model: db.Unit,
              attributes: [["field", "name"]],
              as: "subCategory",
            },
            {
              model: db.Unit,
              attributes: ["id", ["field", "name"], "abbreviation"],
              as: "unit",
            },
          ],
        },

        {
          ...(geofence == 1 ? { required: true } : null),
          attributes: ["id", "lat", "log"],
          model: db.UserFarmCoordinate,
          as: "coordinates",
        },
        {
          attributes: ["id", "cropTypeOptId"],
          model: db.UserfarmCrop,
          as: "farmCrops",
          include: [
            {
              attributes: [
                "id",
                [
                  db.sequelize.literal("`farmCrops->cropVariety->crop`.`name`"),
                  "cropName",
                ],
              ],
              model: db.UserfarmCropVariety,
              as: "cropVariety",
              include: [{ model: db.Crop, as: "crop", attributes: [] }],
            },
          ],
        },
        {
          attributes: ["id", "farmingGoal"],
          model: db.UserFarmingGoal,
          as: "farmGoals",
        },
        {
          attributes: ["id", "displayName"],
          model: db.userLiveStock,
          as: "farmLivestocks",
          through: { attributes: [] },
        },
        {
          attributes: ["id", "displayName"],
          model: db.Equipment,
          as: "farmEquipments",
          through: { attributes: [] },
        },
        {
          attributes: [
            "id",
            "geofenceName",
            "geofenceArea",
            "geofenceParameter",
          ],
          model: db.Geofence,
          as: "segments",
          include: [
            {
              attributes: ["unit_subCategory_id"],
              model: db.UnitConfiguration,
              as: "configuration",
              required: false,
              where: {
                unit_subCategory_id: [3, 14],
              },
              include: [
                {
                  model: db.Unit,
                  attributes: [["field", "name"]],
                  as: "subCategory",
                },
                {
                  model: db.Unit,
                  attributes: ["id", ["field", "name"], "abbreviation"],
                  as: "unit",
                },
              ],
            },
            {
              model: db.GeofenceCoordinate,
              attributes: ["id", "lat", "log"],
              as: "coordinates",
              required: false,
            },
          ],
        },
        {
          model: db.user,
          as: "includeFarmOwner",
          attributes: ["id", "firstName","middleName", "lastName", "fullName"],
        },
        {
          model: db.Option,
          as: "includeFarmType",
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "userId",
        "farmName",
        "ownerName",
        "registrationNo",
        "farmOwnershipType",
        "address",
        "district",
        "zipCode",
        "farmingActivity",
        "area",
        "parameter",
        "lat",
        "log",
        "createdAt",
        // new
        "farmType",
        "productionSystem",
        "farmOwner",
        "country",
        "state",
        "city",
        "govRegistrationNum",
        "contractMating",
        "cooperativeId",
        "licenceNum",
        "licenceExpiryDate",
        "regulatorName",
        "regulatorRepresentiveName",
        "houseNum",
        "street",
      ],
      where,
      order: [["coordinates", "id", "ASC"]],
    };

    let [organization, result] = await Promise.all([
      db.sequelize.query(
        `select code from organization og inner join users u on og.id = u.organization where u.id=?`,
        {
          replacements: [farmerId],
          type: db.sequelize.QueryTypes.SELECT,
          plain: true,
        }
      ),
      db.user_farm.findAll(query),
    ]);

    let response = [];
    if (notEmpty(result)) {
      for (let el of result) {
        el = await el.toJSON();
        let { configuration, segments } = el;
        el.geofence = "Unmapped";
        el.farmId = organization?.code + "-" + el.id;
        // update configuration values
        el.configuration = configuration.map((config) => {
          return { name: config.subCategory?.name, unit: config?.unit };
        });
        if (notEmpty(segments)) {
          el.geofence = "Mapped";
          el.segments = segments.map((segment) => {
            let { configuration } = segment;
            // update configuration array inside segment array
            configuration = configuration.map((config) => {
              return { name: config.subCategory?.name, unit: config?.unit };
            });
            return { ...segment, configuration };
          });
        }
        response.push(el);
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          num_rows: response.length,
          data: response,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


const createCacaoWindBreaker = async (req, res) => {
    try {
        const { name } = req.body;
        let userId = req.user.id;
        const windBreakerRes = await db.WindBreaker.create({
          name,
          created_by: userId,
          status: "active",
        });
        return res.json(
          successRespSync({
            msg: "Wind breaker tree created",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const createCacaoVariety = async (req, res) => {
    try {
        const { name, cacao_species } = req.body;
        const windBreakerRes = await db.CacaoVariety.create({
          name,
          cacao_species,
          isDeleted:0
        });
        return res.json(
          successRespSync({
            msg: "Cacao variety is created",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
    }
}

const createCacaoSpecies = async (req, res) => {
    try {
        const { name } = req.body;
        let userId = req.user.id;
        const cacaoSpecies = await db.CacaoSpecies.create({
          name,
          isDeleted:0,
        });
        return res.json(
          successRespSync({
            msg: "Cacao Species created successfully",
            data: cacaoSpecies,
          })
        );
      } catch (error) {
        return serverError(res, error);
    }
}

const createHorticultureInfo = async (req, res) => {
    try {
        const { name } = req.body;
        let userId = req.user.id;
        const windBreakerRes = await db.HorticultureInformation.create({
          name,
          created_by: userId,
          status: "enabled",
        });
        return res.json(
          successRespSync({
            msg: "Wind breaker tree created",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
    }
}

const createShadeTree = async (req, res) => {
    try {
        const { name } = req.body;
        let userId = req.user.id;
        const shadeTree = await db.ShadeTree.create({
          name,
          created_by: userId,
          status: "active",
        });
        return res.json(
          successRespSync({
            msg: "Shade  tree created",
            data: shadeTree,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

router.post('/cacao-trees/:type', auth, translation, async (req, res) => {
    const { type } = req.params
    switch(type){
        case 'windBreaker':
            return await createCacaoWindBreaker(req, res)
        
        case 'horticultureInfo':
            return await createHorticultureInfo(req, res)

        case 'shadeTree':
            return await createShadeTree(req, res)

        case 'cacaoVariety':
            return await createCacaoVariety(req, res)

        case 'cacaoSpecies':
            return await createCacaoSpecies(req, res)
        
        default:
            return serverError(res, {error : 'Req param is incorrect'});
    }
})



const updateWindBreaker = async (req, res) => {
    try {
        const { name, status } = req.body;
        const { id } = req.params;
        const windBreakerRes = await db.WindBreaker.update(
          { name, status },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Wind breaker tree updated",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const updateCacaoVariety = async (req, res) => {
    try {
        const { name, cacao_species } = req.body;
        const { id } = req.params;
        const cacaoVariety = await db.CacaoVariety.update(
          { name, cacao_species },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Cacao variety tree updated",
            data: cacaoVariety,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const updateCacaoSpecies = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const cacaoSpecies = await db.CacaoSpecies.update(
          { name},
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Cacao species updated",
            data: cacaoSpecies,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const updateHorticultureUnfo = async (req, res) => {
    try {
        const { name, status } = req.body;
        const { id } = req.params;
        const horticultureInfo = await db.HorticultureInformation.update(
          { name, status },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Horticulture info updated",
            data: horticultureInfo,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const updateShadeTree = async (req, res) => {
    try {
        const { name, status } = req.body;
        const { id } = req.params;
        const shadeTree = await db.ShadeTree.update(
          { name, status },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Shade tree updated",
            data: shadeTree,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}


router.put("/cacao-trees/:type/:id", auth, async function (req, res) {
    const { type } = req.params
    switch(type){
        case 'windBreaker':
            return await updateWindBreaker(req, res)
        
        case 'horticultureInfo':
            return await updateHorticultureUnfo(req, res)

        case 'shadeTree':
            return await updateShadeTree(req, res)

        case 'cacaoVariety':
            return await updateCacaoVariety(req, res)

        case 'cacaoSpecies':
            return await updateCacaoSpecies(req, res)
        
        default:
            return serverError(res, {error : 'Req param is incorrect'});
    }
});




const getWindBreaker = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const { organization } = req.user;
        let query = {
          include: [
            {
              attributes: [],
              model: db.user,
              as: "user",
              where: { organization },
              required: true,
            },
          ],
          where: { isDeleted: false },
        };
        if (page && limit) {
          query.offset = parseInt((page - 1) * limit);
          query.limit = parseInt(limit);
        }
        let windBreakerRes = await db.WindBreaker.findAndCountAll(query);
    
        const { lang } = req?.headers;
    
        if (lang && lang !== "en") {
          windBreakerRes = req.translateFunction(
            windBreakerRes,
            globalTranslationCache,
            {
              lvl1: true,
              moduleName: "coffee/windBreaker",
            }
          );
        }
        return res.json(
          successRespSync({
            msg: "Wind breaker fetched",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const getHorticultureInfo = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const { organization } = req.user;
        let query = {
          include: [
            {
              attributes: [],
              model: db.user,
              as: "user",
              where: { organization },
              required: true,
            },
          ],
          where: { isDeleted: false },
        };
        if (page && limit) {
          query.offset = parseInt((page - 1) * limit);
          query.limit = parseInt(limit);
        }
        let horticulture = await db.HorticultureInformation.findAndCountAll(
          query
        );
    
        const { lang } = req?.headers;
    
        if (lang && lang !== "en") {
            horticulture = req.translateFunction(
            horticulture,
            globalTranslationCache,
            {
              lvl1: true,
              moduleName: "coffee/horticultureInfo",
            }
          );
        }
    
        return res.json(
          successRespSync({
            msg: "Horticulture info fetched",
            data: horticulture,
          })
        );
      } catch (error) {
        return serverError(res, error);
    }  
}

const getShadeTrees = async (req,res) => {
    try {
        const { page, limit } = req.query;
        const { organization } = req.user;
        let query = {
          include: [
            {
              attributes: [],
              model: db.user,
              as: "user",
              where: { organization },
              required: true,
            },
          ],
          where: { isDeleted: false },
        };
        if (page && limit) {
          query.offset = parseInt((page - 1) * limit);
          query.limit = parseInt(limit);
        }
        let shadeTrees = await db.ShadeTree.findAndCountAll(query);
    
        const { lang } = req?.headers;
    
        if (lang && lang !== "en") {
            shadeTrees = req.translateFunction(
            shadeTrees,
            globalTranslationCache,
            {
              lvl1: true,
              moduleName: "coffee/shadeTree",
            }
          );
        }
    
        return res.json(
          successRespSync({
            msg: "Shade tree fetched",
            data: shadeTrees,
          })
        );
      } catch (error) {
        return serverError(res, error);
    }
}

const getCacaoVariety = async (req, res) => {
    try {
        const { name, sortingType, page, limit } = req.query;
        let query = {
          where: { isDeleted: false },
        };
        query.include = [
          {
              model: db.CacaoSpecies,
          }
        ];
        if (page && limit) {
          query.offset = parseInt((page - 1) * limit);
          query.limit = parseInt(limit);
        }
        if (name && sortingType) {
          query.order = [[name, sortingType]];
        }
        let getCacaoVariety = await db.CacaoVariety.findAndCountAll(query);
        const { lang } = req?.headers;
    
        if (lang && lang !== "en") {
            getCacaoVariety = req.translateFunction(
            getCacaoVariety,
            globalTranslationCache,
            {
              lvl1: true,
              moduleName: "coffee/coffeeVariety",
            }
          );
        }
        return res.json(
          successRespSync({
            msg: "Cacao variety fetched",
            data: getCacaoVariety,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const getCacaoSpecies = async (req, res) => {
    try {
        const { name, sortingType, page, limit } = req.query;
        let query = { where: { isDeleted: false } };
        query.include = [
          {
            model: db.CacaoVariety,
          }
        ];
        if (page && limit) {
          query.offset = parseInt((page - 1) * limit);
          query.limit = parseInt(limit);
        }
        if (name && sortingType) {
          query.order = [[name, sortingType]];
        }
        let cacaoSpecies = await db.CacaoSpecies.findAndCountAll(query);
    
        const { lang } = req?.headers;
    
        if (lang && lang !== "en") {
            cacaoSpecies = req.translateFunction(
            cacaoSpecies,
            globalTranslationCache,
            {
              lvl1: true,
              moduleName: "coffee/coffeeSpecies",
            }
          );
        }
    
        return res.json(
          successRespSync({
            msg: "Cacao species fetched",
            data: cacaoSpecies,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }

}

router.get('/cacao-trees/:type', auth, translation, async (req, res) => {
    const { type } = req.params
    switch(type){
        case 'windBreaker':
            return await getWindBreaker(req, res)
        
        case 'horticultureInfo':
            return await getHorticultureInfo(req, res)

        case 'shadeTree':
            return await getShadeTrees(req, res)

        case 'cacaoVariety':
            return await getCacaoVariety(req, res)

        case 'cacaoSpecies':
            return await getCacaoSpecies(req, res)
        
        default:
            return serverError(res, {error : 'Req param is incorrect'});
    }
})


const deleteWindBreaker = async (req, res) => {
    try {
        const { id } = req.params;
        const windBreakerRes = await db.WindBreaker.update(
          { isDeleted: true },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Wind breaker tree deleted",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const deleteCacaoVariety = async (req, res) => {
    try {
        const { id } = req.params;
        const cacaoVariety = await db.CacaoVariety.update(
          { isDeleted: true },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Cacao variety tree deleted",
            data: cacaoVariety,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }  
}

const deleteCacaoSpecies = async (req, res) => {
    try {
        const { id } = req.params;
        const windBreakerRes = await db.CacaoSpecies.update(
          { isDeleted: true },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Cacao species deleted",
            data: windBreakerRes,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const deleteHorticultureInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const horticultureinfo = await db.HorticultureInformation.update(
          { isDeleted: true },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Horticulture info deleted",
            data: horticultureinfo,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}

const deleteShadeTree = async (req, res) => {
    try {
        const { id } = req.params;
        const shadetree = await db.ShadeTree.update(
          { isDeleted: true },
          { where: { id } }
        );
        return res.json(
          successRespSync({
            msg: "Shade tree deleted",
            data: shadetree,
          })
        );
      } catch (error) {
        return serverError(res, error);
      }
}



/**
 * @swagger
 * /cacao/cacao-data/cacao-trees/{type}/id:
 *   delete:
 *     summary: Delete windBreaker
 *     description: Delete windBreaker
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of windBreaker
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
 *                 example: { "success": true, "code": 200, "message": "Wind breaker tree deleted", "data": [ 1 ] }
 */
router.delete("/cacao-trees/:type/:id", auth, async function (req, res) {
    const { type } = req.params
    switch(type){
        case 'windBreaker':
            return await deleteWindBreaker(req, res)
        
        case 'horticultureInfo':
            return await deleteHorticultureInfo(req, res)

        case 'shadeTree':
            return await deleteShadeTree(req, res)

        case 'cacaoVariety':
            return await deleteCacaoVariety(req, res)

        case 'cacaoSpecies':
            return await deleteCacaoSpecies(req, res)
        
        default:
            return serverError(res, {error : 'Req param is incorrect'});
    }
});

module.exports = router;
