const db = require(rootPath + "/models");
const { error } = require(rootPath + "/helpers/language");
const { defaultModeOfOperation } = require(rootPath + "/helpers/consts");

exports.validateEquipmentPayloadDataExistsInDB = async (equipment, res) => {
  if (equipment?.group) {
    const groupExists = await db.EquipmentGroup.findOne({
      where: {
        userID: equipment.userID,
        id: equipment.group,
      },
    });
    if (groupExists === null) {
      throw {
        msg: "Please select a valid group.",
        customValidationError: true,
      };
    }
  }
  if (equipment?.modeOfOperation) {
    const modeOfOperationExists = await db.EquipmentModeOfOperation.findOne({
      where: {
        userID: equipment.userID,
        id: equipment.modeOfOperation,
      },
    });
    if (modeOfOperationExists === null) {
      throw {
        msg: "Please select a valid mode of operation.",
        customValidationError: true,
      };
    }
  }
};

exports.getUserFarmData = async () => {
  const farms = await db.user_farm.findAll({
    attributes: ["id"],
    raw: true,
    include: [
      {
        model: db.Geofence,
        raw: true,
        as: "segments",
        attributes: ["id"],
      },
    ],
  });
  return farms;
};

exports.validateFarmsAndSegmentsPayloadData = async (segment, farm, res) => {
  const segments = await db.Geofence.findAll({
    raw: true,
    where: {
      id: segment,
    },
    attributes: ["id", "farmId"],
  });
  const farmIdsOfSegments = [...new Set(segments.map((item) => item.farmId))];
  const isFarmAlreadyProvided = farmIdsOfSegments.some((id) =>
    farm?.includes(id)
  );
  if (isFarmAlreadyProvided) {
    throw {
      msg: "Coflict: Segments for a farm was selected and entire farm was also provided.",
      customValidationError: true,
    };
  }
};

exports.addEquipmentToFarm = async (userFarms, farm, res, t, equipmentID) => {
  const userFarmIds = [...new Set(userFarms.map((item) => item.id))];
  const doesFarmBelongToUser = farm.every((farmId) =>
    userFarmIds.includes(farmId)
  );
  if (!doesFarmBelongToUser) {
    throw {
      msg: "Farm selected doesnot belong to user",
      customValidationError: true,
    };
  }
  const farmWithEquipmentData = [];
  farm.forEach((id) =>
    farmWithEquipmentData.push({
      farmID: id,
      equipmentID,
    })
  );
  await db.EquipmentUserFarm.bulkCreate(farmWithEquipmentData, {
    transaction: t,
  });
};

exports.addEquipmentToFarmSegment = async (
  userFarms,
  segment,
  res,
  t,
  equipmentID
) => {
  const userFarmSegmentIds = [
    ...new Set(
      userFarms
        .map((farm) => farm["segments.id"])
        .filter((segment) => segment !== null)
    ),
  ];
  const doesFarmSegmentBelongToUser = segment.every((segmentId) =>
    userFarmSegmentIds.includes(segmentId)
  );
  if (!doesFarmSegmentBelongToUser) {
    throw {
      msg: "Farm segment selected doesnot belong to user",
      customValidationError: true,
    };
  }
  const farmSegmentWithEquipmentData = [];
  segment.forEach((id) =>
    farmSegmentWithEquipmentData.push({
      geoFenceID: id,
      equipmentID,
    })
  );
  await db.EquipmentUserSegment.bulkCreate(farmSegmentWithEquipmentData, {
    transaction: t,
  });
};

exports.checkIfEquipmentNameExistsInDB = async (equipment, res) => {
  const equipmentNameExists = await db.EquipmentName.findOne({
    where: {
      id: equipment.equipmentName,
      activity: equipment.activity,
    },
    attributes: ["id"],
  });
  if (equipmentNameExists === null) {
    throw {
      msg: "Please select a valid equipment name.",
      customValidationError: true,
    };
  }
};

exports.validateActivityBelongsToCategoryInDB = async (equipment, res) => {
  const activityBelongsToCategory = await db.EquipmentActivity.findOne({
    where: {
      category: equipment.category,
      id: equipment.activity,
    },
    attributes: ["id"],
  });
  if (activityBelongsToCategory === null) {
    throw {
      msg: "Please select a valid category and activity.",
      customValidationError: true,
    };
  }
};
