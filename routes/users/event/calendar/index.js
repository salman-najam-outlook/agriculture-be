const express = require('express');
const _ = require('lodash');
const { CreateUserNotification } = require(rootPath +
  "/helpers/systemNotifications");
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
  const { getRecurringDates } = require(rootPath + '/helpers/datetime');
  const cron = require('node-cron');
  const { sendPushNotification } = require(rootPath +
    "/helpers/pushNotification");
    const multer = require("multer");
    const xlsx = require('xlsx');
    const ejs = require('ejs');
    const path = require("path");
    const mailer = require(rootPath + '/components/mailer');
/**
* @swagger
* /user/event/calendar:
*   post:
*     summary: Update Agronomic Calendar Metadata
*     description: This endpoint updates the agronomic calendar metadata.
*     tags: [Fedepanela Calendar]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               metaData:
*                 type: object
*                 required: true
*               data:
*                 type: object
*                 required: true
*             example: {
*               "metaData": {
*                 "subActivity": []
*               },
*               "data": {
*                 "id": 1,
*                 "subActivity": []
*               }
*             }
*     responses:
*       '200':
*         description: The updated metadata was successfully saved.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                   type: string
*                 data:
*                   type: object
*                   required: true
*               example: {
*                 "msg": "SAVED",
*                 "data": {
*                   "id": 1,
*                   "subActivity": []
*                 }
*               }
*/

