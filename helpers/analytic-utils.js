const app = require('../app');
const db = require('../models');
const moment = require('moment');
const { MongoClient } = require('mongodb');

const EXCLUDED_ORGANIZATIONS = ['dimitra', 'dimitra_internal', 'internal', 'mi-cacao'];

const fillEmptyAnalyticOfOrganization = (organizations, analytics, defaultValue) => {
  const result = [];
  for (const organization of organizations) {
    const analytic = analytics.find((_analytic) => _analytic.code === organization.code);
    if (analytic) {
      result.push(analytic);
    } else {
      result.push({
        ...defaultValue,
        code: organization.code,
        name: organization.name,
      });
    }
  }
  return result;
};

const getNumberOfOrganizationPerCountry = async () => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          o.country as country,
          COUNT(o.id) as total
        FROM
          organization o
        WHERE
          o.code NOT IN (:excludedOrganizations) AND
          (o.isDeleted IS NULL OR
          o.isDeleted = 0)
        GROUP BY
        o.country
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
        },
      }
    );
    return result;
  } catch (error) {
    console.error('Failed to get number of organization per country');
  }
};

const getNumberOfInactiveUsers = async (endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT COUNT(u.id) AS count
        FROM
          users u
        INNER JOIN organization o
          ON o.id = u.organization
        WHERE
          u.active = 0 AND
          o.code NOT IN (:excludedOrganizations) AND
          u.userType IS NULL AND
          ((u.email IS NOT NULL AND u.email != '') OR (u.mobile IS NOT NULL AND u.mobile != '')) AND
          ${startDate ? 'u.updatedAt >= :startDate AND' : ''}
          u.updatedAt <= :endDate
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    return result.count;
  } catch (error) {
    console.error('Failed to get number of inactive users');
  }
};

const getNumberOfTickets = async (endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT COUNT(t.id) AS count
        FROM
          tickets t
        INNER JOIN organization o
          ON o.id = t.org_id
        WHERE
          o.code NOT IN (:excludedOrganizations) AND
          ${startDate ? 't.createdAt >= :startDate AND' : ''}
          t.createdAt <= :endDate
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    return result.count;
  } catch (error) {
    console.error('Failed to get number of tickets');
    throw error;
  }
};

const getNumberOfOrganizationsOnboarded = async (endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT COUNT(o.id) AS count
        FROM
          organization o
        WHERE
          o.code NOT IN (:excludedOrganizations) AND
          ${startDate ? 'o.createdAt >= :startDate AND' : ''}
          o.createdAt <= :endDate
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );

    return result.count;
  } catch (error) {
    console.error('Failed to get number of organizations registered');
    throw error;
  }
};

const getNumberOfFarmersRegistered = async (endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          COUNT(DISTINCT(uf.userId)) AS count
        FROM
          user_farms uf
        INNER JOIN users u
          ON u.id = uf.userId
        INNER JOIN organization o
          ON o.id = u.organization
        WHERE
          (uf.isDeleted IS NULL OR uf.isDeleted = 0) AND
          o.code NOT IN (:excludedOrganizations) AND
          ${startDate ? 'u.createdAt >= :startDate AND' : ''}
          u.createdAt <= :endDate
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    return result.count;
  } catch (error) {
    console.error('Failed to get number of farmers registered');
    throw error;
  }
};

const getNumberOfFarmsRegistered = async (endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          COUNT(uf.id) AS count
        FROM
          user_farms uf
        INNER JOIN users u
          ON u.id = uf.userId
        INNER JOIN organization o
          ON o.id = u.organization
        WHERE
          uf.isDeleted = 0 AND
          o.code NOT IN (:excludedOrganizations) AND
          ${startDate ? 'uf.createdAt >= :startDate AND' : ''}
          uf.createdAt <= :endDate
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    return result.count;
  } catch (error) {
    console.error('Failed to get number of farms registered');
    throw error;
  }
};

const getNumberOfGeofencesRegistered = async (endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          COUNT(g.id) AS count
        FROM
          geofences g
        INNER JOIN users u
          ON g.userId = u.id
        INNER JOIN organization o
          ON u.organization = o.id
        WHERE
          g.deletedAt IS NULL AND
          o.code NOT IN (:excludedOrganizations) AND
          ${startDate ? 'g.createdAt >= :startDate AND' : ''}
          g.createdAt <= :endDate
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );

    return result.count;
  } catch (error) {
    console.error('Failed to get number of geofences registered');
    throw error;
  }
};

