const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { serverError, successRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const controller = require(rootPath + '/helpers/controller');

/**
 * @desc fetch list of the animal species
 */

router.get(
  '/species',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { name } = req.query;
      let attributes = null;
      let where = { species: '-1' };

      // add search query if `name` is not empty
      if (notEmpty(name)) {
        where.name = {
          [db.Sequelize.Op.like]: '%' + name + '%',
        };
      }
      // fetch list of the species
      let species = await controller.DimAnimal.getList(req, attributes, where);

      // send response
      return res.json(
        successRespSync({
          msg:
            species == null || species == []
              ? success.NO_RESPONSE
              : success.FETCH,
          data: { species },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc fetch list of the animal types
 */
router.get(
  '/types',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { name, specieId } = req.query;
      let attributes = null;
      let where = { type: '-1' };

      // add search query if `name` is not empty
      if (notEmpty(name)) {
        where = {
          ...where,
          name: { [db.Sequelize.Op.like]: '%' + name + '%' },
        };
      }
      // check `specieId` is not empty
      if (notEmpty(specieId)) {
        where = {
          ...where,
          species: specieId,
        };
      }
      // fetch list of the species
      let types = await controller.DimAnimal.getList(req, attributes, where);

      // send response
      return res.json(
        successRespSync({
          msg:
            types == null || types == [] ? success.NO_RESPONSE : success.FETCH,
          data: { types },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc fetch list of the animal categories
 */
router.get(
  '/class',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { name, specieId } = req.query;
      let attributes = null;
      let where = { class: '-1' };

      // add search query if `name` is not empty
      if (notEmpty(name)) {
        where = {
          ...where,
          name: { [db.Sequelize.Op.like]: '%' + name + '%' },
        };
      }
      // check `specieId` is not empty
      if (notEmpty(specieId)) {
        where = {
          ...where,
          species: specieId,
        };
      }
      // fetch list of the species
      let animalClass = await controller.DimAnimal.getList(
        req,
        attributes,
        where
      );

      // send response
      return res.json(
        successRespSync({
          msg:
            animalClass == null || animalClass == []
              ? success.NO_RESPONSE
              : success.FETCH,
          data: { animalClass },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Get list of the live stock breed
 */
router.get(
  '/breed',
  validate.listValidation(),
  validationErrorHandler,
  auth,
  async (req, res) => {
    try {
      let { page, limit, name, typeId } = req.query;
      let where = {};

      // check if search is not null and undefined
      if (name != null && name != undefined && name.length > 0) {
        where = {
          ...where,
          breedName: {
            [db.Sequelize.Op.like]: '%' + name + '%',
          },
        };
      }

      // check `type` is not empty
      if (notEmpty(typeId)) {
        where = {
          ...where,
          typeDimAnimalId: typeId,
        };
      }

      // generating query
      let query = {
        include: [
          {
            model: db.DimAnimal,
            as: 'animalType',
            attributes: ['name'],
            where: { type: '-1' },
          },
        ],
        attributes: ['id', 'breedName'],
        where,
        raw: true,
        nest: true,
      };

      // check `page` and `limit` is not empty
      if (notEmpty(page) && notEmpty(limit)) {
        limit = parseInt(limit);
        query = {
          ...query,
          offset: (page - 1) * limit,
          limit,
        };
      }

      // get Animal Types
      let result = await db.AnimalBreeds.findAll(query);
      result = {
        num_rows: result.length,
        data: result,
      };
      // send response
      res.json(
        await successRespSync({
          msg: success.FETCH,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc fetch list of the animal groups
 */
router.get(
  '/groups',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { name } = req.query;
      let attributes = null;
      let where = { herdName: '-1' };

      // add search query if `name` is not empty
      if (notEmpty(name)) {
        where.name = {
          [db.Sequelize.Op.like]: '%' + name + '%',
        };
      }
      // fetch list of the groups
      let groups = await controller.DimAnimal.getList(req, attributes, where);

      // send response
      return res.json(
        successRespSync({
          msg:
            groups == null || groups == []
              ? success.NO_RESPONSE
              : success.FETCH,
          data: { groups },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc fetch list of the animal groups
 */
router.get(
  '/categories',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { name, typeId } = req.query;
      let attributes = null;
      let where = { lifeStages: '-1' };

      // add search query if `name` is not empty
      if (notEmpty(name)) {
        where = {
          ...where,
          name: {
            [db.Sequelize.Op.like]: '%' + name + '%',
          },
        };
      }

      // check if type id is not empty
      if (notEmpty(typeId)) {
        // generate subquery
        const tempSQL = `SELECT DISTINCT lifeStages FROM dim_animal where type=${typeId} and lifeStages>0`;
        // add subquery in where clause
        where = {
          ...where,
          id: {
            [db.Sequelize.Op.in]: db.sequelize.literal(`(${tempSQL})`),
          },
        };
      }

      // fetch list of the categories
      let categories = await controller.DimAnimal.getList(
        req,
        attributes,
        where
      );

      // send response
      return res.json(
        successRespSync({
          msg:
            categories == null || categories == []
              ? success.NO_RESPONSE
              : success.FETCH,
          data: { categories },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc fetch list of the male animals
 */
router.get(
  '/male-parent',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { search, typeId: typeDimAnimalId } = req.query;
      let attributes = ['id', 'animalNumber', 'name', 'tagNumber'];
      let where = { gender: 'male', typeDimAnimalId };

      // check if search query is not empty
      if (notEmpty(search)) {
        let searchQuery = [];
        const fields = attributes;

        fields.forEach((field) => {
          let query = {};
          query[field] = {
            [db.Sequelize.Op.like]: '%' + search + '%',
          };
          searchQuery.push(query);
        });

        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      // fetch list of the categories
      let animals = await controller.Livestock.getList(req, attributes, where);

      // send response
      return res.json(
        successRespSync({
          msg:
            animals == null || animals == []
              ? success.NO_RESPONSE
              : success.FETCH,
          data: { animals },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc fetch list of the female animals
 */
router.get(
  '/female-parent',
  auth,
  // validate.optionValidationGet(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { search, typeId: typeDimAnimalId, discardAnimalId } = req.query;
      let attributes = [
        'id',
        'tagNumber',
        'animalNumber',
        'name',
        'gender',
        // "weight",
        'dob',
        'createdAt',
      ];
      let where = { gender: 'female', typeDimAnimalId };

      // check if search query is not empty
      if (notEmpty(search)) {
        let searchQuery = [];
        const fields = attributes;

        fields.forEach((field) => {
          let query = {};
          query[field] = {
            [db.Sequelize.Op.like]: '%' + search + '%',
          };
          searchQuery.push(query);
        });

        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      // check if `discardAnimalId` field is not empty
      if (notEmpty(discardAnimalId)) {
        where = { ...where, id: { [db.Sequelize.Op.ne]: discardAnimalId } };
      }

      // fetch list of the categories
      let animals = await controller.Livestock.getList(req, attributes, where);

      // send response
      return res.json(
        successRespSync({
          msg:
            animals == null || animals == []
              ? success.NO_RESPONSE
              : success.FETCH,
          data: { animals },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
