"use strict";

const { getMessaging } = require("firebase-admin/messaging");
const db = require(rootPath + "/models");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

// Sending Notification Message to Devices when report is updated
module.exports.SendNotificationToMultipleDevices = async (
  userId,
  messageData
) => {
  try {
    //store the notification to db
    await module.exports.CreateUserNotification(userId,messageData);
    
    // Get the deviceID and device_registration_token from DB
    const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
      attributes: ["device_id", "device_registration_token"],
      where: {
        userId: userId,
      },
    });

    const registrationTokens = [];

    for (const device of deviceRegistrationToken) {
      registrationTokens.push(device.device_registration_token);
    }
    console.log({ registrationTokens });

    // Send a message to the device corresponding to the provided
    // registration token.
    const payload = {
      data: messageData,
      tokens: registrationTokens,
    };
    console.log({ payload });
    return new Promise((resolve, reject) => {
      getMessaging()
        .sendEachForMulticast(payload)
        .then((response) => {
          console.log(response);
          if (response.successCount > 0) {
            return resolve(true);
          } else {
            return reject(false);
          }
        });
    });
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log(err);
  }

};

module.exports.CreateUserNotification = async (userId, message) => {
  try {

    const {type,title,body,data}=JSON.parse(message);
    const setNotification = { type,title,message:body, userId, notify: "user" };
    if(data) {
      setNotification['data'] = JSON.stringify(data);
    }
    const notification = await db.Notification.create(setNotification)

    const setUserNotification = {
      userId,
      notificationId: notification?.id,
    };

    await db.UserNotification.create(setUserNotification);


  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log(err);
  }
};

module.exports.CreateAdminNotification = async (userId, adminUserId, message, body) => {
  console.log(userId, message);
  let transaction;
  try {

    const setNotification = { message, title: body?.title || null, userId, notify: "admin", type: body?.type || "notification", data: JSON.stringify(body) };
    const notification = await db.Notification.create(setNotification, {

    });

    const setAdminNotification = {
      userId: adminUserId,
      notificationId: notification?.id,
    };

    await db.UserNotification.create(setAdminNotification, {

    });


  } catch (error) {

    console.log(error);
  }
};
