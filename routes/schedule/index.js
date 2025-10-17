const express = require("express");
const router = express.Router();

const moment = require("moment");
const { Op } = require('sequelize');
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/secret-key");

const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const {
  sendPushNotification
} = require(rootPath + '/helpers/pushNotification');


async function sendNotificationForReminders() {
  const today = moment();
  const SQL = `
      SELECT
        uec.id AS eventCalId,
        uec.eventId AS eventId,
        ue.title AS eventTitle,
        uec.startDateTime AS eventStartDateTime,
        uec.endDateTime AS eventEndDateTime,
        reminderTable.reminderDate,
        reminderTable.reminderId,
        reminderTable.reminderStatus,
        ue.description AS eventDescription,
        ue.userId as userId
      FROM
        user_event_calendars uec
      INNER JOIN user_events ue ON
        uec.eventId = ue.id,
      JSON_TABLE(
        uec.reminders,
        '$[*]' COLUMNS(
          reminderId VARCHAR(40) PATH '$.id',
          reminderDate VARCHAR(40) PATH '$.date',
          reminderStatus VARCHAR(100) PATH '$.status'
        )
      ) reminderTable
      WHERE
        reminderTable.reminderStatus = 'open' AND
        reminderTable.reminderId IS NOT NULL AND
        reminderTable.reminderDate BETWEEN :startDate AND :endDate
    `;

  const reminders = await db.sequelize.query(SQL, {
    replacements: { startDate: today.startOf('day').format('YYYY-MM-DD'), endDate: today.endOf('day').format('YYYY-MM-DD') },
    type: db.sequelize.QueryTypes.SELECT,
  });

  const deviceRegistrationTokenCache = new Map();

  for(const reminder of reminders) {
    const message = `${reminder.eventTitle} is scheduled to start on ${moment(reminder.eventStartDateTime).format('YYYY-MM-DD')}`;
    const transaction = await db.sequelize.transaction();
    // Send notification to users
    const notification = await db.Notification.create({
      notify: "user",
      message,
      userId: reminder.userId,
      type: "user_event",
      title: reminder.eventTitle,
      data: JSON.stringify({
        title: message,
        description: reminder.eventDescription,
        eventCalId: reminder.eventCalId,
        reminderId: reminder.reminderId,
      }),
    }, { transaction });

    await db.UserNotification.create({
      userId: reminder.userId,
      notificationId: notification?.id
    }, { transaction });
    await transaction.commit();

    let firebaseTokens = [];
    if(deviceRegistrationTokenCache.has(reminder.userId)) {
      firebaseTokens = deviceRegistrationTokenCache.get(reminder.userId);
    } else {
      const userDeviceRegistrationTokens = await db.UserRegistrationToken.findAll({
        attributes: [
          'device_registration_token'
        ],
        where: {
          userId: reminder.userId
        }
      });
      firebaseTokens = userDeviceRegistrationTokens.map(token => token.device_registration_token);
      deviceRegistrationTokenCache.set(reminder.userId, firebaseTokens);
    }

    const data = {
      reminderId: `${reminder.reminderId}`,
      eventCalId: `${reminder.eventCalId}`,
      description: `${reminder.eventDescription}`,
      notification_type: 'user_event',
      title: `${reminder.eventTitle}`,
      message,
      userId: `${reminder.userId}`,
    }
    if(firebaseTokens.length > 0) {
      const response = await sendPushNotification(firebaseTokens, message, data);
      console.log('EVENT_REMINDERS_PUSH_NOTIFICATION_RESPONSE', response);
    }
  }

  const eventCalendars = await db.EventCalendar.findAll({
    where: {
      id: {
        [Op.in]: reminders.map(reminder => reminder.eventCalId)
      }
    }
  });

  for (const eventCalendar of eventCalendars) {
    const updatedReminders = eventCalendar.reminders?.map(reminder => {
      const isUpdated = reminders.findIndex(rem => rem.reminderId == reminder.id) !== -1;
      if(isUpdated) reminder.status = 'close';
      return reminder;
    });
    await eventCalendar.set({ reminders: updatedReminders }).changed('reminders', true).save();
  }

  return reminders;
}

router.get("/", auth, async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    // Find all surveys scheduled to start today and are enabled
    const surveysToStart = await db.surveysList.findAll({
      where: {
        scheduledDate: today,
        isScheduled: true,
        surveyStatus: true,
        status: 'Inactive',
      },
    });

    // Find all surveys scheduled to end today
    const surveysToEnd = await db.surveysList.findAll({
      where: {
        scheduledEndDate: today,
        isScheduled: true,
        surveyStatus: true,
        status: 'Active',
      },
    });

    // Enable surveys that are scheduled to start today
    for (const survey of surveysToStart) {
      await db.surveysList.update(
        { status: 'Active' },
        {
          where: {
            id: survey.id,
          },
        }
      );

      await db.surveyUsersList.update(
        { status: true, surveyListStatus: true },
        {
          where: {
            surveyId: survey.id,
          },
        }
      );

      const surveyUsers = await db.surveyUsersList.findAll({
        where: { surveyId: survey.id, status: true },
      });

      for (const user of surveyUsers) {
        var transaction = await db.sequelize.transaction();
        // Send notification to users
        const notification = await db.Notification.create({
          notify: "user",
          message: `You have been invited to "${survey.title}"`,
          userId: user.userId,
          type: "survey",
          title: "You have been invited to the survey",
          data: JSON.stringify({
            surveyId: survey.id,
            title: `You have been invited to "${survey.title}"`,
            description: survey.description,
          }),
        }, { transaction });
  
        let setUserNotification;
        setUserNotification = {
          userId: user.userId,
          notificationId: notification?.id
        }
        await db.UserNotification.create(setUserNotification, {
          transaction,
        });
        await transaction.commit();
        const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
          attributes: [
            'device_registration_token'
          ],
          where: {
            userId: user.userId
          }
        })
  
        const firebaseToken = [];
  
        for (const device of deviceRegistrationToken) {
          firebaseToken.push(device.device_registration_token);
        }
  
        const data = {
          surveyId: `${survey.id}`,
          title: `You have been invited to "${survey.title}"`,
          description: `${survey.description}`,
          notification_type: 'survey',
          message: `You have been invited to "${survey.title}"`,
          userId: `${user.id}`,
        }
  
        if (firebaseToken.length > 0) {
          const response = await sendPushNotification(firebaseToken, `You have been invited to "${survey.title}"`, data)
          console.log(response, "@@responses")
        }
      }
    }

    // Disable surveys that are scheduled to end today
    for (const survey of surveysToEnd) {
      await db.surveysList.update(
        { 
          surveyStatus: false,
          status: 'Completed',
        },
        {
          where: {
            id: survey.id,
          },
        }
      );

      await db.surveyUsersList.update(
        { status: false },
        {
          where: {
            surveyId: survey.id,
          },
        }
      );

      await db.surveyUserResponseEntityList.update(
        { surveyStatus: false },
        {
          where: {
            surveyId: survey.id,
          },
        }
      );
    }

    await sendNotificationForReminders();

    return res.json(
      successRespSync({
        msg: "Scheduled run successfully",
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

module.exports = router;
