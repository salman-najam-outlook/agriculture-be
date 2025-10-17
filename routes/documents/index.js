const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const moment = require("moment");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { serverError, successRespSync, errorRespSync } = require(rootPath +
  "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { getSignedURL } = require(rootPath + "/helpers/aws_s3");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const {
  preSignedURLValidator,
  documentDataValidator,
  renameDocumentValidator,
  moveDocumentValidator,
} = require(rootPath + "/helpers/validators/document");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const S3 = require(rootPath + "/components/s3upload");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage();
const upload = multer({ storage });
/**
 * @swagger
 * /documents/preSignedUrl:
 *   post:
 *     description: Returns pre-signed url
 *     tags: [Documents]
 *     requestBody:
 *       description: Payload to get pre-signed url (put/get actions and isPrivate is non-mandatory)
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                objectName:
 *                  type: string
 *                mimeType:
 *                  type: string
 *                isPrivate:
 *                  type: boolean
 *                action:
 *                  type: string
 *                  enum: ['get', 'put']
 *              example:
 *                objectName: 'sample-image.jpeg'
 *                mimeType: 'images/jpeg'
 *                isPrivate: true
 *                action: 'put'
 *     responses:
 *       200:
 *         description: Successfully return the pre-signed url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: string
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: https://dimitra-public-images.s3.amazonaws.com/house1.jpeg?AWSAccessKeyId=TESTKEY
 *
 */
