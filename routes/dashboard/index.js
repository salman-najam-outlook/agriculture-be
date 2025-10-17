const express = require("express");
// import fs
const fs = require('fs');
const router = express.Router();
const { logErrorOccurred } = require(rootPath + "/helpers/general");
// loading models
const db = require(rootPath + "/models");
// loading middleware
const auth = require(rootPath + "/middleware/auth");
const {getFarmerWhere,generateCSVContent,fetchPurchaseOrders} = require('./utils.js');
// loading helpers
const {
  successResp,
  errorRespSync,
  successRespSync,
  errorResp,
  serverError,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const translation = require(rootPath + "/middleware/translation");
const path = require("path");
const logsPath = path.join(__dirname, "../../activity_log");
const { isEmpty } = require("lodash");
const moment = require("moment");

const { dashboardGraphFilterValidation } = require(rootPath +
  "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { Op, sequelize } = require("sequelize");

const getUsersSelectedMemberships = async (
  queryConstraint,
  period,
  queryCondition,
  org
) => {
  const getQueryData = await db.sequelize.query(
    `SELECT count(*) as count, user_membership.membership_type as membershipType FROM users_user_membership_map left join user_membership on users_user_membership_map.membership_id = user_membership.id where user_membership.org_id = ${org} and ${queryConstraint}(users_user_membership_map.createdAt) = '${period}' ${queryCondition} group by membership_type`,
    {
      type: db.sequelize.QueryTypes.SELECT,
      limit: 1,
      raw: true,
    }
  );
  const havingMembershipTypes = getQueryData.map(
    (queryDataObj) => queryDataObj.membershipType
  );
  const getNotHavingUserMemberships = await db.Membership.findAll({
    where: {
      membership_type: { [Op.notIn]: havingMembershipTypes },
      org_id: org,
    },
    attributes: [
      [db.sequelize.literal("(select 0)"), "count"],
      ["membership_type", "membershipType"],
    ],
    raw: true,
    order: [["id", "ASC"]],
  });
  let getQueryDataFinal = getQueryData.concat(getNotHavingUserMemberships);
  return getQueryDataFinal;
};

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     description: fetch dashboard data
 *     tags: [Admin Dashboard]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "allowances": { "maxUserAllowed": "123", "satelliteReportsAllowed": "234", "advacedReportsAllowed": "123", "subscriptionUpTp": "12121" }, "users": { "activeUsers": 177, "deactivatedUsers": 1, "registeredUsers": 178, "vaildMemberships": 1234 }, "membershipTypes": [ { "count": 2, "membershipTypes": "member namde" }, { "count": 1, "membershipTypes": "coffee farmer" } ], "membershipDurations": { "lessThanMonth": 0, "omeToSixMonths": 2, "sixMonthsToOneYear": 0, "moreThanYear": 1 }, "cropOverview": { "plantation": 1, "coffeeData": 23 } } }
 */
