const db = require(rootPath + '/models');
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general"); // constant messages
const moment = require('moment');
const { Op } = require("sequelize");
const DISPLAY_DATE_FORMAT = process.env.DISPLAY_DATE_FORMAT;
const DISPLAY_DATETIME_FORMAT  = process.env.DISPLAY_DATETIME_FORMAT;
const { fcmInit } = require(rootPath + "/components/fcm.js");
const { isEmpty } = require('lodash')
const { sqs, s3West } = require(rootPath + '/components/s3-config.js');
const { getSignedURLs3West } = require(rootPath + '/helpers/aws_s3');
const { UserRegistrationToken } = require(rootPath + '/models');
const { getMessaging } = require('firebase-admin/messaging');
const { CreateUserNotification } = require('../../helpers/systemNotifications');
const { v4: uuidv4 } = require("uuid");

// Deleting the satellite report coordinates
module.exports.deleteSatelliteReportCoordinates = async (reportId, t) => {
    await db.satellite_report_coordinates.destroy(
      {
        where: {
            satelliteReportId : reportId,
        },
      },
      { transaction: t }
    );
};

//Updating the status of reports data to in-progress in bulk
module.exports.updateReportsStatus = async (reportsIds) => {
  await db.satellite_report.update(
    {status: "IN-PROGRESS"},
    {
      where: {
          id: reportsIds
      },
    }
  );
};

//updating report coordintes
module.exports.updateReportsCoordinates = async (reportId, data, t) => {
  await db.satellite_report.update(
    data,
    {
      where: {
          id: reportId
      },
    },
    { transaction: t }
  );
};

// Calculating center-latitude and center-longitude
module.exports.calculateCenteroiPolygon = async (coordinates) => {
    var x = coordinates.map (function (a){ return a['latitude'] });
    var y = coordinates.map (function (a){ return a['longitude'] });
    console.log({x}, {y});
    var minX = Math.min(...x);
    var maxX = Math.max(...x);
    var minY = Math.min(...y);
    var maxY = Math.max(...y);
    return [(minX + maxX) / 2, (minY + maxY) / 2];
}

//Check in report already exist on base of centroid
module.exports.checkExistingData = async (centroidPolygon,userId, dateOfInterest, t) => {
  try {
    var result = await db.satellite_report.findAll({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ['latitude', 'longitude'],
          as : "coordinates",
          required : true,
          reportGroup: 'Satellite Report',
        }
      ],
      where : {
        centerLatitude: centroidPolygon[0],
        centerLongitude: centroidPolygon[1],
        status: 'COMPLETED',
        userId: userId,
        dateOfInterest : dateOfInterest
      }
    },{ transaction: t });
    if(isEmpty(result)){
      result = await db.satellite_report.findAll({
        include: [
          {
            model: db.satellite_report_coordinates,
            attributes: ['latitude', 'longitude'],
            as : "coordinates",
            required : true,
            reportGroup: 'Satellite Report',
          }
        ],
        where : {
          centerLatitude: centroidPolygon[0],
          centerLongitude: centroidPolygon[1],
          status: 'COMPLETED',
          dateOfInterest : dateOfInterest
        }
      },{ transaction: t });
      let record = {
        isSameUser: false,
        data: result
      }
      if(isEmpty(result)){
        record.data = null;
      }
      return record;
    }
    const record = {
      isSameUser: true,
      data: result
    }
    return record;
  } catch (error) {
    console.log(error);
  }
 
}

// Checking if user has already in-progress reports
module.exports.checkInProgressReports = async (userId, t) =>{
  const inProgressReportsCount = await db.satellite_report.count({
    where : {
      status: 'IN-PROGRESS',
      userId: userId,
      reportGroup: 'Satellite Report',
    }
  },{ transaction: t });
  return inProgressReportsCount;
}

//inserting Existing record
module.exports.insertExistingData = async (data, t) => {
  try {
    let uniqId = uuidv4()
    for (const report of data) {
      report.requestId = uniqId
      let reportData = await db.satellite_report.create(report, {
        transaction: t
      });
      const satelliteReportId = reportData.id;
      if (notEmpty(report.coordinates)) {
        const reportCoordinates = report.coordinates.map((data) => {
          const { latitude, longitude } = data;
          return {
            satelliteReportId,
              latitude,
              longitude,
          };
        });
        // insert data into the report coordinates
        await db.satellite_report_coordinates.bulkCreate(reportCoordinates, {
          transaction: t
        });
      }
    }
    await t.commit();
    if(t.finished == 'commit'){
      return true;
    }
  } catch (error) {
    await t.rollback();
    logErrorOccurred(__filename, error);
    return false;
  }
  
}