router.post(
  '/',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      // const { id: userId } = req.user;
      const { triggerActivityId } = req.body;
      // const tz = req.header('tz') || moment.tz.guess(true);

      const metaData = await db.AgronomicCalendarMetadata.findOne({
        where: { id: triggerActivityId },
      });

      let subActivityList = metaData.subActivity;
      if(req.body){
        const metadata = await db.AgronomicCalendarMetadata.findOne({
          where: { id: req.body.triggerActivityId },
          attributes: ['cropTypeId'],
        });
      
        if (metadata) {
          req.body.cropTypeId = metadata.get('cropTypeId');
        }
      }
      // order of calling is important
      const event = await saveEvent(req, metaData);
      await Promise.all([
        saveCalanderEvents(req, event && JSON.parse(JSON.stringify(event))),
      ]);


      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: event,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * @description function to save all the calendar events
 * @param {*} req
 * @returns
 */
async function saveCalanderEvents(req, events) {
  let setCalendarEvents = [];
  let reminders= [
    {
      "num": "3",
      "period": "days"
    },
    {
      "num": "2",
      "period": "days"
    },
    {
      "num": "1",
      "period": "days"
    }
  ], repeat = "every_day", allDay = 1
  // const { eventId, event.startDateTime, event.endDateTime, } =
  //   req.body;
  
    events.forEach(event => {
      let setCalendarArr = []
      event.startDateTime = moment(event.startDateTime)
      event.endDateTime = moment(event.endDateTime)
      const difference = Math.abs(event.startDateTime.diff(event.endDateTime));
    
      const repeatOn = {
        no_repeat: {
          startDate: event.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          repeatsInterval: 1,
          repeatsFreq: 'day',
          repeatEnds: 'after',
          repeatEndValue: 1,
        },
        every_day: {
          startDate: event.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          repeatsInterval: 1,
          repeatsFreq: 'day',
          repeatEnds: 'after',
          repeatEndValue: 365,
        },
        every_week: {
          startDate: event.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          repeatsInterval: 1,
          repeatsFreq: 'week',
          repeatEnds: 'after',
          repeatEndValue: 100,
          repeatWeekDays: [event.startDateTime.format('dd')?.toLowerCase()],
        },
        every_month: {
          startDate: event.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          repeatsInterval: 1,
          repeatsFreq: 'month',
          repeatEnds: 'after',
          repeatEndValue: 24,
        },
        every_year: {
          startDate: event.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          repeatsInterval: 1,
          repeatsFreq: 'year',
          repeatEnds: 'after',
          repeatEndValue: 10,
        },
      };
    
      const param = repeatOn[repeat];
      let recurringDates = getRecurringDates(param, event.endDateTime).all((date, i) => {
        return i < 1000;
      });
      recurringDates = recurringDates?.map((date) =>
      {
        return {
          dailyDate: moment(date).tz('UTC', true).utc(),
        }
      }
      );
    
       setCalendarArr = recurringDates?.map((rcDate) => {
        const endDateTime = moment(rcDate)
          .add(difference, 'ms')
          .format('YYYY-MM-DD HH:mm:ss');
        const setReminder = reminders?.map(({ num, period }) => {
          const date =
            allDay == 0
              ? moment(event.startDateTime)
                  .subtract(num, period)
                  ?.format('YYYY-MM-DD HH:mm:ss')
              : moment(event.startDateTime).subtract(num, period)?.format('YYYY-MM-DD');
          return { id: shortid.generate(), date, status: 'open' };
        });

    
        return {
          eventId: event.id,
         startDateTime:event.startDateTime,
         endDateTime:event.endDateTime.format('YYYY-MM-DDT23:59:59[Z]'),
         dailyDate: rcDate.dailyDate,
          // startTime: startTime ?? null,
          // endTime: endTime ?? null,
          reminders: setReminder,
        };
      });

      setCalendarEvents = [...setCalendarEvents, ...setCalendarArr]
    })
  

  return db.EventCalendar.bulkCreate(setCalendarEvents);
}

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


/**
 * @description function for saving event details where there is  triggerActivityStartDate and triggerActivityEndDate
 * @param {*} req
 * @returns
 */
async function saveEventDualReferenceDate(req, calendarMetadata, tz) {
  let eventArr = [], triggerActivityStartDate, triggerActivityEndDate
  const { id: userId } = req.user;

      // convert datetime into UTC
      triggerActivityStartDate = moment
        .tz(calendarMetadata.triggerActivityStartDate, 'YYYY-MM-DD HH:mm:ss', true, tz)
        .utc();
      triggerActivityEndDate = moment
        .tz(calendarMetadata.triggerActivityEndDate, 'YYYY-MM-DD HH:mm:ss', true, tz)
        .utc();



  calendarMetadata.subActivity.forEach((subActivity, index) => {
    
    let eventObj = {}
    if(subActivity.subActivityEndDate < 0) {
        eventObj.userId = userId,
        eventObj.title = subActivity.subActivity,
        eventObj.subModuleId = calendarMetadata.moduleId,
        eventObj.cropTypeId =calendarMetadata.cropTypeId,
        eventObj.description =  subActivity.description,
        eventObj.colorPreference = "1D8489",
        eventObj.startDateTime = triggerActivityStartDate.clone().add(subActivity.subActivityStartDate, 'days').format('YYYY-MM-DD HH:mm:ss') ,
        eventObj.endDateTime = triggerActivityStartDate.clone().add(subActivity.subActivityEndDate, 'days').format('YYYY-MM-DD HH:mm:ss') ,
        eventObj.allDay = true,
        eventObj.repeat = "every_day"

    } else {
      eventObj.userId = userId,
      eventObj.title = subActivity.subActivity,
      eventObj.subModuleId = calendarMetadata.moduleId,
      eventObj.cropTypeId =calendarMetadata.cropTypeId,
      eventObj.description =  subActivity.description,
      eventObj.colorPreference = "1D8489",
      eventObj.startDateTime = triggerActivityEndDate.clone().add(subActivity.subActivityStartDate, 'days').format('YYYY-MM-DD HH:mm:ss') ,
      eventObj.endDateTime = triggerActivityEndDate.clone().add(subActivity.subActivityEndDate, 'days').format('YYYY-MM-DD HH:mm:ss') ,
      eventObj.allDay = true,
      eventObj.repeat = "every_day"
      eventObj.farmId = req.body?.farmId || null
      eventObj.registeredCropId = req.body?.registeredCropId || null
      eventObj.calendarMetadataId = req.body?.calendarMetadataId || null
      eventObj.triggerDate = req.body?.triggerDate || null
    }
    
    eventArr.push(eventObj)
  })
  let result = await db.Event.bulkCreate(eventArr, {returning: true});


  return result
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * @description function for saving event details where there is only triggerDate
 * @param {*} req
 * @returns
 */
async function saveEvent(req, calendarMetadata) {
  let eventArr = [], triggerActivityStartDate, triggerActivityEndDate
  const { id: userId } = req.user;
  let { triggerDate, tz } = req.body;
  tz = tz || moment.tz.guess(true)

  // convert triggerDate into UTC
  let triggerDateUTC = moment(triggerDate).tz(tz || 'Asia/Kolkata').utc() 




  calendarMetadata.subActivity.forEach((subActivity, index) => {
    
    let eventObj = {}

      eventObj.userId = userId,
      eventObj.title = subActivity.subActivity,
      eventObj.subModuleId = calendarMetadata.moduleId,
      eventObj.cropTypeId =req.body.cropTypeId,
      eventObj.description =  subActivity.description,
      eventObj.colorPreference = generateRandomColor(),
      eventObj.startDateTime = triggerDateUTC.clone().add(subActivity.subActivityStartDate , 'days').toISOString() ,
      eventObj.endDateTime = triggerDateUTC.clone().add(subActivity.subActivityEndDate , 'days').toISOString() ,
      eventObj.allDay = true,
      eventObj.repeat = "every_day"
      eventObj.farmId = req.body?.farmId || null
      eventObj.calendarMetadataId = req.body?.triggerActivityId || null
      eventObj.triggerDate = triggerDateUTC || null
      eventObj.zoneId = req.body.zoneId || null
      eventObj.tz = req.body.tz || null
    
    
    eventArr.push(eventObj)
  })
  let result = await db.Event.bulkCreate(eventArr, {returning: true});


  return result
}

async function sendCalendarNotification() {
  console.log('crop calendar cron start here')
  let today = moment().format('YYYY-MM-DD')
  let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
  let dayAfterTomorrow = moment().add(2, 'days').format('YYYY-MM-DD')

  let startTimeNotifications = [], endTimeNotifications = []


  // var moment1 = moment('01/23/17', 'MM/D/YYYY');
  // var moment2 = moment('01/23/17', 'MM/D/YYYY');
  // console.log( moment1.isSame(moment2, 'day') ); 
  // console.log( moment1.isSame(moment2, 'date') ); 


  let startTimeNotify = await db.Event.findAll({
    where: {
      [db.Sequelize.Op.and]: [
        { startDateTime: { [db.Sequelize.Op.gte]: today, } },
        { startDateTime: { [db.Sequelize.Op.lted]: dayAfterTomorrow } },
        { triggerDate: { [db.Sequelize.Op.not]: null } },
        { deletedAt: { [db.Sequelize.Op.eq]: null } },
      ]
    }
  })

  let endTimeNotify = await db.Event.findAll({
    where: {
      [db.Sequelize.Op.and]: [
        { endDateTime: { [db.Sequelize.Op.gte]: today, } },
        { endDateTime: { [db.Sequelize.Op.lte]: dayAfterTomorrow } },
        { triggerDate: { [db.Sequelize.Op.not]: null } },
        { deletedAt: { [db.Sequelize.Op.eq]: null } },
      ]
    }
  })

  startTimeNotify.forEach((item) => {
    let eventStartDate = moment(item.startDateTime)
    let todayDate = moment(today)
    let tomorrowDate = moment(tomorrow)
    let dayAfterTomorrowDate = moment(dayAfterTomorrow)



    if (todayDate.isSame(eventStartDate, 'day')) {


      startTimeNotifications.push({ event: item, notificationDay: "today" })
    } else if (tomorrowDate.isSame(eventStartDate, 'day')) {


      startTimeNotifications.push({ event: item, notificationDay: "tomorrow" })
    } else if (dayAfterTomorrowDate.isSame(eventStartDate, 'tomorrow')) {


      startTimeNotifications.push({ event: item, notificationDay: "dayAfterTomorrow" })
    }

  })

  endTimeNotify.forEach((item) => {
    let eventEndDate = moment(item.endDateTime)
    let todayDate = moment(today)
    let tomorrowDate = moment(tomorrow)
    let dayAfterTomorrowDate = moment(dayAfterTomorrow)


    if (todayDate.isSame(eventEndDate, 'day')) {


      endTimeNotifications.push({ event: item, notificationDay: "today" })
    } else if (tomorrowDate.isSame(eventEndDate, 'day')) {


      endTimeNotifications.push({ event: item, notificationDay: "tomorrow" })
    } else if (dayAfterTomorrowDate.isSame(eventEndDate, 'tomorrow')) {


      endTimeNotifications.push({ event: item, notificationDay: "dayAfterTomorrow" })
    }

  })

  // send notification to user for start time and end time, dont delete, uncomment when running cron

  startTimeNotifications.forEach(async (item) => {
    let message = ""
    let { event, notificationDay } = item
    const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
      attributes: ["device_registration_token"],
      where: {
        userId: event.userId,
      },
    });

    const firebaseToken = [];

    for (const device of deviceRegistrationToken) {
      firebaseToken.push(device.device_registration_token);
    }



    if (notificationDay === 'today') {

      message = `Your activity ${event.title} starts today`
    } else if (notificationDay === 'tomorrow') {

      message = `Your activity ${event.title} starts tomorrow`
    } else if (notificationDay === 'dayAfterTomorrow') {

      message = `Your activity ${event.title} starts day after tomorrow`
    }

    const data = {

      title: message,
        notification_type: "agronomic_calendar_notification"

    };
    if (firebaseToken.length > 0) {
      const response = await sendPushNotification(
        firebaseToken,
        message,
        data
      );
      await CreateUserNotification(
        event.userId,
        JSON.stringify({
          title: message,
          body: message,
          type: "agronomic_calendar_notification",
          event_id: event.id,
        })
      )
      console.log(response, "startTimeNotifications")
    }

  })


  endTimeNotifications.forEach(async (item) => {
    let message = ""
    let { event, notificationDay } = item
    const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
      attributes: ["device_registration_token"],
      where: {
        userId: event.userId,
      },
    });

    const firebaseToken = [];

    for (const device of deviceRegistrationToken) {
      firebaseToken.push(device.device_registration_token);
    }



    if (notificationDay === 'today') {

      message = `Your activity ${event.title} ends today`
    } else if (notificationDay === 'tomorrow') {

      message = `Your activity ${event.title} ends tomorrow`
    } else if (notificationDay === 'dayAfterTomorrow') {

      message = `Your activity ${event.title} ends day after tomorrow`
    }

    const data = {

      title: message,
      notification_type: "agronomic_calendar_notification"

    };
    if (firebaseToken.length > 0) {
      const response = await sendPushNotification(
        firebaseToken,
        message,
        data
      );
      console.log(response, "endTimeNotifications")

      await CreateUserNotification(
        event.userId,
        JSON.stringify({
          title: message,
          body: message,
          type: "agronomic_calendar_notification",
          event_id: event.id,
        })
      )
    }


  })


  // send sucess email for log
  const template = await ejs.renderFile(
    path.join(rootPath, 'views', 'cropCalendarLog.html'),
    { successLog: { startTimeNotifications: JSON.stringify(startTimeNotifications), endTimeNotifications: JSON.stringify(endTimeNotifications) }, errorLog: null },
  );


  mailer.sendMail('amit@dimitra.io', "Crop calendar cron success log", template)
  return { startTimeNotify, endTimeNotify, startTimeNotifications, endTimeNotifications }
}
// every min for test
cron.schedule('10 0 * * *', async () => {
  // every day at 12:10 am
// cron.schedule('*/2 * * * *', async () => {
  console.log('Running a task every day at 12:01 am');
  try {
   
    sendCalendarNotification()

  } catch (error) {

    
    // send error email for log
    const template = await ejs.renderFile(
      path.join(rootPath, 'views', 'cropCalendarLog.html'),
      {errorLog: error.stack, successLog: null},
    );


    mailer.sendMail('amit@dimitra.io', "Crop calendar cron error log", template)
    console.log('crop calendar cron error')

  }
});