router.get("/", auth, validationErrorHandler, async (req, res) => {
  try {
    let filters = [];

    if (req.query.start_date && req.query.end_date) {
      filters.push(
        `um.createdAt >= '${req.query.start_date}' AND um.createdAt <= '${req.query.end_date}'`
      );
    }

    if (req.query.gender) {
      filters.push(`u.gender = '${req.query.gender}'`);
    }

    if (req.query.countryCode) {
      filters.push(`u.countryIsoCode = '${req.query.countryCode}'`);
    }

    const filter = filters.length > 0 ? filters.join(" AND ") + " AND" : "";
    const org = req.user.organization;

    const baseQuery = `
      FROM user_membership AS um
      INNER JOIN users_user_membership_map AS uumm ON um.id = uumm.membership_id
      INNER JOIN users AS u ON uumm.user_id = u.id
      WHERE ${filter} um.org_id = ${org}
    `;
    const membershipTypesQuery = `
      SELECT 
      COUNT(um.id) AS count,
      um.membership_type AS membershipTypes,
      SUM(um.membership_duration_in_days) AS duration
      ${baseQuery}
      GROUP BY um.membership_type
    `;

    // Query for membership durations
    const membershipDurationsQuery = `
      SELECT 
      (SELECT COUNT(um.id) AS count
      ${baseQuery} AND 
      ((um.membership_duration_unit = 'week(s)' AND um.membership_duration <= 4) 
      OR (um.membership_duration_unit = 'day(s)' AND um.membership_duration <= 31))) AS lessThanMonth, 
      
      (SELECT COUNT(um.id) AS count
      ${baseQuery} AND 
      ((um.membership_duration_unit = 'week(s)' AND um.membership_duration >= 5) 
      OR (um.membership_duration_unit = 'month(s)' AND um.membership_duration BETWEEN 1 AND 6))) AS oneToSixMonths, 
      
      (SELECT COUNT(um.id) AS count
      ${baseQuery} AND 
      um.membership_duration_unit = 'month(s)' AND um.membership_duration BETWEEN 6 AND 12) AS sixMonthsToOneYear, 
      
      (SELECT COUNT(um.id) AS count
      ${baseQuery} AND 
       ((um.membership_duration_unit = 'year(s)' AND um.membership_duration > 1) 
       OR (um.membership_duration_unit = 'month(s)' AND um.membership_duration > 12))) AS moreThanYear
       `;
    // Execute the queries
    const [membershipTypes, membershipDurations] = await Promise.all([
      db.sequelize.query(membershipTypesQuery, {
        type: db.sequelize.QueryTypes.SELECT,
        raw: true,
      }),
      db.sequelize.query(membershipDurationsQuery, {
        type: db.sequelize.QueryTypes.SELECT,
        raw: true,
      }),
    ]);

    const allowances = {
      // this is static data, it needs to be dynamic whenever allowances modules are done
      maxUserAllowed: "123",
      sateliteReportsAllowed: "234",
      advancedReportsAllowed: "123",
      subscriptionUpTo: "12121",
      rolesAllowed: "Farmer, Buying Station, Warehouse",
      modulesAllowed: 26,
    };

    // Get coffee overview data
    const [plantation, { coffeeData }] = await Promise.all([
      db.Plantations.count({
        distinct: true,
        col: "id",
      }),
      db.BuyingStationOrder.findOne({
        raw: true,

        attributes: [
          [
            db.Sequelize.fn(
              "SUM",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("coffeeCherryQty"),
                0
              )
            ),
            "coffeeData",
          ],
        ],
      }),
    ]);

    const cropOverview = {
      plantation: plantation || 0,
      coffeeData: coffeeData || 0,
    };

    const Response = {
      allowances,
      membershipTypes,
      membershipDurations: membershipDurations[0],
      cropOverview,
    };

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: Response,
      })
    );
  } catch (err) {
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
});

router.get("/users", auth, validationErrorHandler, async (req, res) => {
  try {
    const { startDate, endDate, gender, countryCode } = req.query;
    const org = req.user.organization;
    let filters = [];
    let membershipFilters = [];

    if (startDate && endDate) {
      const startISOString = new Date(startDate).toISOString();
      const endISOString = new Date(endDate).toISOString();
      const dateFilter = `createdAt BETWEEN '${startISOString}' AND '${endISOString}'`;
      filters.push(`u.${dateFilter}`);
      membershipFilters.push(`um.${dateFilter}`);
    }

    if (gender) {
      const genderFilter = `u.gender = '${gender}'`;
      filters.push(genderFilter);
      membershipFilters.push(genderFilter);
    }

    if (countryCode) {
      const countryFilter = `u.countryIsoCode = '${countryCode}'`;
      filters.push(countryFilter);
      membershipFilters.push(countryFilter);
    }

    const userFilter =
      filters.length > 0 ? filters.join(" AND ") + " AND " : "";
    const membershipFilter =
      membershipFilters.length > 0
        ? membershipFilters.join(" AND ") + " AND "
        : "";

    const usersQuery = `
      SELECT 
        (SELECT COUNT(u.id) FROM users u 
         JOIN user_roles ur ON u.id = ur.user_id 
         WHERE ${userFilter} ur.role_id = 'end_user' 
         AND u.organization = ${org} 
         AND u.active = 1) AS activeUsers, 

        (SELECT COUNT(u.id) FROM users u 
         JOIN user_roles ur ON u.id = ur.user_id 
         WHERE ${userFilter} ur.role_id = 'end_user' 
         AND u.organization = ${org} 
         AND u.active = 0) AS deactivatedUsers, 

        (SELECT COUNT(u.id) FROM users u 
         JOIN user_roles ur ON u.id = ur.user_id 
         WHERE ${userFilter} ur.role_id = 'end_user' 
         AND u.organization = ${org}) AS registeredUsers, 

        (SELECT COUNT(u.id) FROM users u 
         JOIN user_roles ur ON u.id = ur.user_id 
         WHERE ${userFilter} ur.role_id = 'end_user' 
         AND u.organization = ${org} 
         AND u.isLogin = 0) AS offlineUsers,

        (SELECT COUNT(um.id) FROM user_membership um 
         JOIN users_user_membership_map umm ON um.id = umm.membership_id 
         JOIN users u ON umm.user_id = u.id 
         WHERE ${membershipFilter} u.organization = ${org} 
         AND um.membership_duration_in_days > 0) AS validMemberships
    `;

    const users = await db.sequelize.query(usersQuery, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: users[0],
      })
    );
  } catch (err) {
    console.error("Error fetching users data:", err); // Log the error
    return res.status(error.code.SERVER_ERROR).json(err.toString());
  }
});

