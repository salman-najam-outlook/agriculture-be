const db = require(rootPath + '/models');
const { Op } = require('sequelize');

module.exports.validateFarmBelongsToUser = async (farmId, userId) => {
  const farm = await db.user_farm.findOne({
    attributes: ['id'],
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
  if (farm === null) {
    throw {
      msg: 'Farm selected doesnot belong to the user.',
      customValidationError: true,
    };
  }
};

module.exports.validateSegmentBelongsToUser = async (segmentId, userId) => {
  const segment = await db.Geofence.findOne({
    attributes: ['id'],
    where: {
      userId,
      [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
    },
  });
  if (segment === null) {
    throw {
      msg: 'Segment selected doesnot belong to the user.',
      customValidationError: true,
    };
  }
};

module.exports.validateSegmentBelongsToUser = async (segmentId, userId) => {
  const segment = await db.Geofence.findOne({
    attributes: ['id'],
    where: {
      userId,
      [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
    },
  });
  if (segment === null) {
    throw {
      msg: 'Segment selected doesnot belong to the user.',
      customValidationError: true,
    };
  }
};

module.exports.validateCropVariety = async (varietyId) => {
  const cropVariety = await db.Crop.findOne({
    attributes: ['id'],
    where: {
      id: varietyId,
    },
  });
  if (cropVariety === null) {
    throw {
      msg: 'Crop variety selected doesnot belong to the user.',
      customValidationError: true,
    };
  }
};

module.exports.validateIrrigationWaterSource = async (
  waterSourceId,
  userId
) => {
  const waterSource = await db.IrrigationWaterSource.findOne({
    attributes: ['id'],
    where: {
      userId: {
        [Op.or]: [userId, null],
      },
      id: {
        [Op.or]: [...waterSourceId],
      },
    },
  });
  if (waterSource === null) {
    throw {
      msg: 'Irrigation water source selected doesnot belong to this user and is not added by admin.',
      customValidationError: true,
    };
  }
};

module.exports.validateIrrigationWaterSourceOrigin = async (
  waterSourceOriginId,
  userId,
  irrigationWaterSource
) => {
  const waterSourceOrigin = await db.IrrigationWaterSourceOrigin.findOne({
    attributes: ['id'],
    where: {
      userId: {
        [Op.or]: [userId, null],
      },
      id: {
        [Op.or]: [...waterSourceOriginId],
      },
      waterType: {
        [Op.or]: [...irrigationWaterSource],
      },
    },
  });
  if (waterSourceOrigin === null) {
    throw {
      msg: 'Irrigation water source origin selected doesnot belong to this user and is not added by admin.',
      customValidationError: true,
    };
  }
};

module.exports.validateIrrigationStage = async (stageId) => {
  const stage = await db.IrrigationStage.findByPk(stageId);
  if (stage === null) {
    throw {
      msg: 'Irrigation stage  selected doesnot exist.',
      customValidationError: true,
    };
  }
};

module.exports.validateIrrigationType = async (typeId, userId) => {
  const irrigationType = await db.IrrigationType.findOne({
    where: {
      userId: {
        [Op.or]: [userId, null],
      },
      id: typeId,
    },
  });
  if (irrigationType === null) {
    throw {
      msg: 'Irrigation type selected doesnot exist.',
      customValidationError: true,
    };
  }
};

module.exports.validateIrrigationSchedule = async (scheduleId, userId) => {
  const irrigationSchedule = await db.IrrigationSchedule.findOne({
    where: {
      userId: {
        [Op.or]: [userId, null],
      },
      id: scheduleId,
    },
  });
  if (irrigationSchedule === null) {
    throw {
      msg: 'Irrigation schedule selected doesnot exist.',
      customValidationError: true,
    };
  }
};

module.exports.addIrrigationToFarm = async (farm, irrigationId, t) => {
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
        irrigation: irrigationId,
      }
    }
  });
  const farmData = await Promise.all(farmDataPromises);
  await db.IrrigationFarm.bulkCreate(farmData, {
    transaction: t,
  });
};

module.exports.addWaterSourceOptions = async (irrigationId, waterSourceOptions, t) => {
  const waterSourcesOptionData = [];

  waterSourceOptions.forEach((waterSourceOptionId) =>
    waterSourcesOptionData.push({
      irrigationId: irrigationId,
      waterSourceOptionsId: waterSourceOptionId,
    })
  );

  await db.UserIrrigationWaterSourceOptionsMappings.bulkCreate(waterSourcesOptionData, {
    transaction: t,
  });
};

