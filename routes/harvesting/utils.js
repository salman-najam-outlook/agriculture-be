const db = require(rootPath + '/models');
const { Op } = require('sequelize');

module.exports.validateFarmBelongsToUser = async (farmId, userId) => {
  const farm = await db.user_farm.count({
    attributes: ['userId'],
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { id: farmId}, 
            { recordId: farmId }
          ]
        },
        {
          [Op.or]: [
            { userId: userId }, 
            { technicianId: userId }
          ]
        },
        { isDeleted: 0 }
      ]
    },
  });
  if (farm != farmId.length) {
    throw {
      msg: 'Farm Id selected does not belong to the user.',
      customValidationError: true,
    };
  }
};
module.exports.validateVarietyBelongsToUser = async (cropVariety, userId) => {
  const variety = await db.Crop.count({
    attributes: ['id'],
    where: {
      // userId: {
      //   [Op.or] : [userId, null]
      // },
      id:  {
        [Op.or] : cropVariety
      }
    },
    group: 'id'
  });
  if (variety?.length <= 0) {
    throw {
      msg: 'Crop variety selected does not belong to the user or its not added by admin.',
      customValidationError: true,
    };
  }
};
module.exports.validateSegmentBelongsToUser = async (segmentId, userId) => {
  const segment = await db.Geofence.findAndCountAll({
    attributes: ['id'],
    where: {
      userId,
      [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
    },
  });
  if (segment.count != segmentId.length) {
    throw {
      msg: 'Segment selected does not belong to the user.',
      customValidationError: true,
    };
  }
};
module.exports.validateHarvestMethodBelongsToUser = async (methodForHarvesting, userId) => {
  console.log('methodForHarvesting='+methodForHarvesting)
  const harvestMethod = await db.HarvestMethod.count({
    attributes: ['id'],
    where: {
      userId: {
        [Op.or] : [userId, null]
      },
      id: methodForHarvesting
    },
  });
  if (harvestMethod === null) {
    throw {
      msg: 'Method of harvesting selected does not belong to the user.',
      customValidationError: true,
    };
  }
};
module.exports.validateResonForLoss = async (reasonId, userId) => {
  const harvest_reason_for_loss = await db.harvest_reason_for_loss.count({
    attributes: ['id'],
    where: {
      userId: {
        [Op.or] : [userId, null]
      },
      id: reasonId
    },
  });
  if (harvest_reason_for_loss === null || harvest_reason_for_loss === 0) {
    throw {
      msg: 'Reason for loss selected does not belong to the user.',
      customValidationError: true,
    };
  }
};
module.exports.validateTypeOfMethodBelongsToHarvestMethod = async (methodForHarvesting, manualHarvesting, mechanicalHarvesting, userId) => {
  // console.log(methodForHarvesting+"-"+manualHarvesting+"-"+mechanicalHarvesting);
  ( typeof mechanicalHarvesting == 'undefined')?mechanicalHarvesting = null:mechanicalHarvesting;
  ( typeof manualHarvesting == 'undefined')?manualHarvesting = null:manualHarvesting;

  const havestTypes = await db.HarvestMethodType.count({
    
    where: {
      harvestMethodId: methodForHarvesting,
      id: {
        [Op.or] : [mechanicalHarvesting, manualHarvesting]
      }      
    },
    include:[
      {
        model: db.HarvestMethod,
        as: 'method_for_harvesting',
        attributes: ['id', 'title'],
        where: {
          userId:{
            [Op.or] : [userId, null]
          },
          id: methodForHarvesting
        }
      },
    ]
  });
  // console.log(havestTypes)
  if (havestTypes === 0) {
    throw {
      msg: 'harvest type selected does not belong to the harvest method.',
      customValidationError: true,
    };
  }
};
module.exports.addHarvestingToVariety = async (cropVariety, harvestId, t) => {
  const harvestingVarietyData = [];
  // console.log(farm);
  cropVariety.forEach((id) =>
  harvestingVarietyData.push({
      varietyId: id,
      harvestId: harvestId,
    })
  );
  await db.harvest_variety.bulkCreate(harvestingVarietyData, {
    transaction: t,
  });
};
module.exports.addHarvestingToReasonForLoss = async (resonForLoss, harvestId, t) => {
  const harvetReasonForLoss = [];
  // console.log(farm);
  resonForLoss?.forEach((id) =>
  harvetReasonForLoss.push({
    resonForLoss: id,
    harvestId: harvestId,
    })
  );
  await db.MapHarvestReasonForLoss.bulkCreate(harvetReasonForLoss, {
    transaction: t,
  });
};
module.exports.deleteHarvestingToReasonForLoss = async (harvestId, t) => {
  await db.MapHarvestReasonForLoss.destroy(
    {
      where: {
        harvestId: harvestId,
      },
    },
    { transaction: t }
  );
};

module.exports.updateHarvestingToReasonForLoss = async (newReasons, harvestId, t) => {
  // Fetch existing reasons for loss for this harvest
  const existingReasons = await db.MapHarvestReasonForLoss.findAll({
    where: { harvestId },
    attributes: ['resonForLoss'],
  });

  const existingReasonIds = existingReasons.map((r) => r.resonForLoss);

  // Determine reasons to be added and removed
  const reasonsToAdd = newReasons.filter((r) => !existingReasonIds.includes(r));
  const reasonsToRemove = existingReasonIds.filter((r) => !newReasons.includes(r));

  // Remove the deleted reasons
  if (reasonsToRemove.length) {
    await db.MapHarvestReasonForLoss.destroy({
      where: {
        harvestId,
        resonForLoss: reasonsToRemove,
      },
      transaction: t,
    });
  }

  // Add the new reasons
  const harvestReasonForLoss = reasonsToAdd.map((id) => ({
    resonForLoss: id,
    harvestId: harvestId,
  }));

  if (harvestReasonForLoss.length) {
    await db.MapHarvestReasonForLoss.bulkCreate(harvestReasonForLoss, {
      transaction: t,
    });
  }
};

module.exports.deleteHarvestingVariety = async (harvestId, t) => {
  await db.harvest_variety.destroy(
    {
      where: {
        harvestId: harvestId,
      },
    },
    { transaction: t }
  );
};
module.exports.addHarvestingToFarm = async (farm, harvestId, t) => {
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
        farmId: _farm.id,
        harvestId: harvestId,
      }
    }
  });
  const farmData = await Promise.all(farmDataPromises);
  await db.HarvestingFarm.bulkCreate(farmData, {
    transaction: t,
  });
};