router.post(
  "/preSignedUrl",
  auth,
  preSignedURLValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { objectName, mimeType, isPrivate, action } = req.body;
      const bucket = isPrivate
        ? process.env.AWS_PRIVATE_BUCKET
        : process.env.AWS_PUBLIC_BUCKET;
      const params = {
        Bucket: bucket,
        Key: `UserDocs/${req.user.id}/${objectName}`,
        Expires: 60 * 60,
      };
      if (action === "put") params.ContentType = mimeType;
      const url =
        action === "put"
          ? await getSignedURL("putObject", params)
          : await getSignedURL("getObject", params);
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: url,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  "/user-data/preSignedUrl",
  auth,
  preSignedURLValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { objectName, mimeType, isPrivate, action } = req.body;
      const bucket = isPrivate
        ? process.env.AWS_PRIVATE_BUCKET
        : process.env.AWS_PUBLIC_BUCKET;
      const params = {
        Bucket: bucket,
        Key: `UserDataBackup/${req.user.id}/${objectName}`,
        Expires: 60 * 60,
      };
      if (action === "put") params.ContentType = mimeType;
      const url =
        action === "put"
          ? await getSignedURL("putObject", params)
          : await getSignedURL("getObject", params);
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: url,
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
 * /documents/:
 *   get:
 *     description: Returns list of documents
 *     tags: [Documents]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [createdAt, name, size, docType]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: date
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully return the list of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: string
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: [{"id": 3,"displayName": "Root Level File","uuidName": "1asd123123123123.jpeg","size": "12.00","docType": "file","format": "jpeg","userId": 17,"parentId": null,"createdAt": "2022-02-08T00:00:00.000Z","updatedAt": "2022-02-08T00:02:01.000Z"}]
 *
 */
router.get("/", auth, async (req, res) => {
  try {

    const defaultFolderNames = ["Storage", "Land Property", "Equipment",];

    const userId = req.user.id;
    let {
      page = 1,
      limit = 100,
      orderBy = "createdAt",
      order = "desc",
      parentId = null,
      format = null,
      dateFrom = null,
      dateTo = null,
      name = null,
    } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    if (orderBy == "name") orderBy = "displayName";
    let query = {
      where: {
        userId,
        parentId,
      },
      include: [
        {
          model: db.Document,
          as: "parentDocument",
          attributes: ["id", "displayName", "parentId"],
        },
      ],
      order: [[orderBy, order]],
      offset: (page - 1) * limit,
      limit: limit,
    };
    if (format && typeof format == "string") {
      if (format.includes("doc")) format += ", docx";
      if (format.includes("xls")) format += ", xlsx";
      if (format.includes("ppt")) format += ", pptx";

      query.where.format = format.split(",").map((str) => str.trim());
    }
    if (dateFrom && dateTo) {
      const geaterThanDate = moment(dateFrom).utcOffset(0, true);
      geaterThanDate.set({ hour: 23, minute: 59, second: 59 });
      const lessThanDate = moment(dateTo).utcOffset(0, true);
      lessThanDate.set({ hour: 0, minute: 0, second: 0 });
      query.where.createdAt = {
        [Op.gt]: geaterThanDate.toISOString(),
        [Op.lt]: lessThanDate.toISOString(),
      };
    }
    if (name) {
      query.where.displayName = { [Op.like]: `%${name}%` };
    }
    let parent = null;
    if (parentId) {
      parent = await db.Document.findOne({
        where: {
          userId,
          id: parentId,
        },
      });
    }

    if (!parentId)
      for (let name of defaultFolderNames) {
        const payload = {
          displayName: name,
          docType: 'folder',
          userId: userId,
          parentId: null,
          isDefaultFolder: true,
        }
        const existingDefaultFolder = await db.Document.findOne({
          where: payload
        });

        if (!existingDefaultFolder) await db.Document.create({
          ...payload, uuidName: uuidv4()
        })

      }

    const documents = await db.Document.findAll(query);
    return res.json({
      success: true,
      code: 200,
      message: success.FETCH,
      parent: parent,
      data: documents,
    });
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /documents/:
 *   post:
 *     description: Add new document
 *     tags: [Documents]
 *     requestBody:
 *       description: Payload to add new document
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                {"displayName": "This is the name enterd by the user.","docType": "file OR folder","size": 22 (size must be provided in KB),"uuidName": "1asd123123123123.jpeg (this is unique name generated, rename the file chosen by the user)","format": "jpeg (this is the file extension)","parentId": 2 (if this file is created inside a folder then parentId is the id of that folder for root folder this is not required)}
 *     responses:
 *       200:
 *         description: Successfully adds new document
 *         content:
 *           application/json:
 *             schema:
 *               type: object *
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Document is created successfully.
 *                  data: {"id": 7,"displayName": "File inside level 1 folder","docType": "file","size": 22,"uuidName": "1asd123123123123.jpeg","format": "jpeg","parentId": 2,"userId": 17,"updatedAt": "2022-02-08T02:42:05.844Z","createdAt": "2022-02-08T02:42:05.844Z"}
 */
router.post(
  "/",
  auth,
  documentDataValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const documentData = ({
        displayName,
        docType,
        uuidName,
        format,
        size,
        parentId,
        replace,
      } = req.body);
      if (replace) {
        documentData.userId = userId;
        let fileExistsQuery = {};

        if (parseInt(documentData.parentId) == 0) {
          fileExistsQuery.where = {
            displayName,
            userId,
            parentId: {
              [Op.is]: null,
            },
          };
        } else {
          fileExistsQuery.where = {
            displayName,
            userId,
            parentId,
          };
        }
        await db.Document.destroy(fileExistsQuery);
        let document = await db.Document.create(documentData);

        return res.json(
          successRespSync({
            msg: success.DOCUMENT_CREATED,
            data: document,
          })
        );
      } else {
        documentData.userId = userId;
        if (docType === "file" && (parentId || parseInt(parentId) == 0)) {
          if (parseInt(parentId) != 0) {
            const isFolder = await db.Document.findByPk(parentId);
            if (isFolder === null || isFolder.docType === "file") {
              return res.json(
                errorRespSync({
                  code: error.code.UNPROCESSABLE_ENTITY,
                  msg: error.FOLDER_NOT_FOUND,
                })
              );
            }
          }
          let fileExistsQuery = {
            // where: {
            //   displayName,
            //   userId,
            //   parentId
            // },
          };
          if (parseInt(documentData.parentId) == 0) {
            fileExistsQuery.where = {
              displayName,
              userId,
              parentId: {
                [Op.is]: null,
              },
            };
          } else {
            fileExistsQuery.where = {
              displayName,
              userId,
              parentId,
            };
          }
          const fileExistsInFolder = await db.Document.findOne(fileExistsQuery);
          if (fileExistsInFolder) {
            return res.json(
              errorRespSync({
                code: error.code.CONFLICT,
                msg: error.FILE_ALREADY_EXISTS_IN_FOLDER,
              })
            );
          }
        } else if (docType === "folder") {
          const folderData = await db.Document.findOne({
            where: {
              displayName,
              userId,
            },
          });
          if (folderData !== null) {
            return res.json(
              errorRespSync({
                code: error.code.UNPROCESSABLE_ENTITY,
                msg: "Folder name already exists.",
              })
            );
          }
        }
        if (parseInt(documentData.parentId) == 0) {
          documentData.parentId = null;
        }
        const document = await db.Document.create(documentData);
        return res.json(
          successRespSync({
            msg: success.DOCUMENT_CREATED,
            data: document,
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /documents/rename/:id:
 *   put:
 *     description: Rename document
 *     tags: [Documents]
 *     requestBody:
 *       description: Payload to rename document
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                {"displayName": "This is the name enterd by the user."}
 *     responses:
 *       200:
 *         description: Successfully updates the document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Document is created successfully.
 *                  data: {"id": 7,"displayName": "Updated name","docType": "file","size": 22,"uuidName": "1asd123123123123.jpeg","format": "jpeg","parentId": 2,"userId": 17,"updatedAt": "2022-02-08T02:42:05.844Z","createdAt": "2022-02-08T02:42:05.844Z"}
 *
 */
router.put(
  "/rename/:id",
  auth,
  renameDocumentValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const documentId = req.params.id;
      const { displayName } = req.body;
      const document = await db.Document.findOne({
        where: {
          userId,
          id: documentId,
        },
      });
      if (document === null) {
        // doc doesnt exist
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: error.DOCUMNET_DOESNOT_EXIST,
          })
        );
      } else if (document.docType === "folder") {
        if (document.isDefaultFolder)
          // default folder cannot be renamed
          return res.json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Default Folder cannot be renamed.",
            })
          );
        // doc exists and is a folder
        const folderData = await db.Document.findOne({
          where: {
            displayName,
            userId,
          },
        });
        if (folderData !== null) {
          // folder already exists
          return res.json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Folder name already exists.",
            })
          );
        }
      } else if (document.docType === "file") {
        const folderData = await db.Document.findOne({
          where: {
            displayName,
            parentId: document?.parentId,
            userId,
            id: {
              [Op.not]: documentId,
            },
          },
        });
        if (folderData !== null) {
          // file already exists in the folder
          return res.json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: error.FILE_ALREADY_EXISTS_IN_FOLDER,
            })
          );
        }
      }
      document.displayName = displayName;
      await document.save();
      return res.json(
        successRespSync({
          msg: success.DOCUMENT_NAME_UPDATED,
          data: document,
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
 * /documents/move/:id:
 *   put:
 *     description: Move document (Only Files)
 *     tags: [Documents]
 *     requestBody:
 *       description: Payload to move document (Only Files)
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                {"parentId": 2}
 *     responses:
 *       200:
 *         description: Successfully move the document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Document moved successfully.
 *                  data: {"id": 7,"displayName": "Updated name","docType": "file","size": 22,"uuidName": "1asd123123123123.jpeg","format": "jpeg","parentId": 2,"userId": 17,"updatedAt": "2022-02-08T02:42:05.844Z","createdAt": "2022-02-08T02:42:05.844Z"}
 *
 */
router.put(
  "/move/:id",
  auth,
  moveDocumentValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const documentId = req.params.id;
      const { parentId } = req.body;
      const document = await db.Document.findOne({
        where: {
          userId,
          id: documentId,
        },
      });
      if (document === null) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: error.DOCUMNET_DOESNOT_EXIST,
          })
        );
      }
      if (document.docType === "folder") {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: error.DOCUMNET_FOLDER_CANNOT_BE_MOVED,
          })
        );
      }

      //For moving to root path(no Parent Id)
      if (parentId == 0) document.parentId = null;
      else document.parentId = parentId;

      await document.save();
      return res.json(
        successRespSync({
          msg: success.DOCUMENT_MOVED_SUCCESS,
          data: document,
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
 * /:id:
 *   delete:
 *     description: Delete Document
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Successfully deleted the document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Document deleted successfully.
 *                  data: {"id": 7,"displayName": "Updated name","docType": "file","size": 22,"uuidName": "1asd123123123123.jpeg","format": "jpeg","parentId": 2,"userId": 17,"updatedAt": "2022-02-08T02:42:05.844Z","createdAt": "2022-02-08T02:42:05.844Z"}
 *       409:
 *         description: Conflict Folder may contain other files/folders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  success: false
 *                  code: 409
 *                  message: Folder contains other files/folder within, please move them or delete them before deleting this folder.
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;
    const document = await db.Document.findOne({
      where: {
        userId,
        id: documentId,
      },
    });
    if (document === null) {
      return res.json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: error.DOCUMNET_DOESNOT_EXIST,
        })
      );
    }

    if (document.isDefaultFolder)
      // default folder cannot be deleted
      return res.json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Default Folder cannot be deleted.",
        })
      );
    await document.destroy();
    return res.json(
      successRespSync({
        msg: success.DOCUMENT_DELETED_SUCCESS,
        data: document,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/directUpload", auth, validationErrorHandler, async (req, res) => {
  try {
    const { base64Str, fileName } = req.body;
    const { Location: location, Key: key } = await S3.uploadBase64({
      base64: base64Str,
      fileName,
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          location,
          key,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post(
  "/videoUpload",
  auth,
  validationErrorHandler,
  upload.single("video"),
  async (req, res) => {
    try {
      const { originalname: fileName } = req.file;
      const { Location: location, Key: key } = await S3.uploadVideo({
        file: req.file.buffer,
        fileName,
      });
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            location,
            key,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
