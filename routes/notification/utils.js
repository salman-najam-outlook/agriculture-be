const db = require(rootPath + "/models");
const { Op, where } = require("sequelize");

const { sendPushNotification } = require(rootPath +
  "/helpers/pushNotification");

exports.createNotification = async (req, ) => {
  const { id: userId } = req.user;
  const {title, type, notify, message, users, data } = req.body;

  const setNotification = { title, type, message, userId, notify, data: data || null };

  const notification = await db.Notification.create(setNotification);

  let setUserNotification;
  switch (notify) {
    case "user":
      setUserNotification = users?.map((userId) => ({
        userId,
        notificationId: notification?.id,
      }));
      break;
    case "admin": {
      setUserNotification = users?.map((userId) => ({
        userId,
        notificationId: notification?.id,
      }));
      break;
    }
  }
  await db.UserNotification.bulkCreate(setUserNotification);

  const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
    attributes: ["device_registration_token"],
    where: {
      userId: users,
    },
  });

  const firebaseToken = [];

  for (const device of deviceRegistrationToken) {
    firebaseToken.push(device.device_registration_token);
  }

  if (firebaseToken.length > 0) {
    const response = await sendPushNotification(firebaseToken, message);
    console.log(response);
  }
  return notification;
};

exports.createAssessmentNotification = async (
  title,
  message,
  users,
  assessmentId,
  userId
) => {
  const notify = "user";
  const type = "assessment";

  const assessmentNotification = {
    title,
    type,
    message,
    userId,
    notify,
    data: JSON.stringify({
      assessmentId: assessmentId,
    }),
  };

  const notification = await db.Notification.create(assessmentNotification);

  const userNotifications = users?.map((userId) => ({
    userId,
    notificationId: notification?.id,
  }));

  if (userNotifications && userNotifications.length > 0) {
    await db.UserNotification.bulkCreate(userNotifications);
  }

  const deviceRegistrationTokens = await db.UserRegistrationToken.findAll({
    attributes: ["device_registration_token"],
    where: {
      userId: users,
    },
  });

  const firebaseTokens = [];

  for (const device of deviceRegistrationTokens) {
    firebaseTokens.push(device.device_registration_token);
  }

  const pushNotificationData = {
    assessmentId: String(assessmentId),
    title: String(title),
    notification_type: String(type),
    userId: String(userId),
  };

  if (firebaseTokens.length > 0) {
    await sendPushNotification(firebaseTokens, message, pushNotificationData);
  }

  return notification;
};


// TODO: Move it to appropriate dir
exports.allAdmins = async (organization) => {
  let adminRoles = [];
  adminRoles = await db.Roles.findAll({
    where: {
      id: {
        [Op.not]: ["end_user"],
      },
    },
    attributes: ["id"],
    raw: true,
  });
  adminRoles = adminRoles.map((ar) => ar.id);
  let query = {};
  query = {
    attributes: [
      "id",
      "fullName",
      "firstName",
      "middleName",
      "lastName",
      "mobile",
      "active",
      "email",
      "countryCode",
      "countryId",
      "stateId",
      "city",
    ],
    include: [
      {
        model: db.Roles,
        as: "user_role_assoc",
        through: { model: db.AdminUserRoles, attributes: [] },
        attributes: ["id", "name"],
        required: true,
        where: {
          id: {
            [Op.in]: adminRoles,
          },
        },
      },
      {
        model: db.Departments,
        as: "user_dept_assoc",
        through: { model: db.UserDepartment, attributes: [] },
        attributes: ["id", "name"],
      },
    ],
  };
  query.where = { organization };
  let listRes;
  listRes = await db.user.findAll(query);
  listRes = listRes.map((ar) => ar.id);

  return listRes;
};

// TODO: Move it to appropriate dir
exports.getWeightUnit = (weight, unit) => {
  const factor = unit.factor ?? 1;
  return weight * factor;
};

exports.convertToAlertsUnit = (weight, unit) => {
  const factor = unit.factor ?? 1;
  return `${(weight / factor).toFixed(2)}`;
}

exports.convertToHectares = async (totalWeightInKg) => {
  const areaUnits = await db.UnitsList.findOne({
    where: { name: "Hectares" },
    attributes: ["factor"],
  });

  const conversionFactor = areaUnits?.factor || 1;

  return totalWeightInKg / conversionFactor;
};


