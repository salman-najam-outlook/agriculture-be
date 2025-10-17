// configuring twilio
const twilio = require("twilio")(
  process.env.TWILIO_ACC_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    logLevel: 'debug'
  }
);

// const AfricasTalking = require('africastalking');
// const africasTalking = AfricasTalking({
//   apiKey: process.env.AFRICATALKING_API_KEY,     // Specify your API Key here
//   username: process.env.AFRICATALKING_USERNAME       // Specify your Africa's Talking username here
// });



// loading components
const mail = require(rootPath + "/components/email");

// send success response
exports.createOTP = async () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

// send success response
exports.fileFilterGen = (mimeArr) => {
  return function (req, file, cb) {
    console.log("inside filter multer", file);
    // valid mime list
    const whiteListMimeTypes = mimeArr;
    let mimetype = file.mimetype.trim().toLowerCase(); // mimetype of the file
    // chekc if valid mimetype or not
    if (whiteListMimeTypes.includes(mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Invalid File Type"));
    }
  };
};

// sending sms with twilio
exports.sendSMS = async (data) => {
  try {
    const { body, to } = data;
    const from = process.env.TWILIO_FROM;
    const info = await twilio.messages.create({ body, from, to });
    return info;
  } catch (err) {
    console.error("Twilio error: ", err.message);
    throw new Error(`Failed to send SMS: ${err.message}`);
  }
};

// Twilio verify service
exports.sendTwilioSMS = async (data) => {
  try {
    const { to } = data
    const sendVerification = await twilio.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({to, channel: 'sms'})
    return sendVerification
  } catch (error) {
    console.log("twilio error: ", error.message)
    throw error
  }
}

exports.verifyTwilioSMS = async (data) => {
  try {
    const { to, code } = data
    const sendVerification = await twilio.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to, code })
    return sendVerification.status === 'approved'
  } catch (error) {
    console.log("twilio error: ", error.message)
    throw error
  }
}

/**
 * @desc  Send bulk SMS to desired numbers bypassing numbers list as parameter
 * @param {@} messageBody
 * @param {*} numberList
 */

exports.sendBulkMessages = async (messageBody, numberList) => {
  var numbers = [];
  for (i = 0; i < numberList.length; i++) {
    numbers.push(
      JSON.stringify({
        binding_type: "sms",
        address: numberList[i],
      })
    );
  }
  const notificationOpts = {
    toBinding: numbers,
    body: messageBody,
  };

  const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;
  const sid = await twilio.notify
    .services(TWILIO_SERVICE_SID)
    .notifications.create(notificationOpts);

  return sid;
};

/**
 * @desc validate if mobile number is valid or not with twilio
 */
exports.validateMobileNumber = async (mobile) => {
  const result = await twilio.lookups.v1
    .phoneNumbers(mobile)
    .fetch({ type: ["carrier"] });
  return result;
};

// sending email with smtp
exports.sendEmail = async (data) => {
  try {
    const { html, to, subject, attachment = null } = data;
    const from = process.env.SMTP_SENDER; // sender address
    // sending email
    let info = await mail.transporter.sendMail({ from, to, subject, html, attachment });
    return info;
  } catch (err) {
    console.log("Nodemailer/Email error: ", err.message);
    throw err;
  }
};

// for logging errors
exports.logErrorOccurred = async(filePath, err) => {
  console.log(filePath);
  console.log("Inside Catch ************* Problem:" + err.message);
  console.log("Inside Catch ************* Problem:" + err.stack);

};

// check if variabel is not empty
exports.notEmpty = (varValue) => {
  if (
    varValue != null &&
    typeof varValue != "undefined" &&
    varValue.length > 0
  ) {
    return true;
  }
  return false;
};

// check if variabel is not empty
// exports.notEmpty = (varValue) => {
//   if (
//     varValue != null &&
//     typeof varValue != "undefined" &&
//     varValue.length > 0
//   ) {
//     return true;
//   }
//   return false;
// };

// check if value is object or not
exports.isObject = (objValue) => {
  return (
    typeof objValue === "object" &&
    !Array.isArray(objValue) &&
    objValue !== null &&
    objValue.constructor === Object
  );
};

/**
 * @description to generate formatted id
 */
exports.getFormattedId = (pref, id) => {
  // generate formatted number
  const number =
    pref + id.toString().padStart(6, "0") + Date.now().toString().slice(-6);
  return number;
};

// remove empty values from the object
exports.removeEmptyValuesFromObject = (set) => {
  Object.keys(set).forEach((key) => {
    set[key] == undefined || set[key] == null || set[key] == ""
      ? delete set[key]
      : {};
  });
};

exports.addDays = (days, date = new Date()) => {
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + days)
  return returningDate
}

exports.sendSMSWithAfricaTalking = async({ body, to }) => {
  const sms = africasTalking.SMS;
  const options = {
      to: [to], // Africa's Talking expects an array of recipients
      message: body,
      enqueue: true  // Optional: Used for bulk SMS
  };

  try {
      const response = await sms.send(options);
      return response;
  } catch (error) {
      console.error('SMS sending failed:', error);
      throw error; // Rethrow the error for further handling
  }
}
exports.checkIfInteger = (value) => {
  if (typeof value !== 'number') {
      return false;
  }
  return true;
}

/**
 * Get all user IDs within an organization or sub-organization
 * @param {Object} db - Database instance
 * @param {number} organizationId - Main organization ID
 * @param {number|null} subOrganizationId - Sub-organization ID (optional)
 * @returns {Array} Array of user IDs
 */
exports.getUserIdsByOrganization = async (db, organizationId, subOrganizationId = null) => {
  try {
    let whereClause = {
      organization: organizationId,
      active: true
    };

    // If sub-organization is specified, filter by it
    if (subOrganizationId) {
      whereClause.subOrganizationId = subOrganizationId;
    }

    const users = await db.user.findAll({
      where: whereClause,
      attributes: ['id'],
      raw: true
    });

    return users.map(user => user.id);
  } catch (error) {
    console.error('Error getting user IDs by organization:', error);
    return [];
  }
};
