const { Op } = require('sequelize');

const db = require(rootPath + "/models");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");

/**
 * @desc check if the farmname and registration number is unique together
 */
exports.isUniqueRegNoAndFarmNameTogether = async (req) => {
  const { farmName, registrationNo, id } = req.body;

  // if farmName and farmNumber is empty then return true
  if ((!farmName || !registrationNo || !notEmpty(farmName) || !notEmpty(registrationNo))) {
    return true;
  }

  const where = { farmName, registrationNo, isDeleted: 0, [Op.or]: [{ userId: req.user.id }, { technicianId: req.user.id }] };
  // check data in DB
  let status = await db.user_farm.findOne({
    attributes: ["farmName", "registrationNo", "id"],
    where,
  });


  if(status) {
    if(status?.dataValues?.id === Number(id)) {
      return true
    } else return false
  } else {
    return true;
  }
};
/**
 * @desc check if the user already has the farm with same name
 */
exports.farmAlreadyRegistered = async (req) => {
  const { farmName } = req.body;
  if(!farmName || !notEmpty(farmName)) return false;
  const userId = req.user.id;

  const where = { farmName, userId, isDeleted: 0  };
  // check data in DB
  let status = await db.user_farm.findOne({
    attributes: ["farmName", "userId"],
    where,
  });

  const isUnique = status ? true : false;
  return isUnique;
};

exports.getGeofenceByCoordinate = async ({ attributes = null, coordinateHash = null, centerLat = null, centerLog = null, organizationId, subOrganizationId = null }) => {
  const hasCoordinateHash = coordinateHash && notEmpty(coordinateHash);
  const hasLat = centerLat && !isNaN(Number(centerLat));
  const hasLog = centerLog && !isNaN(Number(centerLog));

  if(!hasCoordinateHash && (!hasLat || !hasLog)) return null;

  const userFilter = {
    organization: organizationId,
    ...(subOrganizationId ? { subOrganizationId } : {}),
  };

  const geofenceFilter = [];
  if(hasCoordinateHash) {
    geofenceFilter.push({ coordinateHash });
  }

  if(hasLat && hasLog) {
    geofenceFilter.push({
      geofenceCenterLat: centerLat,
      geofenceCenterLog: centerLog,
    });
  }

  const geofence = await db.Geofence.findOne({
    ...(Array.isArray(attributes) ? { attributes } : {}),
    where: {
      [Op.or]: geofenceFilter,
    },
    include: [
      {
        required: true,
        attributes: [],
        association: 'farms',
        where: hasLat && hasLog ? {
          lat: centerLat,
          log: centerLog,
        } : undefined,
        include: [
          {
            association: 'user',
            required: true,
            attributes: [],
            where: userFilter,
          },
        ],
      },
    ],
  });

  return geofence;
}

exports.isUniqueGeofenceCoordinateHash = async (hash, organizationId, subOrganizationId = null) => {
  if(!hash || !notEmpty(hash)) return true;

  const userFilter = {
    organization: organizationId,
    ...(subOrganizationId ? { subOrganizationId } : {}),
  };

  const geofence = await db.Geofence.findOne({
    where: {
      coordinateHash: hash,
    },
    attributes: ['id'],
    include: [
      {
        required: true,
        attributes: [],
        association: 'farms',
        include: [
          {
            association: 'user',
            required: true,
            attributes: [],
            where: userFilter,
          },
        ],
      },
    ],
  });

  return geofence ? false : true;
}