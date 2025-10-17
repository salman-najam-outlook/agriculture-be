const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync, errorRespSync } = require(rootPath + "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred, fileFilterGen } = require(rootPath +
  "/helpers/general");
const { sendPushNotification } = require(rootPath +
  "/helpers/pushNotification");

var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const { Op } = require('sequelize');
const e = require("express");
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

var whiteListMimeTypes;
// allowed mime types
whiteListMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
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
  limits: { fileSize: 2000000 },
});

const translateMessage = (req, msg) => {
  return req.translateFunction(
    { msg },
    globalTranslationCache,
    {
      lvl1: true,
      moduleName: "error",
    }
  )
};

const projectAgreementInclusion = (userQuery) => ([
  {
    model: db.CarbonCreditProject,
    as: "project",
    attributes: ["project_title", "project_type", "country"],
  },
  {
    model: db.user_farm,
    as: "farm",
    attributes: ["farmName", "recordId"],
    required: true,
    where: userQuery
  },
  {
    model: db.CarbonCreditCropGrowing,
    as: "crop_growing",
    include: [
      {
        model: db.CarbonCreditCropGrowingCrop,
        as: "crop_growing_crops",
        include: [
          {
            model: db.Option,
            as: "crop_types",
          },
          {
            model: db.Seedlings,
            as: "seedlings",
          },
          {
            model: db.Sowing,
            as: "sowings",
          },
          {
            model: db.NutrientManagementFertilizerInputs,
            as: "fertilizers",
          },
          {
            model: db.CarbonCreditCropGrowingCropVariety,
            as: "crop_varieties",
            include: [
              {
                model: db.Crop,
                as: "crop_variety"
              }
            ]
          },
        ]
      },
      {
        model: db.CarbonCreditCropGrowingEquipment,
        as: 'crop_growing_equipments',
        include: [
          {
            model: db.Equipment,
            as: 'equipment'
          },
          {
            model: db.EquipmentFuelRecord,
            as: 'fuelRecords'
          }
        ]
      }
    ]
  }
]);

const saveAgreement = async (req, farm_id, transaction) => {
  const {
    project_id,
    farm_record_id,
    digitally_signed_by,
    ip_address,
    status,
    farmer_photo,
    digital_signature,
    recordId
  } = req.body;

  let farmer_photo_s3_url, digital_signature_s3_url;

  // Process images uploaded in middleware
  if (recordId) {
    // Offline API
    const bucketURL = process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/";
    farmer_photo_s3_url = farmer_photo ? `${bucketURL}${farmer_photo}`: null;
    digital_signature_s3_url = digital_signature ? `${bucketURL}${digital_signature}` : null;
  } else {
    const farmerPhoto = req.files["farmer_photo"]
      ? req.files["farmer_photo"][0]
      : null;
    const digitalSignature = req.files["digital_signature"]
      ? req.files["digital_signature"][0]
      : null;

    farmer_photo_s3_url = farmerPhoto
      ? (({ key, originalname, location }) => ({
          key,
          originalname,
          location,
        }))(farmerPhoto).location
      : farmerPhoto;

    digital_signature_s3_url = digitalSignature
      ? (({ key, originalname, location }) => ({
          key,
          originalname,
          location,
        }))(digitalSignature).location
      : digitalSignature;        
  }

  // Validate required fields
  if (!project_id || !(farm_id || farm_record_id) || !digitally_signed_by) {
    return serverError(
      res,
      translateMessage(req, error.CARBON_CREDIT_PROJECT_AGREEMENT_MISSING)
    );
  }

  // Check if project exists
  let projectExists = await db.CarbonCreditProject.findByPk(project_id);
  if (!projectExists) {
    return serverError(
      res,
      translateMessage(req, error.CARBON_CREDIT_PROJECT_NOT_EXISTS)
    );
  }

  // Check if farm exists
  const farm_uid = farm_id || farm_record_id;
  let farmExists = await db.user_farm.findByPk(farm_id);
  if (!farmExists) {
    farmExists = await db.user_farm.findOne({
      where: {
        recordId: farm_uid
      }
    });

    if (!farmExists) {
      return serverError(
        res, 
        translateMessage(req, error.CARBON_CREDIT_FARM_NOT_EXISTS)
      );
    }
  }

  // Delete if exists
  let projectFarmExists = await db.CarbonCreditProjectFarm.findOne({
    where: {
      project_id,
      farm_id: farmExists.id
    }
  });

  // If Project farm already exists, delete old record to add new
  if (projectFarmExists) {
    await db.CarbonCreditProjectFarm.destroy({
      where: {
        project_id,
        farm_id: farmExists.id
      }
    });
  }

  return await db.CarbonCreditProjectFarm.create({
    project_id,
    farm_id: farmExists.id,
    digitally_signed_by,
    signage_date: new Date(),
    ip_address,
    farmer_photo_s3_url,
    digital_signature_s3_url,
    status: status || "in_review",
    recordId
  }, { transaction });
};