router.post(
  "/users",
  auth,
  dashboardGraphFilterValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { filterType, data } = req.body;
      const org = req.user.organization;
      let condition = "";
      if (filterType == "week" || filterType == "custom") {
        const { startDate, endDate } = data;
        condition = ` AND users.createdAt between '${startDate}' and '${endDate}'`;
      }
      if (filterType == "month") {
        const { month, year } = data;
        condition = `AND MONTH(users.createdAt) = '${month}' AND YEAR(users.createdAt) = '${year}'`;
      }
      if (filterType == "year") {
        const { year } = data;
        condition = `AND YEAR(users.createdAt) = '${year}'`;
      }

      const users = await db.sequelize.query(
        `Select (select COUNT(id) from users WHERE organization = ${org} and id IN (SELECT user_id FROM  user_roles WHERE user_roles.role_id = 'end_user') AND active = 1 ${condition} LIMIT 1) as activeUsers , (select COUNT(id) from users WHERE organization = ${org} and id IN (SELECT user_id FROM  user_roles WHERE user_roles.role_id = 'end_user') AND active = 0 ${condition} LIMIT 1) as deactivatedUsers,  (select COUNT(id) from users WHERE organization = ${org} and id IN (SELECT user_id FROM  user_roles WHERE user_roles.role_id = 'end_user') ${condition} LIMIT 1) as registeredUsers`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          limit: 1,
          raw: true,
        }
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: users,
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);

router.post(
  "/membershipTypes",
  auth,
  dashboardGraphFilterValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { filterType, data } = req.body;
      const org = req.user.organization;
      let condition = "";
      if (filterType == "week" || filterType == "custom") {
        const { startDate, endDate } = data;
        condition = `and user_membership.createdAt between '${startDate}' and '${endDate}'`;
      }
      if (filterType == "month") {
        const { month, year } = data;
        condition = `and MONTH(user_membership.createdAt) = '${month}' AND YEAR(user_membership.createdAt) = '${year}'`;
      }
      if (filterType == "year") {
        const { year } = data;
        condition = `and YEAR(user_membership.createdAt) = '${year}'`;
      }
      const membershipTypes = await db.sequelize.query(
        `SELECT count(id) as count, membership_type as membershipTypes FROM user_membership where org_id = ${org} ${condition} group by membership_type`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          limit: 1,
          raw: true,
        }
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: membershipTypes,
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);

