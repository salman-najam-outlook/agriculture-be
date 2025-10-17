const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync, errorRespSync } = require(rootPath +
  "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred, fileFilterGen } = require(rootPath +
  "/helpers/general");
const { Op, where } = require("sequelize");
const moment = require("moment");
const xlsx = require("xlsx");
var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});

// storage configuration
const storage = multerS3({
  s3,
  bucket: process.env.AWS_PUBLIC_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // create custom key name on s3 cloud
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const translateMessage = (req, msg) => {
  return req.translateFunction({ msg }, globalTranslationCache, {
    lvl1: true,
    moduleName: "error",
  });
};

var whiteListMimeTypes;
// allowed mime types
whiteListMimeTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/gif",
  "audio/mpeg",
  "video/mp4",
  "video/mpeg",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/svg+xml",
  "text/plain",
  "audio/wav",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
// allowed mimetypes
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
// create upload
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50000000 },
});

const agreement = require("./project_farm");

router.use("/agreement", agreement);

const getDetailedCarbonCreditProject = async (id) => {
  return await db.CarbonCreditProject.findByPk(id, {
    include: [
      {
        model: db.CarbonCreditProjectAttachment,
        as: "attachments",
        attributes: ["id", "file_name", "file_type", "s3_url"],
      },
      {
        model: db.CarbonCreditProjectModule,
        as: "modules",
      },
      {
        model: db.Organization,
        as: "organizations",
      },
      {
        model: db.CarbonCreditProjectModule,
        as: "modules",
      },
      {
        model: db.CarbonCreditSDG,
        as: "sdgs",
        attributes: ["id", "title", "description", "icon"],
        through: { attributes: [] },
      },
      {
        model: db.CarbonCreditProjectVintage,
        as: "vintages",
        attributes: [
          "id",
          "vintage_year",
          "number_of_credits_estimated",
          "price_per_credit",
        ],
      },
      {
        model: db.DimitraOffice,
        as: "office",
      },
    ],
  });
};

/**
 * @route GET /api/carbon-credit/projects
 * @desc Get all carbon credit projects with their associated data
 */