//Getting Sawing Date and harvesting date
module.exports.gettingCropTypeDetails = async (cropType, crop, t) => {
  
  try {
    let include = [];
    if(crop === undefined){
      include.push(
        {
          model: db.Option,
          as: "cropType",
          attributes: ["id", "name"],
          where : { id : cropType}
        }
      )
    }else{
      include.push(
        {
          model: db.Crop,
          as: "cropVariety",
          attributes: ["id", "name"],
          where : {id : crop}
        },
        {
          model: db.Option,
          as: "cropType",
          attributes: ["id", "name"],
          where : { id : cropType}
        }
      )
    }
    let where = { deletedAt: null };
    let query = {
      include,
      attributes: [
        "id",
        'harvestingDate',
        'expectedYield',
        "sowingDate",
        "createdAt",
      ],
      where,
      order: [["createdAt", "DESC"]],
    };
    let result = await db.UserGoal.findOne(query,{ transaction: t });
    return result;
  } catch (error) {
    await t.rollback();
    logErrorOccurred(__filename, error);
    return error;
  }
}

//Formatting Dates
module.exports.formatDatesDataAndGetSignedURL = async (data, type) => {
  
  if(type === 'multi'){
    let response = [];
    for (let report of data) {
      // format swoing date
      try {
        if(report.sowingDate != null){
          const sowing_date = JSON.parse(report.sowingDate);
          const { start, end } = sowing_date;
          // update sowing date variable
          report.sowingDate = {
            ...sowing_date,
            start: notEmpty(start)
              ? moment(start).format(DISPLAY_DATE_FORMAT)
              : null,
            end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
          };
        }
      } catch (err) {
        console.log(err);
      }
      
  
      try {
        if(report.harvestingDate != null){
          const harvestingDate = JSON.parse(report.harvestingDate);
          const { start, end } = harvestingDate;
          // update sowing date variable
          report.harvestingDate = {
            ...harvestingDate,
            start: notEmpty(start)
              ? moment(start).format(DISPLAY_DATE_FORMAT)
              : null,
            end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
          };
        }
        
      } catch (err) {}
      
      report.createdAt = moment(report.createdAt).format(
        DISPLAY_DATETIME_FORMAT
      );
      report.dateOfInterest = moment(report.dateOfInterest).format(
        DISPLAY_DATETIME_FORMAT
      );
      if(report.status === 'COMPLETED'){
        
        const params = {
          Bucket: process.env.AWS_REPORT_BUCKET,
          Key: report.reportS3Key,
          Expires: 60 * 60,
        };
        console.log(params);
        report.dataValues.reportDownloadUrl = await getSignedURLs3West('getObject',params);
      }
     response.push(report);
    }
    return response;
  }else{
    try {
      if(data.sowingDate != null){
        const sowing_date = JSON.parse(data.sowingDate);
        const { start, end } = sowing_date;
        // update sowing date variable
        data.sowingDate = {
          ...sowing_date,
          start: notEmpty(start)
            ? moment(start).format(DISPLAY_DATE_FORMAT)
            : null,
          end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
        };
      }
      
    } catch (err) {}


    try {
      if(data.harvestingDate != null){
        const harvestingDate = JSON.parse(data.harvestingDate);
        const { start, end } = harvestingDate;
        // update sowing date variable
        data.harvestingDate = {
          ...harvestingDate,
          start: notEmpty(start)
            ? moment(start).format(DISPLAY_DATE_FORMAT)
            : null,
          end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
        };
      }
      
    } catch (err) {}
    data.createdAt = moment(data.createdAt).format(
      DISPLAY_DATETIME_FORMAT
    );
    data.dateOfInterest = moment(data.dateOfInterest).format(
      DISPLAY_DATETIME_FORMAT
    );
    if(data.status === 'COMPLETED'){
        
      const params = {
        Bucket: process.env.AWS_REPORT_BUCKET,
        Key: data.reportS3Key,
        Expires: 60 * 60,
      };
      console.log(params);
      data.dataValues.reportDownloadUrl = await getSignedURLs3West('getObject',params);
    }
    return data;
  }
  
}

//Composing Data for insertion
module.exports.composeDataForInserting = async (reportsData, userId, dateOfInterest, createdAt, farmId, geofenceId) => {
  let finalDataToInsert = [];
  for (const report of reportsData) {
    let data = {
      userId:userId,
      reportName: report.reportName,
      reportType:report.reportType,
      coordinates:report.coordinates,
      dateOfInterest:dateOfInterest,
      zoomLevel:report.zoomLevel,
      cropType:report.cropType,
      cropVariety:report.cropVariety,
      status:report.status,
      centerLatitude:report.centerLatitude,
      centerLongitude:report.centerLongitude,
      sowingDate:report.sowingDate,
      harvestingDate:report.harvestingDate,
      satelliteSource:report.satelliteSource,
      inputImage:report.inputImage,
      geoImagePath:report.geoImagePath,
      shortImagePath:report.shortImagePath,
      reportPDFPath:report.reportPDFPath,
      reportS3Key:report.reportS3Key,
      cropTypeName:  report.cropTypeName,
      cropVarietyName:  report.cropVarietyName,
      locationName: report.locationName,
      segment: report.segment,
      language: report.language,
      createdAt: createdAt,
      farmId,
      geofenceId
    }  
    
    finalDataToInsert.push(data);
  }
  return finalDataToInsert;
}


// Getting count and data of report types
module.exports.getReportTypesCountAndData = async (t) =>{
  const reportTypes = await db.report_types.findAndCountAll({
    attributes:[
      'id', 'name'
    ]
  },{ transaction: t });
  const reportTypesData = {
    count: reportTypes.count,
    data: reportTypes.rows
  };
  return reportTypesData;
}

