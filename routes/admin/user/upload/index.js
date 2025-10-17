const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { deleteFileS3 } = require(rootPath + '/helpers/aws_s3');
const fileUpload = require(rootPath + '/middleware/file_upload');
const userUploadValidator = require(rootPath +
  '/helpers/validators/userUpload');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /admin/user/upload:
 *   post:
 *     summary: upload csv to import user
 *     description: upload csv to import user
 *     tags: [User Import]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *     requestBody:
 *       description: upload csv to import user
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *         description: show success response
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "uploaded successfully", "data": { "uploadId": 1, "numRecords": 4 } }
 *       500:
 *         description: Server error
 *         content:
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
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.post(
  '/',
  auth,
  fileUpload({
    fields: 'file',
    acl: 'public-read',
    bucket: process.env.AWS_PUBLIC_BUCKET,
    whiteListMimeTypes: [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  }),
  async (req, res) => {
    try {
      // validation if sheet has required column
      const file = await axios({
        method: 'GET',
        url: req.file?.location,
        responseType: 'arraybuffer',
      });

      const wb = xlsx.read(file.data, { type: 'buffer' });
      const jsonArray = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        raw: true,
        header: 1,
        blankrows: false,
      });
      const numRecords = jsonArray?.length - 1;
      const fileHeader = jsonArray[0];
      const reqHeader = [
        'First Name',
        'Last Name',
        'Email',
        'Mobile Number',
        'Membership Type',
        'Membership Validity',
        'Activation Key',
        'User Role',
      ];
      const missingCol = reqHeader.filter((col) => !fileHeader.includes(col));
      if (missingCol.length > 0) {
        req.customError = { code: 'invalid_headers', data: missingCol };
        throw new Error('Invalid header in file');
      }
      // upload sheet and save information
      const { id: userId } = req.user;
      const {
        originalname: fileOriginalName,
        key: fileS3Name,
        location,
        size: fileSize,
      } = req.file;

      const set = { userId, fileOriginalName, fileS3Name, location, fileSize };
      const userImport = await db.UserImport.create(set);

      return res.json(
        successRespSync({
          msg: success.UPLOADED,
          data: { uploadId: userImport.id, numRecords },
        })
      );
    } catch (err) {
      if (req.file !== undefined && req.file !== null) {
        const params = {
          Key: req.file.key,
          Bucket: process.env.AWS_PUBLIC_BUCKET,
        };
        await deleteFileS3(params);
      }
      logErrorOccurred(__filename, err);

      switch (req.customError?.code) {
        case 'invalid_headers':
          return res.json(
            errorRespSync({
              msg: {
                errors: [
                  {
                    msg: error.INVALID_SHEET_HEADERS,
                    param: req.customError?.data,
                  },
                ],
              },
              code: success.code.OK,
            })
          );
        default:
          return serverError(res, err);
      }
    }
  }
);

/**
 * @swagger
 * /admin/user/upload:
 *   get:
 *     summary: list uploaded csv file informations
 *     description: list uploaded csv file informations
 *     tags: [User Import]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: 'ss'
 *         description: 'search values of column'
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         example: '1'
 *         description: 'page number'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         example: '10'
 *         description: 'no of rows to return'
 *       - in: query
 *         name: col
 *         schema:
 *           type: string
 *         example: 'id'
 *         description: 'name of the column'
 *       - in: query
 *         name: desc
 *         schema:
 *           type: string
 *           enum:
 *            - true
 *            - false
 *         example: 'true'
 *         description: 'descesding true or false'
 *     responses:
 *       200:
 *         description: show success response
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "uploadedFiles": { "numRows": 1, "totalRows": 1, "rows": [ { "id": 2, "fileOriginalName": "import-agzon.csv", "fileS3Name": "beeaee10-b61f-4fad-bdbc-58ed83a9a7fb.1649760741727.csv", "location": "https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/beeaee10-b61f-4fad-bdbc-58ed83a9a7fb.1649760741727.csv", "status": "pending", "createdAt": "2022-04-12T10:52:22.000Z" } ] } } }
 *       500:
 *         description: Server error
 *         content:
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
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.get(
  '/',
  auth,
  userUploadValidator.get(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 1000,
        col = 'id',
        desc = 'true',
        search,
      } = req.query;
      limit = parseInt(limit);

      let where = { isDeleted: '0' };
      if (notEmpty(search)) {
        const fields = ['fileOriginalName', 'status'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.like]: '%' + search + '%',
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      const { count: totalRows, rows } = await db.UserImport.findAndCountAll({
        attributes: [
          'id',
          'fileOriginalName',
          'fileS3Name',
          'location',
          'fileSize',
          'status',
          'createdAt',
        ],
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
        where,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { uploadedFiles: { numRows: rows.length, totalRows, rows } },
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
 * /admin/user/upload/{id}:
 *   delete:
 *     summary: delete uploaded csv file with upload id
 *     description: delete uploaded csv file with upload id
 *     tags: [User Import]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: '1'
 *         description: upload id
 *     responses:
 *       200:
 *         description: show success response
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Deleted successfully.", "data": { "uploadId": "2" } }
 *       500:
 *         description: Server error
 *         content:
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
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.delete(
  '/:id',
  auth,
  userUploadValidator.delete(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id } = req.params;

      const set = { isDeleted: '1' };
      await db.UserImport.update(set, {
        where: { id },
      });

      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: { uploadId: id },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
