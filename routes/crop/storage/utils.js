const db = require(rootPath + '/models');
const { Op } = require('sequelize');

module.exports.validateStorageMethod = async (methodId, userId) => {
  const storageMethod = await db.CropStorageMethod.findOne({
    attributes: ['id'],
    where: {
      userId: {
        [Op.or]: [userId, null],
      },
      id: methodId,
    },
  });
  if (storageMethod === null) {
    throw {
      msg: 'Storage method selected doesnot belong to the user.',
      customValidationError: true,
    };
  }
};

module.exports.validateCropStorageType = async (storageId, userId) => {
  const storageType = await db.CropStorageType.findOne({
    attributes: ['id'],
    where: {
      userId: {
        [Op.or]: [userId, null],
      },
      id: storageId,
    },
  });
  if (storageType === null) {
    throw {
      msg: 'Storage type selected doesnot belong to the user.',
      customValidationError: true,
    };
  }
};

module.exports.addCropStorageToFarm = async (farm, cropStorageId, t) => {
  const farmDataPromises = farm.map(async (id) => {
    const _farm = await db.user_farm.findOne({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { id: id}, 
              { recordId: id }
            ]
          },
          { isDeleted: 0 }
        ]
      }
    });
    if(_farm) {
      return {
        farm: _farm.id,
        cropStorage: cropStorageId,
      }
    }
  });
  const farmData = await Promise.all(farmDataPromises);
  await db.CropStorageFarm.bulkCreate(farmData, {
    transaction: t,
  });
};

module.exports.addCropStorageToSegment = async (segment, cropStorageId, t) => {
  const segmentDataPromises = segment.map(async (geofenceId) => {
    const segment = await db.Geofence.findOne({
      where: {
        [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
      }
    });
    if(segment) {
      return {
        segment: segment.id,
        cropStorage: cropStorageId,
      }
    }
  });
  const segmentData = await Promise.all(segmentDataPromises);
  await db.CropStorageSegment.bulkCreate(segmentData, {
    transaction: t,
  });
};

module.exports.addCropVarietyToStorage = async (
  cropVariety,
  cropStorageId,
  t
) => {
  const cropVarietyData = [];
  cropVariety.forEach((id) =>
    cropVarietyData.push({
      cropVariety: id,
      storage: cropStorageId,
    })
  );
  await db.StorageCropVariety.bulkCreate(cropVarietyData, {
    transaction: t,
  });
};

module.exports.removeCropStorageFarmAndSegment = async (cropStorageId, t) => {
  await db.CropStorageFarm.destroy(
    {
      where: {
        cropStorage: cropStorageId,
      },
    },
    { transaction: t }
  );
  await db.CropStorageSegment.destroy(
    {
      where: {
        cropStorage: cropStorageId,
      },
    },
    { transaction: t }
  );
  await db.StorageCropVariety.destroy(
    {
      where: {
        storage: cropStorageId,
      },
    },
    { transaction: t }
  );
};