/**
 * @swagger
 * /api/carbon-project-farms:
 *   get:
 *     summary: Get all carbon credit project farms
 *     description: Retrieve a list of all carbon credit project farms
 *     responses:
 *       200:
 *         description: A list of carbon credit project farms
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  auth,
  translation,
  async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw Error("Could not extrapolate User ID. Possible issue with authentication.")
      }

      const projectFarms = await db.CarbonCreditProjectFarm.findAll({
        include: projectAgreementInclusion({
          [Op.or]: [
            { userId },
            {
              [Op.and]: {
                isTechnician: true,
                technicianId: userId
              }
            }
          ]
        }),
      });

      return res.json(
        successRespSync({
          msg: "Fetched farm project data successfully",
          data: projectFarms,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/user/:id",
  auth,
  translation,
  async (req, res) => {
    try {
      const userId = req.params.id

      if (!userId) {
        throw Error("Could not extrapolate User ID. Possible issue with authentication.")
      }

      const projectFarms = await db.CarbonCreditProjectFarm.findAll({
        include: projectAgreementInclusion({
          userId
        }),
      });

      return res.json(
        successRespSync({
          msg: "Fetched farm project data successfully",
          data: projectFarms,
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
 * /api/carbon-project-farms/{id}:
 *   get:
 *     summary: Get a specific carbon credit project farm
 *     description: Retrieve a specific carbon credit project farm by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the carbon credit project farm
 *     responses:
 *       200:
 *         description: Carbon credit project farm details
 *       404:
 *         description: Carbon credit project farm not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:id",
  auth,
  translation,
  async (req, res) => {
    try {
      const { id } = req.params;

      const projectFarm = await db.CarbonCreditProjectFarm.findByPk(id, {
        include: [
          { model: db.CarbonCreditProject, as: "project" },
          { model: db.user_farm, as: "farm" },
        ],
      });

      if (!projectFarm) {
        return serverError(res, "Carbon credit project agreement not found");
      }

      return res.json(
        successRespSync({
          msg: "Fetched Carbon credit project agreement successfully!",
          data: projectFarm,
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
 * /api/carbon-project-farms:
 *   post:
 *     summary: Create a new carbon credit project farm
 *     description: Create a new carbon credit project farm record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_id
 *               - farm_id
 *               - digitally_signed_by
 *               - signage_date
 *             properties:
 *               project_id:
 *                 type: integer
 *               farm_id:
 *                 type: integer
 *               digitally_signed_by:
 *                 type: string
 *               signage_date:
 *                 type: string
 *                 format: date-time
 *               ip_address:
 *                 type: string
 *               farmer_photo_s3_url:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [in_progress, in_review, approved, require_update]
 *               signed_agreement_s3_url:
 *                 type: string
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
      { name: "farmer_photo", maxCount: 1 },
      { name: "digital_signature", maxCount: 1 },
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
    const transaction = await db.sequelize.transaction();

    try {
      const { farm_id } = req.body;
      const newProjectFarm = await saveAgreement(req, farm_id, transaction);      

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: translateMessage(req, success.CARBON_CREDIT_PROJECTS_CREATED),
          data: newProjectFarm,
        })
      );
    } catch (err) {
      await transaction.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * Bulk upload API for farm agreement
 */
