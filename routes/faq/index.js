const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { langObj } = require("../../helpers/consts");
const { error, success } = require(rootPath + "/helpers/language");
const {
  faqTopicCreateValidation,
  faqTopicEditValidation,
  createFaqValidation,
  deleteMediaValidation,
  deleteFaqValidation,
  updateFaqValidation,
  faqTopicDeleteValidation,
  faqGetAllValidation,
} = require("../../helpers/validation");
const validationErrorHandler = require("../../middleware/validation_error_handler");
const { deleteFileS3 } = require("../../helpers/aws_s3");
const { exceptions } = require("winston");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const fileUpload = require(rootPath + "/middleware/file_upload");
const db = require(rootPath + "/models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

/**
 * @swagger
 * /faq:
 *   get:
 *     description: List all the FAQ
 *     tags: [FAQ]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                    - id: my_profile
 *                      name: My Profile
 *                      qas: ''
 *                    - id: my_farm
 *                      name: My Farm
 *                      qas: ''
 *                    - id: my_crops
 *                      name: My Crops
 *                      qas: ''
 *                    - id: my_livestock
 *                      name: My Livestock
 *                      qas: ''
 *                    - id: technical_issues
 *                      name: Technical Issues
 *                      qas: ''
 */
router.get(
  "/",
  auth,
  faqGetAllValidation(),
  translation,
  async function (req, res) {
    try {
      let faq = [],
        faqRes = [],
        query = {};
      // query = {raw: true},
      lang = req.headers.lang || "en";
      let attributes = ["name", "displayName", "isDefault", "en"];
      const org_id = req.user.organization;
      if (lang && lang !== "en") {
        attributes.push(lang);
      }
      query.attributes = attributes;

      query.where = {
        display: true,
        [Op.or]: [{ org_id }, { org_id: process.env.INTERNAL_ADMIN_ID || 8 }],
      };
      query.include = [
        {
          attributes,
          model: db.Faq,
          as: "childTopics",
          required: false,
          where: {
            display: true,
          },
        },
      ];
      faqRes = await db.Faq.findAll(query);
      faqRes.forEach((f) => {
        let name = f.displayName;
        if (
          typeof globalTranslationCache[
            f.displayName.toLowerCase().replace(/\s/g, "").trim()
          ] != "undefined"
        ) {
          name =
            globalTranslationCache[
              f.displayName.toLowerCase().replace(/\s/g, "").trim()
            ][langObj[lang]] || f.displayName;
        }
        let set = {
          id: f.name,
          name,
        };
        let tmpStr = [];
        let langValue = f.get(lang);
        if (typeof langValue == "string") {
          let consumableStr = langValue.trim();
            tmpStr = consumableStr.substring(1, consumableStr.length - 1);
        }
        let filteredJsonArr = [];
        if (tmpStr.length) {
          filteredJsonArr = filterStringifiedJson(tmpStr, req);
        } else {
          console.log("Fucking before", tmpStr);
          if (typeof f.en == "string") {
            tmpStr = f.en.substring(1, f.en.length - 1);
          }
          console.log("Fucking after", tmpStr);

          if (tmpStr.length) {
            filteredJsonArr = filterStringifiedJson(tmpStr, req);
          }
        }
        set.qas = filteredJsonArr;
        let childArray = [];
        if (f.childTopics.length) {
          f.childTopics.forEach((ch) => {
            let childObj = {};
            let childTopicName = ch.displayName;
            if (
              typeof globalTranslationCache[
                ch.displayName.toLowerCase().replace(/\s/g, "").trim()
              ] != "undefined"
            ) {
              childTopicName =
                globalTranslationCache[
                  ch.displayName.toLowerCase().replace(/\s/g, "").trim()
                ][langObj[lang]] || ch.displayName;
            }
            childObj.id = ch.name;
            childObj.name = childTopicName;
            let childFilteredJsonArr = [];
            if (ch[lang]) {
              let childTmpStr = [];
              if (typeof ch[lang] == "string") {
                childTmpStr = ch[lang].substring(1, ch[lang].length - 1);
              }
              if (childTmpStr.length) {
                childFilteredJsonArr = filterStringifiedJson(childTmpStr, req);
              } else {
                childTmpStr = ch.en.substring(1, ch.en.length - 1);
                if (childTmpStr.length) {
                  childFilteredJsonArr = filterStringifiedJson(
                    childTmpStr,
                    req
                  );
                }
              }
            }
            childObj.qas = childFilteredJsonArr;
            childArray.push(childObj);
          });
        }
        set.childFaqs = childArray;
        set.isDefault = f.isDefault;
        faq.push(set);
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: faq,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

function filterStringifiedJson(tmpStr, req) {
  // get user roles from req.user.userRoles
  let userRolesStr = JSON.stringify(req.user.userRoles).toLowerCase();
  let isAdminSide = userRolesStr.includes("admin");
  const jsonArr = isJson(tmpStr) ? JSON.parse(tmpStr) : tmpStr;
  const filteredJsonArr = jsonArr.filter((obj) => {
    // admin side faq listing
    if (isAdminSide) {
      if (!obj.id) {
        return true;
      } else if (obj?.org == req.user.organization) {
        return true;
      } else {
        return false;
      }
    }

    //client side faq listing
    if (obj.hasOwnProperty("display")) {
      if (obj.display == "true") {
        return true;
      }
    } else {
      return true;
    }
  });
  return filteredJsonArr;
}

/**
 * @swagger
 * /faq/{sectionId}:
 *   get:
 *     description: List all the FAQ
 *     tags: [FAQ]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: sectionId
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'my_farm'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                    - id: my_farm
 *                      name: My Farm
 *                      qas: ''
 */
router.get("/:sectionId", auth, translation, async function (req, res) {
  try {
    let faq = [],
      faqRes = [],
      query = {},
      lang = req.headers.lang || "en";
    query.attributes = ["name", "displayName"];
    query.raw = true;
    query.where = {
      name: req.params.sectionId,
    };
    if (lang) {
      query.attributes.push(lang);
    }
    faqRes = await db.Faq.findAll(query);
    if (!faqRes.length) {
      return res
        .status(error.code.SERVER_ERROR)
        .json(await errorResp({ msg: "Data Not Found", code: 500 }));
    }
    faqRes.forEach((f) => {
      let tmpStr;
      if (typeof f[lang] == "string") {
        tmpStr = f[lang].substring(1, f[lang].length - 1);
      } else {
        tmpStr = "";
      }
      let name = f.displayName;
      if (
        typeof globalTranslationCache[f.displayName.toLowerCase()] !=
        "undefined"
      ) {
        name =
          globalTranslationCache[f.displayName.toLowerCase()][langObj[lang]] ||
          f.displayName;
      }

      faq.push({
        id: f.name,
        name,
        qas: isJson(tmpStr) ? JSON.parse(tmpStr) : tmpStr,
      });
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: faq,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

// Get TOPICS
router.get(
  "/get/topics",
  faqGetAllValidation(),
  auth,
  translation,
  async function (req, res) {
    try {
      const lang = req.headers.lang;
      const org_id = req.user.organization;
      const attributes = ["id", "displayName", "name", "display", "isDefault"];
      const getFaqTopics = await db.Faq.findAll({
        attributes,
        where: {
          parent_id: 0,
          org_id,
        },
        include: [
          {
            attributes,
            model: db.Faq,
            as: "childTopics",
            required: false,
          },
        ],
      });

      let getTranslatedFaq = getFaqTopics.map((topicObject) => {
        return {
          id: topicObject.id,
          displayName: topicObject.displayName,
          name: topicObject.name,
          display: topicObject.display,
          childTopics: topicObject.childTopics,
          isDefault: topicObject.isDefault,
        };
      });

      if (
        req.headers.lang &&
        req.headers.lang != "en" &&
        getTranslatedFaq.length
      ) {
        getTranslatedFaq = req.translateFunction(
          getTranslatedFaq,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
          }
        );
      }

      return res.json(
        successRespSync({
          msg: "FAQs list",
          data: getTranslatedFaq,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

// create TOPIC
/**
 * @swagger
 * /faq/topic:
 *   post:
 *     description: Add Topic
 *     tags: [FAQ]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example: { "displayName": "test topic 1", "parentId": 105, "display": false}
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {"id": 17, "parent_id": "105", "name": "test_topic_2", "displayName": "test topic 2", "display": false, "updatedAt": "2022-07-14T06:32:59.416Z", "createdAt": "2022-07-14T06:32:59.416Z"}
 *
 */
router.post(
  "/topic",
  auth,
  faqTopicCreateValidation(),
  validationErrorHandler,
  translation,
  async function (req, res) {
    try {
      const { parentId, displayName, display } = req.body;
      const org_id = req.user.organization;
      const topicCheck = await db.Faq.count({
        where: { displayName, parent_id: parentId, org_id },
      });
      console.log(topicCheck);
      if (topicCheck == 0) {
        const name = displayName.replace(/ /g, "_");
        const topic = await db.Faq.create({
          parent_id: parentId,
          name,
          displayName,
          display,
          org_id,
          isDefault: false,
        });
        return res.json(
          successRespSync({
            msg: "Topic created",
            data: topic,
          })
        );
      } else {
        res
          .status(error.code.SERVER_ERROR)
          .json(
            await errorResp({
              msg: "Topic already exist",
              code: error.code.SERVER_ERROR,
            })
          );
      }
    } catch (error) {
      console.log("error is ====> ", error);
      return serverError(res, error);
    }
  }
);

// edit TOPIC
router.put(
  "/topic/:id",
  auth,
  faqTopicEditValidation(),
  validationErrorHandler,
  translation,
  async function (req, res) {
    try {
      const { id } = req.params;
      const { displayName, parentId, display } = req.body;
      const chkId = await db.Faq.findOne({
        where: {
          id,
        },
      });
      if (!chkId) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: "Data Not Found", code: 500 }));
      }
      const topicCheck = await db.Faq.count({ where: { displayName } });
      let set = {
        displayName,
      };
      if (display == true || display == false) {
        set.display = display;
      }
      if (parentId) {
        set.parent_id = parentId;
      }
      console.log(set);
      const updateTopic = await db.Faq.update(set, {
        where: {
          id,
        },
      });
      if (updateTopic) {
        if (parentId) {
          const faqChlidTopics = await db.Faq.findAll({
            attributes: ["id"],
            where: {
              parent_id: id,
            },
            raw: true,
          });
          let faqChlidTopicIds = [];
          if (faqChlidTopics) {
            faqChlidTopicIds = faqChlidTopics.map((obj) => obj.id);
          }
          if (faqChlidTopicIds) {
            const updateChildTopicsParent = await db.Faq.update(
              { parent_id: parentId },
              {
                where: {
                  id: faqChlidTopicIds,
                },
              }
            );
          }
        }
      }
      return res.json(
        successRespSync({
          msg: "topic updated",
          data: req.body,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

// delete TOPIC
router.delete(
  "/deleteTopic",
  auth,
  faqTopicDeleteValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const id = req.body.id;
      const topic = await db.Faq.findOne({
        where: {
          id,
        },
        include: {
          attributes: ["id"],
          model: db.Faq,
          as: "childTopics",
          required: false,
          raw: true,
        },
      });
      if (!topic) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: "Data Not Found", code: 500 }));
      }
      let deletingTopicIds = [parseInt(id)];
      if (topic.childTopics.length) {
        const getAllChildTopicIds = topic.childTopics.map((chTopics) => {
          return chTopics.dataValues.id;
        });
        deletingTopicIds = deletingTopicIds.concat(getAllChildTopicIds);
      }
      await db.Faq.destroy({
        where: {
          id: deletingTopicIds,
        },
      });
      return res.json(
        successRespSync({
          msg: "TOPIC deleted",
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

// create FAQ
router.post(
  "/",
  auth,
  fileUpload({
    acl: "public-read",
    bucket: process.env.AWS_TICKET_BUCKET,
    whiteListMimeTypes: ["image/png", "image/jpeg", "image/jpg", "video/mp4"],
  }),
  createFaqValidation(),
  validationErrorHandler,
  translation,
  async function (req, res) {
    try {
      const { name, question, answer, display, isDefault } = req.body;
      const org_id = req.user.organization;
      let query = {};
      let lang = req.headers.lang || "en";
      query.attributes = [];
      query.raw = true;
      query.where = {
        name,
        org_id,
      };
      if (lang) {
        query.attributes.push(lang);
      }
      const faqq = await db.Faq.findOne(query);
      if (!faqq) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: "Data Not Found", code: 500 }));
      }
      let obj = {};
      let faqArr = [];
      let faqValue = faqq[lang];
      if (typeof faqq[lang] == "string") {
        // for existing faq data
        faqValue = JSON.parse(faqq[lang].substring(1, faqq[lang].length - 1));
        faqArr = faqValue;
        obj.id = uuidv4();
      }
      let faqMediaArr = [];
      req.files.forEach((file) => {
        let id = uuidv4();
        faqMediaArr.push({
          id,
          fileUrl: file.location,
          s3Key: file.key,
        });
      });
      obj.media = faqMediaArr;
      obj.question = question;
      obj.answer = answer;
      obj.display = display;
      obj.isDefault = false;
      obj.id = uuidv4();
      obj.org = org_id;
      faqArr.push(obj);
      const faq = await db.Faq.update(
        {
          [lang]: "`" + JSON.stringify(faqArr) + "`",
        },
        {
          where: { name, org_id },
        }
      );
      return res.json(
        successRespSync({
          msg: "Faq Added",
        })
      );
    } catch (error) {
      console.log("error is ====> ", error);
      return serverError(res, error);
    }
  }
);

// edit FAQ
router.put(
  "/:topicName",
  auth,
  fileUpload({
    acl: "public-read",
    bucket: process.env.AWS_TICKET_BUCKET,
    whiteListMimeTypes: ["image/png", "image/jpeg", "image/jpg", "video/mp4"],
  }),
  updateFaqValidation(),
  validationErrorHandler,
  translation,
  async function (req, res) {
    try {
      let { name, id, question, answer, display } = req.body;
      const { topicName } = req.params;
      let query = {};
      let lang = req.headers.lang;
      query.attributes = [];
      query.raw = true;
      query.where = {
        name: topicName,
      };
      if (lang) {
        query.attributes.push(lang);
      }
      let faqq = await db.Faq.findOne(query);
      if (!faqq) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: "Data Not Found", code: 500 }));
      }
      let faqArr;
      faqArr = JSON.parse(faqq[lang].substring(1, faqq[lang].length - 1));
      const indexOfObject = faqArr.findIndex((object) => {
        return object.id == id;
      });
      if (indexOfObject == -1) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: "Data Not Found", code: 500 }));
      }
      let data = faqArr;
      let faqMediaArr = faqArr[indexOfObject].media;
      req.files.forEach((file) => {
        let id = uuidv4();
        faqMediaArr.push({
          id,
          fileUrl: file.location,
          s3Key: file.key,
        });
      });
      if (typeof question == "undefined") {
        question = data[indexOfObject].question;
      }
      data[indexOfObject].question = question || data[indexOfObject].question;
      data[indexOfObject].answer = answer || data[indexOfObject].answer;
      data[indexOfObject].display = display || data[indexOfObject].display;
      if (req.files.length != 0) {
        data[indexOfObject].media = faqMediaArr;
      }
      if (name != topicName) {
        query.where.name = name;
        let faqToChange = await db.Faq.findOne(query);
        if (!faqToChange) {
          return res
            .status(error.code.SERVER_ERROR)
            .json(
              await errorResp({
                msg: "selected topic doesn't exists",
                code: 500,
              })
            );
        }
        let faqToChangeArr = JSON.parse(
          faqToChange[lang].substring(1, faqToChange[lang].length - 1)
        );
        faqToChangeArr.push(data[indexOfObject]);
        data.splice(indexOfObject, 1);
        await db.Faq.update(
          {
            [lang]: "`" + JSON.stringify(faqToChangeArr) + "`",
          },
          {
            where: { name },
          }
        );
      }
      await db.Faq.update(
        {
          [lang]: "`" + JSON.stringify(data) + "`",
        },
        {
          where: { name: topicName },
        }
      );
      return res.json(
        successRespSync({
          msg: "Faq updated",
        })
      );
    } catch (error) {
      console.log(error);
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /faq/deleteFaq:
 *   delete:
 *     summary: Delete FAQ
 *     description: Delete FAQ
 *     tags: [FAQ]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *       - in: header
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *             example: { "name": "test topic 1", "id": '89c13d26-6607-4e0f-98ee-1bfa2997cf68'}
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: FAQ has been deleted successfully.
 *                   data: {}
 *        '500':
 *           description: Data Not Found to delete
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
 *                 example:
 *                    {"success": false,"code": 500,"message": "Data Not Found to delete"}
 *
 */
router.delete(
  "/deleteFaq",
  auth,
  deleteFaqValidation(),
  validationErrorHandler,
  translation,
  async function (req, res) {
    try {
      const { name, id } = req.body;
      let query = {};
      let lang = req.headers.lang;
      query.attributes = ["isDefault"];
      query.raw = true;
      query.where = {
        name: req.body.name,
      };
      if (lang) {
        query.attributes.push(lang);
      }
      const faqq = await db.Faq.findOne(query);
      var faqArr;
      if (faqq.isDefault === 1) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(
            await errorResp({ msg: "You cannot Delete Default FAQ", code: 500 })
          );
      }
      if (faqq[lang] == null) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(
            await errorResp({ msg: "Data Not Found to delete", code: 500 })
          );
      }
      faqArr = JSON.parse(faqq[lang].substring(1, faqq[lang].length - 1));

      if (faqArr) {
        const indexOfObject = faqArr.findIndex((object) => {
          return object.id == id;
        });
        if (indexOfObject < 0) {
          return res
            .status(error.code.SERVER_ERROR)
            .json(
              await errorResp({ msg: "Data Not Found to delete", code: 500 })
            );
        }
        var mediaObject = faqArr[indexOfObject].media;
        if (mediaObject) {
          mediaObject.forEach((file) => {
            const params = {
              Key: file.s3Key,
              Bucket: process.env.AWS_TICKET_BUCKET,
            };
            const is_deleted = deleteFileS3(params);
          });
        }
        faqArr.splice(indexOfObject, 1);
        const faq = await db.Faq.update(
          {
            [lang]: "`" + JSON.stringify(faqArr) + "`",
          },
          {
            where: { name },
          }
        );
      }

      return res.json(
        successRespSync({
          msg: "Faq Removed",
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

// delete media
router.delete(
  "/deleteImage",
  auth,
  deleteMediaValidation(),
  validationErrorHandler,
  translation,
  async function (req, res) {
    try {
      const { name, id, mediaId } = req.body;
      let query = {};
      let lang = req.headers.lang;
      query.attributes = [];
      query.raw = true;
      query.where = {
        name: req.body.name,
      };
      if (lang) {
        query.attributes.push(lang);
      }
      const faqq = await db.Faq.findOne(query);
      var faqArr;
      faqArr = JSON.parse(faqq[lang].substring(1, faqq[lang].length - 1));
      const indexOfObject = faqArr.findIndex((object) => {
        return object.id == id;
      });
      var faqArray = faqArr[indexOfObject].media;
      const indexOfObject1 = faqArray.findIndex((object) => {
        return object.id == mediaId;
      });
      if (indexOfObject1 < 0) {
        return res
          .status(error.code.SERVER_ERROR)
          .json(
            await errorResp({ msg: "File Not Found to delete", code: 500 })
          );
      }
      faqArray.splice(indexOfObject1, 1);
      const faq = await db.Faq.update(
        {
          en: "`" + JSON.stringify(faqArr) + "`",
        },
        {
          where: { name },
        }
      );
      return res.json(
        successRespSync({
          msg: "Media Removed",
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

function isJson(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
module.exports = router;