const getFarmerAnalyticOfOrganizations = async (organizations) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          o.code as code,
          o.name as name,
          COUNT(DISTINCT(uf.userId)) AS total
        FROM
          user_farms uf
        INNER JOIN users u
          ON u.id = uf.userId
        INNER JOIN organization o
          ON u.organization = o.id
        WHERE
          (uf.isDeleted IS NULL OR uf.isDeleted = 0) AND
          o.code NOT IN (:excludedOrganizations)
        GROUP by
          o.code
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
        },
      }
    );
    return fillEmptyAnalyticOfOrganization(organizations, result, { total: 0 });
  } catch (error) {
    console.error('Failed to get farmer analytic of organizations');
    throw error;
  }
};

const getFarmAnalyticOfOrganizations = async (organizations) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          o.code as code,
          o.name as name,
          COUNT(uf.id) AS totalNumberOfFarms,
          COUNT(g.id) AS totalNumberOfGeofencedFarms,
          ROUND(AVG(uf.area) * 0.404685642, 2) AS averageFarmSizeInHectare
        FROM
          user_farms uf
        INNER JOIN users u
          ON uf.userId = u.id
        INNER JOIN organization o
          ON u.organization = o.id
        LEFT JOIN (
          SELECT
            id,
            farmId
          FROM geofences
          WHERE deletedAt IS NULL
          GROUP BY
            farmId
        ) g
          ON g.farmId = uf.id 
        WHERE
          uf.isDeleted = 0 AND
          o.code NOT IN (:excludedOrganizations)
        GROUP BY
          o.code
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
        },
      }
    );
    return fillEmptyAnalyticOfOrganization(organizations, result, {
      totalNumberOfFarms: 0,
      totalNumberOfGeofencedFarms: 0,
      averageFarmSizeInHectare: 0,
    });
  } catch (error) {
    console.error('Failed to get farm analytic of organizations');
    throw error;
  }
};

const getGeofenceAnalyticOfOrganizations = async (organizations) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          o.code as code,
          o.name as name,
          COUNT(g.id) AS total
        FROM
          geofences g 
        INNER JOIN users u
          ON g.userId = u.id
        INNER JOIN organization o
          ON u.organization = o.id 
        WHERE 
          g.deletedAt IS NULL AND
          o.code NOT IN (:excludedOrganizations)
        GROUP BY
          o.code
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
        },
      }
    );
    return fillEmptyAnalyticOfOrganization(organizations, result, { total: 0 });
  } catch (error) {
    console.error('Failed to get geofence analytic of organizations');
    throw error;
  }
};

const getTicketAnalyticOfOrganizations = async (organizations, endDate, startDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          o.code as code,
          o.name as name,
          COUNT(t.id) as total
        FROM
          tickets t
        INNER JOIN organization o
          ON o.id = t.org_id
        WHERE
          o.code NOT IN (:excludedOrganizations) AND
          ${startDate ? 't.createdAt >= :startDate AND' : ''}
          t.createdAt <= :endDate
        GROUP BY
          o.code
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    return fillEmptyAnalyticOfOrganization(organizations, result, { total: 0 });
  } catch (error) {
    console.error('Failed to get ticket analytic of organizations');
    throw error;
  }
};

const getNumberOfInactiveUserOfOrganizations = async (organizations) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          o.code as code,
          o.name as name,
          COUNT(u.id) AS total
        FROM
          users u
        INNER JOIN organization o
          ON o.id = u.organization
        WHERE
          u.active = 0 AND
          o.code NOT IN (:excludedOrganizations) AND
          u.userType IS NULL AND
          ((u.email IS NOT NULL AND u.email != '') OR (u.mobile IS NOT NULL AND u.mobile != ''))
        GROUP BY
          o.code
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
        },
      }
    );
    return fillEmptyAnalyticOfOrganization(organizations, result, { total: 0 });
  } catch (error) {
    console.error('Failed to get ticket analytic of organizations');
    throw error;
  }
};

