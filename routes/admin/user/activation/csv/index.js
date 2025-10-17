const express = require('express');
const xlsx = require('xlsx');
const router = express.Router();
const axios = require('axios');
const shortid = require('short-uuid');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorRespSync, successRespSync, serverError, errorResp } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { createPassword } = require(rootPath + '/helpers/hash');
const { logErrorOccurred, notEmpty, fileFilterGen } = require(rootPath + '/helpers/general');
const { setDefaultUnitSettingsForAppUsers } = require(rootPath + '/helpers/defaultUnitConfigCacaoUser');
const { deleteFileS3, getSignedURL } = require(rootPath + '/helpers/aws_s3'); // s3 functions
const { generateKeyValidation } = require(rootPath +
  '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const validator = require('validator').default;

const { Op } = require('sequelize');
const sequelize = require('sequelize');
const moment = require('moment');
const Queue = require('bull');
const { v4: uuidv4 } = require('uuid');
var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
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
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});
var params, whiteListMimeTypes;
whiteListMimeTypes = ['text/csv'];
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});


const keyAssignQueue = new Queue('keyAssignQueue', {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});

  keyAssignQueue.process(5, async function (job, done) {
    try {
      const { activationKeyRes, activationIdToData, organization, subOrgId } = job.data;
      let promiseArr = [],
        userDataArr = [],
        activationInputObj = {},
        activationInputArr = [],
        membershipInputArr = [];

      activationKeyRes.forEach(async (item) => {
      
          let prom = new Promise(async (resolve, reject) => {
            try {
              let whereArr = []
              if(activationIdToData[item.license_key].email) {
                whereArr.push({ email: activationIdToData[item.license_key].email  })
              } 
              if(activationIdToData[item.license_key].phone_no){
                whereArr.push({ mobile: activationIdToData[item.license_key].phone_no })
              }
              let userExists = await db.user.findOne({   where: {
                [Op.or]: whereArr,
              }})
              if(!userExists) {
                    let userData = {},
                    userPassword;
                  userData.firstName = activationIdToData[item.license_key].first_name && `${activationIdToData[item.license_key].first_name}`.trim() || null;
                  userData.lastName =
                  activationIdToData[item.license_key].last_name && `${activationIdToData[item.license_key].last_name}`.trim() || null;
                  userData.email = activationIdToData[item.license_key].email && `${activationIdToData[item.license_key].email}`.trim() || null;
                  userData.mobile = activationIdToData[item.license_key].phone_no &&`${activationIdToData[item.license_key].phone_no}`.trim() || null;
                  let password = shortid.generate();
                  userPassword = await createPassword(password);
                  userData.password = userPassword;
                  userData.verified = true
                  userData.isFirstLogin = true
                  userData.language = "English";
                  // userData.countryIsoCode = activationIdToData[item.license_key].country_iso_code &&`${activationIdToData[item.license_key].country_iso_code}`.trim() || null;
                  userData.country = activationIdToData[item.license_key].country &&`${activationIdToData[item.license_key].country}`.trim() || null;
                  userData.countryCode = activationIdToData[item.license_key].country_code &&`${activationIdToData[item.license_key].country_code}`.trim() || 0;
                  userData.organization = organization;
                  userData.subOrganizationId = subOrgId || null;
                  userData.source = "cf_bulk_upload" // need this to differentiate between bulk upload and other signup flow
                  activationInputObj[userPassword] = {
                    password,
                    ...item,
                    ...activationIdToData[item.license_key],
                  };

                  resolve(userData);
              } else {
                resolve(null)
              }
              
            } catch (error) {
              reject(error);
            }
          });
          promiseArr.push(prom);
    });
    job.progress(20);

    userDataArr = await Promise.all(promiseArr);

    userDataArr = userDataArr.filter(u => u)

    // create user
    let userRes = await db.user.bulkCreate(userDataArr);
    let userIdList = []
    job.progress(50);

    // transaction.rollback();

    // assign membership to user
    if (userRes.length > 0) {
      userRes.forEach((user) => {
        userIdList.push(user.id)
        let tmpObj = {},
          tmpObj1 = {};
        tmpObj.user_id = user.id;
        tmpObj.membership_id =
          activationInputObj[user.password].membership_type;
        membershipInputArr.push(tmpObj);

        tmpObj1.id = activationInputObj[user.password].id;
        tmpObj1.license_key = activationInputObj[user.password].license_key;
        tmpObj1.user_id = user.id;
        tmpObj1.user_email = activationInputObj[user.password].email;
        tmpObj1.phone_no = activationInputObj[user.password].phone_no;
        tmpObj1.membership_type =
          activationInputObj[user.password].membership_type;
        tmpObj1.status = "assigned";
        tmpObj1.generated_key_id =
          activationInputObj[user.password].generated_key_id;
        tmpObj1.is_deleted = activationInputObj[user.password].is_deleted;
        tmpObj1.createdAt = new Date();
        tmpObj1.updatedAt = new Date();
        tmpObj1.job_id = "test";
        tmpObj1.org_id = organization
        tmpObj1.subOrgId = subOrgId || null;
        activationInputArr.push(tmpObj1);
      });
    }
    const userRoles = userRes.map(r => {
      return {
        id: `${r.id}_end_user`,
        user_id: r.id,
        role_id: 'end_user'
      }
    })

    await db.UserRoles.bulkCreate(
      userRoles)
    job.progress(80);

    let membershipRes = await db.UserMembershipMap.bulkCreate(
      membershipInputArr,
    );

    // assign activation key to user
    let activationRes = await db.activationKeys.bulkCreate(
      activationInputArr,
      {
        updateOnDuplicate: ["user_id", "user_email", "phone_no", "status"],

      }
    );

    // assign generic password to all users
    let genericPassword = await createPassword(process.env.GENERIC_BULK_USER_PW || "Dimitra@123" );
    await db.user.update({password: genericPassword}, {where: {id: userIdList}})

    // Set default unit settings for all newly created users
    if (userRes.length > 0) {
      for (const user of userRes) {
        try {
          await setDefaultUnitSettingsForAppUsers(user.id, organization);
        } catch (error) {
          console.error(`Error setting default unit settings for user ${user.id}:`, error);
        }
      }
    }

    done(null, "console result");
    job.progress(100);
    await db.csvUpload.update(
      { progress: 100 },
      { where: { job_id: job.id } }
    );
  } catch (error) {

    job.progress("fail");
    await db.csvUpload.update(
      { progress: "fail" },
      { where: { job_id: job.id } }
    );
    console.log(error, "csv upload job error");
    done();
  }
});