module.exports.addHarvestingToSegment = async (segment, harvestId, t) => {
  const segmentDataPromises = segment.map(async (geofenceId) => {
    const geofence = await db.Geofence.findOne({
      where: {
        [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
      }
    });
    if(geofence) {
      return {
        segment: geofence.id,
        harvestId: harvestId,
      }
    }
  });
  const segmentData = await Promise.all(segmentDataPromises);
  await db.HarvestingSegment.bulkCreate(segmentData, {
    transaction: t,
  });
};

module.exports.deleteHarvestingFarmAndSegment = async (harvestId, t) => {
  await db.HarvestingFarm.destroy(
    {
      where: {
        harvestId: harvestId,
      },
    },
    { transaction: t }
  );
  await db.HarvestingSegment.destroy(
    {
      where: {
        harvestId: harvestId,
      },
    },
    { transaction: t }
  );
};
module.exports.validateCropType = async (cropId) => {
  const cropType = await db.Option.findOne({
    where: {
      id: cropId,
      groupName: 'crop-type',
    },
  });
  if (cropType === null) {
    throw {
      msg: 'Crop type selected does not exist.',
      customValidationError: true,
    };
  }
};
module.exports.validateCropVariety = async (cropVarietyId, userId) => {
  const cropVariety = await db.Crop.findOne({
    attributes: ['id'],
    where: {
      id: cropVarietyId,
      // userId: {
      //   [Op.or] : [userId, null]
      // }
    },
  });
  if (cropVariety === null) {
    throw {
      msg: 'Crop variety selected does not belong to the user.',
      customValidationError: true,
    };
  }
};