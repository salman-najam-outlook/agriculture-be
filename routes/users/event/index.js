const express = require('express');
const _ = require('lodash');
const shortid = require('short-uuid');
const router = express.Router();
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error: errorLang } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorUserEvent = require(rootPath +
  '/helpers/validators/userEvents/index.js');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const { getRecurringDates } = require(rootPath + '/helpers/datetime');
const { Op, where } = require('sequelize');
const { error } = require('winston');

router.use('/reminder', require('./reminder'));
router.use('/calendar', require('./calendar'));

/**
 * @swagger
 * /user/event:
 *   post:
 *     summary: Create a new event/activity
 *     description: Create a new event/activity
 *     tags: [Fedepanela Calendar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                    type: string
 *                moduleId:
 *                    type: string
 *                subModuleId:
 *                    type: string
 *                cropTypeId:
 *                    type: integer
 *                description:
 *                    type: string
 *                colorPreference:
 *                    type: string
 *                addToGCal:
 *                    type: boolean
 *                repeat:
 *                    type: string
 *                    enum: [no_repeat,every_day,every_week,every_month,every_year]
 *                startDateTime:
 *                    type: string
 *                endDateTime:
 *                    type: string
 *                allDay:
 *                    type: boolean
 *                cropVarieties:
 *                    type: array
 *                    items:
 *                        type: integer
 *                reminders:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            num:
 *                                type: string
 *                            period:
 *                                type: string
 *                                enum: [months,days]
 *              required:
 *                - organizationId
 *                - membershipId
 *            example: { "title": "some title 5", "moduleId": "my_crops", "subModuleId": "soilpreparation", "cropTypeId": "1", "cropVarieties": [ 2 ], "description": "some description", "colorPreference": "9acd32", "addToGCal": 1, "reminders": [ { "num": "2", "period": "days" }, { "num": "3", "period": "days" }, { "num": "4", "period": "days" } ], "repeat": "every_year", "eventReminders": [{ "timeBefore": 3, "timeBeforeUnit": "Days" }], "startDateTime": "2022-01-01 12:12:12", "endDateTime": "2022-01-02 12:12:12", "allDay": 0 }
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
 *                 example: { "success": true, "code": 200, "message": "saved successfully.", "data": {} }
 */