const getNumberOfActiveUsersWithExpiredMembershipOfOrganizations = async (organizations, endDate) => {
  try {
    const result = await db.sequelize.query(
      `
        SELECT
          COUNT(u.id) as total,
          o.code as code,
          o.name as name
        FROM
          users u
        INNER JOIN organization o
          ON o.id = u.organization
        INNER JOIN activation_key ak
          ON ak.user_id = u.id
        INNER JOIN user_membership um
          ON um.id = ak.membership_type
        WHERE
          u.active = 1 AND
          u.verified = 1 AND
          o.code NOT IN (:excludedOrganizations) AND
          u.userType IS NULL AND
          (
            (u.email IS NOT NULL AND u.email != '') OR
            (u.mobile IS NOT NULL AND u.mobile != '')
          ) AND
          DATE_ADD(um.createdAt, INTERVAL um.membership_duration_in_days DAY) <= :endDate AND
          ak.is_deleted = 0
        GROUP BY o.code
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
          endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    return fillEmptyAnalyticOfOrganization(organizations, result, { total: 0 });
  } catch (error) {
    console.error('Failed to get number of active users with expired membership of organizations');
  }
};

const getLastActivityPerOrganization = async (organizations) => {
  try {
    if (process.env.MONGO_URL && process.env.MONGO_DB && process.env.MONGO_DB_ACTIVITY_COLLECTION) {
      const mongoURL =
        process.env.MONGO_URL ||
        'mongodb://dimitra:u1q2c2Fzt3vn2hFhiFC6j@127.0.0.1:27017/admin?replicaSet=mongodb&ssl=false&directConnection=true';
      const mongoClient = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
      await mongoClient.connect();
      const mongoDb = mongoClient.db(process.env.MONGO_DB);
      const activityCollection = mongoDb.collection(process.env.MONGO_DB_ACTIVITY_COLLECTION);

      const orgIds = organizations.map((org) => org.id);
      const activityLogs = activityCollection.aggregate([
        { $match: { orgId: { $in: orgIds } } },
        { $group: { _id: '$orgId', lastActivityDate: { $max: '$createdAt' } } },
      ]);

      const result = [];
      for await (const activityLog of activityLogs) {
        const org = organizations.find((_org) => _org.id == activityLog._id);
        const lastActivityDate = moment(activityLog.lastActivityDate).format('YYYY-MM-DD HH:mm:ss');
        result.push({ code: org.code, name: org.name, lastActivityDate });
      }
      await mongoClient.close();
      return fillEmptyAnalyticOfOrganization(organizations, result);
    }
  } catch (error) {
    console.error('Failed to get last activity per organization');
    throw error;
  }
};

const getLastAnalyticLog = async () => {
  try {
    const analyticLog = await db.sequelize.query(
      `
        SELECT id, analyticJsonData, generatedAt
        FROM analytic_logs al
        WHERE
          al.isSuccess = 1 AND
          al.analyticJsonData IS NOT NULL
        ORDER BY al.generatedAt DESC
        LIMIT 1
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        plain: true,
      }
    );

    return analyticLog;
  } catch (error) {
    console.error('Failed to get last analytic log');
    throw error;
  }
};