router.post(
  "/membershipDurations",
  auth,
  dashboardGraphFilterValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { filterType, data } = req.body;
      const org = req.user.organization;
      let condition = "";
      if (filterType == "week" || filterType == "custom") {
        const { startDate, endDate } = data;
        condition = `AND user_membership.createdAt between '${startDate}' and '${endDate}'`;
      }
      if (filterType == "month") {
        const { month, year } = data;
        condition = `AND MONTH(user_membership.createdAt) = '${month}' AND YEAR(user_membership.createdAt) = '${year}'`;
      }
      if (filterType == "year") {
        const { year } = data;
        condition = `AND YEAR(user_membership.createdAt) = '${year}'`;
      }
      const membershipDurations = await db.sequelize.query(
        `SELECT (SELECT count(id) as count FROM user_membership WHERE org_id = ${org} and ((membership_duration_unit = 'week(s)' AND membership_duration <= 4) OR (membership_duration_unit = 'day(s)' AND membership_duration <= 31)) ${condition}) as 'lessThanMonth', (SELECT count(id) as count FROM user_membership WHERE org_id = ${org} and ((membership_duration_unit = 'week(s)' AND membership_duration >= 5) OR (membership_duration_unit = 'month(s)' AND membership_duration between 1 AND 6)) ${condition}) as oneToSixMonths, (SELECT count(id) as count FROM user_membership WHERE org_id = ${org} and membership_duration_unit = 'month(s)' AND membership_duration between 6 AND 12 ${condition}) as 'sixMonthsToOneYear', (SELECT count(id) as count FROM user_membership WHERE org_id = ${org} and ((membership_duration_unit = 'year(s)' AND membership_duration > 1) OR (membership_duration_unit = 'month(s)' AND membership_duration > 12))${condition}) as 'moreThanYear'`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          limit: 1,
          raw: true,
        }
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: membershipDurations["0"],
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);

router.post(
  "/membershipTypesPeriodically",
  auth,
  dashboardGraphFilterValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { filterType, data } = req.body;
      const org = req.user.organization;
      let condition = "";
      let queryConstraint = "";
      let xAxis = [];
      if (filterType == "week" || filterType == "custom") {
        const { startDate, endDate } = data;
        condition = `AND users_user_membership_map.createdAt between '${startDate}' and '${endDate}'`;
        xAxis = [
          "monday",
          "tuesday",
          "wednesday",
          "thrusday",
          "friday",
          "saturday",
          "sunday",
        ];
        queryConstraint = "dayname";
      }
      if (filterType == "month") {
        const { startDate, endDate } = data;
        const firstDate = new Date(startDate).getDate();
        const lastdate = new Date(endDate).getDate();
        condition = `AND users_user_membership_map.createdAt BETWEEN '${startDate}' AND '${endDate}'`;
        queryConstraint = "DAY";
        for (let i = firstDate; i <= lastdate; i++) {
          xAxis.push(i);
        }
      }

      if (filterType == "year") {
        const { year } = data;
        condition = `AND YEAR(users_user_membership_map.createdAt) = '${year}'`;
        xAxis = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        queryConstraint = "MONTHNAME";
      }

      let response = {};
      for (let i in xAxis) {
        const abcd = await getUsersSelectedMemberships(
          queryConstraint,
          xAxis[i],
          condition,
          org
        );
        response[xAxis[i]] = abcd;
        // return false;
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: response,
        })
      );
    } catch (err) {
      return res.status(error.code.SERVER_ERROR).json(err.toString());
    }
  }
);

/**
 * @swagger
 * /admin/dashboard/modules:
 *   get:
 *     description: list all the modules
 *     tags: [Admin Dashboard All Modules]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "allModules": [ { "id": "community_admin", "name": "Community Admin", "modules": [ { "name": "Activation" }, { "name": "Activity Log" }, { "name": "Admin Roles" }, { "name": "Dashboard" }, { "name": "FAQ" }, { "name": "Membership" }, { "name": "Permissions" }, { "name": "Tickets" }, { "name": "Profile Authentication" }, { "name": "User Listing" } ] } ] } }
 */
