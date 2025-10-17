const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require(rootPath + "/models");
const { user, UserRegistrationToken } = require(rootPath + "/models");
const { loginValidation } = require(rootPath + "/helpers/validation");
const {
  getUserMemberships,
  getUserPermissions,
  getUserRoles,
  getUserPermissionsByMemberships,
} = require(rootPath + "/helpers/controller/user-permissions");
const { createPassword, createOtpHash, verifyHash } = require(rootPath +
  "/helpers/hash");
const { capitalizeFirstLetter } = require(rootPath + "/helpers/utils");
const mailer = require(rootPath + "/components/mailer");
const path = require("path");
const {
  serverError,
  successResp,
  errorResp,
  errorRespSync,
  successRespSync,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const {
  createOTP,
  fileFilterGen,
  sendSMS,
  sendTwilioSMS,
  verifyTwilioSMS,
  logErrorOccurred,
  validateMobileNumber,
} = require(rootPath + "/helpers/general"); // constant messages
// loading middleware
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const moment = require("moment");
const { langObj } = require(rootPath + "/helpers/consts");
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
const { sendLoginError } = require(rootPath + "/helpers/report_login_error");
var params, whiteListMimeTypes, lang;
const {
  preSignedURLValidator,
  documentDataValidator,
  renameDocumentValidator,
  moveDocumentValidator,
} = require(rootPath + "/helpers/validators/document");
// allowed mime types
whiteListMimeTypes = ["image/jpeg", "image/png", "image/svg+xml"];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
var multerS3 = require("multer-s3");
const {
  createMyTree,
  test,
  findAllMyTrees,
  findAllMyTreesImages,
  updateMyTree,
  createBulkMyTree,
  deleteMyTree,
  findMyTreeById,
  updateMyTreeAndHistory,
  findAllMyTreesHistory,
  findMyTreeHistoryByTreeId,
  findAllDropdownValues,
  generatePreSignedUrl,
} = require("./my-tree.service");
const translationMiddleware = require(rootPath + "/middleware/translation");
var aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});
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
const multer = require("multer");
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});

// my-tree routes
router.get("/test", test);

// get all my trees
router.get("/", auth, async (req, res) => {
  try {
    const data = await findAllMyTrees(req);
    res.json(
      await successResp({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// create my-tree single tree
router.post("/", auth, async (req, res) => {
  try {
    const data = await createMyTree(req);
    res.json(
      await successResp({
        msg: success.CREATE,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// bulk create my-tree
router.post("/bulk", auth, async (req, res) => {
  try {
    const data = await createBulkMyTree(req);
    res.json(
      await successResp({
        msg: success.CREATE,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// update my-tree PATCH request
router.patch("/", auth, async (req, res) => {
  try {
    const data = await updateMyTree(req);
    res.json(
      await successResp({
        msg: success.UPDATE,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// update my-tree PUT and create entry on history table
router.put("/:id", auth, async (req, res) => {
  try {
    const data = await updateMyTreeAndHistory(req);
    res.json(
      await successResp({
        msg: success.UPDATE,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
      error: {
        message: JSON.stringify(err.message),
        stack: err.stack ? JSON.stringify(err.stack) : "",
      },
    });
  }
});

// history routes
router.get("/history", auth, async (req, res) => {
  try {
    const data = await findAllMyTreesHistory(req);
    res.json(
      await successResp({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// find tree history by ID
router.get("/history/:id", auth, async (req, res) => {
  try {
    const data = await findMyTreeHistoryByTreeId(req);
    res.json(
      await successResp({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    } else {
      logErrorOccurred(__filename, err);
    }

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// my-tree image routes Both tree and history
router.get("/images", auth, async (req, res) => {
  try {
    const data = await findAllMyTreesImages(req);
    res.json(
      await successResp({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

// tree type and tree species routes
router.get("/tree-type", auth, translation, async (req, res) => {
  try {
    const treeTypes = await db.TreeType.findAll();
    res.status(200).json({
      success: true,
      code: 200,
      message: success.FETCH,
      data: treeTypes,
    });
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
});

// tree species
router.get("/tree-species", auth, translation, async (req, res) => {
  try {
    const { treeTypeId } = req.query;

    let treeSpecies;

    if (treeTypeId) {
      const treeType = await db.TreeType.findOne({
        where: { id: treeTypeId },
      });

      if (!treeType) {
        return res.status(404).json({
          success: false,
          code: 404,
          message: "TreeType of the given name not found",
        });
      }

      treeSpecies = await db.TreeSpecies.findAll({
        where: { tree_type_id: treeType.id },
      });
    } else {
      treeSpecies = await db.TreeSpecies.findAll();
    }

    res.status(200).json({
      success: true,
      code: 200,
      message: success.FETCH,
      data: treeSpecies,
    });
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
});

// dropdown values
router.get("/dropdown", auth, async (req, res) => {
  try {
    const data = await findAllDropdownValues();
    console.log("dropdown-->",data);
    res.json(
      await successResp({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    } else {
      logErrorOccurred(__filename, err);
    }

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
      error: {
        message: JSON.stringify(err.message),
        stack: err.stack ? JSON.stringify(err.stack) : "",
      },
    });
  }
});

// upload tree image
router.post(
  "/presigned-url",
  auth,
  preSignedURLValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const data = await generatePreSignedUrl(req,res);
      res.json(
        await successResp({
          msg: success.CREATE,
          data,
        })
      );
    } catch (err) {
      const error = {
        message: JSON.stringify(err.message),
        stack: err.stack ? JSON.stringify(err.stack) : "",
      };

      if (process.env.NODE_ENV !== "development") {
        await sendLoginError(JSON.stringify(error), req);
      } else {
        logErrorOccurred(__filename, err);
      }

      res.status(err.code || 500).json({
        success: false,
        customCode: err.message,
        message: err.message || "Internal Server Error",
        error: {
          message: JSON.stringify(err.message),
          stack: err.stack ? JSON.stringify(err.stack) : "",
        },
      });
    }
  }
);

// find my-tree by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const data = await findMyTreeById(req);
    res.json(
      await successResp({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    } else {
      logErrorOccurred(__filename, err);
    }

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
      error: {
        message: JSON.stringify(err.message),
        stack: err.stack ? JSON.stringify(err.stack) : "",
      },
    });
  }
});

// delete my-tree DELETE request
router.delete("/:id", auth, async (req, res) => {
  try {
    const data = await deleteMyTree(req);
    res.json(
      await successResp({
        msg: success.DELETE,
        data,
      })
    );
  } catch (err) {
    const error = {
      message: JSON.stringify(err.message),
      stack: err.stack ? JSON.stringify(err.stack) : "",
    };

    if (process.env.NODE_ENV !== "development") {
      await sendLoginError(JSON.stringify(error), req);
    }

    logErrorOccurred(__filename, err);

    res.status(err.code || 500).json({
      success: false,
      customCode: err.message,
      message: err.message || "Internal Server Error",
    });
  }
});

module.exports = router;
