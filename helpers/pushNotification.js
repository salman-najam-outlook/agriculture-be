"use strict";

const { getMessaging } = require("firebase-admin/messaging");
const db = require(rootPath + "/models");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

// Send push notification with deviceId and registration token
module.exports.sendPushNotification = async (firebaseToken, message, data) => {
  const notificationData = { ...data }
  try {
    const payload = {
      notification: {
        title: `Dimitra`,
        body: message,
      },
      tokens: firebaseToken,
    }

    // Only add data field if data is provided and is an object
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      payload.data = data;
    }

    return new Promise((resolve, reject) => {
      getMessaging()
        .sendEachForMulticast(payload)
        .then((response) => {
          console.log(response)
          return resolve(response)
        });
    });
  } catch (err) {
    logErrorOccurred(__filename, err)
    console.log(err)
  }
}