router.get("/", 
  auth, 
  translation, 
  async (req, res) => {
  try {
    let { search, page = 1, limit = 10, sortBy, sortType, type } = req.query;

    const query = {
      offset: (page - 1) * limit,
      limit: Number.parseInt(limit),
      order: [["created_at", "DESC"]],
      where: { is_deleted: false },
      include: [
        {
          model: db.user_farm,
          as: "farms",
          attributes: ["id", "farmName"],
          through: { attributes: [] },
        },
      ],
    };

    if (search && search.length > 2) {
      query.where["project_title"] = {
        [Op.like]: `%${search}%`,
      };
    }

    if (type) {
      if (!["agroforestry", "regenerative_agriculture", "forestry"].includes(type)) {
        throw new Error("Invalid type in route query!");
      } else {
        query.where["project_type"] = type;
      }
    }

    if (sortBy && sortBy.length > 0) {
      query.order = [[sortBy, sortType]];
    }

    const projects = await db.CarbonCreditProject.findAndCountAll(query);

    return res.json(
      successRespSync({
        msg: success.CARBON_CREDIT_PROJECTS_FETCHED,
        data: {
          rows: projects.rows,
          total: projects.rows.length,
          page,
          limit,
          totalPages: Math.ceil(projects.rows.length / limit),
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @route GET /api/carbon-credit/projects/users
 * @desc Get all carbon credit users
 */
router.get(
  "/users",
  auth,
  translation,
  async (req, res) => {
    try {
      let { search, page = 1, limit = 10, sortBy, sortType, active, project } = req.query;

      const projectInclude = {
        model: db.CarbonCreditProject,
        as: "project",
        required: false,
        attributes: [],
      };

      if (project) {
        projectInclude.required = true;
        projectInclude["where"] = {
          id: project
        }
      }

      const query = {
        offset: (page - 1) * limit,
        limit: Number.parseInt(limit),
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.user_farm,
            as: "farms",
            required: true,
            attributes: [],
            include: [
              {
                model: db.CarbonCreditProjectFarm,
                as: "projectFarms",
                required: true,
                attributes: [],
                include: [
                  projectInclude
                ],
              },
            ],
          },
        ],
        distinct: true,
      };

      let where = {};

      if (search && search.length > 2) {
        where = {
          [Op.or]: [
            {
              "firstName": {
                [Op.like]: `%${search}%`,
              }
            },
            {
              "lastName": {
                [Op.like]: `%${search}%`,
              }
            },
            {
              "email": {
                [Op.like]: `%${search}%`,
              }
            }
          ]
        };
      }

      if (active !== undefined && active !== null) {
        where["active"] = Boolean(parseInt(active));
      }

      query.where = where;

      if (sortBy && sortBy.length > 0) {
        query.order = [[sortBy, sortType]];
      }

      const usersWithProjectFarms = await db.user.findAndCountAll(query);

      return res.json(
        successRespSync({
          msg: success.CARBON_CREDIT_PROJECT_FETCHED,
          data: usersWithProjectFarms,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// Dimitra Office endpoints
router.get("/dimitra-office", auth, translation, async (req, res) => {
  try {
    const { organizationId } = req.query;

    if (!organizationId) {
      return serverError(res, "Organization ID is required");
    }

    const offices = await db.DimitraOffice.findAll({
      where: {
        organizationId: organizationId,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.json(
      successRespSync({
        msg: "Dimitra offices fetched successfully",
        data: offices,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Get single dimitra office by ID
router.get("/dimitra-office/:id", auth, translation, async (req, res) => {
  try {
    const { id } = req.params;

    const office = await db.DimitraOffice.findByPk(id);

    if (!office) {
      return serverError(res, "Dimitra office not found");
    }

    return res.json(
      successRespSync({
        msg: "Dimitra office fetched successfully",
        data: office,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/dimitra-office", auth, translation, async (req, res) => {
  try {
    const {
      officeName,
      contactPerson,
      email,
      address,
      phoneNumber,
      organizationId,
    } = req.body;

    // Validate required fields
    if (!officeName || !contactPerson || !email || !address || !phoneNumber) {
      return serverError(
        res,
        "Missing required fields: officeName, contactPerson, email, address, phoneNumber"
      );
    }

    // Create the office in the database
    const newOffice = await db.DimitraOffice.create({
      officeName,
      contactPerson,
      email,
      address,
      phoneNumber,
      organizationId,
    });

    return res.json(
      successRespSync({
        msg: "Dimitra office created successfully",
        data: newOffice,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Update dimitra office
router.put("/dimitra-office/:id", auth, translation, async (req, res) => {
  try {
    const { id } = req.params;
    const { officeName, contactPerson, email, address, phoneNumber, isActive } =
      req.body;

    // Find the office
    const office = await db.DimitraOffice.findByPk(id);

    if (!office) {
      return serverError(res, "Dimitra office not found");
    }

    // Update the office
    const updatedOffice = await office.update({
      officeName,
      contactPerson,
      email,
      address,
      phoneNumber,
      isActive,
    });

    return res.json(
      successRespSync({
        msg: "Dimitra office updated successfully",
        data: updatedOffice,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Delete dimitra office
router.delete("/dimitra-office/:id", auth, translation, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the office
    const office = await db.DimitraOffice.findByPk(id);

    if (!office) {
      return serverError(res, "Dimitra office not found");
    }

    // Delete the office
    await office.destroy();

    return res.json(
      successRespSync({
        msg: "Dimitra office deleted successfully",
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @route GET /api/carbon-credit/projects/:id
 * @desc Get a single carbon credit project by ID with its associated data
 */
router.get("/:id", auth, translation, async (req, res) => {
  try {
    const project = await getDetailedCarbonCreditProject(req.params.id);

    if (!project) {
      err = error.CARBON_CREDIT_PROJECT_NOT_FOUND;
      return serverError(res, err);
    }

    const { sdgs = [], ...untranslatedProject } = JSON.parse(
      JSON.stringify(project)
    );

    const translatedSdgs = [];

    for (const { title, description, ...sdgInfo } of sdgs) {
      const translatedTitle = translateMessage(req, title);
      const translateDesc = translateMessage(req, description);

      translatedSdgs.push({
        ...sdgInfo,
        title: translatedTitle,
        description: translateDesc,
      });
    }

    return res.json(
      successRespSync({
        msg: success.CARBON_CREDIT_PROJECT_FETCHED,
        data: {
          ...untranslatedProject,
          sdgs: translatedSdgs,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new carbon credit project
 *     description: Create a new carbon credit project record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *     responses:
 *       201:
 *         description: Carbon credit project farm created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  auth,
  translation,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: "agreement", maxCount: 1 },
      { name: "validation_documentation", maxCount: 1 },
      { name: "header_image", maxCount: 1 },
      { name: "attachments", maxCount: 2000 },
    ]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    let transaction = await db.sequelize.transaction();

    try {
      const {
        project_title,
        project_type,
        description,
        status,
        credit_type,
        credit_start_date,
        credit_end_date,
        country,
        standard_methodology,
        vintage_currency,
        total_credit_generated,
        dimitra_office_id,
      } = req.body;

      // Validating required fields
      if (!project_title || !project_type || !country) {
        return serverError(
          res,
          "Payload has missing values. Required - project_title, project_type, country"
        );
      }

      if (dimitra_office_id) {
        let dimitraOfficeExists = await db.DimitraOffice.findByPk(
          dimitra_office_id
        );

        if (!dimitraOfficeExists) {
          return serverError(
            res,
            `Dimitra office with id ${dimitra_office_id} does not exist!`
          );
        }
      }

      let vintages = req.body.vintages || [];

      if (typeof vintages === "string") vintages = JSON.parse(vintages);

      // Validating vintages
      for (const {
        vintage_year,
        number_of_credits_estimated,
        price_per_credit,
      } of vintages) {
        if (
          !vintage_year ||
          !number_of_credits_estimated ||
          !price_per_credit
        ) {
          return serverError(
            res,
            "Vintage Payload has missing values. Required - vintage_year, number_of_credits_estimated, price_per_credit"
          );
        }
      }

      let organizations = req.body.organizations || [];

      if (typeof organizations === "string")
        organizations = JSON.parse(organizations);

      for await (const orgId of organizations) {
        const org = db.Organization.findByPk(orgId);
        if (!org) {
          return serverError(
            res,
            `Could not find organization with id ${orgId}`
          );
        }
      }

      let modules = req.body.modules || [];

      if (typeof modules === "string") modules = JSON.parse(modules);

      // Validating modules
      for (const {
        module_name,
        recurring_time,
        recurring_period,
        score,
        approval,
      } of modules) {
        if (!module_name || !recurring_time || !recurring_period) {
          return serverError(
            res,
            "Vintage Payload has missing values. Required - module_name, recurring_time, recurring_period"
          );
        }

        if (score === null || score === undefined || parseInt(score) < 0) {
          return serverError(
            res,
            "Score needs to be an integer greater than 0"
          );
        }

        if (
          approval === null ||
          approval === undefined ||
          parseInt(approval) < 0
        ) {
          return serverError(
            res,
            "Approval needs to be an integer greater than 0"
          );
        }
      }

      const agreement_file = req.files["agreement"]
        ? req.files["agreement"][0]
        : null;
      const header_image_file = req.files["header_image"]
        ? req.files["header_image"][0]
        : null;
      const validation_documentation_file = req.files[
        "validation_documentation"
      ]
        ? req.files["validation_documentation"][0]
        : null;
      const attachent_files = req.files["attachments"]
        ? req.files["attachments"]
        : [];

      const attachments = await attachent_files?.map((a) => {
        const { key, originalname, location, mimetype } = a;
        return { key, originalname, location, mimetype };
      });

      const agreement = agreement_file
        ? (({ key, originalname, location }) => ({
            key,
            originalname,
            location,
          }))(agreement_file).location
        : agreement_file;
      const header_image = header_image_file
        ? (({ key, originalname, location }) => ({
            key,
            originalname,
            location,
          }))(header_image_file).location
        : header_image_file;
      const validation_documentation = validation_documentation_file
        ? (({ key, originalname, location }) => ({
            key,
            originalname,
            location,
          }))(validation_documentation_file).location
        : validation_documentation_file;

      const project = await db.CarbonCreditProject.create(
        {
          project_title,
          project_type,
          description,
          status: status || "in_progress",
          validation_documentation,
          agreement,
          header_image,
          credit_type,
          credit_start_date,
          credit_end_date,
          country,
          standard_methodology,
          vintage_currency,
          total_credit_generated,
          dimitra_office_id,
        },
        { transaction }
      );

      if (!project) {
        return serverError(res, "Failed to create project, please retry!");
      }

      // Creating attachments
      for await (const attachment of attachments) {
        await db.CarbonCreditProjectAttachment.create(
          {
            project_id: project.id,
            file_name: attachment.originalname,
            file_type: attachment.mimetype,
            s3_url: attachment.location,
          },
          { transaction }
        );
      }

      let sdgs = req.body.sdgs || [];

      if (typeof sdgs === "string") sdgs = JSON.parse(sdgs);

      // Associating project with sdgs
      for await (const sdg of sdgs) {
        let sdgExists = await db.CarbonCreditSDG.findByPk(sdg);

        if (!sdgExists) {
          logErrorOccurred(
            __filename,
            `Failed with find SDG with id ${sdg} while creating project. Skipping...`
          );
          continue;
        }

        await db.CarbonCreditProjectSDG.create(
          {
            project_id: project.id,
            sdg_id: sdg,
          },
          { transaction }
        );
      }

      // Create vintages for project
      for await (const {
        vintage_year,
        number_of_credits_estimated,
        price_per_credit,
      } of vintages) {
        await db.CarbonCreditProjectVintage.create(
          {
            project_id: project.id,
            vintage_year,
            number_of_credits_estimated,
            price_per_credit,
          },
          { transaction }
        );
      }

      // Add organizations to project
      for await (const orgId of organizations) {
        await db.CarbonCreditProjectOrganization.create(
          {
            project_id: project.id,
            organization_id: orgId,
          },
          { transaction }
        );
      }

      // Add modules to project
      for (const {
        module_name,
        recurring_time,
        recurring_period,
        score,
        approval,
      } of modules) {
        await db.CarbonCreditProjectModule.create(
          {
            project_id: project.id,
            module_name,
            recurring_time,
            recurring_period,
            score,
            approval,
          },
          { transaction }
        );
      }

      await transaction.commit();

      const fullProject = await getDetailedCarbonCreditProject(project.id);

      return res.json(
        successRespSync({
          msg: "Carbon credit project created successfully",
          data: fullProject,
        })
      );
    } catch (err) {
      // Rolling back changesin case of errors
      await transaction.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// Edit project
router.put(
  "/:id",
  auth,
  translation,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: "agreement", maxCount: 1 },
      { name: "header_image", maxCount: 1 },
      { name: "validation_documentation", maxCount: 1 },
      { name: "attachments", maxCount: 2000 },
    ]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    let transaction = await db.sequelize.transaction();

    try {
      const projectId = req.params.id;

      // Check if project exists
      let projectExists = await db.CarbonCreditProject.findByPk(projectId);
      if (!projectExists) {
        return serverError(res, `Project with ${projectId} does not exist!`);
      }

      const {
        project_title,
        project_type,
        description,
        status,
        credit_type,
        credit_start_date,
        credit_end_date,
        country,
        standard_methodology,
        vintage_currency,
        total_credit_generated,
        dimitra_office_id,
      } = req.body;

      // Testing dimitra office if exist
      if (dimitra_office_id) {
        let dimitraOfficeExists = await db.DimitraOffice.findByPk(
          dimitra_office_id
        );

        if (!dimitraOfficeExists) {
          return serverError(
            res,
            `Dimitra office with id ${dimitra_office_id} does not exist!`
          );
        }
      }

      // Clearning up existing vintages, organizations, sdgs and modules
      const destructionQuery = {
        where: {
          project_id: projectId,
        },
      };

      await db.CarbonCreditProjectVintage.destroy(destructionQuery);
      await db.CarbonCreditProjectModule.destroy(destructionQuery);
      await db.CarbonCreditProjectOrganization.destroy(destructionQuery);
      await db.CarbonCreditProjectSDG.destroy(destructionQuery);

      let attachmemtsRemoved = req.body.attachments_removed;

      if (attachmemtsRemoved) {
        if (typeof attachmemtsRemoved === "string")
          attachmemtsRemoved = JSON.parse(attachmemtsRemoved);

        for await (const attachmentId of attachmemtsRemoved) {
          await db.CarbonCreditProjectAttachment.destroy({
            where: {
              id: attachmentId,
            },
          });

          // Remove attachment from S3
        }
      }

      // Rewriting relationships
      let vintages = req.body.vintages || [];

      if (typeof vintages === "string") vintages = JSON.parse(vintages);

      // Validating vintages
      for (const {
        vintage_year,
        number_of_credits_estimated,
        price_per_credit,
      } of vintages) {
        if (
          !vintage_year ||
          !number_of_credits_estimated ||
          !price_per_credit
        ) {
          return serverError(
            res,
            "Vintage Payload has missing values. Required - vintage_year, number_of_credits_estimated, price_per_credit"
          );
        }
      }

      let organizations = req.body.organizations || [];

      if (typeof organizations === "string")
        organizations = JSON.parse(organizations);

      for await (const orgId of organizations) {
        const org = db.Organization.findByPk(orgId);
        if (!org) {
          return serverError(
            res,
            `Could not find organization with id ${orgId}`
          );
        }
      }

      let modules = req.body.modules || [];

      if (typeof modules === "string") modules = JSON.parse(modules);

      // Validating modules
      for (const {
        module_name,
        recurring_time,
        recurring_period,
        score,
        approval,
      } of modules) {
        if (!module_name || !recurring_time || !recurring_period) {
          return serverError(
            res,
            "Vintage Payload has missing values. Required - module_name, recurring_time, recurring_period"
          );
        }

        if (score === null || score === undefined || parseInt(score) < 0) {
          return serverError(
            res,
            "Score needs to be an integer greater than 0"
          );
        }

        if (
          approval === null ||
          approval === undefined ||
          parseInt(approval) < 0
        ) {
          return serverError(
            res,
            "Approval needs to be an integer greater than 0"
          );
        }
      }

      const agreement_file = req.files["agreement"]
        ? req.files["agreement"][0]
        : null;
      const header_image_file = req.files["header_image"]
        ? req.files["header_image"][0]
        : null;
      const validation_documentation_file = req.files[
        "validation_documentation"
      ]
        ? req.files["validation_documentation"][0]
        : null;
      const attachent_files = req.files["attachments"]
        ? req.files["attachments"]
        : [];

      const attachments = await attachent_files?.map((a) => {
        const { key, originalname, location, mimetype } = a;
        return { key, originalname, location, mimetype };
      });

      const agreement = agreement_file
        ? (({ key, originalname, location }) => ({
            key,
            originalname,
            location,
          }))(agreement_file).location
        : agreement_file;
      const header_image = header_image_file
        ? (({ key, originalname, location }) => ({
            key,
            originalname,
            location,
          }))(header_image_file).location
        : header_image_file;
      const validation_documentation = validation_documentation_file
        ? (({ key, originalname, location }) => ({
            key,
            originalname,
            location,
          }))(validation_documentation_file).location
        : validation_documentation_file;

      const updatePayload = Object.fromEntries(
        Object.entries({
          project_title,
          project_type,
          description,
          status,
          validation_documentation,
          agreement,
          header_image,
          credit_type,
          credit_start_date,
          credit_end_date,
          country,
          standard_methodology,
          vintage_currency,
          total_credit_generated,
          dimitra_office_id,
        }).filter(([_, v]) => v !== null && v !== undefined)
      );

      const project = await db.CarbonCreditProject.update(updatePayload, {
        where: {
          id: projectId,
        },
        transaction,
      });

      if (!project) {
        return serverError(res, "Failed to update project, please retry!");
      }

      // Creating attachments
      for await (const attachment of attachments) {
        await db.CarbonCreditProjectAttachment.create(
          {
            project_id: projectId,
            file_name: attachment.originalname,
            file_type: attachment.mimetype,
            s3_url: attachment.location,
          },
          { transaction }
        );
      }

      let sdgs = req.body.sdgs || [];

      if (typeof sdgs === "string") sdgs = JSON.parse(sdgs);

      // Associating project with sdgs
      for await (const sdg of sdgs) {
        let sdgExists = await db.CarbonCreditSDG.findByPk(sdg);

        if (!sdgExists) {
          logErrorOccurred(
            __filename,
            `Failed with find SDG with id ${sdg} while creating project. Skipping...`
          );
          continue;
        }

        await db.CarbonCreditProjectSDG.create(
          {
            project_id: projectId,
            sdg_id: sdg,
          },
          { transaction }
        );
      }

      // Create vintages for project
      for await (const {
        vintage_year,
        number_of_credits_estimated,
        price_per_credit,
      } of vintages) {
        await db.CarbonCreditProjectVintage.create(
          {
            project_id: projectId,
            vintage_year,
            number_of_credits_estimated,
            price_per_credit,
          },
          { transaction }
        );
      }

      // Add organizations to project
      for await (const orgId of organizations) {
        await db.CarbonCreditProjectOrganization.create(
          {
            project_id: projectId,
            organization_id: orgId,
          },
          { transaction }
        );
      }

      // Add modules to project
      for (const {
        module_name,
        recurring_time,
        recurring_period,
        score,
        approval,
      } of modules) {
        await db.CarbonCreditProjectModule.create(
          {
            project_id: projectId,
            module_name,
            recurring_time,
            recurring_period,
            score,
            approval,
          },
          { transaction }
        );
      }

      await transaction.commit();

      const fullProject = await getDetailedCarbonCreditProject(projectId);

      return res.json(
        successRespSync({
          msg: "Carbon credit project created successfully",
          data: fullProject,
        })
      );
    } catch (err) {
      // Rolling back changesin case of errors
      await transaction.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// deactivate project
router.patch("/:id/deactivate", auth, translation, async (req, res) => {
  try {
    const project = await db.CarbonCreditProject.findByPk(req.params.id);

    if (!project) {
      return serverError(res, "Project not found");
    }

    project.status = "deactivate";
    await project.save();

    return res.json(
      successRespSync({
        msg: success.CARBON_CREDIT_PROJECT_DEACTIVATED,
        data: project,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/export/:type", auth, async (req, res) => {
  try {
    const { type } = req.params;
    const rows = await db.CarbonCreditProject.findAll(
      {
        attributes: [
          "project_title",
          "project_type",
          "description",
          "status",
          "credit_type",
          "credit_start_date",
          "credit_end_date",
          "country",
          "standard_methodology",
          "vintage_currency",
          "total_credit_generated",
          "created_at",
        ],
      },
      {
        where: {
          is_deleted: false,
        },
      }
    );

    const projects = rows.map((p) => ({
      project_title: p.project_title,
      project_type: p.project_type,
      description: p.description,
      status: p.status,
      credit_type: p.credit_type,
      credit_start_date: moment(p.credit_start_date).format("YYYY-MM-DD"),
      credit_end_date: moment(p.credit_end_date).format("YYYY-MM-DD"),
      country: p.country,
      standard_methodology: p.standard_methodology,
      vintage_currency: p.vintage_currency,
      total_credit_generated: p.total_credit_generated,
      created_at: moment(p.created_at).format("YYYY-MM-DD"),
    }));

    const workbook = xlsx.utils.book_new();
    const projectSheet = xlsx.utils.json_to_sheet(projects);
    xlsx.utils.book_append_sheet(workbook, projectSheet);

    if (type === "csv") {
      // Generate CSV
      const csvBuffer = xlsx.write(workbook, {
        type: "buffer",
        bookType: "csv",
      });
      res.set(
        "Content-Disposition",
        "attachment; filename=carbon_credit_projects.csv"
      );
      res.set("Content-Type", "text/csv");
      res.end(csvBuffer);
      return;
    } else if (type === "xlsx") {
      // Generate XLSX
      const xlsxBuffer = xlsx.write(workbook, { type: "buffer" });
      res.set(
        "Content-Disposition",
        "attachment; filename=carbon_credit_projects.xlsx"
      );
      res.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.end(xlsxBuffer);
    } else if (type === "pdf") {
      // To be implemented
      return;
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
// Add new endpoint for module score and approval
router.get("/modules/score-approval", async (req, res) => {
  try {
    const moduleNames = [
      "sowing",
      "seeding",
      "fertilizers",
      "harvesting",
      "equipment",
    ];
    const modules = await db.CarbonCreditProjectModule.findAll({
      where: { module_name: moduleNames },
      order: [["created_at", "DESC"]],
    });
    // Get the latest entry for each module_name
    const latestByModule = {};
    for (const m of modules) {
      if (!latestByModule[m.module_name]) {
        latestByModule[m.module_name] = m;
      }
    }
    const data = Object.values(latestByModule).map((m) => ({
      module_name: m.module_name,
      score: m.score,
      approval: m.approval,
    }));
    res.json({ success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch module scores/approvals",
        error: err.message,
      });
  }
});

module.exports = router;