module.exports.addIrrigationWaterSources = async (irrigationId, irrigationWaterSources, t) => {
  const irrigationWaterSourcesData = [];

  irrigationWaterSources.forEach((irrigationWaterSourceId) =>
    irrigationWaterSourcesData.push({
      irrigationId: irrigationId,
      waterSourceId: irrigationWaterSourceId,
    })
  );

  await db.UserIrrigationWaterSource.bulkCreate(irrigationWaterSourcesData, {
    transaction: t,
  });
};

module.exports.addIrrigationWaterSourceOrigins = async (irrigationId, irrigationWaterSourceOrigins, t) => {
  const irrigationWaterSourceOriginsData = [];

  irrigationWaterSourceOrigins.forEach((irrigationWaterSourceOriginId) =>
    irrigationWaterSourceOriginsData.push({
      irrigationId: irrigationId,
      waterSourceOriginId: irrigationWaterSourceOriginId,
    })
  );

  await db.UserIrrigationWaterSourceOrigin.bulkCreate(irrigationWaterSourceOriginsData, {
    transaction: t,
  });
};

module.exports.addIrrigationToSegment = async (segment, irrigationId, t) => {
  const segmentDataPromises = segment.map(async (geofenceId) => {
    const segment = await db.Geofence.findOne({
      where: {
        [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
      }
    });
    if(segment) {
      return {
        segment: segment.id,
        irrigation: irrigationId,
      }
    }
  });
  const segmentData = await Promise.all(segmentDataPromises);
  await db.IrrigationSegment.bulkCreate(segmentData, {
    transaction: t,
  });
};

module.exports.addCropVarietyToIrrigation = async (
  irrigationId,
  cropVarietyList,
  t
) => {
  const cropVarietyData = [];
  cropVarietyList.forEach((id) =>
    cropVarietyData.push({
      cropVariety: id,
      irrigation: irrigationId,
    })
  );
  await db.IrrigationCropVariety.bulkCreate(cropVarietyData, {
    transaction: t,
  });
};

module.exports.addIrrigationDates = async (irrigationId, dates, t) => {
  const dateData = [];
  dates.forEach((date) =>
    dateData.push({
      date: date,
      irrigation: irrigationId,
    })
  );
  await db.IrrigationDate.bulkCreate(dateData, {
    transaction: t,
  });
};

module.exports.removeWaterSourceOptions = async (
  irrigationId,
  t
) => {
  await db.UserIrrigationWaterSourceOptionsMappings.destroy({
    where: {
      irrigationId: irrigationId,
    },
  },
    { transaction: t }
  );
};

module.exports.removeIrrigationWaterSourcesAndOrigin = async (
  irrigationId,
  t
) => {
  await db.UserIrrigationWaterSource.destroy({
    where: {
      irrigationId: irrigationId,
    },
  },
    { transaction: t }
  );
  
  await db.UserIrrigationWaterSourceOrigin.destroy({
      where: {
        irrigationId: irrigationId,
      },
    },
    { transaction: t }
  );
};

module.exports.removeIrrigationFarmAndSegmentAndCropVariety = async (
  irrigationId,
  t
) => {
  await db.IrrigationFarm.destroy(
    {
      where: {
        irrigation: irrigationId,
      },
    },
    { transaction: t }
  );
  await db.IrrigationSegment.destroy(
    {
      where: {
        irrigation: irrigationId,
      },
    },
    { transaction: t }
  );
  await db.IrrigationCropVariety.destroy(
    {
      where: {
        irrigation: irrigationId,
      },
    },
    { transaction: t }
  );
  await db.IrrigationDate.destroy(
    {
      where: {
        irrigation: irrigationId,
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
      msg: 'Crop type selected doesnot exist.',
      customValidationError: true,
    };
  }
};

module.exports.validateOrCreateIrrigationTypeUpdated = async (irrigationTypeData, otherIrrigationType, userId) => {
  const { Op } = require('sequelize');
  const validatedTypes = [];
  
  // Handle irrigationTypeUpdated array (subcategory IDs only)
  if (Array.isArray(irrigationTypeData)) {
    for (const item of irrigationTypeData) {
      // Validate subcategory ID exists
      if (typeof item === 'number' || !isNaN(item)) {
        const existingType = await db.IrrigationTypeUpdated.findOne({
          where: {
            id: item,
            isCategory: false, // Only subcategories
            [Op.or]: [
              { userId: null }, // System defaults
              { userId: userId } // User specific
            ]
          }
        });
        
        if (!existingType) {
          throw {
            msg: `Invalid irrigation type subcategory ID: ${item}`,
            customValidationError: true,
          };
        }
        validatedTypes.push(item);
      }
    }
  }
  return validatedTypes;
};

module.exports.irrigationDefaultValues = {
  waterVolumeUsed: 0.0
}

module.exports.handleOtherIrrigationTypeUpdate = async (otherIrrigationType, userId, transaction) => {
  
  if (!Array.isArray(otherIrrigationType) || otherIrrigationType.length === 0) {
    await db.IrrigationTypeUpdated.destroy({
      where: {
        isUserSpecific: true,
        userId: userId
      },
      transaction: transaction
    });
    return [];
  }

  const newTypeNames = [];
  const existingTypeIds = [];
  
  otherIrrigationType.forEach(item => {
    if (typeof item === 'string' && item.trim()) {
      newTypeNames.push(item.trim());
    } else if (typeof item === 'number' || !isNaN(item)) {
      existingTypeIds.push(parseInt(item));
    }
  });

  const allExistingTypes = await db.IrrigationTypeUpdated.findAll({
    where: {
      isUserSpecific: true,
      userId: userId
    },
    transaction: transaction
  });

  const typesToKeep = allExistingTypes.filter(type => 
    existingTypeIds.includes(type.id)
  );

  const typesToDelete = allExistingTypes.filter(type => 
    !existingTypeIds.includes(type.id)
  );

  if (typesToDelete.length > 0) {
    await db.IrrigationTypeUpdated.destroy({
      where: {
        id: { [Op.in]: typesToDelete.map(type => type.id) },
        isUserSpecific: true,
        userId: userId
      },
      transaction: transaction
    });
  }

  const createdTypeNames = [];
  for (const typeName of newTypeNames) {
    await db.IrrigationTypeUpdated.create({
      name: typeName,
      category: 'Other',
      isCategory: false,
      isUserSpecific: true,
      userId: userId,
      sortOrder: 0
    }, { transaction: transaction });
    createdTypeNames.push(typeName);
  }

  const keptTypeNames = typesToKeep.map(type => type.name);
  return [...keptTypeNames, ...createdTypeNames];
};

module.exports.transformIrrigationDataForListing = async (irrigationData, userId) => {
  
  const irrigationTypeIds = new Set();
  const waterSourceIds = new Set();
  
  irrigationData.forEach(irrigation => {
    if (irrigation.irrigationTypeUpdated && Array.isArray(irrigation.irrigationTypeUpdated)) {
      irrigation.irrigationTypeUpdated.forEach(id => irrigationTypeIds.add(id));
    }
    if (irrigation.waterSourceUpdated && Array.isArray(irrigation.waterSourceUpdated)) {
      irrigation.waterSourceUpdated.forEach(id => waterSourceIds.add(id));
    }
  });

  const irrigationTypes = await db.IrrigationTypeUpdated.findAll({
    where: {
      id: { [Op.in]: Array.from(irrigationTypeIds) },
      isCategory: false // Only subcategories
    },
    attributes: ['id', 'name', 'category', 'parentId', 'isUserSpecific', 'userId']
  });

  const waterSources = await db.IrrigationWaterSource.findAll({
    where: {
      id: { [Op.in]: Array.from(waterSourceIds) }
    },
    attributes: ['id', 'name', 'userId']
  });

  const customIrrigationTypes = await db.IrrigationTypeUpdated.findAll({
    where: {
      isUserSpecific: true,
      userId: userId
    },
    attributes: ['id', 'name', 'category', 'isUserSpecific', 'userId']
  });

  const irrigationTypeMap = new Map();
  irrigationTypes.forEach(type => {
    irrigationTypeMap.set(type.id, type.toJSON());
  });

  const waterSourceMap = new Map();
  waterSources.forEach(source => {
    const sourceData = source.toJSON();
      // Add code field based on name
    if (sourceData.name) {
      if (sourceData.name.toLowerCase().includes('ground')) {
        sourceData.water_source_type = 'GROUND_WATER';
      } else if (sourceData.name.toLowerCase().includes('surface')) {
        sourceData.water_source_type = 'SURFACE_WATER';
      }
    }
    waterSourceMap.set(source.id, sourceData);
  });

  return irrigationData.map(irrigation => {
    const transformed = { ...irrigation.toJSON() };
    
    if (transformed.irrigationTypeUpdated && Array.isArray(transformed.irrigationTypeUpdated)) {
      transformed.irrigationTypeUpdated = transformed.irrigationTypeUpdated
        .map(id => irrigationTypeMap.get(id))
        .filter(Boolean); // Remove any undefined entries
    }
    
    if (transformed.waterSourceUpdated && Array.isArray(transformed.waterSourceUpdated)) {
      transformed.waterSourceUpdated = transformed.waterSourceUpdated
        .map(id => waterSourceMap.get(id))
        .filter(Boolean); // Remove any undefined entries
    }

    transformed.otherIrrigationType = customIrrigationTypes.map(type => type.toJSON());
    
    return transformed;
  });
};
