'use strict';

const { createHash } = require('crypto');
const { QueryTypes } = require('sequelize');

const defaultToNonNull = (...values) => {
  return values.find((item) => item !== null && typeof item !== 'undefined' && !isNaN(item));
};

const generateHash = (value) => {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
};

const truncateToDecimals = (num, decimals) => {
  const numericVal = Number(num);
  if (isNaN(numericVal) || typeof decimals !== 'number') return num;
  const factor = Math.pow(10, decimals);
  return Math.trunc(numericVal * factor) / factor;
}

const getCoordinateHash = (circularOrPolygonCoordinates) => {
  if (!circularOrPolygonCoordinates) return null;
  if (Array.isArray(circularOrPolygonCoordinates)) {
    const cleanCoordinates = [];
    circularOrPolygonCoordinates.forEach((coordinate) => {
      const lng = Number(defaultToNonNull(coordinate.lng, coordinate.log));
      const lat = Number(coordinate.lat);
      const newCoordinate = [truncateToDecimals(lng, 6), truncateToDecimals(lat, 6)];
      if (cleanCoordinates.length) {
        const previousCoordinate = cleanCoordinates[cleanCoordinates.length - 1];
        if (previousCoordinate[0] !== newCoordinate[0] || previousCoordinate[1] !== newCoordinate[1]) {
          cleanCoordinates.push(newCoordinate);
        }
      } else {
        cleanCoordinates.push(newCoordinate);
      }
    });

    const isLastAndFirstSame =
      cleanCoordinates[0][0] === cleanCoordinates[cleanCoordinates.length - 1][0] &&
      cleanCoordinates[0][1] === cleanCoordinates[cleanCoordinates.length - 1][1];
    if (isLastAndFirstSame) cleanCoordinates.pop();

    let sortIdx = 0;
    for (let i = 1; i < cleanCoordinates.length; i++) {
      if (
        cleanCoordinates[i][0] < cleanCoordinates[sortIdx][0] ||
        (cleanCoordinates[i][0] === cleanCoordinates[sortIdx][0] &&
          cleanCoordinates[i][1] < cleanCoordinates[sortIdx][1])
      ) {
        sortIdx = i;
      }
    }

    cleanCoordinates.push(...cleanCoordinates.splice(0, sortIdx));
    cleanCoordinates.push(cleanCoordinates[0]);
    return generateHash(cleanCoordinates);
  } else {
    const lng = Number(
      defaultToNonNull(
        circularOrPolygonCoordinates.lng,
        circularOrPolygonCoordinates.log,
        circularOrPolygonCoordinates.geofenceCenterLog
      )
    );
    const lat = Number(
      defaultToNonNull(circularOrPolygonCoordinates.lat, circularOrPolygonCoordinates.geofenceCenterLat)
    );
    const radius = Number(
      defaultToNonNull(circularOrPolygonCoordinates.radius, circularOrPolygonCoordinates.geofenceRadius)
    );
    const newCoordinate = [truncateToDecimals(lng, 6), truncateToDecimals(lat, 6), truncateToDecimals(radius, 2)];
    return generateHash(newCoordinate);
  }
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const geofences = await queryInterface.sequelize.query(
        `
        SELECT g.id as id, geofenceArea, geofenceCenterLat, geofenceCenterLog, geofenceRadius, lat, log FROM geofences g LEFT JOIN user_farms uf ON g.farmId = uf.id
        `,
        {
          type: QueryTypes.SELECT,
        }
      );
      const circularGeofences = geofences.filter((geofence) => {
        return (
          geofence.geofenceCenterLat !== null && geofence.geofenceCenterLog !== null && geofence.geofenceRadius !== null
        );
      });

      const polygonGeofenceIds = geofences
        .filter((geofence) => !circularGeofences.includes(geofence))
        .map((geofence) => geofence.id);

      const polygonGeofenceCoordinates = await queryInterface.sequelize.query(
        `
        SELECT * FROM geofence_coordinates WHERE geoFenceId IN (:polygonGeofenceIds)
      `,
        {
          type: QueryTypes.SELECT,
          replacements: { polygonGeofenceIds },
        }
      );

      const polygonGeofences = {};
      for (const polygonGeofenceCoordinate of polygonGeofenceCoordinates) {
        if (polygonGeofences[polygonGeofenceCoordinate.geoFenceId]) {
          polygonGeofences[polygonGeofenceCoordinate.geoFenceId].push(polygonGeofenceCoordinate);
        } else {
          polygonGeofences[polygonGeofenceCoordinate.geoFenceId] = [polygonGeofenceCoordinate];
        }
      }

      console.log('---------------------------------------------------------');
      console.log('Begining Circular Geofence Hash Seed');
      console.log('---------------------------------------------------------');
      await Promise.all(
        circularGeofences.map((geofence) => {
          const { lat, log, geofenceCenterLat, geofenceCenterLog, geofenceRadius, geofenceArea } = geofence;
          const updatedCenterLat = !!lat && !!geofenceCenterLat && Math.abs(Number(lat) - Number(geofenceCenterLat)) < 0.0001 ? lat : geofenceCenterLat;
          const updatedCenterLog = !!log && !!geofenceCenterLog && Math.abs(Number(log) - Number(geofenceCenterLog)) < 0.0001 ? log : geofenceCenterLog;
          const updatedRadius = geofenceArea && !isNaN(Number(geofenceArea)) ? Math.sqrt(Number(geofenceArea) / 0.000247105 / Math.PI) : geofenceRadius;
          const hash = getCoordinateHash({ ...geofence, geofenceRadius: updatedRadius });
          return queryInterface.sequelize.query(
            `
          UPDATE geofences SET coordinateHash = :hash, geofenceCenterLat = :geofenceCenterLat, geofenceCenterLog = :geofenceCenterLog, geofenceRadius = :geofenceRadius WHERE id = :id
        `,
            {
              type: QueryTypes.UPDATE,
              replacements: { hash, geofenceCenterLat: updatedCenterLat, geofenceCenterLog: updatedCenterLog, geofenceRadius: updatedRadius, id: geofence.id },
            }
          );
        })
      );
      console.log('---------------------------------------------------------');
      console.log('Completed Circular Geofence Hash Seed. Total: ' + circularGeofences.length);
      console.log('---------------------------------------------------------');

      console.log('---------------------------------------------------------');
      console.log('Begining Polygon Geofence Hash Seed');
      console.log('---------------------------------------------------------');
      await Promise.all(
        Object.keys(polygonGeofences).map((id) => {
          const hash = getCoordinateHash(polygonGeofences[id]);
          return queryInterface.sequelize.query(
            `
          UPDATE geofences SET coordinateHash = :hash WHERE id = :id
        `,
            {
              type: QueryTypes.UPDATE,
              replacements: { hash, id },
            }
          );
        })
      );
      console.log('---------------------------------------------------------');
      console.log('Completed Polygon Geofence Hash Seed. Total: ' + Object.keys(polygonGeofences).length);
      console.log('---------------------------------------------------------');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`UPDATE geofences SET coordinateHash = NULL`, { type: QueryTypes.UPDATE });
  },
};