router.post(
  '/',
  auth,
  validatorUserEvent.saveEvent(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const tz = req.header('tz') || moment.tz.guess(true);
      let { startDateTime, endDateTime } = req.body;

      // convert datetime into UTC
      req.body.startDateTime = moment
        .tz(startDateTime, 'YYYY-MM-DD HH:mm:ss', true, tz)
        .utc();
      req.body.endDateTime = moment
        .tz(endDateTime, 'YYYY-MM-DD HH:mm:ss', true, tz)
        .utc();

      var transaction = await db.sequelize.transaction();

      // order of calling is important
      const event = await saveEvent(req, transaction);
      await Promise.all([
        saveAndMapCropVarieties(req, transaction),
        saveCalanderEvents(req, transaction),
        saveEventReminders(req, transaction),
      ]);

      await transaction.commit();
      event.startDateTime =
        event.startDateTime &&
        moment(event.startDateTime)
          .tz('UTC', true)
          .tz(tz)
          .format('YYYY-MM-DD HH:mm:ss');
      event.endDateTime =
        event.endDateTime &&
        moment(event.endDateTime)
          .tz('UTC', true)
          .tz(tz)
          .format('YYYY-MM-DD HH:mm:ss');

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: event,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * @swagger
 * /user/event/{id}:
 *   put:
 *     summary: Update existing event/activity
 *     description: Update existing event/activity
 *     tags: [Fedepanela Calendar]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *          type: integer
 *          required: true
 *          description: event id
 *        - in: headers
 *          name: oauth-token
 *          schema:
 *            type: string
 *          description: authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                    type: string
 *                moduleId:
 *                    type: string
 *                subModuleId:
 *                    type: string
 *                cropTypeId:
 *                    type: integer
 *                description:
 *                    type: string
 *                colorPreference:
 *                    type: string
 *                addToGCal:
 *                    type: boolean
 *                repeat:
 *                    type: string
 *                    enum: [no_repeat,every_day,every_week,every_month,every_year]
 *                startDateTime:
 *                    type: string
 *                endDateTime:
 *                    type: string
 *                allDay:
 *                    type: boolean
 *                cropVarieties:
 *                    type: array
 *                    items:
 *                        type: integer
 *                reminders:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            num:
 *                                type: string
 *                            period:
 *                                type: string
 *                                enum: [months,days]
 *              required:
 *                - organizationId
 *                - membershipId
 *            example: { "title": "some title 5", "moduleId": "my_crops", "subModuleId": "soilpreparation", "cropTypeId": "1", "cropVarieties": [ 2 ], "description": "some description", "colorPreference": "9acd32", "addToGCal": 1, "reminders": [ { "num": "2", "period": "days" }, { "num": "3", "period": "days" }, { "num": "4", "period": "days" } ], "repeat": "every_year", "eventReminders": [{ "timeBefore": 3, "timeBeforeUnit": "Days" }], "startDateTime": "2022-01-01 12:12:12", "endDateTime": "2022-01-02 12:12:12", "allDay": 0 }
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
 *                 example: { "success": true, "code": 200, "message": "Updated successfully.", "data": {} }
 */

router.put(
  '/:id',
  auth,
  validatorUserEvent.saveEvent(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const tz = req.header('tz') || moment.tz.guess(true);
      let {id} = req.params
      let { startDateTime, endDateTime } = req.body;

      // convert datetime into UTC
      req.body.startDateTime = moment
        .tz(startDateTime, 'YYYY-MM-DD HH:mm:ss', true, tz)
        .utc();
      req.body.endDateTime = moment
        .tz(endDateTime, 'YYYY-MM-DD HH:mm:ss', true, tz)
        .utc();

      var transaction = await db.sequelize.transaction();

      // order of calling is important
     await updateEvent(req, transaction);
      await Promise.all([
        updateCropVarieties(req, transaction),
        updateCalendarEvents(req, transaction),
        updateEventReminders(req, transaction),
      ]);

      await transaction.commit();
      let event =   await db.Event.findOne({where: {id}, include: [
        {
          required: false,
          model: db.EventReminder,
          as: 'eventReminders',
          attributes: {
            exclude: ['eventId', 'createdAt', 'updatedAt']
          },
        },
      ] })
      event.startDateTime =
        event.startDateTime &&
        moment(event.startDateTime)
          .tz('UTC', true)
          .tz(tz)
          .format('YYYY-MM-DD HH:mm:ss');
      event.endDateTime =
        event.endDateTime &&
        moment(event.endDateTime)
          .tz('UTC', true)
          .tz(tz)
          .format('YYYY-MM-DD HH:mm:ss');

      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: event,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/event:
 *   get:
 *     summary: fetch user's saved events
 *     description: fetch user's saved events as per the time period range
 *     tags: [Fedepanela Calendar]
 *     parameters:
 *        - in: query
 *          name: sDate
 *          schema:
 *            type: string
 *          description: format YYYY-MM-DD HH:mm:ss
 *        - in: query
 *          name: eDate
 *          schema:
 *            type: string
 *          description: format YYYY-MM-DD HH:mm:ss
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "eventId": 2, "startDateTime": "2022-01-01 12:12:12", "endDateTime": "2022-01-02 12:12:12", "eventReminders": [{ "id": 1, "timeBefore": 3, "timeBeforeUnit": "Days" }], "reminders": [ { "id": "prmB4WKL6Yw3Myptfsf8jV", "date": "2021-12-30 12:12:12", "status": "open" }, { "id": "s8mFXgH1bVYGcZ93F63dVn", "date": "2021-12-29 12:12:12", "status": "open" }, { "id": "6hwEj7yRhX8vL133iufFGr", "date": "2021-12-28 12:12:12", "status": "open" } ], "eventDetail": { "id": 2, "title": "some title 5", "moduleId": "my_crops", "subModuleId": "soilpreparation", "cropTypeId": 1, "description": "some description", "colorPreference": "9acd32", "addToGCal": true, "reminder": null, "repeat": null, "startDateTime": "2022-01-01 12:12:12", "endDateTime": "2022-01-02 12:12:12", "allDay": false, "moduleRecommendation": { "moduleId": "soilpreparation", "attributeNum": "m1ma1", "cropModuleAttrId": 1, "cropModuleId": 98 } } } ] }
 */
router.get(
  '/',
  auth,
  validatorUserEvent.getEvent(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const tz = req.header('tz') || moment.tz.guess(true);
      let { search, sDate, eDate, sortBy } = req.query;
      const { id: userId } = req.user;
      const where = {
        '$eventDetail.userId$': userId,
        deletedAt: null
      };

      let startDate, endDate;
      eDate = `${eDate} 23:59:59`; // add 23:59:59 to the end date to include the whole day
      startDate = moment
        .tz(sDate, 'YYYY-MM-DD', true, "+00:00") // tz is UTC static because we are already saving event dates in UTC
        .utc()
        .toISOString();
      endDate = moment
        .tz(eDate, 'YYYY-MM-DD HH:mm:ss', true, "+00:00") // tz is UTC static because we are already saving event dates in UTC
        .utc()
        .toISOString();

      where.dailyDate = { [db.Sequelize.Op.between]: [startDate, endDate] };

      // search query
      if (!_.isEmpty(search)) {
        const fields = ['$`eventDetail`.`title`$'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where[db.Sequelize.Op.or] = searchQuery;
      }

      

      let eventCalendar = await db.EventCalendar.findAll({
        where,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        order: [[sortBy || 'dailyDate', 'asc']],
        include: [
          {
            required: true,
            model: db.Event,
            where: {deletedAt : {
              [Op.eq]: null,
            }},
            as: 'eventDetail',
            attributes: {
              exclude: ['userId', 'createdAt', 'updatedAt'],
            },
            include: [
              {
                include: [
                  {
                    model: db.CropRecommendationModuleAttribute,
                    as: 'cropModuleAttribute',
                    attributes: [],
                  },
                ],
                model: db.AppUserModuleRecommMap,
                as: 'moduleRecommendation',
                attributes: [
                  'moduleId',
                  'attributeNum',
                  [
                    db.Sequelize.literal(
                      '`eventDetail->moduleRecommendation->cropModuleAttribute`.`moduleNum`'
                    ),
                    'moduleNum',
                  ],
                  [
                    db.Sequelize.literal(
                      '`eventDetail->moduleRecommendation->cropModuleAttribute`.`id`'
                    ),
                    'cropModuleAttrId',
                  ],
                  [
                    db.Sequelize.literal(
                      '`eventDetail->moduleRecommendation->cropModuleAttribute`.`moduleId`'
                    ),
                    'cropModuleId',
                  ],
                ],
              },
              {
                required: false,
                model: db.EventReminder,
                as: 'eventReminders',
                attributes: {
                  exclude: ['eventId', 'createdAt', 'updatedAt']
                },
              },
              {
                model: db.Option,
                as: "cropTypeId",
                attributes: ["id", "name"],
                as: "cropType"
              },
              {
                model: db.user_farm,
                attributes: ["farmName", "id"],
              },
              {
                model: db.Geofence,
                attributes: ["geofenceName", "id"],
              }
            ]
          },
        ],
      });

      eventCalendar = await Promise.all(
        eventCalendar?.map(async (event) => {
          event = await event?.toJSON();
          // format event calendar dates
          event.dailyDate =
            event.dailyDate &&
            moment(event.dailyDate)
              .format('YYYY-MM-DD HH:mm:ss');
          event.startDateTime =
            event.startDateTime &&
            moment(event.startDateTime)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
          event.endDateTime =
            event.endDateTime &&
            moment(event.endDateTime)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
          // format main event(event details) dates
          event.eventDetail.startDateTime =
            event.eventDetail.startDateTime &&
            moment(event.eventDetail.startDateTime)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
          event.eventDetail.endDateTime =
            event.eventDetail.endDateTime &&
            moment(event.eventDetail.endDateTime)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
          // format reminders dates
          event.reminders = event.reminders?.map((reminder) => {
            reminder.date =
              reminder.date &&
              moment(reminder.date)
                .tz('UTC', true)
                .tz(tz)
                .format('YYYY-MM-DD HH:mm:ss');
            return reminder;
          });
          return event;
        })
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: eventCalendar,
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
 * /user/event/{id}:
 *   delete:
 *     description: delete event
 *     tags: [Fedepanela Calendar]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *          type: integer
 *          required: true
 *          description: event id
 *        - in: headers
 *          name: oauth-token
 *          schema:
 *            type: string
 *          description: authentication token
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
 *                 example:
 */
router.delete(
  '/:id/:type',
  auth,
  validationErrorHandler,
  async (req, res) => {
    let { id, type } = req.params
    let userId = req.user.id;
    // type = current, following, all
    // just for prod only as hotfix
    const transaction = await db.sequelize.transaction();

    try {
      let event;
      if (type === 'current' ) {
        await db.EventCalendar.update({ deletedAt: new Date() }, {
          where: { id },
          transaction,
        });
      } else if (type === 'following') {
        const calendarEvent = await db.EventCalendar.findOne({
          where: {
            id
          }
        })
        await db.EventCalendar.update(
          {
            deletedAt: new Date() 
          },
          {
            where: {
              dailyDate: {
                [Op.gte] : calendarEvent.dailyDate
              }
            },
          }
        )
      } else if (type === "all") {
        const eventIds = await db.Event.findAll({
          where: {
            userId,
          },
          attributes: ['id']
        })
        const eventIDArray = eventIds.map(event => event.id)
        await db.EventCalendar.update(
          {
            deletedAt: new Date() ,
          },
          {
            where: {
              eventId: {
                [Op.in]: eventIDArray
              }
            },
          }
        )
      }
      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: event,
        })
      );
    } catch (err) {
      console.log('error', err);
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/event/{id}/alert-date:
 *   put:
 *     description: set date of sowing for displaying alerts in the UI
 *     tags: [Fedepanela Calendar]
 *     parameters:
 *        - in: headers
 *          name: oauth-token
 *          schema:
 *            type: string
 *          description: authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventId:
 *                    type: integer
 *                dateForAlert:
 *                    type: string
 *                    description: format YYYY-MM-DD HH:mm:ss
 *              required:
 *                - eventId
 *                - dateForAlert
 *            example: { "eventId": 1, "dateForAlert": "2022-11-30 12:12:12" }
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
 *                 example:
 */
router.put(
  '/:id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const { eventId, dateForAlert } = req.body;
      let event = await db.Event.update({ dateForAlert }, {
        where: { id: eventId },
        transaction,
      });

      await transaction.commit()
      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: event,
        })
      );
    } catch (err) {
      console.log('error', err);
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @description function for saving event details
 * @param {*} req
 * @param {*} transaction
 * @returns
 */
async function saveEvent(req, transaction = null) {
  const { id: userId } = req.user;
  const {
    title,
    moduleId,
    subModuleId,
    cropTypeId,
    description,
    colorPreference,
    addToGCal,
    startDateTime,
    endDateTime,
    allDay,
    repeat
  } = req.body;

  const setEvent = {
    userId,
    title,
    moduleId,
    subModuleId,
    cropTypeId,
    description,
    colorPreference,
    addToGCal,
    startDateTime: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
    endDateTime: endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    allDay,
    repeat
  };

  let result = await db.Event.create(setEvent, { transaction });
  req.body.eventId = result.id; //attach to request

  let systemElementDate = null;

  if (subModuleId) {
    const subModule = { name: subModuleId };
    // const subModule = await db.CropRecommendationModule.findOne({ where: { id: 32 }});

    // if (subModule) {
      const getWhereQuery = function(startDate = 'startDate', cropId = 'cropId') {
        return {
          [Op.and]: [
            db.Sequelize.where(
              db.Sequelize.fn(
                "datediff",
                new Date(startDateTime),
                db.Sequelize.col(`${startDate}`) // your column name 
              ),
              {
                [Op.lt]: 30,
              }
            ),
            { [cropId]: cropTypeId },
            { userId: userId },
          ],
        }
      }

      if (subModule.name.toLowerCase().includes('soilpreparation')) {
        // systemElement = await db;
      } else if (subModule.name.toLowerCase().includes('sowing')) {
          if(cropTypeId) {
            let sowingRes = await db.Sowing.findOne({ where: getWhereQuery() });
            systemElementDate = sowingRes && sowingRes.startDate;
          }
      } else if (subModule.name.toLowerCase().includes('soil')) {
        if(cropTypeId) {
          let soilRes = await db.SoilManagement.findOne({ where: getWhereQuery('dateOfApplication', 'cropType') }) || {};
          systemElementDate = soilRes && soilRes.dateOfApplication;
        }
      } else if (subModule.name.toLowerCase().includes('irrigation')) {
            if(cropTypeId) {
              let irriRes = await db.Irrigation.findOne({ where: getWhereQuery('createdAt') });
              systemElementDate = irriRes && irriRes.createdAt;
            }
      } else if (subModule.name.toLowerCase().includes('weed')) {
        if(cropTypeId) {
          let weedRes = await db.Weed.findOne({ where: getWhereQuery('createdAt', 'cropTypeId') });
          systemElementDate = weedRes &&  weedRes.createdAt;
        }
      } else if (subModule.name.toLowerCase().includes('harvesting')) {
        if(cropTypeId) {
          let harvestingRes = await db.Harvest.findOne({ where: getWhereQuery('start_date_harvesting', 'cropType') });
          systemElementDate = harvestingRes && harvestingRes.start_date_harvesting;
        }
      } else if (subModule.name.toLowerCase().includes('storage')) {
              if(cropTypeId) {
                let storageRes= await db.CropStorage.findOne({ where: getWhereQuery() });
                systemElementDate = storageRes && storageRes.startDate;
              }
      } else if (subModule.name.toLowerCase().includes('observation')) {
        if(cropTypeId) {
          let observationRes = await db.CropObservation.findOne({ where: getWhereQuery('dateOfObservation', 'cropType') })
          systemElementDate = observationRes &&  observationRes.dateOfObservation;
        }
      }

    // }
  }
  
  result.setDataValue('systemDate', systemElementDate && new Date(systemElementDate).toDateString() !== new Date(startDateTime).toDateString()
    ? systemElementDate : null
  );

  return result?.toJSON();
}

async function updateEvent(req, transaction = null) {
  const { id: userId } = req.user;
  let {id } = req.params
  const {
    title,
    moduleId,
    subModuleId,
    cropTypeId,
    description,
    colorPreference,
    addToGCal,
    startDateTime,
    endDateTime,
    allDay,
  } = req.body;

  const setEvent = {
    userId,
    title,
    moduleId,
    subModuleId,
    cropTypeId,
    description,
    colorPreference,
    addToGCal,
    startDateTime: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
    endDateTime: endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    allDay,
  };


  await db.Event.update(setEvent,{where: {id}, transaction});
  let result =  await db.Event.findOne({where: {id}, include: [
    {
      required: false,
      model: db.EventReminder,
      as: 'eventReminders',
      attributes: {
        exclude: ['eventId', 'createdAt', 'updatedAt']
      },
    },
  ] })
  req.body.eventId = result.id; //attach to request

  return result?.toJSON();
}


/**
 * @description function for saving event details
 * @param {*} req
 * @param {*} transaction
 * @returns
 */
async function saveEventReminders(req, transaction = null) {
  const { eventId, reminders = [] } = req.body;

  let reminderData = [];

  if (reminders && reminders.length) {
    reminderData = reminders.map(reminder => ({ 
      timeBefore: reminder.num,
      timeBeforeUnit: reminder.period,
     eventId }));
  }

  return await db.EventReminder.bulkCreate(reminderData, { transaction });
}

async function updateEventReminders(req, transaction = null) {
  const { eventId, eventReminders = [] } = req.body;

  let reminderData = [];

  await db.EventReminder.destroy({
    where: {
      eventId: req.params.id,
    },
    transaction,
  })
  if (eventReminders && eventReminders.length) {
    reminderData = eventReminders.map(reminder => ({ 
      timeBefore: reminder.num,
      timeBeforeUnit: reminder.period,
     eventId }));
  }

  return await db.EventReminder.bulkCreate(reminderData, { transaction });
}

async function updateEventReminders(req, transaction = null) {
  const { eventId, eventReminders = [] } = req.body;

  let reminderData = [];

  await db.EventReminder.destroy({
    where: {
      eventId: req.params.id,
    },
    transaction,
  })
  if (eventReminders && eventReminders.length) {
    reminderData = eventReminders.map(reminder => ({
      timeBefore: reminder.num,
      timeBeforeUnit: reminder.period,
      eventId }));
  }

  return await db.EventReminder.bulkCreate(reminderData, { transaction });
}

/**
 * @description function to map event and corp variety
 * @param {*} req
 * @param {*} transaction
 * @returns
 */
async function saveAndMapCropVarieties(req, transaction = null) {
  const { eventId, cropVarieties } = req.body;

  if(cropVarieties) {
    const saveCropVarietiesMap = cropVarieties?.map((cropVarietyId) => ({
      cropVarietyId,
      eventId,
    }));
  
    return db.EventCropVarietyMap.bulkCreate(saveCropVarietiesMap ?? [], {
      transaction,
    });
  } else {
    return
  }
}

async function updateCropVarieties(req, transaction = null) {
  const { eventId, cropVarieties } = req.body;

  if(cropVarieties) {

    await db.EventCropVarietyMap.destroy({
      where: {
        eventId: req.params.id,
      },
      transaction,
    })

     
    const saveCropVarietiesMap = cropVarieties?.map((cropVarietyId) => ({
      cropVarietyId,
      eventId,
    }));
  
    return db.EventCropVarietyMap.bulkCreate(saveCropVarietiesMap ?? [], {
      transaction,
    });
  } else {
    return
  }
}

/**
 * @description function to save all the calendar events
 * @param {*} req
 * @param {*} transaction
 * @returns
 */
async function saveCalanderEvents(req, transaction = null) {
  const { eventId, eventReminders: reminders, repeat, startDateTime, endDateTime, allDay } =
    req.body;
  const difference = Math.abs(startDateTime.diff(endDateTime));

  const repeatOn = {
    no_repeat: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'day',
      repeatEnds: 'after',
      repeatEndValue: 1,
    },
    every_day: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'day',
      repeatEnds: 'after',
      repeatEndValue: 365,
    },
    every_week: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'week',
      repeatEnds: 'after',
      repeatEndValue: 100,
      repeatWeekDays: [startDateTime.format('dd')?.toLowerCase()],
    },
    every_month: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'month',
      repeatEnds: 'after',
      repeatEndValue: 24,
    },
    every_year: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'year',
      repeatEnds: 'after',
      repeatEndValue: 10,
    },
  };

  const param = repeatOn[repeat];
  let recurringDates = getRecurringDates(param, endDateTime).all((date, i) => {
    return i < 1000;
  });
  recurringDates = recurringDates?.map((date) =>
    moment(date).tz('UTC', true).utc()
  );

  const setCalendarEvents = recurringDates?.map((startDateTime) => {
    const endDateTime = moment(startDateTime)
      .add(difference, 'ms')
      .format('YYYY-MM-DD HH:mm:ss');
    const setReminder = reminders?.map(({ num, period }) => {
      const date =
        allDay == 0
          ? moment(startDateTime)
              .subtract(num, period)
              ?.format('YYYY-MM-DD HH:mm:ss')
          : moment(startDateTime).subtract(num, period)?.format('YYYY-MM-DD');
      return { id: shortid.generate(), date, status: 'open' };
    });
    startDateTime = startDateTime.format('YYYY-MM-DD HH:mm:ss');
    // set data
    // const startDate = startDateTime.format('YYYY-MM-DD');
    // const endDate = endDateTime.format('YYYY-MM-DD');
    // if (allDay == 0) {
    //   var startTime = startDateTime.format('HH:mm:ss');
    //   var endTime = endDateTime.format('HH:mm:ss');
    // }

    return {
      eventId,
      startDateTime,
      endDateTime,
      dailyDate: startDateTime,
      // startTime: startTime ?? null,
      // endTime: endTime ?? null,
      reminders: setReminder,
    };
  });

  return db.EventCalendar.bulkCreate(setCalendarEvents, { transaction });
}
async function updateCalendarEvents(req, transaction = null) {
  const { eventId, eventReminders: reminders, repeat, startDateTime, endDateTime, allDay } =
    req.body;
  const difference = Math.abs(startDateTime.diff(endDateTime));

  await db.EventCalendar.destroy({
    where: {
      eventId: req.params.id
    },
    transaction,
  })

  const repeatOn = {
    no_repeat: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'day',
      repeatEnds: 'after',
      repeatEndValue: 1,
    },
    every_day: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'day',
      repeatEnds: 'after',
      repeatEndValue: 365,
    },
    every_week: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'week',
      repeatEnds: 'after',
      repeatEndValue: 100,
      repeatWeekDays: [startDateTime.format('dd')?.toLowerCase()],
    },
    every_month: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'month',
      repeatEnds: 'after',
      repeatEndValue: 24,
    },
    every_year: {
      startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      repeatsInterval: 1,
      repeatsFreq: 'year',
      repeatEnds: 'after',
      repeatEndValue: 10,
    },
  };

  const param = repeatOn[repeat];
  let recurringDates = getRecurringDates(param, endDateTime).all((date, i) => {
    return i < 1000;
  });
  recurringDates = recurringDates?.map((date) =>
    moment(date).tz('UTC', true).utc()
  );

  const setCalendarEvents = recurringDates?.map((startDateTime) => {
    const endDateTime = moment(startDateTime)
      .add(difference, 'ms')
      .format('YYYY-MM-DD HH:mm:ss');
    const setReminder = reminders?.map(({ num, period }) => {
      const date =
        allDay == 0
          ? moment(startDateTime)
              .subtract(num, period)
              ?.format('YYYY-MM-DD HH:mm:ss')
          : moment(startDateTime).subtract(num, period)?.format('YYYY-MM-DD');
      return { id: shortid.generate(), date, status: 'open' };
    });
    startDateTime = startDateTime.format('YYYY-MM-DD HH:mm:ss');
    // set data
    // const startDate = startDateTime.format('YYYY-MM-DD');
    // const endDate = endDateTime.format('YYYY-MM-DD');
    // if (allDay == 0) {
    //   var startTime = startDateTime.format('HH:mm:ss');
    //   var endTime = endDateTime.format('HH:mm:ss');
    // }

    return {
      eventId,
      startDateTime,
      endDateTime,
      dailyDate: startDateTime,
      // startTime: startTime ?? null,
      // endTime: endTime ?? null,
      reminders: setReminder,
    };
  });

  return db.EventCalendar.bulkCreate(setCalendarEvents, { transaction });
}

