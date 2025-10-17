const { Router } = require('express');
const auth = require('../../middleware/auth');
const { checkSchema } = require('express-validator');
const validation_error_handler = require('../../middleware/validation_error_handler');
const { successRespSync, errorRespSync, serverError } = require('../../helpers/api');
const { success, error } = require('../../helpers/language');
const { logErrorOccurred } = require('../../helpers/general');
const db = require('../../models');
const translationMiddleware = require('../../middleware/translation/translationEngine.js');
const translationResponseMiddleware = require('../../middleware/translation/translationResponseMiddleware.js');
const { tutorialCreateRequestConfig, tutorialListResponseConfig, tutorialByIdResponseConfig, tutorialUpdateRequestConfig } = require('../../middleware/translation/configs/tutorialConfig.js');

const router = Router();

/**
 * @swagger
 * /tutorials:
 *   get:
 *     summary: Get tutorials for current user's organization
 *     tags:
 *       - Tutorials
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Tutorials retrieved successfully
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, user_type } = req.query;
    const user = req.user;
    
    // Filter by user type (app or admin)
    const requestedUserType = user_type || (user.isAdmin ? 'admin' : 'app');
    
    const whereClause = {
      is_active: true,
      user_type: requestedUserType
    };
    
    // Filter by organization or global tutorials
    if (user.organization) {
      // Fetch organization name to check if it's Indonesian or Kenyan client
      const organizationData = await db.Organization.findOne({
        where: { id: user.organization },
        attributes: ['name']
      });
      
      const organizationConditions = [{ organization_id: user.organization }];
      
      // Check if user's organization is Indonesian or Kenyan
      const isIndonesianClient = organizationData?.name === 'PT Surveyor Indonesia';
      const isKenyaClient = organizationData?.name === 'National Coffee Cooperative Union';
      
      // Only include global tutorials (organization_id: null) if NOT Indonesian or Kenyan client
      if (!isIndonesianClient && !isKenyaClient) {
        organizationConditions.push({ organization_id: null });
      }
      
      whereClause[db.Sequelize.Op.or] = organizationConditions;
    } else {
      whereClause.organization_id = null;
    }
    
    const tutorials = await db.Tutorial.findAndCountAll({
      where: whereClause,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      include: [
        {
          model: db.Organization,
          as: 'organization',
          attributes: ['id', 'name']
        }
      ]
    });
    
    res.locals.data = {
      tutorials: tutorials.rows.map(tutorial => tutorial.toJSON()),
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(tutorials.count / parseInt(limit)),
        total_items: tutorials.count,
        items_per_page: parseInt(limit)
      }
    };
    next();
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
}, translationResponseMiddleware(tutorialListResponseConfig));

/**
 * @swagger
 * /tutorials/admin/all:
 *   get:
 *     summary: Get all tutorials for admin management
 *     tags:
 *       - Tutorials
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: organization_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: user_type
 *         schema:
 *           type: string
 *           enum: [app, admin]
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and description
 *     responses:
 *       200:
 *         description: Tutorials retrieved successfully
 */
router.get('/admin/all', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, organization_id, user_type, is_active, search } = req.query;
    
    const whereClause = {};
    
    // Organization filter
    if (organization_id !== undefined) {
      if (organization_id === 'null' || organization_id === null) {
        // Filter for global tutorials only (organization_id = null)
        whereClause.organization_id = null;
      } else {
        // Filter for specific organization
        whereClause.organization_id = parseInt(organization_id);
      }
    }
    
    // User type filter
    if (user_type) {
      whereClause.user_type = user_type;
    }
    
    // Status filter
    if (is_active !== undefined) {
      whereClause.is_active = is_active === 'true';
    }
    
    // Search filter (search in title and description)
    if (search) {
      whereClause[db.Sequelize.Op.or] = [
        { title: { [db.Sequelize.Op.like]: `%${search}%` } },
        { description: { [db.Sequelize.Op.like]: `%${search}%` } }
      ];
    }
    
    const tutorials = await db.Tutorial.findAndCountAll({
      where: whereClause,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      include: [
        {
          model: db.Organization,
          as: 'organization',
          attributes: ['id', 'name']
        }
      ]
    });
    
    res.locals.data = {
      tutorials: tutorials.rows.map(tutorial => tutorial.toJSON()),
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(tutorials.count / parseInt(limit)),
        total_items: tutorials.count,
        items_per_page: parseInt(limit)
      }
    };
    next();
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
}, translationResponseMiddleware(tutorialListResponseConfig));

/**
 * @swagger
 * /tutorials:
 *   post:
 *     summary: Create a new tutorial
 *     tags:
 *       - Tutorials
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               organization_id:
 *                 type: integer
 *               display_order:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tutorial created successfully
 */
router.post('/', auth, 
  translationMiddleware(tutorialCreateRequestConfig, ['tutorials']),
  checkSchema({
    title: {
      isString: true,
      trim: true,
      notEmpty: true,
      isLength: { options: { min: 3 } }
    },
    description: {
      isString: true,
      trim: true,
      optional: true
    },
    url: {
      isString: true,
      trim: true,
      notEmpty: true
    },
    organization_id: {
      optional: true,
      custom: {
        options: (value) => {
          if (value === null || value === undefined) return true;
          return Number.isInteger(Number(value));
        }
      }
    },
                user_type: {
                  isIn: {
                    options: [['app', 'admin']]
                  },
                  optional: true
                },
    display_order: {
      isInt: true,
      optional: true
    },
    is_active: {
      isBoolean: true,
      optional: true
    }
  }),
  validation_error_handler,
  async (req, res) => {
    try {
      const user = req.user;
      const tutorialData = {
        ...req.body,
        created_by: user.id,
        updated_by: user.id
      };
      
      const tutorial = await db.Tutorial.create(tutorialData);
      
      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: tutorial
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
 * /tutorials/{id}:
 *   put:
 *     summary: Update a tutorial
 *     tags:
 *       - Tutorials
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               organization_id:
 *                 type: integer
 *               display_order:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tutorial updated successfully
 */
router.put('/:id', auth,
  translationMiddleware(tutorialUpdateRequestConfig, ['tutorials']),
  checkSchema({
    id: {
      isInt: true,
      toInt: true
    }
  }),
  validation_error_handler,
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
      
      const tutorial = await db.Tutorial.findByPk(id);
      if (!tutorial) {
        return res.json(
          errorRespSync({
            code: 404,
            msg: 'Tutorial not found'
          })
        );
      }
      
      const updateData = {
        ...req.body,
        updated_by: user.id
      };
      
      await tutorial.update(updateData);
      
      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: tutorial
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
 * /tutorials/{id}:
 *   delete:
 *     summary: Delete a tutorial
 *     tags:
 *       - Tutorials
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tutorial deleted successfully
 */
router.delete('/:id', auth,
  checkSchema({
    id: {
      isInt: true,
      toInt: true
    }
  }),
  validation_error_handler,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const tutorial = await db.Tutorial.findByPk(id);
      if (!tutorial) {
        return res.json(
          errorRespSync({
            code: 404,
            msg: 'Tutorial not found'
          })
        );
      }
      
      await tutorial.destroy();
      
      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: { id: parseInt(id) }
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;