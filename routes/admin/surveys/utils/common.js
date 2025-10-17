const db = require(rootPath + '/models');
const _ = require("lodash");
const { Op, where } = require("sequelize");
const moment = require("moment");
const {
  notEmpty,
} = require(rootPath + "/helpers/general");
const { sendPushNotification } = require(rootPath +
  "/helpers/pushNotification");

module.exports.publishSurvey = async (survey) => {
  try {
    await db.surveysList.update(
      { status: "Active" },
      {
        where: { id: survey.id },
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
      const notification = await db.Notification.create(
        {
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
        },
        { transaction }
      );

      let setUserNotification;
      setUserNotification = {
        userId: user.userId,
        notificationId: notification?.id,
      };
      await db.UserNotification.create(setUserNotification, {
        transaction,
      });
      await transaction.commit();
      const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
        attributes: ["device_registration_token"],
        where: {
          userId: user.userId,
        },
      });

      const firebaseToken = [];

      for (const device of deviceRegistrationToken) {
        firebaseToken.push(device.device_registration_token);
      }

      const data = {
        surveyId: `${survey.id}`,
        title: `You have been invited to "${survey.title}"`,
        description: `${survey.description}`,
        notification_type: "survey",
        message: `You have been invited to "${survey.title}"`,
        userId: `${user.id}`,
      };

      if (firebaseToken.length > 0) {
        const response = await sendPushNotification(
          firebaseToken,
          `You have been invited to "${survey.title}"`,
          data
        );
      }
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports.getUsers = async (params, organization) => {
  let {
    membershipTypes,
    membershipValidity,
    remainingDays,
    searchPhrase,
    accountProgress: accountProgressInPercent,
    gender: genderFilter,
    country: countryFilter,
    region: regionFilter,
    page,
    limit,
    startDate,
    endDate,
  } = params;
  
  let query = {};

  let membershipWhere = {
    ...(_.isEmpty(membershipTypes)
      ? null
      : { membership_type: membershipTypes }),
  };

  switch (membershipValidity) {
    case "expired":
      membershipWhere = {
        ...membershipWhere,
        membershipValidityWithExtension: db.Sequelize.where(
          db.Sequelize.fn(
            "ADDDATE",
            db.Sequelize.col("membershipValidity"),
            db.Sequelize.fn("COALESCE", "membershipExtendedDays", 0)
          ),
          "<",
          moment.utc().format("YYYY-MM-DD")
        ),
      };
      break;
    case "lessThen1Month":
      membershipWhere = {
        ...membershipWhere,
        membershipValidityWithExtension: db.Sequelize.where(
          db.Sequelize.fn(
            "ADDDATE",
            db.Sequelize.col("membershipValidity"),
            db.Sequelize.fn("COALESCE", "membershipExtendedDays", 0)
          ),
          "<",
          moment.utc().add(1, "M").format("YYYY-MM-DD")
        ),
      };
      break;
    case "1-8Months":
      membershipWhere = {
        ...membershipWhere,
        membershipValidityWithExtension: db.Sequelize.where(
          db.Sequelize.fn(
            "ADDDATE",
            db.Sequelize.col("membershipValidity"),
            db.Sequelize.fn(
              "COALESCE",
              db.Sequelize.col("membershipExtendedDays"),
              0
            )
          ),
          "BETWEEN",
          [
            moment.utc().add(1, "M").format("YYYY-MM-DD"),
            moment.utc().add(8, "M").format("YYYY-MM-DD"),
          ]
        ),
      };
      break;
    case "6-12Months":
      membershipWhere = {
        ...membershipWhere,
        membershipValidityWithExtension: db.Sequelize.where(
          db.Sequelize.fn(
            "ADDDATE",
            db.Sequelize.col("membershipValidity"),
            db.Sequelize.fn(
              "COALESCE",
              db.Sequelize.col("membershipExtendedDays"),
              0
            )
          ),
          "BETWEEN",
          [
            moment.utc().add(6, "M").format("YYYY-MM-DD"),
            moment.utc().add(12, "M").format("YYYY-MM-DD"),
          ]
        ),
      };
      break;
    case "moreThan1Year":
      membershipWhere = {
        ...membershipWhere,
        membershipValidityWithExtension: db.Sequelize.where(
          db.Sequelize.fn(
            "ADDDATE",
            db.Sequelize.col("membershipValidity"),
            db.Sequelize.fn("COALESCE", "membershipExtendedDays", 0)
          ),
          ">=",
          moment.utc().add(1, "y").format("YYYY-MM-DD")
        ),
      };
      break;
    case "custom":
      membershipWhere = {
        ...membershipWhere,
        membershipValidityWithExtension: db.Sequelize.where(
          db.Sequelize.fn(
            "ADDDATE",
            db.Sequelize.col("membershipValidity"),
            db.Sequelize.fn("COALESCE", "membershipExtendedDays", 0)
          ),
          ">=",
          moment
            .utc()
            .add(remainingDays || 0, "d")
            .format("YYYY-MM-DD")
        ),
      };
      break;
  }

  const progressLiteral = db.sequelize.literal(`(
    SELECT farmCount + geofenceCount + geofenceCount + cropCount + equipmentCount + goalCount + auditCount + docCount FROM (
      SELECT
      COALESCE ((SELECT 1 FROM (SELECT COUNT(*) as ct FROM user_farms uf WHERE userId = user.id and uf.isDeleted = 0 HAVING ct > 0) f), 0) as farmCount,
      COALESCE ((SELECT 1 FROM (SELECT COUNT(*) as ct FROM geofences g WHERE g.userId = user.id HAVING ct > 0) g), 0) as geofenceCount,
      COALESCE ((SELECT 1 FROM (SELECT COUNT(*) as ct FROM user_farm_crops ufc WHERE ufc.userId = user.id HAVING ct > 0) c), 0) as cropCount,
      COALESCE ((SELECT  1 FROM (SELECT COUNT(*) as ct FROM equipment e WHERE e.userID = user.id HAVING ct > 0) e), 0) as equipmentCount,
      COALESCE ((SELECT 1 FROM (SELECT COUNT(*) as ct FROM user_goals ug WHERE ug.userId = user.id AND ug.deletedAt IS NULL HAVING ct > 0) g), 0) as goalCount,
      COALESCE ((SELECT 1 FROM (SELECT COUNT(*) as ct FROM soil_fertility_audit sfa WHERE sfa.userId = user.id HAVING ct > 0) a), 0) as auditCount,
      COALESCE ((SELECT 1 FROM (SELECT COUNT(*) as ct FROM document d WHERE d.userId = user.id HAVING ct > 0) d), 0) as docCount
  ) progress)`);

  query = {
    attributes: [
      "id",
      "firstName",
      "middleName",
      "lastName",
      "fullName",
      "email",
      "active",
      "gender",
      "country",
      "stateId",
      "createdAt",
      "userType",
      [progressLiteral, "accountProgress"],
    ],
    include: [
      {
        model: db.Roles,
        as: "user_role_assoc",
        through: { model: db.UserRoles, attributes: [] },
        attributes: ["id", "name"],
        required: false,
        where: {
          id: {
            [Op.eq]: "end_user",
          },
        },
      },
      {
        model: db.user_farm,
        as: "farms",
        required: true, 
        attributes: ["userId", "farmName"],
        where: {
          userId: db.Sequelize.col("user.id"),
        },
      },
      {
        ...(_.isEmpty(membershipWhere)
          ? null
          : { where: { ...membershipWhere } }),
        model: db.activationKeys,
        as: "activation",
        include: [
          {
            model: db.Membership,
            as: "membership_assoc",
            attributes: [
              "membership_type",
              "membership_duration",
              "membership_duration_unit",
            ],
          },
        ],
        attributes: [
          "membershipExtendedDays",
          "membershipExtensionReason",
          "membership_type",
          "membershipValidity",
        ],
      },
    ],
    distinct: true,
  };

  query.where = { organization };
  if (searchPhrase) {
    query.where = {
      ...query.where,
      [Op.or]: [
        { firstName: { [Op.like]: `%${searchPhrase}%` } },
        { middleName: { [Op.like]: `%${searchPhrase}%` } },
        { lastName: { [Op.like]: `%${searchPhrase}%` } },
        { email: { [Op.like]: `%${searchPhrase}%` } },
      ],
    };
  }

  if (genderFilter) {
    query.where = { ...query.where, gender: genderFilter };
  }

  if (countryFilter) {
    query.where = { ...query.where, country: countryFilter };
  }

  if (regionFilter) {
    query.where = { ...query.where, stateId: regionFilter };
  }

  if (
    accountProgressInPercent &&
    !isNaN(Number(accountProgressInPercent))
  ) {
    const accountProgress = (Number(accountProgressInPercent) / 100) * 8;
    query.where = {
      ...query.where,
      [Op.and]: [
        ...(query.where[Op.and] ?? []),
        db.sequelize.where(progressLiteral, {
          [Op.gte]: accountProgress,
        }),
      ],
    };
  }

  if (notEmpty(page) && notEmpty(limit)) {
    limit = parseInt(limit);
    query.offset = (page - 1) * limit;
    query.limit = limit;
  }
  if (startDate) {
    const formattedFromDate = moment(startDate).startOf('day');
    query.where = {
      ...query.where,
      createdAt: {
        [Op.gte]: formattedFromDate 
      }
    };
  }
  if (endDate) {
    const formattedFromDate = moment(endDate).endOf('day');
    const endDateFilter = {
      [Op.lte]: formattedFromDate
    };
    query.where.createdAt = { ...query.where.createdAt, ...endDateFilter }
  }
  let getAppUsers = await db.user.findAndCountAll(query);
  return getAppUsers;
}