router.get('/:eventCalId', auth, async (req, res) => {
  try {
    const { eventCalId } = req.params;
    const tz = req.header('tz') || moment.tz.guess(true);
    const { id: userId } = req.user;

    const eventCalendar = await db.EventCalendar.findOne({
      where: {
        id: eventCalId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          required: true,
          model: db.Event,
          where: {
            deletedAt : {
              [Op.eq]: null,
            },
            userId,
          },
          as: 'eventDetail',
          attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt'],
          },
          include: [
            {
              include: [
                {
                  model: db.CropRecommendationModuleAttribute,
                  as: 'cropModuleAttribute',
                  attributes: [],
                },
              ],
              model: db.AppUserModuleRecommMap,
              as: 'moduleRecommendation',
              attributes: [
                'moduleId',
                'attributeNum',
                [
                  db.Sequelize.literal(
                    '`eventDetail->moduleRecommendation->cropModuleAttribute`.`moduleNum`'
                  ),
                  'moduleNum',
                ],
                [
                  db.Sequelize.literal(
                    '`eventDetail->moduleRecommendation->cropModuleAttribute`.`id`'
                  ),
                  'cropModuleAttrId',
                ],
                [
                  db.Sequelize.literal(
                    '`eventDetail->moduleRecommendation->cropModuleAttribute`.`moduleId`'
                  ),
                  'cropModuleId',
                ],
              ],
            },
            {
              required: false,
              model: db.EventReminder,
              as: 'eventReminders',
              attributes: {
                exclude: ['eventId', 'createdAt', 'updatedAt']
              },
            },
            {
              model: db.Crop,
            }
          ]
        },
      ],
    });

    if(eventCalendar === null) {
      return res.json(
        errorRespSync({
          msg: errorLang.DOESNT_EXISTS,
          data: null,
          code: 404
        })
      );
    }

    eventCalendar.startDateTime = eventCalendar.startDateTime &&
      moment(eventCalendar.startDateTime)
        .tz('UTC', true)
        .tz(tz)
        .format('YYYY-MM-DD HH:mm:ss');
    eventCalendar.endDateTime = eventCalendar.endDateTime &&
      moment(eventCalendar.endDateTime)
        .tz('UTC', true)
        .tz(tz)
        .format('YYYY-MM-DD HH:mm:ss');
    eventCalendar.eventDetail.startDateTime = eventCalendar.eventDetail.startDateTime &&
      moment(eventCalendar.eventDetail.startDateTime)
        .tz('UTC', true)
        .tz(tz)
        .format('YYYY-MM-DD HH:mm:ss');
    eventCalendar.eventDetail.endDateTime = eventCalendar.eventDetail.endDateTime &&
      moment(eventCalendar.eventDetail.endDateTime)
        .tz('UTC', true)
        .tz(tz)
        .format('YYYY-MM-DD HH:mm:ss');
    eventCalendar.reminders = eventCalendar.reminders?.map((reminder) => {
      reminder.date =
        reminder.date &&
        moment(reminder.date)
          .tz('UTC', true)
          .tz(tz)
          .format('YYYY-MM-DD HH:mm:ss');
      return reminder;
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: eventCalendar,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
