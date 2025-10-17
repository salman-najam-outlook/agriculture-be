const express = require("express");
const bcrypt = require("bcrypt");
const shortid = require("short-uuid");
const xlsx = require("xlsx");
const axios = require("axios");
const router = express.Router();
const db = require(rootPath + "/models");
const ejs = require("ejs");
const path = require("path");
const mailer = require(rootPath + "/components/mailer");
const html2pdf = require("html-pdf");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const auth = require(rootPath + "/middleware/auth");
const {
  errorRespSync,
  successRespSync,
  serverError,
  errorResp,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty, sendEmail } = require(rootPath +
  "/helpers/general");
const { deleteFileS3 } = require(rootPath + "/helpers/aws_s3");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { generateKeyValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment");
const Queue = require("bull");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
var aws = require("aws-sdk");

const s3 = new aws.S3({
  region: process.env.AWS_REGION || "us-east-1",
  signatureVersion: process.env.AWS_SIGNATURE_V || "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ||
    "",
  bucket: process.env.AWS_PUBLIC_BUCKET || "dimitra-public-images",
});

const keyGenQueue = new Queue("keyGenQueue", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || "",
  },
});
let stream = require("stream");
const { first } = require("lodash");

keyGenQueue.process(async function (job, done) {
  try {
    const uploadStream = ({ Bucket, Key }) => {
      const pass = new stream.PassThrough();
      return {
        writeStream: pass,
        promise: s3
          .upload({ Bucket, Key, ContentType: "text/csv", Body: pass })
          .promise(),
      };
    };

    const { generationInput } = job.data;
    let result,
      inputArr = [];

    job.progress(50);
    for (let i = 0; i < generationInput.number_of_keys; i++) {
      let key = shortid.generate();
      // const saltRounds    = 3;
      // const salt          = await bcrypt.genSalt(saltRounds);
      // const hash          = await bcrypt.hash(id, salt);

      let inputObj = {
        license_key: key,
        membership_type: generationInput.membership_type,
        generated_key_id: generationInput.id,
        org_id: generationInput.org_id,
        subOrgId: generationInput.subOrgId || null,
      };
      inputArr.push(inputObj);
    }
    result = await db.activationKeys.bulkCreate(inputArr);
    result = result.map((r) => {
      let tmpObj = {};
      (tmpObj.activation_key_id = r.dataValues.id),
        (tmpObj.license_key = r.dataValues.license_key),
        (tmpObj.org_id = r.dataValues.org_id),
        (tmpObj.first_name = "");
      tmpObj.last_name = "";
      tmpObj.email = "";
      tmpObj.phone_no = "";
      return tmpObj;
    });

    // let csvSheet = xlsx.utils.json_to_sheet(result)
    // let csvStream = xlsx.stream.to_csv(csvSheet)

    // const { writeStream, promise } = uploadStream({ Bucket: process.env.AWS_PUBLIC_BUCKET || "dimitra-public-images", Key: `key_list_${new Date().getTime()}.csv` });

    // csvStream.pipe(writeStream)
    // let uploadRes = await promise;
    // await db.generatedKeys.update({ csv_url: uploadRes.Location }, { where: { id: generationInput.id } })

    // // generate and upload pdf
    // let csvHtml = xlsx.utils.sheet_to_html(csvSheet);

    // const createHtmlStream = (csvHtml) => {
    //   return new Promise((resolve, reject) => {
    //     html2pdf
    //       .create(csvHtml, {
    //         border: {
    //           top: "2px", // default is 0, units: mm, cm, px, px
    //           right: "1px",
    //           bottom: "2px",
    //           left: "1.5px",
    //         },
    //       })
    //       .toStream((err, stream) => {
    //         if (err) {
    //           return reject(err);
    //         } else {
    //           resolve(stream);
    //         }
    //       });
    //   });
    // };
    // let htmlStream = await createHtmlStream(csvHtml);

    // let htmpUploadObj = uploadStream({ Bucket: process.env.AWS_PUBLIC_BUCKET || "dimitra-public-images", Key: `key_list_pdf_${new Date().getTime()}.pdf` });
    // htmlStream.pipe(htmpUploadObj.writeStream)
    // let htmpUploadRes = await htmpUploadObj.promise
    // await db.generatedKeys.update({ pdf_url: htmpUploadRes.Location }, { where: { id: generationInput.id } })

    done(null, "console result");
    job.progress(100);
  } catch (error) {
    await db.generatedKeys.update(
      { progress: "failed" },
      { where: { id: job.data.generationInput.id } }
    );
  }
});

