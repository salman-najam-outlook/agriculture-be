const { Op } = require('sequelize');
const app = require('../../app');
const db = require(rootPath + '/models');
const { getAreaFromPolygonsInAcre, getPerimeterFromPolygonsInFeet } = require(rootPath + '/helpers/geo-utils.js');

async function updateFarmSize(farmIds) {
  try {
    const farms = await db.user_farm.findAll({
      where: {
        id: { [Op.in]: farmIds },
      },
      include: [
        {
          required: true,
          attributes: ['id', 'lat', 'log'],
          model: db.UserFarmCoordinate,
          as: 'coordinates',
        },
      ],
    });

    if (farms.length) {
      const farmsWithCoordinates = farms.filter(
        (farm) => Array.isArray(farm.coordinates) && farm.coordinates.length >= 3
      );
      await Promise.all(
        farmsWithCoordinates.map((farm) => {
          const perimeter = getPerimeterFromPolygonsInFeet(farm.coordinates);
          const area = getAreaFromPolygonsInAcre(farm.coordinates);
          console.log(`Farm ID: ${farm.id} - Area (in acre): ${area} | Perimeter (in feet): ${perimeter}`);
          return db.user_farm.update(
            {
              parameter: perimeter,
              area,
            },
            {
              where: { id: farm.id },
            }
          );
        })
      );
    }
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(2);
  }
}

async function updateAllFarmsSize() {
  try {
    const farms = await db.user_farm.findAll({
      attributes: ['id'],
      include: [
        {
          required: true,
          attributes: [],
          model: db.UserFarmCoordinate,
          as: 'coordinates',
        },
      ],
    });

    const farmIds = await farms.map((farm) => farm.id);
    await updateFarmSize(farmIds);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(2);
  }
}

// Add farm IDS you want to update
// updateFarmSize([]);

// This updates farm size of all farms with geofence
updateAllFarmsSize();