router.get(
  '/',
  auth,
  validationErrorHandler,
  async (req, res) => { 
    try {
  
     let notificationCronTestRes = await sendCalendarNotification()
    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: notificationCronTestRes
      })
    );
      
    } catch (error) {
      console.log('crop calendar cron error')
      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: {msg: "fail"},
        })
      );
    }
    
  })

  const mupload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
      cb(null, true);
    }
  });

  router.post('/csv-upload', mupload.single('calendarMetadataCsv'), auth, async (req, res, next) => {
    const csvBuffer = req.file.buffer;
    const wb = xlsx.read(csvBuffer.toString(), { type: "string",  cellDates: true,});
    jsonArray = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      blankrows: false,
    });
    let calendarMetadata = []
    let subActivityArr = []
    let tmpObj= null
    jsonArray.forEach( (row, index) => {

    // console.log(index)
    if((row["Trigger Activity Start Date"] && index > 0) ) {
    // if( index == jsonArray.length -1) {
        // console.log(row)
        calendarMetadata.push(tmpObj)
        subActivityArr = []
        subActivityArr.push({
            "description":row.Description,
            "subActivity": row["Sub-Activity"],
            "subActivityStartDate": row["Sub-Activity Start Date"],
            "subActivityEndDate": row["Sub-Activity End Date"],
        })
    
    } else if( index == jsonArray.length - 1) {
        subActivityArr.push({
            "description":row.Description,
            "subActivity": row["Sub-Activity"],
            "subActivityStartDate": row["Sub-Activity Start Date"],
            "subActivityEndDate": row["Sub-Activity End Date"],
        })
        calendarMetadata.push(tmpObj)
    } else {
        subActivityArr.push({
            "description":row.Description,
            "subActivity": row["Sub-Activity"],
            "subActivityStartDate": row["Sub-Activity Start Date"],
            "subActivityEndDate": row["Sub-Activity End Date"],
        })
    }


    if(row["cropTypeId"]) {
        tmpObj = {}
        tmpObj.cropTypeId =  row["cropTypeId"]
        tmpObj.cropName =  row["Crop Name"]
        tmpObj.country =  row["Country"]
        tmpObj.triggerActivity =  row["Trigger Activity"]
        tmpObj.moduleId =  row["moduleId"]
        tmpObj.triggerActivityStartDate =  row["Trigger Activity Start Date"]
        tmpObj.triggerActivityEndDate =  row["Trigger Activity End Date"]
        tmpObj.subActivity =  subActivityArr
    }
    
     
    })
    await db.AgronomicCalendarMetadata.bulkCreate(calendarMetadata)

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: {calendarMetadata},
      })
    );
  })

  router.get(
    '/trigger_activities/:cropTypeId',
    auth,
    validationErrorHandler,
    async (req, res) => { 
      let {cropTypeId} = req.params;
      let calendarMetadataRes = await db.AgronomicCalendarMetadata.findAll({where: { 
        cropTypeId
       }})
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: calendarMetadataRes,
        })
      );
    })

module.exports = router;