const getAnalyticData = async () => {
  try {
    const lastAnalyticLog = await getLastAnalyticLog();
    if (lastAnalyticLog) {
      lastAnalyticLog.analyticJsonData = JSON.parse(lastAnalyticLog.analyticJsonData);
    }
    const startDate = lastAnalyticLog?.generatedAt ? moment(lastAnalyticLog.generatedAt).add(1, 'second') : undefined;
    const endDate = new Date();

    const organizations = await db.sequelize.query(
      `
        SELECT id, code, name
        FROM
          organization o
        WHERE
          o.code NOT IN (:excludedOrganizations) AND
          (o.isDeleted IS NULL OR
          o.isDeleted = 0)
        ORDER BY o.name ASC
      `,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {
          excludedOrganizations: EXCLUDED_ORGANIZATIONS,
        },
      }
    );

    const [
      numberOfOrganizationsOnboarded,
      numberOfFarmersRegistered,
      numberOfFarmsRegistered,
      numberOfGeofencesRegistered,
      farmerAnalytics,
      farmAnalytics,
      geofenceAnalytics,
      numberOfOrganizationPerCountry,
      lastActivityPerOrganization,
      numberOfInactiveUsers,
      numberOfTickets,
      ticketAnalytics,
      inactiveUserAnalytics,
      activeUserWithExpiredMembershipAnalytics,
    ] = await Promise.all([
      getNumberOfOrganizationsOnboarded(endDate, startDate),
      getNumberOfFarmersRegistered(endDate, startDate),
      getNumberOfFarmsRegistered(endDate, startDate),
      getNumberOfGeofencesRegistered(endDate, startDate),
      getFarmerAnalyticOfOrganizations(organizations),
      getFarmAnalyticOfOrganizations(organizations),
      getGeofenceAnalyticOfOrganizations(organizations),
      getNumberOfOrganizationPerCountry(),
      getLastActivityPerOrganization(organizations),
      getNumberOfInactiveUsers(endDate, startDate),
      getNumberOfTickets(endDate, startDate),
      getTicketAnalyticOfOrganizations(organizations, endDate, startDate),
      getNumberOfInactiveUserOfOrganizations(organizations),
      getNumberOfActiveUsersWithExpiredMembershipOfOrganizations(organizations, endDate),
    ]);

    const analyticData = {
      startDate,
      endDate,
      lastActivityPerOrganization,
      numberOfInactiveUsers: {
        previous: lastAnalyticLog?.analyticJsonData.numberOfInactiveUsers?.current,
        current: numberOfInactiveUsers,
      },
      numberOfTickets: {
        previous: lastAnalyticLog?.analyticJsonData.numberOfTickets?.current,
        current: numberOfTickets,
      },
      organizationsOnboarded: {
        previous: lastAnalyticLog?.analyticJsonData.organizationsOnboarded?.current,
        current: numberOfOrganizationsOnboarded,
      },
      farmersRegistered: {
        previous: lastAnalyticLog?.analyticJsonData.farmersRegistered?.current,
        current: numberOfFarmersRegistered,
      },
      farmsRegistered: {
        previous: lastAnalyticLog?.analyticJsonData.farmsRegistered?.current,
        current: numberOfFarmsRegistered,
      },
      geofencesRegistered: {
        previous: lastAnalyticLog?.analyticJsonData.geofencesRegistered?.current,
        current: numberOfGeofencesRegistered,
      },
      numberOfOrganizationPerCountry: numberOfOrganizationPerCountry.map((item) => {
        const previous = lastAnalyticLog?.analyticJsonData.numberOfOrganizationPerCountry?.find(
          (prevItem) => prevItem.current.country?.toLowerCase() === item.country?.toLowerCase()
        )?.current;
        return {
          previous,
          current: item,
        };
      }),
      farmerAnalytics: farmerAnalytics.map((analytic) => {
        const previous = lastAnalyticLog?.analyticJsonData.farmerAnalytics?.find(
          (previousAnalytic) => previousAnalytic.current.code === analytic.code
        )?.current;

        return {
          previous,
          current: analytic,
        };
      }),
      farmAnalytics: farmAnalytics.map((analytic) => {
        const previous = lastAnalyticLog?.analyticJsonData.farmAnalytics?.find(
          (previousAnalytic) => previousAnalytic.current.code === analytic.code
        )?.current;

        return {
          previous,
          current: analytic,
        };
      }),
      geofenceAnalytics: geofenceAnalytics.map((analytic) => {
        const previous = lastAnalyticLog?.analyticJsonData.geofenceAnalytics?.find(
          (previousAnalytic) => previousAnalytic.current.code === analytic.code
        )?.current;

        return {
          previous,
          current: analytic,
        };
      }),
      ticketAnalytics: ticketAnalytics.map((analytic) => {
        const previous = lastAnalyticLog?.analyticJsonData.ticketAnalytics?.find(
          (previousAnalytic) => previousAnalytic.current.code === analytic.code
        )?.current;
        return {
          previous,
          current: analytic,
        };
      }),
      inactiveUserAnalytics: inactiveUserAnalytics.map((analytic) => {
        const previous = lastAnalyticLog?.analyticJsonData.inactiveUserAnalytics?.find(
          (previousAnalytic) => previousAnalytic.current.code === analytic.code
        )?.current;
        return {
          previous,
          current: analytic,
        };
      }),
      activeUserWithExpiredMembershipAnalytics: activeUserWithExpiredMembershipAnalytics.map((analytic) => {
        const previous = lastAnalyticLog?.analyticJsonData.activeUserWithExpiredMembershipAnalytics?.find(
          (previousAnalytic) => (previousAnalytic.current.code === analytic.code)
        )?.current;
        return {
          previous,
          current: analytic,
        };
      }),
    };

    return analyticData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAnalyticData,
};