// Sending Notification Message to Devices when report is updated
module.exports.SendNotificationToMultipleDevices = async (data) => {
try {
    // Get the deviceID and device_registration_token from DB
    const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
      attributes:[
        'device_id', 'device_registration_token'
      ],
      where : {
        userId: data.userId
      },
      order: [ [ 'createdAt', 'DESC' ]],
    })
  
    const registrationTokens = [];
  
    // for (const device of deviceRegistrationToken) {
      registrationTokens.push(deviceRegistrationToken[0].device_registration_token);
    // }
    console.log({registrationTokens});
    let msgTitle, msgBody = '';
    if(data.status === 'INVALID-LOCATION'){
      msgTitle = 'Report generation Process is completed';
      msgBody = 'You provided Invalid Location Please Try Again.';
    }else if(data.status === 'FAILED'){
      msgTitle = 'Report generation Process is completed';
      msgBody = 'Process Failed. Please Try Again';
    }else {
      msgTitle = 'Satellite Reports are ready for download';
      msgBody = 'You can download the report by clicking here';
    }

    const params = {
      Bucket: process.env.AWS_REPORT_BUCKET,
      Key: data.reportS3Key,
      Expires: 60 * 60,
    };
    
    const reportDownloadUrl = await getSignedURLs3West('getObject', params)
     
    // Send a message to the device corresponding to the provided
    // registration token.
    const payload = {
      data: {
        title: msgTitle,
        body: msgBody,
        notification_type: 'satelite_report',
        report_id: data.id.toString(),
        report_type: data.reportType,
        status : data.status,
        reportDownloadUrl: reportDownloadUrl || false,
        reportName: data.reportName || "",
        request_id: data.requestId
      },
      tokens: registrationTokens,
    };
    console.log({payload});

    const notification_payload =JSON.stringify({
      title: msgTitle,
      body: msgBody,
      type: "satelite_report",
      data: payload.data
    });
    
    //store in notification table
    await CreateUserNotification(data.userId,notification_payload);

    return new Promise((resolve, reject) => {
      getMessaging().sendEachForMulticast(payload)
      .then((response) => {
        console.log(response);
        if(response.successCount > 0){
          return resolve(true);
        }else{
          return reject(false)
        }
      });
    })
} catch (err) {
  console.log(err);
    logErrorOccurred(__filename, err);
}
}


// Send Message to SQS after insertion of record for starting backend process
module.exports.sendMsgToSQS = async (
  userId,
  currentDate,
  existingLocationData = null
) => {
  try {
    let repotrsData = await db.satellite_report.findAll({
      attributes:[
        'id'
      ],
      where: {
        userId : userId,
        createdAt: currentDate,
        status: "PENDING"
      },
      order: [ [ 'createdAt', 'DESC' ]],
    });


    // TODO : dynamic notification
    // const msgTitle = 'Satellite Reports are ready for download';
    // const msgBody = 'You can download the report by clicking here';

    //  const notification_payload =JSON.stringify({
    //   title: msgTitle,
    //   body: msgBody,
    //   type: "satelite_report"
    
    // })

    //store in notification table
    // await CreateUserNotification(userId,notification_payload);

    let reportIdsArray = [];
    if(repotrsData != null){
      for (const report of repotrsData) {
        reportIdsArray.push(report.id);
      }
    }
    let messageBodyToSend = {
      userID : userId,
      reportIds : reportIdsArray
    }
    var params = {
      MessageBody: JSON.stringify(messageBodyToSend), /* required */
      QueueUrl: process.env.AWS_QUEUE_URL, /* required */
      DelaySeconds: 10,
    };
    return new Promise((resolve, reject) => {
        sqs.sendMessage(params, function(err, data) {
        if (err) return reject(err);
        else return resolve(true);
      });
    })
      
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log('inside sendSQS has function ********', err.message);
    return false;
  }
}

// Uplaod Image to s3 bucket for farm location 
module.exports.uploadTos3 = async(imageData) => {
  var base64data = new Buffer.from(imageData.buffer);
  let currentDate = moment().unix();
  console.log(currentDate);
  const uploadedImage = await s3West.upload({
    Bucket: process.env.AWS_PUBLIC_BUCKET,
    Key: `FarmLocations/${currentDate}-${imageData.originalname}`,
    Body: base64data,
  }).promise();

  return uploadedImage;
}



//Check if location data already exist for user
module.exports.getExistingLocationData = async (centroidPolygon, userId) => {
  var result = await db.satellite_report.findOne({
    include: [
      {
        model: db.satellite_report_coordinates,
        attributes: [],
        as: 'coordinates',
        required: true,
      },
    ],
    where: {
      centerLatitude: centroidPolygon[0],
      centerLongitude: centroidPolygon[1],
      status: 'COMPLETED',
      userId: userId,
      reportGroup: 'Satellite Report',
    },
    order: [['id', 'desc'],['createdAt', 'desc']],
    group: ['id'],
  });

  return result;
};
