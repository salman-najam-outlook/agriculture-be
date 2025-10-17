const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { serverError, errorResp, successRespSync } = require(rootPath + '/helpers/api');
const { Op } = require('sequelize');
const { auditFileValidator } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
/* eslint-disable */
const AWSS3 = require(rootPath + '/components/s3.js');

var multer = require('multer');
var multerS3 = require('multer-s3');

var upload = multer({
  storage: multerS3({
    s3: AWSS3.getClient(),
    bucket: process.env.AWS_PRIVATE_BUCKET + '/soilauditfile',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
});

/**
* @swagger
* /audit/soil/viaFile:
*   post:
*     summary: Upload soil fertility audit file
*     description: Create soil fertility audit via file
*     tags: [Soil audit]
*     consumes:
*       - : multipart/form-data
*     parameters:
*       - in: header
*         name: oauth-token
*         required: true
*         schema:
*           type: string
*         description: authorization token
*       - in: formData
*         name: upfile
*         type: file
*         description: File to upload
*     responses:
*       200:
*         description: Returns the audit file url
*       500:
*         description: Server error
*/
const postAuditFolderAndFiles = async (hasAuditFolder, req) => {
      const { docArr, recordId } = req.body;
      // check if auditType subfolders exist
      let resObj = {}
      let promiseArr = []
      docArr.forEach(async doc => {
      let tmpProm = new Promise((resolve, reject)=>{
          db.Document.findOne({
            where: {
              [Op.and]: [
                { userId: req.user.id },
                { displayName: doc.auditType },
                { docType: "folder"},
                {
                  parentId: hasAuditFolder.dataValues.id 
                }
              ]       
            }
          }).then(row => {
            resolve({
              row,
              doc
            })
          })
        });
        promiseArr.push(tmpProm)
      })

      let hasAuditTypeResArr = []
      hasAuditTypeResArr =  await Promise.all(promiseArr)

      let createAuditTypeArr = []
      let createAuditFileArr = []

      hasAuditTypeResArr.forEach(file => {
        if(!file.row) { // audit type folder doesnt exist
          // create audit type folders
          let folderDoc = {
            displayName: file.doc.auditType,
            docType: "folder",
            userId: req.user.id,
            parentId: hasAuditFolder.dataValues.id,
            recordId
          }
          let tmpProm = new Promise((resolve, reject)=> {
            db.Document.create(folderDoc).then(row => {
              let doc = file.doc
              resolve({
                row,
                doc
              })
            })
          })
          createAuditTypeArr.push(tmpProm)
        } else { // audit type folder exist
          // create audit files
          let fileDoc = {
            displayName: file.doc.displayName,
            uuidName: file.doc.uuidName,
            size: file.doc.size,
            format: file.doc.format,
            docType: file.doc.docType,
            parentId : file.row.dataValues.id,
            userId: req.user.id,
            recordId
          }

          createAuditFileArr.push(db.Document.create(fileDoc))
        }
      })

      let auditTypeResArr = []
      auditTypeResArr = await Promise.all(createAuditTypeArr)

      let auditFileResArr = []
      auditFileResArr = await Promise.all(createAuditFileArr)

      createAuditFileArr = []
      auditTypeResArr.forEach(res => {
        // create audit file for files without auditType folders
        let fileDoc = {
          displayName: res.doc.displayName,
          uuidName: res.doc.uuidName,
          size: res.doc.size,
          format: res.doc.format,
          docType: res.doc.docType,
          parentId : res.row.dataValues.id,
          userId: req.user.id,
          recordId
        }
        createAuditFileArr.push(db.Document.create(fileDoc))
      })
      resObj.newAuditFolderCreated = auditTypeResArr



      let auditFileResArr1 = []
      auditFileResArr1 = await Promise.all(createAuditFileArr)


      resObj.newAuditFilesCreated = [...auditFileResArr, ...auditFileResArr1]
      return resObj
}

router.post('/', auth, auditFileValidator(), validationErrorHandler, async (req, res) => {
  try {

    let hasAuditFolder = null
    hasAuditFolder = await db.Document.findOne({
      where: {
        [Op.and]: [
          { userId: req.user.id },
          { displayName: "audit" },
          { docType: "folder"},
          {
            parentId: {
              [Op.is]: null
            }
          }
        ]       
      }
    })

    if(hasAuditFolder) { // user already has audit folder
      
    let resObj = await postAuditFolderAndFiles(hasAuditFolder, req)
        // send response
        return res.json(
          successRespSync({
            msg: success.SOIL_AUDIT_CREATED,
            data: resObj.newAuditFilesCreated[0]
          })
        );
    } else { // user doesnt have audit folder

      // create audit folder for user
      let folderDocument = {
        displayName: "audit",
        docType: "folder",
        userId: req.user.id,
        recordId: req.body.recordId
      }
      let folderDocRes = await db.Document.create(folderDocument);
      let resObj = await postAuditFolderAndFiles(folderDocRes, req)

          // send response
          return res.json(
            successRespSync({
              msg: success.SOIL_AUDIT_CREATED,
              data: resObj.newAuditFilesCreated[0]
            })
          );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


/**
* @swagger
* /audit/soil/viaFile/{id}:
*   put:
*     summary: Update soil audit
*     description: Update soil audit file
*     tags: [Soil audit]
*     consumes:
*       - : multipart/form-data
*     parameters:
*       - in: header
*         name: oauth-token
*         required: true
*         schema:
*           type: string
*         description: authorization token
*       - in: formData
*         name: upfile
*         type: file
*         description: File to upload

*     responses:
*       200:
*         description: Returns the practice JSON
*       500:
*         description: Server error
*/

router.put('/:id', auth, function(req, res, next){
  return db.SoilFertilityAudit.findOne({
    where: {
      id: req.params.id
    }
  }).then(async (audit)=>{
    if(!audit) return res.status(error.code.SERVER_ERROR).json(await errorResp({ msg: 'audit with id '+req.params.id+' not found' }));
    req.Audit = audit;
    return next();
  });
}, upload.single('file'), async function(req, res){
  try {
    if(!req.file)
      return res.status(error.code.SERVER_ERROR).json(await errorResp({ msg: 'file field is required' }));

    if(req.Audit.fileUrl) await AWSS3.deleteObject(req.Audit.fileUrl, '/soilauditfile');

    let data = { fileUrl: req.file.location };
    let result = await req.Audit.update(data);
    return res.json(
      successRespSync({
        msg: success.SOIL_AUDIT_UPDATED,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
/* eslint-enable */