router.get("/modules", auth, async (req, res) => {
  try {
    const allModules = await db.ParentModules.findAll({
      include: [{ attributes: ["name"], model: db.Modules, as: "modules" }],
      attributes: ["id", "name"],
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { allModules },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/buying-station-production", auth, async (req, res) => {
  try {
    const org = req.user.organization;
    const {
      startDate,
      endDate,
      farmer,
      gender,
      countryCode,
      limit = 5,
    } = req.query;
    let filters = [];

    // Adding date filter
    if (startDate && endDate) {
      const startISOString = new Date(startDate).toISOString();
      const endISOString = new Date(endDate).toISOString();
      const dateFilter = `createdAt BETWEEN '${startISOString}' AND '${endISOString}'`;
      filters.push(`bspb.${dateFilter}`);
    }

    // Adding gender filter
    if (gender) {
      filters.push(`u.gender = '${gender}'`);
    }

    // Adding farmer filter
    if (farmer) {
      filters.push(`u.id = '${farmer}'`);
    }

    // Adding country filter
    if (countryCode) {
      filters.push(`u.countryIsoCode = '${countryCode}'`);
    }

    // Organization filter
    filters.push(`u.organization = '${org}'`);

    // Combine all filters into a single string
    const filter = filters.length > 0 ? filters.join(" AND ") + " AND" : "";

    let productionChartData = [];

    // Getting final Score of dry milling at stage of green beans
    const buyingStationParchmentOut = await db.sequelize.query(
      `SELECT 
          DATE_FORMAT(endDate, '%Y') AS year, 
          SUM(parchmentOut) AS final_value, 
          firstName, 
          lastName 
        FROM 
            BuyingStationProcessingBatches bspb 
        JOIN 
            users u ON bspb.buyingStationId = u.id 
        WHERE 
            ${filter} 
            organization = '${org}' 
        GROUP BY 
            u.id
        ORDER BY final_value DESC
        LIMIT :limit;
            `,
      {
        replacements: { limit: parseInt(limit) },
        type: db.sequelize.QueryTypes.SELECT,
        limit: 1,
        raw: true,
      }
    );

    for (const data of buyingStationParchmentOut) {
      const fullNameArr = [];
      if (data.firstName) fullNameArr.push(data.firstName);
      if (data.lastName) fullNameArr.push(data.lastName);
      productionChartData.push({
        full_name: fullNameArr.join(" "),
        final_value: data.final_value || 0,
        year: data.year,
      });
    }

    if (productionChartData.length === 0 && farmer) {
      const farmerData = await db.user.findOne({
        where: { id: farmer },
        attributes: ["firstName", "lastName"],
      });
      if (farmerData) {
        productionChartData.push({
          full_name: `${farmerData.firstName} ${farmerData.lastName}`,
          final_value: 0,
          year: new Date(startDate).getFullYear().toString(),
        });
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: productionChartData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/dry-milling-production", auth, async (req, res) => {
  try {
    const org = req.user.organization;
    let filters = [];

    // Adding date filter
    if (req.query.startDate && req.query.endDate) {
      filters.push(
        `pc.purchaseDate >= '${req.query.startDate}' AND pc.purchaseDate <= '${req.query.endDate}'`
      );
    }

    // Adding user ID filter
    if (req.query.farmer) {
      filters.push(`u.id = ${req.query.farmer}`);
    }

    // Adding gender filter
    if (req.query.gender) {
      filters.push(`u.gender = '${req.query.gender}'`);
    }

    // Adding country filter
    if (req.query.countryCode) {
      filters.push(`u.countryIsoCode = '${req.query.countryCode}'`);
    }

    // Organization filter
    filters.push(`u.organization = '${org}'`);

    // Combine all filters into a single string
    const filter = filters.length > 0 ? filters.join(" AND ") : "1=1";

    let productionChartData = [];

    // Getting final Score of dry milling at stage of green beans
    const query = `
      SELECT 
        purchaseDate, 
        SUM(greenBeansTotal) AS final_value, 
        firstName, 
        lastName 
      FROM 
        parchment_coffees pc 
      JOIN 
        users u ON pc.dryMillingUserId = u.id 
      WHERE 
        ${filter} 
      GROUP BY 
        u.id
      ORDER BY 
        final_value DESC
      LIMIT 5;
    `;

    // Log the query
    console.log("SQL Query:", query);

    // Execute the query
    const buyingStationParchmentOut = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    });

    for (const data of buyingStationParchmentOut) {
      const fullNameArr = [];
      if (data.firstName) fullNameArr.push(data.firstName);
      if (data.lastName) fullNameArr.push(data.lastName);
      productionChartData.push({
        full_name: fullNameArr.join(" "),
        final_value: data.final_value || 0,
        date: data.purchaseDate,
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: productionChartData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/membership-plans-data", auth, async (req, res) => {
  try {
    const org = req.user.organization;
    let { start_date, end_date, countryCode, filterType, gender } = req.query;
    let filter = "";

    if (start_date && end_date) {
      filter = `umm.createdAt >= '${start_date}' AND umm.createdAt <= '${end_date}' AND `;
    }

    if (countryCode) {
      filter += `u.countryIsoCode = '${countryCode}' AND `;
    }

    if (gender) {
      filter += `u.gender = '${gender}' AND`;
    }

    const output = {
      labels: [],
      datasets: [],
    };

    if (filterType === "year") {
      let sql = `
      SELECT 
      YEAR(umm.createdAt) as year,
      MONTH(umm.createdAt) as month,
      (SELECT membership_type FROM user_membership um WHERE um.id = umm.membership_id) as membership_type,
      count(*) as user_count
      FROM users_user_membership_map umm
      JOIN users u ON u.id = umm.user_id
      WHERE ${filter} u.organization = '${org}'
      GROUP BY YEAR(createdAt), membership_type, MONTH(umm.createdAt)
      ORDER BY YEAR(umm.createdAt), MONTH(umm.createdAt) ASC;
      `;
      const userMembershipMaps = await db.sequelize.query(sql, {
        type: db.sequelize.QueryTypes.SELECT,
        limit: 1,
        raw: true,
      });
      const monthMap = [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" },
      ];
      const membershipTypesSet = new Set(
        userMembershipMaps.map((item) => item.membership_type)
      );
      const membershipTypes = Array.from(membershipTypesSet);

      if (userMembershipMaps) {
        for (const membership of membershipTypes) {
          const item = {
            name: membership,
            data: [],
          };
          for (const month of monthMap) {
            const exists = userMembershipMaps.find(
              (x) => x.membership_type === membership && x.month === month.id
            );
            if (exists) {
              item.data.push(exists.user_count);
            } else {
              item.data.push(0);
            }
          }
          output.datasets.push(item);
        }
      }
      output.labels = monthMap.map((month) => month.name);
    } else if (filterType === "week") {
      let sql = `
      SELECT 
          YEAR(umm.createdAt) AS year,
          WEEK(umm.createdAt) AS week,
          DAYNAME(umm.createdAt) AS day,
          (
              SELECT 
                  membership_type 
              FROM 
                  user_membership um 
              WHERE 
                  um.id = umm.membership_id
          ) AS membership_type,
          COUNT(*) AS user_count
      FROM 
          dbdimitra.users_user_membership_map umm
      JOIN 
          users u ON u.id = umm.user_id
      WHERE 
          ${filter} 
          u.organization = '${org}'
      GROUP BY 
          YEAR(umm.createdAt), 
          membership_type, 
          WEEK(umm.createdAt), 
          DAYNAME(umm.createdAt)
      ORDER BY 
          YEAR(umm.createdAt), 
          WEEK(umm.createdAt) ASC;
            `;

      const userMembershipMaps = await db.sequelize.query(sql, {
        type: db.sequelize.QueryTypes.SELECT,
        limit: 1,
        raw: true,
      });

      const weekMap = [
        { id: 1, name: "Monday" },
        { id: 2, name: "Tuesday" },
        { id: 3, name: "Wednesday" },
        { id: 4, name: "Thursday" },
        { id: 5, name: "Friday" },
        { id: 6, name: "Saturday" },
        { id: 7, name: "Sunday" },
      ];
      const membershipTypesSet = new Set(
        userMembershipMaps.map((item) => item.membership_type)
      );
      const membershipTypes = Array.from(membershipTypesSet);

      if (userMembershipMaps) {
        for (const membership of membershipTypes) {
          const item = {
            name: membership,
            data: [],
          };
          for (const week of weekMap) {
            const exists = userMembershipMaps.find(
              (x) => x.membership_type === membership && x.day === week.name
            );
            if (exists) {
              item.data.push(exists.user_count);
            } else {
              item.data.push(0);
            }
          }
          output.datasets.push(item);
        }
      }
      output.labels = weekMap.map((week) => week.name);
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: output,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/avg-price/farmers", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const { sDate, eDate, countryCode, gender, farmer } = req.query;
    const farmerWhere = getFarmerWhere(organization, countryCode, gender, farmer);
    const purchaseOrders = await fetchPurchaseOrders(farmerWhere, sDate, eDate);

    res.json({
      msg: 'Success',
      data: {
        avgFarmerPaidList: purchaseOrders,
        avgFarmerPaidChart: purchaseOrders.slice(0, 5),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/avg-price/farmers/download', auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const { sDate, eDate, countryCode, gender, farmer } = req.query;
    const farmerWhere = getFarmerWhere(organization, countryCode, gender, farmer);
    const purchaseOrders = await fetchPurchaseOrders(farmerWhere, sDate, eDate);

    const csvContent = generateCSVContent(purchaseOrders);
    const csvFilePath = path.resolve(__dirname, `../../files/avg-price-farmers.csv`);
    fs.writeFileSync(csvFilePath, csvContent, 'utf-8');

    res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=avg-price-farmers.csv`,
    });
    fs.createReadStream(csvFilePath).pipe(res);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/avg-price/interval", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const { sDate, eDate, filterType, gender, countryCode } = req.query;

    // Set default filterType to "year" if not provided or not "month"
    const defaultFilterType = filterType === "month" ? filterType : "year";

    // Define attributes based on filterType
    const attributes = [
      [
        db.Sequelize.fn("ROUND",db.Sequelize.fn("AVG", db.Sequelize.col("perKgPrice")),2),
        "averagePricePerKg",
      ],
      ...(defaultFilterType === "month"
        ? [[db.Sequelize.literal('DATE_FORMAT(purchasedAt, "%M")'), "month"]]
        : [[db.Sequelize.fn("YEAR", db.Sequelize.col("purchasedAt")), "year"]]),
    ];

    // Build include clause for filtering by organization, gender, and countryCode
    const includeClause = {
      model: db.user,
      as: "farmer",
      attributes: [],
      where: {
        organization,
        ...(gender && { gender }),
        ...(countryCode && { countryIsoCode: countryCode }),
      },
    };

    // Query the database based on filterType
    let averagePricePerKgByInterval;
    if (defaultFilterType === "month") {
      // For month filterType, filter between start date and end date
      averagePricePerKgByInterval = await db.CacaoPurchaseOrder.findAll({
        attributes,
        include: [includeClause],
        where: { purchasedAt: { [Op.between]: [sDate, eDate] } },
        group: [defaultFilterType],
        raw: true,
      });
    } else if (defaultFilterType === "year") {
      // For year filterType, get year-by-year data if start and end dates provided, otherwise get all data
      if (sDate && eDate) {
        averagePricePerKgByInterval = await db.CacaoPurchaseOrder.findAll({
          attributes,
          include: [includeClause],
          where: {
            purchasedAt: {
              [Op.gte]: sDate, // Filter from start date
              [Op.lte]: eDate, // Filter to end date
            },
          },
          group: ["year"],
          raw: true,
        });
      } else {
        averagePricePerKgByInterval = await db.CacaoPurchaseOrder.findAll({
          attributes,
          include: [includeClause],
          group: ["year"],
          raw: true,
        });
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          avgFarmerPaidList: averagePricePerKgByInterval,
          avgFarmerPaidChart: averagePricePerKgByInterval.slice(0, 8),
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/countriesByOrganization", auth, async (req, res) => {
  try {
    const { organization } = req.user;

    const countries = await db.sequelize.query(
      `SELECT DISTINCT country, countryIsoCode
        FROM users
        WHERE organization = ${organization}
        AND country IS NOT NULL
        AND countryIsoCode IS NOT NULL;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    return res.json({
      msg: "Successfully fetched countries by organization",
      data: countries,
      success: true,
    });
  } catch (err) {
    console.error("Error fetching countries by organization:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