keyGenQueue.on("completed", async function (job, result) {
  console.log(job.data, result, "completed");
  await db.generatedKeys.update(
    { progress: 100 },
    { where: { id: job.data.generationInput.id } }
  );
});

/**
 * @swagger
 * /admin/user/activation/download-sample-csv:
 *   get:
 *     summary: API for download sample csv
 *     description: API for download sample csv
 *     tags: [Admin]
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
 *                     type: string
 */
router.get("/download-sample-csv", auth, async (req, res) => {
  try {
    const sample_url =
      "https://dimitra-public-images.s3.amazonaws.com/Bulk-user-upload-csv-sample.csv";
    const response = {
      url: sample_url,
    };
    return res.json(
      successRespSync({
        msg: "URL fetched successfully",
        data: response,
      })
    );
  } catch (err) {
    console.log(err);
    return res.json(
      await errorResp({
        code: err?.original?.code || 500,
        msg: err?.msg || error.SERVER,
      })
    );
  }
});

/**
 * @swagger
 * /admin/user/activation/download-report:
 *   post:
 *     summary: API for download activation key pdf and csv.
 *     description: API will return csv or pdf file.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                generatedKeyId:
 *                  type: string
 *                fileType:
 *                  type: string
 *                  description: 'fileType will be either "csv" or "pdf"'
 *            example:
 *              {"generatedKeyId":"33", fileType: "csv or pdf"}
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
 *                     type: file
 */
router.post("/download-report", async (req, res) => {
  try {
    const { generatedKeyId, fileType } = req.body;
    let activationKeyRes = [];
    const activationKeyResWithUser = await db.activationKeys.findAll({
      attributes: ["license_key","user_id", "user_email", "phone_no", "status"],
      where: { generated_key_id: generatedKeyId },
      include: [
        {
          model: db.generatedKeys,
          attributes: ["admin_role"],
        },
        {
          model: db.user,
          attributes: ["firstName", "lastName", "email", "mobile"],
          required: false,
          as: "user_assoc",
        },
      ],
      raw: false,
    });

   activationKeyRes = activationKeyResWithUser.map((item) => ({
      license_key: item.license_key,
      first_name: item.user_assoc?.firstName || null,
      last_name: item.user_assoc?.lastName || null,
      user_email: item.user_assoc?.email || item.user_email || null,
      phone_no: item.user_assoc?.mobile || item.phone_no || null,
      status: item.status,
      "generatedKey.admin_role": item.generatedKey?.admin_role || null,
    }));

    if (fileType == "pdf") {
      let pdfInputData = [];
      pdfInputData = activationKeyRes.map((el) => {
        el["admin_role"] = el["generatedKey.admin_role"];
        delete el["generatedKey.admin_role"];
        return el;
      });
      const data = {
        title: "Activation Key list",
        subHeader: {
          generated_by:
            activationKeyRes.length > 0
              ? activationKeyRes[0]["admin_role"]
                  .split("_")
                  .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                  .join(" ")
              : "System",
          date: moment().format(process.env.ACCEPT_DATE_FORMAT),
        },
        tableData: pdfInputData,
      };
      let pdfData = await generatePDF(data, req);
      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed.",
          })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + pdfData.fileName,
        });
        fs.createReadStream(pdfData.path).pipe(res);
        return;
      }
    } else if (fileType == "csv") {
      let csvData = [];
      csvData = activationKeyRes.map((el) => {
        el["admin_role"] = el["generatedKey.admin_role"];
        delete el["generatedKey.admin_role"];
        return el;
      });

      let csvSheet = xlsx.utils.json_to_sheet(csvData);
      let csvStream = xlsx.stream.to_csv(csvSheet);
      if (!csvStream) {
        return res.json(
          errorRespSync({
            msg: "CSV report generation failed.",
          })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/vnd.ms-excel",
          "Content-Disposition":
            "attachment; filename=" +
            `acitvation_key_csv_list_${new Date().getTime()}`,
        });
        csvStream.pipe(res);
        return;
      }
    }
    return res.json(
      successRespSync({
        msg: "Activation key assigned successfully",
      })
    );
  } catch (err) {
    console.log(err);
    return res.json(
      await errorResp({
        code: err?.original?.code || 500,
        msg: err?.msg || error.SERVER,
      })
    );
  }
});

