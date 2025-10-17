const express = require('express');
const _ = require('lodash');
const shortid = require('short-uuid');
const router = express.Router();
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorUserEvent = require(rootPath +
  '/helpers/validators/userEvents/index.js');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /user/event/reminder:
 *   get:
 *     summary: fetch reminder of the event for current date
 *     description: fetch reminder for the event for current date
 *     tags: [Fedepanela Calendar]
 *     parameters:
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "eventCalId": 2, "eventId": 2, "eventTitle": "some title 5", "eventStartDateTime": null, "eventEndDateTime": null, "reminderDate": "2022-12-28 12:12:12", "remainingDays": 4, "reminderId": "56pDpjzMjfFsVv6JhphXfL", "reminderStatus": "open", "eventDescription": "some description", "eventsAllDay": 0, "cropTypeId": 1, "cropTypeName": "test", "remindAfter": { "days": 3, "date": "2022-12-31 12:12:12" } } ] }
 */
router.get(
  '/',
  auth,
  validatorUserEvent.getReminder(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { next = 0 } = req.query;
      const tz = req.header('tz') || moment.tz.guess(true);

      let startDate, endDate;
      startDate = moment
        .tz(tz)
        .utc()
        .startOf('day')
        .format('YYYY-MM-DD');
      endDate = moment
        .tz(tz)
        .add(next, 'days')
        .utc()
        .endOf('day')
        .format('YYYY-MM-DD');

      // raw query for getting reminders
      const sqlQuery = `SELECT
      uec.id AS eventCalId,
      uec.eventId AS eventId,
      uec.reminders as eventReminders,
      ue.title AS eventTitle,
      uec.startDateTime AS eventStartDateTime,
      uec.endDateTime AS eventEndDateTime,
      reminderTable.reminderDate,
      DATEDIFF(
          uec.startDateTime,
          reminderTable.reminderDate
      ) AS remainingDays,
      reminderTable.reminderId,
      reminderTable.reminderStatus,
      ue.description AS eventDescription,
      ue.allDay AS eventsAllDay,
      ue.cropTypeId,
      op.name AS cropTypeName
  FROM
      user_event_calendars uec
  INNER JOIN user_events ue ON
      uec.eventId = ue.id
  LEFT JOIN options op ON
      op.id = ue.cropTypeId,
      JSON_TABLE(
          uec.reminders,
          '$[*]' COLUMNS(
              reminderId VARCHAR(40) PATH '$.id',
              reminderDate VARCHAR(40) PATH '$.date',
              reminderStatus VARCHAR(100) PATH '$.status'
          )
      ) reminderTable
  WHERE
      ue.userId = :userId AND reminderTable.reminderStatus = 'open' AND reminderTable.reminderId IS NOT NULL AND reminderTable.reminderDate BETWEEN :startDate AND :endDate AND uec.deletedAt IS NULL
  ORDER BY
      reminderTable.reminderDate ASC`;

      let eventCalendar = await db.sequelize.query(sqlQuery, {
        replacements: { userId, startDate, endDate },
        type: db.sequelize.QueryTypes.SELECT,
      });

      eventCalendar = eventCalendar?.map((reminder) => {
        const { eventReminders, remainingDays, reminderDate } = reminder;
        // get available date for resetting reminder
        const availableDate =
          remainingDays > 1 &&
          getAvailableDate(
            reminderDate,
            remainingDays,
            eventReminders?.map(({ date }) => date)
          );
        if (availableDate?.status) {
          delete availableDate.status;
          reminder.remindAfter = { ...availableDate };
        } else reminder.remindAfter = null;

        // convert date into user timezone
        reminder.eventStartDateTime = !reminder.eventStartDateTime
          ? null
          : moment(reminder.eventStartDateTime)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
        reminder.eventEndDateTime = !reminder.eventEndDateTime
          ? null
          : moment(reminder.eventEndDateTime)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
        reminder.reminderDate = !reminder.reminderDate
          ? null
          : moment(reminder.reminderDate)
              .tz('UTC', true)
              .tz(tz)
              .format('YYYY-MM-DD HH:mm:ss');
        if (!_.isEmpty(reminder.remindAfter)) {
          reminder.remindAfter.date = _.isEmpty(reminder.remindAfter.date)
            ? null
            : moment(reminder.remindAfter.date)
                .tz('UTC', true)
                .tz(tz)
                .format('YYYY-MM-DD HH:mm:ss');
        }

        // remove unwanted fields
        delete reminder.eventReminders;
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
  }
);

/**
 * @swagger
 * /user/event/reminder:
 *   put:
 *     summary: mark reminder closed and push it for next date
 *     description: mark reminder closed and push it for next date
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
 *                eventCalId:
 *                    type: integer
 *                reminderId:
 *                    type: string
 *                remindOn:
 *                    type: string
 *                    description: format YYYY-MM-DD HH:mm:ss
 *              required:
 *                - eventCalId
 *                - reminderId
 *            example: { "eventCalId": 86, "reminderId": "jkf6kfTDMNcECsE9WneeM3", "remindOn": "2022-11-30 12:12:12" }
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
  '/',
  auth,
  validatorUserEvent.updateReminder(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { eventCalId, reminderId, remindOn } = req.body;
      const tz = req.header('tz') || moment.tz.guess(true);

      const calEvent = await db.EventCalendar.findOne({
        where: { id: eventCalId, '$eventDetail.userId$': userId, deletedAt: null },
        include: [
          {
            required: true,
            model: db.Event,
            as: 'eventDetail',
            attributes: [],
          },
        ],
      });
      const reminders = calEvent.reminders?.map((rem) => {
        if (rem.id == reminderId) rem.status = 'close';
        return rem;
      });

      if (!_.isEmpty(remindOn)) {
        let reminderDate = moment(remindOn).tz(tz, true);
        reminderDate = reminderDate.utc().format('YYYY-MM-DD HH:mm:ss');
        reminders.push({
          id: shortid.generate(),
          date: reminderDate,
          status: 'open',
        });
      }

      await calEvent.set({ reminders }).changed('reminders', true).save();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: calEvent,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @description function to get available date before the event date for next reminder
 * @param {*} dateFrom
 * @param {*} maxDays
 * @param {*} betweenDates
 * @returns
 */
function getAvailableDate(dateFrom, maxDays, betweenDates = []) {
  if (maxDays <= 0) return { status: false };

  let days = parseInt(maxDays) - 1;
  let date = moment
    .tz(dateFrom, 'YYYY-MM-DD HH:mm:ss', true, 'UTC')
    .add(days, 'days')
    .format('YYYY-MM-DD HH:mm:ss');
  let status = betweenDates.includes(date);
  if (status) getAvailableDate(dateFrom, days - 1, betweenDates);
  else return { status: true, days, date };
}

module.exports = router;
