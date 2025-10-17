const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { Op } = require('sequelize');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { irrigationTypeUpdatedValidator } = require(rootPath +
  '/helpers/validators/irrigation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId')

/**
 * @swagger
 * /irrigation/types-updated:
 *   get:
 *     description: Returns all irrigation subcategories with their category names (admin added and user specific)
 *     tags: [Irrigation]
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
 *                     properties:
 *                       subcategories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                              type: integer
 *                             name:
 *                              type: string
 *                             category:
 *                              type: string
 *                             isUserSpecific:
 *                              type: boolean
 *                             fromOptions:
 *                              type: boolean
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {
 *                     subcategories: [
 *                       { id: 1, name: "Furrow Irrigation", category: "Surface Irrigation", isUserSpecific: false },
 *                       { id: 2, name: "Border Irrigation", category: "Surface Irrigation", isUserSpecific: false },
 *                       { id: 3, name: "Basin Irrigation", category: "Surface Irrigation", isUserSpecific: false },
 *                       { id: "option_1", name: "Custom Method", category: "Other", isUserSpecific: true, fromOptions: true }
 *                     ]
 *                   }
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all subcategories from IrrigationTypeUpdated (only subcategories, not categories)
    let irrigationSubcategories = await db.IrrigationTypeUpdated.findAll({
      attributes: ['id', 'name', 'category', 'parentId', 'isUserSpecific', 'sortOrder'],
      order: [['category', 'ASC'], ['sortOrder', 'ASC'], ['name', 'ASC']],
      where: {
        isCategory: false, // Only subcategories
        [Op.or]: [
          { userId: null }, // System defaults
          { userId: userId } // User specific
        ]
      },
    });

    // Convert to simple subcategory list
    const subcategories = irrigationSubcategories.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      isUserSpecific: item.isUserSpecific,
      userId: userId
    }));    

    // Apply translation
    const translatedSubcategories = req.translateFunction(subcategories, globalTranslationCache, {
      lvl1: true,
      lvl2: false
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { subcategories: translatedSubcategories },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation/types-updated:
 *   post:
 *     description: Add new user-specific irrigation type subcategory
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creating new irrigation type subcategory
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                category:
 *                  type: string
 *                parentId:
 *                  type: integer
 *              required:
 *                - name
 *                - category
 *                - parentId
 *            example:
 *              name: Custom Well
 *              category: Ground Water
 *              parentId: 1
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                       category:
 *                        type: string
 *                       isUserSpecific:
 *                        type: boolean
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Irrigation type subcategory added successfully.
 *                   data: {"id": 30,"name": "Custom Well","category": "Ground Water","isUserSpecific": true}
 *        '409':
 *           description: Conflict
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
 *                 example:
 *                   success: false
 *                   code: 409
 *                   message: Irrigation type subcategory already exists.
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('IrrigationTypeUpdated'),
  irrigationTypeUpdatedValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, category, parentId } = req.body;

      // Validate that parentId exists and is a category
      const parentCategory = await db.IrrigationTypeUpdated.findOne({
        where: {
          id: parentId,
          isCategory: true
        }
      });

      if (!parentCategory) {
        return res.status(error.code.BAD_REQUEST).json(
          errorRespSync({
            msg: 'Invalid parent category',
            code: error.code.BAD_REQUEST,
          })
        );
      }

      // Check if subcategory already exists for this user
      const exists = await db.IrrigationTypeUpdated.findOne({
        where: {
          name,
          category,
          parentId,
          userId: {
            [Op.or]: [userId, null],
          },
        },
      });

      if (exists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: 'Irrigation type subcategory already exists',
            code: error.code.CONFLICT,
            data: { id: exists.id, name: exists.name },
          })
        );
      }

      // Get the next sort order for this category
      const maxSortOrder = await db.IrrigationTypeUpdated.max('sortOrder', {
        where: {
          parentId,
          userId: {
            [Op.or]: [userId, null],
          },
        }
      });

      const irrigationType = await db.IrrigationTypeUpdated.create({
        name,
        category,
        parentId,
        isCategory: false,
        isUserSpecific: true,
        userId,
        sortOrder: (maxSortOrder || 0) + 1
      });

      return res.json(
        successRespSync({
          msg: 'Irrigation type subcategory added successfully',
          data: {
            id: irrigationType.id,
            name: irrigationType.name,
            category: irrigationType.category,
            isUserSpecific: irrigationType.isUserSpecific,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /irrigation/types-updated/user-specific:
 *   get:
 *     description: Returns only user-specific irrigation type subcategories
 *     tags: [Irrigation]
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
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                          type: integer
 *                         name:
 *                          type: string
 *                         category:
 *                          type: string
 *                         parentId:
 *                          type: integer
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [
 *                     { id: 30, name: "Custom Well", category: "Ground Water", parentId: 1 }
 *                   ]
 */
router.get('/user-specific', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    
    let userSpecificTypes = await db.IrrigationTypeUpdated.findAll({
      attributes: ['id', 'name', 'category', 'parentId', 'sortOrder'],
      order: [['sortOrder', 'ASC'], ['name', 'ASC']],
      where: {
        userId: userId,
        isUserSpecific: true,
        isCategory: false
      },
    });

    userSpecificTypes = req.translateFunction(userSpecificTypes, globalTranslationCache, {
      lvl1: true,
      lvl2: false
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: userSpecificTypes,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router; 