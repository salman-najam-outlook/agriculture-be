const db = require(rootPath + '/models');
const { Op } = require('sequelize');
module.exports.validateCropType = async (cropId) => {
    const cropType = await db.Option.findOne({
      where: {
        id: cropId,
        groupName: 'crop-type',
      },
    });
    if (cropType === null) {
      return false;
    }else{
        return true;
    }
  };
module.exports.validateWeedType = async (weedTypeId, userId) => {
    const weedtype = await db.WeedType.count({
        // attributes: ['id'],
        where: {
          id:  {
            [Op.or] : weedTypeId
          },
          userId: {
            [Op.or] : [userId, null]
          }
        },
    });
    // console.log('weed type')
    // console.log(weedtype)
    if (weedtype != weedTypeId.length) {
      return false;
    }else{
        return true;
    }
  };
module.exports.validateWeedStage = async (weedStageId, userId) => {
    const weedstage = await db.WeedStage.count({
        // attributes: ['id'],
        where: {
          id:  {
            [Op.or] : weedStageId
          },
          userId: {
            [Op.or] : [userId, null]
          }
        },
    });
    // console.log('weedstage: '+weedstage);
    if (weedstage != weedStageId.length) {
        return false;
    }else{
        return true;
    }
  };
module.exports.validateWeedManualMethod = async (weedMethodId, userId) => {
    const weedMethod = await db.WeedMethod.count({
        // attributes: ['id'],
        where: {
            id:  {
                [Op.or] : weedMethodId
            },
            parentId: 1,
            userId: {
                [Op.or] : [userId, null]
            }
        },
    });
    // console.log('weed method: '+weedMethod)
    if (weedMethod != weedMethodId.length) {
        return false;
    }else{
        return true;
    }
  };
  module.exports.addWeedDates = async (dates, weed_id, t) => {
    const dateData = [];
    dates.forEach((date) =>
      dateData.push({
        date: date,
        weed_id: weed_id,
      })
    );
    await db.weed_date.bulkCreate(dateData, {
      transaction: t,
    });
  };
  module.exports.validateFarmBelongsToUser = async (farmId, userId) => {
    const farm = await db.user_farm.count({
      // attributes: ['id'],
      where: {
        userId,
        [Op.or]: [{ id: farmId }, { recordId: farmId }]
      },
    });
    if (farm != farmId.length) {
     return false;
    }else{
      return true;
    }
  };
  module.exports.validateSegmentBelongsToUser = async (segmentId, userId) => {
    const segment = await db.Geofence.count({
      // attributes: ['id'],
      where: {
        userId,
        [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
      },
    });
    if (segment != segmentId.length) {
      return false;
    }else{
      return true;
    }
  };
module.exports.validateWeedMethod = async (weedMethodId, userId) => {
    const weedMethod = await db.WeedMethod.count({
        // attributes: ['id'],
        where: {
            id:  weedMethodId,
            parentId: null,
            userId: {
                [Op.or] : [userId, null]
            }
        },
    });
    // console.log('weed method: '+weedMethod)
    if (weedMethod == null) {
        return false;
    }else{
        return true;
    }
  };
module.exports.validateWeedAppMethod = async (weedAppMethodId, userId) => {
    const weedAppMethod = await db.WeedMethod.count({
        // attributes: ['id'],
        where: {
          id:  {
            [Op.or] : weedAppMethodId
          },
          parentId: 2,
          userId: {
            [Op.or] : [userId, null]
          }
        },
    });
    if (weedAppMethod != weedAppMethodId.length) {
        return false;
    }else{
        return true;
    }
  };
  module.exports.validateCropVariety = async (cropVarietyId, userId) => {
    const cropVariety = await db.Crop.findOne({
      // attributes: ['id'],
      where: {
        id: cropVarietyId,
        userId: {
          [Op.or] : [userId, null]
        }
      },
    });
    if (cropVariety === null) {
        return false;
    }else{
        return true;
    }
  };
  module.exports.validateVarietyBelongsToUser = async (cropVariety, userId) => {
    const variety = await db.Crop.count({
      // attributes: ['id'],
      where: {
        // userId: {
        //   [Op.or] : [userId, null]
        // },
        id:  {
          [Op.or] : cropVariety
        }
      },
    });
    if (variety != cropVariety.length) {
        return false;

    }else{
        return true;
    }
  };
  module.exports.addWeedToVariety = async (cropVariety, weedId, t) => {
    const weedVarietyData = [];
    // console.log(farm);
    cropVariety.forEach((id) =>
    weedVarietyData.push({
        varietyId: id,
        weedId: weedId,
      })
    );
    console.log(weedVarietyData)
    await db.weed_crop_vatiety.bulkCreate(weedVarietyData, {
      transaction: t,
    });
  };
  module.exports.deleteWeedVariety = async (weedId, t) => {
    await db.weed_crop_vatiety.destroy(
      {
        where: {
            weedId: weedId,
        },
      },
      { transaction: t }
    );
  };
  module.exports.deleteWeedDate = async (weedId, t) => {
    await db.weed_date.destroy(
      {
        where: {
            weed_id: weedId,
        },
      },
      { transaction: t }
    );
  };
  module.exports.deleteWeedType = async (weedId, t) => {
    await db.weeddata_type.destroy(
      {
        where: {
            weedId: weedId,
        },
      },
      { transaction: t }
    );
  };
  module.exports.deleteWeedStage = async (weedId, t) => {
    await db.weeddata_stage.destroy(
      {
        where: {
            weedId: weedId,
        },
      },
      { transaction: t }
    );
  };
  module.exports.deleteWeedMethod = async (weedId, t) => {
    await db.weeddata_method.destroy(
      {
        where: {
            weedId: weedId,
        },
      },
      { transaction: t }
    );
  };
  module.exports.deleteWeedAppMethod = async (weedId, t) => {
    await db.weeddata_application_method.destroy(
      {
        where: {
            weedId: weedId,
        },
      },
      { transaction: t }
    );
  };
  module.exports.addWeedToType = async (weedType, weedId, t) => {
    const weedTypeData = [];
    weedType.forEach((id) =>
    weedTypeData.push({
        weedTypeId: id,
        weedId: weedId,
      })
    );

    await db.weeddata_type.bulkCreate(weedTypeData, {
      transaction: t,
    });
  };
  module.exports.addWeedToStage = async (weedStage, weedId, t) => {
    const weedStageData = [];
    weedStage.forEach((id) =>
    weedStageData.push({
        weedStageId: id,
        weedId: weedId,
      })
    );

    await db.weeddata_stage.bulkCreate(weedStageData, {
      transaction: t,
    });
  };
  module.exports.addWeedToMethod = async (weedMethod, weedId, t) => {
    const weedMethodData = [];
    weedMethod.forEach((id) =>
    weedMethodData.push({
        weedMethodId: id,
        weedId: weedId,
      })
    );

    await db.weeddata_method.bulkCreate(weedMethodData, {
      transaction: t,
    });
  };
  module.exports.addWeedToAppMethod = async (weedAppMethod, weedId, t) => {
    const weedAppMethodData = [];
    weedAppMethod.forEach((id) =>
    weedAppMethodData.push({
        weedApplicationMethodId: id,
        weedId: weedId,
      })
    );
    await db.weeddata_application_method.bulkCreate(weedAppMethodData, {
      transaction: t,
    });
  };

  module.exports.addWeedToFarm = async (farm, weedId, t) => {
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
          userFarmId: _farm.id,
          weedId: weedId,
        }
      }
    });
    const farmData = await Promise.all(farmDataPromises);
    await db.MapWeedFarms.bulkCreate(farmData, {
      transaction: t,
    });
  };
  
  module.exports.addWeedToSegment = async (segment, weedId, t) => {
    const segmentDataPromises = segment.map(async (geofenceId) => {
      const segment = await db.Geofence.findOne({
        where: {
          [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
        }
      });
      if(segment) {
        return {
          geofenceId: segment.id,
          weedId: weedId,
        }
      }
    });
    const segmentData = await Promise.all(segmentDataPromises);
    await db.MapWeedGeofences.bulkCreate(segmentData, {
      transaction: t,
    });
  };
