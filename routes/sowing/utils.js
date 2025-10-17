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
      throw {
        msg: 'Crop type selected does not exist.',
        customValidationError: true,
      };
    }
  };
module.exports.validatePlantingType = async (plantingTypeid) => {
    const plantingType = await db.PlantingTypes.findOne({
      where: {
        id: plantingTypeid,
      },
    });
    if (plantingType === null) {
      throw {
        msg: 'Planting type selected does not exist.',
        customValidationError: true,
      };
    }
  };
  module.exports.validateVarietyBelongsToUser = async (cropVariety, userId) => {
    const variety = await db.Crop.count({
      //attributes: ['id'],
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
      throw {
        msg: 'Crop variety selected does not belong to the user or its not added by admin.',
        customValidationError: true,
      };
    }
  };