router.post(
  "/bulk",
  auth,
  translation,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: "farmer_photo", maxCount: 1 },
      { name: "digital_signature", maxCount: 1 },
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
    const transaction = await db.sequelize.transaction();

    try {
      const { farm_ids } = req.body;
      const newProjectFarms = [];

      for await (const farm_id of farm_ids) {
        const newProjectFarm = await saveAgreement(req, farm_id, transaction);
        newProjectFarms.push(newProjectFarm);
      }

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: translateMessage(req, success.CARBON_CREDIT_PROJECTS_CREATED),
          data: newProjectFarms,
        })
      );
    } catch (err) {
      await transaction.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * Crop Growing Create API
 */
router.post(
  "/:id/crop-growing",
  auth,
  translation,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const {
        practice_type,
        has_livestock,
        recordId
      } = req.body;

      const farm_project_id = req.params.id;

      // Validate required fields
      if (!farm_project_id || !practice_type) {
        return serverError(
          res,
          translateMessage(req, error.CARBON_CREDIT_PROJECT_AGREEMENT_MISSING)
        );
      }

      // Check if project exists
      let farmProjectExists = await db.CarbonCreditProjectFarm.findByPk(farm_project_id);
      if (!farmProjectExists) {
        return serverError(
          res,
          translateMessage(req, error.CARBON_CREDIT_PROJECT_NOT_EXISTS)
        );
      }

      const carbonCreditCropGrowing = await db.CarbonCreditCropGrowing.create({
        practice_type,
        has_livestock,
        farm_project_id,
        recordId
      }, { transaction });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.CARBON_CREDIT_CROP_GROWING_CREATED,
          data: carbonCreditCropGrowing,
        })
      );
    } catch (err) {
      await transaction.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * Crop Growing Update API
 */
router.patch(
  "/:id/crop-growing/:cgId",
  auth,
  translation,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const {
        practice_type,
        has_livestock
      } = req.body;

      const farm_project_id = req.params.id;
      const crop_growing_id = req.params.cgId;

      // Validate required fields
      if (!farm_project_id) {
        return serverError(
          res,
          translateMessage(req, error.CARBON_CREDIT_PROJECT_AGREEMENT_MISSING)
        );
      }

      // Check if project exists
      let farmProjectExists = await db.CarbonCreditProjectFarm.findByPk(farm_project_id);
      if (!farmProjectExists) {
        farmProjectExists = await db.CarbonCreditProjectFarm.findOne({
          where: {
            recordId: id
          }
        });

        if (!farmProjectExists) {
          return serverError(
            res,
            translateMessage(req, error.CARBON_CREDIT_PROJECT_NOT_EXISTS)
          );
        }
      }

      const updatePayload = Object.fromEntries(Object.entries({
        practice_type,
        has_livestock
      }).filter(([_, v]) => v !== null && v !== undefined));

      const carbonCreditCropGrowing = await db.CarbonCreditCropGrowing.update(updatePayload, {
        where: {
          [Op.or]: [
            { id: crop_growing_id },
            { recordId: crop_growing_id }
          ]
        }
      });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.CARBON_CREDIT_CROP_GROWING_CREATED,
          data: carbonCreditCropGrowing,
        })
      );
    } catch (err) {
      await transaction.rollback();

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.patch(
  "/:id/change-status",
  auth,
  translation,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      let agreementExists = await db.CarbonCreditProjectFarm.findOne({
        where: {
          id
        },
        include: [
          {
            model: db.CarbonCreditProject,
            as: "project",
            attributes: ["project_title"],
          }
        ]
      });

      if (!agreementExists) {
        agreementExists = await db.CarbonCreditProjectFarm.findOne({
          where: {
            recordId: id
          },
          include: [
            {
              model: db.CarbonCreditProject,
              as: "project",
              attributes: ["project_title"],
            }
          ]
        });

        if (!agreementExists) {
          return serverError(
            res,
            translateMessage(req, error.CARBON_CREDIT_AGREEMENT_NOT_EXISTS)
          );
        }
      }

      const validStatuses = [
        "in_progress",
        "in_review",
        "approved",
        "require_update"
      ];

      // Process images uploaded in middleware
      const {
        status
      } = req.body;

      if (!validStatuses.includes(status)) {
        return serverError(
          res,
          "Invalid Agreement Status"
        );
      }

      const updatedProjectFarm = await db.CarbonCreditProjectFarm.update(
        {
          status
        },
        {
          where: { id: agreementExists.id },
        }
      );

      // Send notification
      if (status === 'approved') {
        const notificationTitle = 'Carbon Credit Project Join Request Approved';
        let notificationMessage = `Your request to join the carbon credit project ${agreementExists.project.project_title} has been approved. You can now proceed to submit additional information for your farm.`;

        const notification = await db.Notification.create(
          {
            notify: "user",
            title: notificationTitle,
            message: notificationMessage,
            userId: userId,
            type: "carbon-credit",
            data: JSON.stringify({
              surveyId: survey.id,
              title: notificationTitle
            }),
          }
        );

        let setUserNotification;
        setUserNotification = {
          userId: userId,
          notificationId: notification?.id,
        };

        await db.UserNotification.create(setUserNotification);
        const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
          attributes: ["device_registration_token"],
          where: {
            userId: userId,
          },
        });

        const firebaseToken = [];

        for (const device of deviceRegistrationToken) {
          firebaseToken.push(device.device_registration_token);
        }

        const data = {
          agreementId: id,
          title: notificationTitle,
          notification_type: 'carbon-credit',
          message: notificationMessage,
          userId,
        };

        if (firebaseToken.length > 0) {
          await sendPushNotification(
            firebaseToken,
            notificationTitle,
            data
          );
        }
      }

      return res.json(
        successRespSync({
          msg: translateMessage(req, success.CARBON_CREDIT_PROJECTS_AGREEMENT_UPDATED),
          data: updatedProjectFarm,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.patch(
  "/:id/upload-signed",
  auth,
  translation,
  async (req, res, next) => {
    let fileUpload = upload.fields([{ name: "signed_agreement", maxCount: 1 }]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const { id } = req.params;

      let agreementExists = await db.CarbonCreditProjectFarm.findByPk(id);

      if (!agreementExists) {
        agreementExists = await db.CarbonCreditProjectFarm.findOne({
          where: {
            recordId: id
          }
        });

        if (!agreementExists) {
          return serverError(
            res,
            translateMessage(req, error.CARBON_CREDIT_AGREEMENT_NOT_EXISTS)
          );
        }
      }

      // Process images uploaded in middleware
      let signed_agreement_s3_url = null;
      const {
        signed_agreement
      } = req.body;

      if (signed_agreement) {
        // Offline API
        const bucketURL = process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/";
        signed_agreement_s3_url = `${bucketURL}${signed_agreement}`;
      } else {
        const signedAgreement = req.files["signed_agreement"]
          ? req.files["signed_agreement"][0]
          : null;

        signed_agreement_s3_url = signedAgreement
          ? (({ key, originalname, location }) => ({
              key,
              originalname,
              location,
            }))(signedAgreement).location
          : signedAgreement;
      }

      if (signed_agreement_s3_url === null) {
        return serverError(
          res,
          translateMessage(req, error.CARBON_CREDIT_S3_UPLOAD_ERROR)
        );
      }

      const updatedProjectFarm = await db.CarbonCreditProjectFarm.update(
        {
          signed_agreement_s3_url,
          signage_date: new Date()
        },
        {
          where: { id: agreementExists.id },
        }
      );

      return res.json(
        successRespSync({
          msg: translateMessage(req, success.CARBON_CREDIT_PROJECTS_AGREEMENT_UPDATED),
          data: updatedProjectFarm,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.patch(
  "/:id/upload-land-title-permit",
  auth,
  translation,
  async (req, res, next) => {
    let fileUpload = upload.fields([{ name: "land_title_permit", maxCount: 1 }]);
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const { id } = req.params;

      let agreementExists = await db.CarbonCreditProjectFarm.findByPk(id);

      if (!agreementExists) {
        agreementExists = await db.CarbonCreditProjectFarm.findOne({
          where: {
            recordId: id
          }
        });

        if (!agreementExists) {
          return serverError(
            res,
            translateMessage(req, error.CARBON_CREDIT_AGREEMENT_NOT_EXISTS)
          );
        }
      }

      // Process images uploaded in middleware
      let land_title_permit_s3_url = null;
      const {
        land_title_permit
      } = req.body;

      if (land_title_permit) {
        // Offline API
        const bucketURL = process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/";
        land_title_permit_s3_url = `${bucketURL}${land_title_permit}`;
      } else {
        const landTitlePermit = req.files["land_title_permit"]
          ? req.files["land_title_permit"][0]
          : null;

        land_title_permit_s3_url = landTitlePermit
          ? (({ key, originalname, location }) => ({
              key,
              originalname,
              location,
            }))(landTitlePermit).location
          : landTitlePermit; 
      }

      if (land_title_permit_s3_url === null) {
        return serverError(
          res,
          translateMessage(req, error.CARBON_CREDIT_S3_UPLOAD_ERROR)
        );
      }

      const updatedProjectFarm = await db.CarbonCreditProjectFarm.update(
        {
          land_title_permit_s3_url
        },
        {
          where: { id: agreementExists.id },
        }
      );

      return res.json(
        successRespSync({
          msg: translateMessage(req, success.CARBON_CREDIT_PROJECTS_LAND_TITLE_PERMIT_UPLOADED),
          data: updatedProjectFarm,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;