router.post(
  "/",
  auth,
  generateKeyValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { membershipType, numberOfKeys, comment } = req.body;
      const id = uuidv4();
      let org_id = req.user.organization;
      let subOrgId = req.user.subOrgId || null;
      let result = await db.generatedKeys.create({
        membership_type: membershipType,
        generated_by: req.user.id,
        admin_role: req.user.userRoles[0]["role_id"],
        number_of_keys: numberOfKeys,
        comment: comment,
        progress: 0,
        job_id: id,
        org_id,
        subOrgId
      });

      if (result) {
        keyGenQueue.add({ generationInput: result }, { jobId: id });
      }
      return res.json(
        successRespSync({
          msg: "Generation keys successfully queued",
          data: result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg:
            err?.original?.code == "ER_DUP_ENTRY"
              ? error.ALREADY_EXISTS
              : error.SERVER,
        })
      );
    }
  }
);


queueActivationKeyGenerationInternally = async (generationInput) => {

      const { membershipType, numberOfKeys, comment } = generationInput.body;
      const id = uuidv4();
      let org_id = generationInput.user.organization;
      let subOrgId = generationInput.user.subOrgId || null;
      let result = await db.generatedKeys.create({
        membership_type: membershipType,
        generated_by: generationInput.user.id,
        admin_role: generationInput.user.userRole,
        number_of_keys: numberOfKeys,
        comment: comment,
        progress: 0,
        job_id: id,
        org_id,
        subOrgId
      });

      if (result) {
        keyGenQueue.add({ generationInput: result }, { jobId: id });
      }
      return "Generation keys successfully queued"

}

router.get("/dashboard", auth, validationErrorHandler, async (req, res) => {
  try {
    let assignedKeys = 0,
      unassignedKeys = 0,
      activatedKeys = 0,
      uploadedFiles = 0;
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    const { organization, subOrgId } = req.user;

    generatedActivationKeys = await db.activationKeys.count({
      where: {
        org_id: organization,
        subOrgId: subOrgId ? subOrgId : null,
      },
    });
    assignedKeys = await db.activationKeys.count({
      where: {
        status: "assigned",
        org_id: organization,
        subOrgId: subOrgId ? subOrgId : null
      },
    });
    unassignedKeys = await db.activationKeys.count({
      where: {
        status: "unassigned",
        org_id: organization,
        subOrgId: subOrgId ? subOrgId : null
      },
    });
    activatedKeys = await db.activationKeys.count({
      where: {
        status: "activated",
        org_id: organization,
        subOrgId: subOrgId ? subOrgId : null
      },
    });

    let fileRes = await db.csvUpload.findAll({
      where: {
        is_deleted: 0,
        data_type: "user_uploaded",
        org_id: organization,
          subOrgId: subOrgId ? subOrgId : null
      },
    });

    const orgRes = await db.Organization.findOne({
      where: {
          id: organization
      }
  })
    return res.json(
      successRespSync({
        msg: "Dashboard data successfully fetched",
        data: {
          generatedActivationKeys,
          assignedKeys,
          unassignedKeys,
          activatedKeys,
          uploadedFiles: fileRes.length,
          noOfkeysAllowed: orgRes.activationKeysAllowed
        },
      })
    );
  } catch (err) {
    return res.json(
      await errorResp({
        code: err?.original?.code || 500,
        msg:
          err?.original?.code == "ER_DUP_ENTRY"
            ? error.ALREADY_EXISTS
            : error.SERVER,
      })
    );
  }
});
router.get(
  "/activationKeys/:generatedId",
  auth,
  // generateKeyValidation(),
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      let { organization, subOrgId } = req.user
      let { page, limit, searchPhrase, orderField, order, filterParam } =
        req.query;

      let listRes = [],
        activationKeysFilters = {},
        generatedIdArr = [];

      if (orderField && order) {
        activationKeysFilters.order = [[orderField, order]];
      } else {
        activationKeysFilters.order = [["updatedAt", "DESC"]];
      }
      if (searchPhrase) {
        activationKeysFilters.where = {
          [Op.or]: [
            { license_key: { [Op.like]: `%${searchPhrase}%` } },
            { user_email: { [Op.like]: `%${searchPhrase}%` } },
            { status: { [Op.like]: `%${searchPhrase}%` } },
            sequelize.where(sequelize.col("user_assoc.firstName"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
            sequelize.where(sequelize.col("user_assoc.lastName"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
            sequelize.where(sequelize.col("membership_assoc.membership_type"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
          ],
        };
      }
      if (filterParam) {
        if (!activationKeysFilters.where) {
          activationKeysFilters.where = {};
        }
        filterParam = JSON.parse(filterParam);

        if (filterParam.hasOwnProperty("sales_manager")) {
          let generatedKeyRes = await db.generatedKeys.findAll({
            where: { sales_manager: filterParam.sales_manager },
          });
          generatedIdArr = generatedKeyRes.map((item) => item.id);
        }
        for (let key in filterParam) {
          if (key == "sales_manager") {
            activationKeysFilters.where["generated_key_id"] = generatedIdArr;
          } else {
            activationKeysFilters.where[key] = filterParam[key];
          }
        }
      }

      if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
        limit = parseInt(limit);
        activationKeysFilters.offset = (page - 1) * limit;
        activationKeysFilters.limit = limit;
      }
      if (!activationKeysFilters.where) {
        activationKeysFilters.where = {};
      }
      activationKeysFilters.where.generated_key_id = req.params.generatedId;
      listRes = await db.activationKeys.findAndCountAll({
        include: [
          {
            model: db.user,
            as: "user_assoc",
            // where: usersFilters?.where
          },
          {
            model: db.Membership,
            as: "membership_assoc",
          },
        ],
        where: { ...activationKeysFilters?.where, is_deleted: 0, org_id: organization, subOrgId: subOrgId ? subOrgId : null },
        limit: activationKeysFilters.limit,
        offset: activationKeysFilters.offset,
        order: activationKeysFilters?.order,
      });
      if (req.headers.lang && req.headers.lang != "en") {
        listRes = req.translateFunction(listRes, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }
      return res.json(
        successRespSync({
          msg: "Activation keys fetched successfully",
          data: {
            listRes,
          },
        })
      );
    } catch (err) {
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg:
            err?.original?.code == "ER_DUP_ENTRY"
              ? error.ALREADY_EXISTS
              : error.SERVER,
        })
      );
    }
  }
);
router.post(
  "/generatedKeys/sendMail",
  validationErrorHandler,
  async (req, res) => {
    // get job progress using :jobId
    try {
      const { email, generatedKeyId, csvUrl } = req.body;
      let uploadRes;

      if (!csvUrl && generatedKeyId) {
        //create csv
        let result;

        result = await db.activationKeys.findAll({
          where: { generated_key_id: generatedKeyId },
        });
        result = result.map((r) => {
          let tmpObj = {};

          (tmpObj.activation_key_id = r.dataValues.id),
            (tmpObj.license_key = r.dataValues.license_key),
            (tmpObj.first_name = "");
          tmpObj.last_name = "";
          tmpObj.email = "";
          tmpObj.phone_no = "";

          return tmpObj;
        });

        if (!result.length) {
          result = [
            {
              activation_key_id: "",
              license_key: "",
              first_name: "",
              last_name: "",
              email: "",
              phone_no: "",
            },
          ];
        }

        const uploadStream = ({ Bucket, Key }) => {
          const pass = new stream.PassThrough();
          return {
            writeStream: pass,
            promise: s3
              .upload({ Bucket, Key, ContentType: "text/csv", Body: pass })
              .promise(),
          };
        };
        let csvSheet = xlsx.utils.json_to_sheet(result);
        let csvStream = xlsx.stream.to_csv(csvSheet);

        const { writeStream, promise } = uploadStream({
          Bucket: process.env.AWS_PUBLIC_BUCKET || "dimitra-public-images",
          Key: `key_list_${new Date().getTime()}.csv`,
        });

        csvStream.pipe(writeStream);

        uploadRes = await promise;
      }
      const data = {
        csvUrl: csvUrl?csvUrl:uploadRes.Location,
        lang:req.headers.lang || 'en'
      };

      const title = "License key csv download";
      const template = await ejs.renderFile(
        path.join(rootPath, "views", "users/share-keys.html"),
        data
      );
      await mailer.sendMail(email, title, template);
      return res.json(
        successRespSync({
          msg: "Mail sent successfully",
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

router.get(
  "/generatedKeys",
  auth,
  // generateKeyValidation(),
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, searchPhrase, orderField, order } = req.query;
      const { organization } = req.user;
      let listRes = [],
        activationKeysFilters = {};

      if (orderField && order) {
        activationKeysFilters.order = [[orderField, order]];
      } else {
        activationKeysFilters.order = [["createdAt", "DESC"]];
      }
      if (searchPhrase) {
        activationKeysFilters.where = {
          [Op.or]: [
            sequelize.where(sequelize.col("generated_assoc.firstName"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
            sequelize.where(sequelize.col("generated_assoc.lastName"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
            sequelize.where(sequelize.col("membership_assoc.membership_type"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
            sequelize.where(sequelize.col("role_assoc.name"), {
              [Op.like]: `%${searchPhrase}%`,
            }),
          ],
        };
      }
      if (notEmpty(page) && notEmpty(limit) && !searchPhrase) {
        limit = parseInt(limit);
        activationKeysFilters.offset = (page - 1) * limit;
        activationKeysFilters.limit = limit;
      }

      listRes = await db.generatedKeys.findAndCountAll({
        include: [
          {
            model: db.user,
            as: "generated_assoc",
            // where: usersFilters?.where
          },
          {
            model: db.user,
            as: "sales_manager_assoc",
            // where: usersFilters?.where
          },
          {
            model: db.Roles,
            as: "role_assoc",
            // where: usersFilters?.where
          },
          {
            model: db.Membership,
            as: "membership_assoc",
          },
        ],
        where: {
          ...activationKeysFilters?.where,
          is_deleted: 0,
          org_id: organization,
          subOrgId: req.user.subOrgId ? req.user.subOrgId : null,
        },
        limit: activationKeysFilters.limit,
        offset: activationKeysFilters.offset,
        order: activationKeysFilters?.order,
      });
      if (req.headers.lang && req.headers.lang != "en") {
        listRes = req.translateFunction(listRes, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }
      return res.json(
        successRespSync({
          msg: "Generated keys list fetched successfully",
          data: {
            listRes,
          },
        })
      );
    } catch (err) {
      console.log("err =>", JSON.stringify(err));
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg:
            err?.original?.code == "ER_DUP_ENTRY"
              ? error.ALREADY_EXISTS
              : error.SERVER,
        })
      );
    }
  }
);

router.get(
  "/activationKeys/all/:generatedId",
  validationErrorHandler,
  async (req, res) => {
    // get job progress using :jobId
    try {
      const result = await db.activationKeys.findAll({
        where: { generated_key_id: req.params.generatedId },
      });
      return res.json(
        successRespSync({
          msg: "Activation keys fetched successfully",
          data: result,
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

router.get("/salesManager", validationErrorHandler, async (req, res) => {
  // get job progress using :jobId
  try {
    const result = await db.UserRoles.findAll({
      where: { role_id: "sales_manager" },
      include: [
        {
          model: db.user,
          as: "user_role",
        },
      ],
    });
    return res.json(
      successRespSync({
        msg: "Sales manager fetched successfully",
        data: result,
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
});

router.get("/status/all", validationErrorHandler, async (req, res) => {
  // get job progress using :jobId
  try {
    return res.json(
      successRespSync({
        msg: "Sales manager fetched successfully",
        data: ["assigned", "unassigned", "activated"],
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
});

router.post(
  "/generatedKeys/assign",
  validationErrorHandler,
  async (req, res) => {
    // get job progress using :jobId
    try {
      const { generatedKeyId, salesManagerId } = req.body;
      await db.generatedKeys.update(
        { sales_manager: salesManagerId },
        { where: { id: generatedKeyId } }
      );
      return res.json(
        successRespSync({
          msg: "Assigned successfully",
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

router.put("/activation-keys/assign", async (req, res) => {
  try {
    const { licenseKey, userId } = req.body;
    let org_id = req.user.organization;
    const activationKey = await db.activationKeys.findOne({
      where: { license_key: licenseKey },
    });
    activationKey.user_id = userId;
    activationKey.status = "assigned";

    await activationKey.save();
    await db.UserActivationKeyRequest.update(
      { activationKeyId: activationKey.id },
      { where: { userId: userId } }
    );

    return res.json(
      successRespSync({
        msg: "Activation key assigned successfully",
      })
    );
  } catch (err) {
    console.log(err);
    return res.json(
      await errorResp({
        code: err?.original?.code || 500,
        msg: err?.msg || error.SERVER,
      })
    );
  }
});

router.get(
  "/:jobId",
  validationErrorHandler,

  async (req, res) => {
    try {
      // get job progress using :jobId
      const job = await db.generatedKeys.findOne({
        where: { job_id: req.params.jobId },
      });
      return res.json(
        successRespSync({
          data: job,
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

module.exports = {
  activationQueueRouter: router,
  queueActivationKeyGenerationInternally
};
