const geolib = require('geolib');
const { createHash } = require('crypto');

const getValidPolygons = (polygons) => {
  return polygons.filter((polygon) => {
    return (
      polygon.lat !== null &&
      typeof polygon.lat !== 'undefined' &&
      !isNaN(parseFloat(polygon.lat)) &&
      polygon.log !== null &&
      typeof polygon.log !== 'undefined' &&
      !isNaN(parseFloat(polygon.log))
    );
  });
};

const getPerimeterFromCircularInFeet = (radius) => {
  return geolib.convertDistance(2 * Math.PI * radius, 'ft').toFixed(5);
};

const getAreaFromCircularInAcre = (radius) => {
  const areaInSqMeter = Math.PI * Math.pow(radius, 2);
  return (areaInSqMeter * 0.000247105).toFixed(5);
};

const getPerimeterFromPolygonsInFeet = (polygons) => {
  if (Array.isArray(polygons)) {
    let perimeterInMeter = 0;
    const validPolygons = getValidPolygons(polygons);
    const validPolygonsData = validPolygons.map((polygon) => ({
      longitude: polygon.log,
      latitude: polygon.lat,
    }));
    let startIdx = 0,
      endIdx = 1;
    while (endIdx < validPolygonsData.length) {
      const startPoint = validPolygonsData[startIdx];
      const endPoint = validPolygonsData[endIdx];
      // Calculate from first to last coordinates
      if (startIdx === 0) {
        perimeterInMeter += geolib.getPreciseDistance(
          startPoint,
          validPolygonsData[validPolygonsData.length - 1],
          0.01
        );
      }
      perimeterInMeter += geolib.getPreciseDistance(startPoint, endPoint, 0.01);

      startIdx++;
      endIdx++;
    }
    const perimeterInFeet = geolib.convertDistance(perimeterInMeter, 'ft').toFixed(5);
    return perimeterInFeet;
  }
  return null;
};

const getAreaFromPolygonsInAcre = (polygons) => {
  if (Array.isArray(polygons)) {
    const validPolygons = getValidPolygons(polygons);
    const validPolygonsData = validPolygons.map((polygon) => ({
      longitude: polygon.log,
      latitude: polygon.lat,
    }));

    const areaInSqMeter = geolib.getAreaOfPolygon(validPolygonsData);
    return (areaInSqMeter * 0.000247105).toFixed(5); // 1 Sq. Meter = 0.000247105 acre
  }
  return null;
};

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
      const newCoordinate = [truncateToDecimals(lng, 4), truncateToDecimals(lat, 4)];
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

    if(!lat || !lng || !radius || isNaN(lat) || isNaN(lng) || isNaN(radius)) {
      return null;
    }
    const newCoordinate = [truncateToDecimals(lng, 6), truncateToDecimals(lat, 6), truncateToDecimals(radius, 2)];
    return generateHash(newCoordinate);
  }
};

module.exports = {
  getPerimeterFromPolygonsInFeet,
  getAreaFromPolygonsInAcre,
  getPerimeterFromCircularInFeet,
  getAreaFromCircularInAcre,
  getCoordinateHash
};