// keyAssignQueue.on('completed',async function(job, result){
//     console.log(job.data, result, 'completed')
//     await db.csvUpload.update({progress: 100}, {where: {id: job.data.generationInput.id}})
// });


router.post("/", auth, (req, res, next) => {
  let fileUpload = upload.single("activationCsv");
  fileUpload(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.json(errorRespSync({ code: 200, msg: err.message }));
    } else if (req.file == undefined) {
      return res.json(
        errorRespSync({ code: 200, msg: "Csv required" })
      );
    } else {
      next();
    }
  });
},
  async (req, res) => {
    try {
      const { id, organization, subOrgId } = req.user;
      const jobId = uuidv4();
      let set = {},
        activationIdArr = [],
        activationKeyRes = [],
        jsonArray = [],
        successArr = [],
        failedArr = [],
        activationIdToData = {},
        userInsertArr = [];
      // get old profile pic data
      // console.log(req.file, "file");
      const file = await axios({
        method: "GET",
        url: req.file?.location,
        responseType: "arraybuffer",
        responseEncoding: "utf-8"
      });
      const wb = xlsx.read(file.data.toString(), { type: "string"});
      jsonArray = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        blankrows: false,
      });

      const isValidSheetData = jsonArray.every(item => {
        const email = item['Email'] || item['email'];
        const phone = item['Mobile Number'] || item['phone_no'];
        const activationKey = item['Activation Key'] || item['license_key'];
        if((!email && !phone) || !activationKey) return false;
        return (validator.isEmail((email ?? '').trim()) || validator.isMobilePhone((phone ?? '').toString().trim())) && validator.isLength(validator.trim(activationKey), { min: 15, max: 255 });
      });

      if(!isValidSheetData || jsonArray.length == 0) {
        if(req.file?.key) {
          await deleteFileS3({
            Bucket: process.env.AWS_PUBLIC_BUCKET,
            Key: req.file.key,
          });
        }
        return res.json(errorRespSync({ code: 400, msg: 'Invalid CSV data' }));
      }


      activationIdArr = jsonArray.map((item) => {
        let tmpObj = {}
        tmpObj.first_name = item['First Name'] || item['first_name']
        tmpObj.last_name = item['Last Name'] || item['last_name']
        tmpObj.email = item['Email'] || item['email']
        tmpObj.country_code = item['Country Code'] || item['country_code']
        // tmpObj.country_iso_code = item['Country ISO Code'] || item['country_iso_code']
        tmpObj.country = item['Country'] || item['country']
        tmpObj.phone_no = item['Mobile Number'] || item['phone_no']
        tmpObj.license_key = item['Activation Key']?.trim() || item['license_key'].trim()


        activationIdToData[tmpObj.license_key] = tmpObj;
        return tmpObj.license_key;
      });

      activationKeyRes = await db.activationKeys.findAll({
        where: { license_key: activationIdArr, status: "unassigned" },
      });

      // await db.csvUpload.create({
      //   job_id: jobId,
      //   csv_url: req.file?.location,
      //   sales_manager_id: id,
      //   file_name: req.file?.originalname,
      //   s3_key: req.file?.key,
      //   progress: 0,
      //   data_type: 'user_uploaded',
      //   org_id: organization
      // });
      if (activationKeyRes.length > 0) {
        keyAssignQueue.add({ activationKeyRes, activationIdToData, organization, subOrgId }, { jobId });
      }

      console.log("here");

      // send response
      return res.json(
        successRespSync({
          msg: "success",
          data: jobId,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post("/v2", auth, 
  async (req, res) => {
    try {
      const { id, organization, subOrgId } = req.user;
      const jobId = uuidv4();
      let set = {},
        activationIdArr = [],
        activationKeyRes = [],
        jsonArray = [],
        successArr = [],
        failedArr = [],
        activationIdToData = {},
        userInsertArr = [];
      // get old profile pic data
      // console.log(req.file, "file");
      jsonArray = req.body.stagedData

      const isValidSheetData = jsonArray.every(item => {
        const email = item['Email'] || item['email'];
        const phone = item['Mobile Number'] || item['phone_no'] || item['mobile'];
        const activationKey = item['Activation Key'] || item['license_key'];
        if((!email && !phone) || !activationKey) return false;
        return (validator.isEmail((email ?? '').trim()) || validator.isMobilePhone((phone ?? '').toString().trim()))
      });

      if(!isValidSheetData || jsonArray.length == 0) {
        if(req.file?.key) {
          await deleteFileS3({
            Bucket: process.env.AWS_PUBLIC_BUCKET,
            Key: req.file.key,
          });
        }
        return res.json(errorRespSync({ code: 400, msg: 'Invalid CSV data' }));
      }


      activationIdArr = jsonArray.map((item) => {
        let tmpObj = {}
        tmpObj.first_name = item['First Name'] || item['first_name']
        tmpObj.last_name = item['Last Name'] || item['last_name']
        tmpObj.email = item['Email'] || item['email']
        tmpObj.country_code = item['Country Code'] || item['country_code']
        // tmpObj.country_iso_code = item['Country ISO Code'] || item['country_iso_code']
        tmpObj.country = item['Country'] || item['country']
        tmpObj.phone_no = item['Mobile Number'] || item['phone_no'] || item['mobile']
        tmpObj.license_key = item['Activation Key']?.trim() || item['license_key'].trim()


        activationIdToData[tmpObj.license_key] = tmpObj;
        return tmpObj.license_key;
      });

      activationKeyRes = await db.activationKeys.findAll({
        where: { license_key: activationIdArr, status: "unassigned" },
      });

      // await db.csvUpload.create({
      //   job_id: jobId,
      //   csv_url: req.file?.location,
      //   sales_manager_id: id,
      //   file_name: req.file?.originalname,
      //   s3_key: req.file?.key,
      //   progress: 0,
      //   data_type: 'user_uploaded',
      //   org_id: organization
      // });
      if (activationKeyRes.length > 0) {
        keyAssignQueue.add({ activationKeyRes, activationIdToData, organization, subOrgId }, { jobId });
      }

      console.log("here");

      // send response
      return res.json(
        successRespSync({
          msg: "success",
          data: jobId,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get('/job/:jobId', validationErrorHandler,

  async (req, res) => {
    try {
      // get job progress using :jobId
      const job = await db.csvUpload.findOne({ where: { job_id: req.params.jobId } });
      return res.json(
        successRespSync({
          data: job
        })
      );
    } catch (err) {
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg: err?.msg || error.SERVER
        })
      );
    }


  }
)

router.get(
  "/files",
  validationErrorHandler,
  auth,
  async (req, res) => {
    try {
      const { organization, subOrgId } = req.user;
      let fileRes = await db.csvUpload.findAll({
        where: {
          is_deleted: 0,
          data_type: 'user_uploaded',
          org_id: organization,
          subOrgId: subOrgId || null,
        }
      });
      return res.json(
        successRespSync({
          message: "Successfully fetched files",
          data: fileRes,
        })
      );
    } catch (err) {
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg: err?.msg || error.SERVER,
        })
      );
    }
  }
);



router.delete(
  "/:s3key",
  validationErrorHandler,

  async (req, res) => {
    try {
      // get job progress using :jobId
      let param = {
        Bucket: process.env.AWS_PUBLIC_BUCKET,
        Key: req.params.s3key,
      };
      await db.csvUpload.update({ is_deleted: 1 }, { where: { s3_key: req.params.s3key } });
      let deleteRes = await deleteFileS3(param);
      return res.json(
        successRespSync({
          data: deleteRes,
        })
      );
    } catch (err) {
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg: err?.msg || error.SERVER,
        })
      );
    }
  }
);




module.exports